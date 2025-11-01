import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

const Footer = () => {
  const FooterLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <li>
      <Link
        href={href}
        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );

  const SocialLink = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: React.ElementType;
    label: string;
  }) => (
    <li>
      <Link
        href={href}
        className="text-gray-600 hover:text-gray-900"
        aria-label={label}
      >
        <Icon size={24} />
      </Link>
    </li>
  );

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12">
          <div className="flex-shrink-0">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Vovwe Eccommerce</span>
              <span className="text-2xl font-bold tracking-tight text-gray-900 uppercase">
                Vovwe
              </span>
              <span className="text-2xl font-light tracking-tight text-gray-900 uppercase">
                {' '}
                Eccommerce
              </span>
            </Link>
          </div>

          {/* Newsletter Signup */}
          <form className="w-full md:max-w-md flex flex-col gap-4">
            <label
              htmlFor="newsletter-email"
              className="font-medium text-gray-900"
            >
              Get latest offers to your inbox
            </label>
            <div className="flex">
              <input
                type="email"
                id="newsletter-email"
                placeholder="Enter your email address"
                className="flex-grow min-w-0 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <button
                type="submit"
                className="flex-shrink-0 px-4 py-3 bg-gray-900 text-white rounded-r-md hover:bg-gray-700 transition-colors duration-200"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </form>

          {/* Social Media Links */}
          <ul className="flex gap-6">
            <SocialLink href="#" icon={Facebook} label="Facebook" />
            <SocialLink href="#" icon={Twitter} label="Twitter" />
            <SocialLink href="#" icon={Instagram} label="Instagram" />
            <SocialLink href="#" icon={Youtube} label="YouTube" />
          </ul>
        </div>

        {/* Site links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
          <div>
            <h3 className="font-semibold text-gray-900 uppercase tracking-wider mb-6">
              Shop
            </h3>
            <ul className="space-y-4">
              <FooterLink href="#">My account</FooterLink>
              <FooterLink href="#">Login</FooterLink>
              <FooterLink href="#">Wishlist</FooterLink>
              <FooterLink href="#">Cart</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 uppercase tracking-wider mb-6">
              Information
            </h3>
            <ul className="space-y-4">
              <FooterLink href="#">Shipping Policy</FooterLink>
              <FooterLink href="#">Return & Refunds</FooterLink>
              <FooterLink href="#">Cookies Policy</FooterLink>
              <FooterLink href="#">Frequently asked</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              <FooterLink href="#">About us</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms & Conditions</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-4">
          <p>&copy; John Lewis Plc 2001-{new Date().getFullYear()}</p>
          <div className="flex gap-6">
            <button className="flex items-center gap-1.5 hover:text-gray-900">
              <span>English</span>
              <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-1.5 hover:text-gray-900">
              <span>USD</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

