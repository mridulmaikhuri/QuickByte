export async function fetchRecipes() {
    try {
        const apiResponse = await fetch('https://dummyjson.com/recipes');
        const result = await apiResponse.json();
        return result?.recipes;
    } catch (error) {
        if (typeof error === "string") {
            throw new Error(error);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

const recipes = await fetchRecipes();

export { recipes };
