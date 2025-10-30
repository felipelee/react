import { App } from "../apps-list";

export const shopify: App = {
  name: "Shopify",
  imageSource: null,
  animations: [
    {
      name: "Search screen top tabs animation",
      href: "/shopify/search",
    },
    {
      name: "Custom bottom tab bar animation",
      href: "/shopify/home",
    },
    {
      name: "Menu transition animation",
      href: "/shopify/products",
    },
    {
      name: "Tabs shared header animation",
      href: "/shopify/home",
    },
  ],
};

export const slack: App = {
  name: "Slack",
  imageSource: null,
  animations: [
    {
      name: "Catch up cards swipe animation",
      href: "/slack/catch-up",
    },
    {
      name: "Catch up header counter animation",
      href: "/slack/catch-up",
    },
  ],
};

export const showcase: App = {
  name: "Showcase",
  imageSource: null,
  animations: [
    {
      name: "Upcoming list scroll animation",
      href: "/showcase/upcoming",
    },
  ],
};
