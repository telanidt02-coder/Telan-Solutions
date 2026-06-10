import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Camera, Heart, Users, Award, Sparkles, TrendingUp, X, 
  ChevronLeft, ChevronRight, Play, Pause, Compass, CheckCircle2 
} from 'lucide-react';

interface CultureItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category: 'Workspace' | 'Team Life' | 'Growth' | 'Celebrations';
}

const GALLERY_DATA: CultureItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Collaborative Spirit",
    description: "Our teams work side-by-side on high-impact BPO campaigns, fostering an active environment of daily support and mentorship.",
    category: "Team Life"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Year-End Celebrations",
    description: "Connecting beyond client lines builds the trust that forms the bedrock of our company success and employee longevity.",
    category: "Celebrations"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "State-of-the-Art Workspace",
    description: "Equipped with dual-monitor layouts, professional-grade noise canceling headsets, and high-speed fiber channels in Ortigas Center, Pasig.",
    category: "Workspace"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Professional Training Courses",
    description: "Rigorous onboarding and leadership bootcamps designed to sharpen analytical collection, negotiation strategies, and leadership skills.",
    category: "Growth"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Interactive Client Syncups",
    description: "Transparent feedback channels directly with our major banking and telecom affiliates, aligning goals and resolving pain points.",
    category: "Growth"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Daily Energetic Huddles",
    description: "Starting shifts with metrics reviews, positive energy, motivational challenges, and localized gamification to boost morale.",
    category: "Team Life"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Spacious Wellness Lounge",
    description: "Delivering deep consideration for employee well-being with games, relaxation chairs, and complementary refreshments to un-wind.",
    category: "Workspace"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Team-Bonding Outings",
    description: "Annual excursions, team dinners, and recreational weekend hikes to recharge of our hard-working receivables teams.",
    category: "Celebrations"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Telan Leadership Forum",
    description: "Our executives and team leaders come together monthly to exchange development blueprints and identify rising stars.",
    category: "Growth"
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Community Outreach Drives",
    description: "Bringing our core values of integrity and empathy into local communities through quarterly charitable programs and disaster reliefs.",
    category: "Team Life"
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1531535934202-f022ee715f15?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Townhall Discussions",
    description: "Celebrating outstanding collectors of the month with bonuses, plaque certifications, and full transparent company updates.",
    category: "Celebrations"
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200&h=800",
    title: "Our Customer Care Philosophy",
    description: "Bridging business solutions with genuine human respect, elevating standards for the collection vertical in the Philippines.",
    category: "Workspace"
  }
];

