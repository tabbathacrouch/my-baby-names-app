import { useQuery } from "@tanstack/react-query";
import { fetchNames } from "../utils/fetchNames";
import { SwipeDeck } from "../components/SwipeDeck";
import type { BabyName } from "../types";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface HomeProps {
  onSwipe: (name: BabyName, direction: string) => void;
  currentIndex: number;
  resetIndex: () => void;
}

export const Home = ({ onSwipe, currentIndex, resetIndex }: HomeProps) => {
  const {
    data: names,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["babyNames"],
    queryFn: fetchNames,
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Failed to load names</Typography>;

  return (
    <Container
      maxWidth="xs"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" gutterBottom align="center">
        Baby Names
      </Typography>

      <SwipeDeck
        names={names || []}
        onSwipe={onSwipe}
        currentIndex={currentIndex}
      />

      <Link to="/results" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, borderRadius: "8px", width: 320 }}
        >
          Show Results
        </Button>
      </Link>

      <Button
        variant="outlined"
        color="secondary"
        onClick={resetIndex}
        disabled={currentIndex === 0}
        sx={{
          mt: 2,
          width: 320,
          borderRadius: "8px",
          borderColor: "#555",
          color: "#555",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#555",
            color: "#fff",
            borderColor: "#555",
          },
        }}
      >
        Reset
      </Button>
    </Container>
  );
};
