import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Calculator from "./components/Calcuator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
    </Routes>
  );
}

export default App;
