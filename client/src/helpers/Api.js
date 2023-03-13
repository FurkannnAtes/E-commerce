import axios from "axios";

export const AliExpressProducts = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
