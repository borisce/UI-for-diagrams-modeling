import { Injectable } from '@angular/core';

enum GATES {
  AND = 'And',
  OR = 'Or',
  NAND = 'Nand',
  NOR = 'Nor',
  XOR = 'Xor',
  XNOR = 'Xnor'
}

enum CUSTOMGATES {
  AND = 'CustomAnd',
  OR = 'CustomOr',
  NAND = 'CustomNand',
  NOR = 'CustomNor',
  XOR = 'CustomXor',
  XNOR = 'CustomXnor',
  NOT = 'CustomNot'
}

enum CUSTOMGATESTYPES {
  CustomAnd = "And",
  CustomOR = 'Or',
  CustomNAND = 'Nand',
  CustomNOR = 'Nor',
  CustomXOR = 'Xor',
  CustomXNOR = 'Xnor'
}

enum INNERELEMENTS {
  ADDER = 'adder',
  COMPARATOR = 'comparator',
  SUBTRACTOR = 'subtractor',
  MULTIPLEXOR = 'multiplexor',
  RAM = 'ram',
  DECODER = 'decoder',
  REGISTER = 'register',
  ENCODER = 'encoder',
  COMPONENT = 'module'
}

// connection between elements
interface link {
  source,
  target,
  sourceItem,
  targetItem
}

// ports
interface port {
  id: string,
  name: string,
  type: string,
  direction: string
}

// inner signals
interface signal {
  name: string,
  type: string
}

interface gate {
  operation: string,
  assignment: string,
  inPort1: any,
  inPort2: any,
  output: any
}

interface element {
  type: any,
  inputs: any[],
  outputs: any[],
  statement: any,
  inBandWidth?
}

@Injectable()
export class VhdlCodeGenerationComponent {

  code = ''; 
  ports: port[] = [];
  signals: signal[] = [];
  links: link[] = [];
  innerLinks: link[] = [];
  gates: gate[] = [];
  elements: element[] = [];
  multiplexors = [];
  comparators = [];
  decoders = [];
  registers = [];
  rams = [];
  resultPermutations = [];
  customEntity = [];

  public generateVhdlCode(data,fileName) {

    this.code = 'library ieee;\n';
    this.code += 'use ieee.std_logic_1164.all;\n\n';

    // predefined start of entity
    this.code += 'entity ' + fileName + ' is\n      port (';

    // LINKS - get all links between elements
    this.links = this.findLinks(data)
    

    this.multiplexors = this.findMux(data);
    this.comparators = this.findComparators(data)
    this.registers = this.findReg(data);
    this.decoders = this.findDecoder(data);
    this.customEntity = this.findEntities(data);

   
    // PORTS - list all ports
    this.ports = this.generatePorts(data);

    // end entity and start architecture
    this.code += 'end ' + fileName + ' ;\n\n';
    
    this.code += 'architecture ' +fileName +'_arch of ' + fileName + ' is\n';

    // SIGNALS - list all inner signals
    this.signals = this.generateInnerSignals(this.innerLinks);
    
    // COMPONENTS - list all custom components
    this.generateComponents();

    // begin assignments inside architecture partS
    this.code += 'begin\n\n';

    // ASSIGNMENTS
    this.generateAssignments();
    this.listStatements();

    // end architecture
    this.code += 'end ' + fileName +'_arch;';

    this.clear();
    return this.code;
  }

  public clear() {
    this.links = [];
    this.ports = [];
    this.innerLinks = [];
    this.gates = [];
    this.elements = [];
  }

  public listStatements() {
    this.elements.reverse();
    for(const element of this.elements) {
      this.code += element.statement;
    }
  }

  public getOperation(type) {
    if(type === 'Or' || type === 'CustomOr') {
      return 'or';
    }     
    if(type === 'And' || type === 'CustomAnd') {
      return 'and'
    }
    if(type === 'Nor' || type === 'CustomNor') {
      return 'nor'
    }
    if(type === 'Nand' || type === 'CustomNand') {
      return 'nand'
    }
    if(type === 'Xor' || type === 'CustomXor') {
      return 'xor'
    }
    if(type === 'Xnor' || type === 'CustomXnor') {
      return 'xnor'
    }
    if(type === 'CustomNot') {
      return 'not'
    }
  }

