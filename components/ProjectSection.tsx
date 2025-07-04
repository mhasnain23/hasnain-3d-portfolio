
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const projects = [
  {
    title: "Trakwise - Finance Made Easy",
    description: "Full-stack application with Next.js, Tailwind CSS, MongoDB, and Clerk, LemmonSqeezy",
    tech: ["Next.js", "MongoDB", "Tailwind CSS", "LemmonSqueezy", "Clerk"],
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&w=600&h=400"
  },
  {
    title: "E-commerce solution + CMS",
    description: "Modern e-commerce platform with payment processing and inventory management",
    tech: ["Next.js", "Tailwind CSS", "MongoDB", "Sanity.io", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&h=400"
  },
  {
    title: "AI Assistant Agents - Chatbot",
    description: "Real-time chat application with AI-powered responses",
    tech: ["Python", "OpenAI Agents SDK", "Chainlit"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&h=400"
  }
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial scroll animation with 3D effects
    gsap.fromTo(
      ".project-card",
      { 
        y: 100, 
        opacity: 0,
        rotationX: -45,
        z: -150
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        z: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    // Add 3D hover interactions to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      const element = card as HTMLElement;
      const showcaseImage = element.querySelector('.showcase-image') as HTMLElement;
      
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          rotationY: 10,
          rotationX: 5,
          scale: 1.05,
          z: 50,
          duration: 0.5,
          ease: "power2.out"
        });

        // Show showcase image
        if (showcaseImage) {
          gsap.set(showcaseImage, { display: 'block' });
          gsap.fromTo(showcaseImage, 
            { y: -50, opacity: 0, scale: 0.8 },
            { y: -20, opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
          );
        }
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          z: 0,
          duration: 0.5,
          ease: "power2.out"
        });

        // Hide showcase image
        if (showcaseImage) {
          gsap.to(showcaseImage, {
            y: -50,
            opacity: 0,
            scale: 0.8,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(showcaseImage, { display: 'none' });
            }
          });
        }
      });

      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        gsap.to(element, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.2,
          ease: "power2.out"
        });

        // Move showcase image to follow mouse
        if (showcaseImage) {
          const imageX = x - 150; // Offset to center the image
          const imageY = y - 180; // Position above cursor
          
          gsap.to(showcaseImage, {
            x: imageX,
            y: imageY,
            duration: 0.1,
            ease: "power2.out"
          });
        }
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20" style={{ perspective: '1200px' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
          Featured Projects
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-white transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 cursor-pointer relative"
              style={{ 
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
            >
              {/* Showcase Image */}
              <div 
                className="showcase-image absolute top-0 left-0 pointer-events-none z-50 hidden"
                style={{ transform: 'translateZ(100px)' }}
              >
                <Image 
                  src={project.image} 
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-72 h-48 object-cover rounded-lg shadow-2xl border-2 border-white/20"
                />
              </div>

              <div style={{ transform: 'translateZ(30px)' }}>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {project.title}
                </h3>
              </div>
              
              <div style={{ transform: 'translateZ(20px)' }}>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2" style={{ transform: 'translateZ(10px)' }}>
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-gray-800 text-sm px-3 py-1 rounded-full border border-gray-600 hover:border-gray-400 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* 3D depth effect overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl pointer-events-none"
                style={{ transform: 'translateZ(5px)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;