
import { ANTLRInputStream, CommonTokenStream } from "antlr4ts";
import { vhdlLexer } from './ANTLR/vhdlLexer';
import { vhdlListener } from "./ANTLR/vhdlListener";
import {
  Actual_partContext,
  Architecture_bodyContext, 
  Architecture_declarative_partContext, 
  Association_elementContext, 
  Association_listContext, 
  Case_statementContext, 
  Case_statement_alternativeContext, 
  ChoicesContext, 
  Component_declarationContext, 
  Component_instantiation_statementContext, 
  Conditional_signal_assignmentContext, 
  Conditional_waveformsContext, 
  ConditionContext, 
  ConstraintContext, 
  Entity_declarationContext, 
  ExpressionContext,
  Formal_partContext,
  IdentifierContext,
  Identifier_listContext, 
  If_statementContext, 
  Instantiated_unitContext, 
  Interface_port_declarationContext, 
  Label_colonContext, 
  Logical_operatorContext, 
  NameContext,
  Port_map_aspectContext,
  PrimaryContext, 
  Process_statementContext, 
  Process_statement_partContext, 
  RelationContext, 
  Selected_nameContext, 
  Sensitivity_listContext, 
  Sequence_of_statementsContext, 
  Shift_expressionContext, 
  Signal_declarationContext, 
  Signal_modeContext, 
  Subtype_indicationContext, 
  TargetContext, 
  vhdlParser, 
  WaveformContext
} from './ANTLR/vhdlParser';
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { Port, Logic, Signal, Connection, ModuleConnection } from "./models";

export class VhdlDiagramGenerationComponent implements vhdlListener { 

  public inPorts: Port[] = [];
  public outPorts: Port[] = [];
  public elements: Logic[] = [];
  public signals: Signal[] = [];
  public connections: Connection[] = [];
  public elementCount = 0;

  // getting all standalone ports
  /* enterInterface_port_declaration (ctx: Interface_port_declarationContext) {
    const port = <Port>{};
    port.position = {x: 150, y: 150};

    console.log(ctx)

    ctx.children.forEach(node => {

      if (node instanceof Identifier_listContext) {
        port.id = 'port_' + node.text;
        port.name = node.text;
      } else if (node instanceof Signal_modeContext) {
        port.direction = node.text;
      } else if (node instanceof Subtype_indicationContext) {

        if(node.text.toLowerCase().startsWith('std_logic_vector')) {
          
          node.children.forEach(type => {
            
            if(type instanceof Selected_nameContext) {
              port.datatype = type.text;
            } else if (type instanceof ConstraintContext) {

              // TO-DO parse vector width
              let str = type.text.replace(/[^0-9]/g, "");
              port.width = Number(str.slice(0, 1)) + 1;
            }

          })
        } else {
          port.datatype = node.text;
          port.width = 1;
        }
      }
    })

    if(port.direction === 'in') {
      this.inPorts.push(port);
    } else {
      this.outPorts.push(port);
    }
  } */

  enterEntity_declaration (ctx: Entity_declarationContext) {

    const allPorts = this.searchTreeAllNodes(ctx, Interface_port_declarationContext, null);
    for (const portVar of allPorts) {

      const port = <Port>{};
      port.position = {x: 150, y: 150};
      port.size = {width: 55, height: 20};

      for (const node of portVar.children) {

        if (node instanceof Identifier_listContext) {
          port.id = node.text;
          port.name = node.text;
        } else if (node instanceof Signal_modeContext) {
          port.direction = node.text;
        } else if (node instanceof Subtype_indicationContext) {
          if(node.text.toLowerCase().startsWith('std_logic_vector')) {      
            for (const type of node.children) {
              if(type instanceof Selected_nameContext) {
                port.datatype = type.text;
              } else if (type instanceof ConstraintContext) {
                // TO-DO parse vector width
                let str = type.text.replace(/[^0-9]/g, "");
                port.width = Number(str.slice(0, 1)) + 1;
              }
            }
          } else {
            port.datatype = node.text;
            port.width = 1;
          }
        }
      }
      if(port.direction === 'in') {
        this.inPorts.push(port);
      } else {
        this.outPorts.push(port);
      }
    }
  };

