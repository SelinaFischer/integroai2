import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { extraServices } from "@/lib/extraServices";
import { trackGuideClick } from "@/lib/guide";

// The standalone services as a ruled list: name on the left, what it does on
// the right. Deliberately not cards, so it reads differently from the six
// numbered stages. Used on the homepage and on /work-with-me.
const ExtraServicesList = () => (
  <ul className="w-full list-none border-b border-brand-sand">
    {extraServices.map((service) => {
      const Icon = service.icon;
      return (
        <li
          key={service.title}
          className="grid grid-cols-1 gap-x-12 gap-y-3 border-t border-brand-sand py-7 text-left md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] md:items-center"
          itemScope
          itemType="https://schema.org/Service"
          itemProp="itemListElement"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-brand-chip text-brand-navy">
              <Icon className="h-[22px] w-[22px]" strokeWidth={2} aria-hidden="true" />
            </span>
            <h3 className="display text-[28px] !font-semibold leading-[1.1] !text-brand-navy lg:text-[32px]" itemProp="name">
              {service.title}
            </h3>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="text-base leading-relaxed text-brand-slate" itemProp="description">
              {service.description}
            </p>
            {service.link && (
              <Link
                to={service.link.to}
                onClick={() => trackGuideClick("visibility-service")}
                className="flex w-fit items-center gap-1.5 text-[15px] font-bold text-brand-navy underline decoration-brand-amber decoration-2 underline-offset-4"
              >
                {service.link.label}
                <ArrowRight className="h-4 w-4 flex-none" strokeWidth={2.6} aria-hidden="true" />
              </Link>
            )}
          </div>
        </li>
      );
    })}
  </ul>
);

export default ExtraServicesList;
