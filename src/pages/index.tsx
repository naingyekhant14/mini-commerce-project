import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { fatchProducts } from "../store/slices/productSlice";
import Products from "../components/product";
import { Container } from "@mui/material";
import { Product } from "@prisma/client";
import SearchProducts from "../components/searchProduct";

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);

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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <SearchProducts
        products={products}
        setFilterProducts={setFilterProducts}
      />

      <Products products={filterProducts} />
    </Container>
  );
};

export default Home;
