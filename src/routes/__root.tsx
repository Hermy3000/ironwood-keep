import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({ meta: [{ title: "Ironwood Keep" }], links: [{ rel: "stylesheet", href: appCss }] }),
  component: () => (
    <html lang="en">
      <head><HeadContent /></head>
      <body className="bg-bg font-sans text-fg">
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
});
