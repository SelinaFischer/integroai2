import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import scorecardPreview from "@/assets/ai-readiness-scorecard-preview.png";

const CTA = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#BACBCB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-[1300px] mx-auto"
        >
          {/* CTA card */}
          <div className="bg-[#012F46] border border-white/10 rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(2,11,20,0.35)] grid grid-cols-1 lg:grid-cols-[62fr_38fr]">

            {/* Left panel — scorecard preview image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center bg-[#031523]/40 p-6 sm:p-8 lg:p-10 border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/10"
            >
              <img
                src={scorecardPreview}
                alt="AI Readiness Assessment scorecard preview showing business readiness score, dimensions and priority focus areas"
                className="w-full h-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            {/* Right panel — CTA copy */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center p-8 sm:p-10 lg:p-12"
            >
              {/* Pill */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 border border-[#F5A302] bg-transparent rounded-full px-4 py-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#F6C35B] flex-shrink-0" aria-hidden="true" />
                  <span className="text-[#F6C35B] text-sm font-medium">Get clarity. Invest with confidence.</span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] text-white font-bold leading-tight mb-4">
                Unsure where{" "}
                <span className="text-[#F5A302]">AI is worth investing</span>{" "}
                first?
              </h2>

              {/* Supporting copy */}
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
                Take the free AI Readiness Assessment to see where your business stands, which operational gaps may be creating friction, and what needs attention before you invest.
              </p>

              {/* CTA button */}
              <div className="mb-8">
                <a
                  href="https://integroai.tech/assessment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#F5A302] hover:bg-[#e09502] text-white hover:text-white font-semibold rounded-[10px] h-[54px] px-8 text-[15px] transition-colors duration-200 group"
                >
                  Start the AI Readiness Assessment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-3">
                {[
                  "Decide what is worth solving",
                  "Reduce risk before spend",
                  "Clear next steps",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5A302] flex-shrink-0" aria-hidden="true" />
                    <span className="text-white/85 text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
