import React from 'react';
// 购物车组件
class Cart extends React.Component{
    // 在组件构造函数中初始化数据
    constructor(props){
        super(props);
        this.state = {
            carts:[],
            isOpen:false
        }
    }
    //定义页面操作所需要用到的方法
    //关闭购物车方法
    closeCart(){
        this.setState({
            isOpen:false
        })
    }
    //打开购物车方法
    openCart(){
        this.setState({
            isOpen:true
        })
    }
    //刷新购物车数据
    refreshList(){
        fetch('http://localhost:8081/cart?kind=select',{
            method:'GET',
            mode:'cors'
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data);
            this.setState({
                carts:data
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    //减少商品数量
    down(cid,index){
        var carts = this.state.carts;
        if(carts[index].count>1){
            carts[index].count --; 
            fetch('http://localhost:8081/cart?kind=update&cid='+cid+'&count='+carts[index].count,{
                method:'GET',
                mode:'cors'
            }).then((res)=>{
                return res.json();
            }).then(()=>{
                this.setState({
                    carts:carts
                })
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
    //增加商品数量
    up(cid,index){
        var carts = this.state.carts;
        carts[index].count ++; 
        fetch('http://localhost:8081/cart?kind=update&cid='+cid+'&count='+carts[index].count,{
            method:'GET',
            mode:'cors'
        }).then((res)=>{
            return res.json();
        }).then(()=>{
            this.setState({
                carts:carts
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    //删除购物车中指定商品
    delete(cid){
        fetch('http://localhost:8081/cart?kind=delete&cid='+cid,{
            method:'GET',
            mode:'cors'
        }).then((res)=>{
            return res.json();
        }).then(()=>{
            this.refreshList();
        }).catch((err)=>{
            console.log(err);
        })
    }
    yes(){
        alert("buy success!");
    }
    //组件加载完成后，刷新列表
    componentDidMount(){
        this.refreshList();
    }
    render(){
        var cartList = this.state.carts.map((item,index)=>(
            <li className='pro-box' key={index}>
                <div className='cart-img'>
                    <img src={item.pavatar} alt=''/>
                </div>
                <div className='cart-title'>{item.pname}</div>
                <div className='cart-price'>${(item.price*item.count).toFixed(2)}</div>
                <div className='cart-count'>
                    <span className='down' onClick={()=>this.down(item.cid,index)}>-</span>
                    <span className='count'>{item.count}</span>
                    <span className='up' onClick={()=>this.up(item.cid,index)}>+</span>
                </div>
                <div className='go-buy' onClick={()=>this.yes()}>BUY</div>
                <div className='remove' onClick={()=>this.delete(item.cid)}>DELETE</div>
            </li>
        ))
        //通过数据isOpen的状态判断组件需要渲染的内容，来控制组件的显示和隐藏
        if(this.state.isOpen === true){
            return <div className='cart-box'>
                <div>CART</div>
                <span onClick={()=>this.closeCart()}>×</span>
                <span onClick={()=>this.refreshList()} className='refreash'>refresh</span>
                <ul>
                    {cartList}
                </ul>
            </div>
        }else{
            return null;
        }
        
    }
}
export default Cart;