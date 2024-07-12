import * as _ from 'lodash';
import * as joint from 'jointjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSPaper {
  public createPaper(diagramPaper, diagramGraph, width, height, nameSpace) {
    return new joint.dia.Paper({
      el: diagramPaper,
      width,
      height,
      model: diagramGraph,
      drawGrid: true,
      gridSize: 10,
      cellViewNamespace: nameSpace,
      //defaultLink: new joint.shapes.standard.Link(),
      defaultLink: new joint.shapes.standard.Link({
        attrs: {
          line: {
            targetMarker: {
              'type': 'none'
            }
          }
        }
    }),
      defaultConnector: {
        name: 'jumpover',
        args: {
          size: 7
        }
      },
      defaultAnchor: {
        name: 'perpendicular',
        args: {
          padding: 15
        }
      },
      defaultRouter: {
        name: 'manhattan',
        args: {
          step: 15,
          startDirections: ['right'],
          endDirections: ['left']
        }
      },
      defaultLinkAnchor: {
        name: 'connectionPerpendicular'
      },
      validateConnection(cellViewS, magnetS, cellViewT, magnetT) {
        let bandwidthS = null, bandwidthT;
        let structS, structT;
        if (magnetS && magnetS.getAttribute('port-group') === 'in') { return false; }
        if (cellViewS === cellViewT) { return false; }
        if (cellViewS.model.attributes.ports) {
          cellViewS.model.attributes.ports.items.forEach(port => {
            if (port.id === magnetS.getAttribute('port') && port.group === 'out') {
              bandwidthS = port.bandwidth;
              structS = port.struct;
            }
          });
        }
        
        if (cellViewS.model.attributes.bandwidth 
          && cellViewS.model.attributes.elType !== 'decoder' 
          && cellViewS.model.attributes.elType !== 'encoder'
          && cellViewS.model.attributes.elType !== 'adder'
          && cellViewS.model.attributes.elType !== 'subtractor'
          && cellViewS.model.attributes.elType !== 'comparator') { bandwidthS = cellViewS.model.attributes.bandwidth;}

        if (cellViewS.model.attributes.struct) { structS = cellViewS.model.attributes.struct; }

        if (cellViewS.model.attributes.type === 'logic.Or'
          || cellViewS.model.attributes.type === 'logic.And'
          || cellViewT.model.attributes.type === 'logic.Nand'
          || cellViewT.model.attributes.type === 'logic.Nor'
          || cellViewT.model.attributes.type === 'logic.Xor'
          || cellViewT.model.attributes.type === 'logic.Xnor'
          ) {
          bandwidthS = cellViewS.model.attributes.bandwidth;
        }

        // FOR PORT AND MODULE INPUTS
        if ((cellViewT.model.attributes.elType === 'module' || cellViewT.model.attributes.elType === 'standalonePort')
          && magnetT) {
            cellViewT.model.attributes.ports.items.forEach(port => {
              if (port.id == magnetT.getAttribute('port') && port.group == 'in') {
              bandwidthT = port.bandwidth;
              structT = port.struct;
            }
          });
          if(structS == undefined && structT == undefined){
            if (bandwidthS != bandwidthT) {
              magnetT.style.fill = 'red';
              return false;
            }
            else{
              magnetT.style.fill = 'green';
              return true;
            }
          }
          else{
            if(structS == structT){
              magnetT.style.fill = 'green';
              return true;
            }
            if (bandwidthS != bandwidthT || structS != structT) {
              magnetT.style.fill = 'red';
              return false;
            }
          }
          
        }
        // FOR OR LOGICAL GATE INPUT
        if (cellViewT.model.attributes.type === 'logic.Or'
          || cellViewT.model.attributes.type === 'logic.And'
          || cellViewT.model.attributes.type === 'logic.Nand'
          || cellViewT.model.attributes.type === 'logic.Nor'
          || cellViewT.model.attributes.type === 'logic.Xor'
          || cellViewT.model.attributes.type === 'logic.Xnor'
          || cellViewT.model.attributes.type === 'logic.Not'
          ) {
          // Handle port connection allowance  and color signalization
          if (magnetT.classList[0] === 'input' && cellViewT.model.attributes.bandwidth == bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          } else {
            magnetT.style.fill = 'red';
            return false;
          }
        }

        // FOR LOGICAL GATES WITH CUSTOM PORTS
        if (cellViewT.model.attributes.elType === 'CustomOr'
          || cellViewT.model.attributes.elType === 'CustomNor'
          || cellViewT.model.attributes.elType === 'CustomXor'
          || cellViewT.model.attributes.elType === 'CustomXnor'
          || cellViewT.model.attributes.elType === 'CustomAnd'
          || cellViewT.model.attributes.elType === 'CustomNand'
          || cellViewT.model.attributes.elType === 'CustomNot'
          ) {
            // Handle port connection allowance  and color signalization
          if (magnetT && magnetT.getAttribute('port-group') === 'in' && cellViewT.model.attributes.bandwidth == bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          } else if (magnetT) {           
            magnetT.style.fill = 'red';
            return false;
          }
        }

        // FOR MULTIPLEXERS
        if (cellViewT.model.attributes.elType === 'multiplexor' && magnetT) {
          if (magnetT.getAttribute('port-group') === 'in' && cellViewT.model.attributes.bandwidth == bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          } else if (magnetT.getAttribute('port-group') === 'sel' && cellViewT.model.attributes.selBandwidth == bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          } else {
            magnetT.style.fill = 'red';
            return false;
          }
        }

        // FOR DECODER
        if (cellViewT.model.attributes.elType === 'decoder' && magnetT) {
          if (magnetT.getAttribute('port-group') === 'in' && cellViewT.model.attributes.bandwidth == bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          } else if (magnetT.getAttribute('port-group') === 'enable' && 1 == bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          } else {
            magnetT.style.fill = 'red';
            return false;
          }
        }

        // FOR DECODER
        if (cellViewT.model.attributes.elType === 'encoder' && magnetT) {
          if (magnetT.getAttribute('port-group') === 'in' && cellViewT.model.attributes.bandwidth === bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          } else {
            magnetT.style.fill = 'red';
            return false;
          }
        }

        // FOR REGISTER 
        if (cellViewT.model.attributes.elType === 'register' && magnetT) {
          if (magnetT.getAttribute('port-group') === 'in'){
            if(cellViewT.model.attributes.bandwidth == bandwidthS && cellViewT.model.attributes.struct == ""){
              magnetT.style.fill = 'green';
              return true;
            }
            if(cellViewT.model.attributes.struct != "" && cellViewT.model.attributes.struct == structS){
              magnetT.style.fill = 'green';
              return true;
            }
            
          } else if (magnetT.getAttribute('port-group') === 'clk' && 1 === bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          } else if (magnetT.getAttribute('port-group') === 'enable' && 1 === bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          } else if (magnetT.getAttribute('port-group') === 'rst' && 1 === bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          }else {
            magnetT.style.fill = 'red';
            return false;
          }
        }

        // FOR RAM
        if (cellViewT.model.attributes.elType === 'ram' && magnetT) {
          structT = cellViewT.model.attributes.struct
          if (magnetT.getAttribute('port-group') === 'in'){
            if(cellViewT.model.attributes.usingDataStruct == false && cellViewT.model.attributes.dataBandwidth == bandwidthS) {
              magnetT.style.fill = 'green';
              return true;
            }
            if(cellViewT.model.attributes.usingDataStruct == true && cellViewT.model.attributes.struct == structS) {
              magnetT.style.fill = 'green';
              return true;
            }
          }else if (magnetT.getAttribute('port-group') === 'addr' && cellViewT.model.attributes.addressBandwidth == bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          }else if (magnetT.getAttribute('port-group') === 'we' && 1 === bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          } else if (magnetT.getAttribute('port-group') === 'clk' && 1 === bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          }else {
            magnetT.style.fill = 'red';
            return false;
          }
        }

        // FOR Adder 
        if (cellViewT.model.attributes.elType === 'adder' && magnetT) {

          if (magnetT.getAttribute('port-group') === 'in' && cellViewT.model.attributes.bandwidth == bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          }
          else {
            magnetT.style.fill = 'red';
            return false;
          }
        }

        // FOR Subtractor 
        if (cellViewT.model.attributes.elType === 'subtractor' && magnetT) {

          if (magnetT.getAttribute('port-group') === 'in' && cellViewT.model.attributes.bandwidth == bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          }
          else {
            magnetT.style.fill = 'red';
            return false;
          }
        }

        // FOR Comparator
        if (cellViewT.model.attributes.elType === 'comparator' && magnetT) {

          if (magnetT.getAttribute('port-group') === 'in' && cellViewT.model.attributes.bandwidth == bandwidthS) {
            magnetT.style.fill = 'green';
            return true;
          }
          else {
            magnetT.style.fill = 'red';
            return false;
          }
        }

        if (magnetT && magnetT.getAttribute('port-group') === 'in' && cellViewT.model.attributes.elType === "module") {
          magnetT.style.fill = 'green';
          return true;
        }

        if (magnetT && magnetT.getAttribute('port-group') === 'in' && bandwidthS === cellViewT.model.attributes.bandwidth && bandwidthS != null) {
          magnetT.style.fill = 'green';
          return true;
        }
        else if(magnetT){
          magnetT.style.fill = 'red';
          return false;
        }
      },
      markAvailable: true
    });
  }
}
