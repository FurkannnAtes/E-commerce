import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "@/routes/Routes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
const App = () => {
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
