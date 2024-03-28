import React from 'react';
import styles from 'styles/Calendar.module.scss';
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/slices";
import {setDate} from "../../store/slices/date";
import {AnimatePresence, motion} from 'framer-motion';

const Calendar = () => {
    const date = useSelector((state: RootState) => state.currentDate);
    const dispatch = useDispatch();
    const [fullCalendar, setFull] = React.useState(false);
    const mode = useSelector((state: RootState) => state.fullMode);
    return <motion.div
        className={styles.container}
        initial={{ minWidth: 0 }}
        animate={{ minWidth: fullCalendar ? 'fit-content' :  'fit-content', height: fullCalendar ? '100vh' :  'fit-content', transform: `scale(1)`, width: fullCalendar ? 'fit-content' : '0' }}
    >
        {
            <AnimatePresence>
                {
                    mode && <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0, width: 0, padding: 0}}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
                            <DateCalendar
                                value={date.from}
                                onChange={(newValue) => dispatch(setDate({from: newValue}))}
                                className={styles.root}
                                views={['month', 'day']}
                            />
                        </LocalizationProvider>
                    </motion.div>
                }

            </AnimatePresence>
        }
    </motion.div>
};

export default Calendar;