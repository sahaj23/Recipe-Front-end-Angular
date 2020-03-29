import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  constructor(private slService: ShoppingListService) {}
  private recipes: Recipe[] = [
    new Recipe(
      "Butter Chicken",
      "Best dish in the world",
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/Handi-chicken-recipe.jpg",
      [
        new Ingredient("Chicken", 1),
        new Ingredient("Milk", 1),
        new Ingredient("Butter", 3)
      ]
    ),
    new Recipe(
      "Burger",
      "Patty put between bun",
      "https://image.cnbcfm.com/api/v1/image/106152658-1569589928424pltstill-twitterlinkedin.jpg?v=1569589970&w=678&h=381",
      [new Ingredient("Bun", 2), new Ingredient("Meat", 1)]
    )
  ];
  getRecipes() {
    return this.recipes.slice(); //returns only a copy
  }
  onAddToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}