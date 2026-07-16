import { Scene } from './Scene';
import { Button } from '@/components/ui/Button';

export function ContactCTA() {
  return (
    <Scene height="h-[100vh]" id="cta-section" className="bg-primary text-primary-foreground items-center justify-center overflow-hidden relative">
      {/* Floating Particles Placeholder */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
      
      {/* Background Bottle Silhouette */}
      <div className="cta-bg-bottle absolute right-[-10%] top-[10%] w-[50vh] h-[80vh] bg-white/5 rounded-[10rem] rotate-12 blur-sm pointer-events-none opacity-0 scale-110 will-change-transform"></div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <h2 className="cta-title text-5xl md:text-7xl font-light mb-6 opacity-0 translate-y-8 will-change-transform">Experience Purity.</h2>
        <p className="cta-desc text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl opacity-0 translate-y-8 will-change-transform">
          Connect with us today for corporate bulk inquiries and distribution opportunities.
        </p>
        
        <div className="cta-buttons flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 opacity-0 scale-95 will-change-transform">
          <Button size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg rounded-full px-12">
            Contact Us
          </Button>
          <Button size="lg" className="bg-green-500 text-white hover:bg-green-600 text-lg rounded-full px-12 border-none">
            WhatsApp
          </Button>
        </div>
      </div>
    </Scene>
  );
}
