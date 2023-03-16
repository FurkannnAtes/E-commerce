import axios from "axios";
import { client } from "@/utils/client";

export const AliExpressProducts = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Get My Products sorted by date

export const getMyProducts = async (userId) => {
  try {
    const query = `*[_type == "product" && sellingBy._ref == "${userId}"]| order(_createdAt desc)`;
    const res = await client.fetch(query);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get SinglePost

export const getSinglePost = async (postId) => {
  try {
    const query = `*[_type == "product" && _key == "${postId}"][0]`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get My Products sorted by price

export const getMyProductsSortedByPrice = async (userId) => {
  try {
    const query = `*[_type == "product" && sellingBy._ref == "${userId}"]| order(price desc)`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get New Products

export const getProducts = async () => {
  try {
    const query = `*[_type == "product"]| order(_createdAt desc)`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get Products sorted By Price

export const getProductsSortedByPrice = async () => {
  try {
    const query = `*[_type == "product"]| order(price desc)`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get users sorted By date

export const getUsers = async () => {
  try {
    const query = `*[_type == "user"]| order(_createdAt desc)`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get Single User

export const getSingleUser = async (userId) => {
  try {
    const query = `*[_type == "user" && _id === "${userId}"][0]`;
    const res = await client.fetch(query);
    return res;
  } catch (error) {
    console.log(error);
  }
};
