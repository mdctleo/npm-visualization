import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux'
import {compose} from 'redux';
import {fetchDependencies} from "./action";
import {selectDependencyData} from "./selector";
import * as d3 from 'd3'

const { Search } = Input;


class DependencyControls extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.props.getDependencies("express", "latest")
        let ctx = this.canvas.getContext("2d")
        let grd = ctx.createLinearGradient(0, 0, 200, 0)

        for (let i = 0; i < d3.schemeRdYlGn[10].length; i++) {
            grd.addColorStop((i / 10).toFixed(1), d3.schemeRdYlGn[10][i])
        }

        ctx.fillStyle = grd
        ctx.fillRect(10, 10, 150, 80)
    }

    render() {
        console.log(d3.schemeRdYlGn[10])
        return (
            <div className="dependency-control">
                <Search
                    placeholder="input search text"
                    onSearch={(value, event) => {
                        this.props.getDependencies(value, "latest")
                    }}
                    style={{ width: 200, marginRight: 20}}
                />
                <div className="dependency-legend">
                    <canvas ref={canvas => this.canvas = canvas} width="170" height="30"/>
                    <span className="low">Low Score</span>
                    <span className="high">High Score</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: selectDependencyData(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDependencies: (packageName, version) => dispatch(fetchDependencies(packageName, version))
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default compose(
    withConnect
)(DependencyControls)