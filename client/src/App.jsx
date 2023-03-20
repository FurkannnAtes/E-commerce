import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "@/routes/Routes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { getUserBasket } from "@/store/basket";
import { useDispatch, useSelector } from "react-redux";
import { client } from "@/utils/client";
const App = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.userName) {
      const query = `*[_type == "user" && subId == "${user.userId}"][0]`;
      client.fetch(query).then((res) => dispatch(getUserBasket(res.basket)));
    }
  }, [dispatch, user.userId, user.userName]);

  const routesComponent = routes.map(({ path, component }, key) => (
    <Route path={path} element={component} key={key} />
  ));

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_KEY}>
      <BrowserRouter>
        <Navbar />
        <Routes>{routesComponent}</Routes>
        <Footer />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
