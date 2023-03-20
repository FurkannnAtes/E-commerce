import {
  Home,
  Register,
  Login,
  MyProducts,
  CreateProduct,
  ProductDetails,
  Basket,
} from "@/pages";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/register", component: <Register /> },
  { path: "/login", component: <Login /> },
  { path: "/myProducts/:id", component: <MyProducts /> },
  { path: "/createProduct", component: <CreateProduct /> },
  { path: "/productDetails/:id", component: <ProductDetails /> },
  { path: "/basket/", component: <Basket /> },
];

export default routes;
