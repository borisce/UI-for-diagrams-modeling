import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiTTYExistingResponse } from 'src/app/core/model/api-ttyexistingresponse';
import { AuthenticationService } from 'src/app/core/service';
import { VirtualTTYapiService } from 'src/app/core/service/virtual-ttyapi.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-select-existing-simulation',
  templateUrl: './modal-select-existing-simulation.component.html',
  styleUrls: ['./modal-select-existing-simulation.component.scss']
})
export class ModalSelectExistingSimulationComponent implements OnInit {
  public selectedEnvironment: string = this.environments[0].id;

  constructor(@Inject(MAT_DIALOG_DATA) public environments: ApiTTYExistingResponse[],
              private dialogRef: MatDialogRef<ModalSelectExistingSimulationComponent>,
              private virtualTtyApi: VirtualTTYapiService) { }

  public ngOnInit(): void {

  }

  public confirm(): void {
    this.virtualTtyApi.startTTYSession(this.selectedEnvironment);
    this.dialogRef.close(this.selectedEnvironment);
  }
}
