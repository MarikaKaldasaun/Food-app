import React from "react";
import style from './recipe.module.css';


const Recipe = ({title,ingredients, servings, time, directions, image}) => {
return(
  <div className={style.recipe}>
      <h1>{title}</h1>
      <ol> 
          {ingredients.map(ingredient => (
              <li>{ingredient.text}</li>
          ))}
      </ol>
      <p>Servings {servings}</p> 
      <p> {time} min</p>
      <a href={directions} target='_blank' rel='noreferrer'>  Link to original recipe </a>
      <img className={style.image} src={image} alt=""/>
  </div>  
);  
}
export default Recipe;