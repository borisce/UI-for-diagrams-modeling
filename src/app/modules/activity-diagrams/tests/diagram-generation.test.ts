import { expect, it, describe } from '@jest/globals';
import { DiagramGenerationService } from '../diagram-generation.service';

describe('Activity diagram - diagram generation', () => {
    describe('Test parsing and traversing', () => {
        it('Module with just inputs', () => {
            const diagramGenerationService = new DiagramGenerationService();

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input logic logic_input,
                input logic [2:0] logic_input_2,
                input reg reg_input,
                input reg [2:0] reg_input2
            );
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.inputs.length).toBe(6);
            expect(diagramGenerationService.visitor.outputs.length).toBe(0);
            expect(diagramGenerationService.visitor.internalSignals.length).toBe(0);
            expect(diagramGenerationService.visitor.parameters.length).toBe(0);

            expect(diagramGenerationService.visitor.inputs[0]).toStrictEqual({ name: 'clk', type: 'wire', bits: '1' });
            expect(diagramGenerationService.visitor.inputs[1]).toStrictEqual({ name: 'reset', type: 'wire', bits: '1' });
            expect(diagramGenerationService.visitor.inputs[2]).toStrictEqual({ name: 'logic_input', type: 'logic', bits: '1' });
            expect(diagramGenerationService.visitor.inputs[3]).toStrictEqual({ name: 'logic_input_2', type: 'logic', bits: '3' });
            expect(diagramGenerationService.visitor.inputs[4]).toStrictEqual({ name: 'reg_input', type: 'reg', bits: '1' });
            expect(diagramGenerationService.visitor.inputs[5]).toStrictEqual({ name: 'reg_input2', type: 'reg', bits: '3' });
        });

        it('Module with just outputs', () => {
            const diagramGenerationService = new DiagramGenerationService();

            const code = `module SimpleModule (
                output wire clk,
                output wire reset,
                output logic logic_input,
                output logic [2:0] logic_input_2,
                output reg reg_input,
                output reg [2:0] reg_input2
            );
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.inputs.length).toBe(0);
            expect(diagramGenerationService.visitor.outputs.length).toBe(6);
            expect(diagramGenerationService.visitor.internalSignals.length).toBe(0);
            expect(diagramGenerationService.visitor.parameters.length).toBe(0);

            expect(diagramGenerationService.visitor.outputs[0]).toStrictEqual({ name: 'clk', type: 'wire', bits: '1' });
            expect(diagramGenerationService.visitor.outputs[1]).toStrictEqual({ name: 'reset', type: 'wire', bits: '1' });
            expect(diagramGenerationService.visitor.outputs[2]).toStrictEqual({ name: 'logic_input', type: 'logic', bits: '1' });
            expect(diagramGenerationService.visitor.outputs[3]).toStrictEqual({ name: 'logic_input_2', type: 'logic', bits: '3' });
            expect(diagramGenerationService.visitor.outputs[4]).toStrictEqual({ name: 'reg_input', type: 'reg', bits: '1' });
            expect(diagramGenerationService.visitor.outputs[5]).toStrictEqual({ name: 'reg_input2', type: 'reg', bits: '3' });
        });

        it('Module with just internal signals', () => {
            const diagramGenerationService = new DiagramGenerationService();

            const code = `module SimpleModule (
            );
            
                integer integer_signal;
            
                logic [2:0] logic_signal;
                logic logic_signal_3;
            
                real real_signal;
            
                time time_signal;
            
                reg [2:0] reg_signal;
                reg reg_signal3;
                
            endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.inputs.length).toBe(0);
            expect(diagramGenerationService.visitor.outputs.length).toBe(0);
            expect(diagramGenerationService.visitor.internalSignals.length).toBe(7);
            expect(diagramGenerationService.visitor.parameters.length).toBe(0);

            expect(diagramGenerationService.visitor.internalSignals[0]).toStrictEqual({ name: 'integer_signal', type: 'integer', bits: '1' });
            expect(diagramGenerationService.visitor.internalSignals[1]).toStrictEqual({ name: 'logic_signal', type: 'logic', bits: '3' });
            expect(diagramGenerationService.visitor.internalSignals[2]).toStrictEqual({ name: 'logic_signal_3', type: 'logic', bits: '1' });
            expect(diagramGenerationService.visitor.internalSignals[3]).toStrictEqual({ name: 'real_signal', type: 'real', bits: '1' });
            expect(diagramGenerationService.visitor.internalSignals[4]).toStrictEqual({ name: 'time_signal', type: 'time', bits: '1' });
            expect(diagramGenerationService.visitor.internalSignals[5]).toStrictEqual({ name: 'reg_signal', type: 'reg', bits: '3' });
            expect(diagramGenerationService.visitor.internalSignals[6]).toStrictEqual({ name: 'reg_signal3', type: 'reg', bits: '1' });
        });

        // it('Module with just parameters', () => {
        //     const diagramGenerationService = new DiagramGenerationService();

        //     const code = `module SimpleModule #(
        //         parameter DATA_WIDTH = 8,
        //         parameter integer CLK_FREQ = 50,
        //         parameter real CLK_PERIOD = 20.5,
        //     ) (
        //     );  
        //     endmodule`;

        //     diagramGenerationService.generateDiagram('tmp.sv', code);

        //     expect(diagramGenerationService.visitor.inputs.length).toBe(0);
        //     expect(diagramGenerationService.visitor.outputs.length).toBe(0);
        //     expect(diagramGenerationService.visitor.internalSignals.length).toBe(0);
        //     expect(diagramGenerationService.visitor.parameters.length).toBe(3);

        //     expect(diagramGenerationService.visitor.parameters[0]).toStrictEqual({ name: 'DATA_WIDTH', type: 'integer', value: '8' });
        //     expect(diagramGenerationService.visitor.parameters[1]).toStrictEqual({ name: 'CLK_FREQ', type: 'integer', value: '50' });
        //     expect(diagramGenerationService.visitor.parameters[2]).toStrictEqual({ name: 'CLK_PERIOD', type: 'real', value: '20.5' });
        // });

        it('Assign statements should be added to separate block', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                assign data_out = 'b11;
                    assign data_out = 'b10;
            endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.assignBlock.name).toBe('assignBlock');
            expect(diagramGenerationService.visitor.assignBlock.logic).toBe('combinational');
            expect(diagramGenerationService.visitor.assignBlock.statements.length).toBe(2);
            expect(diagramGenerationService.visitor.assignBlock.statements[0]).toStrictEqual({ elementType: 'action', id: 1, text: "data_out = 'b11;" });
            expect(diagramGenerationService.visitor.assignBlock.statements[1]).toStrictEqual({ elementType: 'action', id: 2, text: "data_out = 'b10;" });
        });

        it('Module with one always_comb block and basic statements', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    data_out = 'b11;
                    data_out = 'b10;
                end
            endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(2);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'action', id: 1, text: "data_out = 'b11;", parentId: undefined, branch: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'action', id: 2, text: "data_out = 'b10;", parentId: undefined, branch: undefined });
        });

        it('Module with one always_ff block and basic statements', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_ff @(posedge clk) begin
                    data_out <= data_in;
                end
            endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('sequential');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'action', id: 1, text: "data_out <= data_in;", parentId: undefined, branch: undefined });
        });

        it('Module with always_comb and if statement', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    if (reset) begin
                        data_out = 'b00;
                    end
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(2);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'if', id: 1, text: "reset", branch: undefined, parentId: null });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'action', id: 2, text: "data_out = 'b00;", parentId: 1, branch: 'true' });
        });

        it('Module with always_comb and if-else statement', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    if (reset) begin
                        data_out = 'b00;
                    end else begin
                        data_out = data_in;
                    end
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(3);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'if', id: 1, text: "reset", branch: undefined, parentId: null });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'action', id: 2, text: "data_out = 'b00;", parentId: 1, branch: 'true' });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = data_in;", parentId: 1, branch: 'false' });
        });

        it('Module with always_comb and if-else-if statement', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    if (reset) begin
                        data_out = 'b00;
                    end else if (clk) begin
                        data_out = 'b01;
                    end
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(4);
            // If there is else if, the else if is visited first together with it's children and the initial parent if is visited last
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'if', id: 1, text: "reset", branch: undefined, parentId: null });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'if', id: 2, text: "clk", branch: 'false', parentId: 1 });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = 'b01;", parentId: 2, branch: 'true' });
            expect(diagramGenerationService.visitor.blocks[0].statements[3]).toStrictEqual({ elementType: 'action', id: 4, text: "data_out = 'b00;", parentId: 1, branch: 'true' });
        });

        it('Module with always_comb and nested if', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    if (reset) begin
                        if (clk) begin
                            data_out = 'b01;
                        end
                    end
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(3);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'if', id: 1, text: "reset", branch: undefined, parentId: null });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'if', id: 2, text: "clk", branch: 'true', parentId: 1 });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = 'b01;", parentId: 2, branch: 'true' });
        });

        it('Module with always_comb and case statement', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    case (data_in)
                        3'b000: data_out = 'b00;
                        3'b001: data_out = 'b01;
                        default: data_out = 'b10;
                    endcase
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(4);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'case', id: 1, text: "data_in", branch: undefined, parentId: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'action', id: 2, text: "data_out = 'b00;", parentId: 1, branch: '3\'b000' });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = 'b01;", parentId: 1, branch: '3\'b001' });
            expect(diagramGenerationService.visitor.blocks[0].statements[3]).toStrictEqual({ elementType: 'action', id: 4, text: "data_out = 'b10;", parentId: 1, branch: 'default' });
        });

        it('Module with always_comb and nested case statement', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    case (data_in)
                        3'b000: begin
                            case (reset)
                                1'b0: data_out = 'b00;
                                1'b1: data_out = 'b01;
                            endcase
                        end
                        3'b001: data_out = 'b01;
                        default: data_out = 'b10;
                    endcase
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(6);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'case', id: 1, text: "data_in", branch: undefined, parentId: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'case', id: 2, text: "reset", branch: '3\'b000', parentId: 1 });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = 'b00;", parentId: 2, branch: '1\'b0' });
            expect(diagramGenerationService.visitor.blocks[0].statements[3]).toStrictEqual({ elementType: 'action', id: 4, text: "data_out = 'b01;", parentId: 2, branch: '1\'b1' });
            expect(diagramGenerationService.visitor.blocks[0].statements[4]).toStrictEqual({ elementType: 'action', id: 5, text: "data_out = 'b01;", parentId: 1, branch: '3\'b001' });
            expect(diagramGenerationService.visitor.blocks[0].statements[5]).toStrictEqual({ elementType: 'action', id: 6, text: "data_out = 'b10;", parentId: 1, branch: 'default' });
        });

        it('Module with always_comb and case statement with if statement', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    case (data_in)
                        3'b000: begin
                            if (reset) begin
                                data_out = 'b00;
                            end
                        end
                        3'b001: data_out = 'b01;
                        default: data_out = 'b10;
                    endcase
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(5);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'case', id: 1, text: "data_in", branch: undefined, parentId: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'if', id: 2, text: "reset", branch: '3\'b000', parentId: 1 });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = 'b00;", parentId: 2, branch: 'true' });
            expect(diagramGenerationService.visitor.blocks[0].statements[3]).toStrictEqual({ elementType: 'action', id: 4, text: "data_out = 'b01;", parentId: 1, branch: '3\'b001' });
            expect(diagramGenerationService.visitor.blocks[0].statements[4]).toStrictEqual({ elementType: 'action', id: 5, text: "data_out = 'b10;", parentId: 1, branch: 'default' });
        });

        it('Module with always_comb and for loop', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    for (int i = 0; i < 3; i++) begin
                        data_out = data_in;
                        data_out = 'b01;
                    end
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(3);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'loop', id: 1, text: "for(inti=0; i<3; i++)", branch: undefined, parentId: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'action', id: 2, text: "data_out = data_in;", parentId: 1, branch: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = 'b01;", parentId: 1, branch: undefined });
        });

        it('Module with alway_comb and while loop', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    while (reset) begin
                        data_out = data_in;
                        data_out = 'b01;
                    end
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(3);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'loop', id: 1, text: "while(reset)", branch: undefined, parentId: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'action', id: 2, text: "data_out = data_in;", parentId: 1, branch: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = 'b01;", parentId: 1, branch: undefined });
        });

        it('Module with always_comb and nested for loops', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    for (integer i = 0; i < 3; i++) begin
                        for (integer j = 0; j < 2; j++) begin
                            data_out = data_in;
                            data_out = 'b01;
                        end
                    end
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(4);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'loop', id: 1, text: "for(integer i=0; i<3; i++)", branch: undefined, parentId: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'loop', id: 2, text: "for(integer j=0; j<2; j++)", branch: undefined, parentId: 1 });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = data_in;", parentId: 2, branch: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[3]).toStrictEqual({ elementType: 'action', id: 4, text: "data_out = 'b01;", parentId: 2, branch: undefined });
        });

        it('Module with always_comb and nested while loops', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    while (reset) begin
                        while (clk) begin
                            data_out = data_in;
                            data_out = 'b01;
                        end
                    end
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(4);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'loop', id: 1, text: "while(reset)", branch: undefined, parentId: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'loop', id: 2, text: "while(clk)", branch: undefined, parentId: 1 });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = data_in;", parentId: 2, branch: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[3]).toStrictEqual({ elementType: 'action', id: 4, text: "data_out = 'b01;", parentId: 2, branch: undefined });
        });

        it('Module with alway_comb and for loop with if statement', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    for (integer i = 0; i < 3; i++) begin
                        if (reset) begin
                            data_out = data_in;
                            data_out = 'b01;
                        end
                    end
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(4);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'loop', id: 1, text: "for(integer i=0; i<3; i++)", branch: undefined, parentId: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'if', id: 2, text: "reset", branch: undefined, parentId: 1 });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = data_in;", parentId: 2, branch: 'true' });
            expect(diagramGenerationService.visitor.blocks[0].statements[3]).toStrictEqual({ elementType: 'action', id: 4, text: "data_out = 'b01;", parentId: 2, branch: 'true' });
        });

        it('Module with always_comb and while loop with if statement', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    while (reset) begin
                        if (clk) begin
                            data_out = data_in;
                            data_out = 'b01;
                        end
                    end
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(4);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'loop', id: 1, text: "while(reset)", branch: undefined, parentId: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'if', id: 2, text: "clk", branch: undefined, parentId: 1 });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = data_in;", parentId: 2, branch: 'true' });
            expect(diagramGenerationService.visitor.blocks[0].statements[3]).toStrictEqual({ elementType: 'action', id: 4, text: "data_out = 'b01;", parentId: 2, branch: 'true' });
        });

        it('Module with always_comb and for loop with case statement', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    for (integer i = 0; i < 3; i++) begin
                        case (data_in)
                            3'b000: data_out = 'b00;
                            3'b001: data_out = 'b01;
                            default: data_out = 'b10;
                        endcase
                    end
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(5);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'loop', id: 1, text: "for(integer i=0; i<3; i++)", branch: undefined, parentId: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'case', id: 2, text: "data_in", branch: undefined, parentId: 1 });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = 'b00;", parentId: 2, branch: '3\'b000' });
            expect(diagramGenerationService.visitor.blocks[0].statements[3]).toStrictEqual({ elementType: 'action', id: 4, text: "data_out = 'b01;", parentId: 2, branch: '3\'b001' });
            expect(diagramGenerationService.visitor.blocks[0].statements[4]).toStrictEqual({ elementType: 'action', id: 5, text: "data_out = 'b10;", parentId: 2, branch: 'default' });
        });

        it('Module with always_comb and while loop with case statement', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output reg [2:0] data_out
            );
                always_comb begin
                    while (reset) begin
                        case (data_in)
                            3'b000: data_out = 'b00;
                            3'b001: data_out = 'b01;
                            default: data_out = 'b10;
                        endcase
                    end
                end
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(5);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'loop', id: 1, text: "while(reset)", branch: undefined, parentId: undefined });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'case', id: 2, text: "data_in", branch: undefined, parentId: 1 });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = 'b00;", parentId: 2, branch: '3\'b000' });
            expect(diagramGenerationService.visitor.blocks[0].statements[3]).toStrictEqual({ elementType: 'action', id: 4, text: "data_out = 'b01;", parentId: 2, branch: '3\'b001' });
            expect(diagramGenerationService.visitor.blocks[0].statements[4]).toStrictEqual({ elementType: 'action', id: 5, text: "data_out = 'b10;", parentId: 2, branch: 'default' });
        });

        it('Module with multiple always_comb blocks and basic statements', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                input wire [2:0] data_in,
                output wire [2:0] data_out
            );
                always_comb begin
                    data_out = data_in;
                end
                always_comb begin
                    data_out = 'b01;
                end
            endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(2);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'action', id: 1, text: "data_out = data_in;", parentId: undefined, branch: undefined });
            expect(diagramGenerationService.visitor.blocks[1].name).toBe('newBlock2');
            expect(diagramGenerationService.visitor.blocks[1].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[1].statements.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[1].statements[0]).toStrictEqual({ elementType: 'action', id: 2, text: "data_out = 'b01;", parentId: undefined, branch: undefined });
        });

        it('Module with multiple always_ff blocks and basic statements', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                output reg [2:0] data_out
            );
                always_ff @(posedge clk) begin
                    data_out <= 'b01;
                end
                always_ff @(posedge clk) begin
                    data_out <= 'b10;
                end
            endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            expect(diagramGenerationService.visitor.blocks.length).toBe(2);
            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('sequential');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'action', id: 1, text: "data_out <= 'b01;", parentId: undefined, branch: undefined });
            expect(diagramGenerationService.visitor.blocks[1].name).toBe('newBlock2');
            expect(diagramGenerationService.visitor.blocks[1].logic).toBe('sequential');
            expect(diagramGenerationService.visitor.blocks[1].statements.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[1].statements[0]).toStrictEqual({ elementType: 'action', id: 2, text: "data_out <= 'b10;", parentId: undefined, branch: undefined });
        });

        it('Module with one always_comb, always_ff and assign block and various statements', () => {
            const diagramGenerationService = new DiagramGenerationService();
            diagramGenerationService.formatPaper = false;

            const code = `module SimpleModule (
                input wire clk,
                input wire reset,
                output reg [2:0] data_out
            );
                assign data_out = 'b00;

                always_comb begin
                    if (reset) begin
                        data_out = 'b00;
                    end else begin
                        data_out = 'b01;
                    end
                end

                always_ff @(posedge clk) begin
                    data_out <= 'b10;
                end

                assign data_out = 'b11;
                endmodule`;

            diagramGenerationService.generateDiagram('tmp.sv', code);

            // Assign block is separated from visitor.blocks hence 2
            expect(diagramGenerationService.visitor.blocks.length).toBe(2);

            // Assign block
            expect(diagramGenerationService.visitor.assignBlock.statements.length).toBe(2);
            expect(diagramGenerationService.visitor.assignBlock.statements[0]).toStrictEqual({ elementType: 'action', id: 1, text: "data_out = 'b00;" });
            expect(diagramGenerationService.visitor.assignBlock.statements[1]).toStrictEqual({ elementType: 'action', id: 6, text: "data_out = 'b11;" });

            // Combinational block

            expect(diagramGenerationService.visitor.blocks[0].name).toBe('newBlock1');
            expect(diagramGenerationService.visitor.blocks[0].logic).toBe('combinational');
            expect(diagramGenerationService.visitor.blocks[0].statements.length).toBe(3);
            expect(diagramGenerationService.visitor.blocks[0].statements[0]).toStrictEqual({ elementType: 'if', id: 2, text: "reset", branch: undefined, parentId: null });
            expect(diagramGenerationService.visitor.blocks[0].statements[1]).toStrictEqual({ elementType: 'action', id: 3, text: "data_out = 'b00;", parentId: 2, branch: 'true' });
            expect(diagramGenerationService.visitor.blocks[0].statements[2]).toStrictEqual({ elementType: 'action', id: 4, text: "data_out = 'b01;", parentId: 2, branch: 'false' });

            // Sequential block
            expect(diagramGenerationService.visitor.blocks[1].name).toBe('newBlock2');
            expect(diagramGenerationService.visitor.blocks[1].logic).toBe('sequential');
            expect(diagramGenerationService.visitor.blocks[1].statements.length).toBe(1);
            expect(diagramGenerationService.visitor.blocks[1].statements[0]).toStrictEqual({ elementType: 'action', id: 5, text: "data_out <= 'b10;", parentId: undefined, branch: undefined });
        });

    });
})