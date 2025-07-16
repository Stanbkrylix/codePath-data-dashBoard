import { useEffect, useState } from "react";

import "./App.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const URL = `https://api.spoonacular.com/recipes/complexSearch?&number=20&apiKey=${ACCESS_KEY}`;
const URL2 = `https://api.spoonacular.com/recipes/${716429}/information?apiKey=${ACCESS_KEY}`;

function App() {
    const [recipe, setRecipes] = useState([]);
    const [originalRecipe, setOriginalRecipe] = useState([]);
    const [filterSearchInput, setFilterSearchInput] = useState("");

    function getRecipe() {
        async function fetchData() {
            try {
                const response = await fetch(URL);
                const data = await response.json();
                setRecipes(data.results);
                setOriginalRecipe(data.results);
                console.log(recipe);
            } catch (error) {
                console.log("ERROR", error);
            }
        }
        fetchData();
    }
    useEffect(() => {
        // async function fetchData() {
        //     try {
        //         const response = await fetch(URL);
        //         const data = await response.json();
        //         setRecipes(data.results);
        //         console.log(recipe);
        //     } catch (error) {
        //         console.log("ERROR: ", error);
        //     }
        // }
        // fetchData();
    }, []);

    return (
        <>
            <button onClick={getRecipe}>Populate Recipe</button>
            <div className="main-container">
                {/*  */}
                <div className="menu-container">
                    <h1 style={{ color: "#b68d40" }}>Food Recipes</h1>
                    <button
                        className="home-btn"
                        onClick={() => {
                            console.log(recipe, originalRecipe);
                        }}
                    >
                        <img src="/assets/home.svg" alt="" />{" "}
                        <span>Dashboard </span>
                    </button>
                    <button className="menu-btn">
                        <img src="/assets/search.svg" alt="" />
                        <span> Search </span>
                    </button>
                </div>

                {/*  */}
                <div className="recipes-container">
                    <h1>Recipe Cards</h1>
                    <div className="search-filter-container">
                        <input type="text" placeholder="search-recipe" />
                    </div>
                    <div className="recipe-cards-container">
                        {recipe.map((card, index) => (
                            <Card key={index} card={card} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

function Card({ card }) {
    return (
        <div className="card-recipe">
            <img src={card.image} alt="" className="card-recipe-img" />
            <div className="card-recipe-details">
                <p className="recipe">Recipe</p>
                <p className="card-title">{card.title}</p>
                <button className="card-info">Details</button>
            </div>
        </div>
    );
}

export default App;
