import { Component, EventEmitter, HostListener, Injectable, OnInit, Output } from '@angular/core';
import { Module } from '../classes/module';
import { Port } from '../classes/port';
import { Or } from '../classes/or';
import { And } from '../classes/and';
import { AndCustomPorts} from '../classes/andCustomPorts'
import { OrCustomPorts} from '../classes/orCustomPorts'
import { NorCustomPorts} from '../classes/norCustomPorts'
import { NandCustomPorts} from '../classes/nandCustomPorts'
import { XorCustomPorts} from '../classes/xorCustomPorts'
import { XnorCustomPorts} from '../classes/xnorCustomPorts'
import { Nor, Nand, Xnor, Xor, Not } from '../classes/logicGate';
import { Multiplexor } from '../classes/multiplexor';
import { RepoFileReference } from '../classes/repoFileReference';
import { ParsedPackages } from '../classes/parsedPackages';
import { PackageItem } from 'src/app/api/systemverilogparser/models';
import { Decoder } from '../classes/decoder';
import { Adder } from '../classes/adder';
import { Register } from '../classes/register';
import { Encoder } from '../classes/encoder';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-modal-dialog-windows',
  templateUrl: './modal-dialog-windows.component.html',
  styleUrls: ['./modal-dialog-windows.component.css']
})
export class ModalDialogWindowsComponent implements OnInit {

  @Output() public moduleDataSubmitted = new EventEmitter<Module>();
  @Output() public portDataSubmitted = new EventEmitter<Port>();
  @Output() public orDataSubmitted = new EventEmitter<Or>();
  @Output() public orCustomPortsDataSubmitted = new EventEmitter<OrCustomPorts>();
  //@Output() public orCustomPortsDataSubmitted2 = new EventEmitter<OrCustomPorts2>();
  @Output() public andDataSubmitted = new EventEmitter<And>();
  @Output() public andCustomPortsDataSubmitted = new EventEmitter<AndCustomPorts>();
  @Output() public norDataSubmitted = new EventEmitter<Nor>();
  @Output() public norCustomPortsDataSubmitted = new EventEmitter<NorCustomPorts>();
  @Output() public nandDataSubmitted = new EventEmitter<Nand>();
  @Output() public nandCustomPortsDataSubmitted = new EventEmitter<NandCustomPorts>();
  @Output() public xorDataSubmitted = new EventEmitter<Xor>();
  @Output() public xorCustomPortsDataSubmitted = new EventEmitter<XorCustomPorts>();
  @Output() public xnorDataSubmitted = new EventEmitter<Xnor>();
  @Output() public xnorCustomPortsDataSubmitted = new EventEmitter<XnorCustomPorts>();
  @Output() public notDataSubmitted = new EventEmitter<Not>();
  @Output() public multiplexorDataSubmitted = new EventEmitter<Multiplexor>();
  @Output() public decoderDataSubmitted = new EventEmitter<Decoder>();
  @Output() public encoderDataSubmitted = new EventEmitter<Encoder>();
  @Output() public adderDataSubmitted = new EventEmitter<Adder>();
  @Output() public registerDataSubmitted = new EventEmitter<Register>();
  @Output() public existingModuleDataSubmitted = new EventEmitter<Module>();
  @Output() public FileNameToLoadSubmitted = new EventEmitter<RepoFileReference>();
  @Output() public FileNameToSaveSubmitted = new EventEmitter<string>();
  @Output() public FileNameToSaveVhdlSourceSubmitted = new EventEmitter<string>();
  @Output() public FileNameToSaveSystemVerilogSourceSubmitted = new EventEmitter<string>();

  public textCheckNewModule = true;
  public textCheckNewPort = true;
  public name: string;
  public instance: string;
  public bandwidth: string;
  public input: boolean;
  public availableJSONFiles: RepoFileReference[] = [];
  public availablePackages: ParsedPackages = {};
  public packageDefines: PackageItem[] = [];

  constructor() {
    this.name = '';
    this.instance = '';
    this.bandwidth = '';
  }

  public ngOnInit() {
  }

  @HostListener('click', [])
  public onClick() {
    const modalModule = document.getElementById('modalNewModule');
    const modalStandalonePortIn = document.getElementById('modalNewStandalonePortIn');
    const modalStandalonePortOut = document.getElementById('modalNewStandalonePortOut');
    const modalOr = document.getElementById('modalNewOr');
    const modalAnd = document.getElementById('modalNewAnd');
    const modalNor = document.getElementById('modalNewNor');
    const modalNand = document.getElementById('modalNewNand');
    const modalXor = document.getElementById('modalNewXor');
    const modalXnor = document.getElementById('modalNewXnor');
    const modalNot = document.getElementById('modalNewNot');
    const modalExistingModule = document.getElementById('modalExistingModule');
    const modalMultiplexor = document.getElementById('modalNewMultiplexor');
    const modalLoadDiagram = document.getElementById('modalLoadDiagram');
    const modalDecoder = document.getElementById('modalNewDecoder');
    const modalEncoder = document.getElementById('modalNewEncoder');
    const modalAdder = document.getElementById('modalNewEncoder');
    const modalRegister = document.getElementById('modalNewRegister');
    const modalSave = document.getElementById('modalSaveDiagram');
    if (event.target === modalModule || event.target === modalStandalonePortIn || event.target === modalStandalonePortOut
      || event.target === modalOr || event.target === modalExistingModule
      || event.target === modalAnd || event.target === modalNor
      || event.target === modalXor || event.target === modalXnor
      || event.target === modalNot || event.target === modalLoadDiagram
      || event.target === modalMultiplexor || event.target === modalDecoder || event.target === modalEncoder
      || event.target === modalSave || event.target === modalAdder || event.target === modalRegister) {
      modalModule.style.display = 'none';
      modalStandalonePortIn.style.display = 'none';
      modalStandalonePortOut.style.display = 'none';
      modalOr.style.display = 'none';
      modalAnd.style.display = 'none';
      modalNor.style.display = 'none';
      modalNand.style.display = 'none';
      modalXor.style.display = 'none';
      modalXnor.style.display = 'none';
      modalNot.style.display = 'none';
      modalExistingModule.style.display = 'none';
      modalMultiplexor.style.display = 'none';
      modalLoadDiagram.style.display = 'none';
      modalDecoder.style.display = 'none';
      modalEncoder.style.display = 'none';
      modalAdder.style.display = 'none';
      modalRegister.style.display = 'none';
      modalSave.style.display = 'none';
    }
  }

  public displayNewModuleDialogWindow() {
    const modal = document.getElementById('modalNewModule');
    this.name = '';
    this.instance = '';
    this.textCheckNewModule = true;
    modal.style.display = 'block';
  }

  public displayLoadDiagramDialogWindow(avilableFiles: RepoFileReference[]) {
    this.availableJSONFiles = avilableFiles;
    const modal = document.getElementById('modalLoadDiagram');
    modal.style.display = 'block';
  }

  public displayNewStandalonePortDialogWindowIn() {
    const modal = document.getElementById('modalNewStandalonePortIn');
    this.name = '';
    this.bandwidth = '';
    this.textCheckNewPort = true;
    modal.style.display = 'block';
  }

  public displayNewStandalonePortDialogWindowOut() {
    const modal = document.getElementById('modalNewStandalonePortOut');
    this.name = '';
    this.bandwidth = '';
    this.textCheckNewPort = true;
    modal.style.display = 'block';
  }

  public displayNewOrGateDialogWindow() {
    const modal = document.getElementById('modalNewOr');
    modal.style.display = 'block';
  }

  public displayNewOrGateCustomPortsDialogWindow() {
    const modal = document.getElementById('modalNewOrCustomPorts');
    modal.style.display = 'block';
  }

  /*public displayNewOrGateCustomPortsDialogWindow2() {
    const modal = document.getElementById('modalNewOrCustomPorts2');
    modal.style.display = 'block';
  }*/

  public displayNewAndGateDialogWindow() {
    const modal = document.getElementById('modalNewAnd');
    modal.style.display = 'block';
  }
  
  public displayNewAndGateCustomPortsDialogWindow() {
    const modal = document.getElementById('modalNewAndCustomPorts');
    modal.style.display = 'block';
  }

