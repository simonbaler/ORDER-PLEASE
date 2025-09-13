# ORDER PLEASE - Advanced E‑Commerce (3D + AI)

A modern, mobile‑first e‑commerce site with 3D product viewing, AI recommendations, real‑time features, and PWA support.

## Quick start

1. Open this folder in VS Code (Windows friendly)
2. Run → select "Run ORDER PLEASE" → F5
   - This starts a static server (http-server) on port 8080 and opens your browser
3. Visit:
   - Home: http://localhost:8080/index.html
   - Products: http://localhost:8080/product-list.html
   - Details: http://localhost:8080/product-details.html
   - Cart: http://localhost:8080/cart.html
   - Checkout: http://localhost:8080/checkout.html
   - Login/Profile: http://localhost:8080/login.html

Alternative (terminal):
```powershell
npx --yes http-server -p 8080 -a 127.0.0.1 -c-1 .
```

## Features
- 3D product viewer (Three.js, GLTF)
- AI: recommendations, personalization, anomaly capture
- Real‑time stock/trending, flash sale timer
- Voice search + barcode/QR scan
- Q&A and photo/video reviews
- Wishlist, save for later, quick view
- Coupons, EMI options, modern checkout
- Delivery timer, smart location detection, tracking modal
- Wallet (cashback) + loyalty + gamified spin wheel
- Seller dashboard with analytics
- Dark mode + micro‑animations + gradients
- PWA (offline caching, update prompt)

## Tech stack
- HTML5 + Tailwind CSS + custom `styles.css`
- Vanilla JS: `products.js`, `utils.js`, `ai.js`, `search.js`, `qa.js`, `orders.js`
- Three.js (3D), Service Worker (PWA)

## Configure currency/region
- Region is captured in Login/Signup and stored in localStorage (`user.region`)
- Currency is formatted via `utils.formatCurrency`

## Troubleshooting
- Browser doesn’t open from VS Code
  - Edit `.vscode/launch.json` `runtimeExecutable` to your browser path
- ERR_FAILED / page can’t be reached
  - Run server manually: `npx http-server -p 8080 -a 127.0.0.1 -c-1 .`
  - Open http://127.0.0.1:8080/index.html
  - Allow Windows Firewall; disable VPN/Proxy temporarily
- Service worker caching old files
  - DevTools → Application → Service Workers → Unregister, then hard refresh (Ctrl+Shift+R)

## Changing the port
- Update `.vscode/tasks.json` and `.vscode/launch.json` URLs to your desired port (e.g., 5500)

## Notes
- Demo data and models use public placeholder links. Replace with your assets for production.
- This codebase is modular; you can integrate a real backend later (auth, orders, payments).
