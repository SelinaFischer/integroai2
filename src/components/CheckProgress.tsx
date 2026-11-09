import { useEffect, useState } from "react";

// Shown while the AI visibility check runs (it can take up to a minute).
// The check is a single request, so the page cannot know which item is being
// looked at right now. This list therefore makes no claim about progress: it
// shows what the check looks at, with a highlight that moves down the list so
// the wait feels alive. Nothing is ticked off as "done".
// Wording follows the "What does the AI visibility check look at?" answer on
// the same page.
const LOOKING_AT = [
  "The page you entered",
  "Whether main AI crawlers are blocked in robots.txt",
  "Whether your words can be read without JavaScript",
  "Your titles and headings",
  "Your structured data and sitemap",
];

const CheckProgress = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % LOOKING_AT.length), 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="check-progress rounded-xl border border-brand-sand bg-brand-ivory px-4 py-3.5" aria-hidden="true">
      <p className="pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-teal">What the check looks at</p>
      <ul className="flex list-none flex-col gap-1.5">
        {LOOKING_AT.map((item, index) => (
          <li
            key={item}
            data-current={index === current ? "" : undefined}
            className="check-progress-item flex items-start gap-2.5 text-sm leading-snug text-brand-slate"
          >
            <span className="check-progress-dot mt-[6px] h-2 w-2 flex-none rounded-full bg-brand-sand" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckProgress;
