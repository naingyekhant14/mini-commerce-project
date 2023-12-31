import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { fatchProducts } from "../store/slices/productSlice";
import ProductsCard from "../components/productsCard";
import { Box, Container, Typography, colors } from "@mui/material";
import { Product } from "@prisma/client";
import SearchProducts from "../components/searchProducts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const cartItems = useAppSelector((state) => state.cart.items);

  const [filterProducts, setFilterProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fatchProducts());
  }, []);

  useEffect(() => {
    if (products.length) {
      setFilterProducts(products);
    }
  }, [products]);

  return (
    <Container sx={{ mt: 5 }}>
      <Link
        href={"/shopping-cart"}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          textDecoration: "none",
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: "2.5rem", color: "black" }} />
        {cartItems.length > 0 && (
          <Typography sx={{ color: "red" }}>{cartItems.length}</Typography>
        )}
      </Link>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SearchProducts
          products={products}
          setFilterProducts={setFilterProducts}
        />
        <ProductsCard products={filterProducts} />
      </Container>
    </Container>
  );
};

export default Home;
