const exampleCode = `
module FourBitAdder (
  input [3:0] A,
  input [3:0] B,
  output [3:0] sum
);

  // Input block A
  always_comb begin
      // Invert every bit of input A
      sum[0] = ~A[0];
      sum[1] = ~A[1];
      sum[2] = ~A[2];
      sum[3] = ~A[3];
  end

  // Input block B
  always_comb begin
      // Perform bitwise AND operation between B and its complement
      sum[0] = B[0] & ~B[0];
      sum[1] = B[1] & ~B[1];
      sum[2] = B[2] & ~B[2];
      sum[3] = B[3] & ~B[3];
  end

  // Adder block
  always_comb begin
      sum = A + B;
  end

  // Output block
  always @* begin
      // XOR every other bit of the sum
      sum[0] = sum[0] ^ sum[2];
      sum[1] = sum[1] ^ sum[3];
  end

endmodule
`;

export const exampleCode2 = `module out_of_range_detector (
   parameter FPGA_SYN = 1,
   parameter CONFzzjjlkl
)(
   // Clocks and Resets
   input  logic                  clk,
   input  logic                  clken,
   input  logic                  rst_n, // async active-low reset

   // =======================================================
   // ==             Denali RX CMD interface               ==
   // =======================================================
   input  logic                  denali_rx_command_valid,
   output logic                  denali_rx_command_queue_full,
   input  logic  [47:0]          denali_rx_address,
   input  logic  [MCID_SIZE-1:0] denali_rx_command_channel_id,
   input  logic  [1:0]           denali_rx_command_priority,
   input  logic  [6:0]           denali_rx_command_type,

   // =======================================================
   // ==             Denali TX CMD interface               ==
   // =======================================================
   output logic                  denali_tx_command_valid,
   input  logic                  denali_tx_command_queue_not_full,
   output logic  [47:0]          denali_tx_address,
   output logic  [MCID_SIZE-1:0] denali_tx_command_channel_id,
   output logic  [1:0]           denali_tx_command_priority,
   output logic  [6:0]           denali_tx_command_type,

   // =======================================================
   // ==             Denali RX RD_DATA interface           ==
   // =======================================================
   input  logic                  denali_rx_dataout_available,
   output logic                  denali_rx_dataout_accept,
   input  logic  [255:0]         denali_rx_dataout,
   input  logic  [MCID_SIZE-1:0] denali_rx_dataout_read_id,
   input  logic                  denali_rx_ecc_dataout_corrected,
   input  logic                  denali_rx_ecc_dataout_uncorrected,

   // =======================================================
   // ==             Denali TX RD_DATA interface           ==
   // =======================================================
   output logic                  denali_tx_dataout_available,
   input  logic                  denali_tx_dataout_accept,
   output logic  [255:0]         denali_tx_dataout,
   output logic  [MCID_SIZE-1:0] denali_tx_dataout_read_id,
   output logic                  denali_tx_ecc_dataout_corrected,
   output logic                  denali_tx_ecc_dataout_uncorrected
);

logic addr_out_of_range;
logic returning;

logic [1:0] cnt;

assign addr_out_of_range = denali_rx_address[45:44] == 2'b10;
assign returning = addr_out_of_range & denali_rx_command_valid;

assign denali_tx_command_valid      = ~addr_out_of_range & denali_rx_command_valid;
assign denali_rx_command_queue_full = addr_out_of_range ? ~(denali_tx_dataout_accept & (&cnt)) : ~denali_tx_command_queue_not_full;
assign denali_tx_address            = denali_rx_address;
assign denali_tx_command_channel_id = denali_rx_command_channel_id;
assign denali_tx_command_priority   = denali_rx_command_priority;
assign denali_tx_command_type       = denali_rx_command_type;

always_ff @(posedge clk, negedge rst_n) begin
   if (~rst_n) begin
      cnt <= 3'd0;
   end else begin
      if (denali_tx_dataout_accept) begin
         if (cnt) begin
            cnt <= cnt + 1'b1;
         end
      end

      if (~|cnt) begin
         cnt <= {1'b0, returning};
      end
   end
end

assign denali_tx_dataout_available       = returning | denali_rx_dataout_available;
assign denali_rx_dataout_accept          = denali_tx_dataout_accept & ~returning;
assign denali_tx_dataout                 = returning ? {224'h0, CONF} : denali_rx_dataout;
assign denali_tx_dataout_read_id         = returning ? denali_rx_command_channel_id : denali_rx_dataout_read_id;
assign denali_tx_ecc_dataout_corrected   = returning ? 1'b0 : denali_rx_ecc_dataout_corrected;
assign denali_tx_ecc_dataout_uncorrected = returning ? 1'b0 : denali_rx_ecc_dataout_uncorrected;

endmodule`;

