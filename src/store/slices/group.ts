import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {IExposition, IFilials} from "../../interfaces";
import {RootState} from "./index";
import {IGroup, ISection} from "../../types/app";
import dayjs from "dayjs";



const initialState: IGroup[] = [];

const groupsSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setGroups: (state, action: PayloadAction<ISection[]>) => {
            const labels = [
                {title: "Главное здание бахрушинского музея", sections: []},
                {title: "Дом-музей Ермоловой", sections: []},
                {title: "Музей-квартира Вс.Э. Мейерхольда", sections: []},
                {title: "Музей-квартира М.М. Плисецкой", sections: []},
                {title: "Дом-музей М.С. Щепкина", sections: []},
                {title: "Театральный музей в Зарайске", sections: []},
                {title: "Мемориальный музей «Творческая мастерская театрального художника Д.Л. Боровского»", sections: []},
                {title: "Музей-квартира Г.С. Улановой", sections: []},
                {title: "Музей-квартира актёрской семьи М.В., А.А. Мироновых — А.С. Менакера", sections: []},
                {title: "Дом-музей А.Н. Островского/Театральная галерея на Малой Ордынке", sections: []},
                {title: "Музей-квартира Вс.Э. Мейерхольда", sections: []},
                {title: "Музей-студия Радиотеатра", sections: []},
            ];



            return state;
        },
    },
});

export const { setGroups } = groupsSlice.actions;
export default groupsSlice.reducer;

export const selectDate = (state: RootState) => state.currentDate;
