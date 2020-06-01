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
        this.drag = this.drag.bind(this)
        this.dragstarted = this.dragstarted.bind(this)
        this.dragged = this.dragged.bind(this)
        this.dragended = this.dragended.bind(this)
        this.width = this.props.width - this.props.margin.left - this.props.margin.right
        this.height = this.props.height - this.props.margin.top - this.props.margin.bottom

    }

    componentDidMount() {
        this.createChart()
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        this.updateChart()
    }

    updateChart() {
        this.root = d3.hierarchy(this.props.data)
        this.links = this.root.links()
        this.nodes = this.root.descendants()

        this.simulation = d3.forceSimulation(this.nodes)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(300).strength(0))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("x", d3.forceX())
            .force("y", d3.forceY())

        this.drawChart()
    }

    drawChart() {
        let link = this.g.selectAll(".link")
            .data(this.links)

        link.exit().remove()

        let linkEnter = link.enter()
            .append("line")
            .attr("class", "link")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.8)

        link = link.merge(linkEnter)

        let nodeGroup = this.g.selectAll(".node-group")
            .data(this.nodes, d => d.data.packageName)

        nodeGroup.exit().remove()

        let nodeGroupEnter = nodeGroup.enter()
            .append("g")
            .attr("class", "node-group")

        let nodeEnterCircle = nodeGroupEnter.append("circle")
            .attr("class", "node-circle")
            .attr("fill", "#ffffff")
            .attr("stroke-width", 3)
            .attr("r", 35)
            .call(this.drag())


        let nodeEnterText =  nodeGroupEnter.append("text")
            .attr("class", "node-text")
            .attr("fill", "#000000")
            .attr("font-size", 12)
            .attr("font-family", "montserrat")
            .attr("text-anchor", "middle")

        nodeGroup = nodeGroup.merge(nodeGroupEnter)

        nodeGroup.select(".node-circle")
            .attr("stroke", d => d3.interpolateRdYlGn(d.data.final))

        nodeGroup.select(".node-text")
            .text(d => d.data.packageName)


        // const node = this.g.selectAll(".node")
        //     .data(this.nodes)
        //
        // const nodeEnter = node
        //     .enter()
        //     .append("g")
        //     .attr("class", "node-group")
        //
        // const nodeEnterCircle = nodeEnter
        //     .append("circle")
        //     .attr("fill", "#ffffff")
        //     .attr("stroke-width", 3)
        //     .attr("r", 35)
        //     .attr("stroke", d => d3.interpolateRdYlGn(d.data.final))
        //     .call(this.drag())
        //
        // const nodeEnterText = nodeEnter
        //     .append("text")
        //     .attr("fill", "#000000")
        //     .attr("font-size", 12)
        //     .attr("font-family", "montserrat")
        //     .attr("text-anchor", "middle")
        //     .text(d => d.data.packageName)



        this.simulation.on("tick", () => {
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

        // node.exit().remove()
        // nodeEnter.exit().remove()
        // nodeEnterCircle.exit().remove()
        // nodeEnterText.exit().remove()
    }

    createChart() {
        this.root = d3.hierarchy(this.props.data)
        this.links = this.root.links()
        this.nodes = this.root.descendants()

        this.simulation = d3.forceSimulation(this.nodes)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(300).strength(0))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("x", d3.forceX())
            .force("y", d3.forceY())

        this.g = d3.select(this.node)
            .attr("viewBox", [-this.width / 2, -this.height / 2, this.width, this.height]);

    }

    drag() {
        return d3.drag()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
    }

    dragstarted(d) {
        if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    dragended(d) {
        if (!d3.event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
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
