"use client";

import { usePathname } from "next/navigation";
import { directWhatsapp } from "@/lib/config";
import { SocialIcon } from "@/components/ui/SocialIcon";
import styles from "./FloatingWhatsApp.module.css";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return null;

  return (
    <a
      href={directWhatsapp}
      className={styles.button}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar con Kiryus por WhatsApp (se abre en otra pestaña)"
    >
      <SocialIcon network="whatsapp" size={30} />
      <span className={styles.label} aria-hidden="true">
        Hablemos por WhatsApp
      </span>
    </a>
  );
}
