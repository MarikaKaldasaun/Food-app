import React,{useEffect, useState}  from "react";
import Recipe from './Recipe';
import logo from './logo.png';
import './App.css';



function App() {
 
  const APP_ID = "d4772798";
  const APP_KEY = "aeb29f3f7c9e76d9af0d924a1a5b4672";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(""); 
  const [query, setQuery] = useState('chicken');

  useEffect(() => {

    const getRecipes = async () => {
      const response = await fetch(
        'https://api.edamam.com/search?q=' +query+ '&app_id=' +APP_ID+ '&app_key=' +APP_KEY                 
  
      ); //got that working without axios, did not incorporate yet
  
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
    };//data of objects (recipes) is under "hits"

    getRecipes();
  }, [query]);

 

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };


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
 
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            //object in API doesn't have an id, don't know what would be a good key
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

 
