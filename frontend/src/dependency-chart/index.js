import React from "react";
import * as d3 from 'd3'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {selectDependencyData} from "../dependency-controls/selector";

class DependencyChart extends React.Component {

    constructor(props){
        super(props)
        this.createChart = this.createChart.bind(this)
        this.updateChart = this.updateChart.bind(this)
        this.drawChart = this.drawChart.bind(this)
        this.width = this.props.width - this.props.margin.left - this.props.margin.right
        this.height = this.props.height - this.props.margin.top - this.props.margin.bottom

    }

    componentDidMount() {
        this.createChart()
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        this.updateChart()
        this.createChart()
    }

    updateChart() {

    }

    drawChart() {

    }

    createChart() {
        const root = d3.hierarchy(this.props.data)
        const links = root.links()
        const nodes = root.descendants()

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(300).strength(0))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("x", d3.forceX())
            .force("y", d3.forceY())

        const g = d3.select(this.node)
            .attr("viewBox", [-this.width / 2, -this.height / 2, this.width, this.height]);


        // const link = g.append("g")
        //     .attr("stroke", "#999")
        //     .attr("stroke-opacity", 0.8)
        //     .selectAll("line")
        //     .data(links)
        //     .join("line");

        // const node = g.append("g")
        //     .attr("fill", "#fff")
        //     .attr("stroke", "#000")
        //     .attr("stroke-width", 1.5)
        //     .selectAll("circle")
        //     .data(nodes)
        //     .join("circle")
        //     // .attr("fill", d => d.children ? null : "#000")
        //     // .attr("stroke", d => d.children ? #fff : "#fff")
        //     .attr("r", 3)
            // .call(drag(simulation));
        const link = g.selectAll(".link")
            .data(links)

        const linkEnter = link.enter()
            .append("line")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.8)

        const node = g.selectAll(".node")
            .data(nodes)

        const nodeEnter = node
            .enter()
            .append("g")
            // .append("circle")
            // .attr("class", "node")
            // .attr("fill", "#ffffff")
            // .attr("stroke", "#000000")
            // .attr("r", 10)

        const nodeEnterCircle = nodeEnter
            .append("circle")
            .attr("class", "node")
            .attr("fill", "#ffffff")
            .attr("stroke", "#000000")
            .attr("r", 35)


       const nodeEnterText =  nodeEnter
            .append("text")
            .attr("fill", "#000000")
            .attr("font-size", 12)
            .attr("font-family", "montserrat")
            .attr("text-anchor", "middle")
            .text(d => d.data.packageName)

        // node.append("title")
        //     .text(d => d.data.packageName);


        simulation.on("tick", () => {
            linkEnter
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y)

            nodeEnterCircle
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)

            nodeEnterText
                .attr("x", d => d.x)
                .attr("y", d => d.y)
        })

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
        data: selectDependencyData(state)
    }
}

const withConnect = connect(
    mapStateToProps,
)

export default compose(
    withConnect
)(DependencyChart)
