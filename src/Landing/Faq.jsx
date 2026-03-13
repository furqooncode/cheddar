import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "When does the next Cheddar drop release?",
    answer:
      "Our collections are released through limited drops. Join the waitlist to be notified before each drop goes live."
  },
  {
    question: "Are Cheddar pieces limited edition?",
    answer:
      "Yes. Each Cheddar collection is produced in limited quantities to maintain exclusivity and uniqueness."
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, Cheddar ships worldwide. Shipping costs and delivery times vary depending on your location."
  },
  {
    question: "What makes Cheddar different from other streetwear brands?",
    answer:
      "Cheddar focuses on premium craftsmanship, luxury aesthetics, and limited releases that combine comfort with timeless style."
  }
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase">
            Frequently Asked Questions
          </h2>

          <div className="flex justify-center mt-4">
            <div>
              <div className="w-20 h-[3px] bg-[#d4a373]"></div>
              <div className="w-12 h-[3px] bg-[#d4a373] mt-1"></div>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-md"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left p-5 font-semibold flex justify-between items-center"
              >
                {faq.question}

                <span className="text-[#d4a373] text-xl">
                  {active === index ? "-" : "+"}
                </span>
              </button>

              {active === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-5 pb-5 text-gray-300 text-sm"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}