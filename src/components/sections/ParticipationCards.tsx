import Link from "next/link";
import { ArrowUpRight, Compass, HandHeart, House, Sprout } from "lucide-react";
import { participationOptions } from "@/content/villages";
const icons = { Compass, HandHeart, House, Sprout };
export function ParticipationCards() {
  return (
    <div className="participation-grid">
      {participationOptions.map((option) => {
        const Icon = icons[option.icon];
        return (
          <Link
            href={`/involucrate?interes=${option.slug}`}
            className="participation-card"
            key={option.slug}
          >
            <span className="participation-card-top">
              <Icon size={30} strokeWidth={1.3} aria-hidden="true" />
              <span>{option.number}</span>
            </span>
            <h3>{option.title}</h3>
            <p>{option.text}</p>
            <span className="text-link">
              Empezar una conversación{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
