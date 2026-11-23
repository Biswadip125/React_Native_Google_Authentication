const ALLOWED_DOMAIN = "hbplus.fit";

export const isAllowedEmail = (email: string | null): boolean => {
  if (!email) {
    return false;
  }

  return email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`);
};
