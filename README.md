# HB+ Authentication App

A cross-platform authentication application built using React Native, Expo, and Firebase Authentication. The application allows users to sign in using Google and restricts access to verified `@hbplus.fit` email addresses.

## Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router
- Firebase Authentication
- Google Sign-In
- React Native Web

## Features

- Google Sign-In authentication
- Email domain restriction (`@hbplus.fit`)
- Firebase authentication and session management
- Protected routes
- Persistent login state
- User dashboard
- Logout functionality
- Responsive UI for Web and Android

## 1. Setup Instructions

### Prerequisites

- Node.js and npm
- Git
- Expo CLI (available through `npx`)
- Firebase project
- Google account

### Clone the Repository

```bash
git clone https://github.com/Biswadip125/React_Native_Google_Authentication
cd React_Native_Google_Authentication
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add your Firebase configuration:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=
```

Get these values from your Firebase project settings and Google Cloud OAuth configuration.

**Note:** The environment variables prefixed with `EXPO_PUBLIC_` are exposed to the client application. Never store private OAuth client secrets or Firebase service account credentials in them.

### Firebase Configuration

1. Create a project in the Firebase Console.
2. Register a Web application and configure Firebase.
3. Enable Google as a sign-in provider under Authentication.
4. Register the Android application using the same package name configured in `app.json`.
5. Add the required SHA-1 certificate fingerprints for Android Google Sign-In.
6. Download `google-services.json` and place it in the project root.
7. Add your deployed web domain to Firebase Authentication's Authorized Domains.

### Run the Application

Start the Expo development server:

```bash
npx expo start
```

For web:

```bash
npx expo start --web
```

For Android, use a compatible development build because native Google Sign-In requires its native module.

### Web Build

Generate the static web application:

```bash
npx expo export --platform web
```

The generated files will be available in the `dist` directory.

### Android Build

Generate an Android APK using EAS Build:

```bash
eas build --platform android --profile preview
```

## 2. Authentication Flow

The application uses Firebase Authentication with Google Sign-In to authenticate users.

The authentication process works as follows:

1. The user opens the application and is presented with the login screen if they are not authenticated.
2. The user clicks the Google Sign-In button.
3. The application initiates Google authentication:
   - **Web:** Uses Firebase `signInWithPopup()` with Google Authentication.
   - **Android:** Uses `@react-native-google-signin/google-signin` to obtain a Google ID token.
4. On Android, the Google ID token is exchanged for Firebase credentials using `GoogleAuthProvider.credential()` and `signInWithCredential()`.
5. Firebase authenticates the user and returns the authenticated user information.
6. The application checks whether the user's email is verified and belongs to the permitted domain.
7. If validation succeeds, the user is allowed to access the dashboard.
8. If validation fails, the Firebase session is signed out and access is denied.
9. The application listens to Firebase's `onAuthStateChanged()` observer to maintain the authentication state across app sessions.
10. When the user logs out, both the Firebase session and the native Google Sign-In session are signed out where applicable.

### Authentication Flow Diagram

```text
        Application Opens
                |
                v
       Check Authentication
                |
          +-----+-----+
          |           |
     Authenticated  Not Authenticated
          |           |
          v           v
      Dashboard    Login Screen
                      |
                      v
                Google Sign-In
                      |
                      v
              Firebase Authentication
                      |
                      v
              Validate User Email
                      |
                +-----+-----+
                |           |
             Valid       Invalid
                |           |
                v           v
            Dashboard    Sign Out
                            |
                            v
                        Access Denied
```

## 3. How Domain Restriction Works

Access is restricted to users with a verified email address belonging to the `@hbplus.fit` domain.

The application uses a common validation utility to check the user's email:

```typescript
const ALLOWED_DOMAIN = "hbplus.fit";

export const isAllowedEmail = (email: string | null): boolean => {
  if (!email) return false;

  return email
    .toLowerCase()
    .endsWith(`@${ALLOWED_DOMAIN}`);
};
```

### Validation Process

After successful Google authentication, the application performs two checks:

1. **Email Verification:** Checks whether the user's email address is verified.
2. **Domain Validation:** Checks whether the email address ends with `@hbplus.fit`.

For example:

| Email Address | Access |
|---|---|
| user@hbplus.fit | Allowed, if verified |
| employee@HBPLUS.FIT | Allowed, if verified |
| user@gmail.com | Denied |
| user@anotherdomain.com | Denied |
| Unverified @hbplus.fit email | Denied |

If either validation fails, the application signs out the user and displays an access-denied error.

The same validation utility is reused by both web and Android authentication implementations to ensure consistent access control.

## 4. Project Structure

```text
src/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── login.tsx
│   └── dashboard.tsx
├── components/
├── context/
│   └── AuthContext.tsx
├── services/
│   ├── firebase.ts
│   ├── firebase.native.ts
│   ├── googleAuth.ts
│   └── googleAuth.native.ts
└── utils/
    └── validateEmail.ts
```

Platform-specific files allow the application to use the appropriate Firebase and Google authentication implementations on web and Android.

## 5. Deployment

**Web Application:** https://react-native-google-authentication.netlify.app

The web application is deployed using Netlify

## 6. Future Improvements

- Add backend-side domain validation for stronger access control.
- Add user profile management.
- Improve authentication error handling and logging.
- Add automated authentication tests.

---

**Built as part of the HB+ assignment.**