  public generateInnerSignals(innerLinks) {
    const signals: signal [] = [];
    for(const l of innerLinks) {
      const signal = <signal>{};

      if(l.sourceItem.attributes.elType != "standalonePort"){
        if(l.sourceItem.attributes.elType === 'encoder'
        || l.sourceItem.attributes.elType === 'decoder') {
          signal.name = l.sourceItem.attributes.ports.items[0].name;
        } else if (l.sourceItem.attributes.elType === 'module') {
          signal.name = l.source.port;
        }
        else {
          signal.name = l.sourceItem.attributes.name;
        }

        if(l.sourceItem.attributes.bandwidth) {
          if (l.sourceItem.attributes.elType === 'encoder' 
          || l.sourceItem.attributes.elType === 'decoder') {
            const outPort = l.sourceItem.attributes.ports.items.find(p => p.group === 'out');
            const number = Number(outPort.bandwidth) - 1;
            signal.type = l.sourceItem.attributes.bandwidth === 1 ? 'std_logic' : 'std_logic_vector(' + number.toString() + ' downto 0)';

          } else {
            signal.type = l.sourceItem.attributes.bandwidth === 1 ? 'std_logic' : 'std_logic_vector(' + (l.sourceItem.attributes.bandwidth - 1) + ' downto 0)';
          }
          
        }
        else {
          if (l.sourceItem.attributes.elType === 'module') {
            const port = l.sourceItem.attributes.ports.items.find(p => p.id === l.source.port);
            signal.type = port.bandwidth === 1 ? 'std_logic' : 'std_logic_vector(' + port.bandwidth + ' downto 0)';
          }
        }

        if(!this.containsObject(signal, signals))
          this.code += '      signal ' + signal.name + ': ' + signal.type + ';\n';
        signals.push(signal);
      }         
    }

    return signals;
  }

