import React, { useState, useEffect, useRef } from "react";
import { Sankey, Tooltip, ResponsiveContainer } from "recharts";

const colors = [
  "#1794ff", // Dark grey-blue
  "#7452ab", // Purple
  "#6876e0", // Light blue
  "#7c81a1", // Grey-blue
  "#505995", // Indigo
  "#114d7b", // Dark blue
  "#ff6f61", // Complementary warm red
  "#00ff7f", // Analogous spring green
  "#5f9ea0", // Analogous cadet blue
  "#4682b4", // Analogous steel blue
];

const getNodeColor = (index) => colors[index % colors.length];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
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
        >{`${payload[0].name}`}</p>
      </div>
    );
  }
  return null;
};

const MyCustomNode = ({
  x,
  y,
  width,
  height,
  index,
  payload,
  containerWidth,
}) => {
  const isFarRightNode = x + width >= containerWidth - 20; // Adjust to ensure the label fits within the container
  const isFarLeftNode = x + width <= 20; // Adjust to ensure the label fits within the container
  const textAnchor = isFarRightNode ? "end" : isFarLeftNode ? "start" : "end";
  const textX = isFarRightNode
    ? x - 10
    : isFarLeftNode
      ? x + width + 10
      : x - 10;
  const nodeColor = getNodeColor(index);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={nodeColor}
        strokeWidth={2}
      />
      <text
        x={textX}
        y={y + height / 2}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fill="#fff"
        fontSize={12}
      >
        {payload.name}
      </text>
    </g>
  );
};

const MyCustomLink = ({
  sourceX,
  targetX,
  sourceY,
  targetY,
  sourceControlX,
  targetControlX,
  linkWidth,
  payload,
}) => {
  const { source, target } = payload;
  const gradientId = `gradient-${source.index}-${target.index}`;
  console.log("sourceX", sourceX)
  return (
    <g>
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={sourceX}
          y1={sourceY}
          x2={targetX}
          y2={targetY}
        >
          <stop offset="0%" stopColor={getNodeColor(source.index)} />
          <stop offset="100%" stopColor={getNodeColor(target.index)} />
        </linearGradient>
      </defs>
      <path
        d={`M${sourceX},${sourceY} C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
        stroke={`url(#${gradientId})`}
        strokeWidth={linkWidth}
        fill="none"
        opacity="0.3"
      />
    </g>
  );
};

const SankeyComponent = ({ chartData, parentSize }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);
  const [key, setKey] = useState(0); // State to force re-render

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };
    setKey((prevKey) => prevKey + 1);
    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, [parentSize]);

  return (
    <div
      key={key}
      ref={containerRef}
      style={{ width: "100%", height: "100%", zIndex: 20 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        {chartData && (
          <Sankey
            data={chartData}
            nodePadding={containerHeight < 700 ? 5 : 10}
            nodeWidth={4}
            iterations={1}
            linkCurvature={0.4}
            nameKey="name"
            sort
            node={(props) => (
              <MyCustomNode {...props} containerWidth={containerWidth} />
            )}
            link={(props) => {console.log("props",props), <MyCustomLink {...props} />}}
          >
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "#00000020" }}
            />
          </Sankey>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default SankeyComponent;
