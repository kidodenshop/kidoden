import { flag } from "flags/next";

export const releaseMvp1 = flag<boolean>({
  key: "release-mvp-1",
  defaultValue: true,
  decide: () => {
    // Skip external Vercel feature flag requests to stay within free plan quota limits.
    // It can still be toggled via the env variable RELEASE_MVP_1=false if needed.
    return process.env.RELEASE_MVP_1 !== "false";
  },
});
