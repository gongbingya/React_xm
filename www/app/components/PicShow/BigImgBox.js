import React from 'react';
import { connect } from "dva";
class BigImgBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAutoPlay : false
        }
    }
    // 门神
    shouldComponentUpdate(nextProps, nextState) {
        // 如果当前的图集id变化了，此时必须等新的car引起images UNPDAING阶段
        if( nextProps.nowid != this.props.nowid){

            return nextProps.carimages != this.props.carimages;
        }
        //除了id更新的其他的数据都放行，因为不引起报错
        return true;
    }
    componentWillUpdate({nowid,nowalbum,carimages,nowidx}, nextState) {
         $(this.refs.loading).show();
        // 对大图发出请求
        var image = new Image();

        var src = `carimages/${nowid}/${nowalbum}/${carimages[nowalbum][nowidx]}`;

        image.src = src;

        var self = this;
        // 当一张图片加载完后悔执行onload事件
        image.onload = function(){
            $(self.refs.bigimg).attr("src",src);
            // 小菊花就hide
            $(self.refs.loading).hide();
        }

    }
    render() {
        // props 的解构
        const {nowid,nowalbum,nowidx,carimages} = this.props;

        if (!carimages['view']) return null;

        // 计算图片的总数
        const zongshu = carimages.view.length + carimages.inner.length + carimages.engine.length + carimages.more.length;
        // 图集序
        const  arr = ["view","inner","engine","more"];
        // 当前所在的相册序列
        const albumidx = arr.indexOf(nowalbum);
        // 总序列
        var zongxu = 0;

        for (var i = 0; i < albumidx; i++) {

                zongxu += carimages[arr[i]].length
        };
        // 加自己图集的零头
        zongxu += nowidx + 1;
        return (
            <div className="bigImgBox">
                <div className="inner">
                    <img src={`carimages_small/${nowid}/${nowalbum}/${carimages[nowalbum][nowidx]}`} className="bigimg" ref="bigimg" />
                    <p className="loading" ref="loading"></p>
                    <div className="leftBtn" onClick= {()=>{
                        this.props.dispatch({
                            "type":"picshow/goPrev"
                        })
                    }}></div>
                    <div className="rightBtn" onClick= {()=>{
                        this.props.dispatch({
                            "type":"picshow/goNext"
                        })
                    }}></div>
                    <div className="picnummber">{zongxu}/{zongshu}</div>
                    <div className="autoplay">
                        {
                            this.state.isAutoPlay
                            ?
                            <img src="/images/zanting.svg" onClick={()=>{
                                clearInterval(this.timer)
                                this.setState({isAutoPlay:false})
                            }} />
                            :
                            <img src="/images/bofang.svg" onClick={()=>{
                                var self = this;
                                this.timer = setInterval(function(){
                                    self.props.dispatch({
                                        "type":"picshow/goNext"
                                    });
                                },1000)

                                this.setState({isAutoPlay:true})
                            }} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(
    ({picshow})=>({
        nowid:picshow.nowid,
        nowalbum:picshow.nowalbum,
        nowidx:picshow.nowidx,
        carimages:picshow.carimages
    })
)(BigImgBox);