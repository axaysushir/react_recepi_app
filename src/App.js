import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "add your edamam app id here given on dash board";
  const APP_KEY = "add your edamam app key here ";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chiken');



  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=$(query)&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }
  return (
    <div className="App">
      <h1>Hello React Recipe App</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" onChange={updateSearch} type="text" value={search}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
        
      ))}
      </div>
    </div>
  );
};

export default App;
