export function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-border/40">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
           <div className="text-3xl tracking-widest font-light text-primary mb-6">HYDROPS</div>
           <p className="text-muted-foreground max-w-sm leading-relaxed">
             Setting the standard for premium, crystal clear coconut oil. Designed for luxury culinary, skin, and hair care applications.
           </p>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-6">Company</h4>
          <ul className="space-y-4 text-muted-foreground text-sm tracking-wide">
            <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Quality Promise</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-6">Contact</h4>
          <ul className="space-y-4 text-muted-foreground text-sm tracking-wide">
            <li><a href="#" className="hover:text-primary transition-colors">hello@hydrops.com</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">+91 90000 00000</a></li>
            <li className="pt-2 flex space-x-4">
               {/* Social Placeholders */}
               <div className="w-8 h-8 rounded-full bg-secondary hover:bg-primary/20 transition-colors flex items-center justify-center">IG</div>
               <div className="w-8 h-8 rounded-full bg-secondary hover:bg-primary/20 transition-colors flex items-center justify-center">LI</div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground tracking-wider">
        <p>© 2026 Hydrops Coconut Oil. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
