import React from 'react';
import { connect } from "dva";
import cn from "classnames";
class CarLikeBox extends React.Component {

    constructor(props) {
        super(props);
        this.top = null;
        this.ulH = null;
        this.boxH = null;
        this.rate = null;
        this.bH = null;
    }
    // 组件上树
    componentDidMount() {
        var self = this;
        const $ul = $(this.refs.ul);
        const $b = $(this.refs.b);



        // 让b可以拖拽
        $b.draggable({
            "containment":"parent",
            "drag":function(event,ui){
                // 当前滑块的位置
                self.top = ui.position.top;
                // 让 ul 正比例移动
                $ul.css("top",-self.top * self.rate )
            }
        });

        // 鼠标的滚动事件

        $(this.refs.carLikeBox).mousewheel(function(event,dalta){

            self.top -= dalta * 10;

            // 验收

            if(self.top < 0) self.top  = 0;
            if(self.top > self.boxH - self.bH) self.top  = self.boxH - self.bH;

            // 让b和ul 按信号量的倍数移动
            $b.css("top",self.top);
            $ul.css("top",-self.top * self.rate);

        })
    };
    // 数据回来 render
    componentDidUpdate(prevProps, prevState) {
        // 得到ul的高度
        this.ulH = $(this.refs.ul).height();
        // 得到盒子的高度，ul在盒子中的溢出
        this.boxH = $(this.refs.carLikeBox).height();
        // 比例
        this.rate = this.ulH / this.boxH ;// 应该大于1的
        // 如果rate小于1，说明不需要侧边的滚动条。
        if(this.rate <= 1){
            $(this.refs.bar).hide();
            $(this.refs.b).hide();
        }else{
            $(this.refs.bar).show();
            $(this.refs.b).show();
        };
        // 计算滑块的高度
        this.bH = this.boxH / this.rate;
        $(this.refs.b).css("height",this.bH);
    }
    render() {
        const {nowid,carlikes,dispatch} = this.props;
        return (
            <div className="carLikeBox" ref="carLikeBox">
                <ul ref="ul">
                    {
                        carlikes.map(item=>{
                            return <li
                                key={item.id}
                                className={cn({"cur":nowid == item.id})}
                                onClick = {()=>dispatch({"type":"picshow/init","nowid":item.id})}
                            >
                            {item.color}色
                            {new Date(Number(item.buydate)).getFullYear()}年
                            {Math.round(item.km/10000)}万公里
                            {item.price}万元
                            {item.engine}排量
                            </li>
                        })
                    }
                </ul>
                <div className="bar" ref="bar">
                    <b ref="b"></b>
                </div>
            </div>
        );
    }
}
export default connect(
    ({picshow})=>({
        "carlikes" : picshow.carlikes,
        "nowid" : picshow.nowid
    })
)(CarLikeBox)

