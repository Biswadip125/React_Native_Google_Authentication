import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { isAllowedEmail } from "@/utils/validateEmail";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    const response = await GoogleSignin.signIn();

    if (response.type !== "success") {
      throw new Error("Google Sign-in was cancelled");
    }

    const idToken = response.data.idToken;

    if (!idToken) {
      throw new Error("Google ID token was not received");
    }

    const credentials = GoogleAuthProvider.credential(idToken);

    const result = await signInWithCredential(auth, credentials);

    const user = result.user;

    if (!user.emailVerified || !isAllowedEmail(user.email)) {
      await signOut(auth);
      await GoogleSignin.signOut();

      throw new Error("Access denied. Please use your verified HB+ email");
    }

    return user;
  } catch (err) {
    console.log("Google Sign in Error", err);
    throw err;
  }
};

export const logoutFromGoogle = async () => {
  try {
    await GoogleSignin.signOut();
  } finally {
    await signOut(auth);
  }
};
