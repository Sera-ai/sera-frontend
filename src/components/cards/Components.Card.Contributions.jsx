import React from "react";
import ReactApexChart from "react-apexcharts";

const GitHubContributionsGraph = () => {

  const options = {
    chart: {
      type: "heatmap",
      background: "transparent", // Set background to transparent
      height: "100%",
      width: "100%"
    },
    states: {
      hover: {
        filter: {
          type: "none", // Disables any hover effects
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 5,
      colors: ["#191A21"],
    },
    legend: {
      show: true, // Set to true to show the legend (it's true by default)
      position: "top", // Position of the legend, can be 'top', 'bottom', 'left', 'right'
      horizontalAlign: "left", // Aligns the legend horizontally, can be 'left', 'center', 'right'
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      fontColor: "#fff",
      markers: {
        width: 40,
        height: 15,
        strokeWidth: 0, // Width of the border around the markers
        strokeColor: "#fff", // Color of the border around the markers
        fillColors: undefined, // Array of colors for the markers, if undefined, uses the colors defined in series or color options
        radius: 2, // Radius of the markers (set to 0 for square markers)
        customHTML: undefined, // Allows custom HTML to be used to create markers
        onClick: undefined, // Allows a click handler to be added to markers
        offsetX: 0,
        offsetY: 0,
      },
    },
    plotOptions: {
      heatmap: {
        radius: 10,
        enableShades: false,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 2,
              color: "#19261e",
            },
            {
              from: 3,
              to: 4,
              color: "#1f5129",
            },
            {
              from: 5,
              to: 6,
              color: "#226e30",
            },
            {
              from: 7,
              to: 8,
              color: "#268b37",
            },
            {
              from: 9,
              to: 10,
              color: "#2ec446",
            },
          ],
        },
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Day 1",
        "Day 2",
        "Day 3",
        "Day 4",
        "Day 5",
        "Day 6",
        "Day 7",
        "Day 8",
        "Day 9",
        "Day 10",
      ],
      axisTicks: {
        show: false, // Hide the axis ticks
      },
      axisBorder: {
        show: false, // Hide the axis border
      },
      grid: {
        show: false, // Hide the grid lines
      },
      // ..
    },
    yaxis: {
      show: false, // Hides y-axis labels
    },
    grid: {
      show: false,
    },
    // ... more configuration options as needed
  };

  return (
    <div className="col-span-1 row-span-1 md:col-span-1 sm:col-span-3 xs:col-span-3 dash-card p-4 flex flex-col">
        <div className="flex p-2 flex-grow">
        <div className="flex flex-col">
          <span className="pr-2">Request Health</span>
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={groupedData}
        type="heatmap"
      />
    </div>
  );
};

const generateContributionData = () => {
    let contributions = [];
    let currentDate = new Date();
  
    for (let i = 0; i < 50; i++) {
      let date = new Date(currentDate);
      date.setDate(date.getDate() - i);
  
      contributions.unshift({
        x: `Day ${(i % 10) + 1}`, // Grouping into 10 days per row
        y: Math.floor(Math.random() * 10), // Random contribution count
      });
    }
  
    return contributions;
  };
  
  const groupContributions = (contributions) => {
    let grouped = [];
  
    // Group data into rows of 10
    for (let i = 0; i < contributions.length; i += 10) {
      grouped.push({
        name: `Group ${Math.floor(i / 10) + 1}`,
        data: contributions.slice(i, i + 10),
      });
    }
  
    return grouped;
  };
  
  const contributionsData = generateContributionData();
  const groupedData = groupContributions(contributionsData);
  

export default GitHubContributionsGraph;
