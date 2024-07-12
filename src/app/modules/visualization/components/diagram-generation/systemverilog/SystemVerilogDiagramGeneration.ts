import { SystemVerilogLexer } from './SystemVerilogLexer';
import { SystemVerilogParser, 
         Module_declarationContext, 
         List_of_port_declarationsContext,
         Port_declContext,
         Port_directionContext,
         Data_typeContext,
         Class_typeContext,
         Packed_dimensionContext,
         Port_identifierContext,
         Module_itemContext,
         Data_declarationContext,
         Interface_port_declarationContext,
         Parameter_port_listContext,
         Parameter_port_declarationContext,
         Param_assignmentContext,
         List_of_variable_assignmentsContext,
         Variable_lvalueContext,
         ExpressionContext,
         Unary_operatorContext,
         PrimaryContext,
         Module_program_interface_instantiationContext,
         Name_of_instanceContext,
         List_of_port_connectionsContext,
         Named_port_connectionContext,
         Always_constructContext,
         Statement_or_nullContext,
         Case_statementContext,
         Case_expressionContext,
         Case_itemContext,
         Operator_assignmentContext,
         Procedural_timing_controlContext,
         Event_expressionContext,
         Edge_identifierContext,
         Seq_blockContext,
         Conditional_statementContext,
         Cond_predicateContext,
         Always_keywordContext,
         Nonblocking_assignmentContext,
         Blocking_assignmentContext,
         Hierarchical_identifierContext
        } from './SystemVerilogParser';
import { SystemVerilogParserListener } from './SystemVerilogParserListener';
import { ANTLRInputStream, CommonTokenStream } from "antlr4ts";
import {Port} from "../../classes/port";
import {AndCustomPorts} from "../../classes/andCustomPorts";
import {OrCustomPorts} from "../../classes/orCustomPorts";
import {NorCustomPorts} from "../../classes/norCustomPorts";
import {XorCustomPorts} from "../../classes/xorCustomPorts";
import {NandCustomPorts} from "../../classes/nandCustomPorts";
import {XnorCustomPorts} from "../../classes/xnorCustomPorts";
import {Not} from "../../classes/logicGate";
import {Multiplexor} from "../../classes/multiplexor";
import {Decoder} from '../../classes/decoder';
import {Encoder} from '../../classes/encoder';
import {Adder} from '../../classes/adder';
import {Subtractor} from '../../classes/subtractor';
import {Comparator} from '../../classes/comparator';
import {Register} from '../../classes/register';
import {Ram} from '../../classes/ram';
import {ParsedModule} from '../../classes/parsedModule';
import { insert } from 'ot-text-unicode';
import { param } from 'jquery';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Statement, Unary } from '@angular/compiler';
import { element} from 'protractor';
import {Link} from '../../classes/link';
import { link } from 'fs';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

interface IdentifiedElement {
  name: string;
  bandwidth: number;
  struct: string;
  addrwidth: number;
  elementtype: string;
}

interface ModuleInputPorts{
  moduleName: string,
  moduleInstanceName: string,
  portConnections:[{portName: string, sourceName: string}]
}

export class SystemVerilogDiagramGenerationComponent { //implements SystemVerilogParserListener
  constructor() {
      
  }

  

  public identifiedElements: IdentifiedElement[] = [];
  public inPorts: Port[] = [];
  public outPorts: Port[] = [];
  public ands: AndCustomPorts[] = [];
  public ors: OrCustomPorts[] = [];
  public nands: NandCustomPorts[] = [];
  public nors: NorCustomPorts[] = [];
  public xors: XorCustomPorts[] = [];
  public xnors: XnorCustomPorts[] = [];
  public nots: Not[] = [];
  public multiplexors: Multiplexor[] = [];
  public decoders: Decoder[] = [];
  public encoders: Encoder[] = [];
  public adders: Adder[] = [];
  public subtractors: Subtractor[] = [];
  public comparators: Comparator[] = [];
  public registers: Register[] = [];
  public rams: Ram[] = [];
  public modules: ParsedModule[] = []
  public inputsForModules : ModuleInputPorts[] = []
  public links : Link[] = []
  public tempLinks: Link[] = []
  public params: { [key: string]: any }[] = [];
  public numberOfInPorts:number;
  public parsingRamActive = false
    
  public findNode(node, requestedObjectType){
    
    if (node instanceof requestedObjectType) {
      return node;
    } else if (node.children != null) {
      
      let foundObject = null;
        
      for (var i = 0; foundObject == null && i < node.children.length; i++) {
        foundObject = this.findNode(node.children[i], requestedObjectType);
      }     
      return foundObject;
    }
        
    return null;
  }


  private searchTreeNodes(node, requestedObjectType, foundObjects) {
        
    if (Object.prototype.toString.call(foundObjects) !== "[object Array]") {
        
        foundObjects = [];
      }
      
      if (node instanceof requestedObjectType) {
        
        foundObjects.push(node);
      } 
      else if (node.children != null) {
        
        for (var i = 0; i < node.children.length; i++) {
          this.searchTreeNodes(node.children[i], requestedObjectType, foundObjects);
        }     
      }

      return foundObjects;
        
  }

  private findSources(sourcesNode){
    for(var i = sourcesNode.children.length-1; i>= 0; i--){
      if(sourcesNode.children[i] instanceof ExpressionContext){
        this.tempLinks.push({
          source:{id:sourcesNode.children[i].text,port:""},
          target:{id:"",port:""},
        })
        this.numberOfInPorts++
        
        if(sourcesNode.children[0].children.length == 1){
          this.tempLinks.push({
            source:{id:sourcesNode.children[0].text,port:""},
            target:{id:"",port:""},
          })
          this.numberOfInPorts++
          break
        }
        else{
          this.findSources(sourcesNode.children[0])
          return
        }
        
      }
      /*if(sourcesNode.children[i] instanceof TerminalNode){
        if(operation == null){
          operation =sourcesNode.children[i].text
        }
        if(operation != "~"){
          numberOfPorts++
        }
      }*/
    }
  }

