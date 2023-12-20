import { Box } from "@mui/material";
import { Inter } from "next/font/google";
import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { fatchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/productCard";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);

  useEffect(() => {
    dispatch(fatchProducts());
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {products.map((product) => (
        <Box sx={{ mr: 5, mb: 3 }} key={product.id}>
          <ProductCard
            title={product.title}
            description={product.description}
            imageUrl={product.imageurl}
          />
        </Box>
      ))}
    </Box>
  );
}
