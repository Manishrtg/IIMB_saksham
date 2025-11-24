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
      {/* Top Fixed Bar - IIMB + JJM Logos (Always visible on desktop) */}
      <div className="fixed top-0 left-0 right-0 bg-blue-900 text-white text-xs font-medium tracking-wider z-50 hidden md:flex items-center justify-between h-9 px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/iimb-logo.png"
            alt="IIM Bangalore"
            className="h-5 w-auto"
          />
          <span>IIM Bangalore</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Jal Jeevan Mission</span>
          <img
            src="/jjm-logo.png"
            alt="Jal Jeevan Mission"
            className="h-5 w-auto"
          />
        </div>
      </div>

      {/* Main Sticky Header - Starts below top bar, stays fixed after scroll */}
      <header
        className={`fixed left-0 right-0 top-9 bg-white shadow-md z-40 transition-all duration-300 ${
          isScrolled ? 'top-0' : 'top-9'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Removed Saksham Logo & Text - You said you'll show it in hero/top section */}
            <div className="w-32" /> {/* Placeholder to balance layout */}

            {/* Desktop Navigation - Always visible & fixed */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { label: 'Home', path: '/' },
                {
                  label: 'About ',
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
                { label: ' Dashboard', path: '/dashboard' },
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
                      className={`text-sm font-medium transition-colors px-1 py-2 ${
                        isActive(item.path)
                          ? 'text-orange-600 border-b-2 border-orange-600'
                          : 'text-gray-700 hover:text-orange-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === item.label ? null : item.label)
                        }
                        className="text-sm font-medium text-gray-700 hover:text-orange-600 flex items-center gap-1 px-1 py-2"
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            openDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown */}
                      {openDropdown === item.label && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-3">
                          {item.items?.map((sub: any) => (
                            <button
                              key={sub.path}
                              onClick={() => handleNavigation(sub.path)}
                              className="block w-full text-left px-6 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Donate Button */}
              <button
                onClick={() => handleNavigation('/donate')}
                className="ml-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-7 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
              >
                Donate Now
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full screen overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden pt-20">
          <div className="px-6 space-y-1">
            {[
              { label: 'Home', path: '/' },
              { label: 'About Us', items: ['Our Story & Vision', 'Leadership & Team'], paths: ['/about/story', '/about/team'] },
              { label: 'Schools & Projects', items: ['Completed', 'Ongoing', 'Pipeline', 'Interactive Map'], paths: ['/schools/completed', '/schools/ongoing', '/schools/pipeline', '/schools/map'] },
              { label: 'Project Dashboard', path: '/dashboard' },
              { label: 'Events & Media', path: '/events' },
              { label: 'Partner with Us', items: ['Register as NGO', 'Register as Donor/CSR'], paths: ['/partner/ngo', '/partner/csr'] },
              { label: 'Impact', path: '/impact' },
              { label: 'Contact', path: '/contact' },
            ].map((item) => (
              <div key={item.label}>
                {item.path ? (
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full text-left py-4 text-lg font-medium border-b border-gray-100 ${
                      isActive(item.path) ? 'text-orange-600' : 'text-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className="w-full flex justify-between items-center py-4 text-lg font-medium text-gray-800 border-b border-gray-100"
                    >
                      {item.label}
                      <ChevronDown className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.label && (
                      <div className="pl-6 pb-4 space-y-3">
                        {item.items?.map((sub: string, i: number) => (
                          <button
                            key={i}
                            onClick={() => handleNavigation(item.paths?.[i] || '/')}
                            className="block text-gray-600 hover:text-orange-600 text-base"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <button
              onClick={() => handleNavigation('/donate')}
              className="w-full mt-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg"
            >
              Donate Now
            </button>
          </div>
        </div>
      )}

      {/* Add top padding to body/content so it doesn't hide under fixed headers */}
      <div className="pt-9 lg:pt-25" />
    </>
  );
}