  public displayNewNorGateDialogWindow() {
    const modal = document.getElementById('modalNewNor');
    modal.style.display = 'block';
  }

  public displayNewNorGateCustomPortsDialogWindow() {
    const modal = document.getElementById('modalNewNorCustomPorts');
    modal.style.display = 'block';
  }

  public displayNewNandGateDialogWindow() {
    const modal = document.getElementById('modalNewNand');
    modal.style.display = 'block';
  }

  public displayNewNandGateCustomPortsDialogWindow() {
    const modal = document.getElementById('modalNewNandCustomPorts');
    modal.style.display = 'block';
  }

  public displayNewXorGateDialogWindow() {
    const modal = document.getElementById('modalNewXor');
    modal.style.display = 'block';
  }

  public displayNewXorGateCustomPortsDialogWindow() {
    const modal = document.getElementById('modalNewXorCustomPorts');
    modal.style.display = 'block';
  }

  public displayNewXnorGateDialogWindow() {
    const modal = document.getElementById('modalNewXnor');
    modal.style.display = 'block';
  }

  public displayNewXnorGateCustomPortsDialogWindow() {
    const modal = document.getElementById('modalNewXnorCustomPorts');
    modal.style.display = 'block';
  }

  public displayNewNotGateDialogWindow() {
    const modal = document.getElementById('modalNewNot');
    modal.style.display = 'block';
  }

  public displayNewMultiplexorDialogWindow() {
    const modal = document.getElementById('modalNewMultiplexor');
    modal.style.display = 'block';
  }

  public displayNewDecoderDialogWindow() {
    const modal = document.getElementById('modalNewDecoder');
    modal.style.display = 'block';
  }

  public displayNewEncoderDialogWindow() {
    const modal = document.getElementById('modalNewEncoder');
    modal.style.display = 'block';
  }

  public displayNewAdderDialogWindow() {
    const modal = document.getElementById('modalNewAdder');
    modal.style.display = 'block';
  }

  public displayNewRegisterDialogWindow() {
    const modal = document.getElementById('modalNewRegister');
    modal.style.display = 'block';
  }

  public displayExistingModuleDialogWindow(availableFiles: RepoFileReference[]) {
    this.availableJSONFiles = availableFiles;
    const modal = document.getElementById('modalExistingModule');
    modal.style.display = 'block';
  }

  public displaySaveFileDialogWindow() {
    const modalSave = document.getElementById('modalSaveDiagram');
    modalSave.style.display = 'block';
  }

  public displaySaveVhdlSourceFileDialogWindow() {
    const modalSave = document.getElementById('modalSaveVhdlFile');
    modalSave.style.display = 'block';
  }

  public displaySaveSystemVerilogSourceFileDialogWindow() {
    const modalSave = document.getElementById('modalSaveSystemVerilogFile');
    modalSave.style.display = 'block';
  }

  public onModalWindowCancelClicked() {
    const modal = document.getElementById('modalNewModule');
    const modal2 = document.getElementById('modalNewStandalonePortIn');
    const modal24 = document.getElementById('modalNewStandalonePortOut');
    const modal3 = document.getElementById('modalNewOr');
    const modal5 = document.getElementById('modalNewAnd');
    const modal20 = document.getElementById('modalNewNor');
    const modal4 = document.getElementById('modalExistingModule');
    const modal6 = document.getElementById('modalLoadDiagram');
    const modal7 = document.getElementById('modalNewMultiplexor');
    const modal8 = document.getElementById('modalNewDecoder');
    const modal23 = document.getElementById('modalNewEncoder');
    const modal9 = document.getElementById('modalSaveDiagram');
    const modal21 = document.getElementById('modalNewAdder');
    const modal22 = document.getElementById('modalNewRegister');
    const modal25 = document.getElementById('modalNewAndCustomPorts');
    const modal26 = document.getElementById('modalNewOrCustomPorts');
    const modal27 = document.getElementById('modalNewNorCustomPorts');
    const modal28 = document.getElementById('modalNewNandCustomPorts');
    const modal29 = document.getElementById('modalNewXorCustomPorts');
    const modal30 = document.getElementById('modalNewXnorCustomPorts');
    const modal31 = document.getElementById('modalNewNot');
    const modal32 = document.getElementById('modalSaveVhdlFile');
    const modal33 = document.getElementById('modalSaveSystemVerilogFile');
    modal.style.display = 'none';
    modal2.style.display = 'none';
    modal3.style.display = 'none';
    modal4.style.display = 'none';
    modal5.style.display = 'none';
    modal6.style.display = 'none';
    modal7.style.display = 'none';
    modal8.style.display = 'none';
    modal9.style.display = 'none';
    modal20.style.display = 'none';
    modal21.style.display = 'none';
    modal22.style.display = 'none';
    modal23.style.display = 'none';
    modal24.style.display = 'none';
    modal25.style.display = 'none';
    modal26.style.display = 'none';
    modal27.style.display = 'none';
    modal28.style.display = 'none';
    modal29.style.display = 'none';
    modal30.style.display = 'none';
    modal31.style.display = 'none';
    modal32.style.display = 'none';
    modal33.style.display = 'none';
  }

  public bitPortChecked() {
    const portBandwidthInputElement = document.getElementById('pBandwidthInput');
    const portBandwidthInputElementLab = document.getElementById('pBandwidthInputLabel');
    const portStructSelectElement = document.getElementById('pStruct');
    const portStructSelectElementLab = document.getElementById('pStructLabel');
    const portPackageSelectElement = document.getElementById('pPackage');
    const portPackageSelectElementLab = document.getElementById('pPackageLabel');
    portBandwidthInputElement.style.display = 'none';
    portBandwidthInputElementLab.style.display = 'none';
    portStructSelectElement.style.display = 'none';
    portStructSelectElementLab.style.display = 'none';
    portPackageSelectElement.style.display = 'none';
    portPackageSelectElementLab.style.display = 'none';
  }

  public vectorPortChecked() {
    const portBandwidthInputElement = document.getElementById('pBandwidthInput');
    const portBandwidthInputElementLab = document.getElementById('pBandwidthInputLabel');
    const portStructSelectElement = document.getElementById('pStruct');
    const portStructSelectElementLab = document.getElementById('pStructLabel');
    const portPackageSelectElement = document.getElementById('pPackage');
    const portPackageSelectElementLab = document.getElementById('pPackageLabel');
    portBandwidthInputElement.style.display = 'block';
    portBandwidthInputElementLab.style.display = 'block';
    portStructSelectElement.style.display = 'none';
    portStructSelectElementLab.style.display = 'none';
    portPackageSelectElement.style.display = 'none';
    portPackageSelectElementLab.style.display = 'none';
  }

  public bitPortCheckedOut() {
    const portBandwidthInputElement = document.getElementById('pBandwidthInputOut');
    const portBandwidthInputElementLab = document.getElementById('pBandwidthInputLabelOut');
    const portStructSelectElement = document.getElementById('pStructOut');
    const portStructSelectElementLab = document.getElementById('pStructLabelOut');
    const portPackageSelectElement = document.getElementById('pPackageOut');
    const portPackageSelectElementLab = document.getElementById('pPackageLabelOut');
    portBandwidthInputElement.style.display = 'none';
    portBandwidthInputElementLab.style.display = 'none';
    portStructSelectElement.style.display = 'none';
    portStructSelectElementLab.style.display = 'none';
    portPackageSelectElement.style.display = 'none';
    portPackageSelectElementLab.style.display = 'none';
  }

  public vectorPortCheckedOut() {
    const portBandwidthInputElement = document.getElementById('pBandwidthInputOut');
    const portBandwidthInputElementLab = document.getElementById('pBandwidthInputLabelOut');
    const portStructSelectElement = document.getElementById('pStructOut');
    const portStructSelectElementLab = document.getElementById('pStructLabelOut');
    const portPackageSelectElement = document.getElementById('pPackageOut');
    const portPackageSelectElementLab = document.getElementById('pPackageLabelOut');
    portBandwidthInputElement.style.display = 'block';
    portBandwidthInputElementLab.style.display = 'block';
    portStructSelectElement.style.display = 'none';
    portStructSelectElementLab.style.display = 'none';
    portPackageSelectElement.style.display = 'none';
    portPackageSelectElementLab.style.display = 'none';
  }

