import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import type { BabyName } from "../types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { sendResultsEmail } from "../utils/sendEmail";

interface ResultsProps {
  likedNames: BabyName[];
  dislikedNames: BabyName[];
}

export const Results = ({ likedNames, dislikedNames }: ResultsProps) => {
  const [fromName, setFromName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendEmail = async () => {
    setSending(true);

    const likedList = likedNames.map((name) => name.name);
    const dislikedList = dislikedNames.map((name) => name.name);

    const result = await sendResultsEmail(fromName, likedList, dislikedList);

    setSending(false);
    setDialogOpen(false);
    setSuccess(result);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" gutterBottom align="center">
        Results
      </Typography>

      <Grid container spacing={16}>
        <Grid>
          <Typography variant="h5" gutterBottom align="center">
            Liked Names
          </Typography>
          {likedNames.length > 0 ? (
            <Box component="ul" sx={{ listStyleType: "none", padding: 0 }}>
              {likedNames.map((name) => (
                <Box
                  component="li"
                  key={name.name}
                  sx={{
                    paddingBottom: "16px",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    fontSize: 20,
                  }}
                >
                  {name.name}
                </Box>
              ))}
            </Box>
          ) : (
            <Typography sx={{ color: "#999" }}>No liked names yet.</Typography>
          )}
        </Grid>

        <Grid>
          <Typography variant="h5" gutterBottom align="center">
            Disliked Names
          </Typography>
          {dislikedNames.length > 0 ? (
            <Box component="ul" sx={{ listStyleType: "none", padding: 0 }}>
              {dislikedNames.map((name) => (
                <Box
                  component="li"
                  key={name.name}
                  sx={{
                    paddingBottom: "16px",
                    marginBottom: "8px",
                    borderRadius: "8px",
                    fontSize: 20,
                  }}
                >
                  {name.name}
                </Box>
              ))}
            </Box>
          ) : (
            <Typography sx={{ color: "#999" }}>
              No disliked names yet.
            </Typography>
          )}
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4, width: 320, borderRadius: "8px" }}
        onClick={() => setDialogOpen(true)}
        disabled={
          sending ||
          success ||
          (likedNames.length < 1 && dislikedNames.length < 1)
        }
      >
        Email Results
      </Button>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            mt: 4,
            borderRadius: "8px",
            width: 320,
            backgroundColor: "transparent",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#555",
              color: "#fff",
              borderColor: "#555",
            },
          }}
        >
          Back to Voting
        </Button>
      </Link>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Send Results</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Your Name"
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ gap: 1 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            color="secondary"
            variant="outlined"
            sx={{
              borderRadius: "8px",
              backgroundColor: "transparent",
              borderColor: "#555",
              color: "#555",
              "&:hover": {
                backgroundColor: "#555",
                color: "#fff",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendEmail}
            color="primary"
            variant="contained"
            disabled={sending}
            sx={{ borderRadius: "8px" }}
          >
            {sending ? "Sending..." : "Send Results"}
          </Button>
        </DialogActions>
      </Dialog>
      {success && (
        <Typography
          variant="body1"
          sx={{ color: "#388e3c", textAlign: "center", mt: 2 }}
        >
          Results sent successfully! 🎉
        </Typography>
      )}
    </Container>
  );
};