export const exampleCode3 = `always_ff @(posedge clk, negedge rst_n) begin
  if (~rst_n) begin
     cnt <= 3'd0;
  end else begin
     if (denali_tx_dataout_accept) begin
        if (cnt) begin
           cnt <= cnt + 1'b1;
        end
     end

     if (~|cnt) begin
        cnt <= {1'b0, returning};
     end
  end
end`;

export const exampleCode4 = `// Define package 1 with some types and functions
package package_one;
    typedef struct {
        logic [7:0] data;
        logic [3:0] addr;
    } my_struct;

    function int add(int a, int b);
        return a + b;
    endfunction
endpackage

// Define package 2 with some types and functions
package package_two;
    typedef struct {
        logic [3:0] data;
        logic [1:0] flags;
    } status_struct;

    function int multiply(int a, int b);
        return a * b;
    endfunction
endpackage

// Define package 3 with some types and functions
package package_three;
    typedef struct {
        logic [15:0] data;
        logic [7:0] addr;
    } large_struct;

    function int subtract(int a, int b);
        return a - b;
    endfunction
endpackage

// Import the first package
import package_one::*;

// Import the second package
import package_two::*;

// Import the third package
import package_three::*;

// Define a module that uses types and functions from the packages
module ExampleModule;
    // Use types and functions from package one
    my_struct data_struct;
    int result_add = add(3, 5);

    // Use types and functions from package two
    status_struct status;
    int result_multiply = multiply(4, 6);

    // Use types and functions from package three
    large_struct large_data;
    int result_subtract = subtract(10, 3);

    initial begin
        $display("Result of add function: %d", result_add);
        $display("Result of multiply function: %d", result_multiply);
        $display("Result of subtract function: %d", result_subtract);
    end
endmodule`;

export const exampleCode5 = `module IncompleteSensitivityList (
   input wire clk,
   input wire reset,
   input wire enable,
   input wire [7:0] data,
   output reg [7:0] result
);

   // Incomplete sensitivity list
   always @(posedge clk) begin
       if (reset) begin
           result <= 0;
       end else if (enable) begin
           result <= data;
       end
   end

endmodule`;

export const exampleCode6 = `module completeSensitivityList (
   input wire clk,
   input wire reset,
   input wire enable,
   input wire [7:0] data,
   output reg [7:0] result
);

   // Complete sensitivity list
   always @(posedge clk or negedge reset or enable) begin
       if (reset) begin
           result <= 0;
       end else if (enable) begin
           result <= data;
       end
   end
endmodule`;

export const exampleCode7 = `module StateMachine(
   input logic [2:0] state,
   output logic [2:0] nstate
);
   always_comb begin
       if (state == 3'b001)
           nstate = 3'b010;
       else if (state == 3'b010)
           nstate = 3'b100;
       else if (state == 3'b100)
           nstate = 3'b001;

       // additional condition check
       if (nstate == 3'b001)
           nstate = 3'b000;
   end

endmodule

// line = typedef logic [1:0] state_t;
// line = typedef enum logic [1:0] {HOLD, LOAD, READY} states_t;

module StateMachines(
   input logic [2:0] state,
   output logic [2:0] nstate
);

   always_comb begin
       case (state)
           3'b001:
               nstate = 3'b010;
           !3'b010:
               nstate = 3'b100;
           3'b100:
               nstate = 3'b001;
           3'b101:
               nstate = 3'b101;
           default:
               nstate = 3'b000; // default state, you can change this according to your requirement
       endcase
   end

endmodule
ads

package chip_types;
 typedef enum logic [1:0] {HOLD, LOAD, READY} states_t;
endpackage

module chiper #(
 parameter param1,
 parameter param2
)(
 input logic clock,
 input logic reset_n
);
 import chip_types::*;
 states_t state_n;

 always_ff @(posedge clock or negedge reset_n) begin
   if (!reset_n) begin
     state_n <= bus_types.HOLD;
   end
 end

endmodule

module not_operator_example2();
 logic a = 1'b0;
 logic b = 1'b1;

 logic result_not_a = ~a; // Použitie operátora ~ (NOT) na signál a
 logic result_not_b = ~b; // Použitie operátora ~ (NOT) na signál b

 initial begin
   $display("NOT a = %b", result_not_a);
   $display("NOT b = %b", result_not_b);

   if (~a) begin
     $display("a je FALSE");
   end else begin
     $display("a je TRUE");
   end
 end
endmodule


module not_operator_example();
 logic a = 1'b0;
 logic [3:0] b = 4'b1100;

 initial begin
   if (~a) begin
     $display("a je FALSE");
   end else begin
     $display("a je TRUE");
   end

   if (!b) begin
     $display("b je TRUE");
   end else begin
     $display("b je FALSE");
   end
 end
endmodule



module my_module();

 // Jednobitová premenná
 logic a = 1'b0;

 // Viacbitová premenná
 logic [7:0] b = 8'b11001100;

 // Inicializácia výsledných premenných pre rôzne operácie
 logic [7:0] result_not_b;
 logic [7:0] result_and;
 logic [7:0] result_or;

 // Inicializácia premennej pre if-else príkaz
 logic check_value;

 // Generovanie výsledkov operácií
 assign result_not_b = ~b; // Použitie operátora ~ (NOT) na signál b
 assign result_and = a & b; // Použitie operátora & (AND) na signály a a b
 assign result_or = a | b; // Použitie operátora | (OR) na signály a a b

 initial begin
   $display("NOT b = %b", result_not_b);
   $display("a AND b = %b", result_and);
   $display("a OR b = %b", result_or);

   // Príklad použitia v if-else príkaze na jednotlivé bity viacbitovej premennej
   check_value = b[0];
   if (~check_value) begin
     $display("Najnižší bit b je FALSE");
   end else begin
     $display("Najnižší bit b je TRUE");
   end

   check_value = b[7];
   if (~check_value) begin
     $display("Najvyšší bit b je FALSE");
   end else begin
     $display("Najvyšší bit b je TRUE");
   end
 end

endmodule



module chip(
 input logic clock,
 input logic reset_n
);
 logic [7:0] counter = 8'b0;

 always_ff @(posedge clock, negedge reset_n) begin
   if (!reset_n) begin
     counter <= counter + 1;
   end
 end

 always_ff @(posedge clock) begin
   if (counter == 2) begin
     counter <= 0;
   end
 end


endmodule`;


