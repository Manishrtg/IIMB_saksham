import { Linkedin, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useRouter } from '../utils/router';

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Saksham</h3>
                <p className="text-xs text-gray-400">Revitalizing Government Schools</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              An IIM Bangalore-backed initiative transforming government schools across Karnataka, one classroom at a time.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/about/story')}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/schools/completed')}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Our Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Project Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/impact')}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Impact
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/events')}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Events & Media
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/donate')}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Donate Now
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/partner/ngo')}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  NGO Partnership
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/partner/csr')}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  CSR Partnership
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-orange-500" />
                <span className="text-sm text-gray-400">
                  IIM Bangalore, Bannerghatta Road, Bangalore - 560076
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="flex-shrink-0 text-orange-500" />
                <a
                  href="mailto:contact@saksham.org.in"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  contact@saksham.org.in
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="flex-shrink-0 text-orange-500" />
                <a
                  href="tel:+918012345678"
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                >
                  +91 80 1234 5678
                </a>
              </li>
            </ul>

            <div className="flex space-x-4 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Saksham - Revitalizing Government Schools. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            An initiative backed by IIM Bangalore
          </p>
        </div>
      </div>
    </footer>
  );
}
