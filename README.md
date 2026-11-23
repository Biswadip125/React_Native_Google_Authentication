# HB+ Authentication App

A cross-platform authentication application built using React Native and Expo. Users can sign in using Google Authentication, with access restricted to verified `@hbplus.fit` email addresses.

## Features

- Google Sign-In authentication
- Email domain restriction (`@hbplus.fit`)
- Firebase Authentication integration
- Protected routes and authenticated dashboard
- Persistent authentication state
- Logout functionality
- Responsive UI for Web and Android

## Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router
- Firebase Authentication
- Google Sign-In
- React Native Web

## Live Demo

**Web Application:** [Add your Netlify URL]

## Android Application

Download and install the APK:

[Download Android APK](ADD_YOUR_GITHUB_RELEASE_LINK)

**Note:** Android may ask you to allow installation from unknown sources when installing the APK.

## Run Locally

1. Clone the repository:

   ```bash
   git https://github.com/Biswadip125/React_Native_Google_Authentication
   cd React_Native_Google_Authentication
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure the following variables:

   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   EXPO_PUBLIC_FIREBASE_APP_ID=
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=
   ```

4. Start the development server:

   ```bash
   npx expo start
   ```

## Web Build

Generate the static web export:

```bash
npx expo export --platform web
```

The generated files will be available in the `dist` directory.

## Android Build

Generate an Android APK using EAS:

```bash
eas build --platform android --profile preview
```

## Authentication

Access is restricted to verified Google accounts using the `@hbplus.fit` email domain.

Firebase Authentication is used to manage user sessions and authentication state.
