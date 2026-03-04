import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import OutfitGenerator from "./pages/OutfitGenerator";
import Chatbot from "./pages/Chatbot";
import Visualizer from "./pages/Visualizer";
import ColorMatcher from "./pages/ColorMatcher";
import Wardrobe from "./pages/Wardrobe";
import Trends from "./pages/Trends";
import History from "./pages/History";
import Quiz from "./pages/Quiz";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<OutfitGenerator />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/visualizer" element={<Visualizer />} />
          <Route path="/color-matcher" element={<ColorMatcher />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/history" element={<History />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
