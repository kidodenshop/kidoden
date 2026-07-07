import { flag } from "flags/next";
import { vercelAdapter } from "@flags-sdk/vercel";

export const releaseMvp1 = flag({
  key: "release-mvp-1",
  adapter: vercelAdapter(),
});
