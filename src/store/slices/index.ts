import { combineReducers } from '@reduxjs/toolkit';
import currentDate from './date';
import groups from "./group";
import permissions from "./permissions";
import currentEvent from "./event";
import fullMode from "./fullMode";
// Импортируйте ваши редюсеры здесь

const rootReducer = combineReducers({
    // Добавьте ваши редюсеры сюда
    currentDate: currentDate,
    groups: groups,
    permissions: permissions,
    currentEvent: currentEvent,
    fullMode: fullMode
    // Вы можете добавить другие редюсеры по мере необходимости
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
