import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import { NewUser } from "src/app/api/models";
import { Chatroom, Message } from "src/app/api/models/chatroom";
import { environment } from "../../../environments/environment";
import { AuthenticationService } from "./authentication.service";
import { CollabService } from "./collab.service";

/**
 * Service to manage chatrooms
 */
@Injectable({ providedIn: "root" })
export class ChatService {
  private readonly socket: any;
  private authorization: string;

  public chatRooms: any[] = null;
  public messages: any[] = [];

  public directs: any[] = [];

  private roomDocument = null;
  public userID = null;
  public userName = null;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private collabService: CollabService
  ) {
    this.userID = this.authenticationService?.currentUser?.uuid.toString();
    this.userName = this.authenticationService?.currentUser?.email;
  }

  public createDirect = async (
    from: string,
    to: string,
    message: string
  ) => {
    return this.collabService.createDirectMessage(from, to, message);
  }

  public getDirectMessages = async (userID: string) => {
    // fetch direct messages where _id contains the user id
    const directs = await this.collabService.fetchQuery("direct_messages", {
      _id: { $regex: userID },
    });

    if (Array.isArray(directs)) {
      this.directs = directs.map((direct) => {
        const user = direct.id.split("-").find((id) => id !== userID);

        return { id: direct.id, user, ...direct.data }});
    } else {
      this.directs = [];
    }
  }

  public connectToDirect = (directID: string) => {
    this.roomDocument = this.collabService.getDocument(directID, "direct_messages");

    this.messages = this.roomDocument?.data?.messages;

    this.roomDocument.subscribe((err) => {
      this.roomDocument.on("op", (operation: any[], source) => {});
    });
  };

  public leaveDirect = () => {
    this.roomDocument?.unsubscribe();
    this.roomDocument = null;
  }
  
  public getRooms = async (classrooms: { id: string }[]) => {
    const rooms = await this.collabService.fetchQuery("chatrooms", {});

    if (Array.isArray(rooms)) {
      this.chatRooms = rooms
        .filter(
          (room) =>
            room.data.open || classrooms.some((cr) => cr.id === room.classroom)
        )
        .map((room) => ({ id: room.id, ...room.data }));
    } else {
      this.chatRooms = [];
    }
  };


  public createRoom = async (
    name: string,
    authorID: string,
    open?: boolean,
    classroom?: string
  ) => {
    return this.collabService.createChatRoom(name, authorID, open, classroom);
  };

  public deleteRoom = async (roomID: string) => {
    this.collabService.deleteChatRoom(roomID);
  };

  public deleteDirect = async (directID: string) => {
    this.collabService.deleteDirectMessage(directID);
  };

  public connectToRoom = (roomID: string) => {
    this.roomDocument = this.collabService.getDocument(roomID, "chatrooms");

    this.messages = this.roomDocument?.data?.messages;

    this.roomDocument.subscribe((err) => {
      this.roomDocument.on("op", (operation: any[], source) => {});
    });
  };

  public leaveRoom = () => {
    this.roomDocument.unsubscribe();
    this.roomDocument = null;
  };

  public sendMessage = (
    message: string,
    authorName: string,
    authorID: string
  ) => {
    this.roomDocument.submitOp([
      {
        p: ["messages", this.roomDocument.data.messages.length],
        li: { authorName, authorID, content: message, date: new Date() },
      },
    ]);
  };

  public sendDirectMessage = (message: string, authorName: string) => {
    this.roomDocument.submitOp([
      {
        p: ["messages", this.roomDocument.data.messages.length],
        li: { authorName, content: message, date: new Date() },
      },
    ]);
  }
}
