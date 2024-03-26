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

    return <motion.div
        className={styles.container}
        // onClick={() => setFull(!fullCalendar)}
        initial={{ minWidth: 0 }}
        animate={{ minWidth: fullCalendar ? '400px' :  '320px', height: fullCalendar ? '100vh' :  '334px' }}
    >
        {
            fullCalendar ? <div></div> : <AnimatePresence>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
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
            </AnimatePresence>
        }
    </motion.div>
};

export default Calendar;