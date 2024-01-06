import React, { useRef, useEffect, useState, useCallback } from "react";
import { useThemeProvider } from "../utils/ThemeContext";
import { chartColors } from "./Charts.ChartjsConfig";
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-moment";
import { formatValue } from "../utils/Utils";

// Register Chart.js components globally if not already registered
if (Chart.getChart("RoundedBarElement") === undefined) {
  Chart.register(
    BarController,
    BarElement,
    LinearScale,
    TimeScale,
    Tooltip,
    Legend
  );
}

class RoundedBarElement extends BarElement {
  draw(ctx) {
    const { x, y, base, width, options } = this.getProps([
      "x",
      "y",
      "base",
      "width",
      "options",
    ]);
    const borderRadius = options.borderRadius || 0;

    ctx.save();

    const halfWidth = width / 2;
    ctx.fillStyle = options.backgroundColor;
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;

    // Draw the bar
    ctx.beginPath();
    ctx.moveTo(x - halfWidth, y); // Top left

    // Top line
    ctx.lineTo(x + halfWidth, y); // Top right

    // Right line
    ctx.lineTo(x + halfWidth, base - borderRadius); // Bottom right - start radius

    // Bottom right radius
    if (borderRadius > 0) {
      ctx.quadraticCurveTo(
        x + halfWidth,
        base,
        x + halfWidth - borderRadius,
        base
      );
    }

    // Bottom line
    ctx.lineTo(x - halfWidth + borderRadius, base); // Bottom left + radius

    // Bottom left radius
    if (borderRadius > 0) {
      ctx.quadraticCurveTo(
        x - halfWidth,
        base,
        x - halfWidth,
        base - borderRadius
      );
    }

    // Left line
    ctx.lineTo(x - halfWidth, y); // Close path

    // Draw the bar
    ctx.fill();
    if (options.borderWidth) {
      ctx.stroke();
    }

    ctx.restore();
  }
}

// Register the custom bar element
Chart.register(RoundedBarElement);

function BarChartStacked({ data, width = "100%", height }) {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";

  const {
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
  } = chartColors;

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const newChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        elements: {
          bar: {
            borderRadius: 5, // Set the desired bottom radius here
          },
        },
        layout: {
          padding: {
            top: 12,
            left: 0,
          },
        },
        scales: {
          y: { display: true, stacked: true },
          x: {
            stacked: true,
            type: "time",
            time: {
              parser: "HH:mm", // Parsing hours and minutes
              unit: "hour", // Setting the unit to hours
              displayFormats: {
                hour: "HH:mm", // Displaying hours and minutes
              },
            },
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 4,
              maxRotation: 0,
              color: darkMode ? textColor.dark : textColor.light,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => formatValue(context.parsed.y),
            },
            bodyColor: darkMode
              ? tooltipBodyColor.dark
              : tooltipBodyColor.light,
            backgroundColor: darkMode
              ? tooltipBgColor.dark
              : tooltipBgColor.light,
            borderColor: darkMode
              ? tooltipBorderColor.dark
              : tooltipBorderColor.light,
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        animation: {
          duration: 200,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    setChart(newChart);
    return () => newChart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chart) return;

    chart.options.scales.x.ticks.color = textColor.dark;
    chart.options.scales.y.ticks.color = textColor.dark;
    chart.options.scales.y.grid.color = gridColor.dark;
    chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
    chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
    chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;

    chart.update("none");
  }, [currentTheme]);

  return <canvas ref={canvas} width={width} height={height}></canvas>;
}

export default BarChartStacked;