  enterArchitecture_body (ctx: Architecture_bodyContext) {
    let assignments: Conditional_signal_assignmentContext[] = [];
    let signals: Signal_declarationContext[] = [];
    let processes: Process_statement_partContext[] = [];
    let components: Component_declarationContext[] = [];

    // find all signals
    signals = this.searchTreeAllNodes(ctx, Signal_declarationContext, null);
    for (const signal of signals) {
      const signalElement = <Signal>{};
     
      const name = this.searchTree(signal, Identifier_listContext);
      const datatype = this.searchTree(signal, Subtype_indicationContext);
      signalElement.id = 'signal_' + name.text;
      signalElement.name = name.text;
      signalElement.datatype = datatype.text;
      signalElement.direction = 'signal';
      signalElement.position = {x: 150, y: 150};

      this.signals.push(signalElement);
    }

    // find components if any
    components = this.searchTreeAllNodes(ctx, Component_declarationContext, null);

    if (components) {
      this.handleComponents(ctx, components);
    }

    // find processes
    processes = this.searchTreeAllNodes(ctx, Process_statementContext, null)
    
    if (processes) {
      this.handleProcesses(processes);
    }

    // find all assignments
    assignments = this.searchTreeAllNodes(ctx, Conditional_signal_assignmentContext, null)

    // for each assignment create element object
    for (const assignment of assignments) {
      const element = <Logic>{};
      element.outPorts = [];
      element.inPorts = [];
      element.position = {x: 150, y: 150};
      element.size = {width: 90, height: 50};

      let target = this.searchTree(assignment, TargetContext);
      let operation = this.searchTree(assignment, Logical_operatorContext);
      let relations = this.searchTreeAllNodes(assignment, RelationContext, null);

      let conditionalStatement = this.searchTree(assignment, Conditional_waveformsContext);

      if (conditionalStatement && conditionalStatement.text.includes('when')) {
        const selInput = relations.filter(str =>  str.text.includes('(') && str.text.includes(')') );
        const regInputs = relations.filter(str =>  !str.text.includes('(') && !str.text.includes(')') );

        // parsing sel input
        let selInputText = this.searchTree(selInput[0], PrimaryContext);
        let selInputTextWOB = this.searchTree(selInputText, ExpressionContext);
        var selInputTextWOE = selInputTextWOB.text.substr(0, selInputTextWOB.text.indexOf('=')); 
  
        this.handleMux(regInputs, target.text, 1, selInputTextWOE)
      } else {
        if(operation == null  && assignment.text.substring(assignment.text.indexOf('=')+1,assignment.text.indexOf('=')+4) == 'not'){
          element.type =  assignment.text.substring(assignment.text.indexOf('=')+1,assignment.text.indexOf('=')+4) 
          element.name =  element.type + this.elementCount;
        }
        else{
          element.type = operation.text;
          element.name = operation.text + this.elementCount;
        }
        

        element.id = 'element_' + this.elementCount;
        this.elementCount++;
        
        const outPort = this.outPorts.filter(p => p.name === target.text);
        if(outPort.length === 0) {
          // check signals
          const outPortSignal = this.signals.filter(p => p.name === target.text);
          element.name = outPortSignal[0].name
          element.outPorts.push(outPortSignal[0]);
        } else {
          element.outPorts.push(outPort[0]);
        }
        for (const relation of relations) {
          if(element.type == 'not'){
          var tempRelationText = relation.text.substring(3) 
          const inPort = this.inPorts.filter(p => p.name === tempRelationText);
          if(inPort.length === 0) {
            // check signals
            const inPortSignal = this.signals.filter(p => p.name === tempRelationText);
            element.inPorts.push(inPortSignal[0]);
          } else {
            element.inPorts.push(inPort[0]);
          }
          }
          else{
            const inPort = this.inPorts.filter(p => p.name === relation.text);
          if(inPort.length === 0) {
            // check signals
            const inPortSignal = this.signals.filter(p => p.name === relation.text);
            element.inPorts.push(inPortSignal[0]);
          } else {
            element.inPorts.push(inPort[0]);
          }
          }
          
          
        }
        element.bandwidth = element.inPorts[0].width
        
        if(element.inPorts[0].width == undefined){
          const filteredElements = this.elements.filter(wantedelement => wantedelement.name === element.inPorts[0].name);
          element.bandwidth = filteredElements[0].bandwidth
        }

        this.elements.push(element);
      }
    }

    //handle module missing values for other elements

    this.elements.forEach(element => {
      element.moduleConnection?.forEach(moduleC => {
        this.elements.map(e => {
          if (moduleC.fromId === null && e.outPorts.some(o => o.name === moduleC.from)) moduleC.fromId = e.id
          if (moduleC.toId === null && e.inPorts.some(o => o.name === moduleC.to)) moduleC.toId = e.id
        })
      })
    })  

    for (const element of this.elements) {
      this.handleConnections(element);
    }

    // filter duplicates
    this.connections = this.connections.filter((value, index, self) =>   
        index === self.findIndex(t => t.id === value.id)  
    )
  }

