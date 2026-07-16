import { Scene } from './Scene';

const APPS = [
  { title: 'Cooking', desc: 'High smoke point for healthy meals.', className: 'md:col-span-2 md:row-span-2' },
  { title: 'Skin Care', desc: 'Natural moisturizer.', className: 'md:col-span-1 md:row-span-1' },
  { title: 'Hair Care', desc: 'Deep conditioning treatment.', className: 'md:col-span-1 md:row-span-1' },
  { title: 'Massage', desc: 'Smooth, relaxing glide.', className: 'md:col-span-1 md:row-span-1' },
  { title: 'Baby Care', desc: 'Gentle on sensitive skin.', className: 'md:col-span-1 md:row-span-1' },
];

export function Applications() {
  return (
    <Scene height="h-[120vh]" id="applications-section" className="bg-secondary/30 items-center justify-center">
      <div className="container mx-auto px-6 w-full max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-light mb-12 text-center app-title opacity-0 translate-y-8 will-change-transform">
          Versatility in Every Drop
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[60vh]">
          {APPS.map((app, i) => (
            <div 
              key={i} 
              className={`app-card group relative bg-background rounded-3xl p-8 border shadow-sm overflow-hidden opacity-0 translate-y-12 will-change-transform hover:shadow-xl transition-shadow duration-500 flex flex-col justify-end ${app.className}`}
            >
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <h3 className="text-2xl font-medium relative z-10">{app.title}</h3>
              <p className="text-muted-foreground relative z-10 mt-2">{app.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
}
