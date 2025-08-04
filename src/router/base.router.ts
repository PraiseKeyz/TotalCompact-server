import authRouter from "./auth.router";
import projectRouter from "./projects.router";
import contactRouter from "./contact.router";

const routes = {
  "/auth": authRouter,
  "/projects": projectRouter,
  "/contact": contactRouter,
};

export default routes;
