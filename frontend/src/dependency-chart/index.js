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
    }

    updateChart() {
        this.root = this.tree(this.props.data);

        let x0 = Infinity;
        let x1 = -x0;
        this.root.each(d => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        this.svg.attr("viewBox", [0, 0, this.width, x1 - x0 + this.root.dx * 2])
        this.g.attr("transform", `translate(${this.root.dy / 3},${this.root.dx - x0})`);

        //
        // this.cluster = d3.cluster()
        //     .size([this.height, this.width - 100])
        //
        // this.root = d3.hierarchy(this.props.data, d => d.children)
        // this.cluster(this.root)

        this.drawChart()
    }

    drawChart() {

        // Add the links between nodes:

        let link = this.g.selectAll('path')
            .data(this.root.links())

        link.exit().remove()

        let linkEnter = link
            .enter()
            .append('path')

        link = link.merge(linkEnter)
        link
            // .attr("d", d => {
            //     return "M" + d.y + "," + d.x
            //         + "C" + (d.parent.y + 30) + "," + d.x
            //         + " " + (d.parent.y + 130) + "," + d.parent.x // 50 and 150 are coordinates of inflexion, play with it to change links shape
            //         + " " + d.parent.y + "," + d.parent.x;
            // })
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x))
            .style("fill", 'none')
            .attr("stroke", '#ccc')


        let node = this.g.selectAll('g')
            .data(this.root.descendants())

        node.exit().remove()

        let nodeEnter = node
            .enter()
            .append("g")

        nodeEnter.append("circle")

        nodeEnter.append("text")


        node = node.merge(nodeEnter)
            .attr("transform", d => `translate(${d.y},${d.x})`)

        node.select('circle')
            .attr("r", 6)
            .style("fill", d => d3.interpolateRdYlGn(d.data.final))
            .attr("stroke", "black")
            .style("stroke-width", 1)

        node.select('text')
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -9 : 9)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.packageName)
            .clone(true).lower()
            .attr("stroke", "white")

    }

    createChart() {
        this.root = this.tree(this.props.data);

        let x0 = Infinity;
        let x1 = -x0;
        this.root.each(d => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        this.svg = d3.select(this.node).append("g")
            .attr("viewBox", [0, 0, this.width, x1 - x0 + this.root.dx * 2])

        this.g = this.svg.append('g')
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("transform", `translate(${this.root.dy / 3},${this.root.dx - x0})`);

    }

    tree(data) {
        const root = d3.hierarchy(data)
        root.dx = 15
        root.dy = this.width / (root.height + 1)
        return d3.tree().nodeSize([root.dx, root.dy])(root)
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
