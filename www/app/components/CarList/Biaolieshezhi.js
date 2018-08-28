import React from 'react';

export default class Biaolieshezhi extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {

        var self = this;
        $(this.refs.current).sortable({
            connectWith:"ul",
            stop:function(){
                var arr = [];

                $(self.refs.current).find("li").each(function(){
                    arr.push($(this).data("key"));
                })

                self.props.setCols(arr);
            }
        });
        $(this.refs.willChoose).sortable({
             connectWith:"ul",
             stop:function(){
                 var arr = [];

                 $(self.refs.current).find("li").each(function(){
                     arr.push($(this).data("key"));
                 });

                self.props.setCols(arr);

             }
        });
    }
    render() {
        const KVobj = {
            "id":"编号",
            "type":"车型",
            "seat":"座位数",
            "brand":"品牌",
            "series":"系列",
            "color":"颜色",
            "price":"价格",
            "km":"公里数",
            "ownerID":"用户ID",
            "engine":"排量",
            "buydate":"购买日期",
            "license":"是否上牌",
            "exhaust":"排放标准",
            "gearbox":"变速箱",
            "fuel":"燃料",
            "avatar":"缩略图"
        };

        var nohas = Object.keys(KVobj).filter(item => !this.props.arr.includes(item));


        return (
            <div className="biaolieshezhi">
                <h3>当前：</h3>
                <ul ref="current" className="current" style={{"minHeight":"20px"}}>
                    {
                        this.props.arr.map((item,index)=>{
                            return <li
                                key={index}
                                data-key={item}
                            >
                                {KVobj[item]}
                            </li>

                        })
                    }
                </ul>
                <h3>可以选择：</h3>
                <ul ref="willChoose" className="willChoose" style={{"minHeight":"20px"}}>
                    {
                        nohas.map((item,index)=>{
                            return <li
                                key={index}
                                data-key={item}
                            >
                            {KVobj[item]}
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}
