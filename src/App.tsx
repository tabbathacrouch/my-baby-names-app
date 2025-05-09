import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { Home } from "./pages/Home";
import { Results } from "./pages/Results";
import { useState } from "react";
import type { BabyName } from "./types";

function App() {
  const [likedNames, setLikedNames] = useState<BabyName[]>([]);
  const [dislikedNames, setDislikedNames] = useState<BabyName[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (name: BabyName, direction: string) => {
    if (direction === "right") {
      setLikedNames((prev) => [...prev, name]);
    } else if (direction === "left") {
      setDislikedNames((prev) => [...prev, name]);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const resetIndex = () => {
    setLikedNames([]);
    setDislikedNames([]);
    setCurrentIndex(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onSwipe={handleSwipe}
                currentIndex={currentIndex}
                resetIndex={resetIndex}
              />
            }
          />
          <Route
            path="/results"
            element={
              <Results likedNames={likedNames} dislikedNames={dislikedNames} />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
