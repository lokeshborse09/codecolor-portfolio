import React, { useState, useRef } from 'react';
import { Play, X, ExternalLink, Calendar, Eye } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string; // original shorts link
  embedUrl: string; // proper embed url
  category: string;
  duration: string;
  views: string;
  date: string;
}

const Showreel: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Shorts Videos
  const [videos] = useState<Video[]>([
    {
      id: 'short1',
      title: 'Short Film 1',
      description: 'YouTube Shorts Showcase',
      thumbnail: 'https://img.youtube.com/vi/WX2Pl7MwRYc/hqdefault.jpg',
      videoUrl: 'https://youtube.com/shorts/WX2Pl7MwRYc?feature=share',
      embedUrl: 'https://www.youtube.com/embed/WX2Pl7MwRYc',
      category: 'shorts',
      duration: '0:30',
      views: '1K',
      date: '2025'
    },
    {
      id: 'short2',
      title: 'Short Film 2',
      description: 'Another creative short',
      thumbnail: 'https://img.youtube.com/vi/hXMZvzlAIV0/hqdefault.jpg',
      videoUrl: 'https://youtube.com/shorts/hXMZvzlAIV0?feature=share',
      embedUrl: 'https://www.youtube.com/embed/hXMZvzlAIV0',
      category: 'shorts',
      duration: '0:45',
      views: '2K',
      date: '2025'
    },
    {
      id: 'short3',
      title: 'Short Film 3',
      description: 'Cinematic clip',
      thumbnail: 'https://img.youtube.com/vi/zj5infFT0KM/hqdefault.jpg',
      videoUrl: 'https://youtube.com/shorts/zj5infFT0KM?feature=share',
      embedUrl: 'https://www.youtube.com/embed/zj5infFT0KM',
      category: 'shorts',
      duration: '0:40',
      views: '3K',
      date: '2025'
    },
    {
      id: 'short4',
      title: 'Short Film 4',
      description: 'Quick storytelling',
      thumbnail: 'https://img.youtube.com/vi/wqhTOqip8X4/hqdefault.jpg',
      videoUrl: 'https://youtube.com/shorts/wqhTOqip8X4?feature=share',
      embedUrl: 'https://www.youtube.com/embed/wqhTOqip8X4',
      category: 'shorts',
      duration: '0:35',
      views: '4K',
      date: '2025'
    },
    {
      id: 'short5',
      title: 'Short Film 5',
      description: 'Stylish cinematography',
      thumbnail: 'https://img.youtube.com/vi/k_YpYqNjVx8/hqdefault.jpg',
      videoUrl: 'https://youtube.com/shorts/k_YpYqNjVx8?feature=share',
      embedUrl: 'https://www.youtube.com/embed/k_YpYqNjVx8',
      category: 'shorts',
      duration: '0:28',
      views: '5K',
      date: '2025'
    },
    {
      id: 'short6',
      title: 'Short Film 6',
      description: 'Creative transitions',
      thumbnail: 'https://img.youtube.com/vi/2_QQ2vwun3Q/hqdefault.jpg',
      videoUrl: 'https://youtube.com/shorts/2_QQ2vwun3Q?feature=share',
      embedUrl: 'https://www.youtube.com/embed/2_QQ2vwun3Q',
      category: 'shorts',
      duration: '0:50',
      views: '6K',
      date: '2025'
    },
    {
      id: 'short7',
      title: 'Short Film 7',
      description: 'Fast-paced montage',
      thumbnail: 'https://img.youtube.com/vi/v6tlTLOkSyQ/hqdefault.jpg',
      videoUrl: 'https://youtube.com/shorts/v6tlTLOkSyQ?feature=share',
      embedUrl: 'https://www.youtube.com/embed/v6tlTLOkSyQ',
      category: 'shorts',
      duration: '0:33',
      views: '7K',
      date: '2025'
    },
    {
      id: 'short8',
      title: 'Short Film 8',
      description: 'Engaging visual cut',
      thumbnail: 'https://img.youtube.com/vi/SAFx8x8EO78/hqdefault.jpg',
      videoUrl: 'https://youtube.com/shorts/SAFx8x8EO78?feature=share',
      embedUrl: 'https://www.youtube.com/embed/SAFx8x8EO78',
      category: 'shorts',
      duration: '0:38',
      views: '8K',
      date: '2025'
    },
    {
      id: 'short9',
      title: 'Short Film 9',
      description: 'Stylized vertical video',
      thumbnail: 'https://img.youtube.com/vi/2bKighN7WKg/hqdefault.jpg',
      videoUrl: 'https://youtube.com/shorts/2bKighN7WKg?feature=share',
      embedUrl: 'https://www.youtube.com/embed/2bKighN7WKg',
      category: 'shorts',
      duration: '0:41',
      views: '9K',
      date: '2025'
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Videos' },
    { id: 'shorts', name: 'YouTube Shorts' }
  ];

  const filteredVideos =
    selectedCategory === 'all'
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  return (
    <section id="showreel" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            My <span className="text-yellow-400">Showreel</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            A curated collection of YouTube Shorts that showcase my creative vision.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-900 hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-yellow-400 text-black p-4 rounded-full hover:scale-110 transition-transform duration-300">
                    <Play className="h-8 w-8" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{video.description}</p>
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1"><Eye className="h-4 w-4" />{video.views}</div>
                    <div className="flex items-center gap-1"><Calendar className="h-4 w-4" />{video.date}</div>
                  </div>
                  <span className="bg-gray-800 px-2 py-1 rounded text-xs capitalize">{video.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">{selectedVideo.title}</h3>
                  <button onClick={() => setSelectedVideo(null)} className="text-gray-400 hover:text-white transition-colors">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* ✅ Shorts Embed */}
                <div className="aspect-video bg-black rounded-lg mb-6">
                  <iframe
                    key={selectedVideo.id}
                    src={selectedVideo.embedUrl}
                    title={selectedVideo.title}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedVideo.description}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Details</h4>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex justify-between"><span>Duration:</span><span>{selectedVideo.duration}</span></div>
                      <div className="flex justify-between"><span>Views:</span><span>{selectedVideo.views}</span></div>
                      <div className="flex justify-between"><span>Year:</span><span>{selectedVideo.date}</span></div>
                      <div className="flex justify-between"><span>Category:</span><span>{selectedVideo.category}</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <a
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="h-5 w-5" />
                    View on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Showreel;
