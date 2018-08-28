import React from 'react';
import { Row, Col } from 'antd';
import carBrandAndSeries  from "./api/carBrandAndSeries.js";
import MyTab from "./MyTab.js";
import Series from "./Series.js";
import MyCheckbox from "./MyCheckbox.js";
import MyRange from "./MyRange.js";
import MyCanlendar from "./MyCanlendar.js";
import MyDropDown from "./MyDropDown.js";
import MyTag from "./MyTag.js";
import moment from 'moment';
import { connect } from "dva";
class CarFilterBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "char":"A",
            "price":[0,100],
            "km":[0,100]
        }
    }
    render() {
        // 我们将nowfilters 中的数据一个个的都取出来。
        var data = {
            "brand":"",
            "series":"",
            "color":[],
            "seat":[],
            "engine":[],
            "type":[],
            "fuel":"",
            "gearbox":"",
            "license":"",
            "buydate":[]
        };
        this.props.nowfilters.forEach(item=>{
            data[item.k] = item.v;
        });
        return (
            <div className="carFilterBox">
                <Row>
                    <Col span={2}>品牌</Col>
                    <Col span={22}>
                        <MyTab
                            onChoose = {(v,char)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"brand",v})
                                this.setState({
                                    char
                                })

                            }}
                            brand = {data.brand}
                        ></MyTab>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>系列</Col>
                    <Col span={22}>
                        <Series
                            brand={data.brand}
                            series={data.series}
                            char = {this.state.char}
                            onChoose = {(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"series",v})
                            }}
                        ></Series>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>颜色</Col>
                    <Col span={22}>
                        <MyCheckbox
                            v={data.color}
                            options={["黑","白","灰","银灰","红","蓝","橙","香槟","紫","其他","黄","咖啡","绿"]}
                            onChoose={(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"color",v})
                                if(v.length == 0){
                                    this.props.dispatch({"type":"carlist/removeFiler","k":"color"})
                                }
                            }}
                        ></MyCheckbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>车型</Col>
                    <Col span={22}>
                        <MyCheckbox
                            v={data.type}
                            options={["B级轿车","A级轿车","C级轿车","大型SUV","跑车","中型SUV","小型SUV","面包车"]}
                            onChoose={(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"type",v})
                                if(v.length == 0){
                                    this.props.dispatch({"type":"carlist/removeFiler","k":"type"})
                                }
                            }}
                        ></MyCheckbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>座位数</Col>
                    <Col span={22}>
                        <MyCheckbox
                            v={data.seat}
                            options={["2","4","5","20"]}
                            onChoose={(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"seat",v})
                                if(v.length == 0){
                                    this.props.dispatch({"type":"carlist/removeFiler","k":"seat"})
                                }
                            }}
                        ></MyCheckbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>发动机</Col>
                    <Col span={22}>
                        <MyCheckbox
                            v={data.engine}
                            options={["1.0","1.2","1.2T","1.4","1.4T","1.6","1.6T","2.0","2.0T","5.0"]}
                            onChoose={(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"engine",v})
                                if(v.length == 0){
                                    this.props.dispatch({"type":"carlist/removeFiler","k":"engine"})
                                }
                            }}
                        ></MyCheckbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>排量</Col>
                    <Col span={22}>
                        <MyCheckbox
                            v={data.exhaust}
                            options={["国一","国二","国三","国四","国五","国六"]}
                            onChoose={(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"exhaust",v})
                                if(v.length == 0){
                                    this.props.dispatch({"type":"carlist/removeFiler","k":"exhaust"})
                                }
                            }}
                        ></MyCheckbox>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>价格（万元）</Col>
                    <Col span={12}>
                        <MyRange
                            v={this.state.price}
                            onChange={(v)=>{
                                this.setState({"price":v})
                            }}
                            onChoose={(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"price",v})
                            }}
                        >
                        </MyRange>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>公里（km）</Col>
                    <Col span={12}>
                        <MyRange
                            v={this.state.km}
                            onChange={(v)=>{
                                this.setState({"km":v})
                            }}
                            onChoose={(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"km",v})
                            }}
                        >
                        </MyRange>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>购买日期</Col>
                    <Col span={12}>
                        <MyCanlendar
                            onChoose={(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"buydate","v":[v[0].format("x"),v[1].format("x")]})
                            }}
                            buydate = {
                                data.buydate[0]
                                ?
                                [moment(Number(data.buydate[0])),moment(Number(data.buydate[1]))]
                                :
                                []

                            }
                        >
                        </MyCanlendar>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>杂项</Col>
                    <Col span={22}>
                        <MyDropDown
                            title = "燃油"
                            option= {["汽油","柴油","油电混合","纯电动","燃气","人力"]}
                            onChoose={(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"fuel",v})
                            }}
                            v = {data.fuel}
                        >
                        </MyDropDown>
                        <MyDropDown
                            title = "变速箱"
                            option= {["自动","手动","手自一体"]}
                            onChoose={(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"gearbox",v})
                            }}
                            v = {data.gearbox}
                        >
                        </MyDropDown>
                        <MyDropDown
                            title = "是否含牌"
                            option= {["是","否"]}
                            onChoose={(v)=>{
                                this.props.dispatch({"type":"carlist/addOrChangeFiler","k":"license",v})
                            }}
                            v = {data.license}
                        >
                        </MyDropDown>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>当前：</Col>
                    <Col span={22}>
                        <MyTag
                            nowfilters = { this.props.nowfilters }
                            onClose = {(k)=>{
                                this.props.dispatch({"type":"carlist/removeFiler",k})

                                // 如果你删除的是km或price，此时要恢复state
                                if( k == "price"){
                                    this.setState({
                                        "price":[0,100]
                                    })
                                }else if( k == "km"){
                                    this.setState({
                                        "km":[0,100]
                                    })
                                }
                            }}
                        ></MyTag>
                    </Col>

                </Row>
            </div>
        );
    }
}
export default connect(
    ({carlist})=>({

        nowfilters:carlist.nowfilters
    })
)(CarFilterBox);