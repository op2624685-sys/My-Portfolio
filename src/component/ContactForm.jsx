import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const env = import.meta.env || {};
      const serviceId = env.VITE_EMAILJS_SERVICE_ID;
      const templateId = env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS keys are missing. Please check your .env file.');
      }

      await emailjs.send(
        serviceId,
        templateId,
        formData,
        publicKey
      );

      setStatus('success');
      setFormData({ user_name: '', user_email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setErrorMsg(error.text || error.message || 'Failed to send message. Please try again later.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl"
    >
      <form
        onSubmit={handleSubmit}
        className="relative z-10 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        style={{
          boxShadow: '0 0 40px rgba(16, 185, 129, 0.05)'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Name</label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-400 focus:bg-white/10"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
              placeholder="email@example.com"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-400 focus:bg-white/10"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="How can I help you?"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-400 focus:bg-white/10"
          />
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your message here..."
            rows="4"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-emerald-400 focus:bg-white/10 resize-none"
          />
        </div>

        <div className="relative">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full group relative overflow-hidden py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-900/98 backdrop-blur-2xl rounded-3xl border border-emerald-400/30 shadow-2xl"
            >
              <div className="text-center p-6">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-all"
                >
                  Send Another
                </button>
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-900/98 backdrop-blur-2xl rounded-3xl border border-red-400/30 shadow-2xl"
            >
              <div className="text-center p-6">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Oops!</h3>
                <p className="text-gray-300 mb-4">{errorMsg}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-all"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default ContactForm;
