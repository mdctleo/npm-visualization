import React from 'react';
import {Tag} from 'antd';
import { connect } from 'react-redux'
import {selectColourScale, selectPackageNames} from '../inputs/selectors'
import {deleteDownloadSearch} from "../inputs/action";


const Tags = ({packageNames, colourScale, deleteDownloadSearch}) => {
    return (
        <div>
            {packageNames.map((packageName) => {
                return <Tag key={packageName} color={colourScale(packageName)}
                            closable
                            onClose={e => deleteDownloadSearch(packageName)}>{packageName}</Tag>
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

const mapDispatchToProps = dispatch => {
    return {
        deleteDownloadSearch: (packageName) => dispatch(deleteDownloadSearch(packageName))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tags)