import React from 'react';
import { connect } from "dva";
import { Table , Row , Col , Button,Divider ,Input} from "antd";
class UserList extends React.Component {

    constructor(props){
        super(props);
        props.dispatch({"type":"userlist/init"});
    }
    render(){
        const columns = [
            {
                title:"编号",
                dataIndex:"id",
                key:"id",
                sorter:true
            },
            {
                title:"姓名",
                dataIndex:"name",
                key:"name",
                sorter:true
            },
            {
                title:"手机号",
                dataIndex:"mobile",
                key:"mobile"
            }
            ,{
                title:"性别",
                dataIndex:"sex",
                key:"sex"
            },{
                title:"邮箱",
                dataIndex:"email",
                key:"email"
            },
            {
                title:"城市",
                dataIndex:"city",
                key:"city",
                sorter:true
            },{
                title:"身份证",
                dataIndex:"idcard",
                key:"idcard"
            },


        ]
        return <div>
            <h1>用户的信息</h1>
            <Divider />
            <Input
            placeholder = "请输入查询的关键字"
            onChange ={(e)=>{
                this.props.dispatch({"type":"userlist/changeKeyword","keyword":e.target.value})
            }}/>
            <small>共{this.props.pagination.total}条信息</small>
            <Table
                dataSource={this.props.users}
                columns={columns}
                rowKey= "id"
                onChange = {(pagination, filters, sorter)=>{
                    if( sorter.order != this.props.sorter.sortdirection || sorter.field != this.props.sorter.sortby){
                        this.props.dispatch({
                            "type":"userlist/changeSort",
                            "sortby": sorter.field || "id",
                            "sortdirection":sorter.order || "ascend"
                        });
                    };
                    if( pagination.current != this.props.pagination.page || pagination.pageSize != this.props.pagination.pagesize){
                        this.props.dispatch({
                            "type":"userlist/changePage",
                            "page":pagination.current,
                            "pagesize":pagination.pageSize
                        });
                    }
                }}
                pagination = {{
                    current : this.props.pagination.page,
                    total : this.props.pagination.total,
                    pageSize : this.props.pagination.pagesize,
                    showSizeChanger : true,
                    pageSizeOptions : ["3","5","20","50","100"]
                }}
            />
        </div>
    }
}
export default connect(
    ({userlist}) =>({
        users:userlist.users,
        pagination:userlist.pagination,
        sorter:userlist.sorter
    })

)(UserList);