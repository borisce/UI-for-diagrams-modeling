import { Injectable } from '@angular/core';
import { ConditionResult, ModuleNode } from '../model/module-node.model';
import * as joint from 'jointjs';
import { FileTreeNode } from '../../../core/fileSystem/FileTree/filetree.node.interface';

interface QueueItem {
  module: ModuleNode;
  x: number;
  y: number;
}

@Injectable({ providedIn: 'root' })
export class ModuleHierarchyService {
  // tslint:disable-next-line:max-line-length
  public createDiagram(modulesMap: Map<string, ModuleNode>, rootFile: FileTreeNode, diagramGraph: any): void {
    const horizontalSpacing: number = 200;
    const verticalSpacing: number = 125;
    const elementWidth: number = 100;
    const elementHeight: number = 50;
    const elementsMap: Map<string, joint.shapes.standard.Rectangle> = new Map();
    const baseCharWidth: number = 10;

    // tslint:disable-next-line:typedef
    const createAndPositionModule = (moduleName: string, x: number, y: number): void => {
      if (!elementsMap.has(moduleName)) {
        const moduleElement: joint.shapes.standard.Rectangle
          = new joint.shapes.standard.Rectangle();
        let calculatedWidth: number = moduleName.length * baseCharWidth;
        if (calculatedWidth < elementWidth) {
          calculatedWidth = elementWidth;
        }
        moduleElement.set({
          hidden: false,
          collapsed: false,
        });
        moduleElement.position(x, y);
        moduleElement.resize(calculatedWidth, elementHeight);
        moduleElement.attr({
          body: { fill: '#2C3E50', stroke: 'white', rx: 10, ry: 10 },
          label: { text: moduleName, fill: 'white', fontSize: 12 },
          icon: {
            text: '+',
            refX: '100%',
            refY: '50%',
            textVerticalAnchor: 'middle',
            textAnchor: 'end',
            fontSize: 14,
            fill: '#333',
          }
        });
        moduleElement.addTo(diagramGraph);
        elementsMap.set(moduleName, moduleElement);
      }
    };

    function calculateWidths(rootModule: ModuleNode): Map<string, number> {
      const widthsMap: Map<string, number> = new Map<string, number>();
      let customHorizontalSpacing: number = horizontalSpacing;

      function calculateNodeWidth(module: ModuleNode): number {
        if (!module || !module.instantiatedModules || module.instantiatedModules.size === 0) {
          return elementWidth;
        }
        let totalWidth: number = 0;
        module.instantiatedModules.forEach((_, childName) => {
          const childModule: ModuleNode = modulesMap.get(childName);
          const requiredSpacing: number = childModule.name.length * baseCharWidth;
          if (requiredSpacing > horizontalSpacing) {
            customHorizontalSpacing = requiredSpacing;
          } else {
            customHorizontalSpacing = horizontalSpacing;
          }
          if (childModule) {
            const childWidth: number = calculateNodeWidth(childModule);
            widthsMap.set(childName, childWidth);
            totalWidth += childWidth + customHorizontalSpacing;
          }
        });
        return Math.max(totalWidth - horizontalSpacing, elementWidth);
      }
      widthsMap.set(rootModule.name, calculateNodeWidth(rootModule));
      return widthsMap;
    }

    function positionModules(rootModule: ModuleNode): void {
      const widthsMap: Map<string, number> = calculateWidths(rootModule);
      const queue: QueueItem[] = [{ module: rootModule, x: window.innerWidth / 2, y: 50}];
      let customHorizontalSpacing: number = horizontalSpacing;

      while (queue.length > 0) {
        const { module, x, y }: QueueItem = queue.shift();
        if (module !== undefined) {
          createAndPositionModule(module.name, x, y);
          if (module.instantiatedModules.size === 0) { continue; }

          let totalChildrenWidth: number = 0;
          module.instantiatedModules.forEach((_, childName) => {
            totalChildrenWidth += widthsMap.get(childName) + horizontalSpacing;
          });
          totalChildrenWidth -= horizontalSpacing;
          let childX: number = x - totalChildrenWidth / 2;

          module.instantiatedModules.forEach((_, childName) => {
            const childModule: ModuleNode = modulesMap.get(childName);
            if (!childModule) { return; }

            const childWidth: number = widthsMap.get(childName);
            queue.push({
              module: childModule,
              x: childX + childWidth / 2,
              y: y + verticalSpacing
            });
            const requiredSpacing: number = childModule.name.length * baseCharWidth;
            if (requiredSpacing > horizontalSpacing) {
              customHorizontalSpacing = requiredSpacing;
            } else {
              customHorizontalSpacing = horizontalSpacing;
            }
            childX += childWidth + customHorizontalSpacing;
          });
        }
      }
    }

    // Find root module
    const root: ModuleNode = this.findRootModule(modulesMap, rootFile);
    positionModules(root);

    // Create and add links
    modulesMap.forEach(module => {
      const sourceElement: joint.shapes.standard.Rectangle = elementsMap.get(module.name);
      module.instantiatedModules.forEach((moduleInstance, moduleName) => {
        const targetElement: joint.shapes.standard.Rectangle = elementsMap.get(moduleName);
        if (sourceElement && targetElement) {
          const link: joint.shapes.standard.Link = new joint.shapes.standard.Link({
            // router: { name: 'manhattan' },
            connector: { name: 'normal' },
            connectionPoint: { name: 'rectangle', args: { sticky: true } },
            source: { id: sourceElement.id },
            target: { id: targetElement.id },
            labels: [
              {
                position: 0.5,
                attrs: {
                  rect: {
                    fill: '#ffffff',
                    stroke: '#000000',
                    strokeWidth: 1,
                    ref: 'text',
                    refWidth: '180%',
                    refHeight: '150%',
                    refX: '-35%',
                    refY: '-25%',
                  },
                  text: {
                    text: moduleInstance.instantiationCount.toString(),
                    fill: '#000000',
                    fontSize: 14,
                    fontFamily: 'Arial, sans-serif',
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle'
                  }
                }
              }
            ],
            attrs: {
              line: {
                stroke: moduleInstance.conditionResult === ConditionResult.undefined ? 'gray' : 'black',
                strokeDasharray: moduleInstance.conditionResult === ConditionResult.passed ? '0' :
                  moduleInstance.conditionResult === ConditionResult.failed ? '5,5' :
                    '10,10'
              }
            },
            customData: {
              conditions: moduleInstance.condition,
              totalInstantiations: moduleInstance.instantiationCount,
              successInstantiations: moduleInstance.successInstantiationCount,
              failedInstantiations: moduleInstance.failedInstantiationCount,
              undefinedInstantiations: moduleInstance.undefinedInstantiationCount,
            }
          });
          link.addTo(diagramGraph);
        }
      });
    });
  }

  public findRootModule(modulesMap: Map<string, ModuleNode>, rootFile: FileTreeNode): ModuleNode {
    if (modulesMap && rootFile) {
      const fileName: string = rootFile.displayName;
      const rootName: string = fileName.split('.')[0].toLowerCase();
      // tslint:disable-next-line:max-line-length
      const entry: [string, ModuleNode] = Array.from(modulesMap.entries()).find(([key, _]) => key.toLowerCase() === rootName);
      return entry ? entry[1] : undefined;
    } else {
      return undefined;
    }
  }
}
