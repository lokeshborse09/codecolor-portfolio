import React from 'react';
import { Camera, Scissors, Palette, BarChart3 } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Camera,
      title: 'Cinematography',
      description: 'Professional cinematography services including direction of photography, lighting design, and visual storytelling for films, commercials, and documentaries.',
      features: ['Direction of Photography', 'Lighting Design', 'Camera Operation', 'Visual Storytelling']
    },
    {
      icon: Scissors,
      title: 'Video Editing',
      description: 'Expert video editing services from raw footage to polished final cuts, including color correction, sound design, and motion graphics integration.',
      features: ['Post-Production', 'Color Correction', 'Sound Design', 'Motion Graphics']
    },
    {
      icon: Palette,
      title: 'Graphics Design',
      description: 'Creative graphics design for video content, including title sequences, lower thirds, animated logos, and visual effects that enhance your story.',
      features: ['Title Sequences', 'Lower Thirds', 'Animated Logos', 'Visual Effects']
    },
    {
      icon: BarChart3,
      title: 'Content Strategy',
      description: 'Strategic content planning and development to maximize engagement and reach across all platforms, tailored to your brand and audience.',
      features: ['Content Planning', 'Brand Strategy', 'Audience Analysis', 'Platform Optimization']
    }
  ];

  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            My <span className="text-yellow-400">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive video production services to bring your vision to life with 
            professional quality and creative excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-gray-900 rounded-2xl p-8 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900 transition-all duration-300 hover:scale-105"
            >
              <service.icon className="h-12 w-12 text-yellow-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
              
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-400 text-sm flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;