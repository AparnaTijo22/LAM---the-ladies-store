import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/Icons/trash3.svg';

const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItem, removeFromCart} = useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>     
        <hr />           
        {all_product.map((e) =>{
            if(cartItem[e.id] > 0){
                return (<div key={e.id}>
                <div className="cartitems-format cartitems-format-main">
                    <img src={e.image} alt="" className='cartitems-product-icon' />
                    <p>{e.name}</p>
                    <p>₹{e.new_price}</p>
                    <button className="cartitems-quantity">{cartItem[e.id]}</button>
                    <p>₹{e.new_price * cartItem[e.id]}</p>
                    <img className='cartitems-remove-icon' onClick={() => {removeFromCart(e.id)}} src={remove_icon} alt="" />
                </div>
                <hr />
            </div>)
            }
            return null;
        })}
        <div className='cartitems-down'>
            <div className="cartitems-total">
                <h1>Cart Total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>₹{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>₹{getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>You can use your promo code here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='Promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems;