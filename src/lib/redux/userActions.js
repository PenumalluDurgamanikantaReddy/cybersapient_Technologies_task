import { createAsyncThunk } from "@reduxjs/toolkit";


export const getUserData = createAsyncThunk(
  "getUserData",

  async ({ userId }) => {
    const url =
      `https://68779c2bdba809d901f02a3e.mockapi.io/cyberspaient/user/${userId}`;

    try {
      const response = await fetch(
        `https://68779c2bdba809d901f02a3e.mockapi.io/cyberspaient/user/${userId}`,
        { method: "GET", cache: "no-store" }
      );
      if (!response.ok) {
        console.log(response);
      }
      const userData = response.json();

      return userData;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);
