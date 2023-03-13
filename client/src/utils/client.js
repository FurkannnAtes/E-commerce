import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "2ril9qhl",
  dataset: "production",
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: "2022-01-12", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
  token: import.meta.env.VITE_TOKEN_SANITY,
});
