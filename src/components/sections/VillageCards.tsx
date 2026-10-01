import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { villages } from "@/content/villages";
import { Photo } from "@/components/ui/Photo";
export function VillageCards() {
  return (
    <div className="village-grid">
      {villages.map((village) => (
        <Link
          className={`village-card village-${village.slug}`}
          href={`/aldeas/${village.slug}`}
          key={village.slug}
        >
          <div className="village-photo">
            <Photo
              image={village.image}
              sizes="(max-width: 700px) 100vw, 33vw"
            />
            <span className="village-number">{village.number}</span>
            <span className="card-arrow">
              <ArrowUpRight size={25} aria-hidden="true" />
            </span>
          </div>
          <div className="village-card-content">
            <p className="location">
              <MapPin size={14} aria-hidden="true" />
              {village.region}
            </p>
            <h3>{village.country}</h3>
            <p className="eyebrow">{village.status}</p>
            <p>{village.description}</p>
            <span className="text-link">
              Explorar aldea <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
