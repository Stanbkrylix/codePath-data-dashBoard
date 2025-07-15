import { useEffect, useState } from "react";

import "./App.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const URL = `https://api.spoonacular.com/recipes/complexSearch?&number=20&apiKey=${ACCESS_KEY}`;
const URL2 = `https://api.spoonacular.com/recipes/${716429}/information?apiKey=${ACCESS_KEY}`;

function App() {
    const [recipe, setRecipes] = useState([]);

    function getRecipe() {
        async function fetchData() {
            try {
                const response = await fetch(URL);
                const data = await response.json();
                setRecipes(data.results);
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
        </>
    );
}

export default App;
