import React from "react";
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {selectMaxDownload, selectDownloadData, selectStartDate, selectEndDate} from "../inputs/selectors";

class DownloadChart extends React.Component {

    constructor(props){
        super(props)
        this.createDownloadChart = this.createDownloadChart.bind(this)
        this.width = this.props.width - this.props.margin.left - this.props.margin.right
        this.height = this.props.height - this.props.margin.top - this.props.margin.bottom

    }

    componentDidMount() {
        // this.props.getPackageDownload("express,react", "2016-01-01", "2016-03-01")
        this.createDownloadChart()
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        this.createDownloadChart()
    }
    createDownloadChart() {
        console.log(this.props)
        if (this.props.downloadData.length > 0) {
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
                .x(d => this.xScale(d.day))
                .y(d => this.yScale(d.downloads))

            let packageGroup = g
                .selectAll(".package")
                .data(this.props.downloadData)
                .enter()
                .append("g")
                .attr("class", "package")

            packageGroup
                .append("path")
                .attr("id", d => d.package)
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", d => this.colourScale(d.package))
                .attr("stroke-width", 1.5)
                .attr("d", d => line(d.downloads))

            // const focus = d3.select(node).append('g')
            //     .attr('class', 'focus')
            //     .style('display', 'none');
            //
            // focus.append('circle')
            //     .attr('r', 4.5);
            //
            // focus.append('line')
            //     .classed('x', true);
            //
            // focus.append('line')
            //     .classed('y', true);
            //
            // focus.append('text')
            //     .attr('x', 9)
            //     .attr('dy', '.35em');
            //
            // d3.select(node).append('rect')
            //     .attr('class', 'overlay')
            //     .attr('width', this.width)
            //     .attr('height', this.height)
            //     .attr("transform", "translate(" + this.props.margin.left + "," + this.props.margin.top + ")")
            //     .on('mouseover', () => focus.style('display', null))
            //     .on('mouseout', () => focus.style('display', 'none'))
            //     .on('mousemove', () => this.mousemove(focus));
        }
    }

    // mousemove(focus) {
    //     const bisectDate = d3.bisector(d => d.day).left;
    //     const data = this.props.downloadChart.downloadData[0].downloads
    //
    //     const x0 = this.xScale.invert(d3.mouse(this.node)[0]);
    //     const i = bisectDate(data, x0, 1);
    //     const d0 = data[i - 1];
    //     const d1 = data[i];
    //     const d = x0 - d0.day > d1.day - x0 ? d1 : d0;
    //     focus.attr('transform', `translate(${this.props.margin.left + this.xScale(d.day)}, ${this.props.margin.top + this.yScale(d.downloads)})`);
    //     focus.select('line.x')
    //         .attr('x1', 0)
    //         .attr('x2', -this.xScale(d.day))
    //         .attr('y1', 0)
    //         .attr('y2', 0);
    //
    //     focus.select('line.y')
    //         .attr('x1', 0)
    //         .attr('x2', 0)
    //         .attr('y1', 0)
    //         .attr('y2', this.height - this.yScale(d.downloads));
    //
    //     focus.select('text').text(d.downloads);
    // }


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

// const mapDispatchToProps = dispatch => {
//     return {
//         getPackageDownload: (packageName, start, end) => dispatch(fetchPackageDownload(packageName, start, end))
//     }
// }

const withConnect = connect(
    mapStateToProps
)

export default compose(
    withConnect
)(DownloadChart)
