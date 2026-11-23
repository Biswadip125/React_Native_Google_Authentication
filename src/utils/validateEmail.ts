const ALLOWED_DOMAIN = "gmail.com";

export const isAllowedEmail = (email: string | null): boolean => {
  if (!email) {
    return false;
  }

  return email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`);
};