  public handleConnections(element: Logic) {

    // vyriesit ked su medzi modulami dvoma, ked filtrujeme duplikacie, vyfiltrujeme aj tie dobre

    /* if (element.type === 'module') {
      for (const moduleCon of element.moduleConnection) {
        
        if((moduleCon.toId !== null && moduleCon.toId !== undefined) && (moduleCon.fromId !== null && moduleCon.fromId !== undefined)) {
          let innerConnection = <Connection>{
            id: null,
            datatype: null,
            from: null,
            to: null,
            fromType: null,
            toType: null
          };

          const resFrom = this.elements.find(e => e.instance === moduleCon.fromId)
          const resTo = this.elements.find(e => e.instance === moduleCon.toId)

          innerConnection.from = resFrom;
          innerConnection.fromType = 'module';

          innerConnection.to = resTo;
          innerConnection.toType = 'module';

          //innerConnection.id = res.id + '_' + element.id;
          innerConnection.datatype = element.inPorts[0].datatype;
   
          innerConnection.type = 'inner';
   
          this.connections.push(innerConnection);
          
           // find in out ports
           /* const res = this.elements.find(e => e.outPorts.includes(element));
           innerConnection.from = res;
           innerConnection.fromType = res.type;
   
           innerConnection.to = element;
           innerConnection.toType = element.type;
   
           innerConnection.id = res.id + '_' + element.id;
           innerConnection.datatype = element.inPorts[0].datatype;
   
           innerConnection.type = 'inner';
   
           this.connections.push(innerConnection); */
        //}
        
     // }
    //} */

    // create connections for input ports
    for (const link of element.inPorts) {
      
      let connection = <Connection>{
        id: null,
        datatype: null,
        from: null,
        to: null,
        fromType: null,
        toType: null
      };
      let innerConnection = <Connection>{
        id: null,
        datatype: null,
        from: null,
        to: null,
        fromType: null,
        toType: null
      };

      if(link.direction !== 'signal') {
        // it is standalone port
        connection.id = link.id + '_' + element.id;
        connection.from = link;
        connection.fromType = 'standalonePort' + '_' + link.direction;
        connection.to = element;
        connection.toType = element.type;
        connection.datatype = link.datatype;
        this.connections.push(connection);
      } else {
        // it is inner connection 
  
        // find in out ports
        const res = this.elements.find(e => e.outPorts.includes(link));
        
        innerConnection.from = res;
        innerConnection.fromType = res.type;

        innerConnection.to = element;
        innerConnection.toType = element.type;

        if (innerConnection.fromType === 'module' && innerConnection.toType === 'module') {

          // if i am between two elements, will look for this instance inside module connection and give unique id to this connection
          const nieco = res.moduleConnection.filter(e => e.fromId === element.instance)

          for (const n of nieco) {
            const used = this.connections.find(c => c.id === res.id + '_' + element.id + ':' + n.from + '*' + n.to);
            if(typeof used === 'undefined') {
              innerConnection.id = res.id + '_' + element.id + ':' + n.from + '*' + n.to;
            }   
          }
    
        } else {
          innerConnection.id = res.id + '_' + element.id;
        }

        //innerConnection.id = res.id + '_' + element.id;
        innerConnection.datatype = element.inPorts[0].datatype;
        innerConnection.type = 'inner';

        if (innerConnection.id) this.connections.push(innerConnection);
      }
    }

    // if element has sel input - mux
    if (element.selPorts) {
      for (const link of element.selPorts) {
        let connection = <Connection>{
          id: null,
          datatype: null,
          from: null,
          to: null,
          fromType: null,
          toType: null
        };
        let innerConnection = <Connection>{
          id: null,
          datatype: null,
          from: null,
          to: null,
          fromType: null,
          toType: null
        };
  
        if(link.direction !== 'signal') {
          // it is standalone port
          connection.id = link.id + '_' + element.id;
          connection.from = link;
          connection.fromType = 'standalonePort' + '_' + link.direction;
          connection.to = element;
          connection.toType = element.type;
          connection.datatype = link.datatype;
          this.connections.push(connection);
        } else {
          // it is inner connection 
  
          // find in out ports
          const res = this.elements.find(e => e.outPorts.includes(link));
          innerConnection.from = res;
          innerConnection.fromType = res.type;
  
          innerConnection.to = element;
          innerConnection.toType = element.type;
  
          innerConnection.id = res.id + '_' + element.id;
          innerConnection.datatype = element.inPorts[0].datatype;
  
          innerConnection.type = 'inner';
  
          this.connections.push(innerConnection);
        }
      }
    }

    // if element has clk input - mux
    if (element.clkPorts) {
      for (const link of element.clkPorts) {
        let connection = <Connection>{
          id: null,
          datatype: null,
          from: null,
          to: null,
          fromType: null,
          toType: null
        };
        let innerConnection = <Connection>{
          id: null,
          datatype: null,
          from: null,
          to: null,
          fromType: null,
          toType: null
        };
  
        if(link.direction !== 'signal') {
          // it is standalone port
          connection.id = link.id + '_' + element.id;
          connection.from = link;
          connection.fromType = 'standalonePort' + '_' + link.direction;
          connection.to = element;
          connection.toType = element.type;
          connection.datatype = link.datatype;
          this.connections.push(connection);
        } else {
          // it is inner connection 
  
          // find in out ports
          const res = this.elements.find(e => e.outPorts.includes(link));
          innerConnection.from = res;
          innerConnection.fromType = res.type;
  
          innerConnection.to = element;
          innerConnection.toType = element.type;
  
          innerConnection.id = res.id + '_' + element.id;
          innerConnection.datatype = element.inPorts[0].datatype;
  
          innerConnection.type = 'inner';
  
          this.connections.push(innerConnection);
        }
      }
    }

    // if element has rst input - register
    if (element.rstPorts) {
      for (const link of element.rstPorts) {
        let connection = <Connection>{
          id: null,
          datatype: null,
          from: null,
          to: null,
          fromType: null,
          toType: null
        };
        let innerConnection = <Connection>{
          id: null,
          datatype: null,
          from: null,
          to: null,
          fromType: null,
          toType: null
        };
  
        if(link.direction !== 'signal') {
          // it is standalone port
          connection.id = link.id + '_' + element.id;
          connection.from = link;
          connection.fromType = 'standalonePort' + '_' + link.direction;
          connection.to = element;
          connection.toType = element.type;
          connection.datatype = link.datatype;
          this.connections.push(connection);
        } else {
          // it is inner connection 
  
          // find in out ports
          const res = this.elements.find(e => e.outPorts.includes(link));
          innerConnection.from = res;
          innerConnection.fromType = res.type;
  
          innerConnection.to = element;
          innerConnection.toType = element.type;
  
          innerConnection.id = res.id + '_' + element.id;
          innerConnection.datatype = element.inPorts[0].datatype;
  
          innerConnection.type = 'inner';
  
          this.connections.push(innerConnection);
        }
      }
    }

    
    // if element has enable input - register
    if (element.enPorts) {
      for (const link of element.enPorts) {
        let connection = <Connection>{
          id: null,
          datatype: null,
          from: null,
          to: null,
          fromType: null,
          toType: null
        };
        let innerConnection = <Connection>{
          id: null,
          datatype: null,
          from: null,
          to: null,
          fromType: null,
          toType: null
        };
  
        if(link.direction !== 'signal') {
          // it is standalone port
          connection.id = link.id + '_' + element.id;
          connection.from = link;
          connection.fromType = 'standalonePort' + '_' + link.direction;
          connection.to = element;
          connection.toType = element.type;
          connection.datatype = link.datatype;
          this.connections.push(connection);
        } else {
          // it is inner connection 
  
          // find in out ports
          const res = this.elements.find(e => e.outPorts.includes(link));
          innerConnection.from = res;
          innerConnection.fromType = res.type;
  
          innerConnection.to = element;
          innerConnection.toType = element.type;
  
          innerConnection.id = res.id + '_' + element.id;
          innerConnection.datatype = element.inPorts[0].datatype;
  
          innerConnection.type = 'inner';
  
          this.connections.push(innerConnection);
        }
      }
    }

    // create connections for output ports
    for (const link of element.outPorts) {

      let connection = <Connection>{
        id: null,
        datatype: null,
        from: null,
        to: null,
        fromType: null,
        toType: null
      };
      let innerConnection = <Connection>{
        id: null,
        datatype: null,
        from: null,
        to: null,
        fromType: null,
        toType: null
      };

      if(link.direction !== 'signal') {
        // it is standalone port
        connection.id = element.id + '_' + link.id;
        connection.from = element;
        connection.fromType = element.type;
        connection.to = link;
        connection.toType = 'standalonePort' + '_' + link.direction;
        connection.datatype = link.datatype;
        this.connections.push(connection);
      } else {

        // it is inner connection
        innerConnection.from = element;
        innerConnection.fromType = element.type;

        const res = this.elements.find(e => e.inPorts.includes(link));
        innerConnection.to = res;
        innerConnection.toType = res.type;

       if (innerConnection.fromType === 'module' && innerConnection.toType === 'module') {
          // if i am between two elements, will look for this instance inside module connection and give unique id to this connection
          const nieco = element.moduleConnection.filter(e => e.toId === res.instance)

          for (const n of nieco) {
            const used = this.connections.find(c => c.id === element.id + '_' + res.id + ':' + n.from + '*' + n.to);
            if(typeof used === 'undefined') {
             innerConnection.id = element.id + '_' + res.id + ':' + n.from + '*' + n.to;
            }   
          }
    
        } else {
          innerConnection.id = element.id + '_' + res.id;
        }
         
        //innerConnection.id = element.id + '_' + res.id;
        innerConnection.datatype = element.inPorts[0].datatype;

        innerConnection.type = 'inner';

        this.connections.push(innerConnection);
      }
    }
  }

