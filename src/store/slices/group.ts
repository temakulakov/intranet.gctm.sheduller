import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "./index";
import { IGroup, ISection } from "../../types/app";

interface Label {
    title: string;
    sections: number[];
    color: string;
}

const initialState: IGroup[] = [];

const groupsSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setGroups: (state, action: PayloadAction<ISection[]>) => {
            const labels: Label[] = [
                // { title: "Праздники", sections: [777], color: "#E89B08" },
                { title: "Центр театральной истории", sections: [531, 521, 520, 522], color: "#9D2135" },
                { title: "Дом-музей Ермоловой", sections: [527, 530, 529], color: "#BB85AB" },
                { title: "Музей-квартира Мейерхольда", sections: [532, 533], color: "#E10800" },
                { title: "Музей-квартира Плучека", sections: [566], color: "#686E9F" },
                { title: "Дом-музей М.С. Щепкина", sections: [551], color: "#B3D57D" },
                { title: "Театральный музей в Зарайске", sections: [534, 535], color: "#B89D18" },
                { title: "Мемориальный музей Д.Л. Боровского", sections: [564, 565], color: "#C2C6A8" },
                { title: "Музей-квартира Г.С. Улановой", sections: [561, 562, 563], color: "#DFC2C2" },
                { title: "Музей-студия Радиотеатра", sections: [557, 558], color: "#C67D30" },
            ];

            return labels.map((label, key) => {
                return {id: key, color: label.color, title: label.title, sections: action.payload.filter((section) => label.sections.includes(section.id))};
            });
        },
    },
});

export const { setGroups } = groupsSlice.actions;
export default groupsSlice.reducer;

export const selectDate = (state: RootState) => state.currentDate;
