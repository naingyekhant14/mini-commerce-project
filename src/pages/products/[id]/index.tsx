"use client";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { Box, Button, Typography } from "@mui/material";
import { addToCart } from "../../../store/slices/cardSlice";

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const router = useRouter();
  const productId = Number(router.query.id);
  const product = products.find((p) => p.id === productId);

  if (!product) return null;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 900,
        mx: "auto",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box>
          <img src={product.imageurl} width={350} />
        </Box>
        <Box sx={{ ml: 10 }}>
          <Typography variant="h4">{product.title}</Typography>
          <Typography sx={{ my: 4 }}>{product.description}</Typography>
          <Typography variant="h5">${product.price}</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(addToCart({ ...product, quantity: 1 }));
                router.push("/");
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