  private handleMux(muxInputsNode,muxNameNode){
    this.tempLinks = []
    this.numberOfInPorts = 0
    for(var i = 0; i<muxInputsNode.children.length; i++){
      if(muxInputsNode.children[i] instanceof ExpressionContext){
        if(i == 0){
          this.tempLinks.push({
            source:{id:muxInputsNode.children[i].text,port:""},
            target:{id:muxNameNode.text,port:muxNameNode.text + "_sel"},
          })
        }
        else{
          this.tempLinks.push({
            source:{id:muxInputsNode.children[i].text,port:""},
            target:{id:muxNameNode.text,port:muxNameNode.text + "_in" + (this.numberOfInPorts+1)},
          })
          this.numberOfInPorts++
        }
      }
    }
    this.tempLinks.forEach( link =>{
      this.links.push(link)
    })
    
    var foundElement = this.identifiedElements.find(element => element.name == muxNameNode.text)
    const index = this.identifiedElements.findIndex(element => element.name == muxNameNode.text)

    if (index !== -1) {
      this.identifiedElements[index].elementtype = "multiplexor"
    }
    if(foundElement != null){
      var selBit = true
      var selBandwidth = 1
      
      if(this.numberOfInPorts == 4){
        var selBit = false
        var selBandwidth = 2
      }
      else if(this.numberOfInPorts == 8){
        var selBit = false
        var selBandwidth = 3
      }
      
      var dataPorts = []
      var inBit = false
      if(foundElement.bandwidth == 1){
        var inBit = true
      }

      for(var i = 0; i< this.numberOfInPorts; i++){
        dataPorts.push({
          parentElementId: null,
          parentElementPosition: null,
          id: null,
          name: null,
          bandwidth: foundElement.bandwidth,
          direction: "in",
          standalone: false,
          bit: inBit,
          struct: foundElement.struct
      },)
      }

      this.multiplexors.push({
        name: foundElement.name,
        id: foundElement.name,
        position: {x:300, y:50},
        struct: foundElement.struct,
        selPorts: [
            {
              parentElementId: null,
              parentElementPosition: null,
              id: null,
              name: null,
              bandwidth: selBandwidth,
              direction: "sel",
              standalone: false,
              bit: selBit,
              struct: null
            }
        ],
        dataPorts: dataPorts,
        dataBandwidth: foundElement.bandwidth,
        selBandwidth: selBandwidth,
        keyIndex: null
      })
    }
  }

  private handleComplexCountingElements(sourceNode, targetNode){
    if(sourceNode.children.length == 1){
      var declarationNode = this.findNode(sourceNode.children[0], ExpressionContext)
      var foundElement = this.identifiedElements.find(element => element.name == targetNode.text)
      const index = this.identifiedElements.findIndex(element => element.name == targetNode.text)

      if (index !== -1) {
        this.identifiedElements[index].elementtype = "comparator"
      }
      this.comparators.push({
        name:foundElement.name,
        id: foundElement.name,
        position: {x:300, y:50},
        dataBandwidth:foundElement.bandwidth,
        type: declarationNode.children[1].text,
        addingFromParsedCode: true
      })
      this.links.push({
        source:{id:declarationNode.children[0].text, port:""},
        target:{id:targetNode.text,port:targetNode.text + "_in1"},
      })
      this.links.push({
        source:{id:declarationNode.children[2].text, port:""},
        target:{id:targetNode.text,port:targetNode.text + "_in2"},
      })
    }
    else{
      if(sourceNode.children[1].text == "+"){
        var foundElement = this.identifiedElements.find(element => element.name == targetNode.text)
        const index = this.identifiedElements.findIndex(element => element.name == targetNode.text)

        if (index !== -1) {
          this.identifiedElements[index].elementtype = "adder"
        }
        this.adders.push({
          name:foundElement.name,
          id: foundElement.name,
          position: {x:300, y:50},
          dataBandwidth:foundElement.bandwidth,
          half:true,
          addingFromParsedCode:true
        })
      }
      else if (sourceNode.children[1].text == "-"){
        var foundElement = this.identifiedElements.find(element => element.name == targetNode.text)
        const index = this.identifiedElements.findIndex(element => element.name == targetNode.text)

        if (index !== -1) {
          this.identifiedElements[index].elementtype = "subtractor"
        }
        this.subtractors.push({
          name:foundElement.name,
          id: foundElement.name,
          position: {x:300, y:50},
          dataBandwidth:foundElement.bandwidth,
          addingFromParsedCode: true
        })
      }
      this.links.push({
        source:{id:sourceNode.children[0].text, port:""},
        target:{id:targetNode.text,port:targetNode.text + "_in1"},
      })
      this.links.push({
        source:{id:sourceNode.children[2].text, port:""},
        target:{id:targetNode.text,port:targetNode.text + "_in2"},
      })
    }
  }

