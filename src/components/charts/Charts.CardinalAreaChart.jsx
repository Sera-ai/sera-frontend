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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const cardinal = curveCardinal.tension(0.5);

export default class CardinalAreaChart extends PureComponent {
  state = {
    uvOpacity: 1,
    pvOpacity: 1,
  };

  handleLegendClick = (dataKey) => {
    this.setState((prevState) => ({
      [`${dataKey}Opacity`]: prevState[`${dataKey}Opacity`] === 1 ? 0.0 : 1,
    }));
  };

  render() {
    const { uvOpacity, pvOpacity } = this.state;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8884d800" stopOpacity={1} />
              <stop offset="80%" stopColor="#8884d820" stopOpacity={1} />
              <stop offset="100%" stopColor="#8884d800" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#82ca9d00" stopOpacity={1} />
              <stop offset="80%" stopColor="#82ca9d20" stopOpacity={1} />
              <stop offset="100%" stopColor="#8884d800" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            vertical={false}
            strokeOpacity={0.1}
          />
          <XAxis
            height={1}
            tick={{ dy: -30 }}
            padding={{ right: -50, left:20 }}
            axisLine={false}
            tickLine={false}
            dataKey="name"
            fontSize={12}
          />
          <YAxis
            width={1}
            tick={{ dx: 50 }}
            axisLine={false}
            tickLine={false}
            fontSize={12}
          />
          <Tooltip />
          <Area
            type={cardinal}
            dataKey="uv"
            stroke="#8884d8"
            strokeWidth={2}
            fill="url(#colorUv)"
            strokeOpacity={uvOpacity}
            fillOpacity={uvOpacity}
          />
          <Area
            type={cardinal}
            dataKey="pv"
            stroke="#82ca9d"
            strokeWidth={2}
            fill="url(#colorPv)"
            strokeOpacity={pvOpacity}
            fillOpacity={pvOpacity}
          />
          <Legend
            align="right"
            verticalAlign="top"
            layout="vertical"
            wrapperStyle={{ cursor: 'pointer' }}
            iconType="line"
            onClick={(e) => this.handleLegendClick(e.dataKey)}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
