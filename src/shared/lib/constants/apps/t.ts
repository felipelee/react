import ThreadsImage from "@/assets/images/apps/threads.png";
import { App } from "../apps-list";

export const threads: App = {
  name: "Threads",
  imageSource: ThreadsImage,
  animations: [
    {
      name: "Home header tabs animation",
      href: "/threads/home",
    },
    {
      name: "Profile picture animation",
      href: "/threads/profile",
    },
  ],
};
