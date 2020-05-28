import React from 'react';
import {Tag} from 'antd';
import { connect } from 'react-redux'
import { selectPackageNames } from '../inputs/selectors'


const Tags = ({packageNames}) => {

    console.log(packageNames)
    return (
        <div>
            {packageNames.map((packageName) => {
                return <Tag id={packageName} color="magenta">{packageName}</Tag>
            })}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        packageNames: selectPackageNames(state)
    }
}


export default connect(mapStateToProps)(Tags)