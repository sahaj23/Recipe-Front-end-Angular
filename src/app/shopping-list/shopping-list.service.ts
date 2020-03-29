import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 10),
    new Ingredient("Banana", 5)
  ];
  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingr: Ingredient) {
    this.ingredients.push(ingr);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
  addIngredients(ingrs: Ingredient[]) {
    this.ingredients.push(...ingrs);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
