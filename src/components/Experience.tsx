import React from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      year: '2025 - Present',
      title: 'CEO, Senior Video Editor & Cinematographer',
      company: 'Code And Color',
      location: 'Hinjewadi, Pune',
      description: 'Leading cinematography and post-production for high-profile commercial and documentary projects. Overseeing a team of junior editors and managing client relationships.',
      achievements: [
        'Directed cinematography for 50+ commercial projects',
        'Increased client satisfaction rate to 98%'
        
      ]
    },
    {
      year: '2022 - 2024',
      title: 'Cinematographer, Video Editor & Content Creator',
      company: 'Digital Media Agency',
      location: 'Work From Home',
      description: 'Specialized in creating engaging video content for social media platforms and digital marketing campaigns. Developed content strategies that increased audience engagement by 200%. , and also wedding Projects',
      achievements: [
        'Created 200+ videos for social media campaigns',
        'Boosted client engagement rates by 200%',
        'Managed multiple high-profile brand accounts'
      ]
    },
    {
      year: '2020 - 2022',
      title: 'Junior Cinematographer',
      company: 'Freelancing And Shiv Photography | Films ',
      location: 'Amalner, Jalgaon, MH',
      description: 'Worked on Weddings projects and documentaries as assistant cinematographer. Gained extensive experience in various camera systems and lighting techniques.',
      achievements: [
        'Contributed to 50+ independent weddings film projects',
        'Mastered in Canon, Sony camera systems',
        'Developed expertise in natural lighting techniques'
      ]
    },
    {
      year: '2019 - 2020',
      title: 'Cinematography Assistant',
      company: 'Shiv Photography | Films',
      location: 'Amalner, Jalgaon, MH',
      description: 'Started career as production assistant, learning the fundamentals of video production, equipment handling, and post-production workflows.',
      achievements: [
        'Assisted in 30+ wedding Projects',
        'Learned industry-standard post-production software',
        'Built strong foundation in video production'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            My <span className="text-yellow-400">Experience</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Six years of professional growth in the video production industry, 
            from assistant to senior cinematographer and editor.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-yellow-400"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:items-start`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-black z-10"></div>

                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-16 md:ml-0`}>
                  <div className="bg-gray-900 rounded-2xl p-8 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900 transition-all duration-300 group">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 text-yellow-400 mr-2" />
                      <span className="text-yellow-400 font-semibold">{exp.year}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    
                    <div className="flex items-center text-gray-300 mb-4">
                      <span className="font-medium">{exp.company}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{exp.location}</span>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center mb-3">
                        <Award className="h-5 w-5 text-yellow-400 mr-2" />
                        <span className="text-white font-semibold">Key Achievements</span>
                      </div>
                      {exp.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;