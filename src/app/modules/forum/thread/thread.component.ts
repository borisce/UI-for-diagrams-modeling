import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ForumService } from '../../../core/service/forum.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../core/service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UUID } from 'antlr4ts/misc/UUID';

@Component({
  selector: 'thread-component',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ThreadComponent implements OnInit {
  @ViewChild("paginator") paginator: MatPaginator;

  public threads: [];
  public loadingState: boolean = true;
  public pageLength: number = 0;
  public pageSize: number = 12;
  public pageIndex: number = 0;
  public breakpoint: number;

  public threadId: UUID;
  public emptyThreadFlag: boolean = false;
  public threadTitle: string = '';
  public threadFirstMessage = null;
  public threadReplies = null;
  public newReplyMessage: string = '';
  public newReplyState: boolean = false;

  constructor(
    private forumService: ForumService,
    public authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.threads = [];
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => this.threadId = params.id);
    this.showThread(this.pageIndex);
    setTimeout(() => {
      this.refreshThreadMessages(true);
    }, 5000);
  }

  public getThread(page: number, pageSize: number): any {
    return this.forumService.getCurrentThreadContent(
      this.threadId,
      page,
      pageSize,
    );
  }

  public redirect(pagename: string): any {
    this.router.navigate(['/' + pagename]);
  }

  public redirectToEdit(pagename: string): any {
    this.forumService.currentThreadTitle = this.threadTitle;
    this.forumService.currentThreadMessage =this.threadFirstMessage.text;
    this.router.navigate(['/' + pagename]);
  }

  public async showThread(page: number) {
    this.loadingState = true;
    const threadContent: any = await this.getThread(
      0,
      1000
    ).toPromise();
    this.threadTitle = threadContent.title;
    if (threadContent.messages) {
      /* threadContent.messages = threadContent.messages.reverse(); */
      this.threadFirstMessage = threadContent.messages[0];
      threadContent.messages.shift();
    }
    this.threadReplies = threadContent.messages;
    if (threadContent.empty) {
      this.emptyThreadFlag = true;
    } else {
      this.emptyThreadFlag = false;
    }
    if (this.threadFirstMessage) {
      this.loadingState = false;
    }
  }

  public async refreshThreadMessages(inCycle: boolean) {
    const threadContent: any = await this.getThread(
      0,
      1000
    ).toPromise();
    this.threadTitle = threadContent.title;
    if (threadContent.messages) {
      /* threadContent.messages = threadContent.messages.reverse(); */
      threadContent.messages.shift();
    }
    let missing = threadContent.messages.filter(m1 => !this.threadReplies.some(m2 => m1.uuid === m2.uuid));
    if (missing) {
      missing.forEach(reply => {
        this.threadReplies.push(reply);
      });
    }

    if (inCycle) {
      setTimeout(() => {
        this.refreshThreadMessages(true);
      }, 15000);
    }
  }

  

  /**
   * Event handler for interacting with paginator
   * @param event PageEvent arguments
   */
  public pageEvent(event: PageEvent) {
    if (this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.threads = [];
      this.showThread(event.pageIndex);
    }
    else {
      this.pageIndex = event.pageIndex;
      this.showThread(event.pageIndex);
    }
  }

  async onSendReply() {
    this.newReplyState = true;
    var message = this.newReplyMessage;
    this.newReplyMessage = '';
    var result = await this.forumService.createThreadMessage(this.threadId, message);
    if (result.hasOwnProperty('uuid')) {
      this.threadReplies.push(result);
    }
    this.newReplyState = false;
  }

  async onDeleteMainMessage(message: UUID) {
    this.loadingState = true;
    var result = await this.forumService.deleteThread(this.threadId, message);
    console.log("onDeleteMainMessage log",result);
    setTimeout(() => {
      this.redirect('forum');
    }, 500);
  }
}
