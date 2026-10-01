import assert from "node:assert/strict";
import test from "node:test";
import {
  composeParticipationMessage,
  createInitialParticipation,
  getParticipationWhatsappUrl,
  parseParticipationQuery,
  validateParticipation,
  type ParticipationFields,
} from "../src/lib/participation";

function validFields(
  overrides: Partial<ParticipationFields> = {},
): ParticipationFields {
  return {
    ...createInitialParticipation({ interest: "visita", village: "colombia" }),
    firstName: "María José",
    lastName: "Muñoz O’Connor",
    email: "maria@example.com",
    message: "Me gustaría conocer la aldea y sus actividades.",
    ...overrides,
  };
}

test("preselección acepta las cuatro opciones y descarta valores desconocidos", () => {
  const parsed = parseParticipationQuery(
    new URLSearchParams("interes=voluntariado&aldea=espana"),
  );
  assert.deepEqual(parsed, { interest: "voluntariado", village: "espana" });
  assert.deepEqual(
    parseParticipationQuery(new URLSearchParams("interes=otro&aldea=otro")),
    { interest: "", village: "" },
  );
  assert.equal(createInitialParticipation(parsed).village, "espana");
  for (const interest of [
    "visita",
    "voluntariado",
    "estadia",
    "colaboracion",
  ] as const) {
    assert.equal(
      parseParticipationQuery(
        new URLSearchParams(`interes=${interest}&aldea=orientacion`),
      ).interest,
      interest,
    );
  }
});

test("valida nombres Unicode, tildes combinadas, apóstrofes y nombres compuestos", () => {
  for (const [firstName, lastName] of [
    ["Mari\u0301a José", "Muñoz O’Connor"],
    ["李", "王"],
    ["Anne-Marie", "D'Angelo"],
    ["Zoë", "ジョン・ドゥ"],
  ]) {
    assert.equal(
      validateParticipation(validFields({ firstName, lastName })).valid,
      true,
    );
  }
  const result = validateParticipation(
    validFields({ firstName: "  Mari\u0301a   José  ", lastName: "O’Connor" }),
  );
  assert.equal(result.values.firstName, "María José");
  assert.ok(
    validateParticipation(validFields({ firstName: "María123" })).errors
      .firstName,
  );
});

test("errores identifican campos necesarios sin alterar la entrada", () => {
  const fields = createInitialParticipation();
  const before = structuredClone(fields);
  const result = validateParticipation(fields);
  assert.equal(result.valid, false);
  for (const field of [
    "interest",
    "village",
    "firstName",
    "lastName",
    "email",
    "message",
  ] as const)
    assert.ok(result.errors[field]);
  assert.deepEqual(fields, before);
  assert.equal(result.errors.phone, undefined);
});

test("correo rechaza direcciones incompletas y dominios inválidos", () => {
  for (const email of [
    "maria",
    "maria@",
    "a..b@example.com",
    "a@-example.com",
    "a@example..com",
    "a@example.123",
    "a b@example.com",
  ]) {
    assert.ok(
      validateParticipation(validFields({ email })).errors.email,
      email,
    );
  }
  assert.equal(
    validateParticipation(validFields({ email: "Maria+visita@EXAMPLE.COM " }))
      .values.email,
    "Maria+visita@example.com",
  );
});

test("teléfono opcional admite formatos internacionales y normaliza separadores", () => {
  assert.equal(validateParticipation(validFields({ phone: "" })).valid, true);
  assert.equal(
    validateParticipation(validFields({ phone: "+57 (310) 560-6709" })).values
      .phone,
    "+573105606709",
  );
  for (const phone of [
    "+34 612 345 678",
    "+1 (415) 555-0123",
    "+54 9 11 1234 5678",
  ]) {
    assert.equal(validateParticipation(validFields({ phone })).valid, true);
  }
  for (const phone of [
    "3105606709",
    "+000000000",
    "+34abc123456",
    "+123",
    "+1234567890123456",
  ]) {
    assert.ok(
      validateParticipation(validFields({ phone })).errors.phone,
      phone,
    );
  }
});

test("fechas orientativas son opcionales, reales y ordenadas", () => {
  assert.equal(
    validateParticipation(validFields({ interest: "estadia" })).valid,
    true,
  );
  assert.equal(
    validateParticipation(
      validFields({
        interest: "estadia",
        arrival: "2027-02-28",
        departure: "2027-02-28",
      }),
    ).valid,
    true,
  );
  assert.ok(
    validateParticipation(
      validFields({ interest: "estadia", arrival: "2027-02-30" }),
    ).errors.arrival,
  );
  assert.ok(
    validateParticipation(
      validFields({
        interest: "estadia",
        arrival: "2027-04-12",
        departure: "2027-04-11",
      }),
    ).errors.departure,
  );
  assert.equal(
    validateParticipation(
      validFields({ interest: "visita", arrival: "2027-04-12" }),
    ).values.arrival,
    "",
  );
});

test("mensaje conserva acentos y saltos de línea y omite datos vacíos", () => {
  const message = composeParticipationMessage(
    validFields({
      message: "Quisiera conocer la comunidad.\r\n¿Podemos conversar?",
    }),
  );
  assert.ok(message.includes("Nombre: María José Muñoz O’Connor"));
  assert.ok(message.includes("comunidad.\n¿Podemos conversar?"));
  assert.ok(!message.includes("Teléfono:"));
  assert.ok(!message.includes("Llegada orientativa:"));
  assert.ok(!message.includes("Salida orientativa:"));
  const stay = composeParticipationMessage(
    validFields({
      interest: "estadia",
      arrival: "2027-04-12",
      phone: "+34 612 345 678",
    }),
  );
  assert.ok(stay.includes("Llegada orientativa: 12/04/2027"));
  assert.ok(stay.includes("Teléfono: +34612345678"));
});

test("WhatsApp usa el destino oficial y codificación reversible sin realizar solicitudes", () => {
  const fields = validFields({
    message: "Voluntariado: aprender & colaborar.\n¿Hay orientación?",
  });
  const url = new URL(getParticipationWhatsappUrl(fields));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/573105606709");
  assert.equal(
    url.searchParams.get("text"),
    composeParticipationMessage(fields),
  );
  assert.throws(
    () => composeParticipationMessage(createInitialParticipation()),
    /Completa y revisa/,
  );
});
