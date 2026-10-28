import { Mail, Phone, Twitter, Facebook, Figma, Instagram, Youtube, Send } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import footerBg from "../../assets/footer-bg.webp";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-cover bg-center pb-6 bg-fixed overflow-hidden relative"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      {/* Overlay to ensure high contrast and readability */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6">
          {/* First card: Contact */}
          <motion.div
            className="flex-1 bg-white/95 backdrop-blur-sm shadow-xl p-8 rounded-3xl flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="uppercase border-b border-gray-200 text-2xl font-bold tracking-tight pb-3 mb-6 text-gray-900">
                Contact
              </h2>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:hello@frenzy.webflow.io"
                  className="flex items-center gap-4 group p-2 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-black text-white p-3 rounded-2xl group-hover:bg-[#d681d6] transition-colors">
                    <Mail size={22} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-black">
                    hello@frenzy.webflow.io
                  </span>
                </a>

                <a
                  href="tel:+51234567890"
                  className="flex items-center gap-4 group p-2 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-black text-white p-3 rounded-2xl group-hover:bg-[#d681d6] transition-colors">
                    <Phone size={22} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-black">
                    +5 (123) 456 789 0
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Second card: Socials */}
          <motion.div
            className="flex-1 bg-white/95 backdrop-blur-sm shadow-xl p-8 rounded-3xl flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="uppercase border-b border-gray-200 text-2xl font-bold tracking-tight pb-3 mb-6 text-gray-900">
                Socials
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Follow our official accounts to stay informed with latest posts and community discussions.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
                  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
                  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
                  { icon: Figma, label: "Figma", href: "https://figma.com" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="bg-black hover:bg-[#d681d6] text-white p-3.5 rounded-2xl transition-all duration-200 hover:scale-105"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Third card: Newsletter */}
          <motion.div
            className="flex-1 bg-white/95 backdrop-blur-sm shadow-xl p-8 rounded-3xl flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="uppercase border-b border-gray-200 text-2xl font-bold tracking-tight pb-3 mb-3 text-gray-900">
                Newsletter
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Stay ahead of the curve with our exclusive daily newsletter delivered directly to your inbox!
              </p>
              <Formik
                initialValues={{ email: '' }}
                onSubmit={(values, { resetForm }) => {
                  if (!values.email || !/^\S+@\S+\.\S+$/.test(values.email)) {
                    toast.error('Please provide a valid email address');
                    return;
                  }
                  toast.success('Thank you for subscribing to our newsletter!');
                  resetForm();
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col sm:flex-row gap-2">
                    <Field
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-2xl px-4 py-3 focus:outline-none focus:border-[#d681d6] focus:ring-2 focus:ring-[#d681d6]/20 transition-all"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg disabled:opacity-60"
                    >
                      <span>Subscribe</span>
                      <Send size={16} />
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </div>

        {/* Bottom copyright banner */}
        <motion.div
          className="mt-10 bg-white/90 backdrop-blur-sm text-center py-4 px-6 rounded-2xl text-sm font-semibold shadow-lg text-gray-700 flex items-center justify-center gap-1.5 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="text-[#d681d6]">©</span>
          <span>{currentYear}</span>
          <span className="text-[#d681d6] font-bold">Frenzy Blog</span>
          <span>• Crafted with care by</span>
          <span className="text-[#d681d6] font-bold">Ahmed Ragab</span>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
