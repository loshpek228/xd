import {createAction, createReducer} from '@reduxjs/toolkit';
import axios from 'axios';



const intitialState = {
 products: [],
 categories: [],
 cart: [],
}







export const getCategories = () =>{
    let action = createAction('GET_CATEGORIES');
    return (dispatch) =>{
        axios('https://fakestoreapi.com/products/categories')
        .then(({data})=> {
           dispatch(action(data))
        })
    }
};


export const addCart = createAction('ADD_CART');


export const deleteCart = createAction('DELETE_CART');


export const decrementCart = createAction('DECREMENT_CART')

export default createReducer(intitialState, (builder)=>{
        builder
        .addCase('GET_CATEGORIES',(state,action)=>{
         state.categories = action.payload
            
        })
      .addCase('ADD_CART',(state,action)=>{
        const product = action.payload;
        const idx = state.cart.findIndex((item)=>{
            return item.id === product.id
        });
        if(idx > -1){
            state.cart[idx].count++
            state.cart = [...state.cart]
        } else {
            state.cart = [{
               ...product,
               count: 1
            }, ...state.cart]
        }
      })
      .addCase('DELETE_CART',(state,action)=>{
        state.cart = state.cart.filter(item =>{
            return item.id !== action.payload.id
        })
      }).addCase('DECREMENT_CART',(state,action) =>{
        if(action.payload.count > 1){
            state.cart = state.cart.map(item=>{
                if(item.id === action.payload.id){
                    return{
                        ...item,
                        count: item.count -1
                    }
                }else{
                    return(
                        item
                    )
                }
            })
        } else{
            state.cart = state.cart.filter(item =>{
                return item.id !== action.payload.id
            })        }
      })
})


