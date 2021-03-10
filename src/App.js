import React,{useEffect, useState}  from "react";
import Recipe from './Recipe';
import logo from './logo.png';
import './App.css';
import Dropdown from './dropdown.js';
import './dropdown.css';
import recipes from './recipes.json'



function App() {
 
  const APP_ID = "d4772798";
  const APP_KEY = "aeb29f3f7c9e76d9af0d924a1a5b4672";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(""); 
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      'https://api.edamam.com/search?q=' +query+ '&app_id=' +APP_ID+ '&app_key=' +APP_KEY                 

    );

    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };


  const[value, setValue] = useState(null) //-for dropdown
  return (
    <div className="App">
       <img className ="logo" src={logo} alt="logo"/>
       <form className="search-form" onSubmit={getSearch}>
       <input className="search-bar"
         type="text"
          value={search}
          onChange={(e) => updateSearch(e)} />
         <button className="search-button" type="submit">
          Search
        </button>
    </form>

   
  <div className= "Dropdown" style={{ width: 700}}>
   <Dropdown 
    prompt='Select recipe...'
    options={recipes} 
    id='id'
    label='name'
    value={value}
    onChange={val => setValue}>
     </Dropdown>
 </div>
    
  
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            ingredients={recipe.recipe.ingredients}
            servings={recipe.recipe.yield}
            time={recipe.recipe.totalTime}
            directions= {recipe.recipe.url}
            image={recipe.recipe.image} />
        ))}
      </div>
    </div>
  );  
}
  
   export default App;

 
