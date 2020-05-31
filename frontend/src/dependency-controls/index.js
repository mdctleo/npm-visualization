import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux'
import {compose} from 'redux';
import {fetchDependencies} from "./action";

const { Search } = Input;


class DependencyControls extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getDependencies("react", "latest")
    }

    render() {
        return (
            <div>
                <Search
                    placeholder="input search text"
                    onSearch={(value, event) => {
                        this.props.setSearch(value)
                        this.props.getPackages(value, this.props.start, this.props.end)
                    }}
                    style={{ width: 200, marginRight: 20}}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
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