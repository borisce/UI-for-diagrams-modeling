import { ModalAlertComponent } from "./modal/modal-alert/modal-alert.component";
import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { ApiModule } from "./api/api.module";
import { EditorModule } from "./modules/editor/editor.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthModule } from "./modules/auth/auth.module";
import { ErrorInterceptor, JwtInterceptor } from "./core/interceptor";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatExpansionModule } from "@angular/material/expansion";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserEditComponent } from "./modules/home/user-edit/user-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ZipService } from "./core/fileSystem/ZipWorker/zip.service";
import { UserEditationComponent } from "./modules/home/user-edit/user-editation/user-editation.component";
import { RepositoryEditationComponent } from "./modules/home/user-edit/repository-editation/repository-editation.component";
import { ModalComponent } from "./modal/modal.component";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { ModalEditRepositoryComponent } from "./modal/modal-edit-repository/modal-edit-repository.component";
import { ModalSetMessageComponent } from "./modal/modal-set-message/modal-set-message.component";
import { ModalPutCredentialsComponent } from "./modal/modal-put-credentials/modal-put-credentials.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { ModalNewBranchComponent } from "./modal/modal-new-branch/modal-new-branch.component";
import { ModalCommitPushComponent } from "./modal/modal-commit-push/modal-commit-push.component";
import { HeaderComponent } from "./common/header/header.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { HomepageModule } from "./modules/homepage/homepage.module";
import { ApiConfiguration as CollabApiConfiguration } from "./api/collab/api-configuration";
import { ApiConfiguration as CodecompletionApiConfiguration } from "./api/codecompletion/api-configuration";
import { ModalFileNameComponent } from "./modal/modal-file-name/modal-file-name.component";
import { MatInputModule } from "@angular/material/input";
import { MyReposComponent } from "./modules/my-repos/my-repos.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatPaginatorModule } from "@angular/material/paginator";
import { TeamCardComponent } from "./common/teams/team-card/team-card.component";
import { OrganizationComponent } from "./modules/organization/organization.component";
import { OrgReposComponent } from "./modules/organization/org-repos/org-repos.component";
import { OrgTeamsComponent } from "./modules/organization/org-teams/org-teams.component";
import { OrgMembersComponent } from "./modules/organization/org-members/org-members.component";
import { OrgOverviewComponent } from "./modules/organization/org-overview/org-overview.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RepoCardComponent } from "./common/repositories/repo-card/repo-card.component";
import { ModalDeleteRepoComponent } from "./modal/modal-delete-repo/modal-delete-repo.component";
import { ModalConfirmComponent } from "./modal/modal-confirm/modal-confirm.component";
import { ModalConfirmSettingsActionComponent } from "./modal/modal-confirm-settings-action/modal-confirm-settings-action.component";
import { ModalDeleteOrgMembersComponent } from "./modal/modal-delete-orgmembers/modal-delete-org-members/modal-delete-org-members.component";
import { ModalOrgMemberInviteComponent } from "./modal/modal-org-member-invite/modal-org-member-invite.component";
import { ModalEditOrgMemberComponent } from "./modal/modal-edit-org-member/modal-edit-org-member.component";
import { MatRadioModule } from "@angular/material/radio";
import { ModalCreateOrganizationComponent } from "./modal/modal-create-organization/modal-create-organization.component";
import { ModalOrgDeleteOwnerComponent } from "./modal/modal-org-delete-owner/modal-org-delete-owner.component";
import { ModalOrgOwnerEditRoleComponent } from "./modal/modal-org-owner-edit-role/modal-org-owner-edit-role.component";
import { ModalCreateNewTeamComponent } from "./modal/modal-create-new-team/modal-create-new-team.component";
import { ModalRemoveTeamComponent } from "./modal/modal-remove-team/modal-remove-team.component";
import { ModalEditTeamNameComponent } from "./modal/modal-edit-team-name/modal-edit-team-name.component";
import { ModalAddTeamMemberComponent } from "./modal/modal-add-team-member/modal-add-team-member.component";
import { ModalRemoveTeamMemberComponent } from "./modal/modal-remove-team-member/modal-remove-team-member.component";
import { StudentCardComponent } from "./common/students/student-card/student-card.component";
import { ModalInviteStudentsComponent } from "./modal/modal-invite-students/modal-invite-students.component";
import { ModalManageExistingSimulationComponent } from "./modal/modal-manage-existing-simulation/modal-manage-existing-simulation.component";
import { ModalCreateAssignmentComponent } from "./modal/modal-create-assignment/modal-create-assignment.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ModalAddTeachersComponent } from "./modal/modal-add_teachers/modal-add-teachers.component";
import { ModalChangeAssignmentComponent } from "./modal/modal-change-assignment/modal-change-assignment.component";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NavListComponent } from "./common/navigation/nav-list/nav-list.component";
import { PricingComponent } from "./modules/homepage/pricing/pricing/pricing.component";
import { PriceCardComponent } from "./common/pricing-cards/price-card/price-card.component";
import { FeaturesComponent } from "./modules/homepage/features/features.component";
import { AboutUsComponent } from "./modules/homepage/about-us/about-us.component";
import { ModalOpenInvitationComponent } from "./modal/modal-open-invitation/modal-open-invitation.component";
import { ModalTransferOwnershipComponent } from "./modal/modal-transfer-ownership/modal-transfer-ownership.component";
import { ModalShareRepoComponent } from "./modal/modal-share-repo/modal-share-repo.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ActivityGraphComponent } from "./modules/dashboard/dashboard-graphs/activity-graph/activity-graph.component";
import { PremiumGraphComponent } from "./modules/dashboard/dashboard-graphs/premium-graph/premium-graph.component";
import { RepositoryGraphComponent } from "./modules/dashboard/dashboard-graphs/repository-graph/repository-graph.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ModalAdminEditUserComponent } from "./modal/modal-admin-edit-user/modal-admin-edit-user.component";
import { ModalAdminEditOrgComponent } from "./modal/modal-admin-edit-org/modal-admin-edit-org.component";
import { MatBadgeModule } from "@angular/material/badge";
import { NotificationsComponent } from "./modules/notifications/notifications.component";
// import { ModalEditTeamMemberComponent } from './modal/modal-edit-team-member/modal-edit-team-member.component';
import { ChatComponent } from "./modules/chat/chat.component";
import { ModalSelectFileComponent } from "./modal/modal-select-file/modal-select-file.component";
import { MatTreeModule } from "@angular/material/tree";
import { ModalSelectExistingSimulationComponent } from "./modal/modal-select-existing-simulation/modal-select-existing-simulation.component";
import { ModalSelectFolderComponent } from "./modal/modal-select-folder/modal-select-folder.component";
import { ForumComponent } from "./modules/forum/forum.component";
import { ThreadComponent } from "./modules/forum/thread/thread.component";
import { CreateThreadComponent } from "./modules/forum/create/create-thread.component";
import { QuillModule } from "ngx-quill";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CoresModule } from "./modules/cores/cores.module";
import { CartService } from "./core/service/cart.service";
import { CartComponent } from "./common/cart/cart.component";
import { OrderModule } from "./modules/order/order.module";
import { ModalNewPaymentComponent } from "./modal/modal-new-payment-component/modal-new-payment.component";
import { ModalNewCoreVersionComponent } from "./modal/modal-new-core-version/modal-new-core-version.component";
import { ModalEditCoreVersionComponent } from "./modal/modal-edit-core-version/modal-edit-core-version.component";
import { WalletModule } from "./modules/wallet/wallet.module";
import { AuthenticationService } from "./core/service";
import { StatusMessageService } from "./core/service/status-message.service";
import { MessageStackComponent } from "./common/message-stack/message-stack.component";
import { ModalEditPurchasedCoreComponent } from "./modal/modal-edit-purchased-core/modal-edit-purchased-core.component";
import { CodecompletionService } from "./api/codecompletion/services";
import { ModalSynthesisSettings } from "./modal/modal-synthesis-settings/modal-synthesis-settings.component";
import { ModalMultiselectFilesComponent } from "./modal/modal-multiselect-files/modal-multiselect-files.component";
import { CodeSearchService } from "./modules/editor/system_verilog/jump-to-definition/code-search/code-search.service";
import { ModalRepositorySelect } from "./modal/modal-repository-select/modal-repository-select.component";
import { ModalSelectFileOrFolderComponent } from "./modal/modal-select-file-or-folder/modal-select-file-or-folder.component";
import { SimulationFilesCardComponent } from "./common/classrooms/simulation-files-card/simulation-files-card.component";
import { ModalStartSimulationWithTranspilationComponent } from './modal/modal-start-simulation-with-transpilation/modal-start-simulation-with-transpilation.component';
import { ModalAdminEditPackageComponent } from './modal/modal-admin-edit-package/modal-admin-edit-package.component';
import { PricingPackagesComponent } from './modules/homepage/pricing-packages/pricing-packages.component';

