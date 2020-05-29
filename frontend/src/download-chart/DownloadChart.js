import React from "react";
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {selectMaxDownload, selectDownloadData, selectStartDate, selectEndDate} from "../inputs/selectors";

class DownloadChart extends React.Component {

    constructor(props){
        super(props)
        this.createDownloadChart = this.createDownloadChart.bind(this)
        this.updateDownloadChart = this.updateDownloadChart.bind(this)
        this.drawDownloadChart = this.drawDownloadChart.bind(this)
        this.width = this.props.width - this.props.margin.left - this.props.margin.right
        this.height = this.props.height - this.props.margin.top - this.props.margin.bottom

    }

    componentDidMount() {
        this.createDownloadChart()
    }

    // componentWillUpdate(prevProps, prevState, snapShot) {
    //     this.updateDownloadChart()
    // }

    componentDidUpdate(prevProps, prevState, snapShot) {
        this.updateDownloadChart()
    }

    updateDownloadChart() {
        this.xScale = d3.scaleUtc()
            .domain([new Date(this.props.start), new Date(this.props.end)])
            // .domain(d3.extent(this.props.downloadChart.downloadData, d => d.day))
            .range([0, this.width])

        this.yScale = d3.scaleLinear()
            .domain([0, this.props.maxDownload])
            .range([this.height, 0])
            .nice()

        this.colourScale = d3.scaleOrdinal()
            .domain(this.props.downloadData.map((d) => d.package))
            .range(d3.schemeTableau10)

        this.line = d3.line()
            .x(d => this.xScale(d.day))
            .y(d => this.yScale(d.downloads))

        this.drawDownloadChart()

    }

    drawDownloadChart() {
        console.log(this.props.downloadData)

        this.xAxisG.call(d3.axisBottom(this.xScale).ticks(this.width / 80).tickSizeOuter(0))
        this.yAxisG.call(d3.axisLeft(this.yScale))

        this.yAxisLabel
            .style({'display': "block"})

        let packageGroup = this.g
            .selectAll(".package path")
            .data(this.props.downloadData, d => d.package)

        let packageGroupEnter = packageGroup
            .enter()
            .append("g")
            .attr("class", "package")
            .append("path")
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke-width", 1.5)

        packageGroupEnter
            .merge(packageGroup)
            .attr("id", d => d.package)
            .attr("stroke", d => this.colourScale(d.package))
            .attr("d", d => this.line(d.downloads))

        packageGroup.exit().remove()

    }

    createDownloadChart() {
            const node = this.node

            this.xScale = d3.scaleUtc()
                .domain([new Date(this.props.start), new Date(this.props.end)])
                // .domain(d3.extent(this.props.downloadChart.downloadData, d => d.day))
                .range([0, this.width])

            this.yScale = d3.scaleLinear()
                .domain([0, this.props.maxDownload])
                .range([this.height, 0])
                .nice()

            this.colourScale = d3.scaleOrdinal()
                .domain(this.props.downloadData.map((d) => d.package))
                .range(d3.schemeTableau10)

            this.line = d3.line()
                .x(d => this.xScale(d.day))
                .y(d => this.yScale(d.downloads))

            this.g = d3.select(node)
                .append("g")
                .attr("transform", "translate(" + this.props.margin.left + "," + this.props.margin.top + ")")

            this.xAxisG = this.g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + this.height + ")")

            this.yAxisG = this.g.append("g")
                .attr("class", "axis axis--y")

            this.yAxisLabel = this.yAxisG
                .append("text")
                .attr("class", "axis axis--y text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("fill", "#000")
                .text("Download Counts")
    }

    render() {
        return (
            <svg ref={node => this.node = node}
                 width={this.props.width} height={this.props.height}>
            </svg>
        )
    }
};


const mapStateToProps = state => {
    return {
        downloadData: selectDownloadData(state),
        start: selectStartDate(state),
        end: selectEndDate(state),
        maxDownload: selectMaxDownload(state)
    }
}

const withConnect = connect(
    mapStateToProps
)

export default compose(
    withConnect
)(DownloadChart)
