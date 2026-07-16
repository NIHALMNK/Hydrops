export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl tracking-widest font-light text-primary">HYDROPS</div>
        
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide">
          <a href="#" className="text-foreground hover:text-primary transition-colors">HOME</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">ABOUT</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">PRODUCTS</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">CONTACT</a>
        </nav>

        <button className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm tracking-wide font-medium hover:bg-primary/90 transition-colors">
          INQUIRE NOW
        </button>
      </div>
    </header>
  );
}
