import {createAction, createReducer} from '@reduxjs/toolkit';
import axios from 'axios';



const intitialState = {
 products: [],
 categories: [],
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

export default createReducer(intitialState, (builder)=>{
        builder
        .addCase('GET_CATEGORIES',(state,action)=>{
         state.categories = action.payload
            
        })
      
})


