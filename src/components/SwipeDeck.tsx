import React from "React";
import TinderCard from "react-tinder-card";
import type { BabyName } from "../types";
import { NameCard } from "./NameCard";
import { Box, Button, Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface SwipeDeckProps {
  names: BabyName[];
  onSwipe: (name: BabyName, direction: string) => void;
  currentIndex: number;
}

export const SwipeDeck: React.FC<SwipeDeckProps> = ({
  names,
  onSwipe,
  currentIndex,
}) => {
  const swipe = (dir: "left" | "right") => {
    const name = names[currentIndex];
    if (name) {
      onSwipe(name, dir);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 320,
        margin: "0 auto",
      }}
    >
      {names.slice(currentIndex, currentIndex + 1).map((name) => (
        <TinderCard
          key={name.name}
          onSwipe={(dir) => onSwipe(name, dir)}
          preventSwipe={["up", "down"]}
          className="absolute w-full h-full"
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              marginTop: 4,
              marginBottom: 4,
              borderRadius: "20px",
              overflow: "hidden",
              transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            <NameCard name={name} />
          </Box>
        </TinderCard>
      ))}

      {currentIndex >= names.length ? (
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          No more names 😎
        </Typography>
      ) : (
        <Stack
          direction="row"
          spacing={3}
          sx={{
            mt: 2,
            justifyContent: "center",
            maxWidth: 320,
            margin: "0 auto",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => swipe("left")}
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              borderColor: "#d32f2f",
              color: "#d32f2f",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#d32f2f",
                color: "#fff",
              },
            }}
          >
            <ThumbDownIcon sx={{ fontSize: 32 }} />
          </Button>
          <Button
            variant="outlined"
            onClick={() => swipe("right")}
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              borderColor: "#388e3c",
              color: "#388e3c",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#388e3c",
                color: "#fff",
              },
            }}
          >
            <ThumbUpIcon sx={{ fontSize: 32 }} />
          </Button>
        </Stack>
      )}
    </Box>
  );
};