  public customPortChecked() {
    const portBandwidthInputElement = document.getElementById('pBandwidthInput');
    const portBandwidthInputElementLab = document.getElementById('pBandwidthInputLabel');
    const portStructSelectElement = document.getElementById('pStruct');
    const portStructSelectElementLab = document.getElementById('pStructLabel');
    const portPackageSelectElement = document.getElementById('pPackage');
    const portPackageSelectElementLab = document.getElementById('pPackageLabel');
    portBandwidthInputElement.style.display = 'none';
    portBandwidthInputElementLab.style.display = 'none';
    portStructSelectElement.style.display = 'block';
    portStructSelectElementLab.style.display = 'block';
    portPackageSelectElement.style.display = 'block';
    portPackageSelectElementLab.style.display = 'block';
  }


  public customPortCheckedOut() {
    const portBandwidthInputElement = document.getElementById('pBandwidthInputOut');
    const portBandwidthInputElementLab = document.getElementById('pBandwidthInputLabelOut');
    const portStructSelectElement = document.getElementById('pStructOut');
    const portStructSelectElementLab = document.getElementById('pStructLabelOut');
    const portPackageSelectElement = document.getElementById('pPackageOut');
    const portPackageSelectElementLab = document.getElementById('pPackageLabelOut');
    portBandwidthInputElement.style.display = 'none';
    portBandwidthInputElementLab.style.display = 'none';
    portStructSelectElement.style.display = 'block';
    portStructSelectElementLab.style.display = 'block';
    portPackageSelectElement.style.display = 'block';
    portPackageSelectElementLab.style.display = 'block';
  }

  public orBitChecked() {
    const orBandwidthInputElement = document.getElementById('orBandwidthInput');
    const orBandwidthInputElementLab = document.getElementById('orBandwidthInputLabel');
    const orStructSelectElement = document.getElementById('orStruct');
    const orStructSelectElementLab = document.getElementById('orStructLabel');
    orBandwidthInputElement.style.display = 'none';
    orBandwidthInputElementLab.style.display = 'none';
    orStructSelectElement.style.display = 'none';
    orStructSelectElementLab.style.display = 'none';
  }

  public orVectorChecked() {
    const orBandwidthInputElement = document.getElementById('orBandwidthInput');
    const orBandwidthInputElementLab = document.getElementById('orBandwidthInputLabel');
    const orStructSelectElement = document.getElementById('orStruct');
    const orStructSelectElementLab = document.getElementById('orStructLabel');
    orBandwidthInputElement.style.display = 'block';
    orBandwidthInputElementLab.style.display = 'block';
    orStructSelectElement.style.display = 'none';
    orStructSelectElementLab.style.display = 'none';
  }

  public orCustomChecked() {
    const orBandwidthInputElement = document.getElementById('orBandwidthInput');
    const orBandwidthInputElementLab = document.getElementById('orBandwidthInputLabel');
    const orStructSelectElement = document.getElementById('orStruct');
    const orStructSelectElementLab = document.getElementById('orStructLabel');
    orBandwidthInputElement.style.display = 'none';
    orBandwidthInputElementLab.style.display = 'none';
    orStructSelectElement.style.display = 'block';
    orStructSelectElementLab.style.display = 'block';
  }

  public orCustomPortsBitChecked() {
    const orBandwidthInputElement = document.getElementById('orCustomPortsBandwidthInput');
    const orBandwidthInputElementLab = document.getElementById('orCustomPortsBandwidthInputLabel');
    const orStructSelectElement = document.getElementById('orCustomPortsStruct');
    const orStructSelectElementLab = document.getElementById('orCustomPortsStructLabel');
    orBandwidthInputElement.style.display = 'none';
    orBandwidthInputElementLab.style.display = 'none';
    orStructSelectElement.style.display = 'none';
    orStructSelectElementLab.style.display = 'none';
  }

  public orCustomPortsVectorChecked() {
    const orBandwidthInputElement = document.getElementById('orCustomPortsBandwidthInput');
    const orBandwidthInputElementLab = document.getElementById('orCustomPortsBandwidthInputLabel');
    const orStructSelectElement = document.getElementById('orCustomPortsStruct');
    const orStructSelectElementLab = document.getElementById('orCustomPortsStructLabel');
    orBandwidthInputElement.style.display = 'block';
    orBandwidthInputElementLab.style.display = 'block';
    orStructSelectElement.style.display = 'none';
    orStructSelectElementLab.style.display = 'none';
  }

  public orCustomPortsCustomChecked() {
    const orBandwidthInputElement = document.getElementById('orCustomPortsBandwidthInput');
    const orBandwidthInputElementLab = document.getElementById('orCustomPortsBandwidthInputLabel');
    const orStructSelectElement = document.getElementById('orCustomPortsStruct');
    const orStructSelectElementLab = document.getElementById('orCustomPortsStructLabel');
    orBandwidthInputElement.style.display = 'none';
    orBandwidthInputElementLab.style.display = 'none';
    orStructSelectElement.style.display = 'block';
    orStructSelectElementLab.style.display = 'block';
  }

  public orCustomPortsBitChecked2() {
    const orBandwidthInputElement = document.getElementById('orCustomPortsBandwidthInput2');
    const orBandwidthInputElementLab = document.getElementById('orCustomPortsBandwidthInputLabel2');
    const orStructSelectElement = document.getElementById('orCustomPortsStruct2');
    const orStructSelectElementLab = document.getElementById('orCustomPortsStructLabel2');
    orBandwidthInputElement.style.display = 'none';
    orBandwidthInputElementLab.style.display = 'none';
    orStructSelectElement.style.display = 'none';
    orStructSelectElementLab.style.display = 'none';
  }

  public orCustomPortsVectorChecked2() {
    const orBandwidthInputElement = document.getElementById('orCustomPortsBandwidthInput2');
    const orBandwidthInputElementLab = document.getElementById('orCustomPortsBandwidthInputLabel2');
    const orStructSelectElement = document.getElementById('orCustomPortsStruct2');
    const orStructSelectElementLab = document.getElementById('orCustomPortsStructLabel2');
    orBandwidthInputElement.style.display = 'block';
    orBandwidthInputElementLab.style.display = 'block';
    orStructSelectElement.style.display = 'none';
    orStructSelectElementLab.style.display = 'none';
  }

  public orCustomPortsCustomChecked2() {
    const orBandwidthInputElement = document.getElementById('orCustomPortsBandwidthInput2');
    const orBandwidthInputElementLab = document.getElementById('orCustomPortsBandwidthInputLabel2');
    const orStructSelectElement = document.getElementById('orCustomPortsStruct2');
    const orStructSelectElementLab = document.getElementById('orCustomPortsStructLabel2');
    orBandwidthInputElement.style.display = 'none';
    orBandwidthInputElementLab.style.display = 'none';
    orStructSelectElement.style.display = 'block';
    orStructSelectElementLab.style.display = 'block';
  }

  public norBitChecked() {
    const norBandwidthInputElement = document.getElementById('norBandwidthInput');
    const norBandwidthInputElementLab = document.getElementById('norBandwidthInputLabel');
    const norStructSelectElement = document.getElementById('norStruct');
    const norStructSelectElementLab = document.getElementById('norStructLabel');
    norBandwidthInputElement.style.display = 'none';
    norBandwidthInputElementLab.style.display = 'none';
    norStructSelectElement.style.display = 'none';
    norStructSelectElementLab.style.display = 'none';
  }

  public norVectorChecked() {
    const norBandwidthInputElement = document.getElementById('norBandwidthInput');
    const norBandwidthInputElementLab = document.getElementById('norBandwidthInputLabel');
    const norStructSelectElement = document.getElementById('norStruct');
    const norStructSelectElementLab = document.getElementById('norStructLabel');
    norBandwidthInputElement.style.display = 'block';
    norBandwidthInputElementLab.style.display = 'block';
    norStructSelectElement.style.display = 'none';
    norStructSelectElementLab.style.display = 'none';
  }

  public norCustomChecked() {
    const norBandwidthInputElement = document.getElementById('norBandwidthInput');
    const norBandwidthInputElementLab = document.getElementById('norBandwidthInputLabel');
    const norStructSelectElement = document.getElementById('norStruct');
    const norStructSelectElementLab = document.getElementById('norStructLabel');
    norBandwidthInputElement.style.display = 'none';
    norBandwidthInputElementLab.style.display = 'none';
    norStructSelectElement.style.display = 'block';
    norStructSelectElementLab.style.display = 'block';
  }

