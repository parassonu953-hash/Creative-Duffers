# Creative Duffers

A responsive artist portfolio and creative storefront for original artwork, custom portrait enquiries, and YouTube documentaries.

## Features

- Responsive landing page with an editorial art direction.
- Filterable artwork gallery.
- Custom portrait enquiry form with reference-image preview.
- Portrait options for medium, size, and number of subjects.
- Documentary showcase with YouTube embed modal.
- About, contact, and social links.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Personalize before launch

1. Replace the sample gallery images in `src/App.jsx` with your own artwork image URLs.
2. The YouTube channel link is set to [Forgotten Promises](https://www.youtube.com/@ForgottenPromises123). Replace the sample documentary titles, descriptions, thumbnail URLs, and `videoId` values in the `films` array with your actual videos. Send the individual video links to have these featured accurately.
3. Change the contact email `hello@creativeduffers.com` to your real email address.
4. Replace the Instagram and YouTube profile links with your channel URLs.
5. Add your own artist bio and portrait pricing when ready.

## Order enquiries

The current enquiry form opens the visitor's default email app with the order details. The selected reference image is previewed in the browser but is **not automatically attached** to the email. The visitor should attach it before sending. For a production checkout and secure image uploads, connect a backend or form service.

## Deployment

This is a Vite + React application and can be deployed to Vercel, Netlify, or GitHub Pages after configuring the desired build and hosting settings.


## Mobile app (Android + iOS)

The `mobile/` directory contains the Creative Duffers Expo / React Native app for Android and iOS.

```bash
cd mobile
npm install
npx expo start
```

See [mobile/README.md](mobile/README.md) for device testing and EAS production build instructions. The mobile app shares the Creative Duffers brand and includes the artwork gallery, portrait enquiry, documentary links, and studio information.

The two featured Forgotten Promises documentaries are:
1. **REALITY OF BOKARO STEEL CITY / BROKEN QUARTERS OF BKSC WHERE WORKERS LIVE**
2. **Dhanbad’s Burning Land 🔥 Abandoned Mines That Are Still Alive / Ghar Chhod Kar Bhaag Rahe Log😳**

Store publication still requires the relevant Google Play and Apple Developer accounts, store listings, app assets, and review approval.
