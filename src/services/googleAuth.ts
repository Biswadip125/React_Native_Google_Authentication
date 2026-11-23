import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { isAllowedEmail } from "@/utils/validateEmail";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);

  const user = result.user;

  if (!user.emailVerified || !isAllowedEmail(user.email)) {
    await signOut(auth);

    throw new Error(
      "Access Denied, Please use your verified HB+ email address..",
    );
  }

  return user;
};

export const logoutFromGoogle = async () => {
  await signOut(auth);
};
