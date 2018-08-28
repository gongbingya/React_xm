import React from 'react';
import { connect } from "dva";
import {Row,Col,Button} from "antd";
class Step1 extends React.Component {

    constructor(props) {
        super(props);
        this.maps = {
            "view":{},
            "inner":{},
            "engine":{},
            "more":{}
        }
        this.viewamount = 0;
    }
    componentDidMount() {
        var self = this;

        var $dropzone = $(".dropzone");

        $dropzone.bind("dragover",function (event) {
                event.preventDefault();
                $(this).addClass('over');
        })
        $dropzone.bind("dragleave",function (event) {
                event.preventDefault();
                $(this).removeClass('over');
        })
        $dropzone.bind("drop",function (event) {
                event.preventDefault();

                $(this).removeClass('over');
                // 文件对象
                var files = event.originalEvent.dataTransfer.files;

                createFileArrAndUploader(files,$(this).data("album"))

        });
        // 监听上传按钮的模拟触发的事件
        $(this.refs.viewfileBtn).click(function () {
            $(self.refs.viewfile).trigger('click');
        });
        $(this.refs.innerfileBtn).click(function () {
            $(self.refs.innerfile).trigger('click');
        });
        $(this.refs.enginefileBtn).click(function () {
            $(self.refs.enginefile).trigger('click');
        });
        $(this.refs.morefileBtn).click(function () {
            $(self.refs.morefile).trigger('click');
        });
        // 监听上传文件控件的改变
        this.refs.viewfile.onchange = function () {
            createFileArrAndUploader(this.files,"view")
        };
        this.refs.innerfile.onchange = function () {
            createFileArrAndUploader(this.files,"inner")
        };
        this.refs.enginefile.onchange = function () {
            createFileArrAndUploader(this.files,"engine")
        };
        this.refs.morefile.onchange = function () {
            createFileArrAndUploader(this.files,"more")
        };

        // 可以排序
        $(".dropzone").sortable();
        function createFileArrAndUploader (files,album) {

            for (var i = 0; i < files.length; i++) {
                // 编号
                let no = self.viewamount++;
                // html5的表单对象
                let formData = new FormData();
                // 追加文件
                formData.append("viewpics",files[i]);
                // 请XML2.0出场，来发送文件
                uploadFile(formData,album,no)

                // html5中的新的对象 可以读取文件
                let reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = function (event) {
                    var tempStr = `<div data-no=${no} class="${album} previewimgbox" style="background-image: url(${event.target.result});"><em></em></div>`

                    $(".dropzone[data-album = "+ album +"]").append($(tempStr))
                }
            };
        };
        function uploadFile (formData,album,no) {
           var xhr = new XMLHttpRequest();
           xhr.upload.onprogress = function (event) {

               var percent = 100 * event.loaded/event.total;

               // 文字标签
               var $em = $(".previewimgbox."+album+"[data-no="+no+"]").find("em");

              $em.html("图片正在上传"+ parseInt(percent) + "%" );
              if(percent == 100){
                $em.hide();
              }
           }
           xhr.onload = function (){
             var $em = $(".previewimgbox."+album+"[data-no="+no+"]").find("em");
             self.maps[album][no] = JSON.parse(xhr.responseText).base;
           }
           // 配置请求的类型
           xhr.open("POST","http://127.0.0.1:3000/uploadCarimages",true);
           //发送
           xhr.send(formData)
        }
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <h3>请上传【外观图片】，点击上传按钮或拖放到方框内</h3>
                    </Col>
                    <Col span={6}>
                        <input ref="viewfile" hidden type="file" multiple="multiple"/>
                        <span ref="viewfileBtn" className="addBtn">+</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="dropzone" data-album= "view"></div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <h3>请上传【内饰图片】，点击上传按钮或拖放到方框内</h3>
                    </Col>
                    <Col span={6}>
                        <input hidden type="file" multiple="multiple" ref="innerfile"/>
                        <span ref="innerfileBtn" className="addBtn">+</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="dropzone" data-album= "inner"></div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <h3>请上传【结构和发动机图片】，点击上传按钮或拖放到方框内</h3>
                    </Col>
                    <Col span={6}>
                        <input hidden type="file" multiple="multiple" ref="enginefile"/>
                        <span ref="enginefileBtn" className="addBtn">+</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="dropzone" data-album= "engine"></div>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <h3>请上传【更多细节图片】，点击上传按钮或拖放到方框内</h3>
                    </Col>
                    <Col span={6}>
                        <input hidden type="file" multiple="multiple" ref="morefile"/>
                        <span ref="morefileBtn" className="addBtn">+</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="dropzone" data-album= "more"></div>
                    </Col>
                </Row>

                <Button type="primary" className="step2Btn" onClick={()=>{
                    var picArrObj = {
                            "view":[],
                            "inner":[],
                            "engine":[],
                            "more":[]
                    }
                    var self = this;

                    $(".dropzone[data-album=view]").find(".previewimgbox").each(function(){
                        picArrObj["view"].push(self.maps["view"][$(this).data("no")])
                    })
                    $(".dropzone[data-album=inner]").find(".previewimgbox").each(function(){
                        picArrObj["inner"].push(self.maps["inner"][$(this).data("no")])
                    })
                    $(".dropzone[data-album=engine]").find(".previewimgbox").each(function(){
                        picArrObj["engine"].push(self.maps["engine"][$(this).data("no")])
                    })
                    $(".dropzone[data-album=more]").find(".previewimgbox").each(function(){
                        picArrObj["more"].push(self.maps["more"][$(this).data("no")])
                    });

                    this.props.dispatch({"type":"addCar/changeForm1","form1":picArrObj})
                    this.props.dispatch({"type":"addCar/changeStep","step":2})

                }}>下一步</Button>
             </div>
        );
    }
}
export default connect()(Step1);