export function initializeApp(
  authenticationService: AuthenticationService
): () => Promise<any> {
  return (): Promise<any> => {
    return authenticationService.init();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    UserEditationComponent,
    RepositoryEditationComponent,
    ModalComponent,
    ModalCreateOrganizationComponent,
    ModalEditRepositoryComponent,
    ModalConfirmComponent,
    ModalSetMessageComponent,
    ModalPutCredentialsComponent,
    ModalNewBranchComponent,
    ModalCommitPushComponent,
    ModalSynthesisSettings,
    HeaderComponent,
    MyReposComponent,
    ChatComponent,
    RepoCardComponent,
    ModalDeleteRepoComponent,
    ModalConfirmSettingsActionComponent,
    ModalFileNameComponent,
    OrganizationComponent,
    OrgReposComponent,
    OrgTeamsComponent,
    OrgMembersComponent,
    OrgOverviewComponent,
    TeamCardComponent,
    ModalDeleteOrgMembersComponent,
    ModalOrgMemberInviteComponent,
    ModalEditOrgMemberComponent,
    ModalRepositorySelect,
    ChatComponent,
    StudentCardComponent,
    ModalInviteStudentsComponent,
    ModalInviteStudentsComponent,
    ModalAlertComponent,
    ModalCreateAssignmentComponent,
    ModalAddTeachersComponent,
    ModalChangeAssignmentComponent,
    ModalOrgDeleteOwnerComponent,
    ModalOrgOwnerEditRoleComponent,
    ModalCreateNewTeamComponent,
    ModalRemoveTeamComponent,
    ModalEditTeamNameComponent,
    ModalAddTeamMemberComponent,
    ModalRemoveTeamMemberComponent,
    NavListComponent,
    PricingComponent,
    PricingPackagesComponent,
    PriceCardComponent,
    AboutUsComponent,
    FeaturesComponent,
    ModalOpenInvitationComponent,
    ModalTransferOwnershipComponent,
    ModalShareRepoComponent,
    DashboardComponent,
    ActivityGraphComponent,
    PremiumGraphComponent,
    RepositoryGraphComponent,
    ModalAdminEditUserComponent,
    ModalAdminEditOrgComponent,
    ModalSelectFileComponent,
    ModalSelectFileOrFolderComponent,
    ModalMultiselectFilesComponent,
    ModalSelectExistingSimulationComponent,
    ModalManageExistingSimulationComponent,
    ModalSelectFolderComponent,
    ModalAdminEditOrgComponent,
    NotificationsComponent,
    ForumComponent,
    ThreadComponent,
    CreateThreadComponent,
    CartComponent,
    ModalAdminEditPackageComponent,
    ModalNewPaymentComponent,
    ModalNewCoreVersionComponent,
    ModalEditCoreVersionComponent,
    MessageStackComponent,
    ModalEditPurchasedCoreComponent,
    SimulationFilesCardComponent,
    ModalStartSimulationWithTranspilationComponent,
  ],
  imports: [
    MatTooltipModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    MatAutocompleteModule,
    SharedModule,
    MatSliderModule,
    MatRippleModule,
    MatNativeDateModule,
    ApiModule.forRoot({ rootUrl: "" }),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    EditorModule,
    AuthModule,
    CoresModule,
    HomepageModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: "danger",
    }),
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatExpansionModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    FlexLayoutModule,
    NgxChartsModule,
    Ng2SearchPipeModule,
    MatTreeModule,
    Ng2SearchPipeModule,
    MatBadgeModule,
    QuillModule.forRoot(),
    MatSlideToggleModule,
    OrderModule,
    MatRadioModule,
    ReactiveFormsModule,
    WalletModule,
    MatSliderModule,
  ],
  providers: [
    StatusMessageService,
    CartService,
    ZipService,
    CodeSearchService,
    {
      provide: CodecompletionApiConfiguration,
      useValue: { rootUrl: environment.baseUrl },
    },
    CodecompletionService,
    {
      provide: CollabApiConfiguration,
      useValue: { rootUrl: environment.baseUrl + "/collab" },
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AuthenticationService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
