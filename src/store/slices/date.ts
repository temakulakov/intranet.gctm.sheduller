import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {IExposition, IFilials} from "../../interfaces";
import dayjs, {Dayjs} from "dayjs";
import {RootState} from "./index";



const initialState: Dayjs = dayjs();

const currentDateSlice = createSlice({
    name: 'currentDate',
    initialState,
    reducers: {
        setDate: (state, action: PayloadAction<string>) => {
            return dayjs(action.payload);
        },
        decrementDay: (state, action: PayloadAction<number>) => {
            return state.add(action.payload, 'day');
        },
        incrementDay: (state, action: PayloadAction<number>) => {
            return state.add(action.payload, 'day');
        }
    },
});

export const {} = currentDateSlice.actions;
export default currentDateSlice.reducer;

export const selectDate = (state: RootState) => state.currentDate;
