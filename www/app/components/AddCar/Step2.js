import React from 'react';
import { connect } from "dva";
import { Button , Modal ,Progress } from "antd";
class Step2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // 文件的名字
            filename:"",
            // 文件的拓展名
            ext:"",
            // 文件上传的步骤 , 0 表示没有上传 1 正在上传 2表示上传完毕
            upstep:0,
            // 进度的百分比
            percent:0,
            // 真实的文件名字
            real:""
        }
    }
    componentDidMount() {
        var self = this;
        $(this.refs.fileBtn).change(function () {
            self.setState({
                upstep:1,
                filename:this.files[0].name
            });
            // 准备上传的表单对象
            let formData = new FormData();
            formData.append("carfiles",this.files[0]);
            // 调用上传的函数
            uploadFile(formData);
        })
        function uploadFile (formData) {
            var xhr = new XMLHttpRequest();
            // 进度
            xhr.upload.onprogress = function  (event) {

                var percent = 100 * event.loaded / event.total;

                self.setState({
                    percent
                });
            };
            // 上传完毕
            xhr.onload = function () {
                var base = JSON.parse(xhr.responseText).base;
                var ext = JSON.parse(xhr.responseText).ext;
                self.setState({
                    ext,
                    upstep:2,
                    real:base
                });
            }
            // 配置请求类型和地址和是否异步
            xhr.open("POST","http://127.0.0.1:3000/uploaderCarfiles",true);
            // 发送
            xhr.send(formData);

        }
    }
    render() {
        const getImageUrl = (ext)=>{
            if(ext == ".pdf"){

                return "/images/pdf.svg";
            }else if(ext == ".rar"){

                return "/images/rar.svg";
            }else if(ext == ".docx"){

                return "/images/docx.svg";
            }
        }
        return (
            <div>
                <h1>{this.state.filename}</h1>
                <Button onClick={()=>{
                    $(this.refs.fileBtn).trigger('click');
                }}>上传文件</Button>
                <input type="file" hidden ref="fileBtn" />

                <Modal
                  title="正在上传"
                  visible={this.state.upstep == 1}
                >
                  <div>
                    <Progress percent={parseInt(this.state.percent)} status="active" />
                  </div>
                </Modal>

                <Modal
                  title="请确认文件的名字"
                  visible={this.state.upstep == 2}
                  destroyOnClose = {true}
                   onOk={()=>{
                        this.setState({
                            upstep:0
                        })
                        this.props.dispatch({"type":"addCar/addForm2","fileinfo":{
                            "real":this.state.real,
                            "filename":this.state.filename,
                            "ext":this.state.ext
                        }})
                   }}
                >
                  <div style={{"textAlign":"center"}}>
                        <img src={getImageUrl(this.state.ext)} width="200px" alt="" />
                        <h2>{this.state.filename}</h2>
                  </div>
                </Modal>
                <div className="fileBox">

                    <ul>
                        {
                            this.props.form2.map(item=>{
                                return <li
                                    key={item.real}
                                >
                                <img width="50" src={getImageUrl(item.ext)} alt="" />
                                {item.filename}
                                </li>
                            })
                        }
                    </ul>
                </div>
                <Button onClick={()=>{
                    var form0 = this.props.form0;
                    var form1 = this.props.form1;
                    var form2 = this.props.form2;

                    $.ajax({
                        "url":"/addCar",
                        "type":"post",
                        "data":{
                            form0:JSON.stringify(form0),
                            form1:JSON.stringify(form1),
                            form2:JSON.stringify(form2)
                        }
                    });
                }}>创建车辆的订单</Button>
            </div>
        );
    }
}
export default connect(
    ({addCar})=>({
        form0:addCar.form0,
        form1:addCar.form1,
        form2:addCar.form2,
    })
)(Step2);