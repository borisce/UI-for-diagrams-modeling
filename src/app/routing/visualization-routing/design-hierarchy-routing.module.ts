import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignHierarchyLayoutComponent } from 'src/app/modules/design-hierarchy/design-hierarchy-layout/designHierarchyLayout.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: DesignHierarchyLayoutComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DesignHierarchyRoutingModule { }
