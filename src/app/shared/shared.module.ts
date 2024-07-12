import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CollaboratorsListComponent } from "./collaborators-list/collaborators-list.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { PlaceholderText } from "./placeholder-text/placeholder-text.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CodeReviewPopupComponent } from "./code-review-popup/code-review-popup.component";
import { NewBranchPopupComponent } from "./new-branch-popup/new-branch-popup.component";
import { FetchAndPullPopupComponent } from "./fetch-and-pull-popup/fetch-and-pull-popup.component.component";

/**
 * The shared module contains classes and resources which are used in more than one dynamically
 * loaded module. By always loading with the application the shared components are ready whenever
 * a module requests them.
 */
@NgModule({
  declarations: [
    CollaboratorsListComponent,
    SearchBarComponent,
    PlaceholderText,
    CodeReviewPopupComponent,
    NewBranchPopupComponent,
    FetchAndPullPopupComponent
  ],
  exports: [
    CollaboratorsListComponent,
    PlaceholderText,
    SearchBarComponent,
    MatFormFieldModule,
    CodeReviewPopupComponent,
    NewBranchPopupComponent,
    FetchAndPullPopupComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class SharedModule {}
