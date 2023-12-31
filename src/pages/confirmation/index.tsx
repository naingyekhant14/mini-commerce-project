import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const confirmation = () => {
  const router = useRouter();

  const { orderId, status } = router.query;
  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4">Order:{orderId}</Typography>
      <Typography variant="h6" sx={{ my: 2 }}>
        Status:{status}
      </Typography>
      <Button variant="contained">Cancel Order</Button>
    </Box>
  );
};

export default confirmation;
