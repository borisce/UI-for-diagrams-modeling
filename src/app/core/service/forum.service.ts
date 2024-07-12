import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Repository } from 'src/app/api/models/repository';
import { UUID } from 'antlr4ts/misc/UUID';

/**
 * Service for working with repositories.
 */
@Injectable({ providedIn: 'root' })
export class ForumService {
  private _currentTitle: string;
  private _currentMessage: string;
  private _currentThreadUUID: UUID;
  public name: any;
  public uri: any;
  public currentThread: UUID;

  constructor(private http: HttpClient) {
    try {
      this.currentThread = JSON.parse(localStorage.getItem('thread')) as UUID;
    }
    catch (e) {
    }
  }

  public get currentThreadUUID() {
    return this._currentThreadUUID;
  }

  public set currentThreadUUID(uuid: UUID) {
    this._currentThreadUUID = uuid;
    localStorage.setItem('thread', JSON.stringify(this._currentThreadUUID));
  }

  public clearCurrentThreadUUID() {
    this._currentThreadUUID = null;
    localStorage.removeItem('thread');
  }

  public get currentThreadTitle() {
    return this._currentTitle;
  }

  public set currentThreadTitle(title: string) {
    this._currentTitle = title;
    localStorage.setItem('thread_title', JSON.stringify(this._currentTitle));
  }

  public get currentThreadMessage() {
    return this._currentMessage;
  }

  public set currentThreadMessage(message: string) {
    this._currentMessage = message;
    localStorage.setItem('thread_message', JSON.stringify(this._currentMessage));
  }

  public clearCurrentThreadTitle() {
    this._currentThreadUUID = null;
    localStorage.removeItem('thread_title');
  }

  public clearCurrentThreadMessage() {
    this._currentThreadUUID = null;
    localStorage.removeItem('thread_message');
  }

  

  public getForumContent(page?: number, size?: number): Observable<object> {
    return this.http.get(
      environment.baseUrl +
      `/forum?page=${page || 0}&size=${size || 10}`
    );
  }

  public getCurrentThreadContent(uuid: UUID, page?: number, size?: number): Observable<object> {
    return this.http.get(
      environment.baseUrl +
      `/forum/${uuid}/?page=${page || 0}&size=${size || 10}`
    );
  }

  public async createThread(body: object) {
    var res =  await this.http.post(environment.baseUrl + `/forum`, body).toPromise();
    return res;
  }

  public async createThreadMessage(uuid: UUID, message: string) {
    var res =  await this.http.post(environment.baseUrl + `/forum/${uuid}`, {message: message}).toPromise();
    return res;
  }

  public async deleteThread(thread: UUID, message: UUID) {
    var res =  await this.http.delete(environment.baseUrl + `/forum/${thread}/${message}`).toPromise();
    return res;
  }

  public async editThread(thread: UUID, message: UUID, messageText: string) {
    var res =  await this.http.put(environment.baseUrl + `/forum/${thread}/${message}`, {message: messageText}).toPromise();
    return res;
  }
}
