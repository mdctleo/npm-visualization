import { DatePicker } from 'antd';
import React from "react";
import { Input } from 'antd';
import { connect } from 'react-redux'
import {compose} from "redux";
import {setSearch, setSearchDate} from "./action";
import {selectEndDate, selectStartDate} from "./selectors";
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Search } = Input;


class Inputs extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 200, marginRight: 20}}
                />
                <RangePicker
                    onCalendarChange={(dates, dateStrings) => this.props.setSearchDate(dateStrings[0], dateStrings[1])}
                    // value={[this.props.start, this.props.end]}
                    // value={[this.props.getStart(), this.props.getEnd()]}
                    value={[moment(this.props.start, 'YYYY-MM-DD'), moment(this.props.end, 'YYYY-MM-DD')]}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        start: selectStartDate(state),
        end: selectEndDate(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSearchDate: (start, end) => dispatch(setSearchDate(start, end)),
        setSearch: (packageName) => dispatch(setSearch(packageName))
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default compose(
    withConnect
)(Inputs)