import {Component} from '@angular/core';
import {GenerateDiagramSchema} from './GenerateDiagramSchema';
import * as Vec2D from 'vector2d';


@Component({
  selector: 'app-generate-state-positions',
  template: ``
})

export class GenerateStatePositionsComponent {

  public generatePositions(parsedCode: GenerateDiagramSchema): GenerateDiagramSchema {
    this.randomizePositions(parsedCode);
    const table: number[][] = this.createTableOfAdjacency(parsedCode);
    const alpha: number = 1.0;
    const beta: number = 0.0001;
    const kappa: number = 1.0;
    const eta: number = 0.99;
    const delta_t: number = 0.01;
    const repetitions: number = 250000;
    const displacementVectors: Vec2D.Vector[] = this.createDisplacementVectorsTable(parsedCode);
    for (let i: number = 1; i <= repetitions; i++) {
      let other_vector: Vec2D.Vector = new Vec2D.Vector(0, 0);
      for (let j: number = 0; j < parsedCode.states.length; j++) {
        let displacement_vector: Vec2D.Vector = new Vec2D.Vector(0, 0);
        const total_force: Vec2D.Vector = new Vec2D.Vector(0, 0);
        for (let k: number = 0; k < parsedCode.states.length; k++) {
          if (j !== k && table[j][k] === 0.0) {
            total_force.add(
              this.calculateCoulombForce(
                parsedCode.states[j].position,
                parsedCode.states[k].position,
                beta
              )
            );
          } else if (j !== k && table[j][k] === 0.1) {
            total_force.add(
              this.calculateHookesForce(
                parsedCode.states[j].position,
                parsedCode.states[k].position,
                0.1,
                kappa
              )
            );
          }
        }
        displacement_vector = this.calculateDisplacementVector(
          displacementVectors[j],
          total_force,
          alpha,
          delta_t,
          eta
        );
        displacementVectors[j] = displacement_vector;
        other_vector = this.calculateOtherVector(
          other_vector,
          displacementVectors[j],
          alpha
        );
      }
      for (let m: number = 0; m < displacementVectors.length; m++) {
        parsedCode.states[m].position.x += (displacementVectors[m].x * delta_t);
        parsedCode.states[m].position.y += (displacementVectors[m].y * delta_t);
      }
    }
    this.adjustStatePositions(parsedCode);
    this.moveDiagramCloserToOrigin(parsedCode);
    return parsedCode;
  }

  private randomizePositions(parsedCode: GenerateDiagramSchema): void {
    for (const state of parsedCode.states) {
      state.position = {x: Math.random(), y: Math.random()};
    }
  }

  private adjustStatePositions(parsedCode: GenerateDiagramSchema): void {
    for (const state of parsedCode.states) {
      state.position.x = state.position.x * 2500;
      state.position.y = state.position.y * 2500;
    }
  }


  private createTableOfAdjacency(parsedCode: GenerateDiagramSchema): number[][] {
    const table: number[][] = new Array(parsedCode.states.length).fill(0).map(() =>
      new Array(parsedCode.states.length).fill(0));
    for (let i: number = 0; i < parsedCode.states.length; i++) {
      const sourceStateName: string = parsedCode.states[i].name;
      for (let j: number = 0; j < parsedCode.states.length; j++) {
        if (i === j) {
          table[i][j] = 0.0;
        } else {
          const targetStateName: string = parsedCode.states[j].name;
          for (const transition of parsedCode.transitions) {
            if (transition.source === sourceStateName && transition.target === targetStateName) {
              table[i][j] = 0.1;
              break;
            }
          }
        }
      }
    }
    return table;
  }

  private calculateMagnitudeOfVector(x: number, y: number): number {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }

  private calculateDistance(x: number, y: number): number {
    return Math.pow(x, 2) + Math.pow(y, 2);
  }

  private createDisplacementVectorsTable(parsedCode: GenerateDiagramSchema): Vec2D.Vector[] {
    const vectors: Vec2D.Vector[] = [];
    for (const item of parsedCode.states) {
      vectors.push(new Vec2D.Vector(0, 0));
    }
    return vectors;
  }

  private calculateDisplacementVector(
    displacement_vector: Vec2D.Vector,
    total_vector: Vec2D.Vector,
    alpha: number,
    delta: number,
    eta: number
  ): Vec2D.Vector {
    const x: number = (displacement_vector.x + alpha * total_vector.x * delta) * eta;
    const y: number = (displacement_vector.y + alpha * total_vector.y * delta) * eta;
    return new Vec2D.Vector(x, y);
  }

  private calculateOtherVector(
    other_vector: Vec2D.Vector,
    displacement_vector: Vec2D.Vector,
    alpha: number
  ): Vec2D.Vector {
    const x: number = other_vector.x + alpha * (Math.pow(displacement_vector.x, 2));
    const y: number = other_vector.y + alpha * (Math.pow(displacement_vector.y, 2));
    return new Vec2D.Vector(x, y);
  }


  private calculateCoulombForce(
    state1position: { x: number, y: number },
    state2position: { x: number, y: number },
    beta: number
  ): Vec2D.Vector {
    const dx: number = state2position.x - state1position.x;
    const dy: number = state2position.y - state1position.y;
    const ds2: number = this.calculateDistance(dx, dy);
    const ds: number = this.calculateMagnitudeOfVector(dx, dy);
    const ds3: number = ds2 * ds;
    let constant: number;
    if (ds3 === 0.0) {
      constant = 0;
    } else {
      constant = beta / (ds2 * ds);
    }
    return new Vec2D.Vector(-constant * dx, -constant * dy);
  }

  private calculateHookesForce(
    state1position: { x: number, y: number },
    state2position: { x: number, y: number },
    constant: number,
    k: number
  ): Vec2D.Vector {
    const dx: number = state2position.x - state1position.x;
    const dy: number = state2position.y - state1position.y;
    const ds: number = this.calculateMagnitudeOfVector(dx, dy);
    const dl: number = ds - constant;
    const constant2: number = k * dl / ds;
    return new Vec2D.Vector(constant2 * dx, constant2 * dy);
  }

  // origin is x:0, y:0
  private moveDiagramCloserToOrigin(parsedCode: GenerateDiagramSchema): void {
    let globalMinimumX: number = Number.MAX_VALUE;
    let globalMinimumY: number = Number.MAX_VALUE;
    for (const state of parsedCode.states) {
      if (state.position.x <= globalMinimumX) {
        globalMinimumX = state.position.x;
      }
      if (state.position.y <= globalMinimumY) {
        globalMinimumY = state.position.y;
      }
    }
    for (const state of parsedCode.states) {
      state.position.x = state.position.x - globalMinimumX + 25;
      state.position.y = state.position.y - globalMinimumY + 25;
    }
  }
}
