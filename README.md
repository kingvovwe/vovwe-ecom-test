VFGL E-commerce Product Page

This is a Next.js (with TypeScript and Tailwind CSS) project built for the VFGL Frontend Skill Test. It implements a pixel-perfect, responsive product detail page based on the provided Figma designs and integrates with the specified API.

Project Structure

Here is the complete file structure for the src directory and the root configuration files.

frontend-job-test/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── (product)/
│   │   │   ├── [productId]/
│   │   │   │   ├── loading.tsx   # Loading skeleton UI
│   │   │   │   └── page.tsx        # Main product detail page (Server Component)
│   │   │   └── layout.tsx        # Shared layout (Header/Footer)
│   │   ├── api/
│   │   │   └── checkout/
│   │   │       └── route.ts      # Server-side API route for checkout
│   │   ├── globals.css         # Global and Tailwind styles
│   │   └── layout.tsx          # Root layout (fonts, toaster)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx        # Site footer
│   │   │   ├── Header.tsx        # Site header (responsive, w/ cart)
│   │   │   └── TopBanner.tsx     # Top countdown banner
│   │   ├── product/
│   │   │   ├── ProductActions.tsx  # AddToCart, Checkout, Quantity (Client)
│   │   │   ├── ProductCard.tsx     # Reusable card for carousels
│   │   │   ├── ProductDetails.tsx  # Name, price, description
│   │   │   ├── ProductGallery.tsx  # Image gallery (Client)
│   │   │   └── ProductOptions.tsx  # Color/Size selection (Client)
│   │   ├── reviews/
│   │   │   ├── ReviewFilters.tsx   # Review filter sidebar (Client)
│   │   │   ├── ReviewList.tsx      # Review list & pagination (Client)
│   │   │   └── ReviewSummary.tsx   # 4.5 score & rating bars
│   │   └── shared/
│   │       ├── Breadcrumbs.tsx     # Static breadcrumbs
│   │       └── Button.tsx          # Reusable button (primary, outline)
│   ├── context/
│   │   └── CartContext.tsx       # Zustand cart store (global state)
│   ├── lib/
│   │   └── mockData.ts           # Mock data for reviews section
│   ├── services/
│   │   └── api.ts                # All API fetching functions
│   └── types/
│       └── index.ts              # All TypeScript interfaces
├── .gitignore
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md                 # This file
├── tailwind.config.ts
└── tsconfig.json
