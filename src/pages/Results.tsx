import React from "react";
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
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "@tanstack/react-form";
import type { FormValues, ResultsProps } from "../types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { sendResultsEmail } from "../utils/sendEmail";
import { required, object, pipe, string, minLength, email } from "valibot";

const emailFormSchema = required(
  object({
    fromName: pipe(string(), minLength(1)),
    userEmail: pipe(string(), email()),
  }),
  ["fromName"]
);

export const Results = ({ likedNames, dislikedNames }: ResultsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const form = useForm({
    defaultValues: {
      fromName: "",
      userEmail: "",
    } as FormValues,
    validators: { onSubmit: emailFormSchema },
    onSubmit: async ({ formApi }) => {
      const likedList = likedNames.map((name) => name.name);
      const dislikedList = dislikedNames.map((name) => name.name);

      const result = await sendResultsEmail(
        form.getFieldValue("fromName"),
        likedList,
        dislikedList,
        form.getFieldValue("userEmail")
      );

      setDialogOpen(false);
      if (result) {
        setSnackbarMessage("Email sent Successfully!");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Error sending email!");
        setSnackbarOpen(true);
      }
    },
  });

  const formSubmitting = form.state.isValidating || form.state.isSubmitting;

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
          formSubmitting || (likedNames.length < 1 && dislikedNames.length < 1)
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
          <form.Field
            name={"fromName"}
            children={({ state, handleChange, handleBlur }) => {
              return (
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Your Name"
                  defaultValue={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  error={state.meta.errors.length > 0}
                  helperText={
                    state.meta.errors.length > 0 && "Please enter your name"
                  }
                />
              );
            }}
          />
          <form.Field
            name={"userEmail"}
            children={({ state, handleChange, handleBlur }) => (
              <TextField
                fullWidth
                margin="normal"
                label="Your Email"
                defaultValue={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={state.meta.errors.length > 0}
                helperText={
                  state.meta.errors.length > 0 && "Please enter your email"
                }
              />
            )}
          />
        </DialogContent>
        <DialogActions sx={{ gap: 1 }}>
          <Button
            onClick={() => {
              setDialogOpen(false);
              form.reset();
            }}
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
            onClick={form.handleSubmit}
            color="primary"
            variant="contained"
            disabled={formSubmitting}
            sx={{ borderRadius: "8px" }}
          >
            {formSubmitting ? "Sending..." : "Send Results"}
          </Button>
        </DialogActions>
      </Dialog>
      {form.state.isSubmitSuccessful && (
        <Typography
          variant="body1"
          sx={{ color: "#388e3c", textAlign: "center", mt: 2 }}
        >
          Results sent successfully! 🎉
        </Typography>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackbarOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
};
