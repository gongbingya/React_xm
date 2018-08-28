import React from 'react';
import {connect} from "dva";
import { Steps, Button, message } from 'antd';
const Step = Steps.Step;
import Step0 from "./Step0.js";
import Step1 from "./Step1.js";
import Step2 from "./Step2.js";
import "./AddCar.less";
class AddCar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {


         const showStep = (n) =>{
            var arr = [
                <Step0></Step0>,
                <Step1></Step1>,
                <Step2></Step2>
            ];
            return arr[n]

         }

        return (
            <div>
                <Steps current={this.props.step}>
                  <Step key={0} title="车辆的基本信息" description="车型、车主、价格等"></Step>
                  <Step key={1} title="车辆的图片" description="外观、内饰、结构及发动机、更多细节图片"></Step>
                  <Step key={2} title="车辆的其他文件" description="机动车登记证、行驶证照片"></Step>
                </Steps>
                <div className="steps-content">
                    {showStep(this.props.step)}
                </div>
            </div>
        );
    }
}

export default connect(
    ({addCar})=>({
        step:addCar.step
    })
)(AddCar);