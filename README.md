# Javen Store

Javen Store is a responsive storefront built with React and Vite. Browse and search the product collection, filter by category, view product details, and save items to a wishlist or shopping cart.

## Features

- Responsive storefront with a searchable, filterable product catalog
- Product detail pages with related products
- Persistent cart and wishlist
- Cart checkout with the `WELCOME10` promo code
- Automated production build checks with GitHub Actions

The catalog combines products from the Fake Store API with 20 additional Javen Store products. Product images are loaded from their configured image URLs.

## Run locally

Requirements: Node.js 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

Vite prints the local development URL in the terminal.

## Build and preview

```sh
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Deploy with Vercel

The GitHub Actions workflow checks that the app builds; it does not host or deploy the site. To publish it and deploy future pushes automatically:

1. Sign in to [Vercel](https://vercel.com/) with GitHub and choose **Add New → Project**.
2. Import `jasonzkee143-creator/javen-store`.
3. Keep the detected Vite settings: build command `npm run build` and output directory `dist`.
4. Select **Deploy**. Vercel will create a public URL and deploy subsequent pushes to `main` automatically.

No environment variables are required for the current app.
