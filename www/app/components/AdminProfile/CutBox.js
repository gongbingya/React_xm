import React from 'react';
import { Button } from "antd";
export default class CutBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpDone : false
        }

        this.cutCengLeft = 0;
        this.cutCengTop = 0;
        this.cutCengWidth = 100;
        this.cutCengHeight = 100;
    }
    // 组件上树
    componentDidMount() {
        var i = 0;
        var self = this;
        this.timer = setInterval(function () {
            i++;
            if(i>3) i = 0;
            $(self.refs.diandiandian).html(".".repeat(i))
        },500)
    }
    // 组件将要收到新的属性
    componentWillReceiveProps(nextProps) {
        // 发送对图片的url请求
        var img = new Image();
        img.src = '/uploads/'+ nextProps.picurl;
        // 备份this
        var self = this;
        img.onload = function () {
            clearInterval(self.timer);
            self.setState({
                isUpDone:true
            });
            // 给cutCeng 改变尺寸
            $(self.refs.cutCeng).resizable({
                containment:"parents",
                aspectRatio: 1/1,
                resize:function (event,ui) {

                    self.cutCengWidth = ui.size.width;
                    self.cutCengHeight = ui.size.height;

                    self.setPreviews();
                }
            });
            $(self.refs.cutCeng).draggable({
                containment:"parents",
                drag:function (event,ui) {
                    self.cutCengLeft = ui.position.left;
                    self.cutCengTop = ui.position.top;

                    $(self.refs.maoni).css({
                        "left":-self.cutCengLeft,
                        "top":-self.cutCengTop
                    })
                    self.setPreviews();
                }
            });
        };
    }
    setPreviews(){
        var self = this;
        $(this.refs.previewZone).find(".pic").each(function(){

            var theW = $(this).data("w");

            $(this).find("img").css({
                width: self.props.imgW / self.cutCengWidth * theW,
                top: -self.cutCengTop / self.cutCengHeight * theW,
                left: -self.cutCengLeft / self.cutCengWidth * theW
            })
        })
    }
    doCut(){
        console.log(this);
        //比例
        var rate = this.props.realW / this.props.imgW;
        var w = this.cutCengWidth * rate;
        var h = this.cutCengHeight * rate;
        var l = this.cutCengLeft * rate;
        var t = this.cutCengTop * rate;

        $.post("/docut",{
            w,
            h,
            l,
            t,
            picurl:this.props.picurl
        },function (data) {
            if( data.result  == 1){

                window.closeXuanfu();
            }
        })

    }
    render() {
        return (
            <div className="cutBox" style={{
                "width":this.props.boxW + "px",
                "height":this.props.boxH + "px",
                "padding":this.props.padding + "px"
            }}>
                {
                    !this.state.isUpDone
                    ?
                    <span className="loadingTip">图片正在上传<em ref="diandiandian">...</em></span>
                    :
                    <div className="cutBox" style={{
                        "width":this.props.boxW + "px",
                        "height":this.props.boxH + "px",
                        "padding":this.props.padding + "px"
                    }}>
                        <div className="imgBoxWrap" style={{
                            "width":this.props.imgW + "px",
                            "height":this.props.imgH + "px",
                        }}>
                            <img src={`/uploads/${this.props.picurl}`}  style={{
                                "width":this.props.imgW + "px",
                                "height":this.props.imgH + "px",
                            }} />
                           <div className="cutCeng" ref="cutCeng">
                                <img src={`/uploads/${this.props.picurl}`}  style={{
                                    "width":this.props.imgW + "px",
                                    "height":this.props.imgH + "px",
                                }} ref="maoni"/>
                           </div>
                           <div className="mask"></div>
                        </div>
                        <div className="previewZone" ref="previewZone">
                            <div className="big_pic pic" data-w="160">
                                <img src={`/uploads/${this.props.picurl}`} alt="" />
                            </div>
                            <div className="middle_pic pic" data-w="100">
                                <img src={`/uploads/${this.props.picurl}`} alt="" />
                            </div>
                            <div className="small_pic pic" data-w="80">
                                <img src={`/uploads/${this.props.picurl}`} alt="" />
                            </div>

                            <Button type="primary" onClick={()=>{this.doCut()}}>确定</Button>
                            {" "}
                            <Button type="error">取消</Button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
