"use client";

import { Suspense, useId, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  Compass,
  Copy,
  HelpingHand,
  MessageCircle,
  Sprout,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import {
  composeParticipationMessage,
  createInitialParticipation,
  getParticipationWhatsappUrl,
  parseParticipationQuery,
  participationInterests,
  participationVillages,
  validateParticipation,
  type ParticipationErrors,
  type ParticipationFields,
  type ParticipationInterest,
  type ParticipationVillage,
} from "@/lib/participation";
import styles from "./ParticipationForm.module.css";

export type ParticipationFormProps = {
  initialInterest?: ParticipationInterest;
  initialVillage?: ParticipationVillage;
};

const interestIcons = {
  visita: Compass,
  voluntariado: HelpingHand,
  estadia: CalendarDays,
  colaboracion: Sprout,
};
const fieldLabels: Record<keyof ParticipationFields, string> = {
  interest: "Interés",
  village: "Aldea",
  firstName: "Nombre",
  lastName: "Apellido",
  email: "Correo",
  phone: "Teléfono",
  message: "Mensaje",
  arrival: "Llegada",
  departure: "Salida",
};

function ParticipationFormContent({
  initialInterest,
  initialVillage,
}: ParticipationFormProps) {
  const query = useSearchParams();
  const id = useId();
  const [values, setValues] = useState<ParticipationFields>(() => {
    const preselected = parseParticipationQuery(query);
    return createInitialParticipation({
      interest: initialInterest ?? preselected.interest,
      village: initialVillage ?? preselected.village,
    });
  });
  const [errors, setErrors] = useState<ParticipationErrors>({});
  const [review, setReview] = useState(false);
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copied" | "unavailable"
  >("idle");
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const messageArea = useRef<HTMLTextAreaElement>(null);

  function fieldId(field: keyof ParticipationFields) {
    return `${id}-${field}`;
  }

  function focusField(field: keyof ParticipationFields) {
    document
      .getElementById(
        field === "interest" ? `${fieldId(field)}-visita` : fieldId(field),
      )
      ?.focus();
  }

  function change(field: keyof ParticipationFields, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[field];
      if (field === "interest" || field === "arrival") {
        delete next.arrival;
        delete next.departure;
      }
      return next;
    });
    setCopyStatus("idle");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateParticipation(values);
    setErrors(result.errors);
    if (!result.valid) {
      const first = Object.keys(result.errors)[0] as keyof ParticipationFields;
      requestAnimationFrame(() => focusField(first));
      return;
    }
    setValues(result.values);
    setReview(true);
    setCopyStatus("idle");
    requestAnimationFrame(() => reviewHeading.current?.focus());
  }

  function edit() {
    setReview(false);
    setCopyStatus("idle");
    requestAnimationFrame(() => focusField("firstName"));
  }

  async function copyMessage() {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(composeParticipationMessage(values));
      setCopyStatus("copied");
    } catch {
      setCopyStatus("unavailable");
      messageArea.current?.focus();
      messageArea.current?.select();
    }
  }

  function describedBy(field: keyof ParticipationFields, hint = false) {
    return (
      [
        hint ? `${fieldId(field)}-hint` : "",
        errors[field] ? `${fieldId(field)}-error` : "",
      ]
        .filter(Boolean)
        .join(" ") || undefined
    );
  }

  function fieldError(field: keyof ParticipationFields) {
    return errors[field] ? (
      <p className={styles.error} id={`${fieldId(field)}-error`}>
        {errors[field]}
      </p>
    ) : null;
  }

  if (review) {
    const message = composeParticipationMessage(values);
    return (
      <section className={styles.card} aria-labelledby={`${id}-review-title`}>
        <div className={styles.step}>
          <span>02</span> Revisa tu consulta
        </div>
        <h2
          ref={reviewHeading}
          tabIndex={-1}
          id={`${id}-review-title`}
          className={styles.heading}
        >
          La conversación empieza aquí.
        </h2>
        <p className={styles.intro}>
          Tu mensaje está preparado. Al abrir WhatsApp podrás revisarlo y
          enviarlo a Comunidad Kiryus:{" "}
          <strong>{siteConfig.whatsappDisplay}</strong>.
        </p>
        <label className={styles.label} htmlFor={`${id}-prepared-message`}>
          Mensaje que llevarás a WhatsApp
        </label>
        <textarea
          ref={messageArea}
          id={`${id}-prepared-message`}
          className={`${styles.input} ${styles.messagePreview}`}
          value={message}
          readOnly
          rows={14}
          aria-describedby={`${id}-review-note`}
        />
        <p id={`${id}-review-note`} className={styles.hint}>
          Todavía no se ha enviado ninguna solicitud. Si vuelves desde WhatsApp,
          tu mensaje seguirá en esta página mientras la mantengas abierta.
        </p>
        <div className={styles.reviewActions}>
          <a
            className={styles.primary}
            href={getParticipationWhatsappUrl(values)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} aria-hidden="true" /> Abrir WhatsApp{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
            <span className={styles.srOnly}>
              {" "}
              (se abre en otra pestaña o en la aplicación)
            </span>
          </a>
          <button
            className={styles.secondary}
            type="button"
            onClick={copyMessage}
          >
            {copyStatus === "copied" ? (
              <Check size={18} aria-hidden="true" />
            ) : (
              <Copy size={18} aria-hidden="true" />
            )}
            {copyStatus === "copied" ? "Mensaje copiado" : "Copiar mensaje"}
          </button>
        </div>
        <p className={styles.copyStatus} role="status" aria-live="polite">
          {copyStatus === "copied" &&
            "Copiado. Puedes pegarlo en tu conversación con Kiryus; aún debes enviarlo allí."}
          {copyStatus === "unavailable" &&
            "No pudimos copiar automáticamente. El mensaje está seleccionado: usa Copiar o Ctrl/Cmd + C para llevarlo a WhatsApp."}
        </p>
        <button className={styles.back} type="button" onClick={edit}>
          <ArrowLeft size={17} aria-hidden="true" /> Volver a editar
        </button>
        <p className={styles.privacy}>
          Los datos permanecen en la memoria de esta página. Se compartirán con
          WhatsApp solo cuando decidas abrirlo.{" "}
          <a href="/privacidad">Cómo cuidamos tus datos</a>.
        </p>
      </section>
    );
  }

  const errorFields = Object.keys(errors) as (keyof ParticipationFields)[];
  return (
    <section className={styles.card} aria-labelledby={`${id}-form-title`}>
      <div className={styles.step}>
        <span>01</span> Cuéntanos qué te trae
      </div>
      <h2 id={`${id}-form-title`} className={styles.heading}>
        Hay muchas formas de encontrarnos.
      </h2>
      <p className={styles.intro}>
        Elige tu interés y prepara una consulta. La comunidad te orientará sobre
        las posibilidades de cada aldea.
      </p>
      <form noValidate onSubmit={submit}>
        {errorFields.length > 0 && (
          <div className={styles.errorSummary} role="alert">
            <p>
              Revisa {errorFields.length === 1 ? "este campo" : "estos campos"}{" "}
              para continuar:
            </p>
            <ul>
              {errorFields.map((field) => (
                <li key={field}>
                  <button type="button" onClick={() => focusField(field)}>
                    {fieldLabels[field]}: {errors[field]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <fieldset
          className={styles.fieldset}
          aria-describedby={describedBy("interest")}
        >
          <legend className={styles.label}>
            ¿Cómo te gustaría participar?{" "}
            <span className={styles.required}>*</span>
          </legend>
          <div className={styles.choices}>
            {participationInterests.map((interest) => {
              const Icon = interestIcons[interest.value];
              return (
                <label className={styles.choice} key={interest.value}>
                  <input
                    id={`${fieldId("interest")}-${interest.value}`}
                    type="radio"
                    name={`${id}-interest`}
                    value={interest.value}
                    checked={values.interest === interest.value}
                    onChange={() => change("interest", interest.value)}
                    required
                  />
                  <span className={styles.choiceContent}>
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    <span>{interest.label}</span>
                    <span className={styles.choiceCheck}>
                      <Check size={14} aria-hidden="true" />
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
          {fieldError("interest")}
        </fieldset>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={fieldId("village")}>
            ¿En qué aldea? <span className={styles.required}>*</span>
          </label>
          <select
            id={fieldId("village")}
            name="aldea"
            className={styles.input}
            value={values.village}
            onChange={(event) => change("village", event.target.value)}
            aria-invalid={Boolean(errors.village)}
            aria-describedby={describedBy("village")}
            required
          >
            <option value="">Selecciona una aldea</option>
            {participationVillages.map((village) => (
              <option key={village.value} value={village.value}>
                {village.label}
              </option>
            ))}
          </select>
          {fieldError("village")}
        </div>
        <div className={styles.fieldGrid}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={fieldId("firstName")}>
              Nombre <span className={styles.required}>*</span>
            </label>
            <input
              id={fieldId("firstName")}
              name="nombre"
              className={styles.input}
              autoComplete="given-name"
              value={values.firstName}
              onChange={(event) => change("firstName", event.target.value)}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={describedBy("firstName")}
              maxLength={80}
              required
            />
            {fieldError("firstName")}
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={fieldId("lastName")}>
              Apellido <span className={styles.required}>*</span>
            </label>
            <input
              id={fieldId("lastName")}
              name="apellido"
              className={styles.input}
              autoComplete="family-name"
              value={values.lastName}
              onChange={(event) => change("lastName", event.target.value)}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={describedBy("lastName")}
              maxLength={80}
              required
            />
            {fieldError("lastName")}
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={fieldId("email")}>
              Correo <span className={styles.required}>*</span>
            </label>
            <input
              id={fieldId("email")}
              name="correo"
              type="email"
              inputMode="email"
              className={styles.input}
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              value={values.email}
              onChange={(event) => change("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email")}
              maxLength={254}
              required
            />
            {fieldError("email")}
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={fieldId("phone")}>
              Teléfono <span className={styles.optional}>(opcional)</span>
            </label>
            <input
              id={fieldId("phone")}
              name="telefono"
              type="tel"
              inputMode="tel"
              className={styles.input}
              autoComplete="tel"
              placeholder="+57 310 560 6709"
              value={values.phone}
              onChange={(event) => change("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy("phone", true)}
              maxLength={40}
            />
            <p id={`${fieldId("phone")}-hint`} className={styles.hint}>
              Incluye el prefijo internacional, por ejemplo +57 o +34.
            </p>
            {fieldError("phone")}
          </div>
        </div>
        {values.interest === "estadia" && (
          <fieldset className={`${styles.fieldset} ${styles.dates}`}>
            <legend className={styles.label}>
              Fechas orientativas{" "}
              <span className={styles.optional}>(opcionales)</span>
            </legend>
            <p className={styles.hint}>
              No hace falta tenerlas decididas. La estadía y la disponibilidad
              se coordinan con la comunidad.
            </p>
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={fieldId("arrival")}>
                  Llegada
                </label>
                <input
                  id={fieldId("arrival")}
                  name="llegada"
                  type="date"
                  className={styles.input}
                  value={values.arrival}
                  onChange={(event) => change("arrival", event.target.value)}
                  aria-invalid={Boolean(errors.arrival)}
                  aria-describedby={describedBy("arrival")}
                />
                {fieldError("arrival")}
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={fieldId("departure")}>
                  Salida
                </label>
                <input
                  id={fieldId("departure")}
                  name="salida"
                  type="date"
                  className={styles.input}
                  min={values.arrival || undefined}
                  value={values.departure}
                  onChange={(event) => change("departure", event.target.value)}
                  aria-invalid={Boolean(errors.departure)}
                  aria-describedby={describedBy("departure")}
                />
                {fieldError("departure")}
              </div>
            </div>
          </fieldset>
        )}
        <div className={styles.field}>
          <label className={styles.label} htmlFor={fieldId("message")}>
            Tu mensaje <span className={styles.required}>*</span>
          </label>
          <textarea
            id={fieldId("message")}
            name="mensaje"
            className={`${styles.input} ${styles.messageInput}`}
            rows={5}
            value={values.message}
            onChange={(event) => change("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message", true)}
            maxLength={2000}
            required
          />
          <div className={styles.messageHint}>
            <p id={`${fieldId("message")}-hint`} className={styles.hint}>
              Cuéntanos qué te interesa y qué te gustaría saber. Mínimo 10
              caracteres.
            </p>
            <span aria-hidden="true">{values.message.length}/2000</span>
          </div>
          {fieldError("message")}
        </div>
        <div className={styles.continue}>
          <p>
            Revisarás el mensaje antes de abrir WhatsApp. Tú decides cuándo
            enviarlo allí.
          </p>
          <button className={styles.primary} type="submit">
            Continuar por WhatsApp <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </div>
        <p className={styles.privacy}>
          Los campos con * son necesarios para preparar tu consulta. Esta web no
          guarda tus respuestas en un servidor ni en el almacenamiento del
          navegador. <a href="/privacidad">Información de privacidad</a>.
        </p>
      </form>
    </section>
  );
}

export function ParticipationForm(props: ParticipationFormProps = {}) {
  return (
    <Suspense
      fallback={
        <div className={styles.card} aria-busy="true">
          <p>Preparando el formulario de participación…</p>
          <p>
            También puedes{" "}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              conversar con Kiryus por WhatsApp
            </a>
            .
          </p>
        </div>
      }
    >
      <ParticipationFormContent {...props} />
    </Suspense>
  );
}

export default ParticipationForm;
