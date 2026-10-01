import type { ReactNode } from "react";
import type { DocumentaryImage } from "@/content/villages";
import { Photo } from "@/components/ui/Photo";
import styles from "./Discovery.module.css";

export function EditorialHero({
  id,
  label,
  title,
  description,
  image,
  caption,
  children,
}: {
  id: string;
  label: string;
  title: ReactNode;
  description: string;
  image: DocumentaryImage;
  caption: string;
  children?: ReactNode;
}) {
  return (
    <section className={styles.hero} aria-labelledby={id}>
      <Photo image={image} className={styles.heroPhoto} priority sizes="100vw" />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroCopy}>
        <p className={styles.heroLabel}>{label}</p>
        <h1 id={id}>{title}</h1>
        <p className={styles.heroDescription}>{description}</p>
        {children && <div className={styles.heroActions}>{children}</div>}
      </div>
      <span className={styles.heroCaption}>{caption}</span>
    </section>
  );
}
