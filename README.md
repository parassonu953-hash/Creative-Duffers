# Creative Duffers

A responsive creative portfolio and companion Android/iOS app for artwork, custom portrait enquiries, and Forgotten Promises documentaries.

## Shared backend: Supabase

The website and mobile app submit portrait enquiries to the same Supabase project. Reference photographs are uploaded to a **private** Storage bucket; public visitors can submit enquiries but cannot read customer records or download stored photos.

### 1. Create the Supabase project

1. Create a project at [Supabase](https://supabase.com/).
2. Open **SQL Editor**, paste the contents of [supabase/schema.sql](supabase/schema.sql), and run it.
3. In **Project Settings → API**, copy the Project URL and the publishable key (or legacy anon key). Never use the `service_role` key in a browser or mobile app.

### 2. Configure the website

Copy `.env.example` to `.env.local` and fill in the two values:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Then run:

```bash
npm install
npm run dev
```

### 3. Configure Android and iOS

Copy `mobile/.env.example` to `mobile/.env` and use the same Supabase project URL and publishable/anon key, with the `EXPO_PUBLIC_` variable names shown in that file.

```bash
cd mobile
npm install
npx expo start
```

Use the same project credentials for both clients. Do not commit real environment files or secret keys.

### 4. View incoming enquiries

Open the Supabase dashboard → **Table Editor → portrait_enquiries**. Each record contains the customer's contact details, requested portrait style/size, notes, source app, and the private reference image path. The private files are in **Storage → portrait-references**. Access photos from the Supabase dashboard as an authorized project administrator.

## Current backend scope

- Shared portrait-enquiry database for website and mobile app.
- Optional reference-photo upload (JPG, PNG, WEBP; maximum 10 MB).
- Private reference-photo bucket.
- Row Level Security: public clients can insert enquiries but cannot select customer records.
- No customer login, admin UI, automatic email notifications, payment gateway, or order-status workflow yet.
- The public insert/upload policies are suitable for initial testing. Before a high-traffic public launch, add abuse protection (for example CAPTCHA and rate limiting) and a server-side notification function.

## Other features

- Responsive React + Vite website.
- Expo / React Native app for Android and iOS.
- Filterable artwork gallery (sample images must be replaced with original work).
- Forgotten Promises documentary showcase.

## Documentary videos

1. **REALITY OF BOKARO STEEL CITY / BROKEN QUARTERS OF BKSC WHERE WORKERS LIVE**
2. **Dhanbad’s Burning Land 🔥 Abandoned Mines That Are Still Alive / Ghar Chhod Kar Bhaag Rahe Log😳**

Channel: [Forgotten Promises](https://www.youtube.com/@ForgottenPromises123).

## Deployment

The website can be deployed to Vercel or Netlify after adding the two `VITE_SUPABASE_` environment variables to the hosting project. Configure the matching `EXPO_PUBLIC_SUPABASE_` variables in the Expo/EAS build environment before creating Android/iOS builds.

Store publication still requires the relevant Google Play and Apple Developer accounts, store assets, and review approval.
