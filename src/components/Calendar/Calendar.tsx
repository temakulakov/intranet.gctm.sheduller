import React from 'react';
import styles from 'styles/Calendar.module.scss';
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/slices";
import {setDate} from "../../store/slices/date";

const Calendar = () => {
    const date = useSelector((state: RootState) => state.currentDate);
    const dispatch = useDispatch();

    return <div className={styles.container}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
            <DateCalendar
                value={date.from}
                onChange={(newValue) => dispatch(setDate({from: newValue}))}
                className={styles.root}
                views={['month', 'day']}
            />
        </LocalizationProvider>
    </div>
};

export default Calendar;