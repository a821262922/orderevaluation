import React, { Component } from "react";
import OrderItem from '../OrderItem/OrderItem'
import axios from 'axios'
//rcc快速创建

export default class OrderList extends Component {
    constructor(props) {
      super(props)
      
      this.state = {
        dataList:[]
      };
    };
    componentDidMount() {
        let address='https://easy-mock.com/mock/5ce35870f0669a12641d62a3/order/orderList';//easy-mock
        axios.get('/mock/orderList.json')
        .then((res)=>{
            if(res.data.code===0){
                console.log(res.data.msg)
                this.setState({
                    dataList:res.data.result
                })
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    handleSubmit=(id,comment,stars)=>{
        
        //服务器保存todo
        //这里应该在服务器中保存数据后再进行以下操作
        let newData = this.state.dataList.map(item=>{
            return (item.id===id ? {...item,comment,stars,ifCommented:true}:item)
        })
        this.setState({
            dataList:newData
        })
    }
  render() {
    return (
      <div>
        {
            this.state.dataList.map((item,key)=>{
                return(
                    <OrderItem data={item} key={item.id} onSubmit={this.handleSubmit}/>
                )
            })
        }
      </div>
    );
  }
}
