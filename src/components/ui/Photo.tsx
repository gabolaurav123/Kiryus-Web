import Image from "next/image";
import type { DocumentaryImage } from "@/content/villages";
export function Photo({
  image,
  className = "",
  priority = false,
  quality = 75,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  image: DocumentaryImage;
  className?: string;
  priority?: boolean;
  quality?: 75 | 85;
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
      quality={quality}
    />
  );
}
