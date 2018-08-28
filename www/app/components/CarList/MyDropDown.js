import React from 'react';
import { Menu, Dropdown, Button, Icon, message } from 'antd';
export default class MyDropDown extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const menu = (
          <Menu onClick={(v)=>{this.props.onChoose(v.key)}}>
            {
                this.props.option.map(item=>{
                    return <Menu.Item key={item}>{item}</Menu.Item>
                })
            }
          </Menu>
        );
        return (
            <div className="myDropDown">
                {this.props.title}
                {" "}
                <Dropdown.Button overlay={menu}>
                      {this.props.v || "不限"}
                </Dropdown.Button>
            </div>
        );
    }
}
