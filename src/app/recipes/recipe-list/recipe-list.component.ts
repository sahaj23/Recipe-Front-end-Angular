import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
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
  constructor() {}

  ngOnInit() {}
  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
