import React,{useEffect, useState}  from "react";
import Recipe from './Recipe';
import logo from './logo.png';
import './App.css';
import Dropdown from './dropdown.js';
import './dropdown.css';
import recipes from './recipes.json'




export default function Dropdown_app() {

 const[value, setValue] = useState(null) //-for dropdown
 
 return(
 <div style={{ width: 700}}>
 <Dropdown 
  prompt='Select recipe...'
  options={recipes} 
  id='id'
  label='name'
  value={value}
  onChange={val => setValue(val)}>
   </Dropdown>
   </div>);
   } 