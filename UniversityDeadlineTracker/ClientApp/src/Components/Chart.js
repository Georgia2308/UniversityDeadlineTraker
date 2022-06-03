import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Chart = (props) => {
    const getLines = () => {
        let colors = [
            "#6be1ff",
            "#b56bff",
            "#6b70ff",
            "#ff78a0",
            "#ff78a0",
            "#ffe98a",
            "#ffbd91",
        ];
        return props.lines.map((subject) => (
            <Line
                connectNulls
                type="monotone"
                dataKey={subject}
                stroke={colors[props.lines.indexOf(subject)]}
            />
        ));
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={props.data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[4, 11]} tickCount={8} />
                <Tooltip />
                <Legend />
                {getLines()}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
