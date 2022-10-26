import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { LoggingInterceptorService } from "./shared/interceptors/Logging-interceptor.service";
import { ShoppingListService } from "./shopping-list/shoping-list.service";

@NgModule({
    providers: [
        ShoppingListService,
        RecipeService,
        {
        provide: HTTP_INTERCEPTORS,
        useClass: LoggingInterceptorService,
        multi: true
        },
        {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
        },
    ]
})
export class CoreModule{}