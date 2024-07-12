import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StateMachinesMenuComponent} from 'src/app/modules/state-machines/statemachinesmenu/statemachinesmenu.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: StateMachinesMenuComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StateMachinesRoutingModule { }
