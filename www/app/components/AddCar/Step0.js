import React from 'react';
import WrappedStep0Form from "./WrappedStep0Form.js";
import { Form , Button, Input , Row,Col}  from "antd";
import { connect } from "dva";
class Step0 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form0:{
                km:{},
                price1:{},
                price2:{},
                seat:{},
                fuel:{},
                color:{},
                gearbox:{},
                exhaust:{},
                brandandSeries:{},
                buydate:{}
            }
        }
    }
    handleFormChange(changedFields){
        this.setState({
            form0:{
                ...this.state.form0,
                ...changedFields
            }
        })
    }
    render() {
        const checkdisabled = ()=>{
            // 什么是合法的数据
            // 所有的state值都是必须有value值的
            // 所有的state值的errors属性一定是undefined
            for (var k in this.state.form0 ){

                if( this.state.form0[k].errors || this.state.form0[k].value === undefined){
                    return true;
                }

            }
                 return false;
        };
        return (
            <div>
                <WrappedStep0Form
                {...this.state.form0}
                onChange={this.handleFormChange.bind(this)}
                >
                </WrappedStep0Form>
                <Button
                    type="primary"
                    onClick={()=>{
                        this.props.dispatch({"type":"addCar/changeStep","step":1})
                        this.props.dispatch({"type":"addCar/changeForm0","form0":this.state.form0})
                    }}
                    disabled = {checkdisabled()}
                >下一步</Button>
            </div>
        );
    }
}

export default connect()(Step0);
