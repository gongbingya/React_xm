import React from 'react';
import { Form, Icon, Input, Button, Checkbox , Row , Col} from 'antd';
const FormItem = Form.Item;
class MyForm extends React.Component {

    constructor(props) {
        super(props);
    }
    handleSubmit(e){
       e.preventDefault();
       this.props.form.validateFields((err, values) => {
         if (!err) {
           console.log('Received values of form: ', values);
         }
       });
     }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <FormItem
                        {...formItemLayout}
                        label="Email"
                    >
                      {getFieldDecorator('email', {
                        rules: [
                            { type: "email", message: '请输入正确的Email地址!' },
                            { required : true ,message: '本项为必填项，请完成!' }
                        ],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem
                        label= "员工编号"
                        {...formItemLayout}
                    >
                      {getFieldDecorator('adminid', {
                        rules: [
                            { required : true ,message: '本项为必填项，请完成!' },
                            {pattern:/^\d{5}$/ , message :"请输入5位正确的员工编号！"}
                        ],
                      })(
                        <Input prefix={<Icon type="smile"/>} />
                      )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                    >
                      <Row>
                        <Col span={2} offset={16} >
                            <Button type="primary" htmlType="submit" className="login-form-button">
                              登录
                            </Button>
                        </Col>
                      </Row>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const WrappedNormalLoginForm = Form.create()(MyForm);

export default WrappedNormalLoginForm;