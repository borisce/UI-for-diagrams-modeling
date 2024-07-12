import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizationMenuComponent } from 'src/app/modules/visualization/components/visualizationMenu/visualizationMenu.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: VisualizationMenuComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VisualizationRoutingModule { }
