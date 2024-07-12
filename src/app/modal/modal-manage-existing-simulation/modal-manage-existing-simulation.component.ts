import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiTTYExistingResponse } from 'src/app/core/model/api-ttyexistingresponse';
import { VirtualTTYapiService } from 'src/app/core/service/virtual-ttyapi.service';
import {RepositoryService} from "../../core/service/repository.service";
import {AuthenticationService} from "../../core/service";

@Component({
  selector: 'app-modal-manage-existing-simulation',
  templateUrl: './modal-manage-existing-simulation.component.html',
  styleUrls: ['./modal-manage-existing-simulation.component.scss']
})
export class ModalManageExistingSimulationComponent implements OnInit {
  public environments: ApiTTYExistingResponse[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public currentContainerId: string,
              private dialogRef: MatDialogRef<ModalManageExistingSimulationComponent>,
              private virtualTtyApi: VirtualTTYapiService,
              private repoService: RepositoryService,
              private authService: AuthenticationService) {
  }

  public async ngOnInit(): Promise<void> {
    const repoID: string = this.repoService.currentRepoUuid.toString();
    // tslint:disable-next-line:max-line-length
    const elist = await this.virtualTtyApi.getExistingTTYSession(repoID);
    for (let i = 0; i < elist?.length; i++) {
      const item = elist[i];
      const userDetails = await this.authService.getUserDetails(item.createdBy).toPromise();
      item.createdBy = userDetails?.username;
      this.environments.push(item);
    }
  }

  public async deleteEnviroment(containerId: string): Promise<void> {
    await this.virtualTtyApi.deleteTTYSession(containerId);
    const index: number = this.environments.findIndex(e => e.id === containerId);
    this.environments.splice(index, 1);
  }
}
