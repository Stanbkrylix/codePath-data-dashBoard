import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function FoodRecipe() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        async function fetchRecipe() {}

        fetchRecipe();
    }, []);

    return (
        <div className="card-details">
            <img src={details.image} alt="" className="card-details-img" />
            <h2>{details.title}</h2>
            <div className="instruction-div">
                <h3>Vegan friendly: {details.vegan ? "Yes" : "No"}</h3>
                <h3>Gluten free: {details.glutenFree ? "Yes" : "No"}</h3>
                <h3>Instructions:</h3>
                {details.analyzedInstructions[0]?.steps.map((item) => (
                    <p key={item.number}>
                        Step {item.number}: {item.step}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default FoodRecipe;