  public norCustomPortsBitChecked() {
    const norBandwidthInputElement = document.getElementById('norCustomPortsBandwidthInput');
    const norBandwidthInputElementLab = document.getElementById('norCustomPortsBandwidthInputLabel');
    const norStructSelectElement = document.getElementById('norCustomPortsStruct');
    const norStructSelectElementLab = document.getElementById('norCustomPortsStructLabel');
    norBandwidthInputElement.style.display = 'none';
    norBandwidthInputElementLab.style.display = 'none';
    norStructSelectElement.style.display = 'none';
    norStructSelectElementLab.style.display = 'none';
  }

  public norCustomPortsVectorChecked() {
    const norBandwidthInputElement = document.getElementById('norCustomPortsBandwidthInput');
    const norBandwidthInputElementLab = document.getElementById('norCustomPortsBandwidthInputLabel');
    const norStructSelectElement = document.getElementById('norCustomPortsStruct');
    const norStructSelectElementLab = document.getElementById('norCustomPortsStructLabel');
    norBandwidthInputElement.style.display = 'block';
    norBandwidthInputElementLab.style.display = 'block';
    norStructSelectElement.style.display = 'none';
    norStructSelectElementLab.style.display = 'none';
  }

  public norCustomPortsCustomChecked() {
    const norBandwidthInputElement = document.getElementById('norCustomPortsBandwidthInput');
    const norBandwidthInputElementLab = document.getElementById('norCustomPortsBandwidthInputLabel');
    const norStructSelectElement = document.getElementById('norCustomPortsStruct');
    const norStructSelectElementLab = document.getElementById('norCustomPortsStructLabel');
    norBandwidthInputElement.style.display = 'none';
    norBandwidthInputElementLab.style.display = 'none';
    norStructSelectElement.style.display = 'block';
    norStructSelectElementLab.style.display = 'block';
  }

  public andBitChecked() {
    const andBandwidthInputElement = document.getElementById('andBandwidthInput');
    const andBandwidthInputElementLab = document.getElementById('andBandwidthInputLabel');
    const andStructSelectElement = document.getElementById('andStruct');
    const andStructSelectElementLab = document.getElementById('andStructLabel');
    andBandwidthInputElement.style.display = 'none';
    andBandwidthInputElementLab.style.display = 'none';
    andStructSelectElement.style.display = 'none';
    andStructSelectElementLab.style.display = 'none';
  }

  public andVectorChecked() {
    const andBandwidthInputElement = document.getElementById('andBandwidthInput');
    const andBandwidthInputElementLab = document.getElementById('andBandwidthInputLabel');
    const andStructSelectElement = document.getElementById('andStruct');
    const andStructSelectElementLab = document.getElementById('andStructLabel');
    andBandwidthInputElement.style.display = 'block';
    andBandwidthInputElementLab.style.display = 'block';
    andStructSelectElement.style.display = 'none';
    andStructSelectElementLab.style.display = 'none';
  }

  public andCustomChecked() {
    const andBandwidthInputElement = document.getElementById('andBandwidthInput');
    const andBandwidthInputElementLab = document.getElementById('andBandwidthInputLabel');
    const andStructSelectElement = document.getElementById('andStruct');
    const andStructSelectElementLab = document.getElementById('andStructLabel');
    andBandwidthInputElement.style.display = 'none';
    andBandwidthInputElementLab.style.display = 'none';
    andStructSelectElement.style.display = 'block';
    andStructSelectElementLab.style.display = 'block';
  }

  public andCustomPortsBitChecked() {
    const andBandwidthInputElement = document.getElementById('andCustomPortsBandwidthInput');
    const andBandwidthInputElementLab = document.getElementById('andCustomPortsBandwidthInputLabel');
    const andStructSelectElement = document.getElementById('andCustomPortsStruct');
    const andStructSelectElementLab = document.getElementById('andCustomPortsStructLabel');
    andBandwidthInputElement.style.display = 'none';
    andBandwidthInputElementLab.style.display = 'none';
    andStructSelectElement.style.display = 'none';
    andStructSelectElementLab.style.display = 'none';
  }

  public andCustomPortsVectorChecked() {
    const andBandwidthInputElement = document.getElementById('andCustomPortsBandwidthInput');
    const andBandwidthInputElementLab = document.getElementById('andCustomPortsBandwidthInputLabel');
    const andStructSelectElement = document.getElementById('andCustomPortsStruct');
    const andStructSelectElementLab = document.getElementById('andCustomPortsStructLabel');
    andBandwidthInputElement.style.display = 'block';
    andBandwidthInputElementLab.style.display = 'block';
    andStructSelectElement.style.display = 'none';
    andStructSelectElementLab.style.display = 'none';
  }

  public andCustomPortsCustomChecked() {
    const andBandwidthInputElement = document.getElementById('andCustomPortsBandwidthInput');
    const andBandwidthInputElementLab = document.getElementById('andCustomPortsBandwidthInputLabel');
    const andStructSelectElement = document.getElementById('andCustomPortsStruct');
    const andStructSelectElementLab = document.getElementById('andCustomPortsStructLabel');
    andBandwidthInputElement.style.display = 'none';
    andBandwidthInputElementLab.style.display = 'none';
    andStructSelectElement.style.display = 'block';
    andStructSelectElementLab.style.display = 'block';
  }

  public nandBitChecked() {
    const nandBandwidthInputElement = document.getElementById('nandBandwidthInput');
    const nandBandwidthInputElementLab = document.getElementById('nandBandwidthInputLabel');
    const nandStructSelectElement = document.getElementById('nandStruct');
    const nandStructSelectElementLab = document.getElementById('nandStructLabel');
    nandBandwidthInputElement.style.display = 'none';
    nandBandwidthInputElementLab.style.display = 'none';
    nandStructSelectElement.style.display = 'none';
    nandStructSelectElementLab.style.display = 'none';
  }

  public nandVectorChecked() {
    const nandBandwidthInputElement = document.getElementById('nandBandwidthInput');
    const nandBandwidthInputElementLab = document.getElementById('nandBandwidthInputLabel');
    const nandStructSelectElement = document.getElementById('nandStruct');
    const nandStructSelectElementLab = document.getElementById('nandStructLabel');
    nandBandwidthInputElement.style.display = 'block';
    nandBandwidthInputElementLab.style.display = 'block';
    nandStructSelectElement.style.display = 'none';
    nandStructSelectElementLab.style.display = 'none';
  }

  public nandCustomChecked() {
    const nandBandwidthInputElement = document.getElementById('nandBandwidthInput');
    const nandBandwidthInputElementLab = document.getElementById('nandBandwidthInputLabel');
    const nandStructSelectElement = document.getElementById('nandStruct');
    const nandStructSelectElementLab = document.getElementById('nandStructLabel');
    nandBandwidthInputElement.style.display = 'none';
    nandBandwidthInputElementLab.style.display = 'none';
    nandStructSelectElement.style.display = 'block';
    nandStructSelectElementLab.style.display = 'block';
  }

  public nandCustomPortsBitChecked() {
    const nandBandwidthInputElement = document.getElementById('nandCustomPortsBandwidthInput');
    const nandBandwidthInputElementLab = document.getElementById('nandCustomPortsBandwidthInputLabel');
    const nandStructSelectElement = document.getElementById('nandCustomPortsStruct');
    const nandStructSelectElementLab = document.getElementById('nandCustomPortsStructLabel');
    nandBandwidthInputElement.style.display = 'none';
    nandBandwidthInputElementLab.style.display = 'none';
    nandStructSelectElement.style.display = 'none';
    nandStructSelectElementLab.style.display = 'none';
  }

  public nandCustomPortsVectorChecked() {
    const nandBandwidthInputElement = document.getElementById('nandCustomPortsBandwidthInput');
    const nandBandwidthInputElementLab = document.getElementById('nandCustomPortsBandwidthInputLabel');
    const nandStructSelectElement = document.getElementById('nandCustomPortsStruct');
    const nandStructSelectElementLab = document.getElementById('nandCustomPortsStructLabel');
    nandBandwidthInputElement.style.display = 'block';
    nandBandwidthInputElementLab.style.display = 'block';
    nandStructSelectElement.style.display = 'none';
    nandStructSelectElementLab.style.display = 'none';
  }

