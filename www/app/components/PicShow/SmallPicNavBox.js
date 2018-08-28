import React from 'react';
import { connect } from "dva";
import cn from "classnames";
class SmallPicNavBox extends React.Component {

    constructor(props) {
        super(props);
        this.page = 0;
    }
    // 得到新数据的时候，计算当前的page
    componentWillReceiveProps(nextProps) {
        // 计算page
        this.page = Math.floor( nextProps.nowidx / 4 )

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
    // 组件上树后
    componentDidMount() {
        var self = this;
        // 事件委托
        $(this.refs.navbar).on("mouseenter","span",function(){
            var i = $(this).data("i");
            // 拉动
            $(self.refs.unit).stop(true).animate({
                "left":-310 * i
            },300);

            $(this).addClass('cur').siblings().removeClass('cur');
        })

        // 当鼠标离开大大盒子的时候，拉回当前的位置，cur复位
        $(this.refs.smallPicNavBox).mouseleave(function(event) {

            $(self.refs.unit).stop(true).animate({
                    "left":-310 * self.page
                },300);
             $(self.refs.navbar).find("span").eq(self.page).addClass('cur').siblings().removeClass('cur');
        })
    };
    // 组件的数据更新的时候
    componentDidUpdate() {

        $(this.refs.unit).stop(true).animate({
                    "left":-310 * this.page
                },300);
    }
    render() {
        // props 的解构
        const {nowid,nowalbum,nowidx,carimages} = this.props;

       if(!carimages[nowalbum]) carimages[nowalbum] = [];
       // 显示ul和li ，都是取决于这个图集的
        const arr = carimages[nowalbum];
       // 总页数
       const pageAmont = Math.ceil(arr.length / 4);
       const showUlLis = ()=>{
            var DOMARR = [];

            for (let i = 0; i < pageAmont; i++) {

                DOMARR.push(
                        <ul key={i}>
                            {
                                arr.slice(i*4,i*4+4).map((item,index)=>{
                                    return <li
                                        key={index}
                                        className={cn({"cur":i*4+index == nowidx})}
                                        data-i = {i*4+index}
                                        onClick={()=>{
                                                this.props.dispatch({"type":"picshow/changenowidxSync","nowidx":i*4+index});
                                        }}

                                    >
                                        <img src={`carimages_small/${nowid}/${nowalbum}/${arr[i*4+index]}`}  />
                                    </li>
                                })
                            }
                        </ul>
                    )
            };

            return DOMARR;
       };

       const showSpans = ()=>{
        if(pageAmont == 1) return null;
            var DOMARR = [];
            for (var i = 0; i < pageAmont; i++) {
                DOMARR.push(
                        <span
                            key={i}
                            style={{"width":(298 - (pageAmont -1) * 5 ) / pageAmont + "px"}}
                            className={cn({"cur":i == this.page})}
                            data-i = {i}
                        >

                        </span>
                    )

            };
            return DOMARR;
       }
        return (
            <div className="smallPicNavBox" ref="smallPicNavBox">
               <div className = "unit" ref="unit">
                {showUlLis()}
               </div>
               <div className="navbar" ref="navbar">
                {showSpans()}
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
)(SmallPicNavBox);
