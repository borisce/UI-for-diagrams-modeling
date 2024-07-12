import {Component, OnInit} from '@angular/core';
import {RepositoryService} from '../../../../../core/service/repository.service';
import {CoresService} from '../../../../../core/service/cores.service';
import {CoreOwnership} from '../../../../../api/models/core-ownership';
import {AttachedCoreVersions} from '../../../../../api/models/attached-core-versions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ip-cores',
  templateUrl: './ip-cores.component.html',
  styleUrls: ['./ip-cores.component.scss']
})


export class IpCoresComponent implements OnInit {

  public attached_cores: CoreOwnership[] = [];
  public attached_core_versions: AttachedCoreVersions = {};

  constructor(
    private repositoryService: RepositoryService,
    private coresService: CoresService
  ) {
  }

  public async getAttachedOwnedCores(): Promise<void> {
    const result: any = await this.coresService
      .getRepositoryAttachedOwnedCores(this.repositoryService.currentRepoUuid).toPromise();
    this.attached_cores = result;
    this.attached_cores.forEach(core => {
      this.attached_core_versions[core.uuid] = [];
      this.coresService
        .getOwnedCoreVersions(core.uuid)
        .subscribe(versions => {
          this.attached_core_versions[core.uuid] = versions['content'];
        });
    });
  }

  public ngOnInit(): void {
    this.getAttachedOwnedCores().then(() => {
    });
  }

  public changeVersion(ownedCoreUuid: string, CoreVersionUuid: string): void {
    this.coresService.setOwnedCoreVersion(ownedCoreUuid, CoreVersionUuid)
      .subscribe(oc => this.updateOwnedCoreIndex(oc));
  }

  public toggleActive(uuid: string, currentValue: boolean): void {
    if (currentValue) {
      this.coresService.disableOwnedCore(uuid).subscribe(oc => this.updateOwnedCoreIndex(oc));
    } else {
      this.coresService.enableOwnedCore(uuid).subscribe(oc => this.updateOwnedCoreIndex(oc));
    }
  }

  private updateOwnedCoreIndex(oc: CoreOwnership): void {
    const index: number = this.attached_cores.findIndex(c => c.uuid === oc.uuid);
    this.attached_cores[index] = oc;
  }
}
