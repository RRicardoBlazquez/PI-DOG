import { Route, Routes, useLocation } from "react-router-dom";
import { Detail, Home, Landing, Form } from "./views";
import NavBar from "./components/NavBar/NavBar";
//import "./App.css";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <div>
        {pathname !== "/" && <NavBar />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
