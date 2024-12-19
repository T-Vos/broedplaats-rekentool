'use client';

import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';

const HistogramWithDistribution = ({ data, binCount = 10 }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy previous chart if it exists
    }

    // Calculate histogram bins using D3
    const histogram = d3.bin().domain(d3.extent(data)).thresholds(binCount)(
      data,
    );

    const binCenters = histogram.map((bin) => (bin.x0 + bin.x1) / 2);
    const binHeights = histogram.map((bin) => bin.length);

    // Fit a normal distribution to the data
    const mean = d3.mean(data);
    const stdDev = d3.deviation(data);

    const normalDist = binCenters.map(
      (x) =>
        (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
        Math.exp(-((x - mean) ** 2) / (2 * stdDev ** 2)),
    );

    // Normalize the distribution to match the histogram scale
    const maxBinHeight = d3.max(binHeights);
    const normalizedDist = normalDist.map(
      (value) => (value / d3.max(normalDist)) * maxBinHeight,
    );

    // Create the chart
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: binCenters,
        datasets: [
          {
            label: 'Histogram',
            data: binHeights,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Estimated Distribution',
            data: normalizedDist,
            type: 'line',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false,
            pointRadius: 0, // Hide points
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: { display: true, text: 'Bins' },
          },
          y: {
            title: { display: true, text: 'Frequency' },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, binCount]);

  return <canvas ref={chartRef} />;
};

export default HistogramWithDistribution;
