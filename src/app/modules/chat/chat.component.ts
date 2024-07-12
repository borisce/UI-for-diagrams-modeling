import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { AuthenticationService, UserService } from "src/app/core/service";
import { ChatService } from "src/app/core/service/chat.service";
import { EducationService } from "src/app/core/service/education.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  public expanded: boolean = false;
  public activeRoom: any = null;
  public activeForm: "new" | "update" | "newDirect" | undefined = undefined;
  public visible: boolean = false;

  public messageForm: any;
  public message: string = "";

  public roomForm: any;
  public roomName: string = "";
  public roomPrivate: boolean = false;
  public roomClassroom: string | null = null;
  public classrooms: any;

  public directForm: any;
  public directMessage: string = "";
  public directUser: string | null = null;
  public activeDirect: any = null;

  public userID: string | null = null;
  public userName: string | null = null;

  public toggleVisibility(): void {
    this.expanded = !this.expanded;
  }

  constructor(
    private formBuilder: UntypedFormBuilder,
    public chatService: ChatService,
    public authService: AuthenticationService,
    private educationService: EducationService
  ) {
    this.userID = this.authService?.currentUser?.uuid.toString();
    this.userName = this.authService?.currentUser?.email;
  }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      message: [this.message, Validators.required],
    });

    this.roomForm = this.formBuilder.group({
      roomName: [this.roomName, Validators.required],
      roomPrivate: [this.roomPrivate],
      roomClassroom: [this.roomClassroom],
    });

    this.directForm = this.formBuilder.group({
      directMessage: [this.directMessage, Validators.required],
      directUser: [this.directUser, Validators.required],
    });

    this.chatService.getDirectMessages(this.userID);
    this.educationService.getAllClassrooms(0, 20).subscribe((data) => {
      this.classrooms = data;
      this.chatService.getRooms(data.content);
    });

    setInterval(() => {
      this.chatService.getDirectMessages(this.userName);
    }, 5000);

    setInterval(() => {
      this.educationService.getAllClassrooms(0, 20).subscribe((data) => {
        this.classrooms = data;
        this.chatService.getRooms(data.content);
      });
    }, 20000);
  }

  public connectToRoom(
    roomID: string | null,
    roomName?: string,
    authorID?: string
  ): void {
    this.activeRoom = {
      id: roomID,
      name: roomName,
      author_id: authorID,
    };
    if (!roomID) {
      this.chatService.leaveRoom();
      this.chatService.leaveDirect();

      this.activeDirect = null;
      return;
    }
    this.chatService.connectToRoom(roomID);
  }

  public async connectToDirect(
    directID: string | null,
    user: string
  ): Promise<void> {
    this.activeDirect = {
      id: directID,
      user,
    };

    if (!directID) {
      this.chatService.leaveDirect();
      return;
    }

    this.chatService.connectToDirect(directID);
  }

  public async deleteDirect(directID: string) {
    this.activeDirect = null;
    this.chatService.deleteDirect(directID);
  }

  public async onSendMessage() {
    this.chatService.sendMessage(
      this.messageForm.value.message,
      this.authService.currentUser.username,
      this.userID
    );
    this.message = "";
    this.messageForm.reset();
  }

  public async onSendDirectMessage() {
    this.chatService.sendDirectMessage(
      this.messageForm.value.message,
      this.authService.currentUser.email
    );
    this.message = "";
    this.messageForm.reset();
  }

  public openForm(form: "new" | "update" | "newDirect" | undefined): void {
    this.activeForm = form;
  }

  public async onCreateRoom() {
    this.chatService
      .createRoom(
        this.roomForm.value.roomName,
        this.userID,
        !this.roomForm.value.roomPrivate,
        this.roomClassroom
      )
      .then(() => {
        this.activeForm = undefined;
        this.roomName = "";
        this.roomPrivate = false;
        this.roomClassroom = null;
        this.roomForm.reset();

        setTimeout(
          () => this.chatService.getRooms(this.classrooms.content),
          500
        );
      });
  }

  public async onCreateDirect() {
    this.chatService
      .createDirect(
        this.authService.currentUser.email,
        this.directForm.value.directUser,
        this.directForm.value.directMessage
      )
      .then(() => {
        this.activeForm = undefined;
        this.directMessage = "";
        this.directUser = null;
        this.directForm.reset();
      });
  }

  public async deleteRoom(roomID: string) {
    this.activeRoom = null;
    this.chatService.deleteRoom(roomID);

    setTimeout(() => this.chatService.getRooms(this.classrooms.content), 500);
  }
}