  private handleAssignment (node){
    this.tempLinks = []
    this.numberOfInPorts = 0;
    var operation = null
    var targetNode = this.findNode(node, Variable_lvalueContext)
    var sourcesNode = this.findNode(node, ExpressionContext)
    //for mux
    if(sourcesNode.text.indexOf("?") != -1 && sourcesNode.text.indexOf(":") != -1){
      this.handleMux(sourcesNode,targetNode)
    }
    // for adder subtractor and comparators
    else if(sourcesNode.text.indexOf("+") != -1 || sourcesNode.text.indexOf("-") != -1
    || sourcesNode.text.indexOf(">") != -1 || sourcesNode.text.indexOf("<") != -1
    || sourcesNode.text.indexOf(">=") != -1 || sourcesNode.text.indexOf("<=") != -1
    || sourcesNode.text.indexOf("==") != -1 || sourcesNode.text.indexOf("!=") != -1){
      this.handleComplexCountingElements(sourcesNode, targetNode)
    }
    //for logic gates
    else{
      //var sourceNode
      if(sourcesNode.children[0] instanceof Unary_operatorContext){
        operation = sourcesNode.children[0].text
        var sourcesNode = this.findNode(sourcesNode.children[1], ExpressionContext)
      }
      if(sourcesNode== null){
        var sourcesNode = this.findNode(node, PrimaryContext)
        this.numberOfInPorts++
        this.tempLinks.push({
          source:{id:sourcesNode.children[0].text,port:""},
          target:{id:"",port:""},
        })
        for (var i = 0; i<this.tempLinks.length;i++){
          this.tempLinks[i].target.id = targetNode.text
          this.tempLinks[i].target.port = targetNode.text + "_in" + (this.tempLinks.length-i)
          this.tempLinks[i].target.magnet = "portBody"
          this.links.push(this.tempLinks[i])
        }
      }
      else{
        this.findSources(sourcesNode)
      }
      if(sourcesNode.children.length == 3){
        if(operation != null){
          operation += sourcesNode.children[1].text
        }
        else{
          operation = sourcesNode.children[1].text
        }
        for (var i = 0; i<this.tempLinks.length;i++){
          this.tempLinks[i].target.id = targetNode.text
          this.tempLinks[i].target.port = targetNode.text + "_in" + (this.tempLinks.length-i)
          this.tempLinks[i].target.magnet = "portBody"
          this.links.push(this.tempLinks[i])
        }
      }

      if(operation != null){
        var matchingElement = this.identifiedElements.find(element => element.name == targetNode.text)
        const index = this.identifiedElements.findIndex(element => element.name == targetNode.text)

        if (index !== -1) {
          this.identifiedElements[index].elementtype = "logic gate"
        }
        switch (operation) {
          case "&":
              this.ands.push({
                name: matchingElement.name,
                id: matchingElement.name,
                bandwidth: matchingElement.bandwidth,
                inPorts: this.numberOfInPorts,
                addingFromParsedCode: true,
                position:{x:200,y:50}
              })
              break;
          case "|":
              this.ors.push({
                name: matchingElement.name,
                id: matchingElement.name,
                bandwidth: matchingElement.bandwidth,
                inPorts: this.numberOfInPorts,
                addingFromParsedCode: true,
                position:{x:200,y:50}
              })
              break;
          case "~|":
              this.nors.push({
                name: matchingElement.name,
                id: matchingElement.name,
                bandwidth: matchingElement.bandwidth,
                inPorts: this.numberOfInPorts,
                addingFromParsedCode: true,
                position:{x:200,y:50}
              })
              break;
          case "~&":
              this.nands.push({
                name: matchingElement.name,
                id: matchingElement.name,
                bandwidth: matchingElement.bandwidth,
                inPorts: this.numberOfInPorts,
                addingFromParsedCode: true,
                position:{x:200,y:50}
              })
              break;
          case "^":
              this.xors.push({
                name: matchingElement.name,
                id: matchingElement.name,
                bandwidth: matchingElement.bandwidth,
                inPorts: this.numberOfInPorts,
                addingFromParsedCode: true,
                position:{x:200,y:50}
              })
              break;
          case "~^":
              this.xnors.push({
                name: matchingElement.name,
                id: matchingElement.name,
                bandwidth: matchingElement.bandwidth,
                inPorts: this.numberOfInPorts,
                addingFromParsedCode: true,
                position:{x:200,y:50}
              })
              break;
          case "~":
              this.nots.push({
                name: matchingElement.name,
                id: matchingElement.name,
                bandwidth: matchingElement.bandwidth,
                addingFromParsedCode: true,
                position:{x:200,y:50}
              })
              break;
          default:
              break;
        } 
      }
      else{
        var outputPort = this.outPorts.find(element => element.name == targetNode.text)
        var sourceName = this.findNode(node,ExpressionContext)
        this.links.push({
          source:{id:sourceName.text,port:""},
          target:{id:targetNode.text,port:targetNode.text}
        })
      }
    }
    
  }

