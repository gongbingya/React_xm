import React from 'react';
import { connect } from "dva"
import { Form , Input ,Cascader,DatePicker,Select  } from "antd";
import carBrandAndSeries from "./api/carBrandAndSeries.js"
const FormItem = Form.Item;
const Option = Select.Option;
class Step0Form extends React.Component {

  constructor(props) {
    super(props);
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
    const options = (function () {
      var arr = [];
      for(let k in carBrandAndSeries){
        arr.push({
          "value":k,
          "label":k,
          "children":(function(){
            var arr = [];
            for (let i = 0; i < carBrandAndSeries[k].length; i++) {
                arr.push({
                  "value":carBrandAndSeries[k][i].name,
                  "label":carBrandAndSeries[k][i].name,
                  "children":(function () {
                      var arr = [];
                      for (let j = 0; j < carBrandAndSeries[k][i].series.length; j++){
                          arr.push({
                            "value":carBrandAndSeries[k][i].series[j],
                            "label":carBrandAndSeries[k][i].series[j]
                          })
                      }

                      return arr;
                  })()
                })
            };

            return arr;
          })()
        })
      }
      return arr;
    })();
    return (
      <div>
          <Form layout="inline">
            <FormItem
              {...formItemLayout}
              label="品牌和车系"
            >
              {getFieldDecorator('brandandSeries', {
                rules: [
                  {required: true, message:"请必须填写本项！"}
                ],
              })( <Cascader options={options} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="购买日期"
            >
              {getFieldDecorator('buydate', {
                rules: [
                  {required: true, message:"请必须填写本项！"},
                ],
              })(<DatePicker style={{ "width": "200px" , "float":"left"}}/>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="里程表读数（公里）"
              extra = "公司规定补鞥填写虚假信息，否则报警处理! 一经发现，绝不姑息！！"
            >
              {getFieldDecorator('km', {
                rules: [
                  {pattern: /^\d+$/, message:"请输入数字！"},
                  {required: true, message:"请必须填写本项！"},
                ],
              })(<Input/>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="卖家最低售价"
              extra = "卖家所能承受的最低价格"
            >
              {getFieldDecorator('price1', {
                rules: [
                  {pattern: /^\d+$/, message:"请输入数字！"},
                  {required: true, message:"请必须填写本项！"},
                ],
              })(<Input/>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="卖家最高售价"
              extra = "卖家所能承受的最高价格！！"
            >
              {getFieldDecorator('price2', {
                rules: [
                  {pattern: /^\d+$/, message:"请输入数字！"},
                  {required: true, message:"请必须填写本项！"},
                ],
              })(<Input/>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="座位数"
            >
              {getFieldDecorator('seat', {
                rules: [
                  {pattern: /^\d+$/, message:"请输入数字！"},
                  {required: true, message:"请必须填写本项！"},
                ],
              })(<Input/>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="车的颜色"
            >
              {getFieldDecorator('color', {
                rules: [
                  {pattern:/^[\u2E80-\u9FFF]+$/,message:"请填写颜色！"},
                  {required: true, message:"请必须填写本项！"},

                ],
              })(<Input/>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="燃料"
            >
              {getFieldDecorator('fuel', {
                rules: [
                  {required: true, message:"请必须填写本项！"},
                ],
              })(
                  <Select
                      style={{ "width": "200px" , "float":"left"}}
                  >
                      <Option value="汽油">汽油</Option>
                      <Option value="柴油">柴油</Option>
                      <Option value="油电混合">油电混合</Option>
                      <Option value="纯电动">纯电动</Option>
                  </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="排放标准"
            >
              {getFieldDecorator('exhaust', {
                rules: [
                  {required: true, message:"请必须填写本项！"},
                ],
              })(
                <Select
                    style={{ "width": "200px" , "float":"left"}}
                >
                    <Option value="国一">国一</Option>
                    <Option value="国二">国二</Option>
                    <Option value="国三">国三</Option>
                    <Option value="国四">国四</Option>
                    <Option value="国五">国五</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="变速箱"
            >
              {getFieldDecorator('gearbox', {
                rules: [
                  {required: true, message:"请必须填写本项！"}
                ],
              })(
                <Select
                    style={{ "width": "200px" , "float":"left"}}
                >
                    <Option value="自动">自动</Option>
                    <Option value="手动">手动</Option>
                    <Option value="手自动">手自动</Option>
                </Select>
              )}
            </FormItem>
          </Form>
      </div>
    );
  }
}
export default connect()(Step0Form);