'use client';
import { Scene } from './Scene';
import { useState, useRef } from 'react';
import gsap from 'gsap';

const FAQS = [
  { q: 'Is it safe for sensitive skin?', a: 'Yes, our extraction process ensures maximum purity, making it ideal for sensitive skin.' },
  { q: 'Can it be used for cooking?', a: 'Absolutely. It has a high smoke point and neutral flavor profile.' },
  { q: 'What does "Double Filtered" mean?', a: 'We pass the oil through two rigorous filtration stages to remove all micro-particles.' },
  { q: 'How is it different from virgin coconut oil?', a: 'It is highly refined to achieve a crystal clear state and neutral scent without losing its core properties.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    // GSAP Height animation logic
    if (open !== null && open !== index && answerRefs.current[open]) {
       gsap.to(answerRefs.current[open], { height: 0, opacity: 0, duration: 0.4, ease: 'power2.out' });
    }
    
    if (open === index) {
      gsap.to(answerRefs.current[index], { height: 0, opacity: 0, duration: 0.4, ease: 'power2.out' });
      setOpen(null);
    } else {
      setOpen(index);
      gsap.set(answerRefs.current[index], { height: 'auto' });
      const h = answerRefs.current[index]?.offsetHeight || 0;
      gsap.fromTo(answerRefs.current[index], { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.4, ease: 'power2.out' });
    }
  };

  return (
    <Scene height="py-32" id="faq-section" className="bg-[#F4F7F2] text-[#1a1a1a] items-center justify-center relative">
      {/* Very light sage, minimal distractions */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#eef2eb]/50 via-[#F4F7F2]/20 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <h2 className="text-4xl font-light mb-12 text-center faq-title opacity-0 translate-y-8 will-change-transform">Frequently Asked Questions</h2>
        
        <div className="space-y-4 faq-list opacity-0 translate-y-8 will-change-transform">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-border pb-4">
              <button 
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
              >
                <span className="text-xl font-medium">{faq.q}</span>
                <span className={`text-2xl transition-transform duration-400 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div 
                ref={el => { answerRefs.current[i] = el; }} 
                className="overflow-hidden h-0 opacity-0"
              >
                <p className="text-muted-foreground pb-4">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
}