  public nandCustomPortsCustomChecked() {
    const nandBandwidthInputElement = document.getElementById('nandCustomPortsBandwidthInput');
    const nandBandwidthInputElementLab = document.getElementById('nandCustomPortsBandwidthInputLabel');
    const nandStructSelectElement = document.getElementById('nandCustomPortsStruct');
    const nandStructSelectElementLab = document.getElementById('nandCustomPortsStructLabel');
    nandBandwidthInputElement.style.display = 'none';
    nandBandwidthInputElementLab.style.display = 'none';
    nandStructSelectElement.style.display = 'block';
    nandStructSelectElementLab.style.display = 'block';
  }

  public xorBitChecked() {
    const xorBandwidthInputElement = document.getElementById('xorBandwidthInput');
    const xorBandwidthInputElementLab = document.getElementById('xorBandwidthInputLabel');
    const xorStructSelectElement = document.getElementById('xorStruct');
    const xorStructSelectElementLab = document.getElementById('xorStructLabel');
    xorBandwidthInputElement.style.display = 'none';
    xorBandwidthInputElementLab.style.display = 'none';
    xorStructSelectElement.style.display = 'none';
    xorStructSelectElementLab.style.display = 'none';
  }

  public xorVectorChecked() {
    const xorBandwidthInputElement = document.getElementById('xorBandwidthInput');
    const xorBandwidthInputElementLab = document.getElementById('xorBandwidthInputLabel');
    const xorStructSelectElement = document.getElementById('xorStruct');
    const xorStructSelectElementLab = document.getElementById('xorStructLabel');
    xorBandwidthInputElement.style.display = 'block';
    xorBandwidthInputElementLab.style.display = 'block';
    xorStructSelectElement.style.display = 'none';
    xorStructSelectElementLab.style.display = 'none';
  }

  public xorCustomChecked() {
    const xorBandwidthInputElement = document.getElementById('xorBandwidthInput');
    const xorBandwidthInputElementLab = document.getElementById('xorBandwidthInputLabel');
    const xorStructSelectElement = document.getElementById('xorStruct');
    const xorStructSelectElementLab = document.getElementById('xorStructLabel');
    xorBandwidthInputElement.style.display = 'none';
    xorBandwidthInputElementLab.style.display = 'none';
    xorStructSelectElement.style.display = 'block';
    xorStructSelectElementLab.style.display = 'block';
  }

  public xorCustomPortsBitChecked() {
    const xorBandwidthInputElement = document.getElementById('xorCustomPortsBandwidthInput');
    const xorBandwidthInputElementLab = document.getElementById('xorCustomPortsBandwidthInputLabel');
    const xorStructSelectElement = document.getElementById('xorCustomPortsStruct');
    const xorStructSelectElementLab = document.getElementById('xorCustomPortsStructLabel');
    xorBandwidthInputElement.style.display = 'none';
    xorBandwidthInputElementLab.style.display = 'none';
    xorStructSelectElement.style.display = 'none';
    xorStructSelectElementLab.style.display = 'none';
  }

  public xorCustomPortsVectorChecked() {
    const xorBandwidthInputElement = document.getElementById('xorCustomPortsBandwidthInput');
    const xorBandwidthInputElementLab = document.getElementById('xorCustomPortsBandwidthInputLabel');
    const xorStructSelectElement = document.getElementById('xorCustomPortsStruct');
    const xorStructSelectElementLab = document.getElementById('xorCustomPortsStructLabel');
    xorBandwidthInputElement.style.display = 'block';
    xorBandwidthInputElementLab.style.display = 'block';
    xorStructSelectElement.style.display = 'none';
    xorStructSelectElementLab.style.display = 'none';
  }

  public xorCustomPortsCustomChecked() {
    const xorBandwidthInputElement = document.getElementById('xorCustomPortsBandwidthInput');
    const xorBandwidthInputElementLab = document.getElementById('xorCustomPortsBandwidthInputLabel');
    const xorStructSelectElement = document.getElementById('xorCustomPortsStruct');
    const xorStructSelectElementLab = document.getElementById('xorCustomPortsStructLabel');
    xorBandwidthInputElement.style.display = 'none';
    xorBandwidthInputElementLab.style.display = 'none';
    xorStructSelectElement.style.display = 'block';
    xorStructSelectElementLab.style.display = 'block';
  }

  public xnorBitChecked() {
    const xnorBandwidthInputElement = document.getElementById('xnorBandwidthInput');
    const xnorBandwidthInputElementLab = document.getElementById('xnorBandwidthInputLabel');
    const xnorStructSelectElement = document.getElementById('xnorStruct');
    const xnorStructSelectElementLab = document.getElementById('xnorStructLabel');
    xnorBandwidthInputElement.style.display = 'none';
    xnorBandwidthInputElementLab.style.display = 'none';
    xnorStructSelectElement.style.display = 'none';
    xnorStructSelectElementLab.style.display = 'none';
  }

  public xnorVectorChecked() {
    const xnorBandwidthInputElement = document.getElementById('xnorBandwidthInput');
    const xnorBandwidthInputElementLab = document.getElementById('xnorBandwidthInputLabel');
    const xnorStructSelectElement = document.getElementById('xnorStruct');
    const xnorStructSelectElementLab = document.getElementById('xnorStructLabel');
    xnorBandwidthInputElement.style.display = 'block';
    xnorBandwidthInputElementLab.style.display = 'block';
    xnorStructSelectElement.style.display = 'none';
    xnorStructSelectElementLab.style.display = 'none';
  }

  public xnorCustomChecked() {
    const xnorBandwidthInputElement = document.getElementById('xnorBandwidthInput');
    const xnorBandwidthInputElementLab = document.getElementById('xnorBandwidthInputLabel');
    const xnorStructSelectElement = document.getElementById('xnorStruct');
    const xnorStructSelectElementLab = document.getElementById('xnorStructLabel');
    xnorBandwidthInputElement.style.display = 'none';
    xnorBandwidthInputElementLab.style.display = 'none';
    xnorStructSelectElement.style.display = 'block';
    xnorStructSelectElementLab.style.display = 'block';
  }

  public xnorCustomPortsBitChecked() {
    const xnorBandwidthInputElement = document.getElementById('xnorCustomPortsBandwidthInput');
    const xnorBandwidthInputElementLab = document.getElementById('xnorCustomPortsBandwidthInputLabel');
    const xnorStructSelectElement = document.getElementById('xnorCustomPortsStruct');
    const xnorStructSelectElementLab = document.getElementById('xnorCustomPortsStructLabel');
    xnorBandwidthInputElement.style.display = 'none';
    xnorBandwidthInputElementLab.style.display = 'none';
    xnorStructSelectElement.style.display = 'none';
    xnorStructSelectElementLab.style.display = 'none';
  }

  public xnorCustomPortsVectorChecked() {
    const xnorBandwidthInputElement = document.getElementById('xnorCustomPortsBandwidthInput');
    const xnorBandwidthInputElementLab = document.getElementById('xnorCustomPortsBandwidthInputLabel');
    const xnorStructSelectElement = document.getElementById('xnorCustomPortsStruct');
    const xnorStructSelectElementLab = document.getElementById('xnorCustomPortsStructLabel');
    xnorBandwidthInputElement.style.display = 'block';
    xnorBandwidthInputElementLab.style.display = 'block';
    xnorStructSelectElement.style.display = 'none';
    xnorStructSelectElementLab.style.display = 'none';
  }

  public xnorCustomPortsCustomChecked() {
    const xnorBandwidthInputElement = document.getElementById('xnorCustomPortsBandwidthInput');
    const xnorBandwidthInputElementLab = document.getElementById('xnorCustomPortsBandwidthInputLabel');
    const xnorStructSelectElement = document.getElementById('xnorCustomPortsStruct');
    const xnorStructSelectElementLab = document.getElementById('xnorCustomPortsStructLabel');
    xnorBandwidthInputElement.style.display = 'none';
    xnorBandwidthInputElementLab.style.display = 'none';
    xnorStructSelectElement.style.display = 'block';
    xnorStructSelectElementLab.style.display = 'block';
  }

