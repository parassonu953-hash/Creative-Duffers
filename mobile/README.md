# Creative Duffers — Android & iOS app

This is the native mobile companion to the Creative Duffers website, built with Expo SDK 58 and React Native. One codebase targets Android phones/tablets and iPhone/iPad.

## Run locally

Requirements: Node.js 22.13+ (or 24.3+), npm, and Expo tooling.

```bash
cd mobile
npm install
npx expo start
```

- Press `a` to open an Android emulator, or scan the QR code with Expo Go on Android.
- Press `i` to open an iOS simulator (requires macOS and Xcode), or use an iPhone with a compatible Expo Go build.
- For device builds, install EAS CLI with `npm install -g eas-cli`, then run `eas build:configure`.

## Build store-ready binaries

Sign in to Expo:

```bash
eas login
```

Android production build:

```bash
eas build --platform android --profile production
```

iOS production build:

```bash
eas build --platform ios --profile production
```

You will need an Expo account. Publishing to Google Play requires a Google Play Developer account. Publishing to Apple's App Store requires an Apple Developer Program membership and App Store Connect setup. Store review and signing are separate from the source-code setup.

## Before public launch

- Replace sample gallery artwork with your own original work.
- Replace `hello@creativeduffers.com` with your real business email in both the website and app.
- Add your own app icon, splash image and screenshots.
- The portrait enquiry currently opens the user's email app. It does not upload a photo or process payment.
- Documentary entries link to the two videos on the Forgotten Promises YouTube channel.
- No backend, customer accounts, online checkout or automatic image storage is configured yet.

App identifiers currently use `com.creativeduffers.app`. Confirm that this identifier is available before publishing.