  public handleComponents(ctx: Architecture_bodyContext, components: Component_declarationContext[]) {
    for (const component of components) {
      let componentInPorts: Port[] = [];
      let componentOutPorts: Port[] = [];
      let modulePorts = [];

      let portList = this.searchTreeAllNodes(component, Interface_port_declarationContext, null);

      for (const port of portList) {
        const portName = this.searchTree(port, Identifier_listContext);
        const portMode = this.searchTree(port, Signal_modeContext);
        const portType = this.searchTree(port, Subtype_indicationContext);

        const portHelper: Port = {
          id: null,
          name: portName.text,
          datatype: portType.text,
          direction: portMode.text
        }

        modulePorts.push(portHelper)

        if (portMode.text === 'in') {
          componentInPorts.push(portHelper);
        } else if (portMode.text === 'out') {
          componentOutPorts.push(portHelper);
        }
      }

      let componentName = this.searchTree(component, IdentifierContext);
      let componentInstance = this.searchTreeAllNodes(ctx, Component_instantiation_statementContext, null)
      .filter(c => {
        return c.children.some(child => 
          child instanceof Instantiated_unitContext && child.text === componentName.text
        )
      });

      for (const instance of componentInstance) {
        const element = <Logic>{};
        element.outPorts = [];
        element.inPorts = [];
        element.position = {x: 150, y: 150};
        element.size = {width: 180, height: 90};
        element.moduleConnection = [];
        element.modulePorts = modulePorts;

        element.type = 'module';
        element.name = componentName.text;
        element.id = 'element_' + this.elementCount;
        this.elementCount++;

        let instanceLabel = this.searchTree(instance, Label_colonContext);
        element.instance = instanceLabel.text.substr(0, instanceLabel.text.indexOf(':')); 

        let portMaps = this.searchTreeAllNodes(instance, Association_elementContext, null);
        
        for (const portMap of portMaps) {
          const port = this.searchTree(portMap, Formal_partContext);
          const assignment = this.searchTree(portMap, Actual_partContext);

          if (componentInPorts.some(c => c.name === port.text)) {
            const inPort = this.inPorts.filter(p => p.name === assignment.text);
            const connection: ModuleConnection = {from: null, fromId: null, to: port.text, toId: element.instance}   

            if(inPort.length === 0) {
              // check signals
              const inPortSignal = this.signals.filter(p => p.name === assignment.text);
              element.inPorts.push(inPortSignal[0]);
              
              connection.from = inPortSignal[0].name;
              element.moduleConnection.push(connection);
            } else {
              element.inPorts.push(inPort[0]);

              connection.from = inPort[0].name;
              element.moduleConnection.push(connection);
            }
          } else if (componentOutPorts.some(c => c.name === port.text)) {
            const outPort = this.outPorts.filter(p => p.name === assignment.text);
            const connection: ModuleConnection = {from: port.text, fromId: element.instance, to: null, toId: null}

            if(outPort.length === 0) {
              // check signals
              const outPortSignal = this.signals.filter(p => p.name === assignment.text);
              element.outPorts.push(outPortSignal[0]);

              connection.to = outPortSignal[0].name;
              element.moduleConnection.push(connection);
            } else {
              element.outPorts.push(outPort[0]);

              connection.to = outPort[0].name;
              element.moduleConnection.push(connection);
            }
          }
        }

        this.elements.push(element)  
      }

      // find from which to which module we are going, add missing module connection values, if we are between two modules
      this.elements.forEach(element => {
        element.moduleConnection?.forEach(moduleC => {
          this.elements.map(e => {
            e.moduleConnection?.map(c => {
              if (c.to === moduleC.from) {
                if (moduleC.fromId === null) {
                  moduleC.fromId = e.instance;
                }
                if (c.toId === null) {
                  c.toId = element.instance;
                }
              } 
            })
          })
        })
      })
    }
  }