  private handleModule(node){
    var moduleName = node.children[0].text
    var moduleInstanceNode = this.findNode(node, Name_of_instanceContext)
    var moduleInstanceName = moduleInstanceNode.text
    this.identifiedElements.push({name:moduleInstanceName,bandwidth:null,struct:null,addrwidth:null,elementtype:"module"})
    var ListOfPortsNode = this.findNode(node, List_of_port_connectionsContext)
    var portName
    var assignedToNode
    var assignedTo
    var portDirection = ""
    var validModulePort
    var mainPorts: ParsedModule["mainPorts"] = [{bandwidth:null,dataType:null,direction:portDirection,id:null,name:portName}]
    var moduleInputs: ModuleInputPorts = {moduleName:moduleName,moduleInstanceName:moduleInstanceName,portConnections:[{portName:"",sourceName:""}]}
    //var inPortsCounter = 0
    //var outPortsCounter = 0
    for(var i = 0; i< ListOfPortsNode.children.length; i++){
      validModulePort =false
      if(ListOfPortsNode.children[i] instanceof Named_port_connectionContext){
        validModulePort = true
        portName = ListOfPortsNode.children[i].children[1].text

        assignedToNode = this.findNode(ListOfPortsNode.children[i], ExpressionContext)
        assignedTo = assignedToNode.text

        if(assignedTo.startsWith(moduleInstanceName + "_" + portName + "_to")){
          portDirection = "out"
          //outPortsCounter++
          assignedTo = assignedTo.substring(assignedTo.indexOf("_to_")+4)
        }
        else{
          portDirection = "in"
          //inPortsCounter++
          this.links.push({
            source:{id:assignedTo, port:""},
            target:{id:moduleInstanceName, port:moduleInstanceName + "_" + portName}
          })
        }
      }
      if(validModulePort == true){
        if(portDirection == "out"){
          var foundConnection = this.identifiedElements.find(element => element.name.startsWith(moduleInstanceName + "_" + portName + "_to"))
          if(foundConnection.bandwidth == 1){
            mainPorts.push({bandwidth:"bit",dataType:"logic",direction:portDirection,id:null,name:portName})
          }
          else {
            if(foundConnection.bandwidth != null){
              mainPorts.push({bandwidth:foundConnection.bandwidth.toString(),dataType:"logic",direction:portDirection,id:null,name:portName})
            }
            else if(foundConnection.struct != null){
              mainPorts.push({bandwidth:null,dataType:foundConnection.struct,direction:portDirection,id:null,name:portName})
            }
          }
        }
        else{
          mainPorts.push({bandwidth:null,dataType:null,direction:portDirection,id:null,name:portName})
          moduleInputs.portConnections.push({portName:portName,sourceName:assignedTo})
        }
      }

    }
    
    mainPorts.shift()
    moduleInputs.portConnections.shift()
    this.inputsForModules.push(moduleInputs)
    

    this.modules.push({
      mainModuleName:moduleName,
      mainModuleInstance:moduleInstanceName,
      mainPorts:mainPorts,
      modules:[{
        id: "",
        instance:"",
        modulePorts:[{
          bandwidth: "",
          dataType: "",
          direction: "",
          id: "",
          name: "",
        }],
        name:""
      }]


    })

  }

