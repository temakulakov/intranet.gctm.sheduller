import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {IExposition, IFilials} from "../../interfaces";
import dayjs, {Dayjs} from "dayjs";
import {RootState} from "./index";



const initialState: {from: Dayjs} = {from: dayjs()};

const currentDateSlice = createSlice({
    name: 'currentDate',
    initialState,
    reducers: {
        setDate: (state, action: PayloadAction<{from: Dayjs}>) => {
            return action.payload;
        },
        decrementDay: (state) => {
            return { from: state.from.subtract(1, 'day') };
        },
        incrementDay: (state) => {
            return { from: state.from.add(1, 'day') };
        }
    },
});

export const { setDate, decrementDay, incrementDay} = currentDateSlice.actions;
export default currentDateSlice.reducer;

export const selectDate = (state: RootState) => state.currentDate;
