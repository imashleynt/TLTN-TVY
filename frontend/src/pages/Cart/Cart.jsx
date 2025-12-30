import React, { useContext } from 'react'
import './Cart.css'
import {StoreContext} from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

export const Cart = () => {

  const {cartItems, food_list, removeFromCart, getTotalCartAmount,url} = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className='cart'>
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item,index)=>{
            if(cartItems[item._id]>0)
            {
              return (
                <div key={item._id}>
                    <div className='cart-items-title cart-items-item'>
                      <img src={url+"/images/"+item.image} alt={item.name} />
                      <p>{item.name}</p>
                      <p>{item.price}đ</p>
                      <p>{cartItems[item._id]}</p>
                      <p>{item.price*cartItems[item._id]}đ</p>
                      <p onClick={()=> removeFromCart(item._id)} className='cross'>x</p>
                    </div>
                    <hr />
                </div>
              )
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>TOTAL</h2>
            <div>
              <div className="cart-total-details">
                <p>Tổng đơn</p>
                <p>{getTotalCartAmount()}đ</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Phí vận chuyển</p>
                <p>{getTotalCartAmount()===0?0:2}đ</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Tổng cộng</p>
                <p>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}đ</p>
              </div>
            </div>
            <button onClick={() => navigate('/order')}>THANH TOÁN</button>
          </div>
          
          <div className="cart-redeemcode">
            <p>Nhập mã tại đây</p>
            <div className="cart-redeemcode-input">
              <input type="text" placeholder='Đổi mã' />
              <button>Submit</button>
            </div>
          </div>
        </div>
    </div>
  )
}
export default Cart