  private handleMemoryElements(timingControlNode, statementNode, alwaysBlockNode){
    var checkIfRamNode = this.findNode(alwaysBlockNode, Always_keywordContext)
    
    // handle RAM
    if(checkIfRamNode != null && checkIfRamNode.text == "always_ff"){
      var ramClkName
      var ramWeName
      
      var clkInputNode = this.findNode(timingControlNode, Event_expressionContext)
      ramClkName = clkInputNode.children[1].text
      
      var ramFunctionNode = this.findNode(statementNode, Seq_blockContext)
      var ramWeNode = this.findNode(ramFunctionNode.children[1],Cond_predicateContext)
      ramWeName = ramWeNode.text
      var ramDataInput = this.findNode(ramFunctionNode.children[1],Seq_blockContext)
      var ramNameNode = this.findNode(ramDataInput, Variable_lvalueContext)
      var ramOutputNode = this.findNode(ramDataInput, Nonblocking_assignmentContext)
      this.links.push({
        source:{id:ramClkName, port:""},
        target:{id:ramNameNode.children[0].text,port:ramNameNode.children[0].text + "_clk"}
      })
      this.links.push({
        source:{id:ramWeName, port:""},
        target:{id:ramNameNode.children[0].text,port:ramNameNode.children[0].text + "_we"}
      })
      var foundElement = this.identifiedElements.find(element => element.name == ramNameNode.children[0].text)
      const index = this.identifiedElements.findIndex(element => element.name == ramNameNode.children[0].text)

      if (index !== -1) {
        this.identifiedElements[index].elementtype = "ram"
      }
      var ramStoreStruct = false
      if(foundElement.struct!= null){
        ramStoreStruct = true
      }
      this.rams.push({
        name: foundElement.name,
        id: foundElement.name,
        position:{x:300,y:50},
        dataBandwidth: foundElement.bandwidth,
        addressBandwidth: foundElement.addrwidth,
        isDataStruct:ramStoreStruct,
        dataStruct: foundElement.struct
      })
      var ramaddrNode =this.findNode(ramNameNode.children[1], ExpressionContext)
      this.links.push({
        source:{id:ramaddrNode.text, port:""},
        target:{id:ramNameNode.children[0].text,port:ramNameNode.children[0].text + "_addr"}
      }) 
      this.links.push({
        source:{id:ramOutputNode.children[2].text, port:""},
        target:{id:ramNameNode.children[0].text,port:ramNameNode.children[0].text + "_in"}
      })
      this.parsingRamActive = true

      return
    }


    //handle register
    var timeControlEventExpression = this.findNode(timingControlNode, Event_expressionContext)
    var edgeCounter = 0
    var regClkName
    var regRstName
    var regEnbName
    var regInName
    for(var i = 0; i< timeControlEventExpression.children.length; i++){
      if(timeControlEventExpression.children[i] instanceof Event_expressionContext &&
        timeControlEventExpression.children[i].children[0] instanceof Edge_identifierContext
      ){
        if(edgeCounter == 0){
          regClkName = timeControlEventExpression.children[i].children[1].text
          edgeCounter++
        }
        else{
          regRstName = timeControlEventExpression.children[i].children[1].text
        }
      }
      else if(timeControlEventExpression.children[i] instanceof Edge_identifierContext){
        if(edgeCounter == 0){
          regClkName = timeControlEventExpression.children[i + 1].text
          edgeCounter++
        }
      }
    }

    var regFunctionNode = this.findNode(statementNode, Seq_blockContext)
    var conditionalNode = this.findNode(regFunctionNode, Conditional_statementContext)
    if(conditionalNode == null){
      var regAssignment = this.findNode(regFunctionNode, Operator_assignmentContext)
      this.links.push({
        source:{id:regAssignment.children[2].text, port:""},
        target:{id:regAssignment.children[0].text, port:regAssignment.children[0].text + "_in"}
      })
      var foundreg = this.identifiedElements.find(element => element.name == regAssignment.children[0].text)
      const index = this.identifiedElements.findIndex(element => element.name == regAssignment.children[0].text)

      if (index !== -1) {
        this.identifiedElements[index].elementtype = "register"
      }
      if(foundreg.struct == null){
        foundreg.struct = ""
      }
      this.registers.push({
        name:foundreg.name,
        id:foundreg.name,
        position:{x:300,y:50},
        dataBandwidth:foundreg.bandwidth,
        struct:foundreg.struct,
        enablePort:false,
        resetPort:false
      })
    }
    else{
      var conPredicateNode = this.findNode(conditionalNode, Cond_predicateContext)
      if(conPredicateNode.text == regRstName){
        var enablePresent = false
        if(conditionalNode.children.length != 7){
          var regAssignment = this.findNode(regFunctionNode.children[2], Operator_assignmentContext)
          this.links.push({
            source:{id:regAssignment.children[2].text, port:""},
            target:{id:regAssignment.children[0].text, port:regAssignment.children[0].text + "_in"}
          })
        }
        else{
          enablePresent = true
          var fullRegisterEnable = this.findNode(conditionalNode.children[6], Conditional_statementContext)
          var enableNode = this.findNode(fullRegisterEnable, Cond_predicateContext)
          var regAssignment = this.findNode(fullRegisterEnable.children[4], Operator_assignmentContext)
          this.links.push({
            source:{id:enableNode.text, port:""},
            target:{id:regAssignment.children[0].text, port:regAssignment.children[0].text + "_en"}
          })
          this.links.push({
            source:{id:regAssignment.children[2].text, port:""},
            target:{id:regAssignment.children[0].text, port:regAssignment.children[0].text + "_in"}
          })
        }

        var foundreg = this.identifiedElements.find(element => element.name == regAssignment.children[0].text)
        const index = this.identifiedElements.findIndex(element => element.name == regAssignment.children[0].text)

        if (index !== -1) {
          this.identifiedElements[index].elementtype = "register"
        }
        if(foundreg.struct == null){
          foundreg.struct = ""
        }
        this.registers.push({
          name:foundreg.name,
          id:foundreg.name,
          position:{x:300,y:50},
          dataBandwidth:foundreg.bandwidth,
          struct:foundreg.struct,
          enablePort:enablePresent,
          resetPort:true
        })
        this.links.push({
          source:{id:regRstName, port:""},
          target:{id:regAssignment.children[0].text, port:regAssignment.children[0].text + "_rst"}
        })  
      }
      else{
        var regAssignment = this.findNode(conditionalNode.children[conditionalNode.children.length-1], Operator_assignmentContext)
        this.links.push({
          source:{id:conPredicateNode.text, port:""},
          target:{id:regAssignment.children[0].text, port:regAssignment.children[0].text + "_en"}
        })
        this.links.push({
          source:{id:regAssignment.children[2].text, port:""},
          target:{id:regAssignment.children[0].text, port:regAssignment.children[0].text + "_in"}
        })
        var foundreg = this.identifiedElements.find(element => element.name == regAssignment.children[0].text)
        const index = this.identifiedElements.findIndex(element => element.name == regAssignment.children[0].text)

        if (index !== -1) {
          this.identifiedElements[index].elementtype = "register"
        }        
        if(foundreg.struct == null){
          foundreg.struct = ""
        }
        this.registers.push({
          name:foundreg.name,
          id:foundreg.name,
          position:{x:300,y:50},
          dataBandwidth:foundreg.bandwidth,
          struct:foundreg.struct,
          enablePort:true,
          resetPort:false
        })
      }
      
    }
    this.links.push({
      source:{id:regClkName, port:""},
      target:{id:regAssignment.children[0].text, port:regAssignment.children[0].text + "_clk"}
    })
  }

