import { combineReducers } from '@reduxjs/toolkit';
import currentDate from './date';
import groups from "./group";
// Импортируйте ваши редюсеры здесь

const rootReducer = combineReducers({
    // Добавьте ваши редюсеры сюда
    currentDate: currentDate,
    groups: groups
    // Вы можете добавить другие редюсеры по мере необходимости
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
