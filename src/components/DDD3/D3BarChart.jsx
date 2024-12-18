import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const D3BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Set up the chart dimensions
    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    svg.attr("width", width).attr("height", height);

    // Set up x and y scales
    const x = d3
      .scaleBand()
      .domain(data.map((d, i) => i))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([height - margin.bottom, margin.top]);

    // Create the bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(i))
      .attr("y", (d) => y(d))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d))
      .attr("fill", "steelblue");

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((i) => i));

    // Add y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default D3BarChart;
