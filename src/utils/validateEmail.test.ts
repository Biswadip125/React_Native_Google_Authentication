import { isAllowedEmail } from "./validateEmail";

console.log("HB+ email:", isAllowedEmail("test@hbplus.fit"));

console.log("Gmail:", isAllowedEmail("test@gmail.com"));

console.log("Uppercase:", isAllowedEmail("TEST@HBPLUS.FIT"));

console.log("Invalid domain:", isAllowedEmail("test@not-hbplus.fit"));
