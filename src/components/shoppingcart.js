import React from 'react';
import Banner from './banner.js';
import ProductList from './productlist.js';
import Cart from './cart.js';
import cartIcon from '../assets/img/cart.jpg';
// 购物车父组件
class ShoppingCart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen:false
        }
    }
    // 通过refs调用子组件cart中的方法
    open(){
        this.refs.getChild.openCart();
        this.refs.getChild.refreshList();
    }
    render(){
        return <div className='shopcart-box'>
            <div className='cart-icon' onClick={()=>this.open()}>
                <img src={cartIcon} alt='1'/>
            </div>
            <Banner />
            <ProductList />
            <Cart ref='getChild'/> 
        </div>
    }
}
export default ShoppingCart;