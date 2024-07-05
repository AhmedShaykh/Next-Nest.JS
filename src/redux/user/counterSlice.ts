import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: any = {
    user: {}
};

export const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<{}>) => {
            state.user = action.payload;
        }
    }
})

export const { addUser } = counterSlice.actions;

export const UserDetail = (state: RootState) => state.user;

export default counterSlice.reducer;