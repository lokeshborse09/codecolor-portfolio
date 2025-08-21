import React from 'react';
import { Award, Camera, Film, Users } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Camera, value: '6+', label: 'Years Experience' },
    { icon: Film, value: '200+', label: 'Projects Completed' },
    { icon: Users, value: '150+', label: 'Happy Clients' },
    { icon: Award, value: '25+', label: 'Awards Won' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              About <span className="text-yellow-400">Me</span>
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I'm a passionate Video Editor and Cinematographer with over 6 years of experience 
              in creating compelling visual narratives. My journey began with a deep love for 
              storytelling and has evolved into a professional expertise in bringing brands and 
              stories to life through the power of video.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              From concept to final cut, I specialize in crafting cinematic experiences that 
              resonate with audiences. Whether it's commercial work, documentaries, or creative 
              content, I bring technical excellence and artistic vision to every project.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <stat.icon className="h-8 w-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              {/* ✅ Use public folder reference */}
              <img 
                src="https://raw.githubusercontent.com/lokeshborse09/codecolor-portfolio/main/src/components/me.jpeg"
                alt="Video Editor at work"
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-black p-6 rounded-xl">
              <div className="text-2xl font-bold">6+</div>
              <div className="text-sm font-medium">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
