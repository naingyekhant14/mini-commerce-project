import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAppDispatch } from "../../store/hook";
import { cancleOrder } from "../../store/slices/cardSlice";

const confirmation = () => {
  const router = useRouter();
  const dispart = useAppDispatch();
  const [open, setOpen] = useState(false);

  const { orderId, status } = router.query;

  const onSuccess = () => {
    setOpen(true);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const handleCancleOeder = () => {
    const test = orderId as string;
    dispart(cancleOrder({ orderId: test, onSuccess }));
  };
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
      <Button variant="contained" onClick={handleCancleOeder}>
        Cancel Order
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Your order has been cancelled
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default confirmation;
