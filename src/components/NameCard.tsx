import { Card, CardContent, Typography, Link as MuiLink } from "@mui/material";
import type { BabyName } from "../types";

interface NameCardProps {
  name: BabyName;
}

export const NameCard: React.FC<NameCardProps> = ({ name }) => {
  return (
    <Card
      sx={{
        width: 320,
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {name.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <span style={{ fontWeight: 700 }}>Origin:</span> {name.origin}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <span style={{ fontWeight: 700 }}>Meaning:</span> {name.meaning}
        </Typography>
        {name.popularity && (
          <Typography variant="body1" color="text.secondary">
            <span style={{ fontWeight: 700 }}>Popularity (in U.S.):</span>{" "}
            {name.popularity}
          </Typography>
        )}
        {name.link && (
          <MuiLink
            href={name.link}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            More info
          </MuiLink>
        )}
      </CardContent>
    </Card>
  );
};
