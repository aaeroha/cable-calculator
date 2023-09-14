import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCables = createAsyncThunk("cables/getCables", async () => {
  try {
    const response = await fetch("../../../db/db-calc.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const resolve = await response.json();
      return resolve;
    } else {
      throw new Error("Get cables failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});
