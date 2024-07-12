import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiTTYExistingResponse } from 'src/app/core/model/api-ttyexistingresponse';
import { AuthenticationService } from 'src/app/core/service';
import { RepositoryService } from 'src/app/core/service/repository.service';
import { VirtualTTYapiService } from 'src/app/core/service/virtual-ttyapi.service';
import { ModalConfirmComponent } from 'src/app/modal/modal-confirm/modal-confirm.component';
import {
  ModalSelectExistingSimulationComponent
} from 'src/app/modal/modal-select-existing-simulation/modal-select-existing-simulation.component';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { SearchAddon } from 'xterm-addon-search';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { EditorComponentComponent } from '../editor-component.component';
import { VirtualTTYService } from '../../../../core/service/virtual-tty.service';
import { Interval } from 'antlr4ts/misc';
import {
  ModalManageExistingSimulationComponent
} from "../../../../modal/modal-manage-existing-simulation/modal-manage-existing-simulation.component";
import { EditorTabsService } from "../editor-tabs/service/editor-tabs.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-synthesis-terminal',
  templateUrl: './synthesis-terminal.component.html',
  styleUrls: ['./synthesis-terminal.component.scss']
})
export class SynthesisTerminalComponent implements OnInit {
  public terminalName = '';

  public term: Terminal;
  public fitAddon: FitAddon;
  public verticalSplit: boolean = true;
  public virtualTty = new VirtualTTYService(this.virtualTtyApi);

  @Input() public context: EditorComponentComponent;

  private shellPrompt: string;
  private last_log_request: number = 0;
  private log_interval: NodeJS.Timeout = null;

  constructor(
    private dialog: MatDialog,
    private editorTabsService: EditorTabsService,
    private virtualTtyApi: VirtualTTYapiService,
    private repoService: RepositoryService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar) {
  }

  public async initTty(isSynthesis?: boolean): Promise<void> {
    const repoID: string = this.repoService.currentRepoUuid.toString();
    this.term.writeln(' ASICDE: Initializing synthesis environment');

    // Check if existing TTY exists
    // tslint:disable-next-line:max-line-length
    if (isSynthesis !== true) {
      const existingSessions: ApiTTYExistingResponse[] = await this.virtualTtyApi.getExistingTTYSession(repoID);
      if (existingSessions.length > 0) {
        // User picks attach or new session
        const selectedSession: string = await this.getExistingSessions(existingSessions);
        if (selectedSession !== '') {
          // User wants to attach
          await this.attachToTTY(selectedSession);
        } else {
          // User asked for new environment
          await this.connectToNewTTY();
        }
      } else {
        // No existing environment exists, create new
        await this.connectToNewTTY();
      }
    } else {
      this.term.writeln(' ASICDE: Initializing SYNTHESIS environment');
      await this.connectToNewTTY(true);
    }
    this.context.TTY_id = this.virtualTty.TTY_id;
    this.shellPrompt = `[asicde-simulator@${this.context.TTY_id?.substring(0, 12)} ~]$`;
    this.last_log_request = 0;
    const TERMINAL_STRING: string = 'ABCDEFGH';
    this.log_interval = setInterval(() => {
      this.virtualTty.getSynthesisLog(this.last_log_request).subscribe(data => {
        if (data.trimRight().endsWith(TERMINAL_STRING)) {
          data = data.trimRight().slice(0, TERMINAL_STRING.length * -1);
          clearInterval(this.log_interval);
          this.last_log_request = 0;
          this.log_interval = null;
          this.editorTabsService.simulationFinished();
        }
        this.term.write(data);
      });
      this.last_log_request = Math.floor(Date.now() / 1000);
    }, 3000);
  }

  public async initSynthesisTty(endStep: string, technology: string): Promise<void> {
    const repoID: string = this.repoService.currentRepoUuid.toString();
    this.term.writeln(' ASICDE: Initializing SYNTHESIS environment');
    const existingSessions: ApiTTYExistingResponse[] = await this.virtualTtyApi.getExistingSynthesisTTYSession(repoID);
    const runningSession = existingSessions.find(el => el.state == 'running');
    if (runningSession) {
      console.log('ATTACHING TO EXISTING TTY');
      await this.attachToTTY(runningSession.id);
    } else {
      await this.connectToNewSynthesisTTY(endStep, technology);
    }
    this.connectTerminal();
  }

