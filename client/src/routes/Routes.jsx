import {
  Home,
  Register,
  Login,
  MyProducts,
  CreateProduct,
  ProductDetails,
  Basket,
  Search,
  BuymentHistory,
  EditProduct,
} from "@/pages";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/register", component: <Register /> },
  { path: "/login", component: <Login /> },
  { path: "/myProducts/:id", component: <MyProducts /> },
  { path: "/createProduct", component: <CreateProduct /> },
  { path: "/productDetails/:id", component: <ProductDetails /> },
  { path: "/basket", component: <Basket /> },
  { path: "/buymentHistory", component: <BuymentHistory /> },
  { path: "/search/:searchQuery", component: <Search /> },
  { path: "/edit/:id", component: <EditProduct /> },
];

export default routes;
