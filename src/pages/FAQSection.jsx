import React, { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const faqs = [
  {
    q: "Do I need to book an appointment in advance?",
    a: "Yes, we recommend booking in advance to ensure availability and preferred time slots.",
  },
  {
    q: "Which beauty products do you use?",
    a: "We use premium and dermatologically tested products from trusted global brands.",
  },
  {
    q: "Do you offer bridal packages?",
    a: "Yes, we offer customized bridal packages including makeup, hair styling, and skincare.",
  },
  {
    q: "What safety measures are in place for COVID-19?",
    a: "We follow strict hygiene protocols including sanitization, mask-wearing, and social distancing.",
  },
  {
    q: "Can I get a consultation before choosing a service?",
    a: "Absolutely! We offer free consultations to help you choose the best services for your needs.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations should be made at least 24 hours in advance to avoid charges.",
  },
  {
    q: "Do you offer group bookings or party packages?",
    a: "Yes, we offer special packages for groups and parties. Contact us for more details.",
  },
  {
    q: "Are your therapists and beauticians certified?",
    a: "Yes, all our professionals are certified and trained in the latest beauty techniques.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash, credit/debit cards, and digital wallets for your convenience.",
  },
  {
    q: "Do you have loyalty programs or discounts?",
    a: "Yes, we offer loyalty programs and seasonal discounts. Follow us on instagram for our newsletter to stay updated.",
  },
  {
    q: "Can I customize my service package?",
    a: "Yes, we can tailor services to meet your specific beauty needs and preferences.",
  },
  {
    q: "What are your operating hours?",
    a: "We are open from 10 AM to 8 PM, Monday to Saturday. Closed on Sundays.",
  },
  {
    q: "Is parking available at your location?",
    a: "Yes, we have ample parking space available for our clients.",
  },
  {
    q: "Do you offer gift cards?",
    a: "Yes, gift cards are available for purchase both in-store and online.",
  },
  {
    q: "What should I expect during my first visit?",
    a: "During your first visit, we will conduct a consultation to understand your needs and recommend suitable services.",
  },
  {
    q: "Are walk-ins welcome?",
    a: "While we prefer appointments, we do accept walk-ins based on availability.",
  },
];

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <motion.section
      className="py-10 bg-gradient-to-r from-pink-50 to-white"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center p-3 text-left bg-gray-400"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-gray-800">{faq.q}</span>
                <span className="text-pink-500 font-bold text-3xl">{openFaq === i ? "-" : "+"}</span>
              </button>
              {openFaq === i && (
                <div className="px-5 p-2 pb-5 text-gray-600">{faq.a}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
