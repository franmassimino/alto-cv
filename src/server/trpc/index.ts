import { router } from "./context";
import { userRouter } from "./user";
import { resumeRouter } from "./resume";
import { templateRouter } from "./template";
import { chatRouter } from "./chat";
import { personalDataRouter } from "./personalData";

export const appRouter = router({
  user: userRouter,
  resume: resumeRouter,
  template: templateRouter,
  chat: chatRouter,
  personalData: personalDataRouter
});

export type AppRouter = typeof appRouter;
