import React from 'react';
import { Checkbox } from 'antd';

export default (props)=>{
    return <Checkbox.Group
        options={props.options}
        value = { props.v}
        onChange = {(v)=>{props.onChoose(v)}}
     />
}