  public notBitChecked() {
    const notBandwidthInputElement = document.getElementById('notBandwidthInput');
    const notBandwidthInputElementLab = document.getElementById('notBandwidthInputLabel');
    const notStructSelectElement = document.getElementById('notStruct');
    const notStructSelectElementLab = document.getElementById('notStructLabel');
    notBandwidthInputElement.style.display = 'none';
    notBandwidthInputElementLab.style.display = 'none';
    notStructSelectElement.style.display = 'none';
    notStructSelectElementLab.style.display = 'none';
  }

  public notVectorChecked() {
    const notBandwidthInputElement = document.getElementById('notBandwidthInput');
    const notBandwidthInputElementLab = document.getElementById('notBandwidthInputLabel');
    const notStructSelectElement = document.getElementById('notStruct');
    const notStructSelectElementLab = document.getElementById('notStructLabel');
    notBandwidthInputElement.style.display = 'block';
    notBandwidthInputElementLab.style.display = 'block';
    notStructSelectElement.style.display = 'none';
    notStructSelectElementLab.style.display = 'none';
  }

  public notCustomChecked() {
    const notBandwidthInputElement = document.getElementById('notBandwidthInput');
    const notBandwidthInputElementLab = document.getElementById('notBandwidthInputLabel');
    const notStructSelectElement = document.getElementById('notStruct');
    const notStructSelectElementLab = document.getElementById('notStructLabel');
    notBandwidthInputElement.style.display = 'none';
    notBandwidthInputElementLab.style.display = 'none';
    notStructSelectElement.style.display = 'block';
    notStructSelectElementLab.style.display = 'block';
  }

  public multiplexorSingleSelChecked() {
    const multiplexorBandwidthDiv = document.getElementById('singleSelSelected');
    const multiplexorMultiplicityDiv = document.getElementById('multipleSelsSelected');
    multiplexorBandwidthDiv.style.display = 'block';
    multiplexorMultiplicityDiv.style.display = 'none';
  }

  public multiplexorMultipleSelChecked() {
    const multiplexorBandwidthDiv = document.getElementById('singleSelSelected');
    const multiplexorMultiplicityDiv = document.getElementById('multipleSelsSelected');
    multiplexorBandwidthDiv.style.display = 'none';
    multiplexorMultiplicityDiv.style.display = 'block';
  }

  public multiplexorSelBitChecked() {
    const multiplexorBandwidthInputElement = document.getElementById('multiplexorBandwidthInput');
    const multiplexorBandwidthInputElementLab = document.getElementById('multiplexorBandwidthInputLabel');
    const multiplexorStructSelectElement = document.getElementById('multiplexorStruct');
    const multiplexorStructSelectElementLab = document.getElementById('multiplexorStructLabel');
    const multiplexorStructKeyIndexLab = document.getElementById('mulIndexInputLabel');
    const multiplexorStructKeyIndex = document.getElementById('mulIndexInput');
    multiplexorBandwidthInputElement.style.display = 'none';
    multiplexorBandwidthInputElementLab.style.display = 'none';
    //multiplexorStructSelectElement.style.display = 'none';
    //multiplexorStructSelectElementLab.style.display = 'none';
    multiplexorStructKeyIndexLab.style.display = 'none';
    multiplexorStructKeyIndex.style.display = 'none';
  }

  public multiplexorSelVectorChecked() {
    const multiplexorBandwidthInputElement = document.getElementById('multiplexorBandwidthInput');
    const multiplexorBandwidthInputElementLab = document.getElementById('multiplexorBandwidthInputLabel');
    const multiplexorStructSelectElement = document.getElementById('multiplexorStruct');
    const multiplexorStructSelectElementLab = document.getElementById('multiplexorStructLabel');
    const multiplexorStructKeyIndexLab = document.getElementById('mulIndexInputLabel');
    const multiplexorStructKeyIndex = document.getElementById('mulIndexInput');
    multiplexorBandwidthInputElement.style.display = 'block';
    multiplexorBandwidthInputElementLab.style.display = 'block';
    multiplexorStructKeyIndexLab.style.display = 'block';
    multiplexorStructKeyIndex.style.display = 'block';
   // multiplexorStructSelectElement.style.display = 'block';
   // multiplexorStructSelectElementLab.style.display = 'block';
  }

  public mulDataBitChecked() {
    const multiplexorDataBandwidthInputElement = document.getElementById('mulDataBandwidthInput');
    const multiplexorDataBandwidthInputElementLab = document.getElementById('mulDataBandwidthInputLabel');
    const multiplexorDataStructSelectElement = document.getElementById('mulDataStruct');
    const multiplexorDataStructSelectElementLab = document.getElementById('mulDataStructLabel');
    const multiplexorDataStructPackageSekectLab = document.getElementById('mulDataPackageLabel');
    const multiplexorDataStructPackageSekect = document.getElementById('mulDataPackage');
    multiplexorDataBandwidthInputElement.style.display = 'none';
    multiplexorDataBandwidthInputElementLab.style.display = 'none';
    multiplexorDataStructSelectElement.style.display = 'none';
    multiplexorDataStructSelectElementLab.style.display = 'none';
    multiplexorDataStructPackageSekectLab.style.display = 'none';
    multiplexorDataStructPackageSekect.style.display = 'none';
  }

  public mulDataVectorChecked() {
    const multiplexorDataBandwidthInputElement = document.getElementById('mulDataBandwidthInput');
    const multiplexorDataBandwidthInputElementLab = document.getElementById('mulDataBandwidthInputLabel');
    const multiplexorDataStructSelectElement = document.getElementById('mulDataStruct');
    const multiplexorDataStructSelectElementLab = document.getElementById('mulDataStructLabel');
    const multiplexorDataStructPackageSekectLab = document.getElementById('mulDataPackageLabel');
    const multiplexorDataStructPackageSekect = document.getElementById('mulDataPackage');
    multiplexorDataBandwidthInputElement.style.display = 'block';
    multiplexorDataBandwidthInputElementLab.style.display = 'block';
    multiplexorDataStructSelectElement.style.display = 'none';
    multiplexorDataStructSelectElementLab.style.display = 'none';
    multiplexorDataStructPackageSekectLab.style.display = 'none';
    multiplexorDataStructPackageSekect.style.display = 'none';
  }

  public mulDataCustomChecked() {
    const multiplexorDataBandwidthInputElement = document.getElementById('mulDataBandwidthInput');
    const multiplexorDataBandwidthInputElementLab = document.getElementById('mulDataBandwidthInputLabel');
    const multiplexorDataStructSelectElement = document.getElementById('mulDataStruct');
    const multiplexorDataStructSelectElementLab = document.getElementById('mulDataStructLabel');
    const multiplexorDataStructPackageSekectLab = document.getElementById('mulDataPackageLabel');
    const multiplexorDataStructPackageSekect = document.getElementById('mulDataPackage');
    multiplexorDataBandwidthInputElement.style.display = 'none';
    multiplexorDataBandwidthInputElementLab.style.display = 'none';
    multiplexorDataStructSelectElement.style.display = 'block';
    multiplexorDataStructSelectElementLab.style.display = 'block';
    multiplexorDataStructPackageSekectLab.style.display = 'block';
    multiplexorDataStructPackageSekect.style.display = 'block';
  }

  public registerDataBitChecked() {
    const registerDataBandwidthInputElement = document.getElementById('registerBandwidthInput');
    const registerDataBandwidthInputElementLab = document.getElementById('registerBandwidthInputLabel');
    registerDataBandwidthInputElement.style.display = 'none';
    registerDataBandwidthInputElementLab.style.display = 'none';
  }

  public registerDataVectorChecked() {
    const registerDataBandwidthInputElement = document.getElementById('registerBandwidthInput');
    const registerDataBandwidthInputElementLab = document.getElementById('registerBandwidthInputLabel');
    registerDataBandwidthInputElement.style.display = 'block';
    registerDataBandwidthInputElementLab.style.display = 'block';
  }

  public checkInputStateForNewModule(mName: string, iName: string): void {
    this.textCheckNewModule = !(mName !== '' && iName !== '');
  }

  public checkInputStateFowNewPort(pName: string, pBandwidth: string): void {
    this.textCheckNewPort = !(pName !== '' && pBandwidth !== '');
  }

  public onModalWindowSubmitClicked(mName: string, iName: string) {
    const modal = document.getElementById('modalNewModule');
    const newModule: Module = new Module({
      id: null,
      name: mName,
      instance: iName,
      position: null,
    });
    modal.style.display = 'none';
    this.moduleDataSubmitted.emit(newModule);
  }

  public onModalWindowSubmitClickedNewPort(pName: string, pBandwidth: number, pDirection: string, pDataType: string) {
    let modal;

    if (pDirection === 'in')
      modal = document.getElementById('modalNewStandalonePortIn');
    else
      modal = document.getElementById('modalNewStandalonePortOut');

      modal.style.display = 'none';

    let bandwidth = 1;
    let struct = null;
    let bitChecked = pDirection === 'in' ? (document.getElementById('standAlonePBitRadio') as HTMLInputElement).checked : (document.getElementById('standAlonePBitRadioOut') as HTMLInputElement).checked;
    let structChecked = pDirection === 'in' ? (document.getElementById('standAlonePStructRadio') as HTMLInputElement).checked : (document.getElementById('standAlonePStructRadioOut') as HTMLInputElement).checked;

    if (bitChecked) {
      bandwidth = 1;
    } else if (structChecked) {
      bandwidth = null;
      struct = pDataType;
    } else {
      bandwidth = pBandwidth;
    }

    if (pDirection === 'in') {
      pDirection = 'out';
    } else {
      pDirection = 'in';
    }

    const newPort: Port = {
      parentElementId: null,
      parentElementPosition: null,
      id: pName,
      name: pName,
      bandwidth,
      direction: pDirection,
      standalone: true,
      bit: bitChecked,
      struct
    };

    this.portDataSubmitted.emit(newPort);
  }
  public onModalWindowSubmitClickedNewOR(orBandwidth: number, orName: string) {
    const modal = document.getElementById('modalNewOr');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('ORGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = orBandwidth;
    }
    const newOr: Or = {
      name: orName,
      id: null,
      position: null,
      bandwidth
    };
    this.orDataSubmitted.emit(newOr);
  }

  public onModalWindowSubmitClickedNewOrCustomPorts(orBandwidth: number, orName: string, orNumberOfInPorts: number) {
    const modal = document.getElementById('modalNewOrCustomPorts');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('ORCustomPortsGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = orBandwidth;
    }
    const newOrCustomPorts: OrCustomPorts = {
      name: orName,
      id: null,
      position: null,
      bandwidth,
      inPorts: orNumberOfInPorts,
      addingFromParsedCode:false,
    };
    this.orCustomPortsDataSubmitted.emit(newOrCustomPorts);
  }

  /*public onModalWindowSubmitClickedNewOrCustomPorts2(orBandwidth: number, orName: string, orNumberOfInPorts: number) {
    const modal = document.getElementById('modalNewOrCustomPorts2');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('ORCustomPortsGBitRadio2') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = orBandwidth;
    }
    const newOrCustomPorts2: OrCustomPorts2 = {
      name: orName,
      id: null,
      position: null,
      bandwidth,
      inPorts: [],
      inPortsAmount: orNumberOfInPorts
    };
    this.orCustomPortsDataSubmitted2.emit(newOrCustomPorts2);
  }*/

  public onModalWindowSubmitClickedNewAnd(andBandwidth: number, andName: string) {
    const modal = document.getElementById('modalNewAnd');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('ANDGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = andBandwidth;
    }
    const newAnd: And = {
      name: andName,
      id: null,
      position: null,
      bandwidth
    };
    this.andDataSubmitted.emit(newAnd);
  }

  public onModalWindowSubmitClickedNewAndCustomPorts(andBandwidth: number, andName: string, andNumberOfInPorts: number) {
    const modal = document.getElementById('modalNewAndCustomPorts');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('ANDCustomPortsGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = andBandwidth;
    }
    const newAndCustomPorts: AndCustomPorts = {
      name: andName,
      id: null,
      position: null,
      bandwidth,
      inPorts: andNumberOfInPorts,
      addingFromParsedCode: false,
    };
    this.andCustomPortsDataSubmitted.emit(newAndCustomPorts);
  }

  public onModalWindowSubmitClickedNewNor(norBandwidth: number, norName: string) {
    const modal = document.getElementById('modalNewNor');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('NORGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = norBandwidth;
    }
    const newNor: Nor = {
      name: norName,
      id: null,
      position: null,
      bandwidth
    };
    this.norDataSubmitted.emit(newNor);
  }

  public onModalWindowSubmitClickedNewNorCustomPorts(norBandwidth: number, norName: string, norNumberOfInPorts: number) {
    const modal = document.getElementById('modalNewNorCustomPorts');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('NORCustomPortsGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = norBandwidth;
    }
    const newNorCustomPorts: NorCustomPorts = {
      name: norName,
      id: null,
      position: null,
      bandwidth,
      inPorts: norNumberOfInPorts,
      addingFromParsedCode: false,
    };
    this.norCustomPortsDataSubmitted.emit(newNorCustomPorts);
  }

  public onModalWindowSubmitClickedNewNand(nandBandwidth: number, nandName: string) {
    const modal = document.getElementById('modalNewNand');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('NANDGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = nandBandwidth;
    }
    const newNand: Nand = {
      name: nandName,
      id: null,
      position: null,
      bandwidth
    };
    this.nandDataSubmitted.emit(newNand);
  }

  public onModalWindowSubmitClickedNewNandCustomPorts(nandBandwidth: number, nandName: string, nandNumberOfInPorts: number) {
    const modal = document.getElementById('modalNewNandCustomPorts');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('NANDCustomPortsGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = nandBandwidth;
    }
    const newNandCustomPorts: NandCustomPorts = {
      name: nandName,
      id: null,
      position: null,
      bandwidth,
      inPorts: nandNumberOfInPorts,
      addingFromParsedCode: false,
    };
    this.nandCustomPortsDataSubmitted.emit(newNandCustomPorts);
  }

  public onModalWindowSubmitClickedNewXor(xorBandwidth: number, xorName: string) {
    const modal = document.getElementById('modalNewXor');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('XORGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = xorBandwidth;
    }
    const newXor: Xor = {
      name: xorName,
      id: null,
      position: null,
      bandwidth
    };
    this.xorDataSubmitted.emit(newXor);
  }

  public onModalWindowSubmitClickedNewXorCustomPorts(xorBandwidth: number, xorName: string, xorNumberOfInPorts: number) {
    const modal = document.getElementById('modalNewXorCustomPorts');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('XORCustomPortsGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = xorBandwidth;
    }
    const newXorCustomPorts: XorCustomPorts = {
      name: xorName,
      id: null,
      position: null,
      bandwidth,
      inPorts: xorNumberOfInPorts,
      addingFromParsedCode: false,
    };
    this.xorCustomPortsDataSubmitted.emit(newXorCustomPorts);
  }

  public onModalWindowSubmitClickedNewXnor(xnorBandwidth: number, xnorName: string) {
    const modal = document.getElementById('modalNewXnor');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('XNORGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = xnorBandwidth;
    }
    const newXnor: Xnor = {
      name: xnorName,
      id: null,
      position: null,
      bandwidth
    };
    this.xnorDataSubmitted.emit(newXnor);
  }

  public onModalWindowSubmitClickedNewXnorCustomPorts(xnorBandwidth: number, xnorName: string, xnorNumberOfInPorts: number) {
    const modal = document.getElementById('modalNewXnorCustomPorts');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('XNORCustomPortsGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = xnorBandwidth;
    }
    const newXnorCustomPorts: XnorCustomPorts = {
      name: xnorName,
      id: null,
      position: null,
      bandwidth,
      inPorts: xnorNumberOfInPorts,
      addingFromParsedCode: false,
    };
    this.xnorCustomPortsDataSubmitted.emit(newXnorCustomPorts);
  }