  public async connectTerminal() {
    this.context.TTY_id = this.virtualTty.TTY_id;
    this.shellPrompt = `[asicde-synthesis@${this.context.TTY_id?.substring(0, 12)} ~]$`;
    this.last_log_request = 0;
    const TERMINAL_STRING: string = 'ABCDEFGH';
    this.log_interval = setInterval(() => {
      this.virtualTty.getSynthesisLog(this.last_log_request).subscribe(data => {
        if (data.trimRight().endsWith(TERMINAL_STRING)) {
          data = data.trimRight().slice(0, TERMINAL_STRING.length * -1);
          clearInterval(this.log_interval);
          this.last_log_request = 0;
          this.log_interval = null;
          this.editorTabsService.synthesisFinished();
        }
        this.term.write(data);
        this.editorTabsService.synthesisFinished();
      },
        err => {
          clearInterval(this.log_interval);
          this.last_log_request = 0;
          this.log_interval = null;
          this.context.TTY_id = undefined;
        });
      this.last_log_request = Math.floor(Date.now() / 1000);
    }, 3000);
  }

  private async connectToNewTTY(isSynthesis?: boolean): Promise<void> {
    const repoID: string = this.repoService.currentRepoUuid.toString();
    const userID: string = this.authService.currentUser.uuid.toString();
    if (isSynthesis !== true) {
      await this.virtualTty.startTTY(repoID, userID);
    } else {
      await this.virtualTty.startSynthesisTTY(repoID, userID, 'sta', 'osu035');
    }
    this.term.clear();
    this.term.writeln(' ASICDE: Connecting to new environment');
    this.term.writeln(' ASICDE: Connected');
    this.term.write(this.shellPrompt);
  }

  private async connectToNewSynthesisTTY(endStep: string, technology: string): Promise<void> {
    const repoID: string = this.repoService.currentRepoUuid.toString();
    const userID: string = this.authService.currentUser.uuid.toString();
    await this.virtualTty.startSynthesisTTY(repoID, userID, endStep, technology);
    this.term.clear();
    this.term.writeln(' ASICDE: Connecting to new environment');
    this.term.writeln(' ASICDE: Connected');
    this.term.write(this.shellPrompt);
  }

  public async attachToTTY(sessionID: string): Promise<void> {
    this.term.writeln(' ASICDE: Attaching to virtual TTY ...');
    this.virtualTty.attachTTY(sessionID);
    this.term.clear();
    this.term.writeln(' ASICDE: Connected');
    this.term.write(this.shellPrompt);
  }

  private async getExistingSessions(list: ApiTTYExistingResponse[]): Promise<string> {
    for (let i = 0; i < list?.length; i++) {
      const item = list[i];
      const userDetails = await this.authService.getUserDetails(item.createdBy).toPromise();
      list[i].createdBy = userDetails?.username;
    }
    const dialog = this.dialog.open(ModalSelectExistingSimulationComponent, {
      data: list,
      maxHeight: '50%',
      panelClass: 'darkmode-dialog'
    });
    return await dialog.afterClosed().toPromise();
  }

  public closeWS() {
    this.context.TTY_id = undefined;
    this.shellPrompt = `[asicde-simulator@${this.context.TTY_id?.substring(0, 12)} ~]$`;
    clearInterval(this.log_interval);
    this.last_log_request = 0;
    this.log_interval = null;
  }

  public async killSession() {
    if (this.context.TTY_id != undefined) {
      const dialogRef = this.dialog.open(ModalConfirmComponent, {
        data: { message: 'Are you sure you want to kill this session? All running simulations and unsaved data will be lost!!!' },
        width: 'auto'
      });
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        // await this.virtualTty.killTTY();
        await this.virtualTty.deleteTTY();
        clearInterval(this.log_interval);
        this.term.clear();
        this.term.writeln(' ASICDE: Connection closed, click restart session to make a new connection');
        this.context.TTY_id = undefined;
        this.shellPrompt = `[asicde-simulator@${this.context.TTY_id?.substring(0, 12)} ~]$`;
        this.last_log_request = 0;
        this.log_interval = null;
      }
    } else {
      this.snackBar.open('Cannot kill session, you are not connected!', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
        duration: 3000
      });
    }
  }

  public increaseFont() {
    this.term.options.fontSize += 2;
    this.fitAddon.fit();
  }

  public decreaseFont() {
    this.term.options.fontSize -= 2;
    this.fitAddon.fit();
  }

  public fitTerminal() {
    this.fitAddon.fit();
  }

  public onResize(event) {
    this.fitAddon.fit();
  }

  public ngOnInit() {
    this.term = new Terminal();
    const terminalElement = document.getElementById('synthesis-terminal');
    this.term.open(terminalElement);
    this.fitAddon = new FitAddon();
    this.term.loadAddon(this.fitAddon);
    this.term.loadAddon(new SearchAddon());
    this.term.loadAddon(new WebLinksAddon());
    this.term.writeln(' ASICDE: XTERM.js initialized!');
    this.term.setOption('disableStdin', true);

    this.term.onTitleChange((arg1, arg2) => {
      this.terminalName = arg1;
    });
    // Make the terminal's size and geometry fit the size of #terminal-container

    this.term.onResize((size) => {
      this.fitTerminal();
    });

    this.shellPrompt = `[asicde-simulator@${this.context.TTY_id?.substring(0, 12)} ~]$`;
  }
}
