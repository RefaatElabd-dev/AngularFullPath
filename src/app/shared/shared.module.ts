import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FilterPipe } from './Pipes/filter.pipe';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { dropdownDirective } from './dropdown.directive';
import { shortenPipe } from './Pipes/shorten.pipe';
import { LoadingSpinnerComponent } from "./loading-spinner.component/loading-spinner.component";

@NgModule({
    declarations: [
        FilterPipe,
        shortenPipe,
        PlaceholderDirective,
        dropdownDirective,
        AlertComponent,
        LoadingSpinnerComponent,
    ],
    imports: [CommonModule],
    exports: [
        FilterPipe,
        shortenPipe,
        PlaceholderDirective,
        dropdownDirective,
        AlertComponent,
        LoadingSpinnerComponent,
    ]
})
export class SharedModule {

}