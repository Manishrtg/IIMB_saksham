import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from '../utils/router';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const { navigate, currentPath } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const isActive = (path: string) => currentPath.startsWith(path);

  return (
    <>
      {/* Top Fixed Bar - Animated entrance */}
      <div className="fixed top-0 left-0 right-0 bg-blue-900 text-white text-xs font-medium tracking-wider z-50 hidden md:flex items-center justify-between h-9 px-6 shadow-sm animate-in slide-in-from-top duration-700">
        <div className="flex items-center gap-3">
          <img
            src="/iimb-logo.png"
            alt="IIM Bangalore"
            className="h-5 w-auto animate-in zoom-in-90 duration-500 delay-200"
          />
          <span className="animate-in fade-in duration-500 delay-300">IIM Bangalore</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="animate-in fade-in duration-500 delay-500">Jal Jeevan Mission</span>
          <img
            src="/jjm-logo.png"
            alt="Jal Jeevan Mission"
            className="h-5 w-auto animate-in zoom-in-90 duration-500 delay-700"
          />
        </div>
      </div>

      {/* Main Sticky Header - Smooth scroll animation + backdrop blur */}
      <header
        className={`fixed left-0 right-0 top-9 bg-white/95 backdrop-blur-md z-40 transition-all duration-500 ease-out border-b border-transparent ${
          isScrolled
            ? 'top-0 shadow-lg border-gray-100 bg-white/98'
            : 'top-9 shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="w-32" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { label: 'Home', path: '/' },
                {
                  label: 'About',
                  items: [
                    { label: 'Our Story & Vision', path: '/about/story' },
                    { label: 'Leadership & Team', path: '/about/team' },
                  ],
                },
                {
                  label: 'Projects',
                  items: [
                    { label: 'Completed Projects', path: '/schools/completed' },
                    { label: 'Ongoing Projects', path: '/schools/ongoing' },
                    { label: 'Pipeline Projects', path: '/schools/pipeline' },
                    { label: 'Interactive Map', path: '/schools/map' },
                  ],
                },
                { label: 'Dashboard', path: '/dashboard' },
                { label: 'Events & Media', path: '/events' },
                {
                  label: 'Partner with Us',
                  items: [
                    { label: 'Register as NGO', path: '/partner/ngo' },
                    { label: 'Register as Donor/CSR', path: '/partner/csr' },
                  ],
                },
                { label: 'Impact', path: '/impact' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => (
                <div key={item.label} className="relative group">
                  {item.path ? (
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-md group-hover:scale-105 ${
                        isActive(item.path)
                          ? 'text-orange-600'
                          : 'text-gray-700 hover:text-orange-600'
                      }`}
                    >
                      <span className="relative">
                        {item.label}
                        {isActive(item.path) && (
                          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-600 rounded-full" />
                        )}
                      </span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === item.label ? null : item.label)
                        }
                        className="text-sm font-medium text-gray-700 hover:text-orange-600 flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 group-hover:scale-105"
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${
                            openDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Animated Dropdown */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top ${
                          openDropdown === item.label
                            ? 'opacity-100 scale-y-100 translate-y-0'
                            : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                        }`}
                      >
                        <div className="py-3">
                          {item.items?.map((sub: any, index: number) => (
                            <button
                              key={sub.path}
                              onClick={() => handleNavigation(sub.path)}
                              className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 hover:pl-8"
                              style={{ transitionDelay: `${index * 50}ms` }}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* Animated Donate Button */}
              <button
                onClick={() => handleNavigation('/donate')}
                className="ml-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-red-600 text-white px-7 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:-translate-y-0.5"
              >
                Donate Now
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-95"
            >
              <div className="relative">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Slide Down Animation */}
      <div
        className={`fixed inset-0 bg-white z-50 lg:hidden transition-all duration-500 ease-out ${
          isMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="pt-24 px-6 overflow-y-auto h-full pb-10">
          <div className="space-y-1">
            {[
              { label: 'Home', path: '/' },
              { label: 'About Us', items: ['Our Story & Vision', 'Leadership & Team'], paths: ['/about/story', '/about/team'] },
              { label: 'Schools & Projects', items: ['Completed', 'Ongoing', 'Pipeline', 'Interactive Map'], paths: ['/schools/completed', '/schools/ongoing', '/schools/pipeline', '/schools/map'] },
              { label: 'Project Dashboard', path: '/dashboard' },
              { label: 'Events & Media', path: '/events' },
              { label: 'Partner with Us', items: ['Register as NGO', 'Register as Donor/CSR'], paths: ['/partner/ngo', '/partner/csr'] },
              { label: 'Impact', path: '/impact' },
              { label: 'Contact', path: '/contact' },
            ].map((item, idx) => (
              <div
                key={item.label}
                className="animate-in slide-in-from-top-8"
                style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
              >
                {item.path ? (
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full text-left py-5 text-xl font-medium border-b border-gray-100 transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-orange-600 translate-x-2'
                        : 'text-gray-800 hover:text-orange-600 hover:translate-x-1'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className="w-full flex justify-between items-center py-5 text-xl font-medium text-gray-800 border-b border-gray-100"
                    >
                      <span className="flex items-center gap-3">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`transition-transform duration-500 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        openDropdown === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-8 py-4 space-y-4">
                        {item.items?.map((sub: string, i: number) => (
                          <button
                            key={i}
                            onClick={() => handleNavigation(item.paths?.[i] || '/')}
                            className="block text-lg text-gray-600 hover:text-orange-600 hover:translate-x-2 transition-all duration-300"
                            style={{ transitionDelay: `${i * 80}ms` }}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            <button
              onClick={() => handleNavigation('/donate')}
              className="w-full mt-10 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-red-600 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 active:scale-95"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>

      {/* Body padding */}
      <div className={`pt-9 md:pt-${isScrolled ? '0' : '25'} transition-all duration-500`} />
    </>
  );
}