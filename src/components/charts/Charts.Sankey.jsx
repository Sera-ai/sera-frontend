import React, { useState, useEffect, useRef } from "react";
import { Sankey, Tooltip, ResponsiveContainer } from "recharts";

const data = {
  nodes: [
    { name: "192.168.0.14", index: 0 },
    { name: "203.0.113.45", index: 1 },
    { name: "10.0.0.23", index: 2 },
    { name: "198.51.100.78", index: 3 },
    { name: "192.168.1.56", index: 4 },
    { name: "203.0.113.89", index: 5 },
    { name: "10.0.1.12", index: 6 },
    { name: "198.51.100.45", index: 7 },
    { name: "192.168.2.33", index: 8 },
    { name: "203.0.113.123", index: 9 },
    { name: "10.0.2.44", index: 10 },
    { name: "198.51.100.67", index: 11 },
    { name: "192.168.3.14", index: 12 },
    { name: "203.0.113.99", index: 13 },
    { name: "10.0.3.89", index: 14 },
    { name: "198.51.100.101", index: 15 },
    { name: "192.168.4.78", index: 16 },
    { name: "203.0.113.45", index: 17 },
    { name: "10.0.4.22", index: 18 },
    { name: "198.51.100.154", index: 19 },
    { name: "192.168.5.12", index: 20 },
    { name: "203.0.113.67", index: 21 },
    { name: "10.0.5.44", index: 22 },
    { name: "198.51.100.78", index: 23 },
    { name: "192.168.6.56", index: 24 },
    { name: "203.0.113.89", index: 25 },
    { name: "10.0.6.88", index: 26 },
    { name: "198.51.100.199", index: 27 },
    { name: "192.168.7.12", index: 28 },
    { name: "203.0.113.123", index: 29 },
    { name: "10.0.7.34", index: 30 },
    { name: "198.51.100.201", index: 31 },
    { name: "192.168.8.14", index: 32 },
    { name: "203.0.113.99", index: 33 },
    { name: "10.0.8.56", index: 34 },
    { name: "198.51.100.54", index: 35 },
    { name: "192.168.9.78", index: 36 },
    { name: "203.0.113.45", index: 37 },
    { name: "10.0.9.89", index: 38 },
    { name: "198.51.100.101", index: 39 },
    { name: "192.168.10.22", index: 40 },
    { name: "203.0.113.67", index: 41 },
    { name: "10.0.10.12", index: 42 },
    { name: "198.51.100.199", index: 43 },
    { name: "192.168.11.56", index: 44 },
    { name: "203.0.113.89", index: 45 },
    { name: "10.0.11.22", index: 46 },
    { name: "198.51.100.154", index: 47 },
    { name: "192.168.12.89", index: 48 },
    { name: "203.0.113.123", index: 49 },
    { name: "API - JSON", index: 50 },
    { name: "API - HTML", index: 51 },
    { name: "API - XML", index: 52 },
    { name: "WebSockets", index: 53 },
    { name: "api.example.com", index: 54 },
    { name: "manage.example.com", index: 55 },
    { name: "db1.example.com", index: 56 },
    { name: "db2.example.com", index: 57 },
    { name: "/users", index: 58 },
    { name: "/orders", index: 59 },
    { name: "/products", index: 60 },
    { name: "/categories", index: 61 },
    { name: "/inventory", index: 62 },
    { name: "/reviews", index: 63 },
    { name: "/cart", index: 64 },
    { name: "/checkout", index: 65 },
    { name: "/shipping", index: 66 },
    { name: "/billing", index: 67 },
    { name: "/profile", index: 68 },
    { name: "/support", index: 69 },
    { name: "/user/id", index: 70 },
    { name: "/logout", index: 71 },
    { name: "/upload", index: 72 },
    { name: "/get/trx", index: 73 },
    { name: "GET", index: 74 },
    { name: "POST", index: 75 },
    { name: "DELETE", index: 76 },
    { name: "PUT", index: 77 },
    { name: "PATCH", index: 78 },
  ],
  links: [
    { source: 0, target: 50, value: 10000 },
    { source: 1, target: 50, value: 10000 },
    { source: 2, target: 50, value: 10000 },
    { source: 3, target: 50, value: 10000 },
    { source: 4, target: 50, value: 10000 },
    { source: 5, target: 50, value: 10000 },
    { source: 6, target: 50, value: 10000 },
    { source: 7, target: 50, value: 10000 },
    { source: 8, target: 50, value: 10000 },
    { source: 9, target: 50, value: 10000 },
    { source: 10, target: 50, value: 10000 },
    { source: 11, target: 50, value: 10000 },
    { source: 12, target: 50, value: 10000 },
    { source: 13, target: 50, value: 10000 },
    { source: 14, target: 50, value: 10000 },
    { source: 15, target: 50, value: 10000 },
    { source: 16, target: 50, value: 10000 },
    { source: 17, target: 50, value: 10000 },
    { source: 18, target: 50, value: 10000 },
    { source: 19, target: 50, value: 10000 },
    { source: 20, target: 50, value: 10000 },
    { source: 21, target: 50, value: 10000 },
    { source: 22, target: 50, value: 10000 },
    { source: 23, target: 50, value: 10000 },
    { source: 24, target: 50, value: 10000 },
    { source: 25, target: 50, value: 10000 },
    { source: 26, target: 50, value: 10000 },
    { source: 27, target: 50, value: 10000 },
    { source: 28, target: 50, value: 10000 },
    { source: 29, target: 50, value: 10000 },
    { source: 30, target: 50, value: 10000 },
    { source: 31, target: 50, value: 10000 },
    { source: 32, target: 50, value: 10000 },
    { source: 33, target: 50, value: 10000 },
    { source: 34, target: 50, value: 10000 },
    { source: 35, target: 50, value: 10000 },
    { source: 36, target: 50, value: 10000 },
    { source: 37, target: 50, value: 10000 },
    { source: 38, target: 50, value: 10000 },
    { source: 39, target: 50, value: 10000 },
    { source: 40, target: 50, value: 10000 },
    { source: 41, target: 50, value: 10000 },
    { source: 42, target: 50, value: 10000 },
    { source: 43, target: 50, value: 10000 },
    { source: 44, target: 50, value: 10000 },
    { source: 45, target: 50, value: 10000 },
    { source: 46, target: 51, value: 10000 },
    { source: 47, target: 52, value: 10000 },
    { source: 48, target: 53, value: 10000 },
    { source: 49, target: 50, value: 10000 },
    // API - JSON to Hosts
    { source: 50, target: 54, value: 450000 }, // API - JSON -> api.example.com
    { source: 50, target: 55, value: 270000 }, // API - JSON -> manage.example.com
    { source: 50, target: 56, value: 150000 }, // API - JSON -> db1.example.com
    { source: 50, target: 57, value: 100000 }, // API - JSON -> db2.example.com

    // API - HTML to Hosts
    { source: 51, target: 54, value: 20000 }, // API - HTML -> api.example.com
    { source: 51, target: 55, value: 15000 }, // API - HTML -> manage.example.com
    { source: 51, target: 56, value: 40000 }, // API - HTML -> db1.example.com
    { source: 51, target: 57, value: 5000 }, // API - HTML -> db2.example.com

    // API - XML to Hosts
    { source: 52, target: 54, value: 10000 }, // API - XML -> api.example.com
    { source: 52, target: 55, value: 7000 }, // API - XML -> manage.example.com
    { source: 52, target: 56, value: 5000 }, // API - XML -> db1.example.com
    { source: 52, target: 57, value: 3000 }, // API - XML -> db2.example.com

    // WebSockets to Hosts
    { source: 53, target: 54, value: 10000 }, // WebSockets -> api.example.com
    { source: 53, target: 55, value: 7000 }, // WebSockets -> manage.example.com
    { source: 53, target: 56, value: 5000 }, // WebSockets -> db1.example.com
    { source: 53, target: 57, value: 3000 }, // WebSockets -> db2.example.com

    // Hosts to Unique Endpoints
    { source: 54, target: 58, value: 120000 }, // api.example.com -> /users
    { source: 54, target: 59, value: 120000 }, // api.example.com -> /orders
    { source: 54, target: 60, value: 120000 }, // api.example.com -> /products
    { source: 54, target: 61, value: 130000 }, // api.example.com -> /categories

    { source: 55, target: 62, value: 15000 }, // manage.example.com -> /inventory
    { source: 55, target: 63, value: 75000 }, // manage.example.com -> /reviews
    { source: 55, target: 64, value: 75000 }, // manage.example.com -> /cart
    { source: 55, target: 65, value: 75000 }, // manage.example.com -> /checkout

    { source: 56, target: 66, value: 50000 }, // db1.example.com -> /shipping
    { source: 56, target: 67, value: 50000 }, // db1.example.com -> /billing
    { source: 56, target: 68, value: 50000 }, // db1.example.com -> /profile
    { source: 56, target: 69, value: 50000 }, // db1.example.com -> /support

    { source: 57, target: 70, value: 30000 }, // db2.example.com -> /user/id
    { source: 57, target: 71, value: 30000 }, // db2.example.com -> /logout
    { source: 57, target: 72, value: 20000 }, // db2.example.com -> /upload
    { source: 57, target: 73, value: 20000 }, // db2.example.com -> /get/trx

    // Endpoints to Methods
    { source: 58, target: 74, value: 115000 }, // /users -> GET
    { source: 58, target: 75, value: 60000 }, // /users -> POST
    { source: 59, target: 76, value: 60000 }, // /orders -> DELETE
    { source: 59, target: 77, value: 60000 }, // /orders -> PUT
    { source: 60, target: 74, value: 60000 }, // /products -> GET
    { source: 60, target: 78, value: 60000 }, // /products -> PATCH
    { source: 61, target: 76, value: 50000 }, // /categories -> DELETE
    { source: 61, target: 78, value: 50000 }, // /categories -> PATCH
    { source: 62, target: 74, value: 15000 }, // /inventory -> GET
    { source: 63, target: 74, value: 75000 }, // /reviews -> GET
    { source: 64, target: 75, value: 75000 }, // /cart -> POST
    { source: 65, target: 77, value: 75000 }, // /checkout -> PUT
    { source: 66, target: 74, value: 50000 }, // /shipping -> GET
    { source: 67, target: 75, value: 50000 }, // /billing -> POST
    { source: 68, target: 76, value: 50000 }, // /profile -> DELETE
    { source: 69, target: 77, value: 50000 }, // /support -> PUT
    { source: 70, target: 74, value: 30000 }, // /user/id -> GET
    { source: 71, target: 75, value: 30000 }, // /logout -> POST
    { source: 72, target: 76, value: 20000 }, // /upload -> DELETE
    { source: 73, target: 77, value: 20000 }, // /get/trx -> PUT
  ],
};

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

const SankeyComponent = ({ chartData }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  return (
    <div
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
            link={(props) => <MyCustomLink {...props} />}
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
