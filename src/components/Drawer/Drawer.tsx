import React, {useState} from 'react';
import Drawer from '@mui/material/Drawer';
import {IEvent, ISection} from "../../types/app";
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import NotesIcon from '@mui/icons-material/Notes';
import {Autocomplete, Box, Button, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../store/slices";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Month, WeekDay} from "../../types/consts";
import 'dayjs/locale/ru';
import {useUsers} from "../../hooks/useUsers";
import dayjs from "dayjs";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import {useSections} from "../../hooks/useSections";
import styles from 'styles/Drawer.module.scss'
import {useAddEvent, useDeleteEvent, useUpdateEvent} from "../../hooks/useEvents";
import DragAndDrop from "./UploadArea";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface RightDrawerProps {
    isOpen: boolean;
    toggleDrawer: (open: boolean) => void;
    activeEvent: IEvent | undefined;
    setActiveEvent: React.Dispatch<React.SetStateAction<IEvent | undefined>>;
};

interface IMenu {
    title: string;
    element: JSX.Element;
    icon: JSX.Element;
}


const RightDrawer: React.FC<RightDrawerProps> = ({isOpen, toggleDrawer, activeEvent = {id: 0, title: 'Новое событие', description: '', section: 0, from: dayjs(), to: dayjs(), members: [0]}, setActiveEvent}: RightDrawerProps) => {
    const groups = useSelector((state: RootState) => state.groups);
    const date = useSelector(( state: RootState) => state.currentDate);
    const { isSuccess, data: sections } = useSections();
    const { data: users } = useUsers();
    const addEventMutation = useAddEvent(activeEvent);
    const updateEventMutation = useUpdateEvent(activeEvent);
    const deleteEventMutation = useDeleteEvent(activeEvent?.id);
    const arr: number[] = [];
    const adminMode = useSelector((state: RootState) => state.permissions);

    const handleUpdate = async () => {
        if(activeEvent?.id === 0) {
            await addEventMutation.mutate();
        } else {
            await updateEventMutation.mutate();
        }
        toggleDrawer(false);
        setActiveEvent(undefined);
    }

    const handleDelete = async () => {
        await deleteEventMutation.mutate();
        toggleDrawer(false);
        setActiveEvent(undefined);
    }
    const view: IMenu[] = [
        // {
        //     title: 'Филиал', icon: <AccountBalanceRoundedIcon/>, element: <h2>{groups.find(group => group.sections.some(section => section.id === activeEvent?.section)).title}</h2>
        // },
        // {
        //     title: 'Зал', icon: <AccountBalanceRoundedIcon/>, element: <h2>{sections.find(section => section.id === activeEvent?.section)}</h2>
        // },
        {
            title: 'Время начала', icon: <AccountBalanceRoundedIcon/>, element: <h2>{activeEvent.from.date()} {Month[activeEvent.from.month()]} {activeEvent.from.year()} {WeekDay[activeEvent.from.day()]}</h2>
        },
        {
            title: 'Время окончания',
            icon: <AccountBalanceRoundedIcon/>,
            element:
                <h2>{activeEvent.to.date()} {Month[activeEvent.to.month()]} {activeEvent.to.year()} {WeekDay[activeEvent.to.day()]}</h2>
        },
        // {
        //     title: 'Сотрудники', icon: <AccountBalanceRoundedIcon/>, element: <h2>{users ? users.filter(user => activeEvent?.members.includes(user.id)) : ''}</h2>
        // },
        {
            title: 'Описание', icon: <AccountBalanceRoundedIcon/>, element: <h2>{activeEvent?.description}</h2>
        },
        {
            title: 'Файлы', icon: <AccountBalanceRoundedIcon/>, element: <h2>{}</h2>
        },
    ]
    const menu: IMenu[] = [
        {
            title: 'Филиал', icon: <AccountBalanceRoundedIcon/>, element: <Autocomplete
                renderInput={(params) => <TextField {...params} label="Зал"/>}
                sx={{width: 350}}
                options={groups}
                // Пример приведения типа или поиска соответствующего элемента, который следует адаптировать под вашу логику
                value={groups.find(group => group.sections.some(section => section.id === activeEvent?.section))}
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                    <Box component="li" {...props}>
                        <div style={{backgroundColor: option.color, width: '20px', height: '20px', borderRadius: '50%', marginRight: '10px'}} />
                        {option.title}
                    </Box>
                )}
            />
        },
        {title: 'Зал', icon: <FmdGoodRoundedIcon/>, element: sections ? <Autocomplete
                renderInput={(params) => <TextField {...params} label="Зал"/>}
                sx={{width: 350}}
                options={sections?.filter(section => groups.filter(group => group.sections.some(section => section.id === activeEvent?.section)))}
                value={sections.find(section => section.id === activeEvent?.section)}
                onChange={(event, newValue) => {
                    if (newValue) {
                        setActiveEvent((prevState ) => {
                            return {
                                ...activeEvent,
                                section: newValue.id
                            }
                        })
                    }
                }}
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                    <Box component="li" {...props}>
                        <div style={{backgroundColor: option.color, width: '20px', height: '20px', borderRadius: '50%', marginRight: '10px'}} />
                        {option.title}
                    </Box>
                )}
            /> : <div></div>},
        {title: 'Время начала', icon: <AccessTimeFilledRoundedIcon/>, element: <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
                <DateTimePicker
                    ampm={false}
                    views={['month', 'day', 'hours', 'minutes']}
                    sx={{width: 350}}
                    maxDateTime={activeEvent?.to}
                    label={`${activeEvent ? activeEvent?.from.date() : date.from.date()} ${Month[activeEvent ? activeEvent?.from.month() : date.from.month()]} ${activeEvent ? activeEvent?.from.year() : date.from.year()} ${WeekDay[activeEvent?.from.day() ? activeEvent?.from.day() : date.from.day()]}`}
                    value={activeEvent?.from} // Убедитесь, что selectedEvent?.DATE_FROM корректно обрабатывается
                    onChange={(newValue) => {
                        setActiveEvent((prev) => {
                            if (!prev || !newValue) return prev; // Возвращаем prev, если оно равно null или newValue равно null
                            return {...prev, from: newValue};
                        });
                    }}
                    format="DD.MM.YYYY HH:mm"
                />
            </LocalizationProvider>},
        {title: 'Время окончания', icon: <AccessTimeFilledRoundedIcon/>, element: <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
                <DateTimePicker
                    ampm={false}
                    sx={{width: 350}}
                    views={['month', 'day', 'hours', 'minutes']}
                    minDateTime={activeEvent?.from}
                    label={`${activeEvent ? activeEvent?.to.date() : date.from.date()} ${Month[activeEvent ? activeEvent?.to.month() : date.from.month()]} ${activeEvent ? activeEvent?.to.year() : date.from.year()} ${WeekDay[activeEvent?.to.day() ? activeEvent?.to.day() : date.from.day()]}`}
                    value={activeEvent?.to} // Убедитесь, что selectedEvent?.DATE_FROM корректно обрабатывается
                    onChange={(newValue) => {
                        setActiveEvent((prev) => {
                            if (!prev || !newValue) return prev; // Возвращаем prev, если оно равно null или newValue равно null
                            return {...prev, to: newValue};
                        });
                    }}
                    format="DD.MM.YYYY HH:mm"
                />
            </LocalizationProvider>},
        {title: 'Сотрудники', icon: <Groups2RoundedIcon/>, element: <Autocomplete
                renderInput={(params) => <TextField {...params} label="Сотрудники"/>}
                sx={{width: 350}}
                multiple
                value={users ? users.filter(user => activeEvent?.members.includes(user.id)) : []}
                onChange={(e, users) => setActiveEvent((prevState) => {
                    return {
                        ...activeEvent,
                        members: users.map((member) => member.id) // Предполагается, что value - это массив объектов с полем id.
                    };
                })}

                options={users ?? []}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => <Box component="li" {...props} key={option.id}>
                    <img alt={option.image} loading="lazy" src={option.image ?? 'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg'} style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '10px'}} />
                    {option.name}</Box>}
            />},
        {title: 'Описание', icon: <NotesIcon/>, element: <TextField
                fullWidth
                multiline
                label="Описание"
                InputProps={{
                    inputComponent: TextareaAutosize,
                    rows: 3
                }}
                value={activeEvent?.description}
                onChange={(e) => {
                    if (activeEvent) {
                        setActiveEvent((prevState) => {
                            if (prevState) {
                                return {...prevState, description: e.target.value}
                            }
                        });
                    }
                }}

            />},
    ];

    const list = () => (
        <div
            role="presentation"
            onKeyDown={(e) => {
                if (e.key === 'Escape') {
                    toggleDrawer(false);
                    setActiveEvent(undefined);
                }

            }}
        >
            <table>
                <tbody>

                {
                    adminMode ? menu.map((item, i) => (<tr key={i}>
                        <td><h4>{item.title}</h4></td>
                        <td>{item.icon}</td>
                        <td>{item.element}</td>
                    </tr>)) : view.map((item, i) => (<tr key={i}>
                        <td><h4>{item.title}</h4></td>
                        <td>{item.icon}</td>
                        <td>{item.element}</td>
                    </tr>))
                }
                </tbody>
            </table>
        </div>
    );
    return (<div>
    <div style={{display: 'flex', position: 'relative'}}>

        <React.Fragment>
            <Drawer anchor="right" open={isOpen} onClose={() => {
                toggleDrawer(false);
                setActiveEvent(undefined);
            }}>

                <div className={styles.root}>
                    <div>
                        <h1 style={{display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
                            <input className={styles.title} value={activeEvent.title}
                                   style={{height: "30px", width: '80%'}}
                                   onChange={(e) => setActiveEvent(prevState => {
                                       if (prevState) {
                                           return {...prevState, title: e.target.value}
                                       }
                                   })}/>
                            <svg className={styles.close} viewBox="0 0 24 24" onClick={() => {
                                toggleDrawer(false);
                                setActiveEvent(undefined)
                            }}>
                                <path
                                    d="M18.3 5.71a.9959.9959 0 0 0-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"></path>
                            </svg>
                        </h1>

                        {list()}

                        <h4>Прикрепленные файлы</h4>
                        <DragAndDrop/>
                    </div>
                    <div className={styles.buttonGroup}>
                        <Button variant='contained'
                                onClick={handleUpdate}>{activeEvent?.id === 0 ? "Сохранить" : "Обновить"}</Button>
                        <Button variant={'outlined'}
                                onClick={handleDelete}>{activeEvent?.id === 0 ? "Отменить" : "Удалить"}</Button>
                        </div>
                    </div>
                </Drawer>
            </React.Fragment>
        </div></div>
    );
};

export default RightDrawer;
