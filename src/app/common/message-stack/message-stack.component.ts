import {Component, OnInit} from '@angular/core';
import {StatusMessageService} from "../../core/service/status-message.service";
import {CustomMessage} from "../../core/model/custom-message";

@Component({
  selector: 'app-message-stack',
  templateUrl: './message-stack.component.html',
  styleUrls: ['./message-stack.component.scss'],
})

export class MessageStackComponent implements OnInit {

  constructor(
    public statusMessageService: StatusMessageService,
  ) {
    statusMessageService.errorAdded.subscribe((message: CustomMessage) => {
      this.addClearTimeout(message);
    });
  }

  public dismiss(message: CustomMessage): void {
    message.hiding = true;
    setTimeout(() => {
      this.statusMessageService.clearError(message);
    }, 900);
  }

  public ngOnInit(): void {
    for (const message of this.statusMessageService.messages) {
      this.addClearTimeout(message);
    }
  }

  public resetClearTimeout(message: CustomMessage): void {
    clearTimeout(message.clearTimeout);
    this.addClearTimeout(message);
  }

  private addClearTimeout(message: CustomMessage): void {
    message.clearTimeout = setTimeout(() => {
      this.dismiss(message);
    }, 5000);
  }
}
