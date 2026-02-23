import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import swastikLogo from "@/assets/Logo All png (12).png";
import ContactFormModal from "./ContactFormModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Projects", href: "/projects" },
    { name: "Loyalty Programme", href: "/loyalty-programme" },
    { name: "Blogs", href: "/blogs" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? 'bg-white/98 backdrop-blur-lg shadow-md'
          : 'bg-white/95 backdrop-blur-md border-b border-border shadow-sm'
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <img src={swastikLogo} alt="Swastik Group" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map(item => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className={`text-sm font-medium transition-all duration-300 relative py-1 ${location.pathname === item.href
                      ? 'text-brand-blue'
                      : 'text-foreground hover:text-brand-blue'
                    }`}
                >
                  {item.name}
                  {/* Active indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-brand-blue rounded-full transition-all duration-300 ${location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                  />
                </Link>
              </div>
            ))}
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden lg:block">
            <Button
              variant="brand"
              size="lg"
              onClick={() => setIsContactModalOpen(true)}
              style={{ backgroundColor: '#1953B4' }}
              className="text-white hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-0.5"
            >
              Contact
            </Button>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white p-0">
              <div className="flex flex-col h-full">
                {/* Mobile menu header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <img src={swastikLogo} alt="Swastik Group" className="h-12 w-auto" />
                </div>

                {/* Navigation links */}
                <div className="flex-1 py-6 px-6">
                  <div className="space-y-1">
                    {navigation.map((item, index) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300 ${location.pathname === item.href
                            ? 'text-brand-blue bg-brand-light-blue/10'
                            : 'text-foreground hover:text-brand-blue hover:bg-gray-50'
                          }`}
                        onClick={() => setIsOpen(false)}
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="p-6 border-t border-gray-100">
                  <Button
                    variant="brand"
                    size="lg"
                    className="w-full text-white hover:opacity-90 transition-all duration-300"
                    style={{ backgroundColor: '#1953B4' }}
                    onClick={() => {
                      setIsContactModalOpen(true);
                      setIsOpen(false);
                    }}
                  >
                    Contact Us
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
    </header>
  );
};

export default Header;