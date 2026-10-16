import { ArrowUpRight, BookOpen, Leaf } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { herbalBook } from "@/content/botiquin-herbal";
import styles from "./HerbalBook.module.css";

export function HerbalBook() {
  return (
    <section id="botiquin-herbal" className={styles.section} aria-labelledby="herbal-title">
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.visual}>
          <Photo image={herbalBook.image} quality={85} sizes="(max-width: 760px) 90vw, (max-width: 1100px) 44vw, 520px" />
        </Reveal>
        <Reveal className={styles.copy} delay={0.08}>
          <p className={styles.eyebrow}><Leaf size={16} aria-hidden="true" /> SABERES QUE TE ACOMPAÑAN</p>
          <h2 id="herbal-title">Botiquín<br /><em>Herbal.</em></h2>
          <p className={styles.lead}>Tu botiquín natural,<br />ahora en formato digital.</p>
          <p className={styles.description}>Una guía práctica para conocer plantas medicinales, sus usos tradicionales, preparaciones y precauciones. Ideal para incorporar el conocimiento herbario a tu vida cotidiana de forma más consciente y organizada.</p>
          <p className={styles.format}><BookOpen size={20} aria-hidden="true" /><span><strong>E-book digital</strong><span>Una colección de 5 tomos</span></span></p>
          <div className={styles.purchase}>
            <p className={styles.price}><span>{herbalBook.priceLabel}</span><span>{herbalBook.currency}<small>pesos colombianos</small></span></p>
            <a href={herbalBook.checkoutUrl} target="_blank" rel="noopener noreferrer" className={styles.buy} aria-label="Comprar Botiquín Herbal en Hotmart (se abre en otra pestaña)">Comprar e-book<ArrowUpRight size={21} aria-hidden="true" /></a>
          </div>
          <p className={styles.invitation}>Llévatelo ahora y empieza a crear tu propio Botiquín Herbal.</p>
          <p className={styles.checkoutNote}>Compra en Hotmart. La moneda y el importe final se muestran según tu país.</p>
        </Reveal>
      </div>
    </section>
  );
}
