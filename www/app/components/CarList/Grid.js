import React from 'react';
import { Radio ,Col ,Row , Pagination} from 'antd';
import { connect } from "dva";
import moment from "moment";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "value":"A",
            "col":4,
            "row":5
        }
    }

    render() {
        var cols = this.props.cols;

        // 写一个函数的组件
        const showGridContent = (n)=>{
            const theCar = this.props.cars[n];
                if( !theCar ) return null;
                const showH4 = (item)=>{
                    if(item == "avatar"){
                        return null;
                    }else if(item == "buydate"){
                       return moment(Number(theCar[item])).format("YYYY年MM月")
                    }else{
                        return theCar[item]
                    }
                }
                return <div>
                    <Row>
                        <Col span={18} offset={3}>
                            <img src={`/carimages_small/${theCar.id}/view/${theCar.avatar}`} alt="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18} offset={3}>
                            {
                                cols.map((item,index)=>{

                                    return <h4 key={index}>
                                        {
                                           showH4(item)
                                        }
                                    </h4>
                                })
                            }
                        </Col>
                    </Row>

                </div>
        };
        // 显示网格的数据
        var ARR = [];
        for (var i = 0; i < this.state.row; i++) {
            var temp = [];
            for (var j = 0; j < this.state.col; j++) {
                temp.push(
                       <Col key={j} span={24/this.state.col}>
                            {showGridContent(i*this.state.col +j)}
                       </Col>
                    )
            };
            ARR.push(<Row key={i}>{temp}</Row>)
        };
        return (
            <div>
                <RadioGroup onChange={(e)=>{
                    this.setState({
                        col:e.target.col,
                        row:e.target.row,
                        value:e.target.value
                    })
                    // 发送新的pagesize
                    this.props.dispatch({"type":"carlist/changePage","pagesize":e.target.col * e.target.row})
                }} defaultValue="C" className="settingGrid">
                    <RadioButton value="A" col="4" row="5">4*5</RadioButton>
                    <RadioButton value="B" col="3" row="5">3*5</RadioButton>
                    <RadioButton value="C" col="2" row="5">2*5</RadioButton>
                </RadioGroup>

                <div>
                    {ARR}
                    <Pagination
                        current = { this.props.pagination.page }
                        total = {this.props.pagination.total}
                        pageSize = { this.props.pagination.pagesize }
                        onChange={(page)=>{
                            this.props.dispatch({"type":"carlist/changePage","page":page,"pagesize":this.state.col *this.state.row})
                        }}
                    />
                </div>
            </div>
        );
    }
}
export default connect(
    ({carlist})=>({"pagination":carlist.pagination,"cars":carlist.cars})
)(Grid);