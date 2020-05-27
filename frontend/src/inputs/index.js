import { DatePicker } from 'antd';
import React from "react";

const { RangePicker } = DatePicker;

class Inputs extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <RangePicker/>
            </div>
        )
    }
}

export default Inputs