  private handleAlwaysBlock(alwaysBlockNode){
    var timingControlNode = this.findNode(alwaysBlockNode, Procedural_timing_controlContext)
    var statementNode = this.findNode(alwaysBlockNode, Statement_or_nullContext)
    var caseStatementNode = this.findNode(statementNode, Case_statementContext)
    if(caseStatementNode!= null){
      var elementType = null
      var caseWidth
      var numberOfInputsMux = 0
      var elementName = null
      var muxSelInput
      var assignmentNode
      for(var i = 0; i< caseStatementNode.children.length; i++){
        if(caseStatementNode.children[i] instanceof Case_expressionContext){
          muxSelInput = caseStatementNode.children[i].text
        }
        if(caseStatementNode.children[i] instanceof Case_itemContext){
          caseWidth = parseInt(caseStatementNode.children[i].text.substring(0,caseStatementNode.children[i].text.indexOf("'")))
          numberOfInputsMux++
          assignmentNode = this.findNode(caseStatementNode.children[i], Operator_assignmentContext)
          if(elementType == null){
            var rightSideAssignmentNumber = parseInt(assignmentNode.children[2].text.substring(0,assignmentNode.children[2].text.indexOf("'")))
            if(Number.isInteger(rightSideAssignmentNumber) && 2**caseWidth == rightSideAssignmentNumber){
              elementType = "decoder"
              elementName = assignmentNode.children[0].text
              this.links.push({
                source:{id:muxSelInput, port:""},
                target:{id:elementName, port:elementName + "_in1"}
              })
              var foundElement = this.identifiedElements.find(element => element.name == elementName)
              if(foundElement != null){
                const index = this.identifiedElements.findIndex(element => element.name == elementName)

                if (index !== -1) {
                  this.identifiedElements[index].elementtype = "decoder"
                }
              }
              this.decoders.push({
                name:elementName,
                id:elementName,
                position:{x:300,y:50},
                outSingle:true,
                dataBandwidth: caseWidth,
                enable: false
              })
              return
            }
            else if(Number.isInteger(rightSideAssignmentNumber) && caseWidth == 2**rightSideAssignmentNumber){
              elementType = "encoder"
              elementName = assignmentNode.children[0].text
              this.links.push({
                source:{id:muxSelInput, port:""},
                target:{id:elementName, port:elementName + "_in1"}
              })
              var foundElement = this.identifiedElements.find(element => element.name == elementName)
              if(foundElement != null){
                const index = this.identifiedElements.findIndex(element => element.name == elementName)

                if (index !== -1) {
                  this.identifiedElements[index].elementtype = "encoder"
                }
              }  
              this.encoders.push({
                name:elementName,
                id:elementName,
                position:{x:300,y:50},
                dataBandwidth: caseWidth,
              })
              return
            }
            else{
              elementType = "multiplexer"
            }
          }
          if(elementName == null){
            elementName = assignmentNode.children[0].text
            this.links.push({
              source:{id:muxSelInput, port:""},
              target:{id:elementName,port:elementName + "_sel"}
            })
          }
          this.links.push({
            source:{id:assignmentNode.children[2].text, port:""},
            target:{id:elementName,port:elementName + "_in" + numberOfInputsMux}
          })
        }
      }
      
      var foundElement = this.identifiedElements.find(element => element.name == elementName)
      if(foundElement != null){
        const index = this.identifiedElements.findIndex(element => element.name == elementName)

        if (index !== -1) {
          this.identifiedElements[index].elementtype = "multiplexor"
        }


        var selBit = false
        var selBandwidth = 2
        
        if(numberOfInputsMux == 8){
          var selBandwidth = 3
        }
        
        var dataPorts = []
        var inBit = false
        if(foundElement.bandwidth == 1){
          var inBit = true
        }

        for(var i = 0; i< numberOfInputsMux; i++){
          dataPorts.push({
            parentElementId: null,
            parentElementPosition: null,
            id: null,
            name: null,
            bandwidth: foundElement.bandwidth,
            direction: "in",
            standalone: false,
            bit: inBit,
            struct: foundElement.struct
        },)
        }

        this.multiplexors.push({
          name: foundElement.name,
          id: foundElement.name,
          position: {x:300, y:50},
          struct: foundElement.struct,
          selPorts: [
              {
                parentElementId: null,
                parentElementPosition: null,
                id: null,
                name: null,
                bandwidth: selBandwidth,
                direction: "sel",
                standalone: false,
                bit: selBit,
                struct: null
              }
          ],
          dataPorts: dataPorts,
          dataBandwidth: foundElement.bandwidth,
          selBandwidth: selBandwidth,
          keyIndex: null
        })
      }
    }
    if(timingControlNode != null){
      this.handleMemoryElements(timingControlNode, statementNode, alwaysBlockNode)
      return
    }
  }

  private handleRamOutput(assignmentNode){
    var outputAssignment = this.findNode(assignmentNode,Blocking_assignmentContext)
    var outputName = this.findNode(outputAssignment, Variable_lvalueContext)
    var ramName = this.findNode(outputAssignment.children[0].children[2],Hierarchical_identifierContext)
    this.links.push({
      source:{id:ramName.text,port:ramName.text + "_out1"},
      target:{id:outputName.text,port:""}
    })
  }

  private handleItem (node){
    var element: IdentifiedElement = {
      name:"",
      bandwidth:0,
      struct:"",
      addrwidth:null,
      elementtype:"",
    };
    var dataDeclaration = this.findNode(node, Data_declarationContext)
    if(dataDeclaration == null){
      dataDeclaration = this.findNode(node, Interface_port_declarationContext)
    }
    if(dataDeclaration == null){
      dataDeclaration = this.findNode(node, List_of_variable_assignmentsContext)
      if(dataDeclaration != null){
        this.handleAssignment(dataDeclaration)
        return
      }
    }
    if(dataDeclaration == null){
      dataDeclaration = this.findNode(node, Module_program_interface_instantiationContext)
      if(dataDeclaration != null){
        this.handleModule(dataDeclaration)
        return
      }
    }
    if(dataDeclaration == null){
      dataDeclaration = this.findNode(node, Always_constructContext)
      if(dataDeclaration != null){
        this.handleAlwaysBlock(dataDeclaration)
        return
      }
    }


    if(dataDeclaration != null){
      if(dataDeclaration.children[0].text == "logic"){
        element.bandwidth = 1
        element.struct = null
      }
      else if (dataDeclaration.children[0].children[1] instanceof Packed_dimensionContext){
        var widthDeclarationString = dataDeclaration.children[0].children[1].children[1].text
        widthDeclarationString = widthDeclarationString.substring(0,widthDeclarationString.indexOf(":"))
        if(widthDeclarationString.startsWith("DATA_WIDTH_")){
          widthDeclarationString = widthDeclarationString.substring(0,widthDeclarationString.indexOf("-"))
          for (let item of this.params) {
            if (widthDeclarationString in item) {
              element.bandwidth = item[widthDeclarationString]
              element.struct = null
              break
            }
          }
        }
        else{
          var widthDeclaration = parseInt(widthDeclarationString)
          widthDeclaration = widthDeclaration + 1
          element.bandwidth = widthDeclaration
          element.struct = null
        }
        
      }
      //else for struct
      else{
        if(dataDeclaration instanceof Interface_port_declarationContext){
          element.struct = dataDeclaration.children[0].text
          element.bandwidth = null
        }

      }

      //name = dataDeclaration.children[1].text
      
      if(dataDeclaration.children[1].text.indexOf("[") != -1){
        var addrWidth = dataDeclaration.children[1].text.substring(dataDeclaration.children[1].text.indexOf("[0:")+3)
        var name = dataDeclaration.children[1].text.substring(0,dataDeclaration.children[1].text.indexOf("["))
        addrWidth = addrWidth.slice(0,-3)
        element.name = name
        for (let item of this.params) {
          if (addrWidth in item) {
            element.addrwidth = Math.log2(item[addrWidth])
            break
          }
        }
      }
      else{
        element.name = dataDeclaration.children[1].text
      }
      this.identifiedElements.push(element)
    }  
  }

