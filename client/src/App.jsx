import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "@/routes/Routes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const App = () => {
  const routesComponent = routes.map(({ path, component }, key) => (
    <Route path={path} element={component} key={key} />
  ));

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>{routesComponent}</Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
