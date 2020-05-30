import React from 'react';
import {Tag} from 'antd';
import { connect } from 'react-redux'
import {selectColourScale, selectPackageNames} from '../inputs/selectors'


const Tags = ({packageNames, colourScale}) => {
    return (
        <div>
            {packageNames.map((packageName) => {
                return <Tag key={packageName} color={colourScale(packageName)}>{packageName}</Tag>
            })}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        packageNames: selectPackageNames(state),
        colourScale: selectColourScale(state)
    }
}


export default connect(mapStateToProps)(Tags)