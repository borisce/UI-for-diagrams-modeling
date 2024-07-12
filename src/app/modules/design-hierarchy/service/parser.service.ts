import { Injectable } from '@angular/core';
import { ConditionResult, ModuleInstance, ModuleNode } from '../model/module-node.model';
import { CharStreams, CodePointCharStream, CommonTokenStream } from 'antlr4ts';
import { SystemVerilogLexer } from '../systemverilog/ANTLR/SystemVerilogLexer';
import { SystemVerilogParser } from '../systemverilog/ANTLR/SystemVerilogParser';
import { vhdlLexer } from '../vhdl/ANTLR/vhdlLexer';
import { vhdlParser } from '../vhdl/ANTLR/vhdlParser';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { SystemVerilogModuleListener } from '../systemverilog/system-verilog-module-listener';
import { FileTreeNode } from '../../../core/fileSystem/FileTree/filetree.node.interface';
import { FileService } from './file.service';
import { VerilogLexer } from '../verilog/ANTLR/VerilogLexer';
import { VerilogParser } from '../verilog/ANTLR/VerilogParser';
import { VerilogModuleListener } from '../verilog/verilog-module-listener';
import { SystemVerilogParameterListener } from '../systemverilog/system-verilog-parameter-listener';
import { ModuleInstanceNew } from '../model/module-instance.model';
import { VhdlComponentListener } from '../vhdl/vhdl-component-listener';

@Injectable({ providedIn: 'root' })
export class ParserService {
  private modulesMap: Map<string, ModuleNode> = new Map();
  private moduleInstances: ModuleInstanceNew[] = [];
  private parameterMap: Map<string, Map<string, string>> = new Map();
  private parameterOverridesMap: Map<string, Array<Map<string, string>>> = new Map();
  private packageParameterMap: Map<string, Map<string, string>> = new Map();
  private packageParameterMap1: Map<string, string> = new Map();
  private allFiles: FileTreeNode[];
  private compileFailed: boolean;
  private compileUndefined: boolean;
  private fileType: string;

  constructor(
    private fileService: FileService,
  ) {}

  // tslint:disable-next-line:max-line-length
  public async getModulesFromRootFile(rootFile: FileTreeNode, allFiles: FileTreeNode[], compileFailed: boolean, compileUndefined: boolean)
    : Promise<Map<string, ModuleNode>> {
    this.allFiles = allFiles;
    this.compileFailed = compileFailed;
    this.compileUndefined = compileUndefined;
    this.modulesMap.clear();
    this.parameterMap.clear();
    this.parameterOverridesMap.clear();
    this.packageParameterMap.clear();
    await this.parseFile(rootFile);
    return this.modulesMap;
  }

  private async parseFile(fileNode: FileTreeNode): Promise<void> {
    const rootFileContent: string = await this.fileService.getFileBody(fileNode);
    this.moduleInstances = [];
    const fileName: string = fileNode.name.substring(0, fileNode.name.lastIndexOf('?'));
    if (fileName.endsWith('.sv')) {
      this.fileType = '.sv';
      this.modulesMap = this.generateSystemVerilogDiagramData(rootFileContent, null);
    } else if (fileName.endsWith('.v')) {
      this.fileType = '.v';
      this.modulesMap = this.generateVerilogDiagramData(rootFileContent, null);
    } else if (fileName.endsWith('.vhd')) {
      this.modulesMap = this.generateVHDLDiagramData(rootFileContent, null);
      this.fileType = '.vhd';
    } else if (fileName.endsWith('.vhdl')) {
      this.modulesMap = this.generateVHDLDiagramData(rootFileContent, null);
      this.fileType = '.vhdl';
    }
    // tslint:disable-next-line:max-line-length
    let currentLevelInstances: ModuleInstanceNew[] = this.moduleInstances;
    while (currentLevelInstances.length > 0) {
      this.moduleInstances = [];
      // @ts-ignore
      for (const moduleInstance: ModuleInstanceNew of currentLevelInstances) {
        if (!this.compileFailed && moduleInstance.conditionResult === ConditionResult.failed) {
          continue;
        }
        if (!this.compileUndefined &&
          moduleInstance.conditionResult === ConditionResult.undefined) {
          continue;
        }
        this.addInstanceToModule(moduleInstance);
        const instantiationFile: FileTreeNode = this.findFileByModuleName(moduleInstance.name);
        if (instantiationFile) {
          const fileContent: string = await this.fileService.getFileBody(instantiationFile);
          // tslint:disable-next-line:max-line-length
          const instantiationFileName: string = instantiationFile.name.substring(0, instantiationFile.name.lastIndexOf('?'));
          if (instantiationFileName.endsWith('.sv')) {
            this.modulesMap = this.generateSystemVerilogDiagramData(fileContent, moduleInstance);
          } else if (instantiationFileName.endsWith('.v')) {
            this.modulesMap = this.generateVerilogDiagramData(fileContent, moduleInstance);
          } else if (instantiationFileName.endsWith('.vhd') ||
                     instantiationFileName.endsWith('.vhdl')) {
            this.modulesMap = this.generateVHDLDiagramData(fileContent, moduleInstance);
          }
        }
      }
      currentLevelInstances = this.moduleInstances;
    }
  }

