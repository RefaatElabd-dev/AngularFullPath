import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipeItemComponent } from './recipes/recipes-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { dropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shoping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AppRouting } from './app-routing-module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { shortenPipe } from './shared/Pipes/shorten.pipe';
import { FilterPipe } from './shared/Pipes/filter.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptorService } from './shared/interceptors/Logging-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailsComponent,
    RecipesListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    dropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    shortenPipe,
    FilterPipe
  ],
  imports: [
BrowserModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
