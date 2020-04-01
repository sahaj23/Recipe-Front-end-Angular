import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 10),
    new Ingredient("Banana", 5)
  ];
  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingr: Ingredient) {
    this.ingredients.push(ingr);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingrs: Ingredient[]) {
    this.ingredients.push(...ingrs);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
