import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/trpc"; 
import { httpBatchLink } from "@trpc/client";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      fetch(url, options) {
        return fetch(url, { ...options, credentials: "include" });
      },
    }),
  ],
});
