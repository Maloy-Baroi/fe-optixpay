import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const theme = {
  token: {
    fontFamily: inter.style.fontFamily,
    sizeUnit: 2.5,
  },
};