  public handleProcesses(processes: Process_statement_partContext[]) {

    let inputs;

    for (const process of processes) {
      // process inputs
      let sensitivyList = this.searchTreeAllNodes(process, Sensitivity_listContext, null);
      let caseStatements = this.searchTreeAllNodes(process, Case_statementContext, null);
      let ifStatements = this.searchTreeAllNodes(process, If_statementContext, null);

      if (sensitivyList) {
        inputs = this.searchTreeAllNodes(sensitivyList[0], NameContext, null);
      }

      // if we have any case statements
      if (caseStatements) {

        // where the process is outputting
        let output = this.searchTreeAllNodes(process, TargetContext, null);

        // determine the type/length
        for (const statement of caseStatements) {
          let cases = this.searchTreeAllNodes(statement, Case_statement_alternativeContext, null);
          let inputLength = this.searchTreeAllNodes(cases[0], ChoicesContext, null);
          let outputLength = this.searchTreeAllNodes(cases[0], WaveformContext, null);

          // if outputLength.text is one of the process inputs, it is multiplexor, else it is encoder/decoder
          if (inputs.some(e => e.text === outputLength[0].text)) {
            let selInput = this.searchTree(caseStatements[0], ExpressionContext);
            let str = inputLength[0].text.replace(/[^0-9]/g, "");
            // exclude sel input
            const filtered = inputs.filter((item) => item.text !== selInput.text);
            this.handleMux(filtered, output[0].text, str.length, selInput.text);
          } else {
            if(inputLength[0].text.length > outputLength[0].text.length) {
              // encoder if its without enable
              let str = inputLength[0].text.replace(/[^0-9]/g, "");
              this.handleEncoder(sensitivyList[0].text, output[0].text, str.length);
            } else {
              // decoder
              // TO-DO parse vector width
              let str = inputLength[0].text.replace(/[^0-9]/g, "");
              this.handleDecoder(sensitivyList[0].text, output[0].text, str.length);
            }
          }
        }
      }

      if (ifStatements) {
        // number of if statements
        let count = ifStatements.length;

        //Sequence_of_statementsContext

        // TODO && no elsif statement, D flip-flop
        if (count === 1) {

          this.handleDFlipFlop(ifStatements[0]);

        }/*  else {
          for (const statement of ifStatements) {

          }
        } */
      }
    }
  }

