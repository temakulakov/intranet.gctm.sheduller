import React, {useEffect, useState} from 'react';
import {Modal, Box, Typography, Button, Autocomplete, Chip, TextField} from '@mui/material';
import CustomExport from "./Table";
import HorizontalBars from "./Charts";
import styles from "styles/Report.module.scss"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import dayjs, {Dayjs} from "dayjs";
import {useSelector} from "react-redux";
import {RootState} from "../../store/slices";
import {IGroup, IReport} from "../../types/app";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Month, WeekDay} from "../../types/consts";
import {useReportEvents} from "../../hooks/useEvents";

interface ModalProps {
    report: boolean;
    handleClose: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ report, handleClose }) => {
    const [selectedGroups, setSelectedGroups] = useState<IGroup[]>([]);
    const [date, setDate] = useState<{ from: Dayjs, to: Dayjs }>({ from: dayjs().subtract(1, 'month'), to: dayjs() });
    const groups = useSelector((state: RootState) => state.groups.filter(group => group.title !== "Праздники"));

    // Изменено: использование хука useEffect для загрузки данных только при изменении selectedGroups или date
    const { data, refetch, isSuccess, isFetching, isPending } = useReportEvents(date.to, date.from, selectedGroups.flatMap(group => group.sections.map(section => section.id)));

    const [reportData, setReportData] = useState<IReport[]>([]);

    useEffect(() => {
        // Функция для инициализации reportData с базовыми значениями
        const initializeReportData = () => {
            const initialReportData = selectedGroups.map(group => ({
                id: group.id,
                title: group.title,
                sections: group.sections.map(section => ({
                    id: section.id,
                    title: section.title,
                    eventsCount: 0,
                    eventsPath: 0,
                    eventsTime: 0
                })),
                color: group.color
            }));
            setReportData(initialReportData);
        };

        initializeReportData();
    }, [selectedGroups]);

    useEffect(() => {
        // Изменено: Вычисления и обновление данных отчета после успешной загрузки
        if (isSuccess && data) {
            const updatedReportData = reportData.map(group => {
                const updatedSections = group.sections.map(section => {
                    const sectionEvents = data.filter(event => event.section === section.id);
                    const eventsTime = sectionEvents.reduce((acc, event) => acc + dayjs(event.to).diff(dayjs(event.from), 'hours'), 0);
                    const eventsPath = eventsTime * 5; // Пример вычисления, адаптируйте под свои нужды

                    return {
                        ...section,
                        eventsCount: sectionEvents.length,
                        eventsTime,
                        eventsPath
                    };
                });

                return {
                    ...group,
                    sections: updatedSections
                };
            });

            setReportData(updatedReportData);
        }
    }, [ isFetching, isSuccess, refetch ]);

    const renderReport = ()  => {
        if (data && data.length > 0) {
            setReportData(prevState => {
                prevState.forEach(group => ({...group, sections: group.sections.map(section => ({...section, eventsPath: 0, eventsTime: 0, eventsCount: 0}))}))
                data.forEach((element) => {

                    prevState.forEach((group, index) => {
                        const section = group.sections.find((section) => section.id === element.section);
                        if (section) {
                            // Если section найден, безопасно обращаемся к eventsCount и увеличиваем его на 1
                            section.eventsCount += 1;
                            // Аналогично, безопасно обновляем eventsTime, предварительно проверив, что section существует
                            section.eventsTime += dayjs(element.to, "DD.MM.YYYY HH:mm:ss").diff(dayjs(element.from, "DD.MM.YYYY HH:mm:ss"), 'hours');
                        }
                    });
                });
                setReportData(prevState => {
                    return prevState.map(el => ({
                        ...el,
                        sections: el.sections.map(section => {
                            const x = date.to.diff(date.from, 'hours');
                            return {...section, eventsPath:  x * 8 / 24 / 100  };
                        }),

                    }))
                })
                return prevState;
            });
    }}

    const steps = [
        {
            label: "Выбрать филиалы",
            description: <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "fit-content"}}>
                <Autocomplete
                    style={{width: "385px"}}
                    multiple
                    id="user-select-demo"
                    options={groups}
                    value={selectedGroups}
                    onChange={(event, newValue) => {
                        setSelectedGroups(newValue);
                    }}
                    getOptionLabel={(option) => `${option.title}`}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                            <Chip
                                label={`${option.title}`}
                                {...getTagProps({index})}
                                onDelete={(newValue) => {
                                    setSelectedGroups((prevState) => prevState.filter((group) => group.title !== option.title));
                                }}
                                avatar={
                                    <div
                                        style={{backgroundColor: option.color, width: "20px", height: "20px", borderRadius: "50%"}}
                                    />
                                }
                            />
                        ))
                    }
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            <div
                                style={{backgroundColor: option.color, width: "20px", height: "20px", borderRadius: "50%", marginRight: "10px"}}
                            />
                            {`${option.title}`}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            placeholder="Выберите филиалы"
                            {...params}
                            label="Выберите филиалы"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
                <Button onClick={() => setSelectedGroups(groups)}>{"Выбрать все"}</Button>
            </div>,
        },
        {
            label: 'Выберите промежуток',
            description:
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "fit-content"
                        }}>
                            <div>
                                <h3 style={{marginLeft: "25px"}}>{date.from.date()} {Month[date.from.month()]} {date.from.year()} {WeekDay[date.from.day()]}</h3>
                                <DateCalendar value={date.from}
                                              onChange={(newValue) => setDate(prev => ({to: prev.to, from: newValue}))}
                                              maxDate={date.to} views={['month', 'day']}/>
                            </div>
                            <div>
                                <h3 style={{marginLeft: "25px"}}>{date.to.date()} {Month[date.to.month()]} {date.to.year()} {WeekDay[date.to.day()]}</h3>
                                <DateCalendar value={date.to}
                                              onChange={(newValue) => setDate(prev => ({
                                                  to: newValue,
                                                  from: prev.from
                                              }))}
                                              views={['month', 'day']}/>
                            </div>
                        </div>
                    </LocalizationProvider>
                </div>,
        },

    ];


    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Modal
            open={report}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px',
                    maxHeight: '90vh',
                    borderRadius: '10px',
                    overflowY: 'scroll',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="modal-title" variant="h6" component="h2">
                    Формирование отчета
                </Typography>



                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === 2 ? (
                                            <Typography variant="caption">Последний шаг</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    {step.description}
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={index !== steps.length - 1 ? handleNext : () => {
                                                    handleNext();
                                                    refetch();
                                                }}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === steps.length - 1 ? 'Сформировать отчет' : 'Продолжить'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Назад
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <div className={styles.bottomWrapper}>
                            <HorizontalBars data={reportData}/>
                            <CustomExport data={reportData} date={date}/>
                            <div className={styles.bottomButton}><Button variant={"contained"} onClick={() => {
                                handleClose();

                                setActiveStep(0)
                            }}>Закрыть</Button>
                                <Button onClick={() => {
                                    setActiveStep(0)
                                }}>Вернуться</Button></div>
                        </div>
                    )}
            </Box>
        </Modal>
    );
};

export default ModalComponent;
