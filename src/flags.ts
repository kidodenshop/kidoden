import { flag } from "flags/next";
import { vercelAdapter } from "@flags-sdk/vercel";

const useMock = !process.env.FLAGS_SECRET;

export const releaseMvp1 = useMock
  ? flag<boolean>({
      key: "release-mvp-1",
      defaultValue: true,
      decide: () => {
        // You can toggle this locally in your .env by adding: RELEASE_MVP_1=false or RELEASE_MVP_1=true
        // Defaults to true (regular page) so local developers see the live site without setup.
        return process.env.RELEASE_MVP_1 !== "false";
      },
    })
  : flag<boolean>({
      key: "release-mvp-1",
      defaultValue: true,
      adapter: vercelAdapter(),
    });
