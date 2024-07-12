import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ForumService } from '../../../core/service/forum.service';
import { NavigationStart, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../core/service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UUID } from 'antlr4ts/misc/UUID';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'create-thread-component',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class CreateThreadComponent implements OnInit {
  @ViewChild("paginator") paginator: MatPaginator;

  public createThreadForm: UntypedFormGroup;
  public threads: [];
  public pageLength: number = 0;
  public pageSize: number = 12;
  public pageIndex: number = 0;
  public breakpoint: number;
  public submitted = false;
  public threadId: UUID;
  public messageId: UUID;
  public isEdit: boolean = false;
  private currentTitle: string = '';
  private currentMessage: string = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private forumService: ForumService,
    public authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) {
    this.currentTitle = this.forumService.currentThreadTitle;
    this.currentMessage = this.forumService.currentThreadMessage;
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => this.threadId = params.thread);
    this.route.params.subscribe(params => this.messageId = params.message);
    if (this.threadId && this.messageId) {
      this.isEdit = true;
    }
    this.createThreadForm = this.formBuilder.group({
      message: ['', Validators.required],
      title: ['', Validators.required],
      /* tags: [''], */
    });
    if (this.isEdit) {
      console.log("ngOnInit create thread component",this.router['navigationData']);
      this.createThreadForm.setValue({title: this.currentTitle ?? '', message: this.currentMessage ?? ''});
    }
  }

  get f(): any {
    return this.createThreadForm.controls;
  }

  public redirect(pagename: string): any {
    this.router.navigate(['/' + pagename]);
  } 

  async onCreateThread() {
    this.submitted = true;
    if (!this.f.title.errors && !this.f.message.errors) {
      var result = await this.forumService.createThread(this.createThreadForm.value);
      setTimeout(() => {
        this.redirect('forum');
      }, 500);
    }
  }

  async onEditThread() {
    this.submitted = true;
    console.log("onEditThread log 1",this.createThreadForm);
    if (!this.f.title.errors && !this.f.message.errors) {
      var result = await this.forumService.editThread(this.threadId, this.messageId, this.createThreadForm.value.message);
      console.log("onEditThread log 2",result);
      setTimeout(() => {
        this.redirect('forum/thread/' + this.threadId);
      }, 500);
    }
  }
}
