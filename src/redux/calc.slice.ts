import { createSlice } from "@reduxjs/toolkit";
import { getCables } from "./Thunk/getCables";
import { CableData } from "../types/calculatorTypes";

const initialState: CableData = {
  cables: {},
};

const calcSlice = createSlice({
  name: "cables",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // TODO getCables
      .addCase(getCables.pending, () => {})
      .addCase(getCables.fulfilled, (state, { payload }) => {
        state.cables = payload;
      })
      .addCase(getCables.rejected, (state) => {
        console.error("ERROR! get cables");
      });
  },
});
export const {} = calcSlice.actions;
export default calcSlice.reducer;
