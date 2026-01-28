import { Href, router } from "expo-router";

const authRoutes = "(auth)" as const;
const rootRoutes = "(root)" as const;

export const ScreenRoutes = {
  index: "/",
  welcome: `${authRoutes}/welcome` as Href,
  signIn: `${authRoutes}/sign-in` as Href,
  singUp: `${authRoutes}/sign-up` as Href,
  conversations: `${rootRoutes}/(home-tabs)/conversations` as Href,
  conversation: `${rootRoutes}/conversation/[id]` as Href,
  newChat: `${rootRoutes}/new-chat` as Href,
  newGroup: `${rootRoutes}/new-group` as Href,
  newContact: `${rootRoutes}/new-contact` as Href,
  countriesList: `${rootRoutes}/countries-list` as Href,

  editProfile: `${rootRoutes}/edit-profile` as Href,
} as const;

type NavigateMethod = "push" | "replace" | "back" | "dismissAll" | "dismissTo";

export const navigate = <T extends keyof typeof ScreenRoutes>(
  route: T,
  method: NavigateMethod = "push",
) => {
  router[method](ScreenRoutes[route] as Href);
};
