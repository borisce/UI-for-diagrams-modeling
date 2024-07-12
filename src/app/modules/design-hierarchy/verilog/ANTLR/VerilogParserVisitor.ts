// Generated from ./src/app/modules/state-machines/generate-diagram-from-code/verilog/grammar/VerilogParser.g4 by ANTLR 4.9.0-SNAPSHOT


import {ParseTreeVisitor} from "antlr4ts/tree/ParseTreeVisitor";

import {Library_textContext} from "./VerilogParser";
import {Library_descriptionContext} from "./VerilogParser";
import {Library_declarationContext} from "./VerilogParser";
import {Library_incdirContext} from "./VerilogParser";
import {Include_statementContext} from "./VerilogParser";
import {File_path_specContext} from "./VerilogParser";
import {Source_textContext} from "./VerilogParser";
import {DescriptionContext} from "./VerilogParser";
import {Module_declarationContext} from "./VerilogParser";
import {Module_keywordContext} from "./VerilogParser";
import {Module_parameter_port_listContext} from "./VerilogParser";
import {List_of_port_declarationsContext} from "./VerilogParser";
import {PortContext} from "./VerilogParser";
import {Port_implicitContext} from "./VerilogParser";
import {Port_explicitContext} from "./VerilogParser";
import {Port_expressionContext} from "./VerilogParser";
import {Port_referenceContext} from "./VerilogParser";
import {Port_declarationContext} from "./VerilogParser";
import {Module_itemContext} from "./VerilogParser";
import {Module_or_generate_itemContext} from "./VerilogParser";
import {Module_or_generate_item_declarationContext} from "./VerilogParser";
import {Parameter_overrideContext} from "./VerilogParser";
import {Config_declarationContext} from "./VerilogParser";
import {Design_statementContext} from "./VerilogParser";
import {Design_statement_itemContext} from "./VerilogParser";
import {Config_rule_statementContext} from "./VerilogParser";
import {Default_clauseContext} from "./VerilogParser";
import {Inst_clauseContext} from "./VerilogParser";
import {Inst_nameContext} from "./VerilogParser";
import {Cell_clauseContext} from "./VerilogParser";
import {Liblist_clauseContext} from "./VerilogParser";
import {Use_clauseContext} from "./VerilogParser";
import {Local_parameter_declarationContext} from "./VerilogParser";
import {Parameter_declarationContext} from "./VerilogParser";
import {Specparam_declarationContext} from "./VerilogParser";
import {Parameter_typeContext} from "./VerilogParser";
import {Inout_declarationContext} from "./VerilogParser";
import {Input_declarationContext} from "./VerilogParser";
import {Output_declarationContext} from "./VerilogParser";
import {Event_declarationContext} from "./VerilogParser";
import {Integer_declarationContext} from "./VerilogParser";
import {Net_declarationContext} from "./VerilogParser";
import {Real_declarationContext} from "./VerilogParser";
import {Realtime_declarationContext} from "./VerilogParser";
import {Reg_declarationContext} from "./VerilogParser";
import {Time_declarationContext} from "./VerilogParser";
import {Net_typeContext} from "./VerilogParser";
import {Output_variable_typeContext} from "./VerilogParser";
import {Real_typeContext} from "./VerilogParser";
import {Variable_typeContext} from "./VerilogParser";
import {Drive_strengthContext} from "./VerilogParser";
import {Strength0Context} from "./VerilogParser";
import {Strength1Context} from "./VerilogParser";
import {Charge_strengthContext} from "./VerilogParser";
import {Delay3Context} from "./VerilogParser";
import {Delay2Context} from "./VerilogParser";
import {Delay_valueContext} from "./VerilogParser";
import {List_of_defparam_assignmentsContext} from "./VerilogParser";
import {List_of_event_identifiersContext} from "./VerilogParser";
import {Event_idContext} from "./VerilogParser";
import {List_of_net_decl_assignmentsContext} from "./VerilogParser";
import {List_of_net_identifiersContext} from "./VerilogParser";
import {Net_idContext} from "./VerilogParser";
import {List_of_param_assignmentsContext} from "./VerilogParser";
import {List_of_port_identifiersContext} from "./VerilogParser";
import {List_of_real_identifiersContext} from "./VerilogParser";
import {List_of_specparam_assignmentsContext} from "./VerilogParser";
import {List_of_variable_identifiersContext} from "./VerilogParser";
import {List_of_variable_port_identifiersContext} from "./VerilogParser";
import {Var_port_idContext} from "./VerilogParser";
import {Defparam_assignmentContext} from "./VerilogParser";
import {Net_decl_assignmentContext} from "./VerilogParser";
import {Param_assignmentContext} from "./VerilogParser";
import {Specparam_assignmentContext} from "./VerilogParser";
import {Pulse_control_specparamContext} from "./VerilogParser";
import {Error_limit_valueContext} from "./VerilogParser";
import {Reject_limit_valueContext} from "./VerilogParser";
import {Limit_valueContext} from "./VerilogParser";
import {DimensionContext} from "./VerilogParser";
import {Range_Context} from "./VerilogParser";
import {Function_declarationContext} from "./VerilogParser";
import {Function_item_declarationContext} from "./VerilogParser";
import {Function_port_listContext} from "./VerilogParser";
import {Func_port_itemContext} from "./VerilogParser";
import {Function_range_or_typeContext} from "./VerilogParser";
import {Task_declarationContext} from "./VerilogParser";
import {Task_item_declarationContext} from "./VerilogParser";
import {Task_port_listContext} from "./VerilogParser";
import {Task_port_itemContext} from "./VerilogParser";
import {Tf_input_declarationContext} from "./VerilogParser";
import {Tf_output_declarationContext} from "./VerilogParser";
import {Tf_inout_declarationContext} from "./VerilogParser";
import {Task_port_typeContext} from "./VerilogParser";
import {Block_item_declarationContext} from "./VerilogParser";
import {List_of_block_variable_identifiersContext} from "./VerilogParser";
import {List_of_block_real_identifiersContext} from "./VerilogParser";
import {Block_variable_typeContext} from "./VerilogParser";
import {Block_real_typeContext} from "./VerilogParser";
import {Gate_instantiationContext} from "./VerilogParser";
import {Cmos_switch_instanceContext} from "./VerilogParser";
import {Enable_gate_instanceContext} from "./VerilogParser";
import {Mos_switch_instanceContext} from "./VerilogParser";
import {N_input_gate_instanceContext} from "./VerilogParser";
import {N_output_gate_instanceContext} from "./VerilogParser";
import {Pass_switch_instanceContext} from "./VerilogParser";
import {Pass_enable_switch_instanceContext} from "./VerilogParser";
import {Pull_gate_instanceContext} from "./VerilogParser";
import {Name_of_gate_instanceContext} from "./VerilogParser";
import {Pulldown_strengthContext} from "./VerilogParser";
import {Pullup_strengthContext} from "./VerilogParser";
import {Enable_terminalContext} from "./VerilogParser";
import {Inout_terminalContext} from "./VerilogParser";
import {Input_terminalContext} from "./VerilogParser";
import {Ncontrol_terminalContext} from "./VerilogParser";
import {Output_terminalContext} from "./VerilogParser";
import {Pcontrol_terminalContext} from "./VerilogParser";
import {Cmos_switchtypeContext} from "./VerilogParser";
import {Enable_gatetypeContext} from "./VerilogParser";
import {Mos_switchtypeContext} from "./VerilogParser";
import {N_input_gatetypeContext} from "./VerilogParser";
import {N_output_gatetypeContext} from "./VerilogParser";
import {Pass_en_switchtypeContext} from "./VerilogParser";
import {Pass_switchtypeContext} from "./VerilogParser";
import {Module_instantiationContext} from "./VerilogParser";
import {Parameter_value_assignmentContext} from "./VerilogParser";
import {List_of_parameter_assignmentsContext} from "./VerilogParser";
import {Ordered_parameter_assignmentContext} from "./VerilogParser";
import {Named_parameter_assignmentContext} from "./VerilogParser";
import {Module_instanceContext} from "./VerilogParser";
import {Name_of_module_instanceContext} from "./VerilogParser";
import {List_of_port_connectionsContext} from "./VerilogParser";
import {Ordered_port_connectionContext} from "./VerilogParser";
import {Named_port_connectionContext} from "./VerilogParser";
import {Generate_regionContext} from "./VerilogParser";
import {Genvar_declarationContext} from "./VerilogParser";
import {List_of_genvar_identifiersContext} from "./VerilogParser";
import {Loop_generate_constructContext} from "./VerilogParser";
import {Genvar_initializationContext} from "./VerilogParser";
import {Genvar_expressionContext} from "./VerilogParser";
import {Genvar_iterationContext} from "./VerilogParser";
import {Conditional_generate_constructContext} from "./VerilogParser";
import {If_generate_constructContext} from "./VerilogParser";
import {Case_generate_constructContext} from "./VerilogParser";
import {Case_generate_itemContext} from "./VerilogParser";
import {Generate_blockContext} from "./VerilogParser";
import {Generate_block_nameContext} from "./VerilogParser";
import {Generate_block_or_nullContext} from "./VerilogParser";
import {Udp_declarationContext} from "./VerilogParser";
import {Udp_port_listContext} from "./VerilogParser";
import {Udp_declaration_port_listContext} from "./VerilogParser";
import {Udp_port_declarationContext} from "./VerilogParser";
import {Udp_output_declarationContext} from "./VerilogParser";
import {Udp_input_declarationContext} from "./VerilogParser";
import {Udp_reg_declarationContext} from "./VerilogParser";
import {Udp_bodyContext} from "./VerilogParser";
import {Combinational_bodyContext} from "./VerilogParser";
import {Combinational_entryContext} from "./VerilogParser";
import {Sequential_bodyContext} from "./VerilogParser";
import {Udp_initial_statementContext} from "./VerilogParser";
import {Init_valContext} from "./VerilogParser";
import {Sequential_entryContext} from "./VerilogParser";
import {Seq_input_listContext} from "./VerilogParser";
import {Level_input_listContext} from "./VerilogParser";
import {Edge_input_listContext} from "./VerilogParser";
import {Edge_indicatorContext} from "./VerilogParser";
import {Current_stateContext} from "./VerilogParser";
import {Next_stateContext} from "./VerilogParser";
import {Output_symbolContext} from "./VerilogParser";
import {Level_symbolContext} from "./VerilogParser";
import {Edge_symbolContext} from "./VerilogParser";
import {Udp_instantiationContext} from "./VerilogParser";
import {Udp_instanceContext} from "./VerilogParser";
import {Name_of_udp_instanceContext} from "./VerilogParser";
import {Continuous_assignContext} from "./VerilogParser";
import {List_of_net_assignmentsContext} from "./VerilogParser";
import {Net_assignmentContext} from "./VerilogParser";
import {Initial_constructContext} from "./VerilogParser";
import {Always_constructContext} from "./VerilogParser";
import {Blocking_assignmentContext} from "./VerilogParser";
import {Nonblocking_assignmentContext} from "./VerilogParser";
import {Procedural_continuous_assignmentsContext} from "./VerilogParser";
import {Variable_assignmentContext} from "./VerilogParser";
import {Par_blockContext} from "./VerilogParser";
import {Block_nameContext} from "./VerilogParser";
import {Seq_blockContext} from "./VerilogParser";
import {StatementContext} from "./VerilogParser";
import {Statement_or_nullContext} from "./VerilogParser";
import {Function_statementContext} from "./VerilogParser";
import {Delay_controlContext} from "./VerilogParser";
import {Delay_or_event_controlContext} from "./VerilogParser";
import {Disable_statementContext} from "./VerilogParser";
import {Event_controlContext} from "./VerilogParser";
import {Event_triggerContext} from "./VerilogParser";
import {Event_expressionContext} from "./VerilogParser";
import {Procedural_timing_controlContext} from "./VerilogParser";
import {Procedural_timing_control_statementContext} from "./VerilogParser";
import {Wait_statementContext} from "./VerilogParser";
import {Conditional_statementContext} from "./VerilogParser";
import {Case_statementContext} from "./VerilogParser";
import {Case_itemContext} from "./VerilogParser";
import {Loop_statementContext} from "./VerilogParser";
import {System_task_enableContext} from "./VerilogParser";
import {Sys_task_en_port_listContext} from "./VerilogParser";
import {Sys_task_en_port_itemContext} from "./VerilogParser";
import {Task_enableContext} from "./VerilogParser";
import {Task_en_port_listContext} from "./VerilogParser";
import {Specify_blockContext} from "./VerilogParser";
import {Specify_itemContext} from "./VerilogParser";
import {Pulsestyle_declarationContext} from "./VerilogParser";
import {Showcancelled_declarationContext} from "./VerilogParser";
import {Path_declarationContext} from "./VerilogParser";
import {Simple_path_declarationContext} from "./VerilogParser";
import {Parallel_path_descriptionContext} from "./VerilogParser";
import {Full_path_descriptionContext} from "./VerilogParser";
import {List_of_path_inputsContext} from "./VerilogParser";
import {List_of_path_outputsContext} from "./VerilogParser";
import {Specify_input_terminal_descriptorContext} from "./VerilogParser";
import {Specify_output_terminal_descriptorContext} from "./VerilogParser";
import {Input_identifierContext} from "./VerilogParser";
import {Output_identifierContext} from "./VerilogParser";
import {Path_delay_valueContext} from "./VerilogParser";
import {List_of_path_delay_expressionsContext} from "./VerilogParser";
import {T_path_delay_expressionContext} from "./VerilogParser";
import {Trise_path_delay_expressionContext} from "./VerilogParser";
import {Tfall_path_delay_expressionContext} from "./VerilogParser";
import {Tz_path_delay_expressionContext} from "./VerilogParser";
import {T01_path_delay_expressionContext} from "./VerilogParser";
import {T10_path_delay_expressionContext} from "./VerilogParser";
import {T0z_path_delay_expressionContext} from "./VerilogParser";
import {Tz1_path_delay_expressionContext} from "./VerilogParser";
import {T1z_path_delay_expressionContext} from "./VerilogParser";
import {Tz0_path_delay_expressionContext} from "./VerilogParser";
import {T0x_path_delay_expressionContext} from "./VerilogParser";
import {Tx1_path_delay_expressionContext} from "./VerilogParser";
import {T1x_path_delay_expressionContext} from "./VerilogParser";
import {Tx0_path_delay_expressionContext} from "./VerilogParser";
import {Txz_path_delay_expressionContext} from "./VerilogParser";
import {Tzx_path_delay_expressionContext} from "./VerilogParser";
import {Path_delay_expressionContext} from "./VerilogParser";
import {Edge_sensitive_path_declarationContext} from "./VerilogParser";
import {Parallel_edge_sensitive_path_descriptionContext} from "./VerilogParser";
import {Full_edge_sensitive_path_descriptionContext} from "./VerilogParser";
import {Data_source_expressionContext} from "./VerilogParser";
import {Edge_identifierContext} from "./VerilogParser";
import {State_dependent_path_declarationContext} from "./VerilogParser";
import {Polarity_operatorContext} from "./VerilogParser";
import {System_timing_checkContext} from "./VerilogParser";
import {Setup_timing_checkContext} from "./VerilogParser";
import {Notifier_optContext} from "./VerilogParser";
import {Hold_timing_checkContext} from "./VerilogParser";
import {Setuphold_timing_checkContext} from "./VerilogParser";
import {Timing_check_optContext} from "./VerilogParser";
import {Stamptime_cond_optContext} from "./VerilogParser";
import {Checktime_cond_optContext} from "./VerilogParser";
import {Delayed_ref_optContext} from "./VerilogParser";
import {Delayed_data_optContext} from "./VerilogParser";
import {Recovery_timing_checkContext} from "./VerilogParser";
import {Removal_timing_checkContext} from "./VerilogParser";
import {Recrem_timing_checkContext} from "./VerilogParser";
import {Skew_timing_checkContext} from "./VerilogParser";
import {Timeskew_timing_checkContext} from "./VerilogParser";
import {Skew_timing_check_optContext} from "./VerilogParser";
import {Event_based_flag_optContext} from "./VerilogParser";
import {Remain_active_flag_optContext} from "./VerilogParser";
import {Fullskew_timing_checkContext} from "./VerilogParser";
import {Period_timing_checkContext} from "./VerilogParser";
import {Width_timing_checkContext} from "./VerilogParser";
import {Threshold_optContext} from "./VerilogParser";
import {Nochange_timing_checkContext} from "./VerilogParser";
import {Checktime_conditionContext} from "./VerilogParser";
import {Controlled_reference_eventContext} from "./VerilogParser";
import {Data_eventContext} from "./VerilogParser";
import {Delayed_dataContext} from "./VerilogParser";
import {Delayed_referenceContext} from "./VerilogParser";
import {End_edge_offsetContext} from "./VerilogParser";
import {Event_based_flagContext} from "./VerilogParser";
import {NotifierContext} from "./VerilogParser";
import {Reference_eventContext} from "./VerilogParser";
import {Remain_active_flagContext} from "./VerilogParser";
import {Stamptime_conditionContext} from "./VerilogParser";
import {Start_edge_offsetContext} from "./VerilogParser";
import {ThresholdContext} from "./VerilogParser";
import {Timing_check_limitContext} from "./VerilogParser";
import {Timing_check_eventContext} from "./VerilogParser";
import {Controlled_timing_check_eventContext} from "./VerilogParser";
import {Timing_check_event_controlContext} from "./VerilogParser";
import {Specify_terminal_descriptorContext} from "./VerilogParser";
import {Edge_control_specifierContext} from "./VerilogParser";
import {Edge_descriptorContext} from "./VerilogParser";
import {Timing_check_conditionContext} from "./VerilogParser";
import {Scalar_timing_check_conditionContext} from "./VerilogParser";
import {Scalar_constantContext} from "./VerilogParser";
import {ConcatenationContext} from "./VerilogParser";
import {Constant_concatenationContext} from "./VerilogParser";
import {Constant_multiple_concatenationContext} from "./VerilogParser";
import {Module_path_concatenationContext} from "./VerilogParser";
import {Module_path_multiple_concatenationContext} from "./VerilogParser";
import {Multiple_concatenationContext} from "./VerilogParser";
import {Constant_function_callContext} from "./VerilogParser";
import {Constant_system_function_callContext} from "./VerilogParser";
import {Function_callContext} from "./VerilogParser";
import {System_function_callContext} from "./VerilogParser";
import {Sys_func_call_port_listContext} from "./VerilogParser";
import {Base_expressionContext} from "./VerilogParser";
import {Constant_base_expressionContext} from "./VerilogParser";
import {Constant_expressionContext} from "./VerilogParser";
import {Constant_mintypmax_expressionContext} from "./VerilogParser";
import {Constant_range_expressionContext} from "./VerilogParser";
import {Dimension_constant_expressionContext} from "./VerilogParser";
import {ExpressionContext} from "./VerilogParser";
import {Lsb_constant_expressionContext} from "./VerilogParser";
import {Mintypmax_expressionContext} from "./VerilogParser";
import {Module_path_expressionContext} from "./VerilogParser";
import {Module_path_mintypmax_expressionContext} from "./VerilogParser";
import {Msb_constant_expressionContext} from "./VerilogParser";
import {Range_expressionContext} from "./VerilogParser";
import {Width_constant_expressionContext} from "./VerilogParser";
import {Constant_primaryContext} from "./VerilogParser";
import {Module_path_primaryContext} from "./VerilogParser";
import {PrimaryContext} from "./VerilogParser";
import {Select_Context} from "./VerilogParser";
import {Bit_selectContext} from "./VerilogParser";
import {Net_lvalueContext} from "./VerilogParser";
import {Const_selectContext} from "./VerilogParser";
import {Const_bit_selectContext} from "./VerilogParser";
import {Variable_lvalueContext} from "./VerilogParser";
import {Unary_operatorContext} from "./VerilogParser";
import {Unary_module_path_operatorContext} from "./VerilogParser";
import {NumberContext} from "./VerilogParser";
import {Real_numberContext} from "./VerilogParser";
import {Decimal_numberContext} from "./VerilogParser";
import {Binary_numberContext} from "./VerilogParser";
import {Octal_numberContext} from "./VerilogParser";
import {Hex_numberContext} from "./VerilogParser";
import {SizeContext} from "./VerilogParser";
import {Fixed_point_numberContext} from "./VerilogParser";
import {Exponential_numberContext} from "./VerilogParser";
import {Unsigned_numberContext} from "./VerilogParser";
import {Decimal_valueContext} from "./VerilogParser";
import {Binary_valueContext} from "./VerilogParser";
import {Octal_valueContext} from "./VerilogParser";
import {Hex_valueContext} from "./VerilogParser";
import {Decimal_baseContext} from "./VerilogParser";
import {Binary_baseContext} from "./VerilogParser";
import {Octal_baseContext} from "./VerilogParser";
import {Hex_baseContext} from "./VerilogParser";
import {String_Context} from "./VerilogParser";
import {Attribute_instanceContext} from "./VerilogParser";
import {Attr_specContext} from "./VerilogParser";
import {Attr_nameContext} from "./VerilogParser";
import {Block_identifierContext} from "./VerilogParser";
import {Cell_identifierContext} from "./VerilogParser";
import {Config_identifierContext} from "./VerilogParser";
import {Escaped_identifierContext} from "./VerilogParser";
import {Event_identifierContext} from "./VerilogParser";
import {Function_identifierContext} from "./VerilogParser";
import {Gate_instance_identifierContext} from "./VerilogParser";
import {Generate_block_identifierContext} from "./VerilogParser";
import {Genvar_identifierContext} from "./VerilogParser";
import {Hierarchical_identifierContext} from "./VerilogParser";
import {Hier_refContext} from "./VerilogParser";
import {IdentifierContext} from "./VerilogParser";
import {Input_port_identifierContext} from "./VerilogParser";
import {Instance_identifierContext} from "./VerilogParser";
import {Library_identifierContext} from "./VerilogParser";
import {Module_identifierContext} from "./VerilogParser";
import {Module_instance_identifierContext} from "./VerilogParser";
import {Net_identifierContext} from "./VerilogParser";
import {Output_port_identifierContext} from "./VerilogParser";
import {Parameter_identifierContext} from "./VerilogParser";
import {Port_identifierContext} from "./VerilogParser";
import {Real_identifierContext} from "./VerilogParser";
import {Simple_identifierContext} from "./VerilogParser";
import {Specparam_identifierContext} from "./VerilogParser";
import {System_function_identifierContext} from "./VerilogParser";
import {System_task_identifierContext} from "./VerilogParser";
import {Task_identifierContext} from "./VerilogParser";
import {Terminal_identifierContext} from "./VerilogParser";
import {Topmodule_identifierContext} from "./VerilogParser";
import {Udp_identifierContext} from "./VerilogParser";
import {Udp_instance_identifierContext} from "./VerilogParser";
import {Variable_identifierContext} from "./VerilogParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `VerilogParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface VerilogParserVisitor<Result> extends ParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by `VerilogParser.library_text`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLibrary_text?: (ctx: Library_textContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.library_description`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLibrary_description?: (ctx: Library_descriptionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.library_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLibrary_declaration?: (ctx: Library_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.library_incdir`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLibrary_incdir?: (ctx: Library_incdirContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.include_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInclude_statement?: (ctx: Include_statementContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.file_path_spec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFile_path_spec?: (ctx: File_path_specContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.source_text`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSource_text?: (ctx: Source_textContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.description`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDescription?: (ctx: DescriptionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_declaration?: (ctx: Module_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_keyword`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_keyword?: (ctx: Module_keywordContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_parameter_port_list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_parameter_port_list?: (ctx: Module_parameter_port_listContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_port_declarations`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_port_declarations?: (ctx: List_of_port_declarationsContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.port`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPort?: (ctx: PortContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.port_implicit`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPort_implicit?: (ctx: Port_implicitContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.port_explicit`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPort_explicit?: (ctx: Port_explicitContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.port_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPort_expression?: (ctx: Port_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.port_reference`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPort_reference?: (ctx: Port_referenceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.port_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPort_declaration?: (ctx: Port_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_item`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_item?: (ctx: Module_itemContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_or_generate_item`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_or_generate_item?: (ctx: Module_or_generate_itemContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_or_generate_item_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_or_generate_item_declaration?: (ctx: Module_or_generate_item_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.parameter_override`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParameter_override?: (ctx: Parameter_overrideContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.config_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConfig_declaration?: (ctx: Config_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.design_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDesign_statement?: (ctx: Design_statementContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.design_statement_item`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDesign_statement_item?: (ctx: Design_statement_itemContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.config_rule_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConfig_rule_statement?: (ctx: Config_rule_statementContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.default_clause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDefault_clause?: (ctx: Default_clauseContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.inst_clause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInst_clause?: (ctx: Inst_clauseContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.inst_name`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInst_name?: (ctx: Inst_nameContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.cell_clause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCell_clause?: (ctx: Cell_clauseContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.liblist_clause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLiblist_clause?: (ctx: Liblist_clauseContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.use_clause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUse_clause?: (ctx: Use_clauseContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.local_parameter_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLocal_parameter_declaration?: (ctx: Local_parameter_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.parameter_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParameter_declaration?: (ctx: Parameter_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.specparam_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSpecparam_declaration?: (ctx: Specparam_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.parameter_type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParameter_type?: (ctx: Parameter_typeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.inout_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInout_declaration?: (ctx: Inout_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.input_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInput_declaration?: (ctx: Input_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.output_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOutput_declaration?: (ctx: Output_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.event_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEvent_declaration?: (ctx: Event_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.integer_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInteger_declaration?: (ctx: Integer_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.net_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNet_declaration?: (ctx: Net_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.real_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReal_declaration?: (ctx: Real_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.realtime_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRealtime_declaration?: (ctx: Realtime_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.reg_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReg_declaration?: (ctx: Reg_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.time_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTime_declaration?: (ctx: Time_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.net_type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNet_type?: (ctx: Net_typeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.output_variable_type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOutput_variable_type?: (ctx: Output_variable_typeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.real_type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReal_type?: (ctx: Real_typeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.variable_type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitVariable_type?: (ctx: Variable_typeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.drive_strength`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDrive_strength?: (ctx: Drive_strengthContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.strength0`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStrength0?: (ctx: Strength0Context) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.strength1`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStrength1?: (ctx: Strength1Context) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.charge_strength`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCharge_strength?: (ctx: Charge_strengthContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.delay3`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDelay3?: (ctx: Delay3Context) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.delay2`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDelay2?: (ctx: Delay2Context) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.delay_value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDelay_value?: (ctx: Delay_valueContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_defparam_assignments`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_defparam_assignments?: (ctx: List_of_defparam_assignmentsContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_event_identifiers`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_event_identifiers?: (ctx: List_of_event_identifiersContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.event_id`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEvent_id?: (ctx: Event_idContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_net_decl_assignments`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_net_decl_assignments?: (ctx: List_of_net_decl_assignmentsContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_net_identifiers`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_net_identifiers?: (ctx: List_of_net_identifiersContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.net_id`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNet_id?: (ctx: Net_idContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_param_assignments`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_param_assignments?: (ctx: List_of_param_assignmentsContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_port_identifiers`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_port_identifiers?: (ctx: List_of_port_identifiersContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_real_identifiers`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_real_identifiers?: (ctx: List_of_real_identifiersContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_specparam_assignments`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_specparam_assignments?: (ctx: List_of_specparam_assignmentsContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_variable_identifiers`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_variable_identifiers?: (ctx: List_of_variable_identifiersContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_variable_port_identifiers`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_variable_port_identifiers?: (ctx: List_of_variable_port_identifiersContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.var_port_id`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitVar_port_id?: (ctx: Var_port_idContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.defparam_assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDefparam_assignment?: (ctx: Defparam_assignmentContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.net_decl_assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNet_decl_assignment?: (ctx: Net_decl_assignmentContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.param_assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParam_assignment?: (ctx: Param_assignmentContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.specparam_assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSpecparam_assignment?: (ctx: Specparam_assignmentContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.pulse_control_specparam`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPulse_control_specparam?: (ctx: Pulse_control_specparamContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.error_limit_value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitError_limit_value?: (ctx: Error_limit_valueContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.reject_limit_value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReject_limit_value?: (ctx: Reject_limit_valueContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.limit_value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLimit_value?: (ctx: Limit_valueContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.dimension`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDimension?: (ctx: DimensionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.range_`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRange_?: (ctx: Range_Context) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.function_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunction_declaration?: (ctx: Function_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.function_item_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunction_item_declaration?: (ctx: Function_item_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.function_port_list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunction_port_list?: (ctx: Function_port_listContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.func_port_item`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunc_port_item?: (ctx: Func_port_itemContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.function_range_or_type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunction_range_or_type?: (ctx: Function_range_or_typeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.task_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTask_declaration?: (ctx: Task_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.task_item_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTask_item_declaration?: (ctx: Task_item_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.task_port_list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTask_port_list?: (ctx: Task_port_listContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.task_port_item`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTask_port_item?: (ctx: Task_port_itemContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.tf_input_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTf_input_declaration?: (ctx: Tf_input_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.tf_output_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTf_output_declaration?: (ctx: Tf_output_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.tf_inout_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTf_inout_declaration?: (ctx: Tf_inout_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.task_port_type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTask_port_type?: (ctx: Task_port_typeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.block_item_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBlock_item_declaration?: (ctx: Block_item_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_block_variable_identifiers`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_block_variable_identifiers?: (ctx: List_of_block_variable_identifiersContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_block_real_identifiers`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_block_real_identifiers?: (ctx: List_of_block_real_identifiersContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.block_variable_type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBlock_variable_type?: (ctx: Block_variable_typeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.block_real_type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBlock_real_type?: (ctx: Block_real_typeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.gate_instantiation`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGate_instantiation?: (ctx: Gate_instantiationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.cmos_switch_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCmos_switch_instance?: (ctx: Cmos_switch_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.enable_gate_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnable_gate_instance?: (ctx: Enable_gate_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.mos_switch_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMos_switch_instance?: (ctx: Mos_switch_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.n_input_gate_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitN_input_gate_instance?: (ctx: N_input_gate_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.n_output_gate_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitN_output_gate_instance?: (ctx: N_output_gate_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.pass_switch_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPass_switch_instance?: (ctx: Pass_switch_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.pass_enable_switch_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPass_enable_switch_instance?: (ctx: Pass_enable_switch_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.pull_gate_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPull_gate_instance?: (ctx: Pull_gate_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.name_of_gate_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitName_of_gate_instance?: (ctx: Name_of_gate_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.pulldown_strength`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPulldown_strength?: (ctx: Pulldown_strengthContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.pullup_strength`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPullup_strength?: (ctx: Pullup_strengthContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.enable_terminal`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnable_terminal?: (ctx: Enable_terminalContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.inout_terminal`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInout_terminal?: (ctx: Inout_terminalContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.input_terminal`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInput_terminal?: (ctx: Input_terminalContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.ncontrol_terminal`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNcontrol_terminal?: (ctx: Ncontrol_terminalContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.output_terminal`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOutput_terminal?: (ctx: Output_terminalContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.pcontrol_terminal`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPcontrol_terminal?: (ctx: Pcontrol_terminalContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.cmos_switchtype`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCmos_switchtype?: (ctx: Cmos_switchtypeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.enable_gatetype`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnable_gatetype?: (ctx: Enable_gatetypeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.mos_switchtype`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMos_switchtype?: (ctx: Mos_switchtypeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.n_input_gatetype`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitN_input_gatetype?: (ctx: N_input_gatetypeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.n_output_gatetype`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitN_output_gatetype?: (ctx: N_output_gatetypeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.pass_en_switchtype`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPass_en_switchtype?: (ctx: Pass_en_switchtypeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.pass_switchtype`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPass_switchtype?: (ctx: Pass_switchtypeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_instantiation`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_instantiation?: (ctx: Module_instantiationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.parameter_value_assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParameter_value_assignment?: (ctx: Parameter_value_assignmentContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_parameter_assignments`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_parameter_assignments?: (ctx: List_of_parameter_assignmentsContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.ordered_parameter_assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOrdered_parameter_assignment?: (ctx: Ordered_parameter_assignmentContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.named_parameter_assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNamed_parameter_assignment?: (ctx: Named_parameter_assignmentContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_instance?: (ctx: Module_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.name_of_module_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitName_of_module_instance?: (ctx: Name_of_module_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_port_connections`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_port_connections?: (ctx: List_of_port_connectionsContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.ordered_port_connection`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOrdered_port_connection?: (ctx: Ordered_port_connectionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.named_port_connection`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNamed_port_connection?: (ctx: Named_port_connectionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.generate_region`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGenerate_region?: (ctx: Generate_regionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.genvar_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGenvar_declaration?: (ctx: Genvar_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_genvar_identifiers`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_genvar_identifiers?: (ctx: List_of_genvar_identifiersContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.loop_generate_construct`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLoop_generate_construct?: (ctx: Loop_generate_constructContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.genvar_initialization`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGenvar_initialization?: (ctx: Genvar_initializationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.genvar_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGenvar_expression?: (ctx: Genvar_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.genvar_iteration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGenvar_iteration?: (ctx: Genvar_iterationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.conditional_generate_construct`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConditional_generate_construct?: (ctx: Conditional_generate_constructContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.if_generate_construct`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIf_generate_construct?: (ctx: If_generate_constructContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.case_generate_construct`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCase_generate_construct?: (ctx: Case_generate_constructContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.case_generate_item`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCase_generate_item?: (ctx: Case_generate_itemContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.generate_block`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGenerate_block?: (ctx: Generate_blockContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.generate_block_name`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGenerate_block_name?: (ctx: Generate_block_nameContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.generate_block_or_null`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGenerate_block_or_null?: (ctx: Generate_block_or_nullContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_declaration?: (ctx: Udp_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_port_list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_port_list?: (ctx: Udp_port_listContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_declaration_port_list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_declaration_port_list?: (ctx: Udp_declaration_port_listContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_port_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_port_declaration?: (ctx: Udp_port_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_output_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_output_declaration?: (ctx: Udp_output_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_input_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_input_declaration?: (ctx: Udp_input_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_reg_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_reg_declaration?: (ctx: Udp_reg_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_body`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_body?: (ctx: Udp_bodyContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.combinational_body`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCombinational_body?: (ctx: Combinational_bodyContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.combinational_entry`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCombinational_entry?: (ctx: Combinational_entryContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.sequential_body`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSequential_body?: (ctx: Sequential_bodyContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_initial_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_initial_statement?: (ctx: Udp_initial_statementContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.init_val`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInit_val?: (ctx: Init_valContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.sequential_entry`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSequential_entry?: (ctx: Sequential_entryContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.seq_input_list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSeq_input_list?: (ctx: Seq_input_listContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.level_input_list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLevel_input_list?: (ctx: Level_input_listContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.edge_input_list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEdge_input_list?: (ctx: Edge_input_listContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.edge_indicator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEdge_indicator?: (ctx: Edge_indicatorContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.current_state`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCurrent_state?: (ctx: Current_stateContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.next_state`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNext_state?: (ctx: Next_stateContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.output_symbol`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOutput_symbol?: (ctx: Output_symbolContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.level_symbol`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLevel_symbol?: (ctx: Level_symbolContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.edge_symbol`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEdge_symbol?: (ctx: Edge_symbolContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_instantiation`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_instantiation?: (ctx: Udp_instantiationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_instance?: (ctx: Udp_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.name_of_udp_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitName_of_udp_instance?: (ctx: Name_of_udp_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.continuous_assign`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitContinuous_assign?: (ctx: Continuous_assignContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_net_assignments`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_net_assignments?: (ctx: List_of_net_assignmentsContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.net_assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNet_assignment?: (ctx: Net_assignmentContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.initial_construct`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInitial_construct?: (ctx: Initial_constructContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.always_construct`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAlways_construct?: (ctx: Always_constructContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.blocking_assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBlocking_assignment?: (ctx: Blocking_assignmentContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.nonblocking_assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNonblocking_assignment?: (ctx: Nonblocking_assignmentContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.procedural_continuous_assignments`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcedural_continuous_assignments?: (ctx: Procedural_continuous_assignmentsContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.variable_assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitVariable_assignment?: (ctx: Variable_assignmentContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.par_block`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPar_block?: (ctx: Par_blockContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.block_name`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBlock_name?: (ctx: Block_nameContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.seq_block`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSeq_block?: (ctx: Seq_blockContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStatement?: (ctx: StatementContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.statement_or_null`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStatement_or_null?: (ctx: Statement_or_nullContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.function_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunction_statement?: (ctx: Function_statementContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.delay_control`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDelay_control?: (ctx: Delay_controlContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.delay_or_event_control`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDelay_or_event_control?: (ctx: Delay_or_event_controlContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.disable_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDisable_statement?: (ctx: Disable_statementContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.event_control`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEvent_control?: (ctx: Event_controlContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.event_trigger`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEvent_trigger?: (ctx: Event_triggerContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.event_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEvent_expression?: (ctx: Event_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.procedural_timing_control`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcedural_timing_control?: (ctx: Procedural_timing_controlContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.procedural_timing_control_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcedural_timing_control_statement?: (ctx: Procedural_timing_control_statementContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.wait_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWait_statement?: (ctx: Wait_statementContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.conditional_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConditional_statement?: (ctx: Conditional_statementContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.case_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCase_statement?: (ctx: Case_statementContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.case_item`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCase_item?: (ctx: Case_itemContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.loop_statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLoop_statement?: (ctx: Loop_statementContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.system_task_enable`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSystem_task_enable?: (ctx: System_task_enableContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.sys_task_en_port_list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSys_task_en_port_list?: (ctx: Sys_task_en_port_listContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.sys_task_en_port_item`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSys_task_en_port_item?: (ctx: Sys_task_en_port_itemContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.task_enable`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTask_enable?: (ctx: Task_enableContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.task_en_port_list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTask_en_port_list?: (ctx: Task_en_port_listContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.specify_block`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSpecify_block?: (ctx: Specify_blockContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.specify_item`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSpecify_item?: (ctx: Specify_itemContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.pulsestyle_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPulsestyle_declaration?: (ctx: Pulsestyle_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.showcancelled_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShowcancelled_declaration?: (ctx: Showcancelled_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.path_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPath_declaration?: (ctx: Path_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.simple_path_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSimple_path_declaration?: (ctx: Simple_path_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.parallel_path_description`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParallel_path_description?: (ctx: Parallel_path_descriptionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.full_path_description`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFull_path_description?: (ctx: Full_path_descriptionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_path_inputs`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_path_inputs?: (ctx: List_of_path_inputsContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_path_outputs`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_path_outputs?: (ctx: List_of_path_outputsContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.specify_input_terminal_descriptor`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSpecify_input_terminal_descriptor?: (ctx: Specify_input_terminal_descriptorContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.specify_output_terminal_descriptor`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSpecify_output_terminal_descriptor?: (ctx: Specify_output_terminal_descriptorContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.input_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInput_identifier?: (ctx: Input_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.output_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOutput_identifier?: (ctx: Output_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.path_delay_value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPath_delay_value?: (ctx: Path_delay_valueContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.list_of_path_delay_expressions`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList_of_path_delay_expressions?: (ctx: List_of_path_delay_expressionsContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.t_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitT_path_delay_expression?: (ctx: T_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.trise_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTrise_path_delay_expression?: (ctx: Trise_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.tfall_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTfall_path_delay_expression?: (ctx: Tfall_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.tz_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTz_path_delay_expression?: (ctx: Tz_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.t01_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitT01_path_delay_expression?: (ctx: T01_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.t10_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitT10_path_delay_expression?: (ctx: T10_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.t0z_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitT0z_path_delay_expression?: (ctx: T0z_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.tz1_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTz1_path_delay_expression?: (ctx: Tz1_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.t1z_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitT1z_path_delay_expression?: (ctx: T1z_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.tz0_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTz0_path_delay_expression?: (ctx: Tz0_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.t0x_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitT0x_path_delay_expression?: (ctx: T0x_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.tx1_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTx1_path_delay_expression?: (ctx: Tx1_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.t1x_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitT1x_path_delay_expression?: (ctx: T1x_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.tx0_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTx0_path_delay_expression?: (ctx: Tx0_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.txz_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTxz_path_delay_expression?: (ctx: Txz_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.tzx_path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTzx_path_delay_expression?: (ctx: Tzx_path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.path_delay_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPath_delay_expression?: (ctx: Path_delay_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.edge_sensitive_path_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEdge_sensitive_path_declaration?: (ctx: Edge_sensitive_path_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.parallel_edge_sensitive_path_description`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParallel_edge_sensitive_path_description?: (ctx: Parallel_edge_sensitive_path_descriptionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.full_edge_sensitive_path_description`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFull_edge_sensitive_path_description?: (ctx: Full_edge_sensitive_path_descriptionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.data_source_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitData_source_expression?: (ctx: Data_source_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.edge_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEdge_identifier?: (ctx: Edge_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.state_dependent_path_declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitState_dependent_path_declaration?: (ctx: State_dependent_path_declarationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.polarity_operator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPolarity_operator?: (ctx: Polarity_operatorContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.system_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSystem_timing_check?: (ctx: System_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.setup_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetup_timing_check?: (ctx: Setup_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.notifier_opt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNotifier_opt?: (ctx: Notifier_optContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.hold_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitHold_timing_check?: (ctx: Hold_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.setuphold_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetuphold_timing_check?: (ctx: Setuphold_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.timing_check_opt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTiming_check_opt?: (ctx: Timing_check_optContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.stamptime_cond_opt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStamptime_cond_opt?: (ctx: Stamptime_cond_optContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.checktime_cond_opt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitChecktime_cond_opt?: (ctx: Checktime_cond_optContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.delayed_ref_opt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDelayed_ref_opt?: (ctx: Delayed_ref_optContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.delayed_data_opt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDelayed_data_opt?: (ctx: Delayed_data_optContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.recovery_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRecovery_timing_check?: (ctx: Recovery_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.removal_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRemoval_timing_check?: (ctx: Removal_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.recrem_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRecrem_timing_check?: (ctx: Recrem_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.skew_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSkew_timing_check?: (ctx: Skew_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.timeskew_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTimeskew_timing_check?: (ctx: Timeskew_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.skew_timing_check_opt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSkew_timing_check_opt?: (ctx: Skew_timing_check_optContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.event_based_flag_opt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEvent_based_flag_opt?: (ctx: Event_based_flag_optContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.remain_active_flag_opt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRemain_active_flag_opt?: (ctx: Remain_active_flag_optContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.fullskew_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFullskew_timing_check?: (ctx: Fullskew_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.period_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPeriod_timing_check?: (ctx: Period_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.width_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWidth_timing_check?: (ctx: Width_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.threshold_opt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitThreshold_opt?: (ctx: Threshold_optContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.nochange_timing_check`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNochange_timing_check?: (ctx: Nochange_timing_checkContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.checktime_condition`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitChecktime_condition?: (ctx: Checktime_conditionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.controlled_reference_event`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitControlled_reference_event?: (ctx: Controlled_reference_eventContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.data_event`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitData_event?: (ctx: Data_eventContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.delayed_data`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDelayed_data?: (ctx: Delayed_dataContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.delayed_reference`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDelayed_reference?: (ctx: Delayed_referenceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.end_edge_offset`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnd_edge_offset?: (ctx: End_edge_offsetContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.event_based_flag`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEvent_based_flag?: (ctx: Event_based_flagContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.notifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNotifier?: (ctx: NotifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.reference_event`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReference_event?: (ctx: Reference_eventContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.remain_active_flag`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRemain_active_flag?: (ctx: Remain_active_flagContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.stamptime_condition`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStamptime_condition?: (ctx: Stamptime_conditionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.start_edge_offset`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStart_edge_offset?: (ctx: Start_edge_offsetContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.threshold`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitThreshold?: (ctx: ThresholdContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.timing_check_limit`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTiming_check_limit?: (ctx: Timing_check_limitContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.timing_check_event`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTiming_check_event?: (ctx: Timing_check_eventContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.controlled_timing_check_event`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitControlled_timing_check_event?: (ctx: Controlled_timing_check_eventContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.timing_check_event_control`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTiming_check_event_control?: (ctx: Timing_check_event_controlContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.specify_terminal_descriptor`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSpecify_terminal_descriptor?: (ctx: Specify_terminal_descriptorContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.edge_control_specifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEdge_control_specifier?: (ctx: Edge_control_specifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.edge_descriptor`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEdge_descriptor?: (ctx: Edge_descriptorContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.timing_check_condition`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTiming_check_condition?: (ctx: Timing_check_conditionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.scalar_timing_check_condition`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitScalar_timing_check_condition?: (ctx: Scalar_timing_check_conditionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.scalar_constant`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitScalar_constant?: (ctx: Scalar_constantContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.concatenation`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConcatenation?: (ctx: ConcatenationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.constant_concatenation`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant_concatenation?: (ctx: Constant_concatenationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.constant_multiple_concatenation`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant_multiple_concatenation?: (ctx: Constant_multiple_concatenationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_path_concatenation`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_path_concatenation?: (ctx: Module_path_concatenationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_path_multiple_concatenation`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_path_multiple_concatenation?: (ctx: Module_path_multiple_concatenationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.multiple_concatenation`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMultiple_concatenation?: (ctx: Multiple_concatenationContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.constant_function_call`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant_function_call?: (ctx: Constant_function_callContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.constant_system_function_call`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant_system_function_call?: (ctx: Constant_system_function_callContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.function_call`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunction_call?: (ctx: Function_callContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.system_function_call`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSystem_function_call?: (ctx: System_function_callContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.sys_func_call_port_list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSys_func_call_port_list?: (ctx: Sys_func_call_port_listContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.base_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBase_expression?: (ctx: Base_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.constant_base_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant_base_expression?: (ctx: Constant_base_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.constant_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant_expression?: (ctx: Constant_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.constant_mintypmax_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant_mintypmax_expression?: (ctx: Constant_mintypmax_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.constant_range_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant_range_expression?: (ctx: Constant_range_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.dimension_constant_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDimension_constant_expression?: (ctx: Dimension_constant_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpression?: (ctx: ExpressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.lsb_constant_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLsb_constant_expression?: (ctx: Lsb_constant_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.mintypmax_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMintypmax_expression?: (ctx: Mintypmax_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_path_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_path_expression?: (ctx: Module_path_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_path_mintypmax_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_path_mintypmax_expression?: (ctx: Module_path_mintypmax_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.msb_constant_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMsb_constant_expression?: (ctx: Msb_constant_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.range_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRange_expression?: (ctx: Range_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.width_constant_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWidth_constant_expression?: (ctx: Width_constant_expressionContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.constant_primary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant_primary?: (ctx: Constant_primaryContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_path_primary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_path_primary?: (ctx: Module_path_primaryContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.primary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPrimary?: (ctx: PrimaryContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.select_`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSelect_?: (ctx: Select_Context) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.bit_select`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBit_select?: (ctx: Bit_selectContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.net_lvalue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNet_lvalue?: (ctx: Net_lvalueContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.const_select`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConst_select?: (ctx: Const_selectContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.const_bit_select`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConst_bit_select?: (ctx: Const_bit_selectContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.variable_lvalue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitVariable_lvalue?: (ctx: Variable_lvalueContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.unary_operator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnary_operator?: (ctx: Unary_operatorContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.unary_module_path_operator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnary_module_path_operator?: (ctx: Unary_module_path_operatorContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNumber?: (ctx: NumberContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.real_number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReal_number?: (ctx: Real_numberContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.decimal_number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDecimal_number?: (ctx: Decimal_numberContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.binary_number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBinary_number?: (ctx: Binary_numberContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.octal_number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOctal_number?: (ctx: Octal_numberContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.hex_number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitHex_number?: (ctx: Hex_numberContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.size`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSize?: (ctx: SizeContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.fixed_point_number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFixed_point_number?: (ctx: Fixed_point_numberContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.exponential_number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExponential_number?: (ctx: Exponential_numberContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.unsigned_number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnsigned_number?: (ctx: Unsigned_numberContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.decimal_value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDecimal_value?: (ctx: Decimal_valueContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.binary_value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBinary_value?: (ctx: Binary_valueContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.octal_value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOctal_value?: (ctx: Octal_valueContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.hex_value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitHex_value?: (ctx: Hex_valueContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.decimal_base`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDecimal_base?: (ctx: Decimal_baseContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.binary_base`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBinary_base?: (ctx: Binary_baseContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.octal_base`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOctal_base?: (ctx: Octal_baseContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.hex_base`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitHex_base?: (ctx: Hex_baseContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.string_`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitString_?: (ctx: String_Context) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.attribute_instance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAttribute_instance?: (ctx: Attribute_instanceContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.attr_spec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAttr_spec?: (ctx: Attr_specContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.attr_name`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAttr_name?: (ctx: Attr_nameContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.block_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBlock_identifier?: (ctx: Block_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.cell_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCell_identifier?: (ctx: Cell_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.config_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConfig_identifier?: (ctx: Config_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.escaped_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEscaped_identifier?: (ctx: Escaped_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.event_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEvent_identifier?: (ctx: Event_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.function_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunction_identifier?: (ctx: Function_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.gate_instance_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGate_instance_identifier?: (ctx: Gate_instance_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.generate_block_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGenerate_block_identifier?: (ctx: Generate_block_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.genvar_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGenvar_identifier?: (ctx: Genvar_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.hierarchical_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitHierarchical_identifier?: (ctx: Hierarchical_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.hier_ref`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitHier_ref?: (ctx: Hier_refContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifier?: (ctx: IdentifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.input_port_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInput_port_identifier?: (ctx: Input_port_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.instance_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInstance_identifier?: (ctx: Instance_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.library_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLibrary_identifier?: (ctx: Library_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_identifier?: (ctx: Module_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.module_instance_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitModule_instance_identifier?: (ctx: Module_instance_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.net_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNet_identifier?: (ctx: Net_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.output_port_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOutput_port_identifier?: (ctx: Output_port_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.parameter_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParameter_identifier?: (ctx: Parameter_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.port_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPort_identifier?: (ctx: Port_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.real_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReal_identifier?: (ctx: Real_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.simple_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSimple_identifier?: (ctx: Simple_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.specparam_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSpecparam_identifier?: (ctx: Specparam_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.system_function_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSystem_function_identifier?: (ctx: System_function_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.system_task_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSystem_task_identifier?: (ctx: System_task_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.task_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTask_identifier?: (ctx: Task_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.terminal_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTerminal_identifier?: (ctx: Terminal_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.topmodule_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTopmodule_identifier?: (ctx: Topmodule_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_identifier?: (ctx: Udp_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.udp_instance_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdp_instance_identifier?: (ctx: Udp_instance_identifierContext) => Result;

  /**
   * Visit a parse tree produced by `VerilogParser.variable_identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitVariable_identifier?: (ctx: Variable_identifierContext) => Result;
}

