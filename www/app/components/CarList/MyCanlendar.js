import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
export default class MyCanlendar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <RangePicker
                      value={this.props.buydate}
                      onChange= {(v)=>{
                        this.props.onChoose(v)
                      }}
                    allowClear = {false}
                    />
            </div>
        );
    }
}