  public onModalWindowSubmitClickedNewNot(notBandwidth: number, notName: string) {
    const modal = document.getElementById('modalNewNot');
    modal.style.display = 'none';
    let bandwidth;
    if ((document.getElementById('NOTGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = notBandwidth;
    }
    const newNot: Not = {
      name: notName,
      id: null,
      position: null,
      bandwidth,
      addingFromParsedCode: false,
    };
    this.notDataSubmitted.emit(newNot);
  }

  public onModalWindowSubmitClickedNewMULTIPLEXOR(
    mulDataBitRad: boolean, mulDatVectorRad: boolean, mulDatStructRad: boolean, mulDatBandwidth: number, mulDatStruct: string,
    mulName: string, mulTypeTwo: boolean, mulTypeFour: boolean, mulTypeEight: boolean) {
    const modal = document.getElementById('modalNewMultiplexor');
    modal.style.display = 'none';
    let keyIndex = null;
    const selPorts: Port[] = [];
    const dataPorts: Port[] = [];
    const dataPort: Port = {
      parentElementId: null,
      parentElementPosition: null,
      id: null,
      name: null,
      bandwidth: null,
      direction: null,
      standalone: null,
      bit: null,
      struct: null
    };

    if (mulTypeTwo) {
      // if it is supposed to be 2-to-1, create only one sel input
      const selPort: Port = {
        parentElementId: null,
        parentElementPosition: null,
        id: null,
        name: null,
        bandwidth: null,
        direction: null,
        standalone: null,
        bit: null,
        struct: null
      };
      //if (mulSelBitRad) {
        selPort.bit = true;
        selPort.bandwidth = 1;
        selPort.struct = null;
      /* } else if (mulSelVectorRad) {
        selPort.bit = false;
        selPort.bandwidth = mulSelBandiwdth;
        selPort.struct = null;
        keyIndex = 0;
      } */
      selPort.direction = 'sel';
      selPort.id = null;
      selPort.standalone = false;
      selPort.parentElementId = null;
      selPorts.push(selPort);
    } else if (mulTypeFour || mulTypeEight) {
      // multiple sel inputs for 4-to-1, 8-to-1
      const mulSelMultiplicity = mulTypeFour ? 2 : 3;
      //for (let i = 0; i < mulSelMultiplicity; i++) {
        const selPort: Port = {
          parentElementId: null,
          parentElementPosition: null,
          id: null,
          name: null,
          bandwidth: null,
          direction: null,
          standalone: null,
          bit: null,
          struct: null
        };
        selPort.bit = false;
        selPort.bandwidth = mulSelMultiplicity;
        selPort.struct = null;
        selPort.direction = 'sel';
        selPort.id = null;
        selPort.standalone = false;
        selPort.parentElementId = null;
        selPorts.push(selPort);
      //}
    }

    // datatype of input lines
    if (mulDataBitRad) {
      dataPort.bit = true;
      dataPort.bandwidth = 1;
      dataPort.struct = null;
    } else if (mulDatVectorRad) {
      dataPort.bit = false;
      dataPort.bandwidth = mulDatBandwidth;
      dataPort.struct = null;
    } else if (mulDatStructRad) {
      dataPort.bit = false;
      dataPort.bandwidth = null;
      dataPort.struct = mulDatStruct;
    }

    // input lines
    dataPort.direction = 'in';
    dataPort.id = null;
    dataPort.standalone = false;
    dataPort.parentElementId = null;

    // the number of input lines
    let mulDataMultiplicity = 2;
    if (mulTypeFour) mulDataMultiplicity = 4
    if (mulTypeEight) mulDataMultiplicity = 8

    for (let j = 0; j < mulDataMultiplicity; j++) {
      dataPorts.push(dataPort);
    }

    const newMultiplexor: Multiplexor = {
      name: mulName,
      id: null,
      position: null,
      struct: null,
      selPorts,
      dataPorts,
      dataBandwidth: dataPort.bandwidth,
      selBandwidth: selPorts[0].bandwidth,
      keyIndex
    };

    //console.log(newMultiplexor)

    this.multiplexorDataSubmitted.emit(newMultiplexor);
  }

  public onModalWindowSubmitClickedNewDECODER(decoderDataBandwidth: number, decodEnable: boolean, decoderOutSingle: boolean, decoderOutMultiple: boolean,
    decoderInstanceName: string) {
    const modalDec = document.getElementById('modalNewDecoder');
    modalDec.style.display = 'none';
    const decoder: Decoder = {
      id: null,
      name: decoderInstanceName,
      position: null,
      outSingle: decoderOutSingle ? decoderOutSingle : false,
      dataBandwidth: decoderDataBandwidth,
      enable: decodEnable
    };
    this.decoderDataSubmitted.emit(decoder);
  }

  public onModalWindowSubmitClickedNewENCODER(encoderDataBandwidth: number, encoderInstanceName: string) {
    const modalEnc = document.getElementById('modalNewEncoder');
    modalEnc.style.display = 'none';
    const encoder: Encoder = {
      id: null,
      name: encoderInstanceName,
      position: null,
      dataBandwidth: encoderDataBandwidth
    };
    this.encoderDataSubmitted.emit(encoder);
  }

  public onModalWindowSubmitClickedNewAdder(adderDataBandwidth: number, adderInstanceName: string) {
    const modalAdd = document.getElementById('modalNewAdder');
    modalAdd.style.display = 'none';
    const adder: Adder = {
      id: null,
      name: adderInstanceName,
      position: null,
      dataBandwidth: adderDataBandwidth,
      half: true,
      addingFromParsedCode:false
    };
    this.adderDataSubmitted.emit(adder);
  }

  public onModalWindowSubmitClickedNewRegister(registerDataBandwidth: number, registerInstanceName: string, enableChecked: boolean, resetChecked: boolean) {
    const modalReg = document.getElementById('modalNewRegister');
    let bandwidth;
    if ((document.getElementById('registerDataBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = registerDataBandwidth;
    }
    modalReg.style.display = 'none';
    const register: Register = {
      id: null,
      name: registerInstanceName,
      position: null,
      dataBandwidth: bandwidth,
      struct:null,
      enablePort: enableChecked,
      resetPort: resetChecked
    };

    this.registerDataSubmitted.emit(register);
  }

  public onModalWindowSubmitClickedDiagramName(saveFileName: string) {
    const modal = document.getElementById('modalSaveDiagram');
    modal.style.display = 'none';

    if(!saveFileName.endsWith(".json")){
      saveFileName += ".json"
    }

    this.FileNameToSaveSubmitted.emit(saveFileName);
  }

  public onModalWindowSubmitClickedVhdlSourceCodeName(saveFileName: string) {
    const modal = document.getElementById('modalSaveVhdlFile');
    modal.style.display = 'none';
    
    if(!saveFileName.endsWith(".vhd")){
      saveFileName += ".vhd"
    }
    
    this.FileNameToSaveVhdlSourceSubmitted.emit(saveFileName);
  }

  public onModalWindowSubmitClickedSystemVerilogSourceCodeName(saveFileName: string) {
    const modal = document.getElementById('modalSaveSystemVerilogFile');
    modal.style.display = 'none';
    
    if(!saveFileName.endsWith(".sv")){
      saveFileName += ".sv"
    }

    this.FileNameToSaveSystemVerilogSourceSubmitted.emit(saveFileName);
    

  }

  public onModalWindowSubmitClickedLoadModuleFromCode(goalFileName: string, moduleInstance: string) {
    const modal = document.getElementById('modalExistingModule');
    modal.style.display = 'none';
    const newModule: Module = new Module({
      id: null,
      name: goalFileName,
      docId: goalFileName,
      instance: moduleInstance,
      position: null
    });
    this.existingModuleDataSubmitted.emit(newModule);
  }

  public onModalWindowSubmitClickedLoadModuleFromJSON(chosenFile: string) {
    const modal = document.getElementById('modalLoadDiagram');
    modal.style.display = 'none';
    const chosenJson: RepoFileReference = {
      name: chosenFile,
      parentModuleInstance: null,
      length: 0
    };
    this.FileNameToLoadSubmitted.emit(chosenJson);
  }

  public setPackages(availablePackages: ParsedPackages) {
    this.availablePackages = availablePackages;
    this.packageDefines = availablePackages.items[0].package.dataTypes;
  }

  public onStandaloneSelectChanged(event) {
    this.availablePackages.items.forEach(item => {
      if (item.package.name === event) {
        this.packageDefines = item.package.dataTypes;
      }
    });
  }
}
