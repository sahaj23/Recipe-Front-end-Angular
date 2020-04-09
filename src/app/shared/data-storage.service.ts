import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}
  storeData() {
    console.log(this.authService.token);
    const recipes = this.recipeService.getRecipes();
    this.http
      .put("https://recipe-app-1857b.firebaseio.com/recipes.json", recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchData() {
    return this.http
      .get<Recipe[]>("https://recipe-app-1857b.firebaseio.com/recipes.json")
      .pipe(
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
