import React, { Component } from 'react';
import './App.css';
import ShoppingCart from './components/shoppingcart.js';
import './assets/css/shopcart.css';
import './assets/css/reset.css';
// 父节点，渲染父元素和购物车父组件
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <nav>导航</nav> */}
        <ShoppingCart /> 
      </div>
    );
  }
}

export default App;
