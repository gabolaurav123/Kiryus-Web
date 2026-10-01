import { getImageProps } from "next/image";
import type { EnhancedImage } from "@/content/enhanced-images";

/** Art direction preserves a useful composition at each viewport size. */
export function ResponsiveHeroPhoto({
  desktop,
  mobile,
}: {
  desktop: EnhancedImage;
  mobile: EnhancedImage;
}) {
  const common = {
    alt: "Momentos de vida en Comunidad Kiryus, en fotografías restauradas con IA.",
    sizes: "100vw",
    quality: 85,
    loading: "eager" as const,
    fetchPriority: "high" as const,
    className: "photo",
  };
  const { props: desktopProps } = getImageProps({ ...common, src: desktop.src, width: desktop.width, height: desktop.height });
  const { props: mobileProps } = getImageProps({ ...common, src: mobile.src, width: mobile.width, height: mobile.height });

  return (
    <>
      <link rel="preload" as="image" media="(min-width: 701px)" imageSrcSet={desktopProps.srcSet} imageSizes={desktopProps.sizes} fetchPriority="high" />
      <link rel="preload" as="image" media="(max-width: 700px)" imageSrcSet={mobileProps.srcSet} imageSizes={mobileProps.sizes} fetchPriority="high" />
      <picture>
        <source media="(max-width: 700px)" srcSet={mobileProps.srcSet} sizes={mobileProps.sizes} width={mobile.width} height={mobile.height} />
        {/* Next supplies optimized src/srcSet through getImageProps for picture. */}
        <img {...desktopProps} alt={common.alt} />
      </picture>
    </>
  );
}