  public handleDFlipFlop(ifStatement) {
    let clkInput;
    let clkSensitivity;
    let regInput;
    let regOutput;
    let clrInput;
    let clrSensitivity;
    let enInput;
    let enSensitivity;
    const element = <Logic>{};
    element.outPorts = [];
    element.inPorts = [];
    element.clkPorts = [];
    element.rstPorts = [];
    element.enPorts = [];
    element.position = {x: 150, y: 150};
    element.size = {width: 50, height: 100};

    let conditions = this.searchTreeAllNodes(ifStatement, ConditionContext, null);
    let statements = this.searchTreeAllNodes(ifStatement, Sequence_of_statementsContext, null);

    if (conditions) {

      element.type = 'register';
      element.name = 'register_' + this.elementCount;

      element.id = 'element_' + this.elementCount;
      this.elementCount++;
      //element.bandwidth = bandwidth + 1;

      // if we have more than one condition and only one statement => enable
      // if we have more than one condition and more statements => clear/reset
      if (conditions.length > 1) {

        if (statements.length === 1) {
          // handle clock
          let clkStatement = this.searchTreeAllNodes(conditions[0], PrimaryContext, null);
          let helperClk = this.searchTreeAllNodes(clkStatement[0], Shift_expressionContext, null);
          clkInput = helperClk[1];
          clkSensitivity = helperClk[2];

          // handle enable
          let enStatement = this.searchTreeAllNodes(conditions[1], PrimaryContext, null);
          let helperEN = this.searchTreeAllNodes(enStatement[0], Shift_expressionContext, null);
          enInput = helperEN[0];
          enSensitivity = helperEN[1];
        
          // handle input, output
          regOutput = this.searchTreeAllNodes(statements[0], TargetContext, null);
          regInput = this.searchTreeAllNodes(statements[0], WaveformContext, null);
        } else if (conditions.length === 3 && statements.length === 2) {

          // handle clear
          let clrStatement = this.searchTreeAllNodes(conditions[0], PrimaryContext, null);
          let helperClr = this.searchTreeAllNodes(clrStatement[0], Shift_expressionContext, null);
          clrInput = helperClr[0];
          clrSensitivity = helperClr[1];

          // handle clock
          let clkStatement = this.searchTreeAllNodes(conditions[1], PrimaryContext, null);
          let helperClk = this.searchTreeAllNodes(clkStatement[0], Shift_expressionContext, null);
          clkInput = helperClk[1];
          clkSensitivity = helperClk[2];

          // handle enable
          let enStatement = this.searchTreeAllNodes(conditions[2], PrimaryContext, null);
          let helperEN = this.searchTreeAllNodes(enStatement[0], Shift_expressionContext, null);
          enInput = helperEN[0];
          enSensitivity = helperEN[1];

          // handle input, output
          regOutput = this.searchTreeAllNodes(statements[1], TargetContext, null);
          regInput = this.searchTreeAllNodes(statements[1], WaveformContext, null);

        } else {
          // handle clear
          let clrStatement = this.searchTreeAllNodes(conditions[0], PrimaryContext, null);
          let helperClr = this.searchTreeAllNodes(clrStatement[0], Shift_expressionContext, null);
          clrInput = helperClr[0];
          clrSensitivity = helperClr[1];
          
          // handle clock
          let clkStatement = this.searchTreeAllNodes(conditions[1], PrimaryContext, null);
          let helperClk = this.searchTreeAllNodes(clkStatement[0], Shift_expressionContext, null);
          clkInput = helperClk[1];
          clkSensitivity = helperClk[2];

          // handle input, output
          regOutput = this.searchTreeAllNodes(statements[1], TargetContext, null);
          regInput = this.searchTreeAllNodes(statements[1], WaveformContext, null);
        }     
      } else {
        // handle clock if rising_edge
        //clkInput = this.searchTree(conditions[0], Actual_parameter_partContext);
        //clkSensitivity = this.searchTree(conditions[0], IdentifierContext);

        let clkStatement = this.searchTreeAllNodes(conditions[0], PrimaryContext, null);
        let helperClk = this.searchTreeAllNodes(clkStatement[0], Shift_expressionContext, null);
        clkInput = helperClk[1];
        clkSensitivity = helperClk[2];

        // handle input, output
        regOutput = this.searchTreeAllNodes(statements[0], TargetContext, null);
        regInput = this.searchTreeAllNodes(statements[0], WaveformContext, null);
      }
    }    

    const inPort = this.inPorts.filter(p => p.name === regInput[0].text);
    if(inPort.length === 0) {
      // check signals
      const inPortSignal = this.signals.filter(p => p.name === regInput[0].text);
      element.inPorts.push(inPortSignal[0]);
    } else {
      element.inPorts.push(inPort[0]);
    }

    const outPort = this.outPorts.filter(p => p.name === regOutput[0].text);
    if(outPort.length === 0) {
      // check signals
      const outPortSignal = this.signals.filter(p => p.name === regOutput[0].text);
      element.outPorts.push(outPortSignal[0]);
    } else {
      element.outPorts.push(outPort[0]);
    }

    const clkPort = this.inPorts.filter(p => p.name === clkInput.text);
  
    if(clkPort.length === 0) {
      // check signals
      const clkPortSignal = this.signals.filter(p => p.name === clkInput.text);
      element.clkPorts.push(clkPortSignal[0]);
    } else {
      element.clkPorts.push(clkPort[0]);
    }

    if (clrInput) {
      const clrPort = this.inPorts.filter(p => p.name === clrInput.text);
  
      if(clkPort.length === 0) {
        // check signals
        const clrPortSignal = this.signals.filter(p => p.name === clrInput.text);
        element.rstPorts.push(clrPortSignal[0]);
      } else {
        element.rstPorts.push(clrPort[0]);
      }
    }

    if (enInput) {
      const enPort = this.inPorts.filter(p => p.name === enInput.text);
  
      if(clkPort.length === 0) {
        // check signals
        const enPortSignal = this.signals.filter(p => p.name === enInput.text);
        element.enPorts.push(enPortSignal[0]);
      } else {
        element.enPorts.push(enPort[0]);
      }
    }

    this.elements.push(element);


  }

