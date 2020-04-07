import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  constructor(private slService: ShoppingListService) {}
  private recipes: Recipe[] = [];
  getRecipes() {
    return this.recipes.slice(); //returns only a copy
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  onAddToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
