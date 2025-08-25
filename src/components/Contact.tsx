import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const serviceID = 'service_b2v5f4q';
    const templateID = 'template_g83cdxo';
    const userID = 'vtAF-qnS5DZ5fbYUp';

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceID,
          template_id: templateID,
          user_id: userID,
          template_params: templateParams
        })
      });

      if (res.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: 'Failed to send message.' });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({ type: 'error', message: 'Network error. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/code_and_color1?igsh=b2plZjdjNDl4ZG8x', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@codecolor-v8l?si=jdFBg2BVKbAChh9j', label: 'YouTube' },
    { icon: FaWhatsapp, href: 'https://wa.me/918623083109', label: 'WhatsApp' }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Get In <span className="text-yellow-400">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your vision to life? Let's discuss your next project 
            and create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Let's Start a Conversation</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-yellow-400 mr-4" />
                <div>
                  <div className="text-white font-medium">Email</div>
                  <div className="text-gray-300">codecolor09@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-yellow-400 mr-4" />
                <div>
                  <div className="text-white font-medium">Phone</div>
                  <div className="text-gray-300">+91 8623083109</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-yellow-400 mr-4" />
                <div>
                  <div className="text-white font-medium">Location</div>
                  <div className="text-gray-300">Pune, MH</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-white mb-4">Follow My Work</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-full text-gray-300 hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus.type && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-900/50 border border-green-500 text-green-300' 
                    : 'bg-red-900/50 border border-red-500 text-red-300'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
<div>
  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
    Phone Number
  </label>
  <input
    type="tel"
    id="phone"
    name="phone"
    value={formData.phone || ""}
    onChange={handleChange}
    required
    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
    placeholder="+91 9876543210"
  />
</div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  placeholder="Project Subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-lg font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
