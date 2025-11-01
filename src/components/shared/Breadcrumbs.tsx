import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbsProps {
  productName: string;
}

const parentCrumbs = [
  { name: 'Homepage', href: '/' },
  { name: 'Women', href: '#' },
  { name: "Women's Shirts & Tops", href: '#' },
];


const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ productName }) => {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-y-1 gap-x-1.5 text-sm text-gray-600">
        {parentCrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            <Link
              href={crumb.href}
              className="hover:text-gray-900 hover:underline"
            >
              {crumb.name}
            </Link>
            <ChevronRight
              size={16}
              className="text-gray-400 mx-1.5"
              aria-hidden="true"
            />
          </li>
        ))}

        <li aria-current="page">
          <span className="font-medium text-gray-800 truncate">
            {productName}
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
