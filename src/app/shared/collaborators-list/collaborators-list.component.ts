import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collaborators-list',
  templateUrl: './collaborators-list.component.html',
  styleUrls: ['./collaborators-list.component.scss']
})
export class CollaboratorsListComponent {
  @Input() public collaborators: Map<string, ICollaborator>;
  @Input() public zIndex: number | undefined;
  @Input() public multipleConnectionsWord: string = 'cursors';
  public expanded: boolean = false;

  public toggleVisibility(): void {
    this.expanded = !this.expanded;
  }

}

export interface ICollaborator {
  name: string;
  color: string;
  count: number;
}
