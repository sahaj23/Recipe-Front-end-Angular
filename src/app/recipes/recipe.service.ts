import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      "Butter Chicken",
      "Best dish in the world",
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/Handi-chicken-recipe.jpg"
    ),
    new Recipe(
      "Burger",
      "Patty put between bun",
      "https://image.cnbcfm.com/api/v1/image/106152658-1569589928424pltstill-twitterlinkedin.jpg?v=1569589970&w=678&h=381"
    )
  ];
  getRecipes() {
    return this.recipes.slice(); //returns only a copy
  }
}
