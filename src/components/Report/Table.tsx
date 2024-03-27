import React, {useEffect} from 'react';
import {CSVLink, CSVDownload} from 'react-csv';
import {IEvent, IReport} from "../../types/app";
import styles from "styles/Table.module.scss"
import {Dayjs} from "dayjs";

interface IProps {
    data: IReport[];
    date: { from: Dayjs, to: Dayjs };
}


const Table = ({data, date}: IProps) => {
    const csvData = data.flatMap(report =>
        {
            return report.sections.map((section, index) => {
                return [
                    index === 0 ? report.title : "", // Название филиала
                    section.title, // Название зала
                    section.eventsPath, // Процент занятости (в вашей структуре данных этого поля нет, но вы можете добавить его самостоятельно)
                    section.eventsCount.toString(), // Количество мероприятий
                    section.eventsTime.toString() // Количество часов
                ]
            })
        }
    );

    const headers = [
        {label: 'Филиал', key: 'filial'},
        {label: 'Зал', key: 'hall'},
        {label: 'Процент занятости', key: 'occupancyRate'},
        {label: 'Кол-во мероприятий', key: 'eventCount'},
        {label: 'Кол-во часов', key: 'hoursCount'}
    ];

    csvData.unshift(headers.map(header => header.label));

    return <div className={styles.wrapper} style={{width: '100%', marginTop: "20px"}}>
        <CSVLink
            data={csvData}
            // headers={headers} // Этот параметр можно опустить, если ваш первый подмассив в data уже содержит заголовки
            filename={`Отчет по занятости филиалов c ${date.from.format("DD.MM.YYYY")} по ${date.to.format("DD.MM.YYYY")}.csv`}
            style={{padding: "10px 15px", color: "white", backgroundColor: "#9D2135", borderRadius: "5px", textDecoration: "none", cursor: "pointer"}}
            target="_blank"
        >
            Экспортировать
        </CSVLink>

        <table style={{marginTop: "15px"}}>
            <thead>
            <tr>
                {headers.map((header, id) => <td key={id}>{header.label}</td>)}
            </tr>
            </thead>
            <tbody>
            {
                data.map((group, id) => <>{group.sections.map((section, id) => <tr key={section.id}>
                            <td>{id === 0 ? group.title : ""}</td>
                            <td>{section.title}</td>
                            <td>{section.eventsPath}</td>
                            <td>{section.eventsCount}</td>
                            <td>{section.eventsTime}ч</td>
                        </tr>
                    )}</>
                    )
            }
            </tbody>
        </table>
    </div>
};

export default Table;