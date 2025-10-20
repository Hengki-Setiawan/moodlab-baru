import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { applicationDefault } from 'firebase-admin/app';

// This function creates and returns a Firebase Admin App instance.
// It ensures that the app is initialized only once.
export function createFirebaseAdminApp(): App {
  // Check if there are any initialized apps. If so, return the first one.
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Try to initialize with default credentials (works in Vercel)
  try {
    const app = initializeApp({
      credential: applicationDefault(),
    });
    return app;
  } catch (error) {
    // If that fails, try with service account
    const serviceAccount = process.env.FIREBASE_ADMIN_SDK_CONFIG
      ? JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG)
      : undefined;

    if (!serviceAccount) {
      throw new Error('Firebase Admin SDK config not found. Please set FIREBASE_ADMIN_SDK_CONFIG environment variable.');
    }

    const app = initializeApp({
      credential: cert(serviceAccount),
    });

    return app;
  }
}