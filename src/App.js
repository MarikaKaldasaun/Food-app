import React,{useEffect, useState}  from "react";
import Recipe from './Recipe';
import logo from './logo.png';
import './App.css';

//got that working without axios, did not incorporate yet - I was making too many requests to API=>CORS error

function App() {
 
  const APP_ID = "d4772798";
  const APP_KEY = "aeb29f3f7c9e76d9af0d924a1a5b4672";

  const [recipes, setRecipes] = useState([]);//setRecipes=data.hits - recipe info from API
  const [search, setSearch] = useState(""); //searcbar renders when the vale is changed
  const [query, setQuery] = useState('chicken');//query is going to update the page only when clicking submit button

  //making a request from API: when the page rerenders itself, useEffect is going to run
  useEffect(() => {

    const getRecipes = async () => {
      const response = await fetch(
        'https://api.edamam.com/search?q=' +query+ '&app_id=' +APP_ID+ '&app_key=' +APP_KEY                 
  
      ); //await - because the data doesn't come instantly from the API
  
      const data = await response.json(); //data coming back in json form
      setRecipes(data.hits);
      console.log(data.hits);
    };//data of objects (recipes) is under "hits"

    getRecipes();
  }, [query]);
  
  console.log({recipes});

 
//every time you click(onChange), the event will get updated(update the value of the search)
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => { //event getSearch is going to be on search-form
    e.preventDefault(); //prevents constant page refresh
    setQuery(search); 
    setSearch(""); //gets finished updated value on my input
  };


  return (
    <div className="App">
       <img className ="logo" src={logo} alt="logo"/>
       <form className="search-form" onSubmit={getSearch}>
       {/* <input className="search-bar"//select
         type="text"
          value={search}
          onChange={(e) => updateSearch(e)} /> */}

            {/* <input className="search-bar"//select
         type="text"
          value={search}
          onChange={(e) => updateSearch(e)} /> */}
          {/* <select name="cars" id="cars"  onChange={(e) => updateSearch(e)}>
  <option value="chicken">chicken</option>
  <option value="lamb">lamb</option>
  <option value="pasta">pasta</option> */}


{/* </select> */}

<input type="text" name="recipe" list="recipe" value={search}
          onChange={(e) => updateSearch(e)}/>
    <datalist id="recipe">
      <option value="chicken">chicken</option>
      <option value="lamb">lamb</option>
    </datalist> 


         <button className="search-button" type="submit">
          Search
        </button>
    </form>
 
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <Recipe //the props:
            key={index}
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

 
