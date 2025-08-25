import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

// Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// EmailJS config
const EMAILJS_SERVICE_ID = import.meta.env.EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = import.meta.env.EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = import.meta.env.EMAILJS_PUBLIC_KEY!;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // 1️⃣ Insert into Supabase
      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert([{ ...formData, submitted_at: new Date().toISOString() }]);

      if (supabaseError) throw supabaseError;

      // 2️⃣ Send Email via EmailJS
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        time: new Date().toLocaleString(),
        to_email: 'codecolor09@gmail.com'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({ type: 'success', message: "Thank you! Your message has been sent successfully." });
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error: any) {
      setSubmitStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Get In <span className="text-yellow-400">Touch</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Ready to bring your vision to life? Let's discuss your next project and create something extraordinary together.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Let's Start a Conversation</h3>
            <div className="space-y-6 mb-8">
              <div className="flex items-center"><Mail className="h-6 w-6 text-yellow-400 mr-4" /><div className="text-white">codecolor09@gmail.com</div></div>
              <div className="flex items-center"><Phone className="h-6 w-6 text-yellow-400 mr-4" /><div className="text-white">+91 8623083109</div></div>
              <div className="flex items-center"><MapPin className="h-6 w-6 text-yellow-400 mr-4" /><div className="text-white">Pune, MH</div></div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus.type && (
                <div className={`p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-900/50 border border-green-500 text-green-300' : 'bg-red-900/50 border border-red-500 text-red-300'}`}>
                  {submitStatus.message}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white" />
              </div>

              <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Subject" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white" />
              <textarea name="message" value={formData.message} onChange={handleChange} rows={6} placeholder="Tell me about your project..." required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"></textarea>

              <button type="submit" disabled={isSubmitting} className="w-full bg-yellow-400 text-black py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
