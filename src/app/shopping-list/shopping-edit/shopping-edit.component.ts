import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("ingrName", { static: true }) ingrName: ElementRef;
  @ViewChild("ingrAmount", { static: true }) ingrAmount: ElementRef;
  constructor(private slService: ShoppingListService) {}

  ngOnInit() {}
  onAddIngr() {
    const name = this.ingrName.nativeElement.value;
    const amount = this.ingrAmount.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.slService.addIngredient(ingredient);
  }
}
