import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index";
import { Login } from "./pages/Login";
import { ExchangeRates } from "./pages/ExchangeRates";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exchange-rates" element={<ExchangeRates />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;