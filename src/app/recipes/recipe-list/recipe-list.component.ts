import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      "Butter Chicken",
      "Best dish in the world",
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/Handi-chicken-recipe.jpg"
    ),
    new Recipe(
      "Burger",
      "Patty put between bun",
      "https://get.pxhere.com/photo/dish-food-recipe-snack-fast-food-cuisine-sandwich-vegetarian-food-baked-goods-power-supply-junk-food-beirut-mediterranean-food-finger-food-european-food-breakfast-sandwich-american-food-1375814.jpg"
    )
  ];
  constructor() {}

  ngOnInit() {}
}
