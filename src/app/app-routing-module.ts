import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import {NgxCustomCompsComponent} from "ngx-custom-comps"


const appRoutes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  {
    path: "recipes",
    loadChildren: () =>
      import("./recipes/recipes.module").then((m) => m.RecipesModule),
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./shopping-list/shopping-list.module").then(
        (m) => m.shoppingListModule
      ),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "lib",
    //component: NgxCustomCompsComponent
    loadChildren: () => import("ngx-custom-comps").then((m) => m.NgxCustomCompsModule)
  }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRouting {

}