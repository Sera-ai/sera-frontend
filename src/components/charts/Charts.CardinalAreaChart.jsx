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


const cardinal = curveCardinal.tension(1.0);

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

export default class CardinalAreaChart extends PureComponent {

  constructor(props) {
    super(props);
  }

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

    return this.props.data ? (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          width={"100%"}
          height={"100%"}
          data={this.props.data}
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
            width={400}
          />
          <XAxis
            height={1}
            tick={{ dy: -30 }}
            axisLine={false}
            tickLine={false}
            dataKey="name"
            fontSize={12}
          />
          <YAxis
            tickFormatter={(value) => value.toLocaleString()}
            width={1}
            tick={{ dx: 50 }}
            axisLine={false}
            tickLine={false}
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type={cardinal}
            dataKey="error"
            stroke="#f43f5e"
            strokeWidth={2}
            fill="url(#colorerror)"
            strokeOpacity={errorOpacity}
            fillOpacity={errorOpacity}
          />
          <Area
            type={cardinal}
            dataKey="req"
            stroke="#8884d8"
            strokeWidth={2}
            fill="url(#colorreq)"
            strokeOpacity={reqOpacity}
            fillOpacity={reqOpacity}
          />
          <Legend
            wrapperStyle={{ cursor: "pointer", right: 0, top: 30 }}
            iconType="line"
            onClick={(e) => this.handleLegendClick(e.dataKey)}
          />
        </AreaChart>
      </ResponsiveContainer>
    ):<></>;
  }
}
