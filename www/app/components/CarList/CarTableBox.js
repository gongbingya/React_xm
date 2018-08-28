import React from 'react';
import { connect } from "dva";
import { Table , Row , Col , Button , Icon ,Modal ,Radio } from "antd";
import fp from "lodash/fp";
import Biaolieshezhi from "./Biaolieshezhi.js";
import Grid from "./Grid.js";
import columns from "./api/columns.js";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class CarTableBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cols : (function(){
                // 浏览器中的值
                if( localStorage.getItem("ershoucheCols")){
                    return JSON.parse(localStorage.getItem("ershoucheCols"));
                }else{
                    // 默认的值
                    return ["id","avatar","brand","price","km","type"]
                }

            })(),
            isShowBiaolieshezhi:false,
            showType : "table"
        }
    };
    //组件上树之后
    componentDidMount() {
        var self = this;
        // 事件委托
        $(this.refs.carTableBox).on("click",".souluetu",function(){
            var theId = $(this).data("id");

                self.props.setXuanfu(theId,true);
        })
    }
    // 设置显示列
    getCols(cols){
        var ARR = [];
        for (var i = 0; i < cols.length; i++) {

            for (var j = 0; j < columns.length; j++) {

                    if( columns[j].dataIndex == cols[i]){

                        ARR.push(columns[j])
                    }
            };
        };

        return ARR;
    }
    render() {
        var arr = fp.clone(this.state.cols);
        const setCols = (_arr)=>{
             arr = _arr;
        };
        return (
            <div className="carTableBox" ref="carTableBox">
                <div className="settingPart">
                    <Row style={{"margin":"20px 0px 10px"}}>
                        <Col span={16}>
                            <div>
                                共 { this.props.pagination.total}辆符合要求
                                当前 { this.props.pagination.page} / { Math.ceil( this.props.pagination.total / this.props.pagination.pagesize ) } 页
                            </div>
                        </Col>
                        <Col span={8}>
                            <Button type="primary" shape="circle" icon="setting" onClick={()=>{

                                this.setState({isShowBiaolieshezhi:true})
                            }}/>
                            <RadioGroup onChange={(e)=>{
                                this.setState({showType:e.target.value})
                            }} defaultValue="table">
                               <RadioButton value="table">列表视图</RadioButton>
                               <RadioButton value="grid">网格视图</RadioButton>
                            </RadioGroup>
                        </Col>
                    </Row>

                </div>

                <Modal
                    title="表格列的设置"
                    visible={this.state.isShowBiaolieshezhi}
                    destroyOnClose = {true}
                    onOk={()=>{
                        this.setState({
                            cols:arr,
                            isShowBiaolieshezhi:false
                        });
                        // 在本地持久一份
                        localStorage.setItem("ershoucheCols",JSON.stringify(arr))

                    }}
                    onCancel={()=>{
                        this.setState({isShowBiaolieshezhi:false})
                    }}
                >
                <Biaolieshezhi setCols={setCols} arr={arr}></Biaolieshezhi>
                </Modal>
                {
                    this.state.showType == "grid"
                    ?
                    <Grid cols={this.state.cols}></Grid>
                    :
                    <Table
                        dataSource={this.props.cars}
                        columns={this.getCols(this.state.cols)}
                        rowKey= "id"
                        onChange = {(pagination, filters, sorter)=>{
                            if( sorter.order != this.props.sorter.sortdirection || sorter.field != this.props.sorter.sortby){
                                this.props.dispatch({
                                    "type":"carlist/changeSort",
                                    "sortby": sorter.field || "id",
                                    "sortdirection":sorter.order || "ascend"
                                });
                            };
                            if( pagination.current != this.props.pagination.page || pagination.pageSize != this.props.pagination.pagesize){
                                this.props.dispatch({
                                    "type":"carlist/changePage",
                                    "page":pagination.current,
                                    "pagesize":pagination.pageSize
                                });
                            }
                        }}
                        pagination = {{
                            current : this.props.pagination.page,
                            total : this.props.pagination.total,
                            pageSize : this.props.pagination.pagesize,
                            showSizeChanger : true,
                            pageSizeOptions : ["3","5","20","50","100"]
                        }}
                    />

                }
            </div>
        );
    }
}
export default connect(
    ({carlist}) =>({
        cars:carlist.cars,
        pagination:carlist.pagination,
        sorter:carlist.sorter
    })
)(CarTableBox);
