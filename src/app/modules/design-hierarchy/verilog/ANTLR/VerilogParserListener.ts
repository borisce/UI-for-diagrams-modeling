// Generated from ./src/app/modules/state-machines/generate-diagram-from-code/verilog/grammar/VerilogParser.g4 by ANTLR 4.9.0-SNAPSHOT


import {ParseTreeListener} from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `VerilogParser`.
 */
export interface VerilogParserListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by `VerilogParser.library_text`.
   * @param ctx the parse tree
   */
  enterLibrary_text?: (ctx: Library_textContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.library_text`.
   * @param ctx the parse tree
   */
  exitLibrary_text?: (ctx: Library_textContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.library_description`.
   * @param ctx the parse tree
   */
  enterLibrary_description?: (ctx: Library_descriptionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.library_description`.
   * @param ctx the parse tree
   */
  exitLibrary_description?: (ctx: Library_descriptionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.library_declaration`.
   * @param ctx the parse tree
   */
  enterLibrary_declaration?: (ctx: Library_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.library_declaration`.
   * @param ctx the parse tree
   */
  exitLibrary_declaration?: (ctx: Library_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.library_incdir`.
   * @param ctx the parse tree
   */
  enterLibrary_incdir?: (ctx: Library_incdirContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.library_incdir`.
   * @param ctx the parse tree
   */
  exitLibrary_incdir?: (ctx: Library_incdirContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.include_statement`.
   * @param ctx the parse tree
   */
  enterInclude_statement?: (ctx: Include_statementContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.include_statement`.
   * @param ctx the parse tree
   */
  exitInclude_statement?: (ctx: Include_statementContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.file_path_spec`.
   * @param ctx the parse tree
   */
  enterFile_path_spec?: (ctx: File_path_specContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.file_path_spec`.
   * @param ctx the parse tree
   */
  exitFile_path_spec?: (ctx: File_path_specContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.source_text`.
   * @param ctx the parse tree
   */
  enterSource_text?: (ctx: Source_textContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.source_text`.
   * @param ctx the parse tree
   */
  exitSource_text?: (ctx: Source_textContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.description`.
   * @param ctx the parse tree
   */
  enterDescription?: (ctx: DescriptionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.description`.
   * @param ctx the parse tree
   */
  exitDescription?: (ctx: DescriptionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_declaration`.
   * @param ctx the parse tree
   */
  enterModule_declaration?: (ctx: Module_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_declaration`.
   * @param ctx the parse tree
   */
  exitModule_declaration?: (ctx: Module_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_keyword`.
   * @param ctx the parse tree
   */
  enterModule_keyword?: (ctx: Module_keywordContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_keyword`.
   * @param ctx the parse tree
   */
  exitModule_keyword?: (ctx: Module_keywordContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_parameter_port_list`.
   * @param ctx the parse tree
   */
  enterModule_parameter_port_list?: (ctx: Module_parameter_port_listContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_parameter_port_list`.
   * @param ctx the parse tree
   */
  exitModule_parameter_port_list?: (ctx: Module_parameter_port_listContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_port_declarations`.
   * @param ctx the parse tree
   */
  enterList_of_port_declarations?: (ctx: List_of_port_declarationsContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_port_declarations`.
   * @param ctx the parse tree
   */
  exitList_of_port_declarations?: (ctx: List_of_port_declarationsContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.port`.
   * @param ctx the parse tree
   */
  enterPort?: (ctx: PortContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.port`.
   * @param ctx the parse tree
   */
  exitPort?: (ctx: PortContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.port_implicit`.
   * @param ctx the parse tree
   */
  enterPort_implicit?: (ctx: Port_implicitContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.port_implicit`.
   * @param ctx the parse tree
   */
  exitPort_implicit?: (ctx: Port_implicitContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.port_explicit`.
   * @param ctx the parse tree
   */
  enterPort_explicit?: (ctx: Port_explicitContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.port_explicit`.
   * @param ctx the parse tree
   */
  exitPort_explicit?: (ctx: Port_explicitContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.port_expression`.
   * @param ctx the parse tree
   */
  enterPort_expression?: (ctx: Port_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.port_expression`.
   * @param ctx the parse tree
   */
  exitPort_expression?: (ctx: Port_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.port_reference`.
   * @param ctx the parse tree
   */
  enterPort_reference?: (ctx: Port_referenceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.port_reference`.
   * @param ctx the parse tree
   */
  exitPort_reference?: (ctx: Port_referenceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.port_declaration`.
   * @param ctx the parse tree
   */
  enterPort_declaration?: (ctx: Port_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.port_declaration`.
   * @param ctx the parse tree
   */
  exitPort_declaration?: (ctx: Port_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_item`.
   * @param ctx the parse tree
   */
  enterModule_item?: (ctx: Module_itemContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_item`.
   * @param ctx the parse tree
   */
  exitModule_item?: (ctx: Module_itemContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_or_generate_item`.
   * @param ctx the parse tree
   */
  enterModule_or_generate_item?: (ctx: Module_or_generate_itemContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_or_generate_item`.
   * @param ctx the parse tree
   */
  exitModule_or_generate_item?: (ctx: Module_or_generate_itemContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_or_generate_item_declaration`.
   * @param ctx the parse tree
   */
  enterModule_or_generate_item_declaration?: (ctx: Module_or_generate_item_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_or_generate_item_declaration`.
   * @param ctx the parse tree
   */
  exitModule_or_generate_item_declaration?: (ctx: Module_or_generate_item_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.parameter_override`.
   * @param ctx the parse tree
   */
  enterParameter_override?: (ctx: Parameter_overrideContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.parameter_override`.
   * @param ctx the parse tree
   */
  exitParameter_override?: (ctx: Parameter_overrideContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.config_declaration`.
   * @param ctx the parse tree
   */
  enterConfig_declaration?: (ctx: Config_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.config_declaration`.
   * @param ctx the parse tree
   */
  exitConfig_declaration?: (ctx: Config_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.design_statement`.
   * @param ctx the parse tree
   */
  enterDesign_statement?: (ctx: Design_statementContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.design_statement`.
   * @param ctx the parse tree
   */
  exitDesign_statement?: (ctx: Design_statementContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.design_statement_item`.
   * @param ctx the parse tree
   */
  enterDesign_statement_item?: (ctx: Design_statement_itemContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.design_statement_item`.
   * @param ctx the parse tree
   */
  exitDesign_statement_item?: (ctx: Design_statement_itemContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.config_rule_statement`.
   * @param ctx the parse tree
   */
  enterConfig_rule_statement?: (ctx: Config_rule_statementContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.config_rule_statement`.
   * @param ctx the parse tree
   */
  exitConfig_rule_statement?: (ctx: Config_rule_statementContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.default_clause`.
   * @param ctx the parse tree
   */
  enterDefault_clause?: (ctx: Default_clauseContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.default_clause`.
   * @param ctx the parse tree
   */
  exitDefault_clause?: (ctx: Default_clauseContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.inst_clause`.
   * @param ctx the parse tree
   */
  enterInst_clause?: (ctx: Inst_clauseContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.inst_clause`.
   * @param ctx the parse tree
   */
  exitInst_clause?: (ctx: Inst_clauseContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.inst_name`.
   * @param ctx the parse tree
   */
  enterInst_name?: (ctx: Inst_nameContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.inst_name`.
   * @param ctx the parse tree
   */
  exitInst_name?: (ctx: Inst_nameContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.cell_clause`.
   * @param ctx the parse tree
   */
  enterCell_clause?: (ctx: Cell_clauseContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.cell_clause`.
   * @param ctx the parse tree
   */
  exitCell_clause?: (ctx: Cell_clauseContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.liblist_clause`.
   * @param ctx the parse tree
   */
  enterLiblist_clause?: (ctx: Liblist_clauseContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.liblist_clause`.
   * @param ctx the parse tree
   */
  exitLiblist_clause?: (ctx: Liblist_clauseContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.use_clause`.
   * @param ctx the parse tree
   */
  enterUse_clause?: (ctx: Use_clauseContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.use_clause`.
   * @param ctx the parse tree
   */
  exitUse_clause?: (ctx: Use_clauseContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.local_parameter_declaration`.
   * @param ctx the parse tree
   */
  enterLocal_parameter_declaration?: (ctx: Local_parameter_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.local_parameter_declaration`.
   * @param ctx the parse tree
   */
  exitLocal_parameter_declaration?: (ctx: Local_parameter_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.parameter_declaration`.
   * @param ctx the parse tree
   */
  enterParameter_declaration?: (ctx: Parameter_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.parameter_declaration`.
   * @param ctx the parse tree
   */
  exitParameter_declaration?: (ctx: Parameter_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.specparam_declaration`.
   * @param ctx the parse tree
   */
  enterSpecparam_declaration?: (ctx: Specparam_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.specparam_declaration`.
   * @param ctx the parse tree
   */
  exitSpecparam_declaration?: (ctx: Specparam_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.parameter_type`.
   * @param ctx the parse tree
   */
  enterParameter_type?: (ctx: Parameter_typeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.parameter_type`.
   * @param ctx the parse tree
   */
  exitParameter_type?: (ctx: Parameter_typeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.inout_declaration`.
   * @param ctx the parse tree
   */
  enterInout_declaration?: (ctx: Inout_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.inout_declaration`.
   * @param ctx the parse tree
   */
  exitInout_declaration?: (ctx: Inout_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.input_declaration`.
   * @param ctx the parse tree
   */
  enterInput_declaration?: (ctx: Input_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.input_declaration`.
   * @param ctx the parse tree
   */
  exitInput_declaration?: (ctx: Input_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.output_declaration`.
   * @param ctx the parse tree
   */
  enterOutput_declaration?: (ctx: Output_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.output_declaration`.
   * @param ctx the parse tree
   */
  exitOutput_declaration?: (ctx: Output_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.event_declaration`.
   * @param ctx the parse tree
   */
  enterEvent_declaration?: (ctx: Event_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.event_declaration`.
   * @param ctx the parse tree
   */
  exitEvent_declaration?: (ctx: Event_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.integer_declaration`.
   * @param ctx the parse tree
   */
  enterInteger_declaration?: (ctx: Integer_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.integer_declaration`.
   * @param ctx the parse tree
   */
  exitInteger_declaration?: (ctx: Integer_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.net_declaration`.
   * @param ctx the parse tree
   */
  enterNet_declaration?: (ctx: Net_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.net_declaration`.
   * @param ctx the parse tree
   */
  exitNet_declaration?: (ctx: Net_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.real_declaration`.
   * @param ctx the parse tree
   */
  enterReal_declaration?: (ctx: Real_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.real_declaration`.
   * @param ctx the parse tree
   */
  exitReal_declaration?: (ctx: Real_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.realtime_declaration`.
   * @param ctx the parse tree
   */
  enterRealtime_declaration?: (ctx: Realtime_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.realtime_declaration`.
   * @param ctx the parse tree
   */
  exitRealtime_declaration?: (ctx: Realtime_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.reg_declaration`.
   * @param ctx the parse tree
   */
  enterReg_declaration?: (ctx: Reg_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.reg_declaration`.
   * @param ctx the parse tree
   */
  exitReg_declaration?: (ctx: Reg_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.time_declaration`.
   * @param ctx the parse tree
   */
  enterTime_declaration?: (ctx: Time_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.time_declaration`.
   * @param ctx the parse tree
   */
  exitTime_declaration?: (ctx: Time_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.net_type`.
   * @param ctx the parse tree
   */
  enterNet_type?: (ctx: Net_typeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.net_type`.
   * @param ctx the parse tree
   */
  exitNet_type?: (ctx: Net_typeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.output_variable_type`.
   * @param ctx the parse tree
   */
  enterOutput_variable_type?: (ctx: Output_variable_typeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.output_variable_type`.
   * @param ctx the parse tree
   */
  exitOutput_variable_type?: (ctx: Output_variable_typeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.real_type`.
   * @param ctx the parse tree
   */
  enterReal_type?: (ctx: Real_typeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.real_type`.
   * @param ctx the parse tree
   */
  exitReal_type?: (ctx: Real_typeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.variable_type`.
   * @param ctx the parse tree
   */
  enterVariable_type?: (ctx: Variable_typeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.variable_type`.
   * @param ctx the parse tree
   */
  exitVariable_type?: (ctx: Variable_typeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.drive_strength`.
   * @param ctx the parse tree
   */
  enterDrive_strength?: (ctx: Drive_strengthContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.drive_strength`.
   * @param ctx the parse tree
   */
  exitDrive_strength?: (ctx: Drive_strengthContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.strength0`.
   * @param ctx the parse tree
   */
  enterStrength0?: (ctx: Strength0Context) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.strength0`.
   * @param ctx the parse tree
   */
  exitStrength0?: (ctx: Strength0Context) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.strength1`.
   * @param ctx the parse tree
   */
  enterStrength1?: (ctx: Strength1Context) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.strength1`.
   * @param ctx the parse tree
   */
  exitStrength1?: (ctx: Strength1Context) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.charge_strength`.
   * @param ctx the parse tree
   */
  enterCharge_strength?: (ctx: Charge_strengthContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.charge_strength`.
   * @param ctx the parse tree
   */
  exitCharge_strength?: (ctx: Charge_strengthContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.delay3`.
   * @param ctx the parse tree
   */
  enterDelay3?: (ctx: Delay3Context) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.delay3`.
   * @param ctx the parse tree
   */
  exitDelay3?: (ctx: Delay3Context) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.delay2`.
   * @param ctx the parse tree
   */
  enterDelay2?: (ctx: Delay2Context) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.delay2`.
   * @param ctx the parse tree
   */
  exitDelay2?: (ctx: Delay2Context) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.delay_value`.
   * @param ctx the parse tree
   */
  enterDelay_value?: (ctx: Delay_valueContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.delay_value`.
   * @param ctx the parse tree
   */
  exitDelay_value?: (ctx: Delay_valueContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_defparam_assignments`.
   * @param ctx the parse tree
   */
  enterList_of_defparam_assignments?: (ctx: List_of_defparam_assignmentsContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_defparam_assignments`.
   * @param ctx the parse tree
   */
  exitList_of_defparam_assignments?: (ctx: List_of_defparam_assignmentsContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_event_identifiers`.
   * @param ctx the parse tree
   */
  enterList_of_event_identifiers?: (ctx: List_of_event_identifiersContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_event_identifiers`.
   * @param ctx the parse tree
   */
  exitList_of_event_identifiers?: (ctx: List_of_event_identifiersContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.event_id`.
   * @param ctx the parse tree
   */
  enterEvent_id?: (ctx: Event_idContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.event_id`.
   * @param ctx the parse tree
   */
  exitEvent_id?: (ctx: Event_idContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_net_decl_assignments`.
   * @param ctx the parse tree
   */
  enterList_of_net_decl_assignments?: (ctx: List_of_net_decl_assignmentsContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_net_decl_assignments`.
   * @param ctx the parse tree
   */
  exitList_of_net_decl_assignments?: (ctx: List_of_net_decl_assignmentsContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_net_identifiers`.
   * @param ctx the parse tree
   */
  enterList_of_net_identifiers?: (ctx: List_of_net_identifiersContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_net_identifiers`.
   * @param ctx the parse tree
   */
  exitList_of_net_identifiers?: (ctx: List_of_net_identifiersContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.net_id`.
   * @param ctx the parse tree
   */
  enterNet_id?: (ctx: Net_idContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.net_id`.
   * @param ctx the parse tree
   */
  exitNet_id?: (ctx: Net_idContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_param_assignments`.
   * @param ctx the parse tree
   */
  enterList_of_param_assignments?: (ctx: List_of_param_assignmentsContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_param_assignments`.
   * @param ctx the parse tree
   */
  exitList_of_param_assignments?: (ctx: List_of_param_assignmentsContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_port_identifiers`.
   * @param ctx the parse tree
   */
  enterList_of_port_identifiers?: (ctx: List_of_port_identifiersContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_port_identifiers`.
   * @param ctx the parse tree
   */
  exitList_of_port_identifiers?: (ctx: List_of_port_identifiersContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_real_identifiers`.
   * @param ctx the parse tree
   */
  enterList_of_real_identifiers?: (ctx: List_of_real_identifiersContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_real_identifiers`.
   * @param ctx the parse tree
   */
  exitList_of_real_identifiers?: (ctx: List_of_real_identifiersContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_specparam_assignments`.
   * @param ctx the parse tree
   */
  enterList_of_specparam_assignments?: (ctx: List_of_specparam_assignmentsContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_specparam_assignments`.
   * @param ctx the parse tree
   */
  exitList_of_specparam_assignments?: (ctx: List_of_specparam_assignmentsContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_variable_identifiers`.
   * @param ctx the parse tree
   */
  enterList_of_variable_identifiers?: (ctx: List_of_variable_identifiersContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_variable_identifiers`.
   * @param ctx the parse tree
   */
  exitList_of_variable_identifiers?: (ctx: List_of_variable_identifiersContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_variable_port_identifiers`.
   * @param ctx the parse tree
   */
  enterList_of_variable_port_identifiers?: (ctx: List_of_variable_port_identifiersContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_variable_port_identifiers`.
   * @param ctx the parse tree
   */
  exitList_of_variable_port_identifiers?: (ctx: List_of_variable_port_identifiersContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.var_port_id`.
   * @param ctx the parse tree
   */
  enterVar_port_id?: (ctx: Var_port_idContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.var_port_id`.
   * @param ctx the parse tree
   */
  exitVar_port_id?: (ctx: Var_port_idContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.defparam_assignment`.
   * @param ctx the parse tree
   */
  enterDefparam_assignment?: (ctx: Defparam_assignmentContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.defparam_assignment`.
   * @param ctx the parse tree
   */
  exitDefparam_assignment?: (ctx: Defparam_assignmentContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.net_decl_assignment`.
   * @param ctx the parse tree
   */
  enterNet_decl_assignment?: (ctx: Net_decl_assignmentContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.net_decl_assignment`.
   * @param ctx the parse tree
   */
  exitNet_decl_assignment?: (ctx: Net_decl_assignmentContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.param_assignment`.
   * @param ctx the parse tree
   */
  enterParam_assignment?: (ctx: Param_assignmentContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.param_assignment`.
   * @param ctx the parse tree
   */
  exitParam_assignment?: (ctx: Param_assignmentContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.specparam_assignment`.
   * @param ctx the parse tree
   */
  enterSpecparam_assignment?: (ctx: Specparam_assignmentContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.specparam_assignment`.
   * @param ctx the parse tree
   */
  exitSpecparam_assignment?: (ctx: Specparam_assignmentContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.pulse_control_specparam`.
   * @param ctx the parse tree
   */
  enterPulse_control_specparam?: (ctx: Pulse_control_specparamContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.pulse_control_specparam`.
   * @param ctx the parse tree
   */
  exitPulse_control_specparam?: (ctx: Pulse_control_specparamContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.error_limit_value`.
   * @param ctx the parse tree
   */
  enterError_limit_value?: (ctx: Error_limit_valueContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.error_limit_value`.
   * @param ctx the parse tree
   */
  exitError_limit_value?: (ctx: Error_limit_valueContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.reject_limit_value`.
   * @param ctx the parse tree
   */
  enterReject_limit_value?: (ctx: Reject_limit_valueContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.reject_limit_value`.
   * @param ctx the parse tree
   */
  exitReject_limit_value?: (ctx: Reject_limit_valueContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.limit_value`.
   * @param ctx the parse tree
   */
  enterLimit_value?: (ctx: Limit_valueContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.limit_value`.
   * @param ctx the parse tree
   */
  exitLimit_value?: (ctx: Limit_valueContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.dimension`.
   * @param ctx the parse tree
   */
  enterDimension?: (ctx: DimensionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.dimension`.
   * @param ctx the parse tree
   */
  exitDimension?: (ctx: DimensionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.range_`.
   * @param ctx the parse tree
   */
  enterRange_?: (ctx: Range_Context) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.range_`.
   * @param ctx the parse tree
   */
  exitRange_?: (ctx: Range_Context) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.function_declaration`.
   * @param ctx the parse tree
   */
  enterFunction_declaration?: (ctx: Function_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.function_declaration`.
   * @param ctx the parse tree
   */
  exitFunction_declaration?: (ctx: Function_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.function_item_declaration`.
   * @param ctx the parse tree
   */
  enterFunction_item_declaration?: (ctx: Function_item_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.function_item_declaration`.
   * @param ctx the parse tree
   */
  exitFunction_item_declaration?: (ctx: Function_item_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.function_port_list`.
   * @param ctx the parse tree
   */
  enterFunction_port_list?: (ctx: Function_port_listContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.function_port_list`.
   * @param ctx the parse tree
   */
  exitFunction_port_list?: (ctx: Function_port_listContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.func_port_item`.
   * @param ctx the parse tree
   */
  enterFunc_port_item?: (ctx: Func_port_itemContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.func_port_item`.
   * @param ctx the parse tree
   */
  exitFunc_port_item?: (ctx: Func_port_itemContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.function_range_or_type`.
   * @param ctx the parse tree
   */
  enterFunction_range_or_type?: (ctx: Function_range_or_typeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.function_range_or_type`.
   * @param ctx the parse tree
   */
  exitFunction_range_or_type?: (ctx: Function_range_or_typeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.task_declaration`.
   * @param ctx the parse tree
   */
  enterTask_declaration?: (ctx: Task_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.task_declaration`.
   * @param ctx the parse tree
   */
  exitTask_declaration?: (ctx: Task_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.task_item_declaration`.
   * @param ctx the parse tree
   */
  enterTask_item_declaration?: (ctx: Task_item_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.task_item_declaration`.
   * @param ctx the parse tree
   */
  exitTask_item_declaration?: (ctx: Task_item_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.task_port_list`.
   * @param ctx the parse tree
   */
  enterTask_port_list?: (ctx: Task_port_listContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.task_port_list`.
   * @param ctx the parse tree
   */
  exitTask_port_list?: (ctx: Task_port_listContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.task_port_item`.
   * @param ctx the parse tree
   */
  enterTask_port_item?: (ctx: Task_port_itemContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.task_port_item`.
   * @param ctx the parse tree
   */
  exitTask_port_item?: (ctx: Task_port_itemContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.tf_input_declaration`.
   * @param ctx the parse tree
   */
  enterTf_input_declaration?: (ctx: Tf_input_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.tf_input_declaration`.
   * @param ctx the parse tree
   */
  exitTf_input_declaration?: (ctx: Tf_input_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.tf_output_declaration`.
   * @param ctx the parse tree
   */
  enterTf_output_declaration?: (ctx: Tf_output_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.tf_output_declaration`.
   * @param ctx the parse tree
   */
  exitTf_output_declaration?: (ctx: Tf_output_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.tf_inout_declaration`.
   * @param ctx the parse tree
   */
  enterTf_inout_declaration?: (ctx: Tf_inout_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.tf_inout_declaration`.
   * @param ctx the parse tree
   */
  exitTf_inout_declaration?: (ctx: Tf_inout_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.task_port_type`.
   * @param ctx the parse tree
   */
  enterTask_port_type?: (ctx: Task_port_typeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.task_port_type`.
   * @param ctx the parse tree
   */
  exitTask_port_type?: (ctx: Task_port_typeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.block_item_declaration`.
   * @param ctx the parse tree
   */
  enterBlock_item_declaration?: (ctx: Block_item_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.block_item_declaration`.
   * @param ctx the parse tree
   */
  exitBlock_item_declaration?: (ctx: Block_item_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_block_variable_identifiers`.
   * @param ctx the parse tree
   */
  enterList_of_block_variable_identifiers?: (ctx: List_of_block_variable_identifiersContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_block_variable_identifiers`.
   * @param ctx the parse tree
   */
  exitList_of_block_variable_identifiers?: (ctx: List_of_block_variable_identifiersContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_block_real_identifiers`.
   * @param ctx the parse tree
   */
  enterList_of_block_real_identifiers?: (ctx: List_of_block_real_identifiersContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_block_real_identifiers`.
   * @param ctx the parse tree
   */
  exitList_of_block_real_identifiers?: (ctx: List_of_block_real_identifiersContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.block_variable_type`.
   * @param ctx the parse tree
   */
  enterBlock_variable_type?: (ctx: Block_variable_typeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.block_variable_type`.
   * @param ctx the parse tree
   */
  exitBlock_variable_type?: (ctx: Block_variable_typeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.block_real_type`.
   * @param ctx the parse tree
   */
  enterBlock_real_type?: (ctx: Block_real_typeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.block_real_type`.
   * @param ctx the parse tree
   */
  exitBlock_real_type?: (ctx: Block_real_typeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.gate_instantiation`.
   * @param ctx the parse tree
   */
  enterGate_instantiation?: (ctx: Gate_instantiationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.gate_instantiation`.
   * @param ctx the parse tree
   */
  exitGate_instantiation?: (ctx: Gate_instantiationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.cmos_switch_instance`.
   * @param ctx the parse tree
   */
  enterCmos_switch_instance?: (ctx: Cmos_switch_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.cmos_switch_instance`.
   * @param ctx the parse tree
   */
  exitCmos_switch_instance?: (ctx: Cmos_switch_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.enable_gate_instance`.
   * @param ctx the parse tree
   */
  enterEnable_gate_instance?: (ctx: Enable_gate_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.enable_gate_instance`.
   * @param ctx the parse tree
   */
  exitEnable_gate_instance?: (ctx: Enable_gate_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.mos_switch_instance`.
   * @param ctx the parse tree
   */
  enterMos_switch_instance?: (ctx: Mos_switch_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.mos_switch_instance`.
   * @param ctx the parse tree
   */
  exitMos_switch_instance?: (ctx: Mos_switch_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.n_input_gate_instance`.
   * @param ctx the parse tree
   */
  enterN_input_gate_instance?: (ctx: N_input_gate_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.n_input_gate_instance`.
   * @param ctx the parse tree
   */
  exitN_input_gate_instance?: (ctx: N_input_gate_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.n_output_gate_instance`.
   * @param ctx the parse tree
   */
  enterN_output_gate_instance?: (ctx: N_output_gate_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.n_output_gate_instance`.
   * @param ctx the parse tree
   */
  exitN_output_gate_instance?: (ctx: N_output_gate_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.pass_switch_instance`.
   * @param ctx the parse tree
   */
  enterPass_switch_instance?: (ctx: Pass_switch_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.pass_switch_instance`.
   * @param ctx the parse tree
   */
  exitPass_switch_instance?: (ctx: Pass_switch_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.pass_enable_switch_instance`.
   * @param ctx the parse tree
   */
  enterPass_enable_switch_instance?: (ctx: Pass_enable_switch_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.pass_enable_switch_instance`.
   * @param ctx the parse tree
   */
  exitPass_enable_switch_instance?: (ctx: Pass_enable_switch_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.pull_gate_instance`.
   * @param ctx the parse tree
   */
  enterPull_gate_instance?: (ctx: Pull_gate_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.pull_gate_instance`.
   * @param ctx the parse tree
   */
  exitPull_gate_instance?: (ctx: Pull_gate_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.name_of_gate_instance`.
   * @param ctx the parse tree
   */
  enterName_of_gate_instance?: (ctx: Name_of_gate_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.name_of_gate_instance`.
   * @param ctx the parse tree
   */
  exitName_of_gate_instance?: (ctx: Name_of_gate_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.pulldown_strength`.
   * @param ctx the parse tree
   */
  enterPulldown_strength?: (ctx: Pulldown_strengthContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.pulldown_strength`.
   * @param ctx the parse tree
   */
  exitPulldown_strength?: (ctx: Pulldown_strengthContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.pullup_strength`.
   * @param ctx the parse tree
   */
  enterPullup_strength?: (ctx: Pullup_strengthContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.pullup_strength`.
   * @param ctx the parse tree
   */
  exitPullup_strength?: (ctx: Pullup_strengthContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.enable_terminal`.
   * @param ctx the parse tree
   */
  enterEnable_terminal?: (ctx: Enable_terminalContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.enable_terminal`.
   * @param ctx the parse tree
   */
  exitEnable_terminal?: (ctx: Enable_terminalContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.inout_terminal`.
   * @param ctx the parse tree
   */
  enterInout_terminal?: (ctx: Inout_terminalContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.inout_terminal`.
   * @param ctx the parse tree
   */
  exitInout_terminal?: (ctx: Inout_terminalContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.input_terminal`.
   * @param ctx the parse tree
   */
  enterInput_terminal?: (ctx: Input_terminalContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.input_terminal`.
   * @param ctx the parse tree
   */
  exitInput_terminal?: (ctx: Input_terminalContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.ncontrol_terminal`.
   * @param ctx the parse tree
   */
  enterNcontrol_terminal?: (ctx: Ncontrol_terminalContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.ncontrol_terminal`.
   * @param ctx the parse tree
   */
  exitNcontrol_terminal?: (ctx: Ncontrol_terminalContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.output_terminal`.
   * @param ctx the parse tree
   */
  enterOutput_terminal?: (ctx: Output_terminalContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.output_terminal`.
   * @param ctx the parse tree
   */
  exitOutput_terminal?: (ctx: Output_terminalContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.pcontrol_terminal`.
   * @param ctx the parse tree
   */
  enterPcontrol_terminal?: (ctx: Pcontrol_terminalContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.pcontrol_terminal`.
   * @param ctx the parse tree
   */
  exitPcontrol_terminal?: (ctx: Pcontrol_terminalContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.cmos_switchtype`.
   * @param ctx the parse tree
   */
  enterCmos_switchtype?: (ctx: Cmos_switchtypeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.cmos_switchtype`.
   * @param ctx the parse tree
   */
  exitCmos_switchtype?: (ctx: Cmos_switchtypeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.enable_gatetype`.
   * @param ctx the parse tree
   */
  enterEnable_gatetype?: (ctx: Enable_gatetypeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.enable_gatetype`.
   * @param ctx the parse tree
   */
  exitEnable_gatetype?: (ctx: Enable_gatetypeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.mos_switchtype`.
   * @param ctx the parse tree
   */
  enterMos_switchtype?: (ctx: Mos_switchtypeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.mos_switchtype`.
   * @param ctx the parse tree
   */
  exitMos_switchtype?: (ctx: Mos_switchtypeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.n_input_gatetype`.
   * @param ctx the parse tree
   */
  enterN_input_gatetype?: (ctx: N_input_gatetypeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.n_input_gatetype`.
   * @param ctx the parse tree
   */
  exitN_input_gatetype?: (ctx: N_input_gatetypeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.n_output_gatetype`.
   * @param ctx the parse tree
   */
  enterN_output_gatetype?: (ctx: N_output_gatetypeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.n_output_gatetype`.
   * @param ctx the parse tree
   */
  exitN_output_gatetype?: (ctx: N_output_gatetypeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.pass_en_switchtype`.
   * @param ctx the parse tree
   */
  enterPass_en_switchtype?: (ctx: Pass_en_switchtypeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.pass_en_switchtype`.
   * @param ctx the parse tree
   */
  exitPass_en_switchtype?: (ctx: Pass_en_switchtypeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.pass_switchtype`.
   * @param ctx the parse tree
   */
  enterPass_switchtype?: (ctx: Pass_switchtypeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.pass_switchtype`.
   * @param ctx the parse tree
   */
  exitPass_switchtype?: (ctx: Pass_switchtypeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_instantiation`.
   * @param ctx the parse tree
   */
  enterModule_instantiation?: (ctx: Module_instantiationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_instantiation`.
   * @param ctx the parse tree
   */
  exitModule_instantiation?: (ctx: Module_instantiationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.parameter_value_assignment`.
   * @param ctx the parse tree
   */
  enterParameter_value_assignment?: (ctx: Parameter_value_assignmentContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.parameter_value_assignment`.
   * @param ctx the parse tree
   */
  exitParameter_value_assignment?: (ctx: Parameter_value_assignmentContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_parameter_assignments`.
   * @param ctx the parse tree
   */
  enterList_of_parameter_assignments?: (ctx: List_of_parameter_assignmentsContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_parameter_assignments`.
   * @param ctx the parse tree
   */
  exitList_of_parameter_assignments?: (ctx: List_of_parameter_assignmentsContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.ordered_parameter_assignment`.
   * @param ctx the parse tree
   */
  enterOrdered_parameter_assignment?: (ctx: Ordered_parameter_assignmentContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.ordered_parameter_assignment`.
   * @param ctx the parse tree
   */
  exitOrdered_parameter_assignment?: (ctx: Ordered_parameter_assignmentContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.named_parameter_assignment`.
   * @param ctx the parse tree
   */
  enterNamed_parameter_assignment?: (ctx: Named_parameter_assignmentContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.named_parameter_assignment`.
   * @param ctx the parse tree
   */
  exitNamed_parameter_assignment?: (ctx: Named_parameter_assignmentContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_instance`.
   * @param ctx the parse tree
   */
  enterModule_instance?: (ctx: Module_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_instance`.
   * @param ctx the parse tree
   */
  exitModule_instance?: (ctx: Module_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.name_of_module_instance`.
   * @param ctx the parse tree
   */
  enterName_of_module_instance?: (ctx: Name_of_module_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.name_of_module_instance`.
   * @param ctx the parse tree
   */
  exitName_of_module_instance?: (ctx: Name_of_module_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_port_connections`.
   * @param ctx the parse tree
   */
  enterList_of_port_connections?: (ctx: List_of_port_connectionsContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_port_connections`.
   * @param ctx the parse tree
   */
  exitList_of_port_connections?: (ctx: List_of_port_connectionsContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.ordered_port_connection`.
   * @param ctx the parse tree
   */
  enterOrdered_port_connection?: (ctx: Ordered_port_connectionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.ordered_port_connection`.
   * @param ctx the parse tree
   */
  exitOrdered_port_connection?: (ctx: Ordered_port_connectionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.named_port_connection`.
   * @param ctx the parse tree
   */
  enterNamed_port_connection?: (ctx: Named_port_connectionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.named_port_connection`.
   * @param ctx the parse tree
   */
  exitNamed_port_connection?: (ctx: Named_port_connectionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.generate_region`.
   * @param ctx the parse tree
   */
  enterGenerate_region?: (ctx: Generate_regionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.generate_region`.
   * @param ctx the parse tree
   */
  exitGenerate_region?: (ctx: Generate_regionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.genvar_declaration`.
   * @param ctx the parse tree
   */
  enterGenvar_declaration?: (ctx: Genvar_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.genvar_declaration`.
   * @param ctx the parse tree
   */
  exitGenvar_declaration?: (ctx: Genvar_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_genvar_identifiers`.
   * @param ctx the parse tree
   */
  enterList_of_genvar_identifiers?: (ctx: List_of_genvar_identifiersContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_genvar_identifiers`.
   * @param ctx the parse tree
   */
  exitList_of_genvar_identifiers?: (ctx: List_of_genvar_identifiersContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.loop_generate_construct`.
   * @param ctx the parse tree
   */
  enterLoop_generate_construct?: (ctx: Loop_generate_constructContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.loop_generate_construct`.
   * @param ctx the parse tree
   */
  exitLoop_generate_construct?: (ctx: Loop_generate_constructContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.genvar_initialization`.
   * @param ctx the parse tree
   */
  enterGenvar_initialization?: (ctx: Genvar_initializationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.genvar_initialization`.
   * @param ctx the parse tree
   */
  exitGenvar_initialization?: (ctx: Genvar_initializationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.genvar_expression`.
   * @param ctx the parse tree
   */
  enterGenvar_expression?: (ctx: Genvar_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.genvar_expression`.
   * @param ctx the parse tree
   */
  exitGenvar_expression?: (ctx: Genvar_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.genvar_iteration`.
   * @param ctx the parse tree
   */
  enterGenvar_iteration?: (ctx: Genvar_iterationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.genvar_iteration`.
   * @param ctx the parse tree
   */
  exitGenvar_iteration?: (ctx: Genvar_iterationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.conditional_generate_construct`.
   * @param ctx the parse tree
   */
  enterConditional_generate_construct?: (ctx: Conditional_generate_constructContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.conditional_generate_construct`.
   * @param ctx the parse tree
   */
  exitConditional_generate_construct?: (ctx: Conditional_generate_constructContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.if_generate_construct`.
   * @param ctx the parse tree
   */
  enterIf_generate_construct?: (ctx: If_generate_constructContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.if_generate_construct`.
   * @param ctx the parse tree
   */
  exitIf_generate_construct?: (ctx: If_generate_constructContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.case_generate_construct`.
   * @param ctx the parse tree
   */
  enterCase_generate_construct?: (ctx: Case_generate_constructContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.case_generate_construct`.
   * @param ctx the parse tree
   */
  exitCase_generate_construct?: (ctx: Case_generate_constructContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.case_generate_item`.
   * @param ctx the parse tree
   */
  enterCase_generate_item?: (ctx: Case_generate_itemContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.case_generate_item`.
   * @param ctx the parse tree
   */
  exitCase_generate_item?: (ctx: Case_generate_itemContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.generate_block`.
   * @param ctx the parse tree
   */
  enterGenerate_block?: (ctx: Generate_blockContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.generate_block`.
   * @param ctx the parse tree
   */
  exitGenerate_block?: (ctx: Generate_blockContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.generate_block_name`.
   * @param ctx the parse tree
   */
  enterGenerate_block_name?: (ctx: Generate_block_nameContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.generate_block_name`.
   * @param ctx the parse tree
   */
  exitGenerate_block_name?: (ctx: Generate_block_nameContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.generate_block_or_null`.
   * @param ctx the parse tree
   */
  enterGenerate_block_or_null?: (ctx: Generate_block_or_nullContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.generate_block_or_null`.
   * @param ctx the parse tree
   */
  exitGenerate_block_or_null?: (ctx: Generate_block_or_nullContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_declaration`.
   * @param ctx the parse tree
   */
  enterUdp_declaration?: (ctx: Udp_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_declaration`.
   * @param ctx the parse tree
   */
  exitUdp_declaration?: (ctx: Udp_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_port_list`.
   * @param ctx the parse tree
   */
  enterUdp_port_list?: (ctx: Udp_port_listContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_port_list`.
   * @param ctx the parse tree
   */
  exitUdp_port_list?: (ctx: Udp_port_listContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_declaration_port_list`.
   * @param ctx the parse tree
   */
  enterUdp_declaration_port_list?: (ctx: Udp_declaration_port_listContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_declaration_port_list`.
   * @param ctx the parse tree
   */
  exitUdp_declaration_port_list?: (ctx: Udp_declaration_port_listContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_port_declaration`.
   * @param ctx the parse tree
   */
  enterUdp_port_declaration?: (ctx: Udp_port_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_port_declaration`.
   * @param ctx the parse tree
   */
  exitUdp_port_declaration?: (ctx: Udp_port_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_output_declaration`.
   * @param ctx the parse tree
   */
  enterUdp_output_declaration?: (ctx: Udp_output_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_output_declaration`.
   * @param ctx the parse tree
   */
  exitUdp_output_declaration?: (ctx: Udp_output_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_input_declaration`.
   * @param ctx the parse tree
   */
  enterUdp_input_declaration?: (ctx: Udp_input_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_input_declaration`.
   * @param ctx the parse tree
   */
  exitUdp_input_declaration?: (ctx: Udp_input_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_reg_declaration`.
   * @param ctx the parse tree
   */
  enterUdp_reg_declaration?: (ctx: Udp_reg_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_reg_declaration`.
   * @param ctx the parse tree
   */
  exitUdp_reg_declaration?: (ctx: Udp_reg_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_body`.
   * @param ctx the parse tree
   */
  enterUdp_body?: (ctx: Udp_bodyContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_body`.
   * @param ctx the parse tree
   */
  exitUdp_body?: (ctx: Udp_bodyContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.combinational_body`.
   * @param ctx the parse tree
   */
  enterCombinational_body?: (ctx: Combinational_bodyContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.combinational_body`.
   * @param ctx the parse tree
   */
  exitCombinational_body?: (ctx: Combinational_bodyContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.combinational_entry`.
   * @param ctx the parse tree
   */
  enterCombinational_entry?: (ctx: Combinational_entryContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.combinational_entry`.
   * @param ctx the parse tree
   */
  exitCombinational_entry?: (ctx: Combinational_entryContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.sequential_body`.
   * @param ctx the parse tree
   */
  enterSequential_body?: (ctx: Sequential_bodyContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.sequential_body`.
   * @param ctx the parse tree
   */
  exitSequential_body?: (ctx: Sequential_bodyContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_initial_statement`.
   * @param ctx the parse tree
   */
  enterUdp_initial_statement?: (ctx: Udp_initial_statementContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_initial_statement`.
   * @param ctx the parse tree
   */
  exitUdp_initial_statement?: (ctx: Udp_initial_statementContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.init_val`.
   * @param ctx the parse tree
   */
  enterInit_val?: (ctx: Init_valContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.init_val`.
   * @param ctx the parse tree
   */
  exitInit_val?: (ctx: Init_valContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.sequential_entry`.
   * @param ctx the parse tree
   */
  enterSequential_entry?: (ctx: Sequential_entryContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.sequential_entry`.
   * @param ctx the parse tree
   */
  exitSequential_entry?: (ctx: Sequential_entryContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.seq_input_list`.
   * @param ctx the parse tree
   */
  enterSeq_input_list?: (ctx: Seq_input_listContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.seq_input_list`.
   * @param ctx the parse tree
   */
  exitSeq_input_list?: (ctx: Seq_input_listContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.level_input_list`.
   * @param ctx the parse tree
   */
  enterLevel_input_list?: (ctx: Level_input_listContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.level_input_list`.
   * @param ctx the parse tree
   */
  exitLevel_input_list?: (ctx: Level_input_listContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.edge_input_list`.
   * @param ctx the parse tree
   */
  enterEdge_input_list?: (ctx: Edge_input_listContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.edge_input_list`.
   * @param ctx the parse tree
   */
  exitEdge_input_list?: (ctx: Edge_input_listContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.edge_indicator`.
   * @param ctx the parse tree
   */
  enterEdge_indicator?: (ctx: Edge_indicatorContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.edge_indicator`.
   * @param ctx the parse tree
   */
  exitEdge_indicator?: (ctx: Edge_indicatorContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.current_state`.
   * @param ctx the parse tree
   */
  enterCurrent_state?: (ctx: Current_stateContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.current_state`.
   * @param ctx the parse tree
   */
  exitCurrent_state?: (ctx: Current_stateContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.next_state`.
   * @param ctx the parse tree
   */
  enterNext_state?: (ctx: Next_stateContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.next_state`.
   * @param ctx the parse tree
   */
  exitNext_state?: (ctx: Next_stateContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.output_symbol`.
   * @param ctx the parse tree
   */
  enterOutput_symbol?: (ctx: Output_symbolContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.output_symbol`.
   * @param ctx the parse tree
   */
  exitOutput_symbol?: (ctx: Output_symbolContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.level_symbol`.
   * @param ctx the parse tree
   */
  enterLevel_symbol?: (ctx: Level_symbolContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.level_symbol`.
   * @param ctx the parse tree
   */
  exitLevel_symbol?: (ctx: Level_symbolContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.edge_symbol`.
   * @param ctx the parse tree
   */
  enterEdge_symbol?: (ctx: Edge_symbolContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.edge_symbol`.
   * @param ctx the parse tree
   */
  exitEdge_symbol?: (ctx: Edge_symbolContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_instantiation`.
   * @param ctx the parse tree
   */
  enterUdp_instantiation?: (ctx: Udp_instantiationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_instantiation`.
   * @param ctx the parse tree
   */
  exitUdp_instantiation?: (ctx: Udp_instantiationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_instance`.
   * @param ctx the parse tree
   */
  enterUdp_instance?: (ctx: Udp_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_instance`.
   * @param ctx the parse tree
   */
  exitUdp_instance?: (ctx: Udp_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.name_of_udp_instance`.
   * @param ctx the parse tree
   */
  enterName_of_udp_instance?: (ctx: Name_of_udp_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.name_of_udp_instance`.
   * @param ctx the parse tree
   */
  exitName_of_udp_instance?: (ctx: Name_of_udp_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.continuous_assign`.
   * @param ctx the parse tree
   */
  enterContinuous_assign?: (ctx: Continuous_assignContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.continuous_assign`.
   * @param ctx the parse tree
   */
  exitContinuous_assign?: (ctx: Continuous_assignContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_net_assignments`.
   * @param ctx the parse tree
   */
  enterList_of_net_assignments?: (ctx: List_of_net_assignmentsContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_net_assignments`.
   * @param ctx the parse tree
   */
  exitList_of_net_assignments?: (ctx: List_of_net_assignmentsContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.net_assignment`.
   * @param ctx the parse tree
   */
  enterNet_assignment?: (ctx: Net_assignmentContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.net_assignment`.
   * @param ctx the parse tree
   */
  exitNet_assignment?: (ctx: Net_assignmentContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.initial_construct`.
   * @param ctx the parse tree
   */
  enterInitial_construct?: (ctx: Initial_constructContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.initial_construct`.
   * @param ctx the parse tree
   */
  exitInitial_construct?: (ctx: Initial_constructContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.always_construct`.
   * @param ctx the parse tree
   */
  enterAlways_construct?: (ctx: Always_constructContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.always_construct`.
   * @param ctx the parse tree
   */
  exitAlways_construct?: (ctx: Always_constructContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.blocking_assignment`.
   * @param ctx the parse tree
   */
  enterBlocking_assignment?: (ctx: Blocking_assignmentContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.blocking_assignment`.
   * @param ctx the parse tree
   */
  exitBlocking_assignment?: (ctx: Blocking_assignmentContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.nonblocking_assignment`.
   * @param ctx the parse tree
   */
  enterNonblocking_assignment?: (ctx: Nonblocking_assignmentContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.nonblocking_assignment`.
   * @param ctx the parse tree
   */
  exitNonblocking_assignment?: (ctx: Nonblocking_assignmentContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.procedural_continuous_assignments`.
   * @param ctx the parse tree
   */
  enterProcedural_continuous_assignments?: (ctx: Procedural_continuous_assignmentsContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.procedural_continuous_assignments`.
   * @param ctx the parse tree
   */
  exitProcedural_continuous_assignments?: (ctx: Procedural_continuous_assignmentsContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.variable_assignment`.
   * @param ctx the parse tree
   */
  enterVariable_assignment?: (ctx: Variable_assignmentContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.variable_assignment`.
   * @param ctx the parse tree
   */
  exitVariable_assignment?: (ctx: Variable_assignmentContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.par_block`.
   * @param ctx the parse tree
   */
  enterPar_block?: (ctx: Par_blockContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.par_block`.
   * @param ctx the parse tree
   */
  exitPar_block?: (ctx: Par_blockContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.block_name`.
   * @param ctx the parse tree
   */
  enterBlock_name?: (ctx: Block_nameContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.block_name`.
   * @param ctx the parse tree
   */
  exitBlock_name?: (ctx: Block_nameContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.seq_block`.
   * @param ctx the parse tree
   */
  enterSeq_block?: (ctx: Seq_blockContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.seq_block`.
   * @param ctx the parse tree
   */
  exitSeq_block?: (ctx: Seq_blockContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.statement`.
   * @param ctx the parse tree
   */
  enterStatement?: (ctx: StatementContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.statement`.
   * @param ctx the parse tree
   */
  exitStatement?: (ctx: StatementContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.statement_or_null`.
   * @param ctx the parse tree
   */
  enterStatement_or_null?: (ctx: Statement_or_nullContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.statement_or_null`.
   * @param ctx the parse tree
   */
  exitStatement_or_null?: (ctx: Statement_or_nullContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.function_statement`.
   * @param ctx the parse tree
   */
  enterFunction_statement?: (ctx: Function_statementContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.function_statement`.
   * @param ctx the parse tree
   */
  exitFunction_statement?: (ctx: Function_statementContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.delay_control`.
   * @param ctx the parse tree
   */
  enterDelay_control?: (ctx: Delay_controlContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.delay_control`.
   * @param ctx the parse tree
   */
  exitDelay_control?: (ctx: Delay_controlContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.delay_or_event_control`.
   * @param ctx the parse tree
   */
  enterDelay_or_event_control?: (ctx: Delay_or_event_controlContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.delay_or_event_control`.
   * @param ctx the parse tree
   */
  exitDelay_or_event_control?: (ctx: Delay_or_event_controlContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.disable_statement`.
   * @param ctx the parse tree
   */
  enterDisable_statement?: (ctx: Disable_statementContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.disable_statement`.
   * @param ctx the parse tree
   */
  exitDisable_statement?: (ctx: Disable_statementContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.event_control`.
   * @param ctx the parse tree
   */
  enterEvent_control?: (ctx: Event_controlContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.event_control`.
   * @param ctx the parse tree
   */
  exitEvent_control?: (ctx: Event_controlContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.event_trigger`.
   * @param ctx the parse tree
   */
  enterEvent_trigger?: (ctx: Event_triggerContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.event_trigger`.
   * @param ctx the parse tree
   */
  exitEvent_trigger?: (ctx: Event_triggerContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.event_expression`.
   * @param ctx the parse tree
   */
  enterEvent_expression?: (ctx: Event_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.event_expression`.
   * @param ctx the parse tree
   */
  exitEvent_expression?: (ctx: Event_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.procedural_timing_control`.
   * @param ctx the parse tree
   */
  enterProcedural_timing_control?: (ctx: Procedural_timing_controlContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.procedural_timing_control`.
   * @param ctx the parse tree
   */
  exitProcedural_timing_control?: (ctx: Procedural_timing_controlContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.procedural_timing_control_statement`.
   * @param ctx the parse tree
   */
  enterProcedural_timing_control_statement?: (ctx: Procedural_timing_control_statementContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.procedural_timing_control_statement`.
   * @param ctx the parse tree
   */
  exitProcedural_timing_control_statement?: (ctx: Procedural_timing_control_statementContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.wait_statement`.
   * @param ctx the parse tree
   */
  enterWait_statement?: (ctx: Wait_statementContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.wait_statement`.
   * @param ctx the parse tree
   */
  exitWait_statement?: (ctx: Wait_statementContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.conditional_statement`.
   * @param ctx the parse tree
   */
  enterConditional_statement?: (ctx: Conditional_statementContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.conditional_statement`.
   * @param ctx the parse tree
   */
  exitConditional_statement?: (ctx: Conditional_statementContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.case_statement`.
   * @param ctx the parse tree
   */
  enterCase_statement?: (ctx: Case_statementContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.case_statement`.
   * @param ctx the parse tree
   */
  exitCase_statement?: (ctx: Case_statementContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.case_item`.
   * @param ctx the parse tree
   */
  enterCase_item?: (ctx: Case_itemContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.case_item`.
   * @param ctx the parse tree
   */
  exitCase_item?: (ctx: Case_itemContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.loop_statement`.
   * @param ctx the parse tree
   */
  enterLoop_statement?: (ctx: Loop_statementContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.loop_statement`.
   * @param ctx the parse tree
   */
  exitLoop_statement?: (ctx: Loop_statementContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.system_task_enable`.
   * @param ctx the parse tree
   */
  enterSystem_task_enable?: (ctx: System_task_enableContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.system_task_enable`.
   * @param ctx the parse tree
   */
  exitSystem_task_enable?: (ctx: System_task_enableContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.sys_task_en_port_list`.
   * @param ctx the parse tree
   */
  enterSys_task_en_port_list?: (ctx: Sys_task_en_port_listContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.sys_task_en_port_list`.
   * @param ctx the parse tree
   */
  exitSys_task_en_port_list?: (ctx: Sys_task_en_port_listContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.sys_task_en_port_item`.
   * @param ctx the parse tree
   */
  enterSys_task_en_port_item?: (ctx: Sys_task_en_port_itemContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.sys_task_en_port_item`.
   * @param ctx the parse tree
   */
  exitSys_task_en_port_item?: (ctx: Sys_task_en_port_itemContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.task_enable`.
   * @param ctx the parse tree
   */
  enterTask_enable?: (ctx: Task_enableContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.task_enable`.
   * @param ctx the parse tree
   */
  exitTask_enable?: (ctx: Task_enableContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.task_en_port_list`.
   * @param ctx the parse tree
   */
  enterTask_en_port_list?: (ctx: Task_en_port_listContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.task_en_port_list`.
   * @param ctx the parse tree
   */
  exitTask_en_port_list?: (ctx: Task_en_port_listContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.specify_block`.
   * @param ctx the parse tree
   */
  enterSpecify_block?: (ctx: Specify_blockContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.specify_block`.
   * @param ctx the parse tree
   */
  exitSpecify_block?: (ctx: Specify_blockContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.specify_item`.
   * @param ctx the parse tree
   */
  enterSpecify_item?: (ctx: Specify_itemContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.specify_item`.
   * @param ctx the parse tree
   */
  exitSpecify_item?: (ctx: Specify_itemContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.pulsestyle_declaration`.
   * @param ctx the parse tree
   */
  enterPulsestyle_declaration?: (ctx: Pulsestyle_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.pulsestyle_declaration`.
   * @param ctx the parse tree
   */
  exitPulsestyle_declaration?: (ctx: Pulsestyle_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.showcancelled_declaration`.
   * @param ctx the parse tree
   */
  enterShowcancelled_declaration?: (ctx: Showcancelled_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.showcancelled_declaration`.
   * @param ctx the parse tree
   */
  exitShowcancelled_declaration?: (ctx: Showcancelled_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.path_declaration`.
   * @param ctx the parse tree
   */
  enterPath_declaration?: (ctx: Path_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.path_declaration`.
   * @param ctx the parse tree
   */
  exitPath_declaration?: (ctx: Path_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.simple_path_declaration`.
   * @param ctx the parse tree
   */
  enterSimple_path_declaration?: (ctx: Simple_path_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.simple_path_declaration`.
   * @param ctx the parse tree
   */
  exitSimple_path_declaration?: (ctx: Simple_path_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.parallel_path_description`.
   * @param ctx the parse tree
   */
  enterParallel_path_description?: (ctx: Parallel_path_descriptionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.parallel_path_description`.
   * @param ctx the parse tree
   */
  exitParallel_path_description?: (ctx: Parallel_path_descriptionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.full_path_description`.
   * @param ctx the parse tree
   */
  enterFull_path_description?: (ctx: Full_path_descriptionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.full_path_description`.
   * @param ctx the parse tree
   */
  exitFull_path_description?: (ctx: Full_path_descriptionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_path_inputs`.
   * @param ctx the parse tree
   */
  enterList_of_path_inputs?: (ctx: List_of_path_inputsContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_path_inputs`.
   * @param ctx the parse tree
   */
  exitList_of_path_inputs?: (ctx: List_of_path_inputsContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_path_outputs`.
   * @param ctx the parse tree
   */
  enterList_of_path_outputs?: (ctx: List_of_path_outputsContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_path_outputs`.
   * @param ctx the parse tree
   */
  exitList_of_path_outputs?: (ctx: List_of_path_outputsContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.specify_input_terminal_descriptor`.
   * @param ctx the parse tree
   */
  enterSpecify_input_terminal_descriptor?: (ctx: Specify_input_terminal_descriptorContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.specify_input_terminal_descriptor`.
   * @param ctx the parse tree
   */
  exitSpecify_input_terminal_descriptor?: (ctx: Specify_input_terminal_descriptorContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.specify_output_terminal_descriptor`.
   * @param ctx the parse tree
   */
  enterSpecify_output_terminal_descriptor?: (ctx: Specify_output_terminal_descriptorContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.specify_output_terminal_descriptor`.
   * @param ctx the parse tree
   */
  exitSpecify_output_terminal_descriptor?: (ctx: Specify_output_terminal_descriptorContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.input_identifier`.
   * @param ctx the parse tree
   */
  enterInput_identifier?: (ctx: Input_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.input_identifier`.
   * @param ctx the parse tree
   */
  exitInput_identifier?: (ctx: Input_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.output_identifier`.
   * @param ctx the parse tree
   */
  enterOutput_identifier?: (ctx: Output_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.output_identifier`.
   * @param ctx the parse tree
   */
  exitOutput_identifier?: (ctx: Output_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.path_delay_value`.
   * @param ctx the parse tree
   */
  enterPath_delay_value?: (ctx: Path_delay_valueContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.path_delay_value`.
   * @param ctx the parse tree
   */
  exitPath_delay_value?: (ctx: Path_delay_valueContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.list_of_path_delay_expressions`.
   * @param ctx the parse tree
   */
  enterList_of_path_delay_expressions?: (ctx: List_of_path_delay_expressionsContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.list_of_path_delay_expressions`.
   * @param ctx the parse tree
   */
  exitList_of_path_delay_expressions?: (ctx: List_of_path_delay_expressionsContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.t_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterT_path_delay_expression?: (ctx: T_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.t_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitT_path_delay_expression?: (ctx: T_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.trise_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterTrise_path_delay_expression?: (ctx: Trise_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.trise_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitTrise_path_delay_expression?: (ctx: Trise_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.tfall_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterTfall_path_delay_expression?: (ctx: Tfall_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.tfall_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitTfall_path_delay_expression?: (ctx: Tfall_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.tz_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterTz_path_delay_expression?: (ctx: Tz_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.tz_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitTz_path_delay_expression?: (ctx: Tz_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.t01_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterT01_path_delay_expression?: (ctx: T01_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.t01_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitT01_path_delay_expression?: (ctx: T01_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.t10_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterT10_path_delay_expression?: (ctx: T10_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.t10_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitT10_path_delay_expression?: (ctx: T10_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.t0z_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterT0z_path_delay_expression?: (ctx: T0z_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.t0z_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitT0z_path_delay_expression?: (ctx: T0z_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.tz1_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterTz1_path_delay_expression?: (ctx: Tz1_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.tz1_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitTz1_path_delay_expression?: (ctx: Tz1_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.t1z_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterT1z_path_delay_expression?: (ctx: T1z_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.t1z_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitT1z_path_delay_expression?: (ctx: T1z_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.tz0_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterTz0_path_delay_expression?: (ctx: Tz0_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.tz0_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitTz0_path_delay_expression?: (ctx: Tz0_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.t0x_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterT0x_path_delay_expression?: (ctx: T0x_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.t0x_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitT0x_path_delay_expression?: (ctx: T0x_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.tx1_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterTx1_path_delay_expression?: (ctx: Tx1_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.tx1_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitTx1_path_delay_expression?: (ctx: Tx1_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.t1x_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterT1x_path_delay_expression?: (ctx: T1x_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.t1x_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitT1x_path_delay_expression?: (ctx: T1x_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.tx0_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterTx0_path_delay_expression?: (ctx: Tx0_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.tx0_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitTx0_path_delay_expression?: (ctx: Tx0_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.txz_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterTxz_path_delay_expression?: (ctx: Txz_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.txz_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitTxz_path_delay_expression?: (ctx: Txz_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.tzx_path_delay_expression`.
   * @param ctx the parse tree
   */
  enterTzx_path_delay_expression?: (ctx: Tzx_path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.tzx_path_delay_expression`.
   * @param ctx the parse tree
   */
  exitTzx_path_delay_expression?: (ctx: Tzx_path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.path_delay_expression`.
   * @param ctx the parse tree
   */
  enterPath_delay_expression?: (ctx: Path_delay_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.path_delay_expression`.
   * @param ctx the parse tree
   */
  exitPath_delay_expression?: (ctx: Path_delay_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.edge_sensitive_path_declaration`.
   * @param ctx the parse tree
   */
  enterEdge_sensitive_path_declaration?: (ctx: Edge_sensitive_path_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.edge_sensitive_path_declaration`.
   * @param ctx the parse tree
   */
  exitEdge_sensitive_path_declaration?: (ctx: Edge_sensitive_path_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.parallel_edge_sensitive_path_description`.
   * @param ctx the parse tree
   */
  enterParallel_edge_sensitive_path_description?: (ctx: Parallel_edge_sensitive_path_descriptionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.parallel_edge_sensitive_path_description`.
   * @param ctx the parse tree
   */
  exitParallel_edge_sensitive_path_description?: (ctx: Parallel_edge_sensitive_path_descriptionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.full_edge_sensitive_path_description`.
   * @param ctx the parse tree
   */
  enterFull_edge_sensitive_path_description?: (ctx: Full_edge_sensitive_path_descriptionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.full_edge_sensitive_path_description`.
   * @param ctx the parse tree
   */
  exitFull_edge_sensitive_path_description?: (ctx: Full_edge_sensitive_path_descriptionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.data_source_expression`.
   * @param ctx the parse tree
   */
  enterData_source_expression?: (ctx: Data_source_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.data_source_expression`.
   * @param ctx the parse tree
   */
  exitData_source_expression?: (ctx: Data_source_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.edge_identifier`.
   * @param ctx the parse tree
   */
  enterEdge_identifier?: (ctx: Edge_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.edge_identifier`.
   * @param ctx the parse tree
   */
  exitEdge_identifier?: (ctx: Edge_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.state_dependent_path_declaration`.
   * @param ctx the parse tree
   */
  enterState_dependent_path_declaration?: (ctx: State_dependent_path_declarationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.state_dependent_path_declaration`.
   * @param ctx the parse tree
   */
  exitState_dependent_path_declaration?: (ctx: State_dependent_path_declarationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.polarity_operator`.
   * @param ctx the parse tree
   */
  enterPolarity_operator?: (ctx: Polarity_operatorContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.polarity_operator`.
   * @param ctx the parse tree
   */
  exitPolarity_operator?: (ctx: Polarity_operatorContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.system_timing_check`.
   * @param ctx the parse tree
   */
  enterSystem_timing_check?: (ctx: System_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.system_timing_check`.
   * @param ctx the parse tree
   */
  exitSystem_timing_check?: (ctx: System_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.setup_timing_check`.
   * @param ctx the parse tree
   */
  enterSetup_timing_check?: (ctx: Setup_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.setup_timing_check`.
   * @param ctx the parse tree
   */
  exitSetup_timing_check?: (ctx: Setup_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.notifier_opt`.
   * @param ctx the parse tree
   */
  enterNotifier_opt?: (ctx: Notifier_optContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.notifier_opt`.
   * @param ctx the parse tree
   */
  exitNotifier_opt?: (ctx: Notifier_optContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.hold_timing_check`.
   * @param ctx the parse tree
   */
  enterHold_timing_check?: (ctx: Hold_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.hold_timing_check`.
   * @param ctx the parse tree
   */
  exitHold_timing_check?: (ctx: Hold_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.setuphold_timing_check`.
   * @param ctx the parse tree
   */
  enterSetuphold_timing_check?: (ctx: Setuphold_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.setuphold_timing_check`.
   * @param ctx the parse tree
   */
  exitSetuphold_timing_check?: (ctx: Setuphold_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.timing_check_opt`.
   * @param ctx the parse tree
   */
  enterTiming_check_opt?: (ctx: Timing_check_optContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.timing_check_opt`.
   * @param ctx the parse tree
   */
  exitTiming_check_opt?: (ctx: Timing_check_optContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.stamptime_cond_opt`.
   * @param ctx the parse tree
   */
  enterStamptime_cond_opt?: (ctx: Stamptime_cond_optContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.stamptime_cond_opt`.
   * @param ctx the parse tree
   */
  exitStamptime_cond_opt?: (ctx: Stamptime_cond_optContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.checktime_cond_opt`.
   * @param ctx the parse tree
   */
  enterChecktime_cond_opt?: (ctx: Checktime_cond_optContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.checktime_cond_opt`.
   * @param ctx the parse tree
   */
  exitChecktime_cond_opt?: (ctx: Checktime_cond_optContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.delayed_ref_opt`.
   * @param ctx the parse tree
   */
  enterDelayed_ref_opt?: (ctx: Delayed_ref_optContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.delayed_ref_opt`.
   * @param ctx the parse tree
   */
  exitDelayed_ref_opt?: (ctx: Delayed_ref_optContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.delayed_data_opt`.
   * @param ctx the parse tree
   */
  enterDelayed_data_opt?: (ctx: Delayed_data_optContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.delayed_data_opt`.
   * @param ctx the parse tree
   */
  exitDelayed_data_opt?: (ctx: Delayed_data_optContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.recovery_timing_check`.
   * @param ctx the parse tree
   */
  enterRecovery_timing_check?: (ctx: Recovery_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.recovery_timing_check`.
   * @param ctx the parse tree
   */
  exitRecovery_timing_check?: (ctx: Recovery_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.removal_timing_check`.
   * @param ctx the parse tree
   */
  enterRemoval_timing_check?: (ctx: Removal_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.removal_timing_check`.
   * @param ctx the parse tree
   */
  exitRemoval_timing_check?: (ctx: Removal_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.recrem_timing_check`.
   * @param ctx the parse tree
   */
  enterRecrem_timing_check?: (ctx: Recrem_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.recrem_timing_check`.
   * @param ctx the parse tree
   */
  exitRecrem_timing_check?: (ctx: Recrem_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.skew_timing_check`.
   * @param ctx the parse tree
   */
  enterSkew_timing_check?: (ctx: Skew_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.skew_timing_check`.
   * @param ctx the parse tree
   */
  exitSkew_timing_check?: (ctx: Skew_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.timeskew_timing_check`.
   * @param ctx the parse tree
   */
  enterTimeskew_timing_check?: (ctx: Timeskew_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.timeskew_timing_check`.
   * @param ctx the parse tree
   */
  exitTimeskew_timing_check?: (ctx: Timeskew_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.skew_timing_check_opt`.
   * @param ctx the parse tree
   */
  enterSkew_timing_check_opt?: (ctx: Skew_timing_check_optContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.skew_timing_check_opt`.
   * @param ctx the parse tree
   */
  exitSkew_timing_check_opt?: (ctx: Skew_timing_check_optContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.event_based_flag_opt`.
   * @param ctx the parse tree
   */
  enterEvent_based_flag_opt?: (ctx: Event_based_flag_optContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.event_based_flag_opt`.
   * @param ctx the parse tree
   */
  exitEvent_based_flag_opt?: (ctx: Event_based_flag_optContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.remain_active_flag_opt`.
   * @param ctx the parse tree
   */
  enterRemain_active_flag_opt?: (ctx: Remain_active_flag_optContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.remain_active_flag_opt`.
   * @param ctx the parse tree
   */
  exitRemain_active_flag_opt?: (ctx: Remain_active_flag_optContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.fullskew_timing_check`.
   * @param ctx the parse tree
   */
  enterFullskew_timing_check?: (ctx: Fullskew_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.fullskew_timing_check`.
   * @param ctx the parse tree
   */
  exitFullskew_timing_check?: (ctx: Fullskew_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.period_timing_check`.
   * @param ctx the parse tree
   */
  enterPeriod_timing_check?: (ctx: Period_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.period_timing_check`.
   * @param ctx the parse tree
   */
  exitPeriod_timing_check?: (ctx: Period_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.width_timing_check`.
   * @param ctx the parse tree
   */
  enterWidth_timing_check?: (ctx: Width_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.width_timing_check`.
   * @param ctx the parse tree
   */
  exitWidth_timing_check?: (ctx: Width_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.threshold_opt`.
   * @param ctx the parse tree
   */
  enterThreshold_opt?: (ctx: Threshold_optContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.threshold_opt`.
   * @param ctx the parse tree
   */
  exitThreshold_opt?: (ctx: Threshold_optContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.nochange_timing_check`.
   * @param ctx the parse tree
   */
  enterNochange_timing_check?: (ctx: Nochange_timing_checkContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.nochange_timing_check`.
   * @param ctx the parse tree
   */
  exitNochange_timing_check?: (ctx: Nochange_timing_checkContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.checktime_condition`.
   * @param ctx the parse tree
   */
  enterChecktime_condition?: (ctx: Checktime_conditionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.checktime_condition`.
   * @param ctx the parse tree
   */
  exitChecktime_condition?: (ctx: Checktime_conditionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.controlled_reference_event`.
   * @param ctx the parse tree
   */
  enterControlled_reference_event?: (ctx: Controlled_reference_eventContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.controlled_reference_event`.
   * @param ctx the parse tree
   */
  exitControlled_reference_event?: (ctx: Controlled_reference_eventContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.data_event`.
   * @param ctx the parse tree
   */
  enterData_event?: (ctx: Data_eventContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.data_event`.
   * @param ctx the parse tree
   */
  exitData_event?: (ctx: Data_eventContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.delayed_data`.
   * @param ctx the parse tree
   */
  enterDelayed_data?: (ctx: Delayed_dataContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.delayed_data`.
   * @param ctx the parse tree
   */
  exitDelayed_data?: (ctx: Delayed_dataContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.delayed_reference`.
   * @param ctx the parse tree
   */
  enterDelayed_reference?: (ctx: Delayed_referenceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.delayed_reference`.
   * @param ctx the parse tree
   */
  exitDelayed_reference?: (ctx: Delayed_referenceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.end_edge_offset`.
   * @param ctx the parse tree
   */
  enterEnd_edge_offset?: (ctx: End_edge_offsetContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.end_edge_offset`.
   * @param ctx the parse tree
   */
  exitEnd_edge_offset?: (ctx: End_edge_offsetContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.event_based_flag`.
   * @param ctx the parse tree
   */
  enterEvent_based_flag?: (ctx: Event_based_flagContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.event_based_flag`.
   * @param ctx the parse tree
   */
  exitEvent_based_flag?: (ctx: Event_based_flagContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.notifier`.
   * @param ctx the parse tree
   */
  enterNotifier?: (ctx: NotifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.notifier`.
   * @param ctx the parse tree
   */
  exitNotifier?: (ctx: NotifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.reference_event`.
   * @param ctx the parse tree
   */
  enterReference_event?: (ctx: Reference_eventContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.reference_event`.
   * @param ctx the parse tree
   */
  exitReference_event?: (ctx: Reference_eventContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.remain_active_flag`.
   * @param ctx the parse tree
   */
  enterRemain_active_flag?: (ctx: Remain_active_flagContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.remain_active_flag`.
   * @param ctx the parse tree
   */
  exitRemain_active_flag?: (ctx: Remain_active_flagContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.stamptime_condition`.
   * @param ctx the parse tree
   */
  enterStamptime_condition?: (ctx: Stamptime_conditionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.stamptime_condition`.
   * @param ctx the parse tree
   */
  exitStamptime_condition?: (ctx: Stamptime_conditionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.start_edge_offset`.
   * @param ctx the parse tree
   */
  enterStart_edge_offset?: (ctx: Start_edge_offsetContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.start_edge_offset`.
   * @param ctx the parse tree
   */
  exitStart_edge_offset?: (ctx: Start_edge_offsetContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.threshold`.
   * @param ctx the parse tree
   */
  enterThreshold?: (ctx: ThresholdContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.threshold`.
   * @param ctx the parse tree
   */
  exitThreshold?: (ctx: ThresholdContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.timing_check_limit`.
   * @param ctx the parse tree
   */
  enterTiming_check_limit?: (ctx: Timing_check_limitContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.timing_check_limit`.
   * @param ctx the parse tree
   */
  exitTiming_check_limit?: (ctx: Timing_check_limitContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.timing_check_event`.
   * @param ctx the parse tree
   */
  enterTiming_check_event?: (ctx: Timing_check_eventContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.timing_check_event`.
   * @param ctx the parse tree
   */
  exitTiming_check_event?: (ctx: Timing_check_eventContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.controlled_timing_check_event`.
   * @param ctx the parse tree
   */
  enterControlled_timing_check_event?: (ctx: Controlled_timing_check_eventContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.controlled_timing_check_event`.
   * @param ctx the parse tree
   */
  exitControlled_timing_check_event?: (ctx: Controlled_timing_check_eventContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.timing_check_event_control`.
   * @param ctx the parse tree
   */
  enterTiming_check_event_control?: (ctx: Timing_check_event_controlContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.timing_check_event_control`.
   * @param ctx the parse tree
   */
  exitTiming_check_event_control?: (ctx: Timing_check_event_controlContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.specify_terminal_descriptor`.
   * @param ctx the parse tree
   */
  enterSpecify_terminal_descriptor?: (ctx: Specify_terminal_descriptorContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.specify_terminal_descriptor`.
   * @param ctx the parse tree
   */
  exitSpecify_terminal_descriptor?: (ctx: Specify_terminal_descriptorContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.edge_control_specifier`.
   * @param ctx the parse tree
   */
  enterEdge_control_specifier?: (ctx: Edge_control_specifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.edge_control_specifier`.
   * @param ctx the parse tree
   */
  exitEdge_control_specifier?: (ctx: Edge_control_specifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.edge_descriptor`.
   * @param ctx the parse tree
   */
  enterEdge_descriptor?: (ctx: Edge_descriptorContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.edge_descriptor`.
   * @param ctx the parse tree
   */
  exitEdge_descriptor?: (ctx: Edge_descriptorContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.timing_check_condition`.
   * @param ctx the parse tree
   */
  enterTiming_check_condition?: (ctx: Timing_check_conditionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.timing_check_condition`.
   * @param ctx the parse tree
   */
  exitTiming_check_condition?: (ctx: Timing_check_conditionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.scalar_timing_check_condition`.
   * @param ctx the parse tree
   */
  enterScalar_timing_check_condition?: (ctx: Scalar_timing_check_conditionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.scalar_timing_check_condition`.
   * @param ctx the parse tree
   */
  exitScalar_timing_check_condition?: (ctx: Scalar_timing_check_conditionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.scalar_constant`.
   * @param ctx the parse tree
   */
  enterScalar_constant?: (ctx: Scalar_constantContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.scalar_constant`.
   * @param ctx the parse tree
   */
  exitScalar_constant?: (ctx: Scalar_constantContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.concatenation`.
   * @param ctx the parse tree
   */
  enterConcatenation?: (ctx: ConcatenationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.concatenation`.
   * @param ctx the parse tree
   */
  exitConcatenation?: (ctx: ConcatenationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.constant_concatenation`.
   * @param ctx the parse tree
   */
  enterConstant_concatenation?: (ctx: Constant_concatenationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.constant_concatenation`.
   * @param ctx the parse tree
   */
  exitConstant_concatenation?: (ctx: Constant_concatenationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.constant_multiple_concatenation`.
   * @param ctx the parse tree
   */
  enterConstant_multiple_concatenation?: (ctx: Constant_multiple_concatenationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.constant_multiple_concatenation`.
   * @param ctx the parse tree
   */
  exitConstant_multiple_concatenation?: (ctx: Constant_multiple_concatenationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_path_concatenation`.
   * @param ctx the parse tree
   */
  enterModule_path_concatenation?: (ctx: Module_path_concatenationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_path_concatenation`.
   * @param ctx the parse tree
   */
  exitModule_path_concatenation?: (ctx: Module_path_concatenationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_path_multiple_concatenation`.
   * @param ctx the parse tree
   */
  enterModule_path_multiple_concatenation?: (ctx: Module_path_multiple_concatenationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_path_multiple_concatenation`.
   * @param ctx the parse tree
   */
  exitModule_path_multiple_concatenation?: (ctx: Module_path_multiple_concatenationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.multiple_concatenation`.
   * @param ctx the parse tree
   */
  enterMultiple_concatenation?: (ctx: Multiple_concatenationContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.multiple_concatenation`.
   * @param ctx the parse tree
   */
  exitMultiple_concatenation?: (ctx: Multiple_concatenationContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.constant_function_call`.
   * @param ctx the parse tree
   */
  enterConstant_function_call?: (ctx: Constant_function_callContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.constant_function_call`.
   * @param ctx the parse tree
   */
  exitConstant_function_call?: (ctx: Constant_function_callContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.constant_system_function_call`.
   * @param ctx the parse tree
   */
  enterConstant_system_function_call?: (ctx: Constant_system_function_callContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.constant_system_function_call`.
   * @param ctx the parse tree
   */
  exitConstant_system_function_call?: (ctx: Constant_system_function_callContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.function_call`.
   * @param ctx the parse tree
   */
  enterFunction_call?: (ctx: Function_callContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.function_call`.
   * @param ctx the parse tree
   */
  exitFunction_call?: (ctx: Function_callContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.system_function_call`.
   * @param ctx the parse tree
   */
  enterSystem_function_call?: (ctx: System_function_callContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.system_function_call`.
   * @param ctx the parse tree
   */
  exitSystem_function_call?: (ctx: System_function_callContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.sys_func_call_port_list`.
   * @param ctx the parse tree
   */
  enterSys_func_call_port_list?: (ctx: Sys_func_call_port_listContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.sys_func_call_port_list`.
   * @param ctx the parse tree
   */
  exitSys_func_call_port_list?: (ctx: Sys_func_call_port_listContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.base_expression`.
   * @param ctx the parse tree
   */
  enterBase_expression?: (ctx: Base_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.base_expression`.
   * @param ctx the parse tree
   */
  exitBase_expression?: (ctx: Base_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.constant_base_expression`.
   * @param ctx the parse tree
   */
  enterConstant_base_expression?: (ctx: Constant_base_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.constant_base_expression`.
   * @param ctx the parse tree
   */
  exitConstant_base_expression?: (ctx: Constant_base_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.constant_expression`.
   * @param ctx the parse tree
   */
  enterConstant_expression?: (ctx: Constant_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.constant_expression`.
   * @param ctx the parse tree
   */
  exitConstant_expression?: (ctx: Constant_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.constant_mintypmax_expression`.
   * @param ctx the parse tree
   */
  enterConstant_mintypmax_expression?: (ctx: Constant_mintypmax_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.constant_mintypmax_expression`.
   * @param ctx the parse tree
   */
  exitConstant_mintypmax_expression?: (ctx: Constant_mintypmax_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.constant_range_expression`.
   * @param ctx the parse tree
   */
  enterConstant_range_expression?: (ctx: Constant_range_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.constant_range_expression`.
   * @param ctx the parse tree
   */
  exitConstant_range_expression?: (ctx: Constant_range_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.dimension_constant_expression`.
   * @param ctx the parse tree
   */
  enterDimension_constant_expression?: (ctx: Dimension_constant_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.dimension_constant_expression`.
   * @param ctx the parse tree
   */
  exitDimension_constant_expression?: (ctx: Dimension_constant_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.expression`.
   * @param ctx the parse tree
   */
  enterExpression?: (ctx: ExpressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.expression`.
   * @param ctx the parse tree
   */
  exitExpression?: (ctx: ExpressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.lsb_constant_expression`.
   * @param ctx the parse tree
   */
  enterLsb_constant_expression?: (ctx: Lsb_constant_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.lsb_constant_expression`.
   * @param ctx the parse tree
   */
  exitLsb_constant_expression?: (ctx: Lsb_constant_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.mintypmax_expression`.
   * @param ctx the parse tree
   */
  enterMintypmax_expression?: (ctx: Mintypmax_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.mintypmax_expression`.
   * @param ctx the parse tree
   */
  exitMintypmax_expression?: (ctx: Mintypmax_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_path_expression`.
   * @param ctx the parse tree
   */
  enterModule_path_expression?: (ctx: Module_path_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_path_expression`.
   * @param ctx the parse tree
   */
  exitModule_path_expression?: (ctx: Module_path_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_path_mintypmax_expression`.
   * @param ctx the parse tree
   */
  enterModule_path_mintypmax_expression?: (ctx: Module_path_mintypmax_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_path_mintypmax_expression`.
   * @param ctx the parse tree
   */
  exitModule_path_mintypmax_expression?: (ctx: Module_path_mintypmax_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.msb_constant_expression`.
   * @param ctx the parse tree
   */
  enterMsb_constant_expression?: (ctx: Msb_constant_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.msb_constant_expression`.
   * @param ctx the parse tree
   */
  exitMsb_constant_expression?: (ctx: Msb_constant_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.range_expression`.
   * @param ctx the parse tree
   */
  enterRange_expression?: (ctx: Range_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.range_expression`.
   * @param ctx the parse tree
   */
  exitRange_expression?: (ctx: Range_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.width_constant_expression`.
   * @param ctx the parse tree
   */
  enterWidth_constant_expression?: (ctx: Width_constant_expressionContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.width_constant_expression`.
   * @param ctx the parse tree
   */
  exitWidth_constant_expression?: (ctx: Width_constant_expressionContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.constant_primary`.
   * @param ctx the parse tree
   */
  enterConstant_primary?: (ctx: Constant_primaryContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.constant_primary`.
   * @param ctx the parse tree
   */
  exitConstant_primary?: (ctx: Constant_primaryContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_path_primary`.
   * @param ctx the parse tree
   */
  enterModule_path_primary?: (ctx: Module_path_primaryContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_path_primary`.
   * @param ctx the parse tree
   */
  exitModule_path_primary?: (ctx: Module_path_primaryContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.primary`.
   * @param ctx the parse tree
   */
  enterPrimary?: (ctx: PrimaryContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.primary`.
   * @param ctx the parse tree
   */
  exitPrimary?: (ctx: PrimaryContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.select_`.
   * @param ctx the parse tree
   */
  enterSelect_?: (ctx: Select_Context) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.select_`.
   * @param ctx the parse tree
   */
  exitSelect_?: (ctx: Select_Context) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.bit_select`.
   * @param ctx the parse tree
   */
  enterBit_select?: (ctx: Bit_selectContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.bit_select`.
   * @param ctx the parse tree
   */
  exitBit_select?: (ctx: Bit_selectContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.net_lvalue`.
   * @param ctx the parse tree
   */
  enterNet_lvalue?: (ctx: Net_lvalueContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.net_lvalue`.
   * @param ctx the parse tree
   */
  exitNet_lvalue?: (ctx: Net_lvalueContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.const_select`.
   * @param ctx the parse tree
   */
  enterConst_select?: (ctx: Const_selectContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.const_select`.
   * @param ctx the parse tree
   */
  exitConst_select?: (ctx: Const_selectContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.const_bit_select`.
   * @param ctx the parse tree
   */
  enterConst_bit_select?: (ctx: Const_bit_selectContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.const_bit_select`.
   * @param ctx the parse tree
   */
  exitConst_bit_select?: (ctx: Const_bit_selectContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.variable_lvalue`.
   * @param ctx the parse tree
   */
  enterVariable_lvalue?: (ctx: Variable_lvalueContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.variable_lvalue`.
   * @param ctx the parse tree
   */
  exitVariable_lvalue?: (ctx: Variable_lvalueContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.unary_operator`.
   * @param ctx the parse tree
   */
  enterUnary_operator?: (ctx: Unary_operatorContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.unary_operator`.
   * @param ctx the parse tree
   */
  exitUnary_operator?: (ctx: Unary_operatorContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.unary_module_path_operator`.
   * @param ctx the parse tree
   */
  enterUnary_module_path_operator?: (ctx: Unary_module_path_operatorContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.unary_module_path_operator`.
   * @param ctx the parse tree
   */
  exitUnary_module_path_operator?: (ctx: Unary_module_path_operatorContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.number`.
   * @param ctx the parse tree
   */
  enterNumber?: (ctx: NumberContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.number`.
   * @param ctx the parse tree
   */
  exitNumber?: (ctx: NumberContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.real_number`.
   * @param ctx the parse tree
   */
  enterReal_number?: (ctx: Real_numberContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.real_number`.
   * @param ctx the parse tree
   */
  exitReal_number?: (ctx: Real_numberContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.decimal_number`.
   * @param ctx the parse tree
   */
  enterDecimal_number?: (ctx: Decimal_numberContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.decimal_number`.
   * @param ctx the parse tree
   */
  exitDecimal_number?: (ctx: Decimal_numberContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.binary_number`.
   * @param ctx the parse tree
   */
  enterBinary_number?: (ctx: Binary_numberContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.binary_number`.
   * @param ctx the parse tree
   */
  exitBinary_number?: (ctx: Binary_numberContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.octal_number`.
   * @param ctx the parse tree
   */
  enterOctal_number?: (ctx: Octal_numberContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.octal_number`.
   * @param ctx the parse tree
   */
  exitOctal_number?: (ctx: Octal_numberContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.hex_number`.
   * @param ctx the parse tree
   */
  enterHex_number?: (ctx: Hex_numberContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.hex_number`.
   * @param ctx the parse tree
   */
  exitHex_number?: (ctx: Hex_numberContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.size`.
   * @param ctx the parse tree
   */
  enterSize?: (ctx: SizeContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.size`.
   * @param ctx the parse tree
   */
  exitSize?: (ctx: SizeContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.fixed_point_number`.
   * @param ctx the parse tree
   */
  enterFixed_point_number?: (ctx: Fixed_point_numberContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.fixed_point_number`.
   * @param ctx the parse tree
   */
  exitFixed_point_number?: (ctx: Fixed_point_numberContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.exponential_number`.
   * @param ctx the parse tree
   */
  enterExponential_number?: (ctx: Exponential_numberContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.exponential_number`.
   * @param ctx the parse tree
   */
  exitExponential_number?: (ctx: Exponential_numberContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.unsigned_number`.
   * @param ctx the parse tree
   */
  enterUnsigned_number?: (ctx: Unsigned_numberContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.unsigned_number`.
   * @param ctx the parse tree
   */
  exitUnsigned_number?: (ctx: Unsigned_numberContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.decimal_value`.
   * @param ctx the parse tree
   */
  enterDecimal_value?: (ctx: Decimal_valueContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.decimal_value`.
   * @param ctx the parse tree
   */
  exitDecimal_value?: (ctx: Decimal_valueContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.binary_value`.
   * @param ctx the parse tree
   */
  enterBinary_value?: (ctx: Binary_valueContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.binary_value`.
   * @param ctx the parse tree
   */
  exitBinary_value?: (ctx: Binary_valueContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.octal_value`.
   * @param ctx the parse tree
   */
  enterOctal_value?: (ctx: Octal_valueContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.octal_value`.
   * @param ctx the parse tree
   */
  exitOctal_value?: (ctx: Octal_valueContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.hex_value`.
   * @param ctx the parse tree
   */
  enterHex_value?: (ctx: Hex_valueContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.hex_value`.
   * @param ctx the parse tree
   */
  exitHex_value?: (ctx: Hex_valueContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.decimal_base`.
   * @param ctx the parse tree
   */
  enterDecimal_base?: (ctx: Decimal_baseContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.decimal_base`.
   * @param ctx the parse tree
   */
  exitDecimal_base?: (ctx: Decimal_baseContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.binary_base`.
   * @param ctx the parse tree
   */
  enterBinary_base?: (ctx: Binary_baseContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.binary_base`.
   * @param ctx the parse tree
   */
  exitBinary_base?: (ctx: Binary_baseContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.octal_base`.
   * @param ctx the parse tree
   */
  enterOctal_base?: (ctx: Octal_baseContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.octal_base`.
   * @param ctx the parse tree
   */
  exitOctal_base?: (ctx: Octal_baseContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.hex_base`.
   * @param ctx the parse tree
   */
  enterHex_base?: (ctx: Hex_baseContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.hex_base`.
   * @param ctx the parse tree
   */
  exitHex_base?: (ctx: Hex_baseContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.string_`.
   * @param ctx the parse tree
   */
  enterString_?: (ctx: String_Context) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.string_`.
   * @param ctx the parse tree
   */
  exitString_?: (ctx: String_Context) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.attribute_instance`.
   * @param ctx the parse tree
   */
  enterAttribute_instance?: (ctx: Attribute_instanceContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.attribute_instance`.
   * @param ctx the parse tree
   */
  exitAttribute_instance?: (ctx: Attribute_instanceContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.attr_spec`.
   * @param ctx the parse tree
   */
  enterAttr_spec?: (ctx: Attr_specContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.attr_spec`.
   * @param ctx the parse tree
   */
  exitAttr_spec?: (ctx: Attr_specContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.attr_name`.
   * @param ctx the parse tree
   */
  enterAttr_name?: (ctx: Attr_nameContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.attr_name`.
   * @param ctx the parse tree
   */
  exitAttr_name?: (ctx: Attr_nameContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.block_identifier`.
   * @param ctx the parse tree
   */
  enterBlock_identifier?: (ctx: Block_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.block_identifier`.
   * @param ctx the parse tree
   */
  exitBlock_identifier?: (ctx: Block_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.cell_identifier`.
   * @param ctx the parse tree
   */
  enterCell_identifier?: (ctx: Cell_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.cell_identifier`.
   * @param ctx the parse tree
   */
  exitCell_identifier?: (ctx: Cell_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.config_identifier`.
   * @param ctx the parse tree
   */
  enterConfig_identifier?: (ctx: Config_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.config_identifier`.
   * @param ctx the parse tree
   */
  exitConfig_identifier?: (ctx: Config_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.escaped_identifier`.
   * @param ctx the parse tree
   */
  enterEscaped_identifier?: (ctx: Escaped_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.escaped_identifier`.
   * @param ctx the parse tree
   */
  exitEscaped_identifier?: (ctx: Escaped_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.event_identifier`.
   * @param ctx the parse tree
   */
  enterEvent_identifier?: (ctx: Event_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.event_identifier`.
   * @param ctx the parse tree
   */
  exitEvent_identifier?: (ctx: Event_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.function_identifier`.
   * @param ctx the parse tree
   */
  enterFunction_identifier?: (ctx: Function_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.function_identifier`.
   * @param ctx the parse tree
   */
  exitFunction_identifier?: (ctx: Function_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.gate_instance_identifier`.
   * @param ctx the parse tree
   */
  enterGate_instance_identifier?: (ctx: Gate_instance_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.gate_instance_identifier`.
   * @param ctx the parse tree
   */
  exitGate_instance_identifier?: (ctx: Gate_instance_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.generate_block_identifier`.
   * @param ctx the parse tree
   */
  enterGenerate_block_identifier?: (ctx: Generate_block_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.generate_block_identifier`.
   * @param ctx the parse tree
   */
  exitGenerate_block_identifier?: (ctx: Generate_block_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.genvar_identifier`.
   * @param ctx the parse tree
   */
  enterGenvar_identifier?: (ctx: Genvar_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.genvar_identifier`.
   * @param ctx the parse tree
   */
  exitGenvar_identifier?: (ctx: Genvar_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.hierarchical_identifier`.
   * @param ctx the parse tree
   */
  enterHierarchical_identifier?: (ctx: Hierarchical_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.hierarchical_identifier`.
   * @param ctx the parse tree
   */
  exitHierarchical_identifier?: (ctx: Hierarchical_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.hier_ref`.
   * @param ctx the parse tree
   */
  enterHier_ref?: (ctx: Hier_refContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.hier_ref`.
   * @param ctx the parse tree
   */
  exitHier_ref?: (ctx: Hier_refContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.identifier`.
   * @param ctx the parse tree
   */
  enterIdentifier?: (ctx: IdentifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.identifier`.
   * @param ctx the parse tree
   */
  exitIdentifier?: (ctx: IdentifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.input_port_identifier`.
   * @param ctx the parse tree
   */
  enterInput_port_identifier?: (ctx: Input_port_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.input_port_identifier`.
   * @param ctx the parse tree
   */
  exitInput_port_identifier?: (ctx: Input_port_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.instance_identifier`.
   * @param ctx the parse tree
   */
  enterInstance_identifier?: (ctx: Instance_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.instance_identifier`.
   * @param ctx the parse tree
   */
  exitInstance_identifier?: (ctx: Instance_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.library_identifier`.
   * @param ctx the parse tree
   */
  enterLibrary_identifier?: (ctx: Library_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.library_identifier`.
   * @param ctx the parse tree
   */
  exitLibrary_identifier?: (ctx: Library_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_identifier`.
   * @param ctx the parse tree
   */
  enterModule_identifier?: (ctx: Module_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_identifier`.
   * @param ctx the parse tree
   */
  exitModule_identifier?: (ctx: Module_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.module_instance_identifier`.
   * @param ctx the parse tree
   */
  enterModule_instance_identifier?: (ctx: Module_instance_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.module_instance_identifier`.
   * @param ctx the parse tree
   */
  exitModule_instance_identifier?: (ctx: Module_instance_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.net_identifier`.
   * @param ctx the parse tree
   */
  enterNet_identifier?: (ctx: Net_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.net_identifier`.
   * @param ctx the parse tree
   */
  exitNet_identifier?: (ctx: Net_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.output_port_identifier`.
   * @param ctx the parse tree
   */
  enterOutput_port_identifier?: (ctx: Output_port_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.output_port_identifier`.
   * @param ctx the parse tree
   */
  exitOutput_port_identifier?: (ctx: Output_port_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.parameter_identifier`.
   * @param ctx the parse tree
   */
  enterParameter_identifier?: (ctx: Parameter_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.parameter_identifier`.
   * @param ctx the parse tree
   */
  exitParameter_identifier?: (ctx: Parameter_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.port_identifier`.
   * @param ctx the parse tree
   */
  enterPort_identifier?: (ctx: Port_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.port_identifier`.
   * @param ctx the parse tree
   */
  exitPort_identifier?: (ctx: Port_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.real_identifier`.
   * @param ctx the parse tree
   */
  enterReal_identifier?: (ctx: Real_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.real_identifier`.
   * @param ctx the parse tree
   */
  exitReal_identifier?: (ctx: Real_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.simple_identifier`.
   * @param ctx the parse tree
   */
  enterSimple_identifier?: (ctx: Simple_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.simple_identifier`.
   * @param ctx the parse tree
   */
  exitSimple_identifier?: (ctx: Simple_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.specparam_identifier`.
   * @param ctx the parse tree
   */
  enterSpecparam_identifier?: (ctx: Specparam_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.specparam_identifier`.
   * @param ctx the parse tree
   */
  exitSpecparam_identifier?: (ctx: Specparam_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.system_function_identifier`.
   * @param ctx the parse tree
   */
  enterSystem_function_identifier?: (ctx: System_function_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.system_function_identifier`.
   * @param ctx the parse tree
   */
  exitSystem_function_identifier?: (ctx: System_function_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.system_task_identifier`.
   * @param ctx the parse tree
   */
  enterSystem_task_identifier?: (ctx: System_task_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.system_task_identifier`.
   * @param ctx the parse tree
   */
  exitSystem_task_identifier?: (ctx: System_task_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.task_identifier`.
   * @param ctx the parse tree
   */
  enterTask_identifier?: (ctx: Task_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.task_identifier`.
   * @param ctx the parse tree
   */
  exitTask_identifier?: (ctx: Task_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.terminal_identifier`.
   * @param ctx the parse tree
   */
  enterTerminal_identifier?: (ctx: Terminal_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.terminal_identifier`.
   * @param ctx the parse tree
   */
  exitTerminal_identifier?: (ctx: Terminal_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.topmodule_identifier`.
   * @param ctx the parse tree
   */
  enterTopmodule_identifier?: (ctx: Topmodule_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.topmodule_identifier`.
   * @param ctx the parse tree
   */
  exitTopmodule_identifier?: (ctx: Topmodule_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_identifier`.
   * @param ctx the parse tree
   */
  enterUdp_identifier?: (ctx: Udp_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_identifier`.
   * @param ctx the parse tree
   */
  exitUdp_identifier?: (ctx: Udp_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.udp_instance_identifier`.
   * @param ctx the parse tree
   */
  enterUdp_instance_identifier?: (ctx: Udp_instance_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.udp_instance_identifier`.
   * @param ctx the parse tree
   */
  exitUdp_instance_identifier?: (ctx: Udp_instance_identifierContext) => void;

  /**
   * Enter a parse tree produced by `VerilogParser.variable_identifier`.
   * @param ctx the parse tree
   */
  enterVariable_identifier?: (ctx: Variable_identifierContext) => void;
  /**
   * Exit a parse tree produced by `VerilogParser.variable_identifier`.
   * @param ctx the parse tree
   */
  exitVariable_identifier?: (ctx: Variable_identifierContext) => void;
}

