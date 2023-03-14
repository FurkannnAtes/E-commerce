import { Home, Register, Login } from "@/pages";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/register", component: <Register /> },
  { path: "/login", component: <Login /> },
];

export default routes;