  private addInstanceToModule(moduleInstance: ModuleInstanceNew): void {
    let module: ModuleNode = this.modulesMap.get(moduleInstance.instantiatedBy);
    if (!module) {
      module = {
        name: moduleInstance.instantiatedBy,
        instantiatedModules: new Map<string, ModuleInstance>(),
      };
    }
    let existingInstance: ModuleInstance = module.instantiatedModules.get(moduleInstance.name);
    if (!existingInstance) {
      existingInstance = {
        conditionResult: moduleInstance.conditionResult,
        condition: moduleInstance.condition,
        instantiationCount: 0,
        successInstantiationCount: 0,
        failedInstantiationCount: 0,
        undefinedInstantiationCount: 0,
      };
    } else {
      if (existingInstance.conditionResult !== ConditionResult.passed) {
        existingInstance.conditionResult = moduleInstance.conditionResult;
      }
      if (existingInstance.condition !== '') {
        existingInstance.condition += '; ';
      }
      existingInstance.condition += moduleInstance.condition;
    }
    existingInstance.instantiationCount += moduleInstance.instantiatedCount;
    if (moduleInstance.conditionResult === ConditionResult.passed) {
      existingInstance.successInstantiationCount += moduleInstance.instantiatedCount;
    } else if (moduleInstance.conditionResult === ConditionResult.failed) {
      existingInstance.failedInstantiationCount += moduleInstance.instantiatedCount;
    } else if (moduleInstance.conditionResult === ConditionResult.undefined) {
      existingInstance.undefinedInstantiationCount += moduleInstance.instantiatedCount;
    }
    module.instantiatedModules.set(moduleInstance.name, existingInstance);
    this.modulesMap.set(moduleInstance.instantiatedBy, module);
  }

  private findFileByModuleName(moduleName: string): FileTreeNode | undefined {
    return this.allFiles.find(file => file.displayName === (moduleName + this.fileType));
  }

  // tslint:disable-next-line:max-line-length
  public generateSystemVerilogDiagramData(fileContent: string, currentInstance: ModuleInstanceNew): Map<string, ModuleNode> {
    const charStream: CodePointCharStream = CharStreams.fromString(fileContent);
    const lexer: SystemVerilogLexer = new SystemVerilogLexer(charStream);
    const tokenStream: CommonTokenStream = new CommonTokenStream(lexer);
    const parser: SystemVerilogParser = new SystemVerilogParser(tokenStream);
    // tslint:disable-next-line:max-line-length
    const listener: SystemVerilogModuleListener = new SystemVerilogModuleListener(this.modulesMap, this.moduleInstances, currentInstance, this.packageParameterMap1);
    // @ts-ignore
    ParseTreeWalker.DEFAULT.walk(listener, parser.source_text());
    return this.modulesMap;
  }

  // tslint:disable-next-line:max-line-length
  private generateVHDLDiagramData(fileContent: string, currentInstance: ModuleInstanceNew): Map<string, ModuleNode> {
    const charStream: CodePointCharStream = CharStreams.fromString(fileContent);
    const lexer: vhdlLexer = new vhdlLexer(charStream);
    const tokens: CommonTokenStream = new CommonTokenStream(lexer);
    const parser: vhdlParser = new vhdlParser(tokens);
    // tslint:disable-next-line:max-line-length
    const vhdlListener: VhdlComponentListener = new VhdlComponentListener(this.modulesMap, this.moduleInstances, currentInstance);
    // @ts-ignore
    ParseTreeWalker.DEFAULT.walk(vhdlListener, parser.design_file());
    return this.modulesMap;
  }

  // tslint:disable-next-line:max-line-length
  public generateVerilogDiagramData(fileContent: string, currentInstance: ModuleInstanceNew): Map<string, ModuleNode> {
    const charStream: CodePointCharStream = CharStreams.fromString(fileContent);
    const lexer: SystemVerilogLexer = new SystemVerilogLexer(charStream);
    const tokenStream: CommonTokenStream = new CommonTokenStream(lexer);
    const parser: SystemVerilogParser = new SystemVerilogParser(tokenStream);
    // tslint:disable-next-line:max-line-length
    const listener: SystemVerilogModuleListener = new SystemVerilogModuleListener(this.modulesMap, this.moduleInstances, currentInstance, this.packageParameterMap1);
    // @ts-ignore
    ParseTreeWalker.DEFAULT.walk(listener, parser.source_text());
    return this.modulesMap;
  }

  public parseSystemVerilogParameters(fileContent: string): void {
    const charStream: CodePointCharStream = CharStreams.fromString(fileContent);
    // const inputStream: ANTLRInputStream = new ANTLRInputStream(fileContent);
    const lexer: SystemVerilogLexer = new SystemVerilogLexer(charStream);
    const tokenStream: CommonTokenStream = new CommonTokenStream(lexer);
    const parser: SystemVerilogParser = new SystemVerilogParser(tokenStream);
    // tslint:disable-next-line:max-line-length
    const parameterListener: SystemVerilogParameterListener = new SystemVerilogParameterListener(this.packageParameterMap1, this.packageParameterMap);
    // @ts-ignore
    ParseTreeWalker.DEFAULT.walk(parameterListener, parser.source_text());
  }
}
