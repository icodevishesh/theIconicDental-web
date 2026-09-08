import localFont from "next/font/local";

// Self-hosted Poppins — the original site forces Poppins across the whole UI.
export const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-REGULAR.otf", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-ITALIC.otf", weight: "400", style: "italic" },
    { path: "./fonts/Poppins-MEDIUM.otf", weight: "500", style: "normal" },
    { path: "./fonts/Poppins-SEMIBOLD.otf", weight: "600", style: "normal" },
    { path: "./fonts/Poppins-BOLD.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});