export default function CulturePage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Workspace' | 'Team Life' | 'Growth' | 'Celebrations'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);

  // Filtered items based on categories
  const filteredItems = selectedCategory === 'All' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.category === selectedCategory);

  // Key handlers for Lightbox navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleLightboxNext();
      if (e.key === 'ArrowLeft') handleLightboxPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Lightbox slideshow interval
  useEffect(() => {
    if (!isPlayingSlideshow || lightboxIndex === null) return;
    const interval = setInterval(() => {
      handleLightboxNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlayingSlideshow, lightboxIndex]);

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredItems.length;
    });
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  };

  return (
    <main className="pt-24 min-h-screen bg-slate-50">
      {/* Header Banner */}
      <section className="bg-brand-blue text-white py-24 relative overflow-hidden">
        {/* Background Decors */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold rounded-full blur-[100px]" />
        </div>
        <div className="absolute -bottom-10 right-10 opacity-5 w-72 h-72">
          <Compass className="w-full h-full rotate-45" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/5 backdrop-blur-sm"
          >
            <Camera className="w-4 h-4 text-brand-gold animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-wider text-slate-200">The Telan Experience</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Our Community & <span className="text-brand-gold font-display font-light">Culture</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            We are a premier receivables management firm, but above all, we are a family. Explore the workspace, activities, and continuous growth that define us.
          </motion.p>
        </div>
      </section>

      {/* Main Culture Gallery Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Categories Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100 max-w-2xl mx-auto">
            {(['All', 'Workspace', 'Team Life', 'Growth', 'Celebrations'] as const).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setLightboxIndex(null); // Reset lightbox on filter change because index might mismatch
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-brand-blue'
                }`}
                id={`cat-tab-${category.toLowerCase().replace(' ', '-')}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Interactive Bento / Grid Display */}
          <motion.div 
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer flex flex-col justify-between"
                  onClick={() => setLightboxIndex(index)}
                  id={`gallery-item-${item.id}`}
                >
                  <div className="relative aspect-[4/3] rounded-t-[24px] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badge Category */}
                    <span className="absolute top-4 left-4 bg-brand-blue/90 text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-white/10 shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg leading-snug group-hover:text-brand-gold transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-50 mt-4 pt-3 flex items-center justify-between text-[10px] font-bold text-brand-gold uppercase tracking-widest">
                      <span>View Slide Preview</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Corporate Philosophy Grid */}
      <section className="section-padding bg-white border-y border-slate-100">
        <div className="container-custom">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-brand-gold font-bold uppercase tracking-[0.25em] text-xs mb-3 block">Corporate DNA</span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-blue">Values That Power Us</h2>
            <div className="h-1 w-20 bg-brand-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Inclusivity & Unity",
                desc: "We focus heavily on employee wellness, career safety margins, diverse family backgrounds, and ensuring zero barrier to leadership roles."
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: "Ethical Distinction",
                desc: "Supported directly by the leading legal principles of our law group, we represent banking partners using professional integrity."
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Gamified Operations",
                desc: "Performance is rewarded! Daily perks, active performance metrics bonuses, work rewards, and monthly performance laurels keep our teams soaring."
              }
            ].map((p, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:bg-slate-950 hover:text-white transition-all duration-500 group">
                <div className="w-12 h-12 rounded-2xl bg-[#003366]/5 group-hover:bg-brand-gold/10 flex items-center justify-center text-brand-blue group-hover:text-brand-gold transition-colors duration-400 mb-6">
                  {p.icon}
                </div>
                <h4 className="font-bold text-xl text-brand-blue group-hover:text-white mb-2 transition-colors">{p.title}</h4>
                <p className="text-sm text-slate-500 group-hover:text-slate-300 leading-relaxed transition-colors">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMMERSIVE LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 select-none"
            id="lightbox-overlay"
          >
            {/* Lightbox Topbar */}
            <div className="flex items-center justify-between z-10 w-full text-white">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-brand-gold/20 text-brand-gold rounded-full text-[10px] uppercase tracking-wider font-bold border border-brand-gold/15">
                  {filteredItems[lightboxIndex].category}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Slide {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>

              {/* Close, Play controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlayingSlideshow(!isPlayingSlideshow)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-brand-gold"
                  title={isPlayingSlideshow ? "Pause Slideshow" : "Play Slideshow"}
                >
                  {isPlayingSlideshow ? <Pause className="w-5 h-5 text-brand-gold" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors font-bold text-white hover:text-brand-gold"
                  id="close-lightbox-btn"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Lightbox Main Stage */}
            <div className="flex-grow flex items-center justify-center relative w-full my-4">
              {/* Prev Trigger */}
              <button
                onClick={handleLightboxPrev}
                className="absolute left-0 md:left-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-brand-gold hover:text-slate-950 text-white backdrop-blur-sm border border-white/10 opacity-60 hover:opacity-100 transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* HD Image Canvas */}
              <motion.div 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl max-h-[60vh] md:max-h-[70vh] aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative"
              >
                <img 
                  src={filteredItems[lightboxIndex].image} 
                  alt={filteredItems[lightboxIndex].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Next Trigger */}
              <button
                onClick={handleLightboxNext}
                className="absolute right-0 md:right-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-brand-gold hover:text-slate-950 text-white backdrop-blur-sm border border-white/10 opacity-60 hover:opacity-100 transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Captions / Summary Panel */}
            <div className="max-w-3xl mx-auto text-center text-white pb-4 z-10">
              <motion.h3 
                key={`title-${lightboxIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-3xl font-bold text-white tracking-tight"
              >
                {filteredItems[lightboxIndex].title}
              </motion.h3>
              <motion.p 
                key={`desc-${lightboxIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-300 text-xs md:text-sm mt-2 max-w-2xl mx-auto leading-relaxed"
              >
                {filteredItems[lightboxIndex].description}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action to Apply */}
      <section className="bg-slate-900 py-20 relative overflow-hidden border-t border-brand-gold/10">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-40" />
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto px-6">
          <span className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-4 block">Hiring Openings</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Become Part of the Story</h2>
          <p className="text-slate-400 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Ready to shape a professional life guided by stability, supportive workflows, high technology, and family-oriented support structures? Explore open careers today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/jobs" className="btn-primary py-3.5 px-8 font-bold text-sm tracking-wide rounded-xl">
              Explore Careers
            </Link>
            <Link to="/about" className="btn-outline py-3.5 px-8 font-bold text-sm tracking-wide rounded-xl text-white border-white/20 hover:bg-white/10 hover:border-white">
              About Telan Solutions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
