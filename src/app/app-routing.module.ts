import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditorComponentComponent } from "./modules/editor/editor-component/editor-component.component";
import { AuthGuard } from "./core/guard";
import { UserEditComponent } from "./modules/home/user-edit/user-edit.component";
import { UserEditationComponent } from "./modules/home/user-edit/user-editation/user-editation.component";
import { RepositoryEditationComponent } from "./modules/home/user-edit/repository-editation/repository-editation.component";
import { AuthContainerComponent } from "./modules/auth/pages/container/auth-container.component";
import { LandingComponent } from "./modules/homepage/landing/landing.component";
import { MyReposComponent } from "./modules/my-repos/my-repos.component";
import { OrganizationComponent } from "./modules/organization/organization.component";
import { ClassroomComponent } from "./modules/classrooms/classroom/classroom.component";
import { ClassroomsComponent } from "./modules/classrooms/classrooms.component";
import { ClassroomSettingsComponent } from "./modules/classrooms/classroom-settings/classroom-settings.component";
import { PricingComponent } from "./modules/homepage/pricing/pricing/pricing.component";
import { AboutUsComponent } from "./modules/homepage/about-us/about-us.component";
import { FeaturesComponent } from "./modules/homepage/features/features.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { ActivityDiagramsComponent } from "./modules/activity-diagrams/diagram-paper/diagram-paper.component";
import { NotificationsComponent } from "./modules/notifications/notifications.component";
import { ForumComponent } from "./modules/forum/forum.component";
import { ThreadComponent } from "./modules/forum/thread/thread.component";
import { CreateThreadComponent } from "./modules/forum/create/create-thread.component";
import { CoreListingComponent } from "./modules/cores/public/listing/listing.component";
import { CoreDetailComponent } from "./modules/cores/public/detail/detail.component";
import { OrderCreateComponent } from "./modules/order/create/create.component";
import { OrderListComponent } from "./modules/order/list/list.component";
import { OrderDetailComponent } from "./modules/order/detail/detail.component";
import { MyCoreListingComponent } from "./modules/cores/my/listing/listing.component";
import { MyCoreVersionsComponent } from "./modules/cores/my/versions/versions.component";
import { CoreCreateComponent } from "./modules/cores/my/create/create.component";
import { MyCoreEditComponent } from "./modules/cores/my/edit/edit.component";
import { PurchasedCoreListingComponent } from "./modules/cores/purchased/listing/listing.component";
import { PersonalWalletComponent } from "./modules/wallet/personal/wallet.component";
import { MyCoreUsagesComponent } from "./modules/cores/my/usages/usages.component";
import { AssignmentUserComponent } from "./modules/classrooms/assignment/assignment-user/assignment-user.component";
import { GithubGuard } from "./core/guard/github.guard";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { AssignmentsComponent } from "./modules/classrooms/assignment/assignments/assignments.component";
import { SubmissionComponent } from "./modules/classrooms/assignment/submission.component";
import { PricingPackagesComponent } from './modules/homepage/pricing-packages/pricing-packages.component';

const routes: Routes = [
  { path: "", component: LandingComponent, canActivate: [GithubGuard] },
  { path: "features", component: FeaturesComponent },
  { path: "pricing", component: PricingComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "my-repos", component: MyReposComponent, canActivate: [GithubGuard] },
  { path: "notifications", component: NotificationsComponent },
  {
    path: "organization",
    component: OrganizationComponent,
    // children: [
    //   // Overview removed for consideration
    //   //   {
    //   //   path: '',
    //   //   component: OrgOverviewComponent,
    //   //   data: { animationState: 'overview' }
    //   // },
    //   {
    //     path: "repos",
    //     component: OrgReposComponent,
    //     data: { animationState: "repos" },
    //   },
    //   {
    //     path: "teams",
    //     component: OrgTeamsComponent,
    //     data: { animationState: "teams" },
    //   },
    //   {
    //     path: "members",
    //     component: OrgMembersComponent,
    //     data: { animationState: "members" },
    //   },
    // ],
  },
  {
    path: "editUser",
    component: UserEditComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "user",
        component: UserEditationComponent,
      },
    ],
  },
  { path: "repository", component: RepositoryEditationComponent },
  {
    path: "editor",
    component: EditorComponentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "visualization",
    loadChildren: () =>
      import("./modules/visualization/visualization.module").then(
        (m) => m.VisualizationModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "state-machines",
    loadChildren: () =>
      import("./modules/state-machines/state-machines.module").then(
        (m) => m.StateMachinesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "design-hierarchy",
    loadChildren: () =>
      import("./modules/design-hierarchy/designHierarchy.module").then(
        (m) => m.DesignHierarchyModule
      ),
    canActivate: [AuthGuard],
  },

  { path: "login", component: AuthContainerComponent },
  { path: "register", component: AuthContainerComponent },
  { path: "reset-password", component: AuthContainerComponent },
  { path: "classroom", component: ClassroomComponent },
  { path: "dashboard", component: DashboardComponent },
  {path: 'price-packages', component: PricingPackagesComponent},

  { path: "classrooms/:id", component: ClassroomComponent },
  { path: "classrooms/:id/settings", component: ClassroomSettingsComponent },
  { path: "classrooms", component: ClassroomsComponent },
  { path: "assignments/:id", component: AssignmentsComponent },
  {
    path: "activitydiagrams",
    component: ActivityDiagramsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "classrooms/:id/assignments/:assignment_uuid",
    component: SubmissionComponent,
  },
  { path: "forum", component: ForumComponent },
  { path: "forum/thread/create", component: CreateThreadComponent },
  { path: "forum/edit/:thread/:message", component: CreateThreadComponent },
  { path: "forum/thread/:id", component: ThreadComponent },
  { path: "assignments/:id", component: AssignmentsComponent },
  { path: "assignments-user/:id", component: AssignmentUserComponent },
  { path: "cores/purchased", component: PurchasedCoreListingComponent },
  { path: "cores/my", component: MyCoreListingComponent },
  { path: "cores/my/create", component: CoreCreateComponent },
  { path: "cores/my/:uuid/versions", component: MyCoreVersionsComponent },
  { path: "cores/my/:uuid/usages", component: MyCoreUsagesComponent },
  { path: "cores/my/:uuid/edit", component: MyCoreEditComponent },
  { path: "cores", component: CoreListingComponent },
  { path: "cores/:uuid", component: CoreDetailComponent },
  { path: "order", component: OrderCreateComponent },
  { path: "orders", component: OrderListComponent },
  { path: "orders/:uuid", component: OrderDetailComponent },
  { path: "my-wallet", component: PersonalWalletComponent },
];

/*
  {
    path: 'statemachines',
    component: StatemachinesModule,
    canActivate: [AuthGuard]
  },
  {
    path: "visualization",
    component: VisualizationModule,
    canActivate: [AuthGuard],
  },
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: "reload",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
