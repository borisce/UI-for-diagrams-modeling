import {EventEmitter, Injectable, Output} from "@angular/core";
import {CustomMessage} from "../model/custom-message";


@Injectable({
  providedIn: 'root',
})
export class StatusMessageService {

  public messages: CustomMessage[] = [];
  @Output() public errorAdded: EventEmitter<CustomMessage> = new EventEmitter<CustomMessage>();

  constructor() {
  }

  public addError(message: string): void {
    this.addMessage(message, 'error');
  }

  public addSuccess(message: string): void {
    this.addMessage(message, 'success');
  }

  public clearError(error: CustomMessage): void {
    this.messages.splice(this.messages.indexOf(error), 1);
  }

  private addMessage(message: string, type: string): void {
    const ce: CustomMessage = {
      message: message.replace(/\n/g, '<br><br>'),
      type,
      hiding: false,
      clearTimeout: null
    };
    this.messages.push(ce);
    this.errorAdded.emit(ce);
  }
}
