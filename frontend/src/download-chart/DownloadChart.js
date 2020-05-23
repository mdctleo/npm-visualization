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
        this.props.getPackageDownload("express", "2017-01-01", "2017-02-01")
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        this.createDownloadChart()
    }
    createDownloadChart() {

        console.log("got to rendered")
        console.log(this.props)
        if (this.props.downloadChart.downloadData.length > 0) {
            console.log("got to rendered with information")
            const node = this.node

            const xScale = d3.scaleTime()
                .domain([new Date(this.props.downloadChart.start), new Date(this.props.downloadChart.end)])
                .range([0, this.width])
            const yScale = d3.scaleLinear()
                .domain([0, this.props.downloadChart.maxDownload])
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
                .x(d => xScale(new Date(d.day)))
                .y(d => yScale(d.downloads))

            let packageGroup = g
                .selectAll(".package")
                .data(this.props.downloadChart.downloadData)
                .enter()
                .append("g")
                .attr("class", "package")

            packageGroup
                .append("path")
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d => line(d.downloads))
        }
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
