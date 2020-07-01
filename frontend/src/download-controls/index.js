import {Alert, DatePicker} from 'antd';
import React from 'react';
import {Input} from 'antd';
import {connect} from 'react-redux'
import {compose} from 'redux';
import {setSearchTerm, setSearchDate, fetchPackagesDownload, setDownloadError} from './action';
import {selectDownloadError, selectEndDate, selectPackageNames, selectStartDate} from './selectors';
import moment from 'moment';

const {RangePicker} = DatePicker;
const {Search} = Input;


class Inputs extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.props.getPackages(this.props.packageNames, this.props.start, this.props.end)
    }

    render() {
        const isError = this.props.isError
        return (
            <div>
                <div>
                    <Search
                        placeholder="input search text"
                        onSearch={(value, event) => {
                            this.props.setSearchTerm(value.toLowerCase())
                            this.props.fetchPackagesDownload(value.toLowerCase(), this.props.start, this.props.end)
                        }}
                        style={{width: 200, marginRight: 20}}
                    />
                    <RangePicker
                        onCalendarChange={(dates, dateStrings) => {
                            this.props.setSearchDate(dateStrings[0], dateStrings[1])
                            this.props.fetchPackagesDownload(this.props.packageNames, dateStrings[0], dateStrings[1])
                        }}
                        value={[moment(this.props.start, 'YYYY-MM-DD'), moment(this.props.end, 'YYYY-MM-DD')]}
                    />
                </div>
                {isError && <Alert
                    className="alert"
                    message="Error"
                    description="Something went wrong, try refreshing the page and retry"
                    type="error"
                    showIcon
                    closable
                    onClose={(e) => {
                        this.props.setError(false, "")
                    }}
                />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        start: selectStartDate(state),
        end: selectEndDate(state),
        packageNames: selectPackageNames(state),
        isError: selectDownloadError(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSearchDate: (start, end) => dispatch(setSearchDate(start, end)),
        setSearchTerm: (packageName) => dispatch(setSearchTerm(packageName)),
        fetchPackagesDownload: (packageNames, start, end) => dispatch(fetchPackagesDownload(packageNames, start, end)),
        setError: (isError, message) => dispatch(setDownloadError(isError, message))
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default compose(
    withConnect
)(Inputs)