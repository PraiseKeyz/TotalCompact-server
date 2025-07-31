import authRouter from "./auth.router";
import projectRouter from "./projects.router"

const routes = {
  "/auth": authRouter,
  "/projects": projectRouter
};

export default routes;
