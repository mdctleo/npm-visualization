import React from "react";
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {fetchPackageDownload, getPackageDownload} from "./action"
import { compose } from 'redux'
import {selectDownloadChart, selectDownloadData} from "./selectors";

class DownloadChart extends React.Component {

    constructor(props){
        super(props)
        this.createDownloadChart = this.createDownloadChart.bind(this)
        this.width = this.props.width - this.props.margin.left - this.props.margin.right
        this.height = this.props.height - this.props.margin.top - this.props.margin.bottom

    }

    componentDidMount() {
        this.props.getPackageDownload("express", "2016-01-01", "2016-03-01")
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        this.createDownloadChart()
    }
    createDownloadChart() {

        if (this.props.downloadChart.downloadData.length > 0) {
            const node = this.node

            this.xScale = d3.scaleUtc()
                .domain([new Date(this.props.downloadChart.start), new Date(this.props.downloadChart.end)])
                // .domain(d3.extent(this.props.downloadChart.downloadData, d => d.day))
                .range([0, this.width])

            this.yScale = d3.scaleLinear()
                .domain([0, this.props.downloadChart.maxDownload])
                .range([this.height, 0])
                .nice()

            const g = d3.select(node)
                .append("g")
                .attr("transform", "translate(" + this.props.margin.left + "," + this.props.margin.top + ")")

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + this.height + ")")
                .call(d3.axisBottom(this.xScale).ticks(this.width / 80).tickSizeOuter(0))

            // Create Y Axis
            // Add Text label to Y axis
            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(this.yScale))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("fill", "#000")
                .text("Download Counts")

            let line = d3.line()
                .x(d => this.xScale(new Date(d.day)))
                .y(d => this.yScale(d.downloads))

            let packageGroup = g
                .selectAll(".package")
                .data(this.props.downloadChart.downloadData)
                .enter()
                .append("g")
                .attr("class", "package")

            const dot = d3.select(node).append("g")
                .attr("display", "none")

            dot.append("circle")
                .attr("r", 2.5)

            dot.append("text")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "middle")
                .attr("y", -8)

            packageGroup
                .append("path")
                .attr("id", d => d.name)
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d => line(d.downloads))
                .on("mousemove", d => this.moved(d.name, d.downloads, dot))
                .on("mouseenter", d => this.entered(dot, d.name))
                .on("mouseleave", d => this.left(dot, d.name))


        }
    }

    entered(dot, name) {
        // d3.select(`#${name}`).style("mix-blend-mode", null).attr("stroke", "#ddd");
        dot.attr("display", null)
    }

    moved(name, downloads, dot) {
        d3.event.preventDefault()
        const mouse = d3.mouse(this.node)
        const xm = this.xScale.invert(mouse[0])
        const ym = this.yScale.invert(mouse[1])

        const i1 = d3.bisectLeft(downloads, xm, 1)
        const i0 = i1 - 1
        const i = xm - downloads[i0] > downloads[i1] - xm? i1: i0
        const s = d3.min(downloads, d => Math.abs(d.downloads[i] - ym))

        d3.select(`#${name}`).attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
        dot.attr("transform", `translate(${this.xScale(new Date(downloads[i].day))},${this.yScale(downloads[i].downloads)})`)
        dot.select("text").text(name)
    }

    left(dot, name) {
        // d3.select(`#${name}`).style("mix-blend-mode", "multiply").attr("stroke", null);
        dot.attr("display", "none")
    }


    render() {
        return (
            <svg ref={node => this.node = node}
                 width={this.props.width} height={this.props.height}>
            </svg>
        )
    }
};

// const mapStateToProps = state => {
//     return {
//         downloadData: selectDownloadData()
//     }
// }

const mapStateToProps = state => {
    return {
        downloadChart: selectDownloadChart(state),
        downloadData: selectDownloadData(state)
    }
}

// const mapStateToProps = createStructuredSelector({
//     downloadData: selectDownloadData()
// })

const mapDispatchToProps = dispatch => {
    return {
        getPackageDownload: (packageName, start, end) => dispatch(fetchPackageDownload(packageName, start, end))
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default compose(
    withConnect
)(DownloadChart)
