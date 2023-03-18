import {
  Home,
  Register,
  Login,
  MyProducts,
  CreateProduct,
  ProductDetails,
} from "@/pages";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/register", component: <Register /> },
  { path: "/login", component: <Login /> },
  { path: "/myProducts/:id", component: <MyProducts /> },
  { path: "/createProduct/:id", component: <CreateProduct /> },
  { path: "/productDetails/:id", component: <ProductDetails /> },
];

export default routes;
