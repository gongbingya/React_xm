import React from 'react';
import moment from "moment";
// 这个是table的列，是table的"大仓库"；
export default[{
  title: '编号',
  dataIndex: 'id',
  key: 'id',
  sorter:true
}, {
  title: '缩略图',
  dataIndex: 'avatar',
  key: 'avatar',
  render(text, record, index){
        return <img style={{"width":"80px"}} className="souluetu" data-id={record.id} src={`carimages_small/${record.id}/view/${text}`} />
  }
}, {
  title: '车系',
  dataIndex: 'brand',
  key: 'brand',
  render(text, record, index){
        return record.brand + record.series;
  }
},{
  title: '购买日期',
  dataIndex: 'buydate',
  key: 'buydate',
  render(text, record, index){
        return moment(Number(text)).format("YYYY年MM月");
  },
  sorter:true
}, {
  title: '里程',
  dataIndex: 'km',
  key: 'km',
  render(text, record, index){
        return Math.round(text/10000);
  },
  sorter:true
}, {
  title: '售价',
  dataIndex: 'price',
  key: 'price',
  sorter:true
},{
  title: '颜色',
  dataIndex: 'color',
  key: 'color',
}, {
  title: '发动机',
  dataIndex: 'engine',
  key: 'engine',
  sorter:true
}, {
  title: '排放',
  dataIndex: 'exhaust',
  key: 'exhaust',
},{
  title: '燃料',
  dataIndex: 'fuel',
  key: 'fuel',
}, {
  title: '变速箱',
  dataIndex: 'gearbox',
  key: 'gearbox',
}, {
  title: '车型',
  dataIndex: 'type',
  key: 'type',
},{
  title: '座位数',
  dataIndex: 'seat',
  key: 'seat',
  sorter:true
}, {
  title: '是否上牌',
  dataIndex: 'license',
  key: 'license',
  render(text, record, index){
        return text ? <span>是</span> : <span>否</span>
  }
}, {
  title: '车主ID',
  dataIndex: 'ownerID',
  key: 'ownerID',
}];