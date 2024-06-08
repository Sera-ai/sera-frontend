import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { curveCardinal } from "d3-shape";

function generateRandomDataPoints() {
  const dataPoints = [];
  const now = Date.now();
  const twelveHoursAgo = now - (12 * 60 * 60 * 1000);

  for (let i = 0; i < 100; i++) {
    const timestamp = new Date(twelveHoursAgo + Math.random() * (now - twelveHoursAgo)).toISOString();
    const req = Math.floor(Math.random() * 20000) + 1; // Random request count between 1 and 20000
    const error = Math.floor(Math.random() * 1000) + 1; // Random error count between 1 and 1000

    dataPoints.push({
      name: timestamp,
      req: req,
      error: error,
    });
  }

  return dataPoints;
}

const data = generateRandomDataPoints();
console.log(data);

const cardinal = curveCardinal.tension(0.5);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const tooltipData = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "10px",
          borderRadius: "5px",
          color: "#fff",
          minWidth: "300px",
        }}
      >
        <p
          style={{
            margin: 0,
            paddingBottom: "5px",
            fontSize: 12,
            fontWeight: "bolder",
          }}
        >{`${label}`}</p>

        <p style={{ margin: 0, paddingBottom: "5px", fontSize: 12 }}>
          Requests: {`${tooltipData.req.toLocaleString()}`}
        </p>
        <p style={{ margin: 0, paddingBottom: "5px", fontSize: 12 }}>
          Errors: {`${tooltipData.error.toLocaleString()}`}
        </p>
      </div>
    );
  }
};

export default class CardinalAreaChartLarge extends PureComponent {
  state = {
    errorOpacity: 1,
    reqOpacity: 1,
  };

  handleLegendClick = (dataKey) => {
    this.setState((prevState) => ({
      [`${dataKey}Opacity`]: prevState[`${dataKey}Opacity`] === 1 ? 0.0 : 1,
    }));
  };

  render() {
    const { errorOpacity, reqOpacity } = this.state;

    return (
      <ResponsiveContainer width="100%" height={"100%"}>
        <AreaChart
          width={"100%"}
          height={"100%"}
          data={data}
          margin={{
            top: 50,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorerror" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f43f5e00" stopOpacity={1} />
              <stop offset="80%" stopColor="#f43f5e20" stopOpacity={1} />
              <stop offset="100%" stopColor="#f43f5e00" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="colorreq" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8884d800" stopOpacity={1} />
              <stop offset="80%" stopColor="#8884d820" stopOpacity={1} />
              <stop offset="100%" stopColor="#8884d800" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            vertical={false}
            strokeOpacity={0.1}
            width={"100%"}
          />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="name"
            fontSize={12}
            interval="preserveStartEnd"
            tick={{ dy: 10 }}
            ticks={data.map((d, i) => i % Math.floor(data.length / 12) === 0 ? d.name : null).filter(Boolean)}
            tickFormatter={(timestamp) => {
              const date = new Date(timestamp);
              return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
            }}
          />
          <YAxis
            tickFormatter={(value) => value.toLocaleString()}
            axisLine={false}
            tickLine={false}
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type={"linear"}
            dataKey="error"
            stroke="#f43f5e"
            strokeWidth={2}
            fill="url(#colorerror)"
            strokeOpacity={errorOpacity}
            fillOpacity={errorOpacity}
          />
          <Area
            type={"linear"}
            dataKey="req"
            stroke="#8884d8"
            strokeWidth={2}
            fill="url(#colorreq)"
            strokeOpacity={reqOpacity}
            fillOpacity={reqOpacity}
          />
          <Legend
            wrapperStyle={{ cursor: "pointer", right: 0, top: 0 }}
            iconType="line"
            onClick={(e) => this.handleLegendClick(e.dataKey)}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
