import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("ingrName", { static: true }) ingrName: ElementRef;
  @ViewChild("ingrAmount", { static: true }) ingrAmount: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor() {}

  ngOnInit() {}
  onAddIngr() {
    const name = this.ingrName.nativeElement.value;
    const amount = this.ingrAmount.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.ingredientAdded.emit(ingredient);
  }
}