  private handleParameters (node){
    var paramNode
    var assignmentNode
    var paramName
    var paramValue
    var tempParam
    for(var i = 0; i<node.children.length;i++){
      if(node.children[i] instanceof Parameter_port_declarationContext){
        paramNode =  node.children[i]
        assignmentNode = this.findNode(paramNode, Param_assignmentContext)
        paramName = assignmentNode.children[0].text
        if(assignmentNode.children[2].text.startsWith("1<<")){
          tempParam = assignmentNode.children[2].text.substring(3)
          for (let item of this.params) {
            if (tempParam in item) {
                paramValue = 2**item[tempParam]
                this.params.push({[paramName]:paramValue})
                break
            }
          }
        }
        else{
           paramValue = parseInt(assignmentNode.children[2].text)
           this.params.push({[paramName]:paramValue})
        }
      }
    }
  }

  private findAllPorts (node){
    var portDeclaration
  
    for(var i = 0; i < node.children.length;i++){

      const port = <Port>{};
      port.parentElementPosition = {x: 70, y: 0};
      port.parentElementId = null;
      
      if(node.children[i] instanceof Port_declContext){
        portDeclaration = node.children[i].children[0].children
        
        for(var j = 0; j<portDeclaration.length; j++){
          if (portDeclaration[j] instanceof Port_directionContext){
            port.direction = portDeclaration[j].text
          }
          if (portDeclaration[j] instanceof Data_typeContext){
            if(portDeclaration[j].text == "logic"){
              port.bandwidth = 1
              port.struct = null
              //port.datatype = "logic"
              port.bit = true
            }
            else{
              if(portDeclaration[j].children.length == 1){
                if(portDeclaration[j].children[0] instanceof Class_typeContext){
                  port.bandwidth = null
                  port.struct = portDeclaration[j].children[0].text
                  //port.datatype = "struct"
                  port.bit = false
                }
              }
              else{
                if(portDeclaration[j].text.startsWith("logic") && portDeclaration[j].children[1] instanceof Packed_dimensionContext){
                  var vectorWidthDeclaration = portDeclaration[j].children[1].text
                  vectorWidthDeclaration = vectorWidthDeclaration.slice(1)
                  if(vectorWidthDeclaration.startsWith("DATA_WIDTH_") || vectorWidthDeclaration.startsWith("ADDR_WIDTH_")){
                    vectorWidthDeclaration = vectorWidthDeclaration.substring(0,vectorWidthDeclaration.indexOf("-"))
                    for (let item of this.params) {
                      if (vectorWidthDeclaration in item) {
                          port.bandwidth = item[vectorWidthDeclaration]
                          port.struct = null
                          port.bit = false
                          break
                      }
                    }
                  }
                  else{
                  port.bandwidth = vectorWidthDeclaration.substring(0,vectorWidthDeclaration.indexOf(":"))
                  port.bandwidth++
                  port.struct = null
                  port.bit = false
                  }
                  //port.datatype = "vector"
                }
              }
            }
          }
          if(portDeclaration[j] instanceof Port_identifierContext){
            port.name = portDeclaration[j].text
            port.id = portDeclaration[j].text
          }
        }
        if(port.direction == "input"){
          this.inPorts.push(port)
        }
        else{
          this.outPorts.push(port)
        }
      }
    }
    for(var i = 1; i <= this.inPorts.length; i++){
      this.inPorts[i-1].parentElementPosition.y = 30 + i*50
    }

    for(var i = 1; i <= this.outPorts.length; i++){
      this.outPorts[i-1].parentElementPosition.y = 30 + i*50
      this.outPorts[i-1].parentElementPosition.x = 500
    }
  }

  private adjustPositions(data, type, start){
    if(type == "gate"){
      if(data.length == 0){
        return start
      }
      for(var i = 1; i<= data.length;i++){
        if(i == 1 && start != null){
          data[i-1].position.y = start + 30
        }
        if(i>1){
          data[i-1].position.y = data[i-2].position.y + data[i-2].inPorts*20 + 30
        }
        if(i == data.length){
          return data[i-1].position.y + data[i-1].inPorts*20
        }
      }
    }
    else if(type == "notGate"){
      for(var i = 1; i<= data.length;i++){
        if(i == 1 && start != null){
          data[i-1].position.y = start + 30
        }
        if(i>1){
          data[i-1].position.y = data[i-2].position.y + 70
        }
      }      
    }
  }

