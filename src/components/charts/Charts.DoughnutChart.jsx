import React, { useRef, useEffect, useState } from "react";
import { useThemeProvider } from "../../utils/ThemeContext";

import { chartColors } from "./Charts.ChartjsConfig";
import {
  Chart,
  DoughnutController,
  ArcElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);


const centerLabelPlugin = {
  id: 'centerLabel',
  afterDraw(chart) {
    const ctx = chart.ctx;
    ctx.save();

    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2 + 30;
    ctx.font = '34px Arial'; // Customize font size and style as needed
    ctx.fillStyle = 'white'; // Customize text color as needed
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('14.6k', centerX, centerY); // Replace 'Your Label' with your desired text

    ctx.restore();
  }
};

function DoughnutChart({ data, width, height }) {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const legend = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const {
    tooltipTitleColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
  } = chartColors;

  let chartInstance = null;

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    chartInstance = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        rotation: -90, // Start angle: -180 degrees
        circumference: 180, // Total angle: 180 degrees, making it a half circle
        cutout: "80%",
        layout: {
          padding: 24,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleColor: darkMode
              ? tooltipTitleColor.dark
              : tooltipTitleColor.light,
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
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [
        {
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            const ul = legend.current;
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            // Reuse the built-in legendItems generator
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item) => {
              const li = document.createElement("li");
              li.style.margin = tailwindConfig().theme.margin[1];
              // Button element
              const button = document.createElement("button");
              button.classList.add(
                "btn-xs",
                "mainDark",
                "text-slate-500",
                "dark:text-slate-400",
                "border",
                "border-slate-200",
                "dark:border-slate-700",
                "shadow-md"
              );
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                c.toggleDataVisibility(item.index);
                c.update();
              };
              // Color box
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[2];
              box.style.height = tailwindConfig().theme.height[2];
              box.style.backgroundColor = item.fillStyle;
              box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
              box.style.marginRight = tailwindConfig().theme.margin[1];
              box.style.pointerEvents = "none";
              // Label
              const label = document.createElement("span");
              label.style.display = "flex";
              label.style.alignItems = "center";
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          },
        },centerLabelPlugin
      ],
    });

    setChart(chartInstance);
    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Cleanup the chart instance on unmount
      }
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chart) return;

    if (darkMode) {
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
    } else {
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update("none");
  }, [currentTheme]);

  return (
    <div className="grow flex flex-col justify-center">
      <div>
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
      <div className="px-5 pt-2 pb-6">
        <ul
          ref={legend}
          className="flex flex-wrap flex-row justify-center -m-1"
        ></ul>
      </div>
    </div>
  );
}

export default DoughnutChart;
