import React, { useContext, useEffect, useState} from 'react' 
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PlaceOrder = () => {

  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext); 
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    district: "",
    city: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data, [name]: value}));
  }

  const PlaceOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){ 
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]; 
        orderItems.push(itemInfo);
      }
    })  
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+30000, 
    }
    let response = await axios.post(url +"/api/orders/placeorder", orderData, {headers:{token}}); 
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Đặt món thất bại, vui lòng thử lại!");
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate('/cart');
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart');
    }
  }, [token])
  
  return (
    <form onSubmit={PlaceOrder} className='place-order'>
      <div className="place-order-left">
          <h2 className='title'>INFOMATION</h2>
          <div className="multi-field">
            <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
            <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
          </div>
          <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email'/>
          <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
          <div className="multi-field">
            <input required name="district" onChange={onChangeHandler} value={data.district} type="text" placeholder='District'/>
            <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
          </div>
          <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
      </div>

      <div className="place-order-right">
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
              <p>{getTotalCartAmount()===0?0:30000}đ</p> 
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Tổng cộng</p>
              <p>{getTotalCartAmount()===0?0:getTotalCartAmount()+30000}đ</p> 
            </div>
          </div>
        <button type='submit'>THANH TOÁN</button>
        </div>
      </div>
    </form>
  )
}
export default PlaceOrder