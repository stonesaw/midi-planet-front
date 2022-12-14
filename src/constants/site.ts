export const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const SITE_TITLE = "MIDI Planet";

export const SITE_DESCRIPTION =
  "MIDI Planet is a platform for sharing and viewing MIDI files.";

export const SITE_KEYWORDS = ["MIDI", "Video", "Generator", "SNS"];
