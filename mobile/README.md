# Creative Duffers — Android & iOS

Native mobile companion built with Expo / React Native. The app uses the same Supabase backend as the website.

## Configure the shared backend

1. Create a Supabase project.
2. Run [../supabase/schema.sql](../supabase/schema.sql) in the Supabase SQL Editor.
3. Copy `.env.example` to `.env` in this directory.
4. Set `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` to the same project URL and publishable/anon key used by the website. Never put a `service_role` key in the app.

## Run locally

Requirements: Node.js, npm, and Expo tooling.

```bash
cd mobile
npm install
npx expo start
```

- Press `a` to open an Android emulator or scan the QR code on Android.
- Press `i` to open an iOS simulator (requires macOS and Xcode), or use a compatible Expo Go build.
- Portrait enquiries and optional reference photos are saved to the shared Supabase project.

## Build store-ready binaries

```bash
eas login
eas build --platform android --profile production
eas build --platform ios --profile production
```

Store publishing requires Google Play and Apple Developer accounts, app assets, and store review approval.

## Before public launch

- Replace sample gallery artwork with original work.
- Add app icon, splash image, and store screenshots.
- Add CAPTCHA/rate limiting and server-side email notifications.
- Add customer accounts, admin order management, and payment processing if needed.

App identifiers currently use `com.creativeduffers.app`. Confirm availability before publishing.
