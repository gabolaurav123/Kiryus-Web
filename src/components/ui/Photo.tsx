import Image from "next/image";
import type { DocumentaryImage } from "@/content/villages";
export function Photo({
  image,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  image: DocumentaryImage;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className={`photo ${className}`}
      style={{ objectPosition: image.position || "center" }}
      sizes={sizes}
      preload={priority}
    />
  );
}