  private handleModuleConnections(module){
    var foundInputsForModule = this.inputsForModules.find(element => element.moduleName == module.mainModuleName && element.moduleInstanceName == module.mainModuleInstance)
    for(var i = 0; i< module.mainPorts.length; i++){
      if(module.mainPorts[i].direction == "in"){
        var connectionDeclaration = foundInputsForModule.portConnections.find(element => element.portName == module.mainPorts[i].name)
        
        var sourcePort = this.inPorts.find(element => element.name == connectionDeclaration.sourceName)
        if(sourcePort != null){
          if(sourcePort.bandwidth!= null){
            if(sourcePort.bandwidth == 1){
              module.mainPorts[i].bandwidth = "bit"  
            }
            else{
              module.mainPorts[i].bandwidth = sourcePort.bandwidth
            }
            module.mainPorts[i].dataType = "logic"
          }
          else{
            module.mainPorts[i].dataType = sourcePort.struct
          }
        }
        else{
          var sourceElement = this.identifiedElements.find(element => element.name == connectionDeclaration.sourceName)
          if(sourceElement.bandwidth!= null){
            if(sourceElement.elementtype == "adder" || sourceElement.elementtype == "subtractor"){
              module.mainPorts[i].bandwidth = sourceElement.bandwidth + 1
            }
            else if (sourceElement.elementtype == "comparator"){
              module.mainPorts[i].bandwidth = "bit"
            }
            else if (sourceElement.elementtype == "encoder"){
              module.mainPorts[i].bandwidth = Math.log2(sourceElement.bandwidth)
            }
            else{
              if(sourceElement.bandwidth == 1){
                module.mainPorts[i].bandwidth = "bit"  
              }
              else{
                module.mainPorts[i].bandwidth = sourceElement.bandwidth
              }
            }
            
            module.mainPorts[i].dataType = "logic"
          }
          else{
            module.mainPorts[i].dataType = sourceElement.struct
          }
        }
      }
    }
  }

  public validateLinks(){
    for(const link of this.links){
      if(link.source.id.indexOf("_to_" + link.target.port) != -1){
        var modulePortNameIndex = link.source.id.indexOf("_to_" + link.target.port)
        var modulePortName = link.source.id.substring(0,modulePortNameIndex)
        link.source.port = modulePortName
        var moduleInstance = this.identifiedElements.find(element => modulePortName.startsWith(element.name))
        link.source.id = moduleInstance.name
      }
      else{
        var inPort = this.inPorts.find(element => element.name ==link.source.id)
        if(inPort != null){
          link.source.port = link.source.id
        }
        else{
          var inPortFromElement = this.identifiedElements.find(element => element.name ==link.source.id)
          if(inPortFromElement != null){
            if(inPortFromElement.elementtype == "logic gate" || inPortFromElement.elementtype == "multiplexor"
              || inPortFromElement.elementtype == "decoder" || inPortFromElement.elementtype == "encoder"
              || inPortFromElement.elementtype == "adder" || inPortFromElement.elementtype == "subtractor"
              || inPortFromElement.elementtype == "comparator" || inPortFromElement.elementtype == "register"
              || inPortFromElement.elementtype == "ram"
            ){
              link.source.port = link.source.id + "_out1"
            }
          }
          else{
            var outPort = this.outPorts.find(element => element.name ==link.target.id)
            if(outPort != null){
              link.target.port = link.target.id
            }
          }

          
        }
      }
      
    }

    this.links = this.links.filter(link => link.target.port !== "");
  }

  private async parseSystemVerilogCode(code){
    this.inPorts = []
    this.outPorts = []
    this.ands = []
    this.ors = []
    this.nands = []
    this.nors = []
    this.xors = []
    this.xnors = []
    this.nots = []
    this.multiplexors = []
    this.decoders = []
    this.encoders = []
    this.adders = []
    this.subtractors = []
    this.comparators = []
    this.registers = []
    this.rams = []
    this.modules = []
    this.inputsForModules = []
    this.identifiedElements = []
    this.links = []
    
    if(!code.startsWith("module")){
      code = code.substring(code.indexOf("module"))
    }
    const inputStream = new ANTLRInputStream(code);
    const lexer = new SystemVerilogLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new SystemVerilogParser(tokenStream);
    
    const tree = parser.module_declaration(); 

    var length = tree.children.length
    
    const parameterSection = this.findNode(tree, Parameter_port_listContext)
    if(parameterSection != null){
      this.params.length = 0
      this.handleParameters(parameterSection)
    }
    const treePorts = this.findNode(tree, List_of_port_declarationsContext)

    this.findAllPorts(treePorts)
    

    const moduleItems = []
    
    for(var i = 0; i <length; i++){
      if(tree.children[i] instanceof Module_itemContext){
        if(this.parsingRamActive){
          this.handleRamOutput(tree.children[i])
          this.parsingRamActive = false
        }
        else{
          this.handleItem(tree.children[i])
        }
        
      }
    }

    
    var yStart = null
    yStart = this.adjustPositions(this.ands, "gate", yStart)
    yStart = this.adjustPositions(this.ors, "gate",yStart)
    yStart = this.adjustPositions(this.nands, "gate",yStart)
    yStart = this.adjustPositions(this.nors, "gate",yStart)
    yStart = this.adjustPositions(this.xors, "gate",yStart)
    yStart = this.adjustPositions(this.xnors, "gate",yStart)
    yStart = this.adjustPositions(this.nots, "notGate",yStart)

    if(this.modules.length > 0){
      for (const module of this.modules){
        this.handleModuleConnections(module)
      }
    }

    this.validateLinks()

    return ({"inPorts": this.inPorts, "outPorts": this.outPorts, "ands": this.ands, "ors": this.ors, "nands": this.nands,
    "nors": this.nors, "xors": this.xors, "xnors": this.xnors, "nots": this.nots, "multiplexors": this.multiplexors,
    "decoders": this.decoders, "encoders": this.encoders, "adders": this.adders, "subtractors": this.subtractors,
    "comparators": this.comparators, "registers": this.registers, "rams": this.rams, "modules": this.modules,
    "links": this.links
    })
  }
    
    
}
