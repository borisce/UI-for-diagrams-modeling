import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Repository} from 'src/app/api/models/repository';
import {AuthenticationService} from '../../../core/service';

@Component({
  selector: 'app-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss'],
})
export class RepoCardComponent implements OnInit {
  @Input('repo') repository: Repository;
  @Input('enableOptions') enableOptions: boolean = true;
  @Output() repoDeleted = new EventEmitter<Repository>();
  @Output() repoSelected = new EventEmitter<Repository>();
  @Output() repoFavorited = new EventEmitter<Repository>();
  @Output() repoArchived = new EventEmitter<Repository>();
  @Output() repoSettings = new EventEmitter<Repository>();
  @Output() repoCreateIPCore = new EventEmitter<Repository>();

  public currentUser: any;
  public optionsEnabled: boolean = true;

  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUser;
  }

  ngOnInit(): void {
    this.optionsEnabled = this.enableOptions;
  }

  /* Event emitters handlers */

  /**
   * Event emmiter handler for deleting a repository,
   * Opens a delete dialog,
   * Deleted selected repo from server,
   * Emmits an event,
   * @param repo Repository you want to delete
   * @returns void
   */
  onRepoDeleted(repo: Repository) {
    this.repoDeleted.emit(repo);
  }

  /**
   * Event handler for clicking on Archive repository button
   * @param repo Repoitory for archivation
   */
  onRepoArchived(repo: Repository) {
    this.repoArchived.emit(repo);
  }

  /**
   * Event handler for clicking on Create IP core repository button
   * @param repo Repoitory for archivation
   */
  onCreateIPCore(repo: Repository) {
    this.repoCreateIPCore.emit(repo);
  }

  /**
   * Event handler for clicking on favorite button
   * Emits an event
   * @param repo Selected repository
   */
  onRepoFavorited(repo: Repository) {
    this.repoFavorited.emit(repo);
  }

  /**
   * Event emmiter for clicking on settings button
   * Emits an event
   * @param repo Selected repository
   */
  onRepoSettings(repo: Repository) {
    this.repoSettings.emit(repo);
  }

  /**
   * Event emitter handler for clicking on a repo card,
   * should open selected repo
   * @param repo Selected repository
   */
  onRepoSelected(repo: Repository) {
    this.repoSelected.emit(repo);
  }
}
