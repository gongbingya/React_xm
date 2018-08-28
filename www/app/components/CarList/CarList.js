import React from 'react';
import { connect } from "dva";
import CarFilterBox from "./CarFilterBox.js";
import CarTableBox from "./CarTableBox.js";
import PicShow from "../PicShow/PicShow.js";
import "./CarList.less";

class CarList extends React.Component {

    constructor(props) {
        super(props);

        props.dispatch({"type":"carlist/init"})

        this.state = {
          xuanfuId :0, //图集ID
          isShowXuanfu : false // 是否显示悬浮层
        }
    }
    setXuanfu(xuanfuId,isShowXuanfu){
      this.setState({
        xuanfuId,
        isShowXuanfu
      })
    }
    render() {
        return (
            <div>
                <CarFilterBox></CarFilterBox>
                <CarTableBox setXuanfu={this.setXuanfu.bind(this)}></CarTableBox>
                {
                  this.state.isShowXuanfu
                  ?
                  <div className="xuanfu">
                    <div className="inner">
                      <div className="closeBtn" onClick={()=>{
                        this.setState({isShowXuanfu:false})
                        this.props.dispatch({"type":"picshow/clearCarImages"})
                      }}>X</div>
                      <PicShow id={this.state.xuanfuId}></PicShow>
                    </div>
                  </div>
                  :
                  null
                }
            </div>


        );
    }
}
export default connect(
    ({carlist})=>({
        "nowfilters":carlist.nowfilters
    })
)(CarList);