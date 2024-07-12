import { createDependencyProposals } from "./proposals/dependecyProposals";
import { getMarkers } from "../markers/getAllMarkers";
import { Text } from "../markers/Text";


import ITextModel = monaco.editor.ITextModel;
import Position = monaco.Position;


export function basicCodeCompletionSuggestions(model:ITextModel,position:Position) {
    console.time('ALL')
    
    console.time('Get model word last')
    const word: any = model.getWordUntilPosition(position);
    
    const lastCharRange = {
        startLineNumber: position.lineNumber,
        startColumn: position.column - 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      };
      const lastCharacter: string = model.getValueInRange(lastCharRange);
    console.timeEnd('Get model word last')

    if (/[ ()\[\]{},;:@#$%&|*+\-/<>?=~]/.test(lastCharacter)){
        return {suggestions:[]};
      }
    else {
      const allWords: Text = getMarkers(model, position)[1];


      // const importedKeyWordsSV = [];
  
      // let counterSV = 0;
      // model.onDidChangeContent((event) => {
      // counterSV++;
      // let new_counter = counterSV; 
      // setTimeout( () => { 
      //     if (counterSV == new_counter){
      //     let myParserMarkers = parseAndGetMarkers(model.getValue());
      //     let addMarkersSV = getMarkers(model, position, importedKeyWordsSV)[0];
      //     let allMarkersSV = myParserMarkers.concat(addMarkersSV);
      //     monaco.editor.setModelMarkers(model, 'SystemVerilog', allMarkersSV);
      //     }
      //     else{
          
      //     }
      // }, 1000 );
      // });
      
      console.time('Create dep prop')
      const result = createDependencyProposals(model, position, model.getValue(), allWords)
          
      console.timeEnd('Create dep prop')
      console.timeEnd('ALL')
        return word ? result : [];
    }
}