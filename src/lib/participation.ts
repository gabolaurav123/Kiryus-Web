import { siteConfig } from "./config";

export const participationInterests = [
  { value: "visita", label: "Conocer una aldea" },
  { value: "voluntariado", label: "Hacer voluntariado" },
  { value: "estadia", label: "Consultar una estadía" },
  { value: "colaboracion", label: "Proponer una colaboración" },
] as const;

export const participationVillages = [
  { value: "argentina", label: "Argentina" },
  { value: "colombia", label: "Colombia" },
  { value: "espana", label: "España" },
  { value: "orientacion", label: "Quiero orientación" },
] as const;

export type ParticipationInterest =
  (typeof participationInterests)[number]["value"];
export type ParticipationVillage =
  (typeof participationVillages)[number]["value"];
export type ParticipationFields = {
  interest: ParticipationInterest | "";
  village: ParticipationVillage | "";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  arrival: string;
  departure: string;
};
export type ParticipationErrors = Partial<
  Record<keyof ParticipationFields, string>
>;
export type ParticipationQuery = { get(name: string): string | null };

const interestValues = new Set<string>(
  participationInterests.map((item) => item.value),
);
const villageValues = new Set<string>(
  participationVillages.map((item) => item.value),
);

export function parseParticipationQuery(query: ParticipationQuery) {
  const interest = query.get("interes") || "";
  const village = query.get("aldea") || "";
  return {
    interest: interestValues.has(interest)
      ? (interest as ParticipationInterest)
      : ("" as const),
    village: villageValues.has(village)
      ? (village as ParticipationVillage)
      : ("" as const),
  };
}

export function createInitialParticipation(
  preselection: Partial<Pick<ParticipationFields, "interest" | "village">> = {},
): ParticipationFields {
  return {
    interest:
      preselection.interest && interestValues.has(preselection.interest)
        ? preselection.interest
        : "",
    village:
      preselection.village && villageValues.has(preselection.village)
        ? preselection.village
        : "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    arrival: "",
    departure: "",
  };
}

function normalizeName(value: string) {
  return value.normalize("NFC").trim().replace(/\s+/gu, " ");
}

function isValidName(value: string) {
  return value.length <= 80 && /^[\p{L}][\p{L}\p{M} .’‘'·・-]*$/u.test(value);
}

function isValidEmail(value: string) {
  if (value.length > 254) return false;
  const parts = value.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (
    !local ||
    local.length > 64 ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..")
  )
    return false;
  if (!/^[\p{L}\p{M}\p{N}.!#$%&'*+/=?^_{|}~-]+$/u.test(local)) return false;
  const labels = domain.split(".");
  return (
    labels.length >= 2 &&
    labels.every(
      (label) =>
        label.length > 0 &&
        label.length <= 63 &&
        /^[\p{L}\p{M}\p{N}](?:[\p{L}\p{M}\p{N}-]*[\p{L}\p{M}\p{N}])?$/u.test(
          label,
        ),
    ) &&
    /\p{L}/u.test(labels.at(-1) || "")
  );
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

export function validateParticipation(input: ParticipationFields): {
  valid: boolean;
  values: ParticipationFields;
  errors: ParticipationErrors;
} {
  const email = input.email.trim();
  const at = email.lastIndexOf("@");
  const values: ParticipationFields = {
    ...input,
    firstName: normalizeName(input.firstName),
    lastName: normalizeName(input.lastName),
    email:
      at >= 0
        ? `${email.slice(0, at)}@${email.slice(at + 1).toLowerCase()}`
        : email,
    phone: input.phone.trim().replace(/[\s().-]/g, ""),
    message: input.message.trim().replace(/\r\n?/g, "\n"),
    arrival: input.interest === "estadia" ? input.arrival.trim() : "",
    departure: input.interest === "estadia" ? input.departure.trim() : "",
  };
  const errors: ParticipationErrors = {};
  if (!interestValues.has(values.interest))
    errors.interest = "Selecciona cómo te gustaría participar.";
  if (!villageValues.has(values.village))
    errors.village = "Selecciona una aldea o pide orientación.";
  if (!values.firstName) errors.firstName = "Escribe tu nombre.";
  else if (!isValidName(values.firstName))
    errors.firstName =
      "Usa letras, espacios, guiones o apóstrofes; máximo 80 caracteres.";
  if (!values.lastName) errors.lastName = "Escribe tu apellido.";
  else if (!isValidName(values.lastName))
    errors.lastName =
      "Usa letras, espacios, guiones o apóstrofes; máximo 80 caracteres.";
  if (!isValidEmail(values.email))
    errors.email = "Escribe un correo válido, por ejemplo nombre@correo.com.";
  if (
    input.phone.trim() &&
    (!/^[+\d\s().-]+$/.test(input.phone.trim()) ||
      !/^\+[1-9]\d{6,14}$/.test(values.phone))
  ) {
    errors.phone =
      "Incluye + y el prefijo internacional, seguido de 7 a 15 dígitos en total.";
  }
  if (values.message.length < 10)
    errors.message = "Cuéntanos un poco más: escribe al menos 10 caracteres.";
  else if (values.message.length > 2000)
    errors.message = "Acorta el mensaje a un máximo de 2000 caracteres.";
  if (values.arrival && !isValidDate(values.arrival))
    errors.arrival = "Elige una fecha de llegada válida.";
  if (values.departure && !isValidDate(values.departure))
    errors.departure = "Elige una fecha de salida válida.";
  if (
    values.arrival &&
    values.departure &&
    !errors.arrival &&
    !errors.departure &&
    values.departure < values.arrival
  ) {
    errors.departure =
      "La salida debe ser el mismo día o después de la llegada.";
  }
  return { valid: Object.keys(errors).length === 0, values, errors };
}

export function formatParticipationDate(value: string) {
  if (!isValidDate(value)) return value;
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export function composeParticipationMessage(input: ParticipationFields) {
  const result = validateParticipation(input);
  if (!result.valid)
    throw new Error(
      "Completa y revisa los campos antes de preparar el mensaje.",
    );
  const values = result.values;
  const interest = participationInterests.find(
    (item) => item.value === values.interest,
  )!;
  const village = participationVillages.find(
    (item) => item.value === values.village,
  )!;
  return [
    "Hola, Comunidad Kiryus. Me gustaría recibir información para participar.",
    "",
    `Interés: ${interest.label}`,
    `Aldea: ${village.label}`,
    `Nombre: ${values.firstName} ${values.lastName}`,
    `Correo: ${values.email}`,
    ...(values.phone ? [`Teléfono: ${values.phone}`] : []),
    ...(values.arrival
      ? [`Llegada orientativa: ${formatParticipationDate(values.arrival)}`]
      : []),
    ...(values.departure
      ? [`Salida orientativa: ${formatParticipationDate(values.departure)}`]
      : []),
    "",
    "Mi consulta:",
    values.message,
    "",
    "Entiendo que las fechas y posibilidades de participación se coordinan con la comunidad.",
  ].join("\n");
}

export function getParticipationWhatsappUrl(input: ParticipationFields) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(composeParticipationMessage(input))}`;
}
