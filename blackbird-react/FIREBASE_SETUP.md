# Firebase Setup Guide

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project**
3. Name it (e.g. `blackbird-smart-innovations`)
4. Disable Google Analytics (optional) and click **Create project**

## 2. Register a Web App

1. In your project dashboard, click the **Web** icon (`</>`)
2. Set a nickname (e.g. `blackbird-web`) and click **Register app**
3. Copy the `firebaseConfig` object — you'll need the values in step 4

## 3. Enable Authentication Providers

1. Go to **Build → Authentication → Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** — select a support email and save

## 4. Add Environment Variables

Create a `.env` file in the `blackbird-react/` directory:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Replace each value with the corresponding value from your Firebase config (step 2).

## 5. Backend Account Sync

The website syncs Firebase users to BlackBird through:

```text
POST /api/auth/oauth/firebase
```

Set `VITE_BACKEND_URL` to the Laravel backend host. The OAuth sync route verifies the Firebase ID token server-side and does not require the old mobile app `KEY` header.

## 6. Verify

1. Run `npm run dev`
2. Navigate to `/register` and create a test account
3. Check **Firebase Console → Authentication → Users** — the new user should appear
4. Log out, then log back in
5. Try **Sign in with Google**

## Notes

- The `.env` file is gitignored by default in Vite projects
- If you skip this setup, the app will still render but auth actions will fail with a Firebase error
- For production, restrict your API key in the Google Cloud Console
