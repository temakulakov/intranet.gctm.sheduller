import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "./index";



const initialState: boolean = false;

const permissionsSlice = createSlice({
    name: 'adminMode',
    initialState,
    reducers: {
        setPermission: (state, action: PayloadAction<boolean>) => {
            return action.payload;
        },
    },
});

export const { setPermission } = permissionsSlice.actions;
export default permissionsSlice.reducer;

export const selectDate = (state: RootState) => state.permissions;
