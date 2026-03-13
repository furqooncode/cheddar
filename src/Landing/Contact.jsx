import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#070707] text-white py-24 px-6 sm:px-8 lg:px-16"
    >
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >

        {/* Left Content */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold uppercase">
            Contact Cheddar
          </h2>

          <div className="mt-4 mb-6">
            <div className="w-20 h-[3px] bg-[#d4a373]"></div>
            <div className="w-12 h-[3px] bg-[#d4a373] mt-1"></div>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Have questions about our collections, upcoming drops, or
            collaborations? Reach out to the Cheddar team and we'll get back to
            you as soon as possible.
          </p>

          <p className="text-gray-400 mt-4">
            Email: <span className="text-[#d4a373]">support@cheddar.com</span>
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#d4a373] outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#d4a373] outline-none"
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#d4a373] outline-none"
          />

          <button
            className="w-full py-3 rounded-full bg-[#d4a373] text-black font-semibold hover:scale-105 transition"
          >
            Send Message
          </button>

        </form>
      </motion.div>
    </section>
  );
}