import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "./index";



const initialState: boolean = true;

const fullModeSlice = createSlice({
    name: 'adminMode',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<boolean>) => {
            return action.payload;
        },
    },
});

export const { setMode } = fullModeSlice.actions;
export default fullModeSlice.reducer;

export const selectMode = (state: RootState) => state.fullMode;
