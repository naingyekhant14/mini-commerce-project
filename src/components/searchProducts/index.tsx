import { Box, TextField } from "@mui/material";
import { Product } from "@prisma/client";
import React from "react";

interface Props {
  products: Product[];
  setFilterProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const SearchProducts = ({ setFilterProducts, products }: Props) => {
  const handleSearch = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchText = evt.target.value.toLowerCase();
    const searchResult = products.filter((product) =>
      product.title.toLowerCase().includes(searchText)
    );
    setFilterProducts(searchResult);
  };

  return (
    <Box width={"70%"}>
      <TextField
        placeholder="search product..."
        variant="outlined"
        sx={{ width: "100%" }}
        onChange={handleSearch}
      />
    </Box>
  );
};

export default SearchProducts;
