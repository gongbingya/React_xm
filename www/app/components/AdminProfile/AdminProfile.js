import React from 'react';
import { Row ,Col ,Divider } from "antd";
import MyForm from "./MyForm.js";
import CutBox from "./CutBox.js";
import "./AdminProfile.less";
export default class AdminProfile extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
                isSHowXuanfu:false,
                imgW:0,
                imgH:0,
                boxW:0,
                boxH:0,
                realW:0,
                realH:0,
                padding:0,
                picurl:""
            }

        var self = this;
        // 定义一个函数， 弹出悬浮层
        window.openXuanfu = function () {

            self.setState({isSHowXuanfu:true})
        };
        window.closeXuanfu = function () {

            self.setState({isSHowXuanfu:false});

            $(self.refs.xiaodianshi).attr("src","/pages/adminavatar.html");

        };
        window.onUpDone = function (picurl,realW,realH) {

            var realW = parseInt(realW);
            var realH = parseInt(realH);
            // 得到图片的宽高比
            var rate = realW / realH;
            // 定义一些常量
            const maxBoxwidth = 700;
            const minBoxwidth = 450;
            const maxBoxHeight = 500;
            const minBoxHeight = 350;
            const padding = 10;
            const rightPart = 180;
            // 计算图片要显示的宽度、高度
            var imgW = realW;
            var imgH = realH;
            // 盒子要显示的宽度和高度
            var boxW = null, boxH = null;
            //进行一些范围计算
            if( realW > maxBoxwidth - rightPart - 2 * padding){
                // imgW 和  imgH 是图片显示在弹出层的 宽和高
                imgW = maxBoxwidth - rightPart - 2 * padding;

                // 让图片的高度也变化

                imgH = imgW / rate;
            };
            if( imgH > maxBoxHeight - 2 * padding){

                imgH = maxBoxHeight - 2 * padding;
                //让图片的宽度也变化
                imgW = imgH * rate;
            };
            // 决定盒子的尺寸
            boxW = imgW + 180 + 2*padding;
            boxH = imgH + 2*padding;

            // 验收最小尺寸
            if( boxW < minBoxwidth){
                boxW = minBoxwidth;
            }
            if( boxH < minBoxHeight){

                boxH = minBoxHeight;
            }

            self.setState({
                imgW,
                imgH,
                boxW,
                boxH,
                realW,
                realH,
                padding,
                picurl
            })
        }
    }

    render() {
        return (
            <div>
                <h1>管理员的资料修改</h1>
                <Divider></Divider>
                <Row>
                    <Col span={11}>
                        <MyForm></MyForm>
                    </Col>
                    <Col span={2}><Divider type="vertical" style={{
                        "minHeight":"240px"
                    }} /></Col>
                    <Col span={11}>
                        <iframe src="pages/adminavatar.html" ref="xiaodianshi" frameBorder="0" height="200px"></iframe>
                    </Col>
                </Row>
                {
                    this.state.isSHowXuanfu
                    ?
                    <div className="xuanfuceng">
                        <CutBox
                            imgW = { this.state.imgW}
                            imgH = { this.state.imgH}
                            boxW = { this.state.boxW}
                            boxH = { this.state.boxH}
                            realW = { this.state.realW}
                            realH = { this.state.realH}
                            padding = { this.state.padding}
                            picurl = { this.state.picurl}
                        ></CutBox>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}
