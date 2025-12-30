import React, {  useState }  from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({url}) => {

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        category:"Coffee", //default
        price:""
    });
    const onChangeHandler=(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData({...data,[name]:value});
    }
    const onSubmitHandler=async(event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",Number(data.price));
        formData.append("category",data.category);
        formData.append("image",image);
        const response = await axios.post(`${url}/api/food/add`,formData);
        if(response.data.success){
          setData({
            name:"",
            description:"",
            category:"Coffee",
            price:""
          })
          setImage(false);
          toast.success(response.data.message);
        }else{
          toast.error(response.data.message);
        };
    }    

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Tên món</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Mô tả</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Type here'></textarea>
        </div>
        <div className="add-caregory-price">
          <div className="add-category flex-col">
            <p>Loại món</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Coffee">Cà phê</option>
              <option value="Tea">Trà</option>
              <option value="Milkshake">Trà sữa</option>
              <option value="Juice">Nước ngọt</option>
              <option value="Dessert">Bánh ngọt</option>
              <option value="Breakfast">Ăn sáng</option>
              <option value="Lunch">Ăn trưa</option>
              <option value="Snack">Ăn vặt</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Giá</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='vnd' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Thêm món</button>
      </form>
    </div>
  )
}

export default Add
