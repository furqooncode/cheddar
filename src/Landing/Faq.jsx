
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "When does the next Cheddar drop release?",
    answer:
      "Our collections are released through limited drops. Join the waitlist to be notified before each drop goes live — waitlist members always get first access.",
  },
  {
    question: "Are Cheddar pieces limited edition?",
    answer:
      "Yes. Each Cheddar collection is produced in limited quantities to maintain exclusivity and uniqueness. Once a piece sells out, it's gone for good.",
  },
  {
    question: "Do you ship across Nigeria?",
    answer:
      "Yes, we ship to all 36 states including FCT. Delivery within Lagos takes 1–2 business days. Other states typically take 3–5 business days via our courier partners.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, Cheddar ships worldwide. Shipping costs and delivery times vary depending on your location. International orders are processed within 2 business days.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, debit/credit cards, and wallet payments via Monnify. You can also pay using your Cheddar Coin (CHD) balance at checkout.",
  },
  {
    question: "What is Cheddar Coin (CHD)?",
    answer:
      "Cheddar Coin is our in-app loyalty currency. Every purchase earns you CHD which you can use to offset the cost of future orders. 1 CHD = ₦1,500.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also check your order status directly from your account dashboard.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "We accept returns within 7 days of delivery for items in original condition with tags intact. Exchanges are subject to stock availability. Reach out to our support team to initiate a return.",
  },
  {
    question: "What makes Cheddar different from other streetwear brands?",
    answer:
      "Cheddar focuses on premium craftsmanship, luxury aesthetics, and limited releases that combine comfort with timeless style — built specifically for the discerning Nigerian gentleman.",
  },
  {
    question: "Are your sizes true to fit?",
    answer:
      "Our pieces run slightly oversized by design. We recommend checking the size guide on each product page. If you're between sizes, size down for a more fitted look.",
  },
]

export default function FAQ() {
  const [active, setActive] = useState(null)

  const toggle = (index) => {
    setActive(active === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="bg-[#0b0b0b] text-white py-24 px-6 sm:px-8 lg:px-16"
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: "#d4a373" }}>
            — Got Questions?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase">
            Frequently Asked Questions
          </h2>
          <div className="flex justify-center mt-4">
            <div>
              <div className="w-20 h-[3px] bg-[#d4a373]" />
              <div className="w-12 h-[3px] bg-[#d4a373] mt-1" />
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: active === index ? "rgba(212,163,115,0.06)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${active === index ? "rgba(212,163,115,0.25)" : "rgba(255,255,255,0.08)"}`,
                backdropFilter: "blur(12px)",
                transition: "background 0.3s ease, border-color 0.3s ease",
              }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-5 py-4 flex justify-between items-center gap-4"
              >
                <span
                  className="text-sm sm:text-base font-semibold leading-snug"
                  style={{ color: active === index ? "#d4a373" : "#F5F5F5", transition: "color 0.3s ease" }}
                >
                  {faq.question}
                </span>

                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: active === index ? "#d4a373" : "rgba(255,255,255,0.06)",
                    border: `1px solid ${active === index ? "#d4a373" : "rgba(255,255,255,0.12)"}`,
                    color: active === index ? "#0a0a0a" : "#F5F5F5",
                  }}
                >
                  <span className="text-sm font-bold leading-none">
          {active === index ? "−" : "+"}
                  </span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {active === index && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-5 pb-5">
                      <div className="w-full h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
