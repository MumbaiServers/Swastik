import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import swastikLogo from "@/assets/swastik-logo.png";
import ContactFormModal from "./ContactFormModal";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const navigation = [{
    name: "Home",
    href: "/"
  }, {
    name: "About Us",
    href: "/about-us"
  }, {
    name: "Projects",
    href: "/projects"
  }, {
    name: "Loyalty Programme",
    href: "/loyalty-programme"
  }, {
    name: "Blogs",
    href: "/blogs"
  }, {
    name: "Careers",
    href: "/careers"
  }];
  return <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={swastikLogo} alt="Swastik Group" className="h-16 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map(item => (
              <div key={item.name}>
                {item.href.startsWith('#') ? (
                  <a href={item.href} className="text-sm font-medium text-foreground hover:text-brand-blue transition-colors">
                    {item.name}
                  </a>
                ) : (
                  <Link to={item.href} className="text-sm font-medium text-foreground hover:text-brand-blue transition-colors">
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden lg:block">
            <Button variant="brand" size="lg" onClick={() => setIsContactModalOpen(true)}>
              Contact
            </Button>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center space-x-2 mb-6">
                  <img src={swastikLogo} alt="Swastik Group" className="h-12 w-auto" />
                </div>
                
                {navigation.map(item => (
                  <div key={item.name}>
                    {item.href.startsWith('#') ? (
                      <a href={item.href} className="block text-lg font-medium text-foreground hover:text-brand-blue transition-colors" onClick={() => setIsOpen(false)}>
                        {item.name}
                      </a>
                    ) : (
                      <Link to={item.href} className="block text-lg font-medium text-foreground hover:text-brand-blue transition-colors" onClick={() => setIsOpen(false)}>
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                <div className="pt-6">
                  <Button variant="brand" size="lg" className="w-full" onClick={() => {
                    setIsContactModalOpen(true);
                    setIsOpen(false);
                  }}>
                    Contact
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </header>;
};
export default Header;