  public handleMux(input, output, bandwidth, selInput) {
    const element = <Logic>{};
    element.outPorts = [];
    element.inPorts = [];
    element.selPorts = [];
    element.position = {x: 150, y: 150};
    element.size = {width: 50, height: 100};

    element.type = 'multiplexor';
    element.name = 'multiplexor_' + this.elementCount;

    element.id = 'element_' + this.elementCount;
    this.elementCount++;

    element.bandwidth = bandwidth + 1;

    const outPort = this.outPorts.filter(p => p.name === output);
    if(outPort.length === 0) {
      // check signals
      const outPortSignal = this.signals.filter(p => p.name === output);
      element.outPorts.push(outPortSignal[0]);
    } else {
      element.outPorts.push(outPort[0]);
    }

    if (input.length > 1) {

      for (const i of input) {
        const inPort = this.inPorts.filter(p => p.name === i.text);
        if(inPort.length === 0) {
          // check signals
          const inPortSignal = this.signals.filter(p => p.name === i.text);
          element.inPorts.push(inPortSignal[0]);
        } else {
          element.inPorts.push(inPort[0]);
        }
      }

    } else {
      const inPort = this.inPorts.filter(p => p.name === input);
      if(inPort.length === 0) {
        // check signals
        const inPortSignal = this.signals.filter(p => p.name === input);
        element.inPorts.push(inPortSignal[0]);
      } else {
        element.inPorts.push(inPort[0]);
      }
    }

    const selPort = this.inPorts.filter(p => p.name === selInput);
    if(selPort.length === 0) {
      // check signals
      const selPortSignal = this.signals.filter(p => p.name === selInput);
      element.selPorts.push(selPortSignal[0]);
    } else {
      element.selPorts.push(selPort[0]);
    }

    element.bandwidth = element.inPorts[0].width;
    this.elements.push(element);
  }