export const exampleCode8 = `module ExampleModule(
   input logic [3:0] input_val,
   output logic [3:0] output_val
 );
 
     // Example using if-else conditions
     always_comb begin
         if (input_val == 4'b0000) begin
             output_val = 4'b1111;
         end else if (~input_val || input_val == 4'b0010) begin
             output_val = 4'b0011;
         end else if (input_val == 4'b0011) begin
             output_val = 4'b1100;
         end else begin
             output_val = 4'b0101;
         end
     end
 
     // Example using case statement
     always_comb begin
         case (input_val)
             4'b0000: output_val = 4'b1111;
             4'b0001, ~4'b0010: output_val = 4'b0011;
             4'b0011: output_val = 4'b1100;
         endcase
     end
 
 endmodule
`;

export const exampleCode9 = `module ExampleModule(
  input logic [3:0] input_val,
  output logic [3:0] output_val
);

    // Example using if-else conditions
    always_comb begin
        if (input_val == 4'b0000) begin
            output_val <= 4'b1111;
        end else if (input_val == 4'b0001 || input_val == 4'b0010) begin
            output_val = 4'b0011;
        end else if (input_val == 4'b0011) begin
            output_val = 4'b1100;
        end
    end

    // Example using case statement
    always_comb begin
        case (~input_val)
            4'b0000: output_val = 4'b1111;
            4'b0001, 4'b0010: output_val = 4'b0011;
            4'b0011: output_val = 4'b1100;
            default: output_val = 4'b0101;
        endcase
    end

endmodule`;

export const exampleCode10 = `module Incorrect_FlipFlop (
    input logic clk1,
    input logic clk2,
    input logic reset,
    input logic d,
    output logic q
 );
 
    always_ff @(posedge clk1 or posedge reset)
    if (reset)
        q <= 1'b0;
    else
        q <= d;
 
 endmodule`;

 export const exampleCode11 = `package chip_types;
 typedef enum logic [1:0] {HOLD, LOAD, READY} states_t;
endpackage

module chiper #(
 parameter param1,
 parameter param2
)(
 input logic clock,
 input logic reset_n
);
 import chip_types::*;
 states_t state_n;

 always_ff @(posedge clock or negedge reset_n) begin
   if (!reset_n) begin
     state_n <= bus_types.HOLD;
   end
 end

endmodule`;

export const exampleCode12 = `package chip_types;
typedef enum logic [1:0] {HOLD, LOAD, READY} states_t;
endpackage

package chip_types2;
typedef enum logic [1:0] {HOLD, LOAD, READY} states_t2;
endpackage

module chiper #(
parameter param1,
parameter param2
)(
input logic clock,
input logic reset_n
);
import chip_types::states_t;
import chip_types2::states_t2;
states_t state_n states_t2;

always_ff @(posedge clock or negedge reset_n) begin
  if (!reset_n) begin
    state_n <= bus_types.HOLD;
  end
end

endmodule`;