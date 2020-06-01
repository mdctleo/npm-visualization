import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux'
import {compose} from 'redux';
import {fetchDependencies} from "./action";
import {selectDependencyData} from "./selector";

const { Search } = Input;


class DependencyControls extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.props.getDependencies("express", "latest")
    }

    render() {
        return (
            <div>
                <Search
                    placeholder="input search text"
                    onSearch={(value, event) => {
                        this.props.getDependencies(value, "latest")
                    }}
                    style={{ width: 200, marginRight: 20}}
                />
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