import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  constructor(private slService: ShoppingListService) {}
  isChangeSub: Subscription;
  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.isChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingrs: Ingredient[]) => {
        this.ingredients = this.slService.getIngredients();
      }
    );
  }
  ngOnDestroy(): void {
    this.isChangeSub.unsubscribe();
  }
}
