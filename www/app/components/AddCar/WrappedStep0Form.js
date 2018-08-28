import React from 'react';
import Step0Form from "./Step0Form.js";
import { Form } from "antd";
export default Form.create({
        // 映射onChange
      onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
      },
      // 映射state
      mapPropsToFields(props) {
          return {
            km: Form.createFormField({
              ...props.km,
              value: props.km.value,
            }),
            price1: Form.createFormField({
              ...props.price1,
              value: props.price1.value,
            }),
            price2: Form.createFormField({
              ...props.price2,
              value: props.price2.value,
            }),
            seat: Form.createFormField({
              ...props.seat,
              value: props.seat.value,
            }),
            fuel: Form.createFormField({
              ...props.fuel,
              value: props.fuel.value,
            }),
            color: Form.createFormField({
              ...props.color,
              value: props.color.value,
            }),
            gearbox: Form.createFormField({
              ...props.gearbox,
              value: props.gearbox.value,
            }),
            exhaust: Form.createFormField({
              ...props.exhaust,
              value: props.exhaust.value,
            }),
            brandandSeries: Form.createFormField({
              ...props.brandandSeries,
              value: props.brandandSeries.value,
            }),
            buydate: Form.createFormField({
              ...props.buydate,
              value: props.buydate.value,
            })
          };
      }
})(Step0Form);