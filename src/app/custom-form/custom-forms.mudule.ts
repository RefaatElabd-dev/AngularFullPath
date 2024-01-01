import { NgModule } from "@angular/core";
import { CustomFormComponent } from "./custom-form.component";
import { CommonModule } from "@angular/common";
import { NgxCustomCompsModule } from "ngx-custom-comps";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: CustomFormComponent }]),
        CommonModule,
        FormsModule,
        NgxCustomCompsModule,
    ],
    declarations: [
        CustomFormComponent
    ],
})
export class CustomFormsModule{

}