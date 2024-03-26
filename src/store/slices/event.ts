import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs, {Dayjs} from "dayjs";
import {RootState} from "./index";
import {IEvent} from "../../types/app";


const initialState: IEvent = {
    id: 0,
    title: 'Новое событие',
    description: '',
    from: dayjs(),
    to: dayjs(),
    members: [],
    section: 0
}

const currentEventSlice = createSlice({
    name: 'currentEvent',
    initialState,
    reducers: {
        setEvent: (state, action: PayloadAction<IEvent>) => {
            return action.payload;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            return { ...state, title: action.payload };
        },
        setDescription: (state, action: PayloadAction<string>) => {
            return { ...state, description: action.payload}
        },
        setFrom: (state, action: PayloadAction<Dayjs>) => {
            return { ...state, from: action.payload}
        },
        setTo: (state, action: PayloadAction<Dayjs>) => {
            return { ...state, to: action.payload}
        },
        setMembers: (state, action: PayloadAction<number[]>) => {
            return { ...state, members: action.payload}
        },
        setSection: (state, action: PayloadAction<number>) => {
            return { ...state, section: action.payload}
        },

    },
});

export const { setEvent, setTitle, setDescription, setMembers, setFrom, setSection, setTo} = currentEventSlice.actions;
export default currentEventSlice.reducer;

export const selectDate = (state: RootState) => state.currentEvent;
