import React from "react";
import * as d3 from 'd3'

class DownloadChart extends React.Component {

    constructor(props){
        super(props)
        this.createDownloadChart = this.createDownloadChart.bind(this)
        this.width = this.props.width - this.props.margin.left - this.props.margin.right
        this.height = this.props.height - this.props.margin.top - this.props.margin.bottom

    }

    componentDidMount() {
        this.createDownloadChart()
    }
    // componentDidUpdate() {
    //     this.createDownloadChart()
    // }

    createDownloadChart() {
        const node = this.node
        
        const xScale = d3.scaleTime()
            .domain([this.props.data.start, this.props.data.end])
            .range([0, this.width])
        const yScale = d3.scaleLinear()
            .domain([0, this.props.data.maxDownload])
            .range([this.height, 0])

        const g = d3.select(node)
            .append("g")
            .attr("transform", "translate(" + this.props.margin.left + "," + this.props.margin.top + ")")

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(xScale))

        // Create Y Axis
        // Add Text label to Y axis
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(yScale))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("fill", "#000")
            .text("Download Counts")

        let line = d3.line()
            .x(d => xScale(d.date) )
            .y(d => yScale(d.value) )

        let packageGroup = g
            .selectAll(".package")
            .data(this.props.data.packages)
            .enter()
            .append("g")
            .attr("class", "package")

        packageGroup
            .append("path")
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d => line(d.values))
    }

    render() {
        return (
            <svg ref={node => this.node = node}
                 width={this.props.width} height={this.props.height}>
            </svg>
        )
    }
};

export default DownloadChart