  public containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].name === obj.name && list[i].type === obj.type) {
            return true;
        }
    }

    return false;
}

  public findEntities(data) {

    const enitites = [];

    for(const e of data.elements) {
      if(e.attributes.elType === 'module') {
        enitites.push(e);
      }
    }
    return enitites;
  }

  public generatePorts(data) {
    const ports: port [] = [];

    for(const e of data.elements) {
      const port = <port>{};

      if(e.attributes.elType === 'standalonePort') {
        port.id = e.attributes.id;
        port.name = e.attributes.ports.items[0].name;
        if(e.attributes.ports.items[0].group == "out"){
          port.direction = "in"
        }
        else{
          port.direction = "out"
        }

        if(e.attributes.ports.items[0].bandwidth === 1){
          port.type =   'std_logic'
        }
        else if (e.attributes.ports.items[0].bandwidth > 1){
          port.type ='std_logic_vector(' + (Number(e.attributes.ports.items[0].bandwidth) - 1) + ' downto 0)' 
        }
        
        if(e.attributes.ports.items[0].struct != null){
          port.type = e.attributes.ports.items[0].struct
        }
        
        //port.type = e.attributes.ports.items[0].bandwidth === 1 ? 'std_logic' : 'std_logic_vector(' + (Number(e.attributes.ports.items[0].bandwidth) - 1) + ' downto 0)';

        ports.push(port);
      }    
    }

    // generate code - grouped ports
    // this.generateGroupedPorts(ports);
    
    // generate code - list of ports
    this.generateListOfPorts(ports);
  
    return ports;
  }

  public generateListOfPorts(ports) {
    let portCount = 0;

    for(const port of ports) {
      portCount++;

      if(portCount > 1) {
        this.code += '            ';
      }

      this.code += port.name + ': ' + port.direction + ' ' + port.type;

      if(portCount === ports.length) {
        this.code += ');\n'
      } else {
        this.code += ';\n'
      }
    }
  }

  public generateGroupedPorts(ports) {
    // group ports by type and direction
    let groupedPorts = this.groupBy(ports, function (item) {
      return [item.direction, item.type];
    });

    let portGroupCount = 0;

    for(const portGroup of groupedPorts) {
      let portCount = 0;
      portGroupCount++;

      for(const port of portGroup) {
        portCount++;
        this.code += port.name;

        if(portCount === portGroup.length) {
          this.code += ': ' + port.direction + ' ' + port.type;
          if(portGroupCount === groupedPorts.length) {
            this.code += ');\n'
          } else {
            this.code += ';\n'
          }
        } else {
          this.code += ', ';
        }
      }
    }
  }

  public groupBy(array, f) {
    let groups = {};
    array.forEach(function (o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    })
  }

  public findMux(data) {
    const multiplexors = [];

    for(const e of data.elements) {
      if(e.attributes.elType === 'multiplexor') {
        multiplexors.push(e);
      }
    }
    return multiplexors;
  }

  public findRams(data) {
    const rams = [];

    for(const e of data.elements) {
      if(e.attributes.elType === 'ram') {
        rams.push(e);
      }
    }
    return rams;
  }

  public findComparators(data) {
    const comparators = [];

    for(const e of data.elements) {
      if(e.attributes.elType === 'comparator') {
        comparators.push(e);
      }
    }
    return comparators;
  }

  public findReg(data) {
    const registers = [];

    for(const e of data.elements) {
      if(e.attributes.elType === 'register') {
        registers.push(e);
      }
    }
    return registers;
  }

  public findDecoder(data) {
    const decoders = [];

    for(const e of data.elements) {
      if(e.attributes.elType === 'decoder') {
        decoders.push(e);
      }
    }
    return decoders;
  }

  public findLinks(data) {
    const links: link[] = [];
    // LINKS - find all connections - links
    for(const l of data.links) {
      let link = <link>{};

      link.source = l.attributes.source;
      link.target = l.attributes.target;

      // mux output port not handled correctly
      if (l.attributes.source.selector === 'g:nth-child(1) > g:nth-child(8) > polygon:nth-child(1)') {
        link.source.id = l.attributes.source.id;
        link.source.port = 'mux';
      }

      link.sourceItem = data.elements.find(x => x.id === l.attributes.source.id);
      link.targetItem = data.elements.find(x => x.id === l.attributes.target.id);

      // find links, which source and target attributes.type is not basic.Path - these are inner signals (so they start and end in another type component)
      //if(link.sourceItem.attributes.elType != 'standalonePort' && link.targetItem.attributes.elType != 'standalonePort') { 
      this.innerLinks.push(link);
      //}

      links.push(link);
    }
    return links;
  }

  public generateComponents() {
    const uniqueComponents = [...new Map(this.customEntity.map(item => [item.attributes.name, item])).values()];
    for(const entity of uniqueComponents) {
      let portCount = 0;

      this.code += '\n      component ' + entity.attributes.name + '\n';
      this.code += '          port('
      

      for(const port of entity.attributes.ports.items) {
        portCount++;

        if(portCount > 1) {
          this.code += '                  ';
        }
        
        this.code += port.name + ': ' + port.group + ' ';
        this.code += port.bandwidth === 1 ? 'std_logic' : 'std_logic_vector(' + (Number(port.bandwidth) - 1) + ' downto 0)';

        if(portCount === entity.attributes.ports.items.length) {
          this.code += ');\n'
        } else {
          this.code += ';\n'
        }
      }

      this.code += '      end component ' + entity.attributes.name + ';\n\n';
    }
  }

  public generateAssignments() {
    for(const p of this.ports) {
      for(const l of this.links) {
        if(p.name === l.target.port) {
          if (p.direction === 'out') {
            if(Object.values(CUSTOMGATES).includes(l.sourceItem.attributes.elType) || Object.values(GATES).includes(l.sourceItem.attributes.elType) || Object.values(INNERELEMENTS).includes(l.sourceItem.attributes.elType)) {              
              this.listElements(true, l);
            }
          }
        }
      }
    }
  }

  public listElements(first, link, element?: element) {
    let currentLink: link = link;
    let inPorts = this.links.filter(x => x.targetItem.id === currentLink.sourceItem.id);
    let assignment = '';
    let selPort = '';

    let newElement: element = {
      type: currentLink.sourceItem.attributes.elType,
      inputs: inPorts,
      outputs: [],
      statement: ''
    }
    
    if (first) {
      element = newElement;
    }
    if(newElement.type === 'decoder' || newElement.type === 'encoder') {
      newElement.inBandWidth = currentLink.sourceItem.attributes.bandwidth;
    }

    if (Object.values(CUSTOMGATES).includes(currentLink.targetItem.attributes.elType)
    || currentLink.targetItem.attributes.type.includes('logic') 
    || currentLink.targetItem.attributes.elType === 'multiplexor'
    || currentLink.targetItem.attributes.elType === 'adder'
    || currentLink.targetItem.attributes.elType === 'comparator'
    || currentLink.targetItem.attributes.elType === 'subtractor'
    || currentLink.targetItem.attributes.elType === 'register'
    || currentLink.targetItem.attributes.elType === 'decoder'
    || currentLink.targetItem.attributes.elType === 'encoder'
    || currentLink.targetItem.attributes.elType === 'module') {
      newElement.outputs.push(currentLink.sourceItem);
    } else {
      newElement.outputs.push(currentLink.targetItem);
    }

    if(Object.values(CUSTOMGATES).includes(newElement.type) || Object.values(GATES).includes(newElement.type)) {
      // spacing
      assignment += '  '
      if(Object.values(CUSTOMGATES).includes(newElement.type)){
        for (let i = newElement.outputs[0].attributes.ports.items.length-1; i>=0; i--){
          if(newElement.outputs[0].attributes.elType === "standalonePort"){
            assignment += newElement.outputs[0].attributes.ports.items[i].name;
          }
          if(newElement.outputs[0].attributes.ports.items[i].group == "out"){
            assignment += newElement.outputs[0].attributes.ports.items[i].attributes.name;    
            break;
          }
        }

        assignment += ' <= ';
        if(this.getOperation(newElement.type) === 'not'){
          assignment += ' ' + this.getOperation(newElement.type) + ' ';
        }
        for(let i = 0; i< newElement.inputs.length; i++){

          if (newElement.inputs[i].sourceItem.attributes.elType === 'standalonePort'){
            
            assignment += newElement.inputs[i].sourceItem.attributes.ports ? newElement.inputs[i].sourceItem.attributes.ports.items[0].name : newElement.inputs[i].sourceItem.attributes.name;
          }else if (newElement.inputs[i].sourceItem.attributes.elType === 'module') 
            assignment += newElement.inputs[i].source.port;
          else 
            assignment += newElement.inputs[i].sourceItem.attributes.name;

          //assignment += newElement.inputs[0].sourceItem.attributes.ports ? newElement.inputs[0].sourceItem.attributes.ports.items[0].name : newElement.inputs[0].sourceItem.attributes.name;
          
          if(i != newElement.inputs.length-1 && this.getOperation(newElement.type) != 'not'){
            assignment += ' ' + this.getOperation(newElement.type) + ' ';
          }
          
        }
          
          assignment += ';\n\n';

        
      }
      else{
        assignment += newElement.outputs[0].attributes.ports ? newElement.outputs[0].attributes.ports.items[0].name : newElement.outputs[0].attributes.name;
      
        assignment += ' <= ';
      

        if (newElement.inputs[0].sourceItem.attributes.elType === 'standalonePort')
          assignment += newElement.inputs[0].sourceItem.attributes.ports ? newElement.inputs[0].sourceItem.attributes.ports.items[0].name : newElement.inputs[0].sourceItem.attributes.name;
        else if (newElement.inputs[0].sourceItem.attributes.elType === 'module') 
          assignment += newElement.inputs[0].source.port;
        else 
          assignment += newElement.inputs[0].sourceItem.attributes.name;

        //assignment += newElement.inputs[0].sourceItem.attributes.ports ? newElement.inputs[0].sourceItem.attributes.ports.items[0].name : newElement.inputs[0].sourceItem.attributes.name;
        
        assignment += ' ' + this.getOperation(newElement.type) + ' ';

        if (newElement.inputs[1].sourceItem.attributes.elType === 'standalonePort')
          assignment += newElement.inputs[1].sourceItem.attributes.ports ? newElement.inputs[1].sourceItem.attributes.ports.items[0].name : newElement.inputs[1].sourceItem.attributes.name;
        else if (newElement.inputs[1].sourceItem.attributes.elType === 'module') 
          assignment += newElement.inputs[1].source.port;
        else 
          assignment += newElement.inputs[1].sourceItem.attributes.name;
        
        //assignment += newElement.inputs[1].sourceItem.attributes.ports ? newElement.inputs[1].sourceItem.attributes.ports.items[0].name : newElement.inputs[1].sourceItem.attributes.name;
        
        assignment += ';\n\n';

      }
     
      // Another solution - for diff inner signal name, in case the previous solution is not correct, TODO - add other elements

      /* if (newElement.outputs[0].attributes.elType === 'register'){
        assignment += newElement.outputs[0].attributes.name;
      }
      else {
        assignment += newElement.outputs[0].attributes.ports ? newElement.outputs[0].attributes.ports.items[0].name : newElement.outputs[0].attributes.name;
      }

      assignment += ' <= ';

      if (newElement.inputs[0].sourceItem.attributes.elType === 'register') {
        assignment += newElement.inputs[0].sourceItem.attributes.name;
      } else {
        assignment += newElement.inputs[0].sourceItem.attributes.ports ? newElement.inputs[0].sourceItem.attributes.ports.items[0].name : newElement.inputs[0].sourceItem.attributes.name;
      }

      assignment += ' ' + this.getOperation(newElement.type) + ' ';

      if (newElement.inputs[1].sourceItem.attributes.elType === 'register') {
        assignment += newElement.inputs[1].sourceItem.attributes.name;
      } else {
        assignment += newElement.inputs[1].sourceItem.attributes.ports ? newElement.inputs[1].sourceItem.attributes.ports.items[0].name : newElement.inputs[1].sourceItem.attributes.name;
      }

      assignment += '\n'; */


    } else if (newElement.type === 'multiplexor') {
      assignment += this.handleMux(newElement);
    } else if (newElement.type === 'adder') {
      assignment += this.handleAdder(newElement, currentLink);
    } else if (newElement.type === 'comparator') {
      assignment += this.handleComparator(newElement);
    }else if (newElement.type === 'subtractor') {
      assignment += this.handleSubtractor(newElement, currentLink);
    } else if (newElement.type === 'register') {
      assignment += this.handleRegister(newElement);
    } else if (newElement.type === 'decoder') {
      assignment += this.handleDecoder(newElement);
    } else if (newElement.type === 'encoder') {
      assignment += this.handleEncoder(newElement);
    } else if (newElement.type === 'module') {
      assignment += this.handleComponent(newElement);
    } else{//console.log(newElement.type)
    }
    
    newElement.statement = assignment;

    // ak this.elements uz obsahuju element s tymto statementom tak ho tam nepridavaj
    if(!this.elements.some(el => el.statement === assignment)) {
      this.elements.push(newElement);
    }

    for (const l of this.links) {
      if(l.targetItem.id === currentLink.sourceItem.id) {
        if(l.sourceItem.attributes.elType != 'standalonePort') {
          this.listElements(false, l, element)
        }
      }
    }
  }

  public handleMux(newElement) {
    //https://surf-vhdl.com/how-to-implement-digital-mux-in-vhdl/
    let assignment = '';
    let regInputs = [];
    let selInputs = [];

    for (const mux of this.multiplexors) {

      for (const link of this.links) {

        if (mux.getPort(link.source.port)) {

          //const outPort = mux.getPort(link.source.port).name;
          const outPort = newElement.outputs[0].attributes.name ? newElement.outputs[0].attributes.name : newElement.outputs[0].attributes.attrs.text.text;

          // looking for regular inputs
          for (const regIn of this.links) {
            if(mux.getPort(regIn.target.port) && mux.getPort(regIn.target.port).group === 'in' && mux.id === regIn.target.id) {
              regInputs.push(regIn.sourceItem);
            }
          }

          // looking for sel input
          for (const selIn of this.links) {
            if(mux.getPort(selIn.target.port) && mux.getPort(selIn.target.port).group !== 'in' && mux.id === selIn.target.id) {        
              selInputs.push(selIn.sourceItem);
            }
          }

          if(newElement.inputs.length <= 3) {
            assignment += outPort;
            assignment += ' <= ';
            // to add condition - sel input
            if(Object.values(CUSTOMGATES).includes(regInputs[0].attributes.elType)){
              assignment += regInputs[0].attributes.name;
            }
            else{
              assignment += regInputs[0].attributes.ports ? regInputs[0].attributes.ports.items[0].name : regInputs[0].attributes.name;  
            }

            assignment += ' when '
            assignment += '(';
            
            if(Object.values(CUSTOMGATES).includes(selInputs[0].attributes.elType)){
              assignment += selInputs[0].attributes.name;
            }
            else{
              assignment += selInputs[0].attributes.ports ? selInputs[0].attributes.ports.items[0].name : selInputs[0].attributes.name;
            }

            assignment += "='1')"
            assignment += ' else '
            
            if(Object.values(CUSTOMGATES).includes(regInputs[1].attributes.elType)){
              assignment += regInputs[1].attributes.name;
            }
            else{
              assignment += regInputs[1].attributes.ports ? regInputs[1].attributes.ports.items[0].name : regInputs[1].attributes.name;  
            }

            assignment += ';\n\n';
          } else if (newElement.inputs.length > 3) {
            
            // this is based on sel bandwidth - TODO +1???
            const selWidth = selInputs[0].attributes.bandwidth;
            let i = 0;
            let combs = this.combinations(selWidth);
            const selInput = selInputs[0].attributes.ports ? selInputs[0].attributes.ports.items[0].name : selInputs[0].attributes.name;

            assignment += 'process(';

            for (const input of regInputs) {
              assignment += input.attributes.ports ? input.attributes.ports.items[0].name : input.attributes.name;
              assignment += ', ';         
            } 

            assignment += selInput;
            assignment += ') is\n';
            assignment += 'begin\n';
            assignment += 'case ' + selInput + ' is\n';

            for (const input of regInputs) {
              
              const inPort = input.attributes.ports ? input.attributes.ports.items[0].name : input.attributes.name;

              if (i === regInputs.length - 1) {
                assignment += '   when others => ' + outPort + ' <= ' + inPort + ';\n';
              } else {
                assignment += '   when ' + '"' + combs[i] + '"' + ' => ' + outPort + ' <= ' + inPort + ';\n';
              }

              i++;
            }

            assignment += 'end case;\n';
            assignment += 'end process;\n';

          }
        }
      }
    }

    return assignment;
  }

  public handleAdder(newElement, currentLink) {
    // startingelectronics.org/software/VHDL-CPLD/course/tut14-VHDL-adder/
    
    let assignment = '  ';

    assignment += newElement.outputs[0].attributes.name ? newElement.outputs[0].attributes.name : newElement.outputs[0].attributes.attrs.text.text;
    assignment += ' <= ';
    assignment += "('0' & "


    if (newElement.inputs[0].sourceItem.attributes.elType === 'standalonePort')
      assignment += newElement.inputs[0].sourceItem.attributes.ports ? newElement.inputs[0].sourceItem.attributes.ports.items[0].name : newElement.inputs[0].sourceItem.attributes.name;
    else 
      assignment += newElement.inputs[0].sourceItem.attributes.name;
    
    assignment += ')';
    assignment += ' + ';
    assignment += "('0' & "

    if (newElement.inputs[1].sourceItem.attributes.elType === 'standalonePort')
      assignment += newElement.inputs[1].sourceItem.attributes.ports ? newElement.inputs[1].sourceItem.attributes.ports.items[0].name : newElement.inputs[1].sourceItem.attributes.name;
    else 
      assignment += newElement.inputs[1].sourceItem.attributes.name;
    
    assignment += ')';
    assignment += '\n\n';

    return assignment;
  }

  public handleComparator(newElement) {
    let assignment = '';
    let inputs = [];
      
    for (const comp of this.comparators) {

      for (const link of this.links) {

        if (comp.getPort(link.source.port)) {

          const outPort = newElement.outputs[0].attributes.name ? newElement.outputs[0].attributes.name : newElement.outputs[0].attributes.attrs.text.text;

          for (const regIn of this.links) {
            if(comp.getPort(regIn.target.port) && comp.getPort(regIn.target.port).group === 'in' && comp.id === regIn.target.id) {
              inputs.push(regIn.sourceItem);
            }
          }

          // this is based on sel bandwidth - TODO +1???
          //const selWidth = selInputs[0].attributes.bandwidth;
          //let i = 0;
          //let combs = this.combinations(selWidth);
          //const selInput = selInputs[0].attributes.ports ? selInputs[0].attributes.ports.items[0].name : selInputs[0].attributes.name;

          assignment += '   process(';

          for (const input of inputs) {
            assignment += input.attributes.ports ? input.attributes.ports.items[0].name : input.attributes.name;
            assignment += ', ';         
          }
          
          assignment = assignment.slice(0,-2)

          assignment += ') is\n';
          assignment += '   begin\n';
          assignment += '      if ';
          assignment += inputs[0].attributes.ports ? inputs[0].attributes.ports.items[0].name : inputs[0].attributes.name;
          assignment += ' ' + comp.attributes.comparatorType + ' ';
          assignment += inputs[1].attributes.ports ? inputs[1].attributes.ports.items[0].name : inputs[1].attributes.name;
          assignment += ' then\n' +  '         '+ outPort +  " <= '1'\n";
          assignment += '      else\n'
          assignment += '         '+ outPort +  " <= '0'\n";

          assignment += '      end if;\n';
          assignment += '   end process;\n';
            
            

          
        }
      }
    }

    return assignment;
  }

  public handleSubtractor(newElement, currentLink) {
    
    let assignment = '  ';

    assignment += newElement.outputs[0].attributes.name ? newElement.outputs[0].attributes.name : newElement.outputs[0].attributes.attrs.text.text;
    assignment += ' <= ';
    assignment += "('0' & "


    if (newElement.inputs[0].sourceItem.attributes.elType === 'standalonePort')
      assignment += newElement.inputs[0].sourceItem.attributes.ports ? newElement.inputs[0].sourceItem.attributes.ports.items[0].name : newElement.inputs[0].sourceItem.attributes.name;
    else 
      assignment += newElement.inputs[0].sourceItem.attributes.name;
    
    assignment += ')';
    assignment += ' - ';
    assignment += "('0' & "

    if (newElement.inputs[1].sourceItem.attributes.elType === 'standalonePort')
      assignment += newElement.inputs[1].sourceItem.attributes.ports ? newElement.inputs[1].sourceItem.attributes.ports.items[0].name : newElement.inputs[1].sourceItem.attributes.name;
    else 
      assignment += newElement.inputs[1].sourceItem.attributes.name;
    
    assignment += ')';
    assignment += '\n\n';

    return assignment;
  }

  public handleRegister(newElement) {
    let assignment = '';
    let regInput;
    let clkInput;
    let enInput = null;
    let rstInput = null;

    for (const reg of this.registers) {

      for (const link of this.links) {
        if (reg.getPort(link.source.port)) {

          // looking for regular input
          for (const regIn of this.links) {
            if(reg.getPort(regIn.target.port) && reg.getPort(regIn.target.port).group === 'in' && reg.id === regIn.target.id) {
              regInput = regIn.sourceItem;
            }
          }

          // looking for clk input
          for (const clkIn of this.links) {
            if(reg.getPort(clkIn.target.port) && reg.getPort(clkIn.target.port).group === 'clk' && reg.id === clkIn.target.id) {
              clkInput = clkIn.sourceItem;
            }
          }

          // looking for enable input
          for (const enIn of this.links) {
            if(reg.getPort(enIn.target.port) && reg.getPort(enIn.target.port).group === 'enable' && reg.id === enIn.target.id) {
              enInput = enIn.sourceItem;
            }
          }

          // looking for reset input
          for (const rstIn of this.links) {
            if(reg.getPort(rstIn.target.port) && reg.getPort(rstIn.target.port).group === 'rst' && reg.id === rstIn.target.id) {
              rstInput = rstIn.sourceItem;
            }
          }

          let enable = null;
          let clr = null;

          if (enInput) 
            enable = enInput.attributes.ports ? enInput.attributes.ports.items[0].name : enInput.attributes.name;
          if (rstInput)  
            clr = rstInput.attributes.ports ? rstInput.attributes.ports.items[0].name : rstInput.attributes.name;

          let clk = clkInput.attributes.ports ? clkInput.attributes.ports.items[0].name : clkInput.attributes.name;
          let regIn;

          if (regInput.attributes.elType === 'standalonePort') {
            regIn = regInput.attributes.ports ? regInput.attributes.ports.items[0].name : regInput.attributes.name;
          }
          else 
            regIn = regInput.attributes.name;
          
          //  let regIn = regInput.attributes.ports ? regInput.attributes.ports.items[0].name : regInput.attributes.name;

          let out = newElement.outputs[0].attributes.ports ? newElement.outputs[0].attributes.ports.items[0].name : newElement.outputs[0].attributes.name;;

          assignment += '  process('
          assignment += clk;

          if (clr) {
            assignment += ', ';
            assignment += clr;
          }
          
          assignment += ')\n';
          assignment += '    begin\n';

          if (clr) {
            assignment += '      if ' + clr  + " = '1' then" + '\n';

            if (regInput.attributes.bandwidth.toString() !== '1') {
              assignment += '        ' + out + " <= x" + '"00000000"' + ';\n';
            } else {
              assignment += '        ' + out + " <= '0';\n";
            }
          }
               
          if (clr) {
            assignment += '      elsif (' + clk + "'event and " + clk + "='1') then\n";
          } else {
            assignment += '      if (' + clk + "'event and " + clk + "='1') then\n";
          } 

          if (enable) {
            assignment += '        if (' + enable + " = '1') then\n  ";
          }
  
          assignment += '        ' + out + ' <= ' + regIn + ';\n';
          
          if ((!clr && enable) || (clr && enable)) {
            assignment += '        end if;\n';
          }
        
          assignment += '      end if;\n';
          assignment += '  end process;\n\n';          
        }
      }
    }
    return assignment;
  }

  public handleDecoder(newElement) {
    // https://startingelectronics.org/software/VHDL-CPLD-course/tut5-decoders/
    const inWidth = newElement.inBandWidth;
    let outWidth = inWidth ** 2;
    

    if (inWidth.toString() === '3') outWidth = 8

    let inPort;
    let outPort;
    let enPort;
    
    let assignment = '';

    outPort = newElement.outputs[0].attributes.ports ? newElement.outputs[0].attributes.ports.items[0].name : newElement.outputs[0].attributes.name;
    
    if (newElement.inputs[0].sourceItem.attributes.elType === 'standalonePort')
      inPort = newElement.inputs[0].sourceItem.attributes.ports ? newElement.inputs[0].sourceItem.attributes.ports.items[0].name : newElement.inputs[0].sourceItem.attributes.name;
    else 
      inPort = newElement.inputs[0].sourceItem.attributes.name;
    
    //inPort = newElement.inputs[0].sourceItem.attributes.ports ? newElement.inputs[0].sourceItem.attributes.ports.items[0].name : newElement.inputs[0].sourceItem.attributes.name;

    const helper = '0'.repeat(outWidth);

    let combs = this.combinations(inWidth);

    assignment += '  process('
    assignment += inPort
    
    if(enPort) 
      assignment += ', ' + enPort + ')\n';
    else 
      assignment += ')\n';

    assignment += '    begin\n';
    //assignment += outPort + ' <= ' + '"' + '1'.repeat(outWidth) + '"' + ';\n';

    if(enPort) assignment += '      if (' + enPort + " = '1') then\n  ";

    assignment += '      case ' + inPort + ' is\n';
    
    for (var i = 0; i <= outWidth - 1; i++) {
      const res = helper.substring(i + 1) + '1' + helper.substring(0, i);
      assignment += '        when "' + combs[i] + '" => ' + outPort + ' <= "' + res + '";\n';
    }

    assignment += '      end case;\n';
    if(enPort) assignment += '    end if;\n';
    assignment += '  end process;\n\n';

    return assignment;  
  }

  public handleEncoder(newElement) {

    const inWidth = newElement.inBandWidth;
    const outWidth = Math.ceil(Math.sqrt(Number(inWidth)));

    let inPort;
    let outPort;
    let enPort;

    let assignment = '';

    outPort = newElement.outputs[0].attributes.ports ? newElement.outputs[0].attributes.ports.items[0].name : newElement.outputs[0].attributes.name;
    
    if (newElement.inputs[0].sourceItem.attributes.elType === 'standalonePort')
      inPort = newElement.inputs[0].sourceItem.attributes.ports ? newElement.inputs[0].sourceItem.attributes.ports.items[0].name : newElement.inputs[0].sourceItem.attributes.name;
    else 
      inPort = newElement.inputs[0].sourceItem.attributes.name;
    
    //inPort = newElement.inputs[0].sourceItem.attributes.ports ? newElement.inputs[0].sourceItem.attributes.ports.items[0].name : newElement.inputs[0].sourceItem.attributes.name;

    const helper = '0'.repeat(inWidth);

    let combs = this.combinations(outWidth);
    
    assignment += '  process('
    assignment += inPort
    
    if(enPort) 
      assignment += ', ' + enPort + ')\n';
    else 
      assignment += ')\n';

    assignment += '    begin\n';
    //assignment += outPort + ' <= ' + '"' + '1'.repeat(inWidth) + '"' + ';\n';

    if(enPort) assignment += '      if (' + enPort + " = '1') then\n";

    assignment += '      case ' + inPort + ' is\n';
    
    for (var i = 0; i <= inWidth - 1; i++) {
      const res = helper.substring(i + 1) + '1' + helper.substring(0, i);
      assignment += '        when "' + res + '" => ' + outPort + ' <= "' + combs[i] + '";\n';
    }

    assignment += '      end case;\n';
    if(enPort) assignment += '    end if;\n';
    assignment += '  end process;\n\n';

    return assignment;
  }

  public handleComponent(newElement) {

    let assignment = '';

    for (const component of this.customEntity) {

      assignment += '  ' + component.attributes.instance + ' : ' + component.attributes.name + '\n';
      assignment += '      port map (\n';

      for(const port of component.attributes.ports.items) {

        assignment += '        ' + port.name + ' => ';
        
        for (const link of this.links) {

          if(component.getPort(link.target.port) && component.getPort(link.target.port).id === port.id
          || component.getPort(link.source.port) && component.getPort(link.source.port).id === port.id) {

            if (link.sourceItem.attributes.elType === 'standalonePort' || Object.values(CUSTOMGATES).includes(link.sourceItem.attributes.elType) || Object.values(GATES).includes(link.sourceItem.attributes.elType)) {
              assignment += link.sourceItem.attributes.ports ? link.sourceItem.attributes.ports.items[0].name : link.sourceItem.attributes.name;
              assignment += ',\n';
            } else if (link.sourceItem.attributes.elType === 'module') {

              if (link.targetItem.attributes.elType === 'standalonePort') {
                assignment += link.target.port;
                assignment += '\n';
              } else {
                assignment += link.source.port;
                assignment += '\n';
              }
            }
          }
        }
      }  

      assignment += '      );\n\n';
    }

    return assignment;
  }

  public combinations(n) {
    var states = [];

    // Convert to decimal
    var maxDecimal = parseInt("1".repeat(n),2);

    // For every number between 0 -> decimal
    for(var i = 0; i <= maxDecimal; i++){
      // Convert to binary, pad with 0, and add to final results
      states.push(i.toString(2).padStart(n,'0'));
    }

    return states; 
  }
}