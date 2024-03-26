import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, TooltipProps } from 'recharts';
import { IReport, IReportSection } from "../../types/app";

interface IProps {
    data: IReport[];
}

interface IChartData {
    title: string;
    percante: number;
    color: string;
    sections: IReportSection[];
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data: IChartData = payload[0].payload;
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                <p className="label">{`Филиал: ${data.title}`}</p>
                <p className="label">{`Общий процент использования: ${data.percante}%`}</p>
                <p className="label" style={{ marginBottom: '10px' }}>Sections:</p>
                {data.sections.map((section, index) => (
                    <div key={index}>
                        <p className="section-title">{`${section.title}`}</p>

                        <p>{`Процент использования: ${section.eventsPath}%`}</p>
                        <p>{`Используемое время: ${section.eventsTime}`}</p> {/* Replace 'otherField' with actual field names */}
                        <p>{`Количество событий: ${section.eventsCount}`}</p> {/* Replace 'otherField' with actual field names */}
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

const CustomColorBarChart: React.FC<IProps> = ({ data }) => {
    const [chartData, setChartData] = useState<IChartData[]>([]);

    useEffect(() => {
        const transformedData: IChartData[] = data.map(group => {
            const averagePercante: number = group.sections.reduce((acc, section) => acc + section.eventsPath, 0) / group.sections.length;
            return {
                title: group.title,
                percante: averagePercante,
                color: group.color,
                sections: group.sections
            };
        });
        setChartData(transformedData);
    }, [data]);

    return (
        <BarChart width={790} height={600} data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="title" type="category" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="percante" fill="#8884d8">
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Bar>
        </BarChart>
    );
};

export default CustomColorBarChart;
