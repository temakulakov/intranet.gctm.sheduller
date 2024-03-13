import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "./index";
import { IGroup, ISection } from "../../types/app";

interface Label {
    title: string;
    sections: number[];
}

const initialState: IGroup[] = [];

const groupsSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setGroups: (state, action: PayloadAction<ISection[]>) => {
            const labels: Label[] = [
                { title: "Главное здание бахрушинского музея", sections: [531, 521, 520, 522] },
                { title: "Дом-музей Ермоловой", sections: [527, 530, 529] },
                { title: "Музей-квартира Вс.Э. Мейерхольда", sections: [532, 533] },
                { title: "Музей-квартира М.М. Плисецкой", sections: [] },
                { title: "Дом-музей М.С. Щепкина", sections: [551] },
                { title: "Театральный музей в Зарайске", sections: [534, 535] },
                { title: "Мемориальный музей «Творческая мастерская театрального художника Д.Л. Боровского»", sections: [536] },
                { title: "Музей-квартира Г.С. Улановой", sections: [537, 538] },
                { title: "Музей-студия Радиотеатра", sections: [557, 558] },
            ];

            return labels.map((label, key) => {
                return {id: key, title: label.title, sections: action.payload.filter((section) => label.sections.includes(section.id))};
            });
        },
    },
});

export const { setGroups } = groupsSlice.actions;
export default groupsSlice.reducer;

export const selectDate = (state: RootState) => state.currentDate;
