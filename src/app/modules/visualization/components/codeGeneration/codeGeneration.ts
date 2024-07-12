import { Connection } from './connection';
import { Injectable } from '@angular/core';
import { LogicalTwoInputGateToCode } from '../classes/logicalTwoInputGateToCode';
import { LogicalDynamicInputsGateToCode } from '../classes/logicalDynamicInputsGateToCode';
import { Console } from 'console';
import { lastIndexOf } from 'lodash';
import { data } from 'jquery';

@Injectable()
export class CodeGenerationComponent {

  public allConnections: Connection[] = [];
  public gateString = '';
  public generateSourceCode(dataInJSON, moduleName) {
    const moduleNamePlaceholder = moduleName;
    let sourceCode = '';
    const standalonePorts = this.separateStandalonePorts(dataInJSON);
    const modules = this.separateModules(dataInJSON);
    const duplicators = this.separateDuplicators(dataInJSON);
    const ors = this.separateCustomORGates(dataInJSON);
    const ands = this.separateCustomAndGates(dataInJSON);
    const nors = this.separateCustomNORGates(dataInJSON);
    const nands = this. separateCustomNANDGates(dataInJSON);
    const xors = this. separateCustomXORGates(dataInJSON);
    const xnors = this.separateCustomXNORGates(dataInJSON);
    const nots = this.separateCustomNOTGates(dataInJSON);

    /*const ors = this.separateORGates(dataInJSON);
    const ands = this.separateAndGates(dataInJSON);
    const nors = this.separateNORGates(dataInJSON);
    const nands = this. separateNANDGates(dataInJSON);
    const xors = this. separateXORGates(dataInJSON);
    const xnors = this.separateXNORGates(dataInJSON);*/
    const multiplexers = this.separateMultiplexers(dataInJSON);
    const decoders = this.separateDecoders(dataInJSON);
    const encoders = this.separateEncoders(dataInJSON);
    const adders = this.separateAdders(dataInJSON);
    const subtractors = this.separateSubtractors(dataInJSON);
    const comparators = this.separateComparators(dataInJSON);
    const registers = this.separateRegisters(dataInJSON);
    const rams = this.separateRams(dataInJSON);
    var ramsCounter = rams.length
    var ramsCodeGenerated = 0;

    this.getAllConnectionData(dataInJSON, modules, standalonePorts, duplicators, ors, ands, nors, nands, xors, xnors, nots, multiplexers, decoders, registers, rams, encoders, adders,subtractors,comparators);

    // Actual generation of code
    // source code header
    sourceCode += 'module ' + moduleNamePlaceholder + ' (\n';
    // definition of standalone ports existence
    let standalonePortCounter = 0;
    standalonePorts.forEach(port => {
      standalonePortCounter++;
      if (port.attributes.ports.items[0].group === 'out') { sourceCode += '  input '; } else { sourceCode += '  output '; }
      if (port.attributes.ports.items[0].bandwidth === 1) { sourceCode += 'logic       \t'; } else if (port.attributes.ports.items[0].bandwidth === null) { sourceCode += port.attributes.ports.items[0].struct + ' \t'; } else {
        sourceCode += 'logic [' + (port.attributes.ports.items[0].bandwidth - 1) + ':0] \t';
      }
      if (standalonePortCounter === standalonePorts.length) { sourceCode += port.attributes.ports.items[0].name + '\n'; } else { sourceCode += port.attributes.ports.items[0].name + ',\n'; }
    });
    sourceCode += ');\n\n';
    // definition of outgoing inner port connections of modules
    this.allConnections.forEach(connection => {
      if (connection.sourcePortRef === 'moduleOutput') {
        if (connection.sourcePort.bandwidth === 1) {
          sourceCode += 'logic       \t';
        } else if (connection.sourcePort.bandwidth === null) {
          sourceCode += connection.sourcePort.struct + '       \t';
        } else { sourceCode += 'logic [' + (connection.sourcePort.bandwidth - 1) + ':0] \t'; }
        if (connection.destinationPortRef !== 'duplicator' && (!this.getIfItsAGate(connection.destinationPortRef))
          && connection.destinationPortRef !== 'multiplexerSel' && connection.destinationPortRef !== 'multiplexerInput'
          && connection.destinationPortRef !== 'decoderInput') {
          sourceCode += connection.sourcePort.id;
          sourceCode += '_to_';
          sourceCode += connection.link.attributes.target.port + ';\n';
        }else if(this.getIfItsAGate(connection.destinationPortRef)){
          sourceCode += connection.sourcePort.id;
          sourceCode += '_to_';
          sourceCode += connection.destinationPort.id + ';\n';
        }
         else if (connection.destinationPortRef === 'decoderInput') {
          sourceCode += connection.sourcePort.id;
          sourceCode += '_to_';
          sourceCode += connection.destinationPort.id + ';\n';
        } else if(connection.destinationPortRef == "multiplexerSel"){
          for(const element of dataInJSON.elements){
            if(element.attributes.elType === "multiplexor"){
              const foundElement = element.attributes.ports.items.find(port => port.id == connection.link.attributes.target.port
                && port.group == "sel"
              )
              if(foundElement != null){
                sourceCode += connection.sourcePort.id
                sourceCode += '_to_' + element.attributes.name + "_sel;\n" 
                break
              }    
            }
          }
        } else if(connection.destinationPortRef == "multiplexerInput"){
          for(const element of dataInJSON.elements){
            if(element.attributes.elType === "multiplexor"){
              const foundElement = element.attributes.ports.items.find(port => port.id == connection.link.attributes.target.port
                && port.group == "in"
              )
              if(foundElement != null){
                sourceCode += connection.sourcePort.id
                sourceCode += '_to_' + element.attributes.name + "_in;\n"
                break
              }    
            }
          } 
        } else {
          sourceCode += connection.sourcePort.id + ';\n';
        }
      }
    });

    // DECLARATION OF OTHER signals
    /*ands.forEach(and => {
      if (and.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + and.attributes.bandwidth - 1 + ':0] \t';
      }
      sourceCode += and.attributes.name + ';\n';
    });

    ors.forEach(or => {
      if (or.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + or.attributes.bandwidth - 1 + ':0] \t';
      }
      sourceCode += or.attributes.name + ';\n';
    });

    nors.forEach(nor => {
      if (nor.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + nor.attributes.bandwidth - 1 + ':0] \t';
      }
      sourceCode += nor.attributes.name + ';\n';
    });

    nands.forEach(nand => {
      if (nand.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + nand.attributes.bandwidth - 1 + ':0] \t';
      }
      sourceCode += nand.attributes.name + ';\n';
    });

    xors.forEach(xor => {
      if (xor.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + xor.attributes.bandwidth - 1 + ':0] \t';
      }
      sourceCode += xor.attributes.name + ';\n';
    });

    xnors.forEach(xnor => {
      if (xnor.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + xnor.attributes.bandwidth - 1 + ':0] \t';
      }
      sourceCode += xnor.attributes.name + ';\n';
    });*/

    ands.forEach(and => {
      if (and.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + (and.attributes.bandwidth - 1) + ':0] \t';
      }
      sourceCode += and.attributes.name + ';\n';
    });

    ors.forEach(or => {
      if (or.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + (or.attributes.bandwidth - 1) + ':0] \t';
      }
      sourceCode += or.attributes.name + ';\n';
    });

    nors.forEach(nor => {
      if (nor.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + (nor.attributes.bandwidth - 1) + ':0] \t';
      }
      sourceCode += nor.attributes.name + ';\n';
    });

    nands.forEach(nand => {
      if (nand.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + (nand.attributes.bandwidth - 1) + ':0] \t';
      }
      sourceCode += nand.attributes.name + ';\n';
    });

    xors.forEach(xor => {
      if (xor.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + (xor.attributes.bandwidth - 1) + ':0] \t';
      }
      sourceCode += xor.attributes.name + ';\n';
    });

    xnors.forEach(xnor => {
      if (xnor.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + (xnor.attributes.bandwidth - 1) + ':0] \t';
      }
      sourceCode += xnor.attributes.name + ';\n';
    });

    nots.forEach(not => {
      if (not.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + (not.attributes.bandwidth - 1) + ':0] \t';
      }
      sourceCode += not.attributes.name + ';\n';
    });

    multiplexers.forEach(multiplexer => {
      if (multiplexer.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else if(multiplexer.attributes.bandwidth > 1) {
        sourceCode += 'logic [' + (multiplexer.attributes.bandwidth - 1) + ':0] \t';
      }
      if(multiplexer.attributes.struct != null){
        sourceCode += multiplexer.attributes.struct + '\t'
      }
      sourceCode += multiplexer.attributes.name + ';\n';
    });

    adders.forEach(adder => {
      if (adder.attributes.bandwidth == 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + (adder.attributes.bandwidth - 1) + ':0] \t';
      }
      sourceCode += adder.attributes.name + ';\n';
    });

    subtractors.forEach(subtractor => {
      if (subtractor.attributes.bandwidth == 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + (subtractor.attributes.bandwidth - 1) + ':0] \t';
      }
      sourceCode += subtractor.attributes.name + ';\n';
    });

    comparators.forEach(comparator => {
      if (comparator.attributes.bandwidth == 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + (comparator.attributes.bandwidth - 1) + ':0] \t';
      }
      sourceCode += comparator.attributes.name + ';\n';
    });

    decoders.forEach(decoder => {
      if (decoder.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + (decoder.attributes.bandwidth**2 - 1) + ':0] \t';
      }
      sourceCode += decoder.attributes.name + ';\n';
    });

    encoders.forEach(encoder => {
      if (encoder.attributes.bandwidth === 1) {
        sourceCode += 'logic       \t';
      } else {
        sourceCode += 'logic [' + (encoder.attributes.bandwidth - 1) + ':0] \t';
      }
      sourceCode += encoder.attributes.name + ';\n';
    });

    registers.forEach(register => {
      if(register.attributes.struct == ""){
        if (register.attributes.bandwidth == 1) {
          sourceCode += 'logic       \t';
        } else {
          sourceCode += 'logic [' + (register.attributes.bandwidth - 1) + ':0] \t';
        }
        sourceCode += register.attributes.name + ';\n';
      }
      else{
        sourceCode += register.attributes.struct +  ' \t' + register.attributes.name + ';\n';  
      }
      
    });

    ramsCodeGenerated = 0
    rams.forEach(ram =>{
      ramsCodeGenerated ++
      if(ram.attributes.usingDataStruct == false){
        sourceCode += 'logic [' + "DATA_WIDTH_" + ramsCodeGenerated + "-1:0] ";
        sourceCode += ram.attributes.name + " [0:RAM_DEPTH_" + ramsCodeGenerated +  '-1];\n';
      }
      else{
        sourceCode += ram.attributes.struct +  " ";
        sourceCode += ram.attributes.name + " [0:RAM_DEPTH_" + ramsCodeGenerated +  '-1];\n';
      }
    });
    ramsCodeGenerated = 0

    sourceCode += '\n';
    // print each module dafinition
    modules.forEach(module => {
      sourceCode += module.attributes.name + ' ';
      sourceCode += module.attributes.instance + ' (\n';
      const offset = this.calculateSpacing(module);
      let counter = 0;
      module.attributes.ports.items.forEach(port => {
        counter++;
        sourceCode += '  .' + port.name;
        for (let i = 0; i < (offset + 2) - port.name.length; i++) { sourceCode += ' '; }
        sourceCode += '(';
        this.allConnections.forEach(connection => {
          if ((module.getPort(connection.destinationPort.id) && module.getPort(connection.destinationPort.id).id === port.id)
            || (module.getPort(connection.sourcePort.id)
              && module.getPort(connection.sourcePort.id).id === port.id)) {
            if (connection.sourcePortRef === 'moduleOutput') {
              sourceCode += connection.sourcePort.id;
              if (connection.destinationPortRef === 'moduleInput'
                || connection.destinationPortRef === 'decoderInput') {
                sourceCode += '_to_' + connection.destinationPort.id;
              }else if(connection.destinationPortRef == "multiplexerSel"){
                for(const element of dataInJSON.elements){
                  if(element.attributes.elType === "multiplexor"){
                    const foundElement = element.attributes.ports.items.find(port => port.id == connection.link.attributes.target.port
                      && port.group == "sel"
                    )
                    if(foundElement != null){
                      sourceCode += '_to_' + element.attributes.name + "_sel"
                      break
                    }    
                  }
                }
              }else if(connection.destinationPortRef == "multiplexerInput"){
                for(const element of dataInJSON.elements){
                  if(element.attributes.elType === "multiplexor"){
                    const foundElement = element.attributes.ports.items.find(port => port.id == connection.link.attributes.target.port
                      && port.group == "in"
                    )
                    if(foundElement != null){
                      sourceCode += '_to_' + element.attributes.name + "_in"
                      break
                    }    
                  }
                }
              }else {
                sourceCode += '_to_' + connection.link.attributes.target.port;
              }
            } else if (connection.sourcePortRef === 'standaloneInput') {
              sourceCode += connection.link.attributes.source.port;
            } else if (connection.sourcePortRef === 'duplicator') {
              const duplicatedSignal = this.getDuplicationSource(connection);
              if (typeof duplicatedSignal.link.attributes.source.selector === 'string') {
                sourceCode += duplicatedSignal.link.attributes.source.selector;
              } else {
                sourceCode += duplicatedSignal.link.attributes.source.selector.id;
              }
            } else if (this.getIfItsAGate(connection.sourcePortRef)) {
              sourceCode += connection.sourcePort.attributes.name;
            } else if (connection.sourcePortRef === 'multiplexerOutput') {
              sourceCode += connection.sourcePort.name;
            } else if (connection.sourcePortRef === 'decoderOutput' || connection.sourcePortRef === 'encoderOutput') {
              sourceCode += connection.sourcePort.name;
            } else if(connection.sourcePortRef == "adderOutput" ||
            connection.sourcePortRef == "subtractorOutput" ||
            connection.sourcePortRef == "comparatorOutput" ||
            connection.sourcePortRef == "registerOutput" ||
            connection.sourcePortRef == "ramOutput"
            ){
                sourceCode += connection.sourcePort.name;
            }
            
          }
        });
        if (module.attributes.ports.items.length !== counter) { sourceCode += '),\n'; } else { sourceCode += ')\n'; }
      });
      sourceCode += ');\n\n';
    });

    decoders.forEach(decoder => {

      let outWidth;
      let inWidth;
      let inPort;
      let outPort;

      outPort = decoder.attributes.name;

      //sourceCode += 'decoder ';
      //sourceCode += decoder.attributes.name + ' (\n';
      //const offset = this.calculateSpacing(decoder);
      //let counter = 0;
      //decoder.attributes.ports.items.forEach(port => {
        //counter++;
        //sourceCode += '  .' + port.name;
        //for (let i = 0; i < (offset + 2) - port.name.length; i++) { sourceCode += ' '; }
        //sourceCode += '(';
        this.allConnections.forEach(connection => {
          /* if ((decoder.getPort(connection.destinationPort.id) && decoder.getPort(connection.destinationPort.id).id === port.id)
            || (decoder.getPort(connection.sourcePort.id)
              && decoder.getPort(connection.sourcePort.id).id === port.id)) { */

            if (connection.sourcePortRef === 'decoderOutput' && connection.sourcePort.name === outPort) {

              //outPort = connection.sourcePort.name;           
              outWidth = connection.sourcePort.bandwidth;

              this.allConnections.forEach(potentialInput => {

               if(potentialInput.destinationPortRef ==='decoderInput' && potentialInput.destinationPort.name === decoder.attributes.name) {

                  inWidth = potentialInput.destinationPort.bandwidth;

                  if (potentialInput.sourcePortRef === 'standaloneInput') {
                    inPort = potentialInput.link.attributes.source.port
                  } else if (potentialInput.sourcePortRef === 'multiplexerOutput' 
                  || potentialInput.sourcePortRef === 'decoderOutput'
                  || potentialInput.sourcePortRef === 'adderOutput'
                  || potentialInput.sourcePortRef === 'subtractorOutput'
                  || potentialInput.sourcePortRef === 'comparatorOutput' 
                  || potentialInput.sourcePortRef === 'encoderOutput' 
                  || potentialInput.sourcePortRef == "registerOutput"
                  || potentialInput.sourcePortRef === 'ramOutput'
                  ){ 
                    inPort = connection.sourcePort.name;
                  
                    inPort = potentialInput.sourcePort.name
                  }else if (potentialInput.sourcePortRef == "moduleOutput") {
                    inPort = potentialInput.sourcePort.name + "_to_" + potentialInput.destinationPort.id
                  }
                   else {
                    inPort = potentialInput.sourcePort.attributes.name;
                  }
                }
              })

              const helper = '0'.repeat(outWidth);

              let combs = this.combinations(inWidth);
            
              sourceCode += 'always @(';
              sourceCode += inPort + ')\n';
              sourceCode += '  case (' + inPort + ')\n';

              for (var i = 0; i <= outWidth - 1; i++) {
                const res = helper.substring(i + 1) + '1' + helper.substring(0, i);
                sourceCode += '    ' + inWidth + "'b" + combs[i] + ' : ' + outPort + ' = ' + outWidth + "'b" + res + ';\n';
              }

              sourceCode += '  endcase\n';
            }
              
              //sourceCode += connection.sourcePort.id;
              /* if (connection.destinationPortRef === 'moduleInput') {
                sourceCode += '_to_' + connection.destinationPort.id;
              } else if (connection.destinationPortRef === 'standaloneOutput') {
                sourceCode += '_to_' + connection.link.attributes.target.port;
              } */
            /* } else if (connection.sourcePortRef === 'moduleOutput') {
              sourceCode += connection.sourcePort.id + '_to_' + connection.destinationPort.id;
            } else if (connection.sourcePortRef === 'standaloneInput') { */
              
              //sourceCode += connection.link.attributes.source.port;
              
            /* } else if (connection.sourcePortRef === 'duplicator') {
              const duplicatedSignal = this.getDuplicationSource(connection);
              if (typeof duplicatedSignal.link.attributes.source.selector === 'string') {
                sourceCode += duplicatedSignal.link.attributes.source.selector;
              } else {
                sourceCode += duplicatedSignal.link.attributes.source.selector.id;
              }
            } else if (this.getIfItsAGate(connection.sourcePortRef)) {
              sourceCode += connection.sourcePort.attributes.name;
            } else if (connection.sourcePortRef === 'multiplexerOutput') {
              sourceCode += connection.sourcePort.name;
            } else if (connection.sourcePortRef === 'decoderOutput') {
              sourceCode += 'decoder_' + connection.sourcePort.name;
            } */
          });
        //});
        //if (decoder.attributes.ports.items.length !== counter) { sourceCode += '),\n'; } else { sourceCode += ')\n'; }
      //});
      sourceCode += '\n';
    });

    encoders.forEach(encoder => {

      let outWidth;
      let inWidth;
      let inPort;
      let outPort;

      outPort = encoder.attributes.name;

      this.allConnections.forEach(connection => {

        if (connection.sourcePortRef === 'encoderOutput'  && connection.sourcePort.name === outPort) {        
          outWidth = connection.sourcePort.bandwidth;

          this.allConnections.forEach(potentialInput => {

            if(potentialInput.destinationPortRef ==='encoderInput'  && potentialInput.destinationPort.name === encoder.attributes.name) {
              inWidth = potentialInput.destinationPort.bandwidth;

              if (potentialInput.sourcePortRef === 'standaloneInput') {
                inPort = potentialInput.link.attributes.source.port
              } else if (potentialInput.sourcePortRef === 'multiplexerOutput' 
              || potentialInput.sourcePortRef === 'encoderOutput'
              || potentialInput.sourcePortRef === 'adderOutput' 
              || potentialInput.sourcePortRef === 'comparatorOutput'
              || potentialInput.sourcePortRef === 'subtractorOutput'
              || potentialInput.sourcePortRef === 'decoderOutput'
              || potentialInput.sourcePortRef == "registerOutput"
              || potentialInput.sourcePortRef === 'ramOutput') {
                inPort = connection.sourcePort.name;
              }else if (potentialInput.sourcePortRef == "moduleOutput") {
                inPort = potentialInput.sourcePort.name + "_to_" + potentialInput.destinationPort.id
              }
               else {
                inPort = potentialInput.sourcePort.attributes.name;
              }
            }
          })

          const helper = '0'.repeat(inWidth);
          let combs = this.combinations(outWidth);
        
          sourceCode += 'always @(';
          sourceCode += inPort + ')\n';
          sourceCode += '  case (' + inPort + ')\n';

          for (var i = 0; i <= inWidth - 1; i++) {
            const res = helper.substring(i + 1) + '1' + helper.substring(0, i);
            sourceCode += '    ' + inWidth + "'b" + res + ' : ' + outPort + ' = ' + outWidth + "'b" + combs[i] + ';\n';
          }
          sourceCode += '  endcase\n';
        }
      });
      sourceCode += '\n';
    });

    registers.forEach(register => {
      var registerName, rstInput, enInput, regInput, clkInput;
      var registerClkFromModule = false
      var registerEnableFromModule = false
      var registerResetFromModule = false
      var registerInFromModule = false
      this.allConnections.forEach(connection => {
        if (connection.sourcePortRef === 'registerOutput' && register.id == connection.link.attributes.source.id) {
          registerName = connection.sourcePort.name;

            for (const regIn of this.allConnections) {
              if (regIn.destinationPortRef === 'registerInput' && register.id === regIn.link.attributes.target.id) {
                if (regIn.sourcePortRef === 'standaloneInput') {
                  regInput = regIn.sourcePort;
                }
                else if(regIn.sourcePortRef == "moduleOutput"){
                  registerInFromModule = true
                }
                else if (this.getIfItsAGate(regIn.sourcePortRef)) {
                  regInput = regIn.sourcePort.attributes.name
                }
                else if (regIn.sourcePortRef === 'decoderOutput' 
                || regIn.sourcePortRef === 'adderOutput'
                || regIn.sourcePortRef === 'comparatorOutput'
                || regIn.sourcePortRef === 'subtractorOutput' 
                || regIn.sourcePortRef === 'encoderOutput'
                || regIn.sourcePortRef === 'multiplexerOutput'
                || regIn.sourcePortRef === 'registerOutput'
                || regIn.sourcePortRef === 'ramOutput'){
                  regInput = regIn.sourcePort.name
                }
                 

              }
            }

            for (const clkIn of this.allConnections) {
              if (clkIn.destinationPortRef === 'registerClk' && register.id === clkIn.link.attributes.target.id) {
                if (clkIn.sourcePortRef === 'standaloneInput') {
                  clkInput = clkIn.sourcePort;
                }
                else if(clkIn.sourcePortRef == "moduleOutput"){
                  registerClkFromModule = true
                }
                else if (this.getIfItsAGate(clkIn.sourcePortRef)) {
                  clkInput = clkIn.sourcePort.attributes.name
                }
                else if (clkIn.sourcePortRef === 'decoderOutput' 
                || clkIn.sourcePortRef === 'adderOutput'
                || clkIn.sourcePortRef === 'comparatorOutput'
                || clkIn.sourcePortRef === 'subtractorOutput' 
                || clkIn.sourcePortRef === 'encoderOutput'
                || clkIn.sourcePortRef === 'multiplexerOutput'
                || clkIn.sourcePortRef === 'registerOutput'
                || clkIn.sourcePortRef === 'ramOutput' ){
                  clkInput = clkIn.sourcePort.name
                }
              }
            }
            for (const enIn of this.allConnections) {
              if (enIn.destinationPortRef === 'registerEnable' && register.id === enIn.link.attributes.target.id) {
                if (enIn.sourcePortRef === 'standaloneInput') {
                  enInput = enIn.sourcePort;
                }
                else if(enIn.sourcePortRef == "moduleOutput"){
                  registerEnableFromModule = true
                }
                else if (this.getIfItsAGate(enIn.sourcePortRef)) {
                  enInput = enIn.sourcePort.attributes.name
                }
                else if (enIn.sourcePortRef === 'decoderOutput' 
                || enIn.sourcePortRef === 'adderOutput'
                || enIn.sourcePortRef === 'comparatorOutput'
                || enIn.sourcePortRef === 'subtractorOutput' 
                || enIn.sourcePortRef === 'encoderOutput'
                || enIn.sourcePortRef === 'multiplexerOutput'
                || enIn.sourcePortRef === 'registerOutput'
                || enIn.sourcePortRef === 'ramOutput'){
                  enInput = enIn.sourcePort.name
                }
              }
            }
            for (const clrIn of this.allConnections) {
              if (clrIn.destinationPortRef === 'registerClr' && register.id === clrIn.link.attributes.target.id) {
                if (clrIn.sourcePortRef === 'standaloneInput') {
                  rstInput = clrIn.sourcePort;
                }
                else if(clrIn.sourcePortRef == "moduleOutput"){
                  registerResetFromModule = true
                }
                else if (this.getIfItsAGate(clrIn.sourcePortRef)) {
                  rstInput = clrIn.sourcePort.attributes.name
                }
                else if (clrIn.sourcePortRef === 'decoderOutput' 
                || clrIn.sourcePortRef === 'adderOutput'
                || clrIn.sourcePortRef === 'comparatorOutput'
                || clrIn.sourcePortRef === 'subtractorOutput' 
                || clrIn.sourcePortRef === 'encoderOutput'
                || clrIn.sourcePortRef === 'multiplexerOutput'
                || clrIn.sourcePortRef === 'registerOutput'
                || clrIn.sourcePortRef === 'ramOutput'){
                  rstInput = clrIn.sourcePort.name
                }
              }
            }

            let enable = null;
            let clr = null;

            if (enInput){ 
              if(registerEnableFromModule){
                enable = enInput.id + "_to_" + registerName + "_en"
              }
              else{ 
                enable = enInput.attributes.ports ? enInput.attributes.ports.items[0].name : enInput.attributes.name || enInput;
              }
            }
            if (rstInput){  
              if(registerResetFromModule){
                clr = rstInput.id + "_to_" + registerName + "_rst"
              }
              else{
                clr = rstInput //.attributes.ports ? rstInput.attributes.ports.items[0].name : rstInput.attributes.name;
              }
            }

            let clk
            if(registerClkFromModule){
              clk = clkInput.id + "_to_" + registerName + "_clk"
            }
            else{
              clk = clkInput.attributes.ports ? clkInput.attributes.ports.items[0].name : clkInput.attributes.name || clkInput;
            }

            let regIn
            if(registerInFromModule){
              regIn = regInput.id + "_to_" + registerName + "_in"
            }
            else{
              regIn = regInput.attributes.ports ? regInput.attributes.ports.items[0].name : regInput.attributes.name || regInput;
            }
            

            sourceCode += 'always @(posedge ';
            sourceCode += clk;

            if(clr) {
              sourceCode += ' or ' + 'posedge ' + clr;
            }

            sourceCode += ')\n';

            sourceCode += 'begin\n';

            if (clr) {
              sourceCode += '\tif (' + clr + ') \n'; 
              sourceCode += "\t\t" + registerName + " = "
              if(register.attributes.bandwidth != null){
                sourceCode += register.attributes.bandwidth +"'b0;\n";
              }else{
                sourceCode += "1'b0;\n";
              } 
              if(enable){
                sourceCode += '\telse ';
              }
               
            }

            if (enable) {
              if(clr){
                sourceCode += 'if (' + enable + ')\n\t';
              }
              else{
                sourceCode += '\tif (' + enable + ')\n\t';
              }
               
            }

            sourceCode += "\t" + registerName + ' = ' + regIn + ';\n';

            sourceCode += 'end\n';        
        }
      });
    });

    rams.forEach(ram => {
      if(ramsCodeGenerated == 0){
        var parameterSectionStart =  sourceCode.indexOf(moduleNamePlaceholder) + moduleNamePlaceholder.length
        var tempSourceCode1 =  sourceCode.substring(0,parameterSectionStart)
        var tempSourceCode2 = sourceCode.substring(parameterSectionStart)
        ramsCodeGenerated++
        var parameterSection = " #(\n"
        if(ram.attributes.usingDataStruct == false){
          parameterSection += "    parameter DATA_WIDTH_" + ramsCodeGenerated + " = " + ram.attributes.dataBandwidth + ",\n"
        }
        parameterSection += "    parameter ADDR_WIDTH_" + ramsCodeGenerated + " = " + ram.attributes.addressBandwidth + ",\n"
        parameterSection += "    parameter RAM_DEPTH_" + ramsCodeGenerated + " =  1 << ADDR_WIDTH_" + ramsCodeGenerated + "\n"
        parameterSection += ")"
        sourceCode = tempSourceCode1 + parameterSection + tempSourceCode2 
      }
      else{
        var parameterSectionEnd = sourceCode.indexOf("\n) (")
        var tempSourceCode1 = sourceCode.substring(0,parameterSectionEnd)
        var tempSourceCode2 = sourceCode.substring(parameterSectionEnd)
      
        ramsCodeGenerated++
        var parameterSection =""
        if(ram.attributes.usingDataStruct == false){
          parameterSection = "    parameter DATA_WIDTH_" + ramsCodeGenerated + " = " + ram.attributes.dataBandwidth + ",\n"
        }
        parameterSection += "    parameter ADDR_WIDTH_" + ramsCodeGenerated + " = " + ram.attributes.addressBandwidth + ",\n"
        parameterSection += "    parameter RAM_DEPTH_" + ramsCodeGenerated + " = 1 << ADDR_WIDTH_" + ramsCodeGenerated + "\n"
      
        sourceCode = tempSourceCode1 + ",\n" + parameterSection + tempSourceCode2.substring(1)
      }
      /*sourceCode += "module " + ram.attributes.name + " # (\n"
      if(ram.attributes.usingDataStruct == false){
        sourceCode += "    parameter DATA_WIDTH = " + ram.attributes.dataBandwidth + ",\n"
      }
      sourceCode += "    parameter ADDR_WIDTH = " + ram.attributes.addressBandwidth + ",\n"
      sourceCode += "    parameter RAM_DEPTH = 1 << ADDR WIDTH\n"
      sourceCode += ") (\n"*/
      
      var clkPortName
      var addrPortName
      var dataInPortName
      var wePortName
      var dataOutPortName
      var temp = sourceCode
      var startOfPortsDeclarations = sourceCode.indexOf(") (\n")
      var endOfPortsDeclarations = sourceCode.indexOf(");\n")
      var beforePorts = sourceCode.substring(0,startOfPortsDeclarations+4)  
      var afterPorts = sourceCode.substring(endOfPortsDeclarations)
      sourceCode = sourceCode.substring(startOfPortsDeclarations+4,endOfPortsDeclarations)
      this.allConnections.forEach(connection => {
        
        if(connection.link.attributes.target.id == ram.id && connection.link.attributes.target.port.endsWith("_clk")){
          if(connection.sourcePortRef == "moduleOutput"){
            clkPortName = connection.link.attributes.source.port + "_to_" + connection.link.attributes.target.port
          }
          else{
            clkPortName = connection.link.attributes.source.port
          }
          
        }
        if(connection.link.attributes.target.id == ram.id && connection.link.attributes.target.port.endsWith("_addr")){
          if(connection.sourcePortRef == "standaloneInput"){
            addrPortName = connection.link.attributes.source.port
            var addrPortNameDeclaration = sourceCode.indexOf(addrPortName+",")
            if(addrPortNameDeclaration == -1){
              addrPortNameDeclaration = sourceCode.indexOf(addrPortName +"\n")
            }
            var addrPortDeclarationStart = sourceCode.substring(0,addrPortNameDeclaration).lastIndexOf("\n")
            var addrPortDeclarationEnd = sourceCode.substring(addrPortNameDeclaration).indexOf("\n")
            var tempSourceCode = sourceCode
            sourceCode = tempSourceCode.substring(0,addrPortDeclarationStart)
                        + "\n  input logic [ADDR_WIDTH_" + ramsCodeGenerated + "-1:0] " + addrPortName + ","
                        + tempSourceCode.substring(addrPortDeclarationEnd + tempSourceCode.substring(0,addrPortNameDeclaration).length)
          }
          else if (connection.sourcePortRef == "moduleOutput"){
            addrPortName = connection.link.attributes.source.port + "_to_" + connection.link.attributes.target.port
          }
          else if (this.getIfItsAGate(connection.sourcePortRef)) {
            addrPortName = connection.sourcePort.attributes.name
          }
          else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput' 
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput'
          || connection.sourcePortRef === 'ramOutput') {
            addrPortName += connection.sourcePort.name
          }  
            
        }
        if(connection.link.attributes.target.id == ram.id && connection.link.attributes.target.port.endsWith("_in")){
          if(connection.sourcePortRef == "standaloneInput"){
            dataInPortName = connection.link.attributes.source.port
            if(ram.attributes.usingDataStruct == false){
              var dataInPortNameDeclaration = sourceCode.indexOf(dataInPortName+",")
              if(dataInPortNameDeclaration == -1){
                dataInPortNameDeclaration = sourceCode.indexOf(dataInPortName +"\n")
              }
              var dataInPortDeclarationStart = sourceCode.substring(0,dataInPortNameDeclaration).lastIndexOf("\n")
              var dataInPortDeclarationEnd = sourceCode.substring(dataInPortNameDeclaration).indexOf("\n")
              var tempSourceCode = sourceCode
              sourceCode = tempSourceCode.substring(0,dataInPortDeclarationStart)
                          + "\n  input logic [DATA_WIDTH_" + ramsCodeGenerated + "-1:0] " + dataInPortName + ","
                          + tempSourceCode.substring(dataInPortDeclarationEnd + tempSourceCode.substring(0,dataInPortNameDeclaration).length)
            }
          }
          else if (connection.sourcePortRef == "moduleOutput"){
            dataInPortName = connection.link.attributes.source.port + "_to_" + connection.link.attributes.target.port
          }
          else if (this.getIfItsAGate(connection.sourcePortRef)) {
            dataInPortName = connection.sourcePort.attributes.name
          }
          else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput' 
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput'
          || connection.sourcePortRef === 'ramOutput') {
            dataInPortName += connection.sourcePort.name
          }       
        }
        if(connection.link.attributes.target.id == ram.id && connection.link.attributes.target.port.endsWith("_we")){
          if(connection.sourcePortRef == "standaloneInput"){
            wePortName = connection.link.attributes.source.port
          }else if(connection.sourcePortRef == "moduleOutput"){
            wePortName = connection.link.attributes.source.port + "_to_" + connection.link.attributes.target.port
          }
          else if (this.getIfItsAGate(connection.sourcePortRef)) {
            wePortName = connection.sourcePort.attributes.name
          }
          else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput' 
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput'
          || connection.sourcePortRef === 'ramOutput') {
            wePortName += connection.sourcePort.name
          }           
        }
        if(connection.link.attributes.source.id == ram.id && connection.link.attributes.source.port.endsWith("_out1")){
          if(connection.destinationPortRef == "standaloneOutput"){
            dataOutPortName = connection.link.attributes.target.port
            if(ram.attributes.usingDataStruct == false){
              var tempSourceCode = sourceCode
              var dataOutPortNameDeclaration = tempSourceCode.indexOf(dataOutPortName+",")
              if(dataOutPortNameDeclaration == -1){
                dataOutPortNameDeclaration = tempSourceCode.indexOf(dataOutPortName +"\n")
              }
              var dataOutPortDeclarationStart = tempSourceCode.substring(0,dataOutPortNameDeclaration).lastIndexOf("\n")
              var dataOutPortDeclarationEnd = tempSourceCode.substring(dataOutPortNameDeclaration).indexOf("\n")
              var portsDeclarationEnd = tempSourceCode.substring(dataOutPortDeclarationEnd + tempSourceCode.substring(0,dataOutPortNameDeclaration).length) 
              if(portsDeclarationEnd.startsWith("\n)")){
                sourceCode = tempSourceCode.substring(0,dataOutPortDeclarationStart)
                           + "\n  output logic [DATA_WIDTH_" + ramsCodeGenerated + "-1:0] " + dataOutPortName 
                           + tempSourceCode.substring(dataOutPortDeclarationEnd + tempSourceCode.substring(0,dataOutPortNameDeclaration).length)
              }
              else{
                sourceCode = tempSourceCode.substring(0,dataOutPortDeclarationStart)
                           + "\n  output logic [DATA_WIDTH_" + ramsCodeGenerated + "-1:0] " + dataOutPortName + ","
                           + tempSourceCode.substring(dataOutPortDeclarationEnd + tempSourceCode.substring(0,dataOutPortNameDeclaration).length)    
              }
            }
          }else if(connection.destinationPortRef == "moduleInput"){
            dataOutPortName = connection.link.attributes.target.port
          }
          else if (this.getIfItsAGate(connection.destinationPortRef)) {
            dataOutPortName = connection.destinationPort.attributes.name
          }
          else if (connection.destinationPortRef === 'decoderInput' 
          || connection.destinationPortRef === 'adderInput'
          || connection.destinationPortRef === 'comparatorInput'
          || connection.destinationPortRef === 'subtractorInput' 
          || connection.destinationPortRef === 'encoderInput'
          || connection.destinationPortRef === 'multiplexerInput'
          || connection.destinationPortRef === 'registerInput'
          || connection.sourcePortRef === 'ramOutput') {
            dataOutPortName = connection.destinationPort.name
          }     
        }
        
      })
      temp = sourceCode
      if(temp[temp.length-2] == ','){
        temp = temp.substring(0, temp.length - 2) + temp.charAt(temp.length - 1);
      }
      sourceCode = beforePorts + temp + afterPorts

      /*sourceCode += "    input logic " + clkPortName + ",\n"
      sourceCode += "    input logic  [ADDR_WIDTH-1:0] " + addrPortName + ",\n"
        
      if(ram.attributes.usingDataStruct == false){
        sourceCode += "    input logic  [DATA_WIDTH-1:0] " + dataInPortName + ",\n"
      }

      sourceCode += "    input logic " + wePortName + ",\n"
      
      if(ram.attributes.usingDataStruct == false){
        sourceCode += "    output logic  [DATA_WIDTH-1:0] " + dataOutPortName + ",\n"
      }

      sourceCode += ");\n\n"
      
      if(ram.attributes.usingDataStruct == false){
      sourceCode += "    logic [DATA WIDTH-1:0] mem [0:" + ((2 ** ram.attributes.addressBandwidth)-1) + "];"  
      }*/

      sourceCode += "always_ff @(posedge " + clkPortName + ") begin\n"
      sourceCode += "    if (" + wePortName + ") begin\n"
      sourceCode += "        " + ram.attributes.name + "[" + addrPortName + "] <= " + dataInPortName +";\n"
      sourceCode += "    end\n"
      sourceCode += "end\n\n"
      sourceCode += "always_comb begin\n"
      sourceCode += "    " + dataOutPortName + " = " + ram.attributes.name + "[" + addrPortName + "];\n"
      sourceCode += "end\n\n"

    });

    adders.forEach(adder => {
      sourceCode += 'assign ' + adder.attributes.name + ' =';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'adderInput'
          && adder.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' +';
          }else if(connection.sourcePortRef === 'moduleOutput'){
            sourceCode += ' ' + connection.link.attributes.source.port + "_to_" + connection.destinationPort.id  + ' +';
          }else if (this.getIfItsAGate(connection.sourcePortRef)) {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' +';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput' 
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput'
          || connection.sourcePortRef === 'ramOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' +';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' +';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id +  + ' +';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' +';
            }
          }
        }
      });
      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ';\n';
    });

    comparators.forEach(comparator => {
      sourceCode += 'assign ' + comparator.attributes.name + ' = (';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'comparatorInput'
          && comparator.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'standaloneInput') {
            sourceCode += connection.link.attributes.source.port + ' ' + comparator.attributes.comparatorType + ' ';
          }else if(connection.sourcePortRef === 'moduleOutput'){
            sourceCode += ' ' + connection.link.attributes.source.port + "_to_" + connection.destinationPort.id  + ' ' + comparator.attributes.comparatorType + ' ';
          }else if (this.getIfItsAGate(connection.sourcePortRef)) {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' ' + comparator.attributes.comparatorType + ' ';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput' 
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput'
          || connection.sourcePortRef === 'ramOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' ' + comparator.attributes.comparatorType + ' ';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' ' + comparator.attributes.comparatorType + ' ';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' ' + comparator.attributes.comparatorType + ' ';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' ' + comparator.attributes.comparatorType + ' ';
            }
          }
        }
      });
      if(comparator.attributes.comparatorType.length == 2){
        sourceCode = sourceCode.substring(0, sourceCode.length - 4);
      }
      else{
        sourceCode = sourceCode.substring(0, sourceCode.length - 3);
      }
      
      sourceCode += ');\n';
    });

    subtractors.forEach(subtractor => {
      sourceCode += 'assign ' + subtractor.attributes.name + ' =';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'subtractorInput'
          && subtractor.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' -';
          }else if(connection.sourcePortRef === 'moduleOutput'){
            sourceCode += ' ' + connection.link.attributes.source.port + "_to_" + connection.destinationPort.id  + ' -';
          }else if (this.getIfItsAGate(connection.sourcePortRef)) {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' -';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput'
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput'
          || connection.sourcePortRef === 'ramOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' -';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' -';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' -';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' -';
            }
          }
        }
      });
      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ';\n';
    });

    multiplexers.forEach(multiplexer => {
      this.allConnections.forEach(connection => {
        if (connection.sourcePortRef === 'multiplexerOutput' && multiplexer.attributes.name == connection.sourcePort.name) {
          if(multiplexer.attributes.selBandwidth == 1){
            sourceCode += 'assign ' + connection.sourcePort.name + ' = ';
            const keyIndex = connection.sourcePort.keyIndex;
            this.allConnections.forEach(potentialSelInput => {
              if (potentialSelInput.destinationPortRef === 'multiplexerSel'
                && multiplexer.id === potentialSelInput.link.attributes.target.id) {
                  if (potentialSelInput.sourcePortRef === 'moduleOutput') {
                  sourceCode += potentialSelInput.sourcePort.id;
                } else if (potentialSelInput.sourcePortRef === 'standaloneInput') {
                  sourceCode += potentialSelInput.link.attributes.source.port;
                } else if (potentialSelInput.sourcePortRef === 'duplicator') {
                  const duplicatedSignal = this.getDuplicationSource(potentialSelInput);
                  if (typeof duplicatedSignal.link.attributes.source.selector === 'string') {
                    sourceCode += duplicatedSignal.link.attributes.source.selector;
                  } else {
                    sourceCode += duplicatedSignal.link.attributes.source.selector.id;
                  }
                } else if (this.getIfItsAGate(potentialSelInput.sourcePortRef)) {
                  
                  if(potentialSelInput.sourceGateNumberOfInputPorts != null){
                    const firstGate: LogicalDynamicInputsGateToCode = {
                      parent: null,
                      logicalGateCid: potentialSelInput.sourcePort.cid,
                      operation: this.getGateString(potentialSelInput.sourcePortRef),
                      ports:[]
                    };
                    for(let i = 0; i< potentialSelInput.sourceGateNumberOfInputPorts;i++){
                      firstGate.ports.push(null)
                    }

                    //this.manageDynamicInputsGates(potentialSelInput, true, firstGate);
                    //this.printDynamicInputsGateObjects(firstGate);
                    sourceCode += potentialSelInput.sourcePort.attributes.name //this.gateString;
                    this.gateString = '';
                  }
                  /*else{
                    const firstGate: LogicalTwoInputGateToCode = {
                      parent: null,
                      logicalGateCid: potentialSelInput.sourcePort.cid,
                      leftArm: null,
                      operation: this.getGateString(potentialSelInput.sourcePortRef),
                      rightArm: null,
                    };
                    this.manageTwoInputsGates(potentialSelInput, true, firstGate);
                    this.printTwoInputsGateObjects(firstGate);
                    sourceCode += this.gateString;
                    this.gateString = '';
                  }*/
                }
                if (keyIndex !== null) {
                  sourceCode += '[' + keyIndex + ']';
                }
                sourceCode += ' ? ';
              }
            });
            this.allConnections.forEach(potentialInput => {
              if (potentialInput.destinationPortRef === 'multiplexerInput'
                && multiplexer.id === potentialInput.link.attributes.target.id) {
                if (potentialInput.sourcePortRef === 'moduleOutput') {
                  sourceCode += potentialInput.sourcePort.id;
                } else if (potentialInput.sourcePortRef === 'standaloneInput') {
                  sourceCode += potentialInput.link.attributes.source.port;
                } else if (potentialInput.sourcePortRef === 'duplicator') {
                  const duplicatedSignal = this.getDuplicationSource(potentialInput);
                  if (typeof duplicatedSignal.link.attributes.source.selector === 'string') {
                    sourceCode += duplicatedSignal.link.attributes.source.selector;
                  } else {
                    sourceCode += duplicatedSignal.link.attributes.source.selector.id;
                  }
                } else if (this.getIfItsAGate(potentialInput.sourcePortRef)) {
                  
                  if(potentialInput.sourceGateNumberOfInputPorts != null){
                    const firstGate: LogicalDynamicInputsGateToCode = {
                      parent: null,
                      logicalGateCid: potentialInput.sourcePort.cid,
                      operation: this.getGateString(potentialInput.sourcePortRef),
                      ports:[]
                    };
                    for(let i = 0; i< potentialInput.sourceGateNumberOfInputPorts;i++){
                      firstGate.ports.push(null)
                    }

                    //this.manageDynamicInputsGates(potentialInput, true, firstGate);
                    //this.printDynamicInputsGateObjects(firstGate);
                    sourceCode += potentialInput.sourcePort.attributes.name //this.gateString;
                    this.gateString = '';
                  }
                  /*else{
                    const firstGate: LogicalTwoInputGateToCode = {
                      parent: null,
                      logicalGateCid: potentialInput.sourcePort.cid,
                      leftArm: null,
                      operation: this.getGateString(potentialInput.sourcePortRef),
                      rightArm: null,
                    };
                    this.manageTwoInputsGates(potentialInput, true, firstGate);
                    this.printTwoInputsGateObjects(firstGate);
                    sourceCode += this.gateString;
                    this.gateString = '';
                  }*/
                  
                }else if (connection.sourcePortRef === 'decoderOutput' 
                  || connection.sourcePortRef === 'adderOutput'
                  || connection.sourcePortRef === 'comparatorOutput'
                  || connection.sourcePortRef === 'subtractorOutput' 
                  || connection.sourcePortRef === 'encoderOutput'
                  || connection.sourcePortRef === 'multiplexerOutput'
                  || connection.sourcePortRef === 'registerOutput'
                  || connection.sourcePortRef === 'ramOutput') {
                    sourceCode += connection.sourcePort.name
                  }    
                sourceCode += ' : ';
              }
            });
            sourceCode = sourceCode.substring(0, sourceCode.length - 2);
            sourceCode += ';\n';
          }
          else{
            sourceCode += "always_comb begin\n"
            sourceCode+= "\tcase("
            this.allConnections.forEach(potentialSelInput => {
              if (potentialSelInput.destinationPortRef === 'multiplexerSel'
                && multiplexer.id === potentialSelInput.link.attributes.target.id) {
                  if (potentialSelInput.sourcePortRef === 'moduleOutput') {
                    sourceCode += potentialSelInput.sourcePort.id;
                  } else if (potentialSelInput.sourcePortRef === 'standaloneInput') {
                    sourceCode += potentialSelInput.link.attributes.source.port;
                  } else if (potentialSelInput.sourcePortRef === 'duplicator') {
                    const duplicatedSignal = this.getDuplicationSource(potentialSelInput);
                    if (typeof duplicatedSignal.link.attributes.source.selector === 'string') {
                      sourceCode += duplicatedSignal.link.attributes.source.selector;
                    } else {
                      sourceCode += duplicatedSignal.link.attributes.source.selector.id;
                    }
                  } else if (this.getIfItsAGate(potentialSelInput.sourcePortRef)) {
                    
                    if(potentialSelInput.sourceGateNumberOfInputPorts != null){
                      const firstGate: LogicalDynamicInputsGateToCode = {
                        parent: null,
                        logicalGateCid: potentialSelInput.sourcePort.cid,
                        operation: this.getGateString(potentialSelInput.sourcePortRef),
                        ports:[]
                      };
                      for(let i = 0; i< potentialSelInput.sourceGateNumberOfInputPorts;i++){
                        firstGate.ports.push(null)
                      }
    
                        //this.manageDynamicInputsGates(potentialSelInput, true, firstGate);
                        //this.printDynamicInputsGateObjects(firstGate);
                      sourceCode += potentialSelInput.sourcePort.attributes.name //this.gateString;
                      this.gateString = '';
                    }
                      /*else{
                        const firstGate: LogicalTwoInputGateToCode = {
                          parent: null,
                          logicalGateCid: potentialSelInput.sourcePort.cid,
                          leftArm: null,
                          operation: this.getGateString(potentialSelInput.sourcePortRef),
                          rightArm: null,
                        };
                        this.manageTwoInputsGates(potentialSelInput, true, firstGate);
                        this.printTwoInputsGateObjects(firstGate);
                        sourceCode += this.gateString;
                        this.gateString = '';
                      }*/
                  }
                  else if (connection.sourcePortRef === 'decoderOutput' 
                    || connection.sourcePortRef === 'adderOutput'
                    || connection.sourcePortRef === 'comparatorOutput'
                    || connection.sourcePortRef === 'subtractorOutput' 
                    || connection.sourcePortRef === 'encoderOutput'
                    || connection.sourcePortRef === 'multiplexerOutput'
                    || connection.sourcePortRef === 'registerOutput'
                    || connection.sourcePortRef === 'ramOutput') {
                      sourceCode += connection.sourcePort.name
                  }  
                    /*if (keyIndex !== null) {
                      sourceCode += '[' + keyIndex + ']';
                    }
                    sourceCode += ' ? ';*/
                } 
              })
            sourceCode+= ")\n"
            
            if(multiplexer.attributes.selBandwidth == 2){
              var counter = 0
              this.allConnections.forEach(potentialInput => {
                if (potentialInput.destinationPortRef === 'multiplexerInput'
                  && multiplexer.id === potentialInput.link.attributes.target.id) {
                  counter++
                  switch (counter) {
                    case 1:
                      sourceCode+= "\t\t2'b00: " + multiplexer.attributes.name + " = "
                      break;
                    case 2:
                      sourceCode+= "\t\t2'b01: " + multiplexer.attributes.name + " = "
                      break;
                    case 3:
                      sourceCode+= "\t\t2'b10: " + multiplexer.attributes.name + " = "
                      break;
                    default:
                      sourceCode+= "\t\t2'b11: " + multiplexer.attributes.name + " = "
                      break;    

                  }
                  
                  if (potentialInput.sourcePortRef === 'moduleOutput') {
                    sourceCode += potentialInput.sourcePort.id;
                  } else if (potentialInput.sourcePortRef === 'standaloneInput') {
                    sourceCode += potentialInput.link.attributes.source.port;
                  } else if (potentialInput.sourcePortRef === 'duplicator') {
                    const duplicatedSignal = this.getDuplicationSource(potentialInput);
                    if (typeof duplicatedSignal.link.attributes.source.selector === 'string') {
                      sourceCode += duplicatedSignal.link.attributes.source.selector;
                    } else {
                      sourceCode += duplicatedSignal.link.attributes.source.selector.id;
                    }
                  } else if (this.getIfItsAGate(potentialInput.sourcePortRef)) {
                    
                    if(potentialInput.sourceGateNumberOfInputPorts != null){
                      const firstGate: LogicalDynamicInputsGateToCode = {
                        parent: null,
                        logicalGateCid: potentialInput.sourcePort.cid,
                        operation: this.getGateString(potentialInput.sourcePortRef),
                        ports:[]
                      };
                      for(let i = 0; i< potentialInput.sourceGateNumberOfInputPorts;i++){
                        firstGate.ports.push(null)
                      }
  
                      //this.manageDynamicInputsGates(potentialInput, true, firstGate);
                      //this.printDynamicInputsGateObjects(firstGate);
                      sourceCode += potentialInput.sourcePort.attributes.name //this.gateString;
                      this.gateString = '';
                    }
                    /*else{
                      const firstGate: LogicalTwoInputGateToCode = {
                        parent: null,
                        logicalGateCid: potentialInput.sourcePort.cid,
                        leftArm: null,
                        operation: this.getGateString(potentialInput.sourcePortRef),
                        rightArm: null,
                      };
                      this.manageTwoInputsGates(potentialInput, true, firstGate);
                      this.printTwoInputsGateObjects(firstGate);
                      sourceCode += this.gateString;
                      this.gateString = '';
                    }*/
                    
                  }
                  else if (connection.sourcePortRef === 'decoderOutput' 
                    || connection.sourcePortRef === 'adderOutput'
                    || connection.sourcePortRef === 'comparatorOutput'
                    || connection.sourcePortRef === 'subtractorOutput' 
                    || connection.sourcePortRef === 'encoderOutput'
                    || connection.sourcePortRef === 'multiplexerOutput'
                    || connection.sourcePortRef === 'registerOutput'
                    || connection.sourcePortRef === 'ramOutput') {
                      sourceCode += connection.sourcePort.name
                  }  
                  sourceCode += ';\n';
                }
              });
              sourceCode += "\tendcase\n"
              sourceCode += "end\n"
            }

            if(multiplexer.attributes.selBandwidth == 3){
              var counter = 0
              this.allConnections.forEach(potentialInput => {
                if (potentialInput.destinationPortRef === 'multiplexerInput'
                  && multiplexer.id === potentialInput.link.attributes.target.id) {
                  counter++
                  
                  switch (counter) {
                    case 1:
                      sourceCode+= "\t\t3'b000: " + multiplexer.attributes.name + " = "
                      break;
                    case 2:
                      sourceCode+= "\t\t3'b001: " + multiplexer.attributes.name + " = "
                      break;
                    case 3:
                      sourceCode+= "\t\t3'b010: " + multiplexer.attributes.name + " = "
                      break;
                    case 4:
                      sourceCode+= "\t\t3'b100: " + multiplexer.attributes.name + " = "
                      break;
                    case 5:
                      sourceCode+= "\t\t3'b011: " + multiplexer.attributes.name + " = "
                      break;
                    case 6:
                      sourceCode+= "\t\t3'b101: " + multiplexer.attributes.name + " = "
                      break;
                    case 7:
                      sourceCode+= "\t\t3'b110: " + multiplexer.attributes.name + " = "
                      break;
                    default:
                      sourceCode+= "\t\t3'b111: " + multiplexer.attributes.name + " = "
                      break;    

                  }

                  
                  if (potentialInput.sourcePortRef === 'moduleOutput') {
                    sourceCode += potentialInput.sourcePort.id;
                  } else if (potentialInput.sourcePortRef === 'standaloneInput') {
                    sourceCode += potentialInput.link.attributes.source.port;
                  } else if (potentialInput.sourcePortRef === 'duplicator') {
                    const duplicatedSignal = this.getDuplicationSource(potentialInput);
                    if (typeof duplicatedSignal.link.attributes.source.selector === 'string') {
                      sourceCode += duplicatedSignal.link.attributes.source.selector;
                    } else {
                      sourceCode += duplicatedSignal.link.attributes.source.selector.id;
                    }
                  } else if (this.getIfItsAGate(potentialInput.sourcePortRef)) {
                    
                    if(potentialInput.sourceGateNumberOfInputPorts != null){
                      const firstGate: LogicalDynamicInputsGateToCode = {
                        parent: null,
                        logicalGateCid: potentialInput.sourcePort.cid,
                        operation: this.getGateString(potentialInput.sourcePortRef),
                        ports:[]
                      };
                      for(let i = 0; i< potentialInput.sourceGateNumberOfInputPorts;i++){
                        firstGate.ports.push(null)
                      }
  
                      //this.manageDynamicInputsGates(potentialInput, true, firstGate);
                      //this.printDynamicInputsGateObjects(firstGate);
                      sourceCode += potentialInput.sourcePort.attributes.name //this.gateString;
                      this.gateString = '';
                    }
                    /*else{
                      const firstGate: LogicalTwoInputGateToCode = {
                        parent: null,
                        logicalGateCid: potentialInput.sourcePort.cid,
                        leftArm: null,
                        operation: this.getGateString(potentialInput.sourcePortRef),
                        rightArm: null,
                      };
                      this.manageTwoInputsGates(potentialInput, true, firstGate);
                      this.printTwoInputsGateObjects(firstGate);
                      sourceCode += this.gateString;
                      this.gateString = '';
                    }*/
                    
                  } else if (connection.sourcePortRef === 'decoderOutput' 
                    || connection.sourcePortRef === 'adderOutput'
                    || connection.sourcePortRef === 'comparatorOutput'
                    || connection.sourcePortRef === 'subtractorOutput' 
                    || connection.sourcePortRef === 'encoderOutput'
                    || connection.sourcePortRef === 'multiplexerOutput'
                    || connection.sourcePortRef === 'registerOutput'
                    || connection.sourcePortRef === 'ramOutput') {
                      sourceCode += connection.sourcePort.name
                  }  
                  sourceCode += ';\n';
                }
              });
              sourceCode += "\tendcase\n"
              sourceCode += "end\n"
            }
            
          }  
        }
      });
    });
    const standAloneOffset = this.calculateSpacingStandalone(standalonePorts, dataInJSON.links);

    /*ands.forEach(and => {
      sourceCode += 'assign ' + and.attributes.name + ' =';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'andGate'
          && and.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'moduleOutput' || connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' &';
          } else if (this.getIfItsAGate(connection.sourcePortRef) || connection.sourcePortRef === 'multiplexerOutput') {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' &';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput' 
          || connection.sourcePortRef === 'encoderOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' &';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' &';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' &';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' &';
            }
          }
        }
      });
      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ';\n';
    });

    ors.forEach(or => {
      sourceCode += 'assign ' + or.attributes.name + ' =';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'orGate'
          && or.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'moduleOutput' || connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' |';
          } else if (this.getIfItsAGate(connection.sourcePortRef) || connection.sourcePortRef === 'multiplexerOutput') {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' |';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput' 
          || connection.sourcePortRef === 'encoderOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' |';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' |';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' |';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' |';
            }
          }
        }
      });
      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ';\n';
    });

    nors.forEach(nor => {
      sourceCode += 'assign ' + nor.attributes.name + ' = ~(';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'norGate'
          && nor.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'moduleOutput' || connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' |';
          } else if (this.getIfItsAGate(connection.sourcePortRef) || connection.sourcePortRef === 'multiplexerOutput') {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' |';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'encoderOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' |';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' |';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' |';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' |';
            }
          }
        }
      });
      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ');\n';
    });

    nands.forEach(nand => {
      sourceCode += 'assign ' + nand.attributes.name + ' = ~(';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'nandGate'
          && nand.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'moduleOutput' || connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' &';
          } else if (this.getIfItsAGate(connection.sourcePortRef) || connection.sourcePortRef === 'multiplexerOutput') {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' &';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'encoderOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' &';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' &';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' &';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' &';
            }
          }
        }
      });
      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ');\n';
    });

    xors.forEach(xor => {
      sourceCode += 'assign ' + xor.attributes.name + ' =';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'xorGate'
          && xor.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'moduleOutput' || connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' ^';
          } else if (this.getIfItsAGate(connection.sourcePortRef) || connection.sourcePortRef === 'multiplexerOutput') {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' ^';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'encoderOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' ^';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' ^';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' ^';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' ^';
            }
          }
        }
      });
      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ';\n';
    });

    xnors.forEach(xnor => {
      sourceCode += 'assign ' + xnor.attributes.name + ' = ~(';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'xnorGate'
          && xnor.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'moduleOutput' || connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' ^';
          } else if (this.getIfItsAGate(connection.sourcePortRef) || connection.sourcePortRef === 'multiplexerOutput') {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' ^';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'encoderOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' ^';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' ^';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' ^';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' ^';
            }
          }
        }
      });
      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ');\n';
    });*/

    ands.forEach(and => {
      sourceCode += 'assign ' + and.attributes.name + ' =';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'andGate'
          && and.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' &';
          }else if(connection.sourcePortRef === 'moduleOutput'){
            sourceCode += connection.sourcePort.id;
            sourceCode += '_to_';
            sourceCode += connection.destinationPort.id + ' &';
          }else if (this.getIfItsAGate(connection.sourcePortRef)) {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' &';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput' 
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput'
          || connection.sourcePortRef === 'ramOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' &';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' &';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' &';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' &';
            }
          }
        }
      });

      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ';\n';
      /*const whiteSpaceBeforeFirstPort = sourceCode.lastIndexOf("(");
      let temp = sourceCode
      sourceCode = temp.substring(0,whiteSpaceBeforeFirstPort+1)
      sourceCode += temp.substring(whiteSpaceBeforeFirstPort+2,temp.length)*/
    });
    ors.forEach(or => {
      sourceCode += 'assign ' + or.attributes.name + ' =';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'orGate'
          && or.id === connection.link.attributes.target.id) {
            
          if (connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' |';
          }else if(connection.sourcePortRef === 'moduleOutput'){
            sourceCode += connection.sourcePort.id;
            sourceCode += '_to_';
            sourceCode += connection.destinationPort.id + ' |';
          }
           else if (this.getIfItsAGate(connection.sourcePortRef)) {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' |';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput' 
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput'
          || connection.sourcePortRef === 'ramOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' |';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' |';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' |';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' |';
            }
          }
        }
      });

      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ';\n';
      /*const whiteSpaceBeforeFirstPort = sourceCode.lastIndexOf("(");
      let temp = sourceCode
      sourceCode = temp.substring(0,whiteSpaceBeforeFirstPort+1)
      sourceCode += temp.substring(whiteSpaceBeforeFirstPort+2,temp.length)*/
    });

    nors.forEach(nor => {
      sourceCode += 'assign ' + nor.attributes.name + ' = ~(';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'norGate'
          && nor.id === connection.link.attributes.target.id) {
          if ( connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' |';
          }else if(connection.sourcePortRef === 'moduleOutput'){
            sourceCode += connection.sourcePort.id;
            sourceCode += '_to_';
            sourceCode += connection.destinationPort.id + ' |';
          }else if (this.getIfItsAGate(connection.sourcePortRef)) {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' |';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput'
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput'
          || connection.sourcePortRef === 'ramOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' |';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' |';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' |';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' |';
            }
          }
        }
      });

      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ');\n';
      const whiteSpaceBeforeFirstPort = sourceCode.lastIndexOf("(");
      let temp = sourceCode
      sourceCode = temp.substring(0,whiteSpaceBeforeFirstPort+1)
      sourceCode += temp.substring(whiteSpaceBeforeFirstPort+2,temp.length)
    });

    nands.forEach(nand => {
      sourceCode += 'assign ' + nand.attributes.name + ' = ~(';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'nandGate'
          && nand.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' &';
          }else if(connection.sourcePortRef === 'moduleOutput'){
            sourceCode += connection.sourcePort.id;
            sourceCode += '_to_';
            sourceCode += connection.destinationPort.id + ' &';
          }else if (this.getIfItsAGate(connection.sourcePortRef)) {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' &';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput'
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput'
          || connection.sourcePortRef === 'ramOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' &';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' &';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' &';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' &';
            }
          }
        }
      });

      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ');\n';
      const whiteSpaceBeforeFirstPort = sourceCode.lastIndexOf("(");
      let temp = sourceCode
      sourceCode = temp.substring(0,whiteSpaceBeforeFirstPort+1)
      sourceCode += temp.substring(whiteSpaceBeforeFirstPort+2,temp.length)
    });

    xors.forEach(xor => {
      sourceCode += 'assign ' + xor.attributes.name + ' =';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'xorGate'
          && xor.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' ^';
          }else if(connection.sourcePortRef === 'moduleOutput'){
            sourceCode += connection.sourcePort.id;
            sourceCode += '_to_';
            sourceCode += connection.destinationPort.id + ' ^';
          } else if (this.getIfItsAGate(connection.sourcePortRef)) {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' ^';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput'
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput'
          || connection.sourcePortRef === 'ramOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' ^';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' ^';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' ^';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' ^';
            }
          }
        }
      });

      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ';\n';
      /*const whiteSpaceBeforeFirstPort = sourceCode.lastIndexOf("(");
      let temp = sourceCode
      sourceCode = temp.substring(0,whiteSpaceBeforeFirstPort+1)
      sourceCode += temp.substring(whiteSpaceBeforeFirstPort+2,temp.length)*/
    });

    xnors.forEach(xnor => {
      sourceCode += 'assign ' + xnor.attributes.name + ' = ~(';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'xnorGate'
          && xnor.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'standaloneInput') {
            sourceCode += ' ' + connection.link.attributes.source.port + ' ^';
          }else if(connection.sourcePortRef === 'moduleOutput'){
            sourceCode += connection.sourcePort.id;
            sourceCode += '_to_';
            sourceCode += connection.destinationPort.id + ' ^';
          } else if (this.getIfItsAGate(connection.sourcePortRef)) {
            sourceCode += ' ' + connection.sourcePort.attributes.name + ' ^';
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput'
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput'
          || connection.sourcePortRef === 'ramOutput') {
            sourceCode += ' ' + connection.sourcePort.name + ' ^';
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector + ' ^';
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id + ' ^';
            } else {
              sourceCode += duplicatedSignal.sourcePort.name + ' ^';
            }
          }
        }
      });
      sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ');\n';
      const whiteSpaceBeforeFirstPort = sourceCode.lastIndexOf("(");
      let temp = sourceCode
      sourceCode = temp.substring(0,whiteSpaceBeforeFirstPort+1)
      sourceCode += temp.substring(whiteSpaceBeforeFirstPort+2,temp.length)
    });

    nots.forEach(not => {
      sourceCode += 'assign ' + not.attributes.name + ' = ~';
      this.allConnections.forEach(connection => {
        if (connection.destinationPortRef === 'notGate'
          && not.id === connection.link.attributes.target.id) {
          if (connection.sourcePortRef === 'standaloneInput') {
            sourceCode += connection.link.attributes.source.port;
          }else if(connection.sourcePortRef === 'moduleOutput'){
            sourceCode += connection.sourcePort.id;
            sourceCode += '_to_';
            sourceCode += connection.destinationPort.id;
          } else if (this.getIfItsAGate(connection.sourcePortRef)) {
            sourceCode += connection.sourcePort.attributes.name;
          } else if (connection.sourcePortRef === 'decoderOutput' 
          || connection.sourcePortRef === 'adderOutput'
          || connection.sourcePortRef === 'comparatorOutput'
          || connection.sourcePortRef === 'subtractorOutput'
          || connection.sourcePortRef === 'encoderOutput'
          || connection.sourcePortRef === 'multiplexerOutput'
          || connection.sourcePortRef === 'registerOutput') {
            sourceCode += connection.sourcePort.name;
          } else if (connection.sourcePortRef === 'duplicator') {
            const duplicatedSignal = this.getDuplicationSource(connection);
            if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
              sourceCode += duplicatedSignal.link.attributes.source.selector;
            } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
              sourceCode += duplicatedSignal.sourcePort.id;
            } else {
              sourceCode += duplicatedSignal.sourcePort.name;
            }
          }
          else if(connection.sourcePortRef == "ramOutput"){
            sourceCode += connection.sourcePort.name
          }
        }
      });
      //sourceCode = sourceCode.substring(0, sourceCode.length - 2);
      sourceCode += ';\n';
      /*const whiteSpaceBeforeFirstPort = sourceCode.lastIndexOf("(");
      let temp = sourceCode
      sourceCode = temp.substring(0,whiteSpaceBeforeFirstPort+1)
      sourceCode += temp.substring(whiteSpaceBeforeFirstPort+2,temp.length)*/
    });

    // Print ASSIGNS with STANDALONE PORTS for OUTGOING parent ports
    standalonePorts.forEach(port => {
      this.allConnections.forEach(connection => {
        if (port.attributes.ports.items[0].id === connection.link.attributes.target.port) {
          if (port.attributes.ports.items[0].group === 'in') {
            if (connection.sourcePortRef === 'moduleOutput' || connection.sourcePortRef === 'standaloneInput') {
              sourceCode += 'assign ' + connection.link.attributes.target.port;
              for (let i = 0; i < (standAloneOffset + 2) - port.attributes.ports.items[0].name.length; i++) { sourceCode += ' '; }
              sourceCode += '= ' + connection.link.attributes.source.port + '_to_' + connection.link.attributes.target.port + ';\n';
            } else if (connection.sourcePortRef === 'duplicator') {
              const duplicatedSignal = this.getDuplicationSource(connection);
              sourceCode += 'assign ' + connection.link.attributes.target.port + ' = ';
              for (let i = 0; i < (standAloneOffset + 2) - port.attributes.ports.items[0].name.length; i++) { sourceCode += ' '; }
              if (duplicatedSignal.sourcePortRef === 'standaloneInput') {
                sourceCode += duplicatedSignal.link.attributes.source.selector;
              } else if (duplicatedSignal.sourcePortRef === 'moduleOutput') {
                sourceCode += duplicatedSignal.sourcePort.id;
              } else {
                sourceCode += duplicatedSignal.sourcePort.name;
              }
              sourceCode += ';\n';
            } else if (this.getIfItsAGate(connection.sourcePortRef)) {
              
              if(connection.sourceGateNumberOfInputPorts != null){
                const firstGate: LogicalDynamicInputsGateToCode = {
                  parent: null,
                  logicalGateCid: connection.sourcePort.cid,
                  operation: this.getGateString(connection.sourcePortRef),
                  ports:[]
                };
                for(let i = 0; i< connection.sourceGateNumberOfInputPorts;i++){
                  firstGate.ports.push(null)
                }

                //this.manageDynamicInputsGates(connection, true, firstGate);
                //assign content of the gate not only its name
                //sourceCode += 'assign ' + connection.link.attributes.target.port;
                //this is legacy code it creates unwanted whitespaces
                //for (let i = 0; i < (standAloneOffset + 2) - port.attributes.ports.items[0].name.length; i++) { sourceCode += ' '; }
                //this.printDynamicInputsGateObjects(firstGate);
                //sourceCode += '= ' + this.gateString + ';\n';
                //this.gateString = '';
                //this assign gate name to the same output port
                sourceCode += 'assign ' + connection.link.attributes.target.port + ' = ';
                sourceCode += connection.sourcePort.attributes.name + ';\n';
              }

              /*else{
                const firstGate: LogicalTwoInputGateToCode = {
                  parent: null,
                  logicalGateCid: connection.sourcePort.cid,
                  leftArm: null,
                  operation: this.getGateString(connection.sourcePortRef),
                  rightArm: null,
                };
                this.manageTwoInputsGates(connection, true, firstGate);
                sourceCode += 'assign ' + connection.link.attributes.target.port;
                //this is legacy code it creates unwanted whitespaces
                //for (let i = 0; i < (standAloneOffset + 2) - port.attributes.ports.items[0].name.length; i++) { sourceCode += ' '; }
                this.printTwoInputsGateObjects(firstGate);
                sourceCode += '= ' + this.gateString + ';\n';
                this.gateString = '';
                sourceCode += 'assign ' + connection.link.attributes.target.port + ' = ';
                sourceCode += connection.sourcePort.attributes.name + ';\n';
                sourceCode += "KOMBAJN ;\n";
                sourceCode += connection.sourceGateNumberOfInputPorts;
              }*/

            } else if (connection.sourcePortRef === 'multiplexerOutput'
            || connection.sourcePortRef === 'decoderOutput' 
            || connection.sourcePortRef === 'adderOutput'
            || connection.sourcePortRef === 'comparatorOutput'
            || connection.sourcePortRef === 'subtractorOutput'
            || connection.sourcePortRef === 'encoderOutput'
            || connection.sourcePortRef === 'registerOutput') {
              sourceCode += 'assign ' + connection.link.attributes.target.port + ' = ';
              sourceCode += connection.sourcePort.name + ';\n';
              //sourceCode += connection.sourcePort.name + '_to_' + connection.link.attributes.target.port + ';\n';
            }
          }
        }
      });
    });
    

    sourceCode += '\n';
    sourceCode += 'endmodule: ' + moduleNamePlaceholder;
    this.allConnections = [];
    if(dataInJSON.imports.length!= 0){
      for(var importPackage of dataInJSON.imports){
        importPackage = importPackage.slice(0,-3)
        sourceCode = "import " + importPackage + "::*;\n" + sourceCode 
      }
    }
    return sourceCode;
  }

  private separateStandalonePorts(data) {
    const ports = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'standalonePort') { ports.push(element); }
    }
    return (ports);
  }

  private separateModules(data) {
    const modules = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'module') { modules.push(element); }
    }
    return (modules);
  }

  private separateMultiplexers(data) {
    const multiplexers = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'multiplexor') { multiplexers.push(element); }
    }
    return (multiplexers);
  }

  private separateDecoders(data) {
    const decoders = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'decoder') { decoders.push(element); }
    }
    return (decoders);
  }

  private separateEncoders(data) {
    const encoders = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'encoder') { encoders.push(element); }
    }
    return (encoders);
  }

  private separateAdders(data) {
    const adders = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'adder') { adders.push(element); }
    }
    return (adders);
  }

  private separateSubtractors(data) {
    const subtractors = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'subtractor') { subtractors.push(element); }
    }
    return (subtractors);
  }
  
  private separateComparators(data) {
    const comparators = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'comparator') { comparators.push(element); }
    }
    return (comparators);
  }

  private separateRegisters(data) {
    const registers = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'register') { registers.push(element); }
    }
    return (registers);
  }

  private separateRams(data) {
    const rams = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'ram') { rams.push(element); }
    }
    return (rams);
  }


  private calculateSpacing(module) {
    let maxLength = 0;
    module.attributes.ports.items.forEach(port => {
      if (port.name.length + 2 >= maxLength) { maxLength = port.name.length + 2; }
    });
    return maxLength;
  }

  private calculateSpacingStandalone(standalonePorts, links) {
    let maxlength = 0;
    standalonePorts.forEach(port => {
      let connectedLink;
      links.forEach(link => {
        if (port.attributes.ports.items[0].id === link.attributes.target.port) {
          connectedLink = link;
        }
      });
      if (port.attributes.ports.items[0].group === 'in' && connectedLink) {
        if (port.attributes.ports.items[0].id.length > maxlength) { maxlength = port.attributes.ports.items[0].id.length; }
      }
    });
    return maxlength;
  }

  private separateDuplicators(data) {
    const duplicators = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'duplicator') { duplicators.push(element); }
    }
    return (duplicators);
  }

  private separateORGates(data) {
    const orGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'Or') { orGates.push(element); }
    }
    return (orGates);
  }

  private separateAndGates(data) {
    const andGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'And') { andGates.push(element); }
    }
    return (andGates);
  }

  private separateNORGates(data) {
    const norGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'Nor') { norGates.push(element); }
    }
    return (norGates);
  }

  private separateNANDGates(data) {
    const nandGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'Nand') { nandGates.push(element); }
    }
    return (nandGates);
  }

  private separateXORGates(data) {
    const xorGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'Xor') { xorGates.push(element); }
    }
    return (xorGates);
  }

  private separateXNORGates(data) {
    const xnorGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'Xnor') { xnorGates.push(element); }
    }
    return (xnorGates);
  }

  // separation for new custom logic gates

  private separateCustomORGates(data) {
    const CustomOrGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'CustomOr') { CustomOrGates.push(element); }
    }
    return (CustomOrGates);
  }

  private separateCustomAndGates(data) {
    const CustomAndGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'CustomAnd') { CustomAndGates.push(element); }
    }
    return (CustomAndGates);
  }

  private separateCustomNORGates(data) {
    const CustomNorGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'CustomNor') { CustomNorGates.push(element); }
    }
    return (CustomNorGates);
  }

  private separateCustomNANDGates(data) {
    const CustomNandGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'CustomNand') { CustomNandGates.push(element); }
    }
    return (CustomNandGates);
  }

  private separateCustomXORGates(data) {
    const CustomXorGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'CustomXor') { CustomXorGates.push(element); }
    }
    return (CustomXorGates);
  }

  private separateCustomXNORGates(data) {
    const CustomXnorGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'CustomXnor') { CustomXnorGates.push(element); }
    }
    return (CustomXnorGates);
  }

  private separateCustomNOTGates(data) {
    const CustomNotGates = [];
    for (const element of data.elements) {
      if (element.attributes.elType === 'CustomNot') { CustomNotGates.push(element); }
    }
    return (CustomNotGates);
  }

  private getAllConnectionData(data, modules, standalonePorts, duplicators, ors, ands, nors, nands, xors, xnors, nots, multiplexers, decoders, registers, rams, encoders, adders,subtractors,comparators) {
    // going over all connections
    data.links.forEach(link => {

      let sourcePort;
      let sourcePortRef;
      let sourceGateNumberOfInputPorts = null;
      let destinationPort;
      let destinationPortRef;
      // checking and setting the source port
      // check if its INNER MODULE PORT
      modules.forEach(module => {
        if (module.getPort(link.attributes.source.port)) {
          sourcePort = module.getPort(link.attributes.source.port);
          sourcePortRef = 'moduleOutput';
        }
        if (module.getPort(link.attributes.source.selector)) {
          sourcePort = module.getPort(link.attributes.source.selector);
          sourcePortRef = 'moduleOutput';
        }
        if (link.attributes.source.selector
          && module.getPort(link.attributes.source.selector.id)) {
          sourcePort = module.getPort(link.attributes.source.selector.id);
          sourcePortRef = 'moduleOutput';
        }
        if (module.getPort(link.attributes.target.port)) {
          destinationPort = module.getPort(link.attributes.target.port);
          destinationPortRef = 'moduleInput';
        }
      });
      // check if its STANDALONE PORT
      standalonePorts.forEach(standalonePort => {
        if (standalonePort.id === link.attributes.source.id) {
          sourcePort = standalonePort;
          sourcePortRef = 'standaloneInput';
        }
        if ((standalonePort.id === link.attributes.target.id &&
          standalonePort.attributes.ports.items[0].id === link.attributes.target.port) ||
          (standalonePort.id === link.attributes.target.id &&
            standalonePort.attributes.ports.items[0].id === link.attributes.target.selector)) {
          destinationPort = standalonePort;
          destinationPortRef = 'standaloneOutput';
        }
      });
      // check if its SIGNAL DUPLICATOR
      // exclude GATES
      duplicators.forEach(duplicator => {
        if (link.attributes.source.port === undefined
          && duplicator.id === link.attributes.source.id) {
          sourcePort = duplicator;
          sourcePortRef = 'duplicator';
        }
        if (link.attributes.target.port === undefined
          && duplicator.id === link.attributes.target.id) {
          destinationPort = duplicator;
          destinationPortRef = 'duplicator';
        }
      });
      ors.forEach(orGate => {
        
        if(orGate.getPort(link.attributes.source.port)){
          sourcePort = orGate.getPort(link.attributes.source.port);
          sourcePortRef = "orGate";
          sourceGateNumberOfInputPorts = orGate.attributes.inPorts;  
        }

        if(orGate.getPort(link.attributes.target.port)){
          destinationPort = orGate.getPort(link.attributes.target.port);
          destinationPortRef = "orGate";  
        }
        
      });

      ands.forEach(andGate => {

        if(andGate.getPort(link.attributes.source.port)){
          sourcePort = andGate.getPort(link.attributes.source.port);
          sourcePortRef = "andGate";
          sourceGateNumberOfInputPorts = andGate.attributes.inPorts;  
        }

        if(andGate.getPort(link.attributes.target.port)){
          destinationPort = andGate.getPort(link.attributes.target.port);
          destinationPortRef = "andGate";  
        }
        
      });

      nands.forEach(nandGate => {

        if(nandGate.getPort(link.attributes.source.port)){
          sourcePort = nandGate.getPort(link.attributes.source.port);
          sourcePortRef = "nandGate";
          sourceGateNumberOfInputPorts = nandGate.attributes.inPorts;  
        }

        if(nandGate.getPort(link.attributes.target.port)){
          destinationPort = nandGate.getPort(link.attributes.target.port);
          destinationPortRef = "nandGate";  
        }
        
      });

      nors.forEach(norGate => {
        
        if(norGate.getPort(link.attributes.source.port)){
          sourcePort = norGate.getPort(link.attributes.source.port);
          sourcePortRef = "norGate";
          sourceGateNumberOfInputPorts = norGate.attributes.inPorts;  
        }

        if(norGate.getPort(link.attributes.target.port)){
          destinationPort = norGate.getPort(link.attributes.target.port);
          destinationPortRef = "norGate";  
        }
        
      });

      xors.forEach(xorGate => {
        
        if(xorGate.getPort(link.attributes.source.port)){
          sourcePort = xorGate.getPort(link.attributes.source.port);
          sourcePortRef = "xorGate";
          sourceGateNumberOfInputPorts = xorGate.attributes.inPorts;  
        }

        if(xorGate.getPort(link.attributes.target.port)){
          destinationPort = xorGate.getPort(link.attributes.target.port);
          destinationPortRef = "xorGate";  
        }
        
      });

      xnors.forEach(xnorGate => {
        
        if(xnorGate.getPort(link.attributes.source.port)){
          sourcePort = xnorGate.getPort(link.attributes.source.port);
          sourcePortRef = "xnorGate";
          sourceGateNumberOfInputPorts = xnorGate.attributes.inPorts;  
        }

        if(xnorGate.getPort(link.attributes.target.port)){
          destinationPort = xnorGate.getPort(link.attributes.target.port);
          destinationPortRef = "xnorGate";  
        }
        
      });

      nots.forEach(notGate => {
        
        if(notGate.getPort(link.attributes.source.port)){
          sourcePort = notGate.getPort(link.attributes.source.port);
          sourcePortRef = "notGate";
          sourceGateNumberOfInputPorts = notGate.attributes.inPorts;  
        }

        if(notGate.getPort(link.attributes.target.port)){
          destinationPort = notGate.getPort(link.attributes.target.port);
          destinationPortRef = "notGate";  
        }
        
      });

      /*ors.forEach(orGate => {
        // "> g:nth-child(1) > circle:nth-child(2/3)" is signature for Logical gate OR port
        if (link.attributes.source.selector === '> g:nth-child(1) > circle:nth-child(4)' &&
          link.attributes.source.id === orGate.id) {
          sourcePort = orGate;
          sourcePortRef = 'orGate';
        }
        if ((link.attributes.target.selector === '> g:nth-child(1) > circle:nth-child(2)' ||
          link.attributes.target.selector === '> g:nth-child(1) > circle:nth-child(3)') &&
          link.attributes.target.id === orGate.id) {
          destinationPort = orGate;
          destinationPortRef = 'orGate';
        }
      });
      ands.forEach(andGate => {
        if (link.attributes.source.selector === '> g:nth-child(1) > circle:nth-child(4)' &&
          link.attributes.source.id === andGate.id) {
          sourcePort = andGate;
          sourcePortRef = 'andGate';
        }
        if ((link.attributes.target.selector === '> g:nth-child(1) > circle:nth-child(2)' ||
          link.attributes.target.selector === '> g:nth-child(1) > circle:nth-child(3)') &&
          link.attributes.target.id === andGate.id) {
          destinationPort = andGate;
          destinationPortRef = 'andGate';
        }
      });
      nors.forEach(norGate => {
        if (link.attributes.source.selector === '> g:nth-child(1) > circle:nth-child(4)' &&
          link.attributes.source.id === norGate.id) {
          sourcePort = norGate;
          sourcePortRef = 'norGate';
        }
        if ((link.attributes.target.selector === '> g:nth-child(1) > circle:nth-child(2)' ||
          link.attributes.target.selector === '> g:nth-child(1) > circle:nth-child(3)') &&
          link.attributes.target.id === norGate.id) {
          destinationPort = norGate;
          destinationPortRef = 'norGate';
        }
      });
      nands.forEach(nandGate => {
        if (link.attributes.source.selector === '> g:nth-child(1) > circle:nth-child(4)' &&
          link.attributes.source.id === nandGate.id) {
          sourcePort = nandGate;
          sourcePortRef = 'nandGate';
        }
        if ((link.attributes.target.selector === '> g:nth-child(1) > circle:nth-child(2)' ||
          link.attributes.target.selector === '> g:nth-child(1) > circle:nth-child(3)') &&
          link.attributes.target.id === nandGate.id) {
          destinationPort = nandGate;
          destinationPortRef = 'nandGate';
        }
      });
      xors.forEach(xorGate => {
        if (link.attributes.source.selector === '> g:nth-child(1) > circle:nth-child(4)' &&
          link.attributes.source.id === xorGate.id) {
          sourcePort = xorGate;
          sourcePortRef = 'xorGate';
        }
        if ((link.attributes.target.selector === '> g:nth-child(1) > circle:nth-child(2)' ||
          link.attributes.target.selector === '> g:nth-child(1) > circle:nth-child(3)') &&
          link.attributes.target.id === xorGate.id) {
          destinationPort = xorGate;
          destinationPortRef = 'xorGate';
        }
      });
      xnors.forEach(xnorGate => {
        if (link.attributes.source.selector === '> g:nth-child(1) > circle:nth-child(4)' &&
          link.attributes.source.id === xnorGate.id) {
          sourcePort = xnorGate;
          sourcePortRef = 'xnorGate';
        }
        if ((link.attributes.target.selector === '> g:nth-child(1) > circle:nth-child(2)' ||
          link.attributes.target.selector === '> g:nth-child(1) > circle:nth-child(3)') &&
          link.attributes.target.id === xnorGate.id) {
          destinationPort = xnorGate;
          destinationPortRef = 'xnorGate';
        }
      });*/

      multiplexers.forEach(multiplexer => {
        if (multiplexer.getPort(link.attributes.source.port)) {
          sourcePort = multiplexer.getPort(link.attributes.source.port);
          sourcePortRef = 'multiplexerOutput';
        }
        if (multiplexer.getPort(link.attributes.source.selector)) {
          sourcePort = multiplexer.getPort(link.attributes.source.selector);
          sourcePortRef = 'multiplexerOutput';
        }
        if (multiplexer.getPort(link.attributes.target.port)) {
          destinationPort = multiplexer.getPort(link.attributes.target.port);
          if (destinationPort.group == 'in') {
            destinationPortRef = 'multiplexerInput';
          } else {
            destinationPortRef = 'multiplexerSel';
          }
        }
      });

      decoders.forEach(decoder => {
        if (decoder.getPort(link.attributes.source.port)) {
          sourcePort = decoder.getPort(link.attributes.source.port);
          sourcePortRef = 'decoderOutput';
        }
        if (decoder.getPort(link.attributes.source.selector)) {
          sourcePort = decoder.getPort(link.attributes.source.selector);
          sourcePortRef = 'decoderOutput';
        }
        if (decoder.getPort(link.attributes.target.port)) {
          destinationPort = decoder.getPort(link.attributes.target.port);
          if (destinationPort.group == 'in') {
            destinationPortRef = 'decoderInput';
          } else {
            destinationPortRef = 'decoderEnable';
          }
        }
      });

      encoders.forEach(encoder => {
        if (encoder.getPort(link.attributes.source.port)) {
          sourcePort = encoder.getPort(link.attributes.source.port);
          sourcePortRef = 'encoderOutput';
        }
        if (encoder.getPort(link.attributes.source.selector)) {
          sourcePort = encoder.getPort(link.attributes.source.selector);
          sourcePortRef = 'encoderOutput';
        }
        if (encoder.getPort(link.attributes.target.port)) {
          destinationPort = encoder.getPort(link.attributes.target.port);
          if (destinationPort.group == 'in') {
            destinationPortRef = 'encoderInput';
          }
        }
      });

      adders.forEach(adder => {
        if (adder.getPort(link.attributes.source.port)) {
          sourcePort = adder.getPort(link.attributes.source.port);
          sourcePortRef = 'adderOutput';
        }
        if (adder.getPort(link.attributes.source.selector)) {
          sourcePort = adder.getPort(link.attributes.source.selector);
          sourcePortRef = 'adderOutput';
        }
        if (adder.getPort(link.attributes.target.port)) {
          destinationPort = adder.getPort(link.attributes.target.port);
          if (destinationPort.group == 'in') {
            destinationPortRef = 'adderInput';
          }
        }
      });

      subtractors.forEach(subtractor => {
        if (subtractor.getPort(link.attributes.source.port)) {
          sourcePort = subtractor.getPort(link.attributes.source.port);
          sourcePortRef = 'subtractorOutput';
        }
        if (subtractor.getPort(link.attributes.source.selector)) {
          sourcePort = subtractor.getPort(link.attributes.source.selector);
          sourcePortRef = 'subtractorOutput';
        }
        if (subtractor.getPort(link.attributes.target.port)) {
          destinationPort = subtractor.getPort(link.attributes.target.port);
          if (destinationPort.group == 'in') {
            destinationPortRef = 'subtractorInput';
          }
        }
      });

      comparators.forEach(comparator => {
        if (comparator.getPort(link.attributes.source.port)) {
          sourcePort = comparator.getPort(link.attributes.source.port);
          sourcePortRef = 'comparatorOutput';
        }
        if (comparator.getPort(link.attributes.source.selector)) {
          sourcePort = comparator.getPort(link.attributes.source.selector);
          sourcePortRef = 'comparatorOutput';
        }
        if (comparator.getPort(link.attributes.target.port)) {
          destinationPort = comparator.getPort(link.attributes.target.port);
          if (destinationPort.group == 'in') {
            destinationPortRef = 'comparatorInput';
          }
        }
      });

      registers.forEach(register => {
        if (register.getPort(link.attributes.source.port)) {
          sourcePort = register.getPort(link.attributes.source.port);
          sourcePortRef = 'registerOutput';
        }
        if (register.getPort(link.attributes.source.selector)) {
          sourcePort = register.getPort(link.attributes.source.selector);
          sourcePortRef = 'registerOutput';
        }
        if (register.getPort(link.attributes.target.port)) {
          destinationPort = register.getPort(link.attributes.target.port);
          if (destinationPort.group == 'in') {
            destinationPortRef = 'registerInput';
          } else if (destinationPort.group == 'clk') {
            destinationPortRef = 'registerClk';
          } else if (destinationPort.group == 'enable') {
            destinationPortRef = 'registerEnable';
          } else {
            destinationPortRef = 'registerClr';
          }
        }
      });

      rams.forEach(ram => {
        if (ram.getPort(link.attributes.source.port)) {
          sourcePort = ram.getPort(link.attributes.source.port);
          sourcePortRef = 'ramOutput';
        }
        if (ram.getPort(link.attributes.source.selector)) {
          sourcePort = ram.getPort(link.attributes.source.selector);
          sourcePortRef = 'ramOutput';
        }
        if (ram.getPort(link.attributes.target.port)) {
          destinationPort = ram.getPort(link.attributes.target.port);
          if (destinationPort.group == 'in') {
            destinationPortRef = 'ramInput';
          } else if (destinationPort.group == 'clk') {
            destinationPortRef = 'ramClk';
          } else if (destinationPort.group == 'we') {
            destinationPortRef = 'ramWriteEnable';
          } else if (destinationPort.group == 'addr') { 
            destinationPortRef = 'ramAddress';
          }
        }
      });

      const newConnection: Connection = {
        link,
        sourcePort,
        destinationPort,
        sourceGateNumberOfInputPorts,
        sourcePortRef,
        destinationPortRef
      };
      this.allConnections.push(newConnection);
    });
  }

  private getDuplicationSource(originalConnection) {
    let tempConn = originalConnection;
    let roundLock = false;
    while (tempConn.sourcePortRef === 'duplicator') {
      roundLock = false;
      this.allConnections.forEach(connection => {
        if (connection.link.attributes.target.id === tempConn.link.attributes.source.id && !roundLock) {
          tempConn = connection;
          roundLock = true;
        }
      });
    }
    return tempConn;
  }

  public getIfItsAGate(elementReference: String) {
    if (elementReference === 'orGate') { return true; } 
    else if (elementReference === 'andGate') { return true; }
    else if (elementReference === 'norGate') { return true; } 
    else if (elementReference === 'nandGate') { return true; } 
    else if (elementReference === 'xorGate') { return true; } 
    else if (elementReference === 'xnorGate') { return true; }
    else if (elementReference === 'notGate') { return true; } 
    else { return false; }
  }

  /*public manageTwoInputsGates(originalConnection, rootcall, gateObject) {
    const tempConn = originalConnection;
    if (this.getIfItsAGate(tempConn.sourcePortRef) && !rootcall) {
      const newIdentifiedGate: LogicalTwoInputGateToCode = {
        parent: gateObject,
        logicalGateCid: tempConn.sourcePort.cid,
        leftArm: null,
        operation: this.getGateString(tempConn.sourcePortRef),
        rightArm: null
      };
      if (gateObject.leftArm === null) {
        gateObject.leftArm = newIdentifiedGate;
        this.manageTwoInputsGates(tempConn, true, newIdentifiedGate);
      } else if (gateObject.rightArm === null) {
        gateObject.rightArm = newIdentifiedGate;
        this.manageTwoInputsGates(tempConn, true, newIdentifiedGate);
      }
      return;
    }
    if (tempConn.sourcePortRef === 'moduleOutput' || tempConn.sourcePortRef === 'standaloneInput') {
      if (tempConn.sourcePortRef === 'moduleOutput') {
        if (gateObject.leftArm === null) { gateObject.leftArm = tempConn.sourcePort.id; } else if (gateObject.rightArm === null) { gateObject.rightArm = tempConn.sourcePort.id; }
      }
      if (tempConn.sourcePortRef === 'standaloneInput') {
        if (tempConn.link.attributes.source.port !== undefined) {
          if (gateObject.leftArm === null) { gateObject.leftArm = tempConn.link.attributes.source.port; } else if (gateObject.rightArm === null) { gateObject.rightArm = tempConn.link.attributes.source.port; }
        } else {
          if (gateObject.leftArm === null) { gateObject.leftArm = tempConn.link.attributes.source.selector; } else if (gateObject.rightArm === null) { gateObject.rightArm = tempConn.link.attributes.source.selector; }
        }
      }
      return;
    }
    this.allConnections.forEach(connection => {
      if (connection.link.attributes.target.id === tempConn.link.attributes.source.id) {
        this.manageTwoInputsGates(connection, false, gateObject);
      }
    });
  }*/

  public manageDynamicInputsGates(originalConnection, rootcall, gateObject) {
    const tempConn = originalConnection;
    if (this.getIfItsAGate(tempConn.sourcePortRef) && !rootcall) {
      if (!(tempConn.sourcePortRef === 'moduleOutput' || tempConn.sourcePortRef === 'standaloneInput')) {
        if(tempConn.sourceGateNumberOfInputPorts != null){
          //tu boli zmeny na vypis iba nazvu vnoeneho gate nie obsahu
          /*const newIdentifiedGate: LogicalDynamicInputsGateToCode = {
            parent: gateObject,
            logicalGateCid: tempConn.sourcePort.cid,
            operation: this.getGateString(tempConn.sourcePortRef),
            ports: []
          };
          for(let i = 0; i< tempConn.sourceGateNumberOfInputPorts; i++){
            newIdentifiedGate.ports.push(null)
          }*/

          for(let i = 0; i< gateObject.ports.length;i++){
            if(gateObject.ports[i] == null){
              gateObject.ports[i] = tempConn.sourcePort.attributes.name
              //this.manageDynamicInputsGates(tempConn,true,newIdentifiedGate);
              return
            }
          }
        }
        /*else{
          const newIdentifiedGate: LogicalTwoInputGateToCode = {
            parent: gateObject,
            logicalGateCid: tempConn.sourcePort.cid,
            leftArm: null,
            operation: this.getGateString(tempConn.sourcePortRef),
            rightArm: null,
          };
          if (gateObject.leftArm === null) {
            gateObject.leftArm = newIdentifiedGate;
            this.manageTwoInputsGates(tempConn, true, newIdentifiedGate);
          } else if (gateObject.rightArm === null) {
            gateObject.rightArm = newIdentifiedGate;
            this.manageTwoInputsGates(tempConn, true, newIdentifiedGate);
          }
          return;
        }*/
      }  
      
    }
    if (tempConn.sourcePortRef === 'moduleOutput' || tempConn.sourcePortRef === 'standaloneInput') {
      if (tempConn.sourcePortRef === 'moduleOutput') {
        for(let i = 0; i< gateObject.ports.length;i++){
          if(gateObject.ports[i] == null){
            gateObject.ports[i] = tempConn.sourcePort.id;
            break;
          } 
        }
      }
      if (tempConn.sourcePortRef === 'standaloneInput') {
        if (tempConn.link.attributes.source.port !== undefined) {
          for(let i = 0; i< gateObject.ports.length;i++){
            if(gateObject.ports[i] == null){
              gateObject.ports[i] = tempConn.link.attributes.source.port;
              break;
            } 
          }
        } else {
          for(let i = 0; i< gateObject.ports.length;i++){
            if(gateObject.ports[i] == null){
              gateObject.ports[i] = tempConn.link.attributes.source.selector;
              break;
            } 
          }
        }
      }
      return;
    }
    this.allConnections.forEach(connection => {
      if (connection.link.attributes.target.id === tempConn.link.attributes.source.id) {
        this.manageDynamicInputsGates(connection, false, gateObject);
      }
    });
  }

  /*public printTwoInputsGateObjects(tempObject) {
    if(tempObject.operation === "~"){

      return
    }
    if ((typeof tempObject.leftArm === 'string' || tempObject.leftArm instanceof String)
      && (typeof tempObject.rightArm === 'string' || tempObject.rightArm instanceof String)) {
      if(tempObject.operation === '~|' || tempObject.operation === '~&' || tempObject.operation === '~^') {
        this.gateString += '~(' + tempObject.leftArm + ' ' + tempObject.operation.slice(1, 2) + ' ' + tempObject.rightArm + ')';
      } else {
        this.gateString += '(' + tempObject.leftArm + ' ' + tempObject.operation + ' ' + tempObject.rightArm + ')';
      }
      return;
    }
    if (tempObject.parent === null) {
      if(tempObject.operation === '~|' || tempObject.operation === '~&' || tempObject.operation === '~^') {
        this.gateString += '~(';
      }
      if ((typeof tempObject.leftArm === 'string' || tempObject.leftArm instanceof String)) {
         this.gateString += /*"("+tempObject.leftArm;
      } else {
        // this.gateString += "("  UNCOMMENT FOR WRAPPING WHOLE EXPRESSION TO BRACKETS. DONT FORGET THE SECOND BRACKET
        this.printTwoInputsGateObjects(tempObject.leftArm);
      }

      if(tempObject.operation === '~|' || tempObject.operation === '~&' || tempObject.operation === '~^') {
        this.gateString += ' ' + tempObject.operation.slice(1, 2) + ' ';
      } else {
        this.gateString += ' ' + tempObject.operation + ' ';
      }
      if ((typeof tempObject.rightArm === 'string' || tempObject.rightArm instanceof String)) { 
        this.gateString += tempObject.rightArm + ')';
       } else {
        this.printTwoInputsGateObjects(tempObject.rightArm);
        //this.gateString += ')';
        // this.gateString += ")"  UNCOMMENT FOR WRAPPING WHOLE EXPRESSION TO BRACKETS. DONT FORGET THE SECOND BRACKET
      }
    } else if ((typeof tempObject.leftArm !== 'string' || (!(tempObject.leftArm instanceof String)))
      && (typeof tempObject.rightArm === 'string' || (!(tempObject.rightArm instanceof String)))) {
        if ((typeof tempObject.leftArm === 'string' || tempObject.leftArm instanceof String)) { this.gateString += '(' + tempObject.leftArm; } else {
        this.gateString += '(';
        this.printTwoInputsGateObjects(tempObject.leftArm);
      }
      this.gateString += ' ' + tempObject.operation + ' ';
      if ((typeof tempObject.rightArm === 'string' || tempObject.rightArm instanceof String)) { this.gateString += tempObject.rightArm + ')'; } else {
        this.printTwoInputsGateObjects(tempObject.rightArm);
        this.gateString += ')';
      }
    }
  }*/

  public printDynamicInputsGateObjects(tempObject) {
    
    if(tempObject.operation !== null && tempObject.operation === "~"){
      if((typeof tempObject.ports[0] === 'string' || tempObject.ports[0] instanceof String)){
        this.gateString+= '~('+ tempObject.ports[0] + ')';
      }
    }
    else{
      let allPortsHaveStrings = true;
    for(let i = 0; i < tempObject.ports.length; i++){
      if(!(typeof tempObject.ports[i] === 'string' || tempObject.ports[i] instanceof String)){
        allPortsHaveStrings = false;
        break;
      }
    }

    if(allPortsHaveStrings){
      let operationToBeAdded = tempObject.operation;
      if(tempObject.operation === '~|' || tempObject.operation === '~&' || tempObject.operation === '~^') {
        this.gateString += '~(';
        operationToBeAdded = tempObject.operation.slice(1,2);
      } else {
        this.gateString += '(';
      }

      for(let i = 0; i < tempObject.ports.length; i++){
        if(i == 0){
          this.gateString += tempObject.ports[i] + ' ';
        }
        else if(i == tempObject.ports.length-1){
          this.gateString += operationToBeAdded + ' ' +  tempObject.ports[i];
        }
        else{
          this.gateString += operationToBeAdded + ' ' +  tempObject.ports[i] + ' ';
        }
      }

      this.gateString += ')'
      return;
    
    }

    //if (tempObject.parent === null) {
      let operationToBeAdded = tempObject.operation;

      if(tempObject.operation === '~|' || tempObject.operation === '~&' || tempObject.operation === '~^') {
        this.gateString += '~(';
        operationToBeAdded = operationToBeAdded.slice(1,2);
      }

      for(let i = 0; i < tempObject.ports.length; i++){
        if(typeof tempObject.ports[i] === 'string' || tempObject.ports[i] instanceof String){
          if(i != tempObject.ports.length -1){
            this.gateString += tempObject.ports[i] + ' ' + operationToBeAdded + ' ';
          }
          else{
            this.gateString += tempObject.ports[i];
          }
        }
        else{
          this.printDynamicInputsGateObjects(tempObject.ports[i]);
          
          if(i != tempObject.ports.length -1){
            this.gateString +=' ' + operationToBeAdded + ' ';
          }
        }
      }

      if(tempObject.operation === '~|' || tempObject.operation === '~&' || tempObject.operation === '~^') {
        this.gateString += ')';
      }
      /*if ((typeof tempObject.leftArm === 'string' || tempObject.leftArm instanceof String)){
         this.gateString += /*"("+tempObject.leftArm;
      } else {
        // this.gateString += "("  UNCOMMENT FOR WRAPPING WHOLE EXPRESSION TO BRACKETS. DONT FORGET THE SECOND BRACKET
        this.printTwoInputsGateObjects(tempObject.leftArm);
      }*/

      /*if(tempObject.operation === '~|' || tempObject.operation === '~&' || tempObject.operation === '~^') {
        this.gateString += ' ' + tempObject.operation.slice(1, 2) + ' ';
      } else {
        this.gateString += ' ' + tempObject.operation + ' ';
      }
      if ((typeof tempObject.rightArm === 'string' || tempObject.rightArm instanceof String)) { 
        this.gateString += tempObject.rightArm + ')';
       } else {
        this.printTwoInputsGateObjects(tempObject.rightArm);
        this.gateString += ')';
        // this.gateString += ")"  UNCOMMENT FOR WRAPPING WHOLE EXPRESSION TO BRACKETS. DONT FORGET THE SECOND BRACKET
      }*/
/*} else if ((typeof tempObject.leftArm !== 'string' || (!(tempObject.leftArm instanceof String)))
      && (typeof tempObject.rightArm === 'string' || (!(tempObject.rightArm instanceof String)))) {
        if ((typeof tempObject.leftArm === 'string' || tempObject.leftArm instanceof String)) { this.gateString += '(' + tempObject.leftArm; } else {
        this.gateString += '(';
        this.printTwoInputsGateObjects(tempObject.leftArm);
      }
      this.gateString += ' ' + tempObject.operation + ' ';
      if ((typeof tempObject.rightArm === 'string' || tempObject.rightArm instanceof String)) { this.gateString += tempObject.rightArm + ')'; } else {
        this.printTwoInputsGateObjects(tempObject.rightArm);
        this.gateString += ')';
      }
    }*/
    }
    
  }

  public getGateString(reference) {
    if (reference === 'orGate') { return '|'; } 
    else if (reference === 'andGate') { return '&'; }
    else if (reference === 'norGate') { return '~|'; }
    else if (reference === 'nandGate') { return '~&'; }
    else if (reference === 'xorGate') { return '^'; }
    else if (reference === 'xnorGate') { return '~^'; }
    else if (reference === 'notGate') { return '~'; }
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
