import React from 'react';
import { Slider } from 'antd';

export default (props)=>{

    return <div>
        <Slider
            range
            value={props.v}
            onChange={(v)=>{props.onChange(v)}}
            onAfterChange  = {(v)=>{props.onChoose(v)}}
        />
    </div>
}