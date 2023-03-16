import { Home, Register, Login, MyProducts, CreateProduct } from "@/pages";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/register", component: <Register /> },
  { path: "/login", component: <Login /> },
  { path: "/myProducts/:id", component: <MyProducts /> },
  { path: "/createProduct/:id", component: <CreateProduct /> },
];

export default routes;
