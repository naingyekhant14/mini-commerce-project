import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { Box, Button, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { updateQuantity } from "../../store/slices/cardSlice";

const Cart = () => {
  const disPatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const getCartTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => (totalPrice += item.price * item.quantity));
    return totalPrice;
  };

  const increaseQuantity = (id: number, quantity: number) => {
    disPatch(updateQuantity({ id, quantity }));
  };

  const decreaseQuantity = (id: number, quantity: number) => {
    disPatch(updateQuantity({ id, quantity }));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {cartItems.length ? (
          <Box sx={{ maxWidth: "50%" }}>
            {cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img src={item.imageurl} width={120} />
                  <Box sx={{ ml: 5 }}>
                    <Typography sx={{ fontWeight: "bold" }} variant="h6">
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontWeight: "bold" }} variant="h6">
                      ${item.price}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", ml: 5 }}>
                  <RemoveCircleOutlineIcon
                    sx={{ fontSize: 40, color: "red", cursor: "pointer" }}
                    onClick={() => increaseQuantity(item.id, item.quantity - 1)}
                  />
                  <Typography variant="h4" sx={{ mx: 2 }}>
                    {item.quantity}
                  </Typography>
                  <AddCircleOutlineIcon
                    sx={{ fontSize: 40, color: "green", cursor: "pointer" }}
                    onClick={() => increaseQuantity(item.id, item.quantity + 1)}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="h1">Empty Cart</Typography>
        )}
      </Box>
      {cartItems.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mt: 5,
          }}
        >
          <Typography variant="h3">
            Total Price :{getCartTotalPrice()}
          </Typography>
          <Button variant="contained" sx={{ width: "fit-content", my: 3 }}>
            Confirm Order
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