  public handleEncoder(input, output, bandwidth) {
    const element = <Logic>{};
    element.outPorts = [];
    element.inPorts = [];
    element.position = {x: 150, y: 150};
    element.size = {width: 50, height: 100};

    element.type = 'encoder';
    element.name = 'encoder_' + this.elementCount;

    element.id = 'element_' + this.elementCount;
    this.elementCount++;

    element.bandwidth = bandwidth;

    const outPort = this.outPorts.filter(p => p.name === output);
    if(outPort.length === 0) {
      // check signals
      const outPortSignal = this.signals.filter(p => p.name === output);
      element.outPorts.push(outPortSignal[0]);
    } else {
      element.outPorts.push(outPort[0]);
    }

    const inPort = this.inPorts.filter(p => p.name === input);
    if(inPort.length === 0) {
      // check signals
      const inPortSignal = this.signals.filter(p => p.name === input);
      element.inPorts.push(inPortSignal[0]);
    } else {
      element.inPorts.push(inPort[0]);
    }

    this.elements.push(element);

  }

  public handleDecoder(input, output, bandwidth) {
    const element = <Logic>{};
    element.outPorts = [];
    element.inPorts = [];
    element.position = {x: 150, y: 150};
    element.size = {width: 50, height: 100};

    element.type = 'decoder';
    element.name = 'decoder_' + this.elementCount;

    element.id = 'element_' + this.elementCount;

    this.elementCount++;

    element.bandwidth = bandwidth;

    const outPort = this.outPorts.filter(p => p.name === output);
    if(outPort.length === 0) {
      // check signals
      const outPortSignal = this.signals.filter(p => p.name === output);
      element.outPorts.push(outPortSignal[0]);
    } else {
      element.outPorts.push(outPort[0]);
    }

    const inPort = this.inPorts.filter(p => p.name === input);
    if(inPort.length === 0) {
      // check signals
      const inPortSignal = this.signals.filter(p => p.name === input);
      element.inPorts.push(inPortSignal[0]);
    } else {
      element.inPorts.push(inPort[0]);
    }

    this.elements.push(element);
  }

  // recursion to find one object node
  public searchTree(treeNode, matchingObject){
    if (treeNode instanceof matchingObject) {
      return treeNode;
    } else if (treeNode.children != null) {
      let i;
      let result = null;
        
      for (i = 0; result == null && i < treeNode.children.length; i++) {
        result = this.searchTree(treeNode.children[i], matchingObject);
      }     
      return result;
    }
    
    return null;
  }

  // recursion to find all object nodes
  public searchTreeAllNodes(treeNode, matchingObject, results){

    // if we did not get array, create empty
    if (Object.prototype.toString.call(results) !== "[object Array]") {
      results = [];
    }
    
    // if matching object found, push to result array
    if (treeNode instanceof matchingObject) {
      results.push(treeNode);
    } else if (treeNode.children != null) {
      let i;
      
      // if node has children, for each search for object
      for (i = 0; i < treeNode.children.length; i++) {
        this.searchTreeAllNodes(treeNode.children[i], matchingObject, results);
      }     
    }
    // return results
    return results;
  }

  public removeByAttr(arr, attr, value) {
    let i = arr.length;
    while(i--){
      if(arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) { 
        arr.splice(i,1);
      }
    }
    return arr;
  }
 
  public parseAndGetASTRoot (code: string) {
    const inputStream = new ANTLRInputStream(code);
    
    const lexer = new vhdlLexer(inputStream); 
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new vhdlParser(tokenStream);
    let tree = parser.design_file();
    const listener: vhdlListener = new VhdlDiagramGenerationComponent();
    ParseTreeWalker.DEFAULT.walk(listener, tree);
    console.log("listener",listener)
    return listener;
  }

}


