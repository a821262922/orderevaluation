import React, { Component } from "react";
import axios from 'axios'
//rcc快速创建
import './style.css'
export default class OrderList extends Component {
    constructor(props) {
      super(props)
      this.state = {
        stars:props.data.stars||0,
        editing:false,
        comment:props.data.comment||''
      };
    };
    
    
    handeleCommentChange=(e)=>{
        this.setState({
            comment:e.target.value
        })
    }
    handleClickStars=(stars)=>
    {
        this.setState({
            stars:stars
        })
    }
    handleCommentSumit=()=>{//提交是给OrderList处理的
        let {id}=this.props.data
        let {comment,stars}=this.state
        console.log(id,comment,stars)
        this.setState({
            stars:this.props.data.stars||0,
            editing:false,
            comment:this.props.data.comment||''

        })
        this.props.onSubmit(id,comment,stars)
    }
  render() {
      const {shop,product,price,picture,ifCommented} =this.props.data
    return (
      <div className="orderItem">
        <div className="orderItem_picContainer">
          <img src={picture} className="orderItem_pic" alt=''/>
        </div>
        <div className="orderItem_content">
          <div className="orderItem_produce">{product}</div>
          <div className="orderItem_shop">{shop}</div>
          <div className="orderItem_detail">
            <div className="orderItem_price">{price}</div>
            <div>
            {
                ifCommented ? (<button className="orderItem_btn orderItem_btn--grey">已评价</button>) 
                :
                (<button className="orderItem_btn orderItem_btn--red" onClick={()=>{
                    this.setState({
                        editing:true
                    })
                }}>评价</button>) 
            }
            </div>
          </div>
        </div>
        {this.state.editing ? this.renderEditArea() :null}
      </div>
    );
  }
    renderEditArea(){
        return(
            <div className="orderItem_commentContainer" >
                <textarea className="orderItem_comment"
                    onChange={this.handeleCommentChange}
                    value={this.state.comment}
                />
                {this.renderStarts()}
                <button className="orderItem_btn orderItem_btn--red"
                    onClick={this.handleCommentSumit}
                >提交</button>
                <button className="orderItem_btn orderItem_btn--grey"
                    onClick={()=>{this.setState({editing:false,comment:'',stars:0})}}
                >取消</button>
            </div>
        )
    }
    renderStarts(){
        let {stars} = this.state
        return(
            <div>
            {
                [1,2,3,4,5].map((item,index)=>{
                    let lightClass = stars >= item ? "orderItem_star--light" :''
                    return(
                        <span className={"orderItem_star "+lightClass} key={index} onClick={this.handleClickStars.bind(this,item)}>★</span>
                    )
                })
            }
            </div>
        )
    }
}
