import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LoggingService } from './../shared/logging.service';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
    CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent },
        ]),
    ],
    providers: [LoggingService]
})
export class shoppingListModule {}