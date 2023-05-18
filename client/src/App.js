import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { CreateRecpie } from "./pages/create-recipe";
import { Auth } from "./pages/auth";
import { SavedRecipes } from "./pages/saved-recpies";
import { Navbar } from "./components/navbar";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecpie />} />
          <Route path="/saved-recpies" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
