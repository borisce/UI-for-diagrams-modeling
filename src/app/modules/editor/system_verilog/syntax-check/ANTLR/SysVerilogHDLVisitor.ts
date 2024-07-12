// Generated from ./SysVerilogHDL.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { Module_keywordContext } from "./SysVerilogHDLParser";
import { Struct_keywordContext } from "./SysVerilogHDLParser";
import { Any_case_keywordContext } from "./SysVerilogHDLParser";
import { SemicolonContext } from "./SysVerilogHDLParser";
import { Unary_operatorContext } from "./SysVerilogHDLParser";
import { Binary_operatorContext } from "./SysVerilogHDLParser";
import { Unary_assign_operatorContext } from "./SysVerilogHDLParser";
import { Binary_assign_operatorContext } from "./SysVerilogHDLParser";
import { Source_textContext } from "./SysVerilogHDLParser";
import { Description_starContext } from "./SysVerilogHDLParser";
import { Header_textContext } from "./SysVerilogHDLParser";
import { Design_attributeContext } from "./SysVerilogHDLParser";
import { Compiler_directiveContext } from "./SysVerilogHDLParser";
import { DescriptionContext } from "./SysVerilogHDLParser";
import { Module_declarationContext } from "./SysVerilogHDLParser";
import { Module_identifierContext } from "./SysVerilogHDLParser";
import { Module_interfaceContext } from "./SysVerilogHDLParser";
import { Module_parameter_interfaceContext } from "./SysVerilogHDLParser";
import { Module_port_interfaceContext } from "./SysVerilogHDLParser";
import { Module_item_starContext } from "./SysVerilogHDLParser";
import { Module_itemContext } from "./SysVerilogHDLParser";
import { Colon_module_identifierContext } from "./SysVerilogHDLParser";
import { Package_declarationContext } from "./SysVerilogHDLParser";
import { Package_identifierContext } from "./SysVerilogHDLParser";
import { Colon_package_identifierContext } from "./SysVerilogHDLParser";
import { Package_item_starContext } from "./SysVerilogHDLParser";
import { Package_itemContext } from "./SysVerilogHDLParser";
import { Import_packageContext } from "./SysVerilogHDLParser";
import { Package_item_identifierContext } from "./SysVerilogHDLParser";
import { Parameter_item_semicolonContext } from "./SysVerilogHDLParser";
import { Parameter_itemContext } from "./SysVerilogHDLParser";
import { Attr_port_item_semicolonContext } from "./SysVerilogHDLParser";
import { Attr_variable_item_semicolonContext } from "./SysVerilogHDLParser";
import { Variable_itemContext } from "./SysVerilogHDLParser";
import { Subroutine_item_semicolonContext } from "./SysVerilogHDLParser";
import { Subroutine_itemContext } from "./SysVerilogHDLParser";
import { Attr_construct_itemContext } from "./SysVerilogHDLParser";
import { Construct_itemContext } from "./SysVerilogHDLParser";
import { Attr_component_itemContext } from "./SysVerilogHDLParser";
import { Component_itemContext } from "./SysVerilogHDLParser";
import { Compiler_itemContext } from "./SysVerilogHDLParser";
import { Type_itemContext } from "./SysVerilogHDLParser";
import { Null_itemContext } from "./SysVerilogHDLParser";
import { List_of_interface_parametersContext } from "./SysVerilogHDLParser";
import { List_of_parameter_declarationsContext } from "./SysVerilogHDLParser";
import { Comma_parameter_declaration_starContext } from "./SysVerilogHDLParser";
import { Comma_parameter_declarationContext } from "./SysVerilogHDLParser";
import { List_of_parameter_descriptionsContext } from "./SysVerilogHDLParser";
import { Param_declarationContext } from "./SysVerilogHDLParser";
import { Param_descriptionContext } from "./SysVerilogHDLParser";
import { Parameter_declarationContext } from "./SysVerilogHDLParser";
import { Local_parameter_declarationContext } from "./SysVerilogHDLParser";
import { Parameter_overrideContext } from "./SysVerilogHDLParser";
import { List_of_tf_interface_portsContext } from "./SysVerilogHDLParser";
import { List_of_tf_port_declarationsContext } from "./SysVerilogHDLParser";
import { List_of_tf_port_declarations_commaContext } from "./SysVerilogHDLParser";
import { Comma_attr_tf_port_declaration_starContext } from "./SysVerilogHDLParser";
import { Comma_attr_tf_port_declarationContext } from "./SysVerilogHDLParser";
import { List_of_tf_port_declarations_semicolonContext } from "./SysVerilogHDLParser";
import { Attr_tf_port_declaration_semicolon_plusContext } from "./SysVerilogHDLParser";
import { Attr_tf_port_declaration_semicolon_starContext } from "./SysVerilogHDLParser";
import { Attr_tf_port_declaration_semicolonContext } from "./SysVerilogHDLParser";
import { Attr_tf_port_declarationContext } from "./SysVerilogHDLParser";
import { Tf_port_declarationContext } from "./SysVerilogHDLParser";
import { List_of_interface_portsContext } from "./SysVerilogHDLParser";
import { List_of_port_identifiersContext } from "./SysVerilogHDLParser";
import { Comma_port_identifier_starContext } from "./SysVerilogHDLParser";
import { Comma_port_identifierContext } from "./SysVerilogHDLParser";
import { Port_identifierContext } from "./SysVerilogHDLParser";
import { List_of_port_declarationsContext } from "./SysVerilogHDLParser";
import { List_of_port_declarations_commaContext } from "./SysVerilogHDLParser";
import { Comma_attr_port_declaration_starContext } from "./SysVerilogHDLParser";
import { Comma_attr_port_declarationContext } from "./SysVerilogHDLParser";
import { List_of_port_declarations_semicolonContext } from "./SysVerilogHDLParser";
import { Attr_port_declaration_semicolon_plusContext } from "./SysVerilogHDLParser";
import { Attr_port_declaration_semicolon_starContext } from "./SysVerilogHDLParser";
import { Attr_port_declaration_semicolonContext } from "./SysVerilogHDLParser";
import { Attr_port_declarationContext } from "./SysVerilogHDLParser";
import { Port_declarationContext } from "./SysVerilogHDLParser";
import { Port_descriptionContext } from "./SysVerilogHDLParser";
import { Inout_descriptionContext } from "./SysVerilogHDLParser";
import { Input_descriptionContext } from "./SysVerilogHDLParser";
import { Output_descriptionContext } from "./SysVerilogHDLParser";
import { Ref_descriptionContext } from "./SysVerilogHDLParser";
import { Tf_declarationContext } from "./SysVerilogHDLParser";
import { Inout_declarationContext } from "./SysVerilogHDLParser";
import { Input_declarationContext } from "./SysVerilogHDLParser";
import { Output_declarationContext } from "./SysVerilogHDLParser";
import { Ref_declarationContext } from "./SysVerilogHDLParser";
import { User_typeContext } from "./SysVerilogHDLParser";
import { User_type_identiferContext } from "./SysVerilogHDLParser";
import { Dimension_plusContext } from "./SysVerilogHDLParser";
import { Dimension_starContext } from "./SysVerilogHDLParser";
import { DimensionContext } from "./SysVerilogHDLParser";
import { Range_expressionContext } from "./SysVerilogHDLParser";
import { Index_expressionContext } from "./SysVerilogHDLParser";
import { Sb_rangeContext } from "./SysVerilogHDLParser";
import { Base_increment_rangeContext } from "./SysVerilogHDLParser";
import { Base_decrement_rangeContext } from "./SysVerilogHDLParser";
import { Base_expressionContext } from "./SysVerilogHDLParser";
import { Net_typeContext } from "./SysVerilogHDLParser";
import { Drive_strengthContext } from "./SysVerilogHDLParser";
import { Drive_strength_value_0Context } from "./SysVerilogHDLParser";
import { Drive_strength_value_1Context } from "./SysVerilogHDLParser";
import { Strength0Context } from "./SysVerilogHDLParser";
import { Strength1Context } from "./SysVerilogHDLParser";
import { Highz0Context } from "./SysVerilogHDLParser";
import { Highz1Context } from "./SysVerilogHDLParser";
import { Charge_strengthContext } from "./SysVerilogHDLParser";
import { Charge_sizeContext } from "./SysVerilogHDLParser";
import { List_of_variable_descriptionsContext } from "./SysVerilogHDLParser";
import { Comma_variable_description_starContext } from "./SysVerilogHDLParser";
import { Comma_variable_descriptionContext } from "./SysVerilogHDLParser";
import { Variable_descriptionContext } from "./SysVerilogHDLParser";
import { Variable_identifierContext } from "./SysVerilogHDLParser";
import { List_of_hierarchical_variable_descriptionsContext } from "./SysVerilogHDLParser";
import { Comma_hierarchical_variable_description_starContext } from "./SysVerilogHDLParser";
import { Comma_hierarchical_variable_descriptionContext } from "./SysVerilogHDLParser";
import { Hierarchical_variable_descriptionContext } from "./SysVerilogHDLParser";
import { Hierarchical_variable_identifierContext } from "./SysVerilogHDLParser";
import { Net_declarationContext } from "./SysVerilogHDLParser";
import { Reg_declarationContext } from "./SysVerilogHDLParser";
import { Logic_declarationContext } from "./SysVerilogHDLParser";
import { Bits_typeContext } from "./SysVerilogHDLParser";
import { Bits_declarationContext } from "./SysVerilogHDLParser";
import { Integer_declarationContext } from "./SysVerilogHDLParser";
import { Int_declarationContext } from "./SysVerilogHDLParser";
import { Real_declarationContext } from "./SysVerilogHDLParser";
import { Time_declarationContext } from "./SysVerilogHDLParser";
import { Realtime_declarationContext } from "./SysVerilogHDLParser";
import { Event_declarationContext } from "./SysVerilogHDLParser";
import { Genvar_declarationContext } from "./SysVerilogHDLParser";
import { Usertype_variable_declarationContext } from "./SysVerilogHDLParser";
import { String_declarationContext } from "./SysVerilogHDLParser";
import { Struct_declarationContext } from "./SysVerilogHDLParser";
import { Enum_declarationContext } from "./SysVerilogHDLParser";
import { Function_declarationContext } from "./SysVerilogHDLParser";
import { Function_typeContext } from "./SysVerilogHDLParser";
import { Function_identifierContext } from "./SysVerilogHDLParser";
import { Function_interfaceContext } from "./SysVerilogHDLParser";
import { Function_item_declaration_starContext } from "./SysVerilogHDLParser";
import { Function_item_declaration_semicolonContext } from "./SysVerilogHDLParser";
import { Function_item_declarationContext } from "./SysVerilogHDLParser";
import { Function_statementContext } from "./SysVerilogHDLParser";
import { Colon_function_identifierContext } from "./SysVerilogHDLParser";
import { Task_declarationContext } from "./SysVerilogHDLParser";
import { Task_identifierContext } from "./SysVerilogHDLParser";
import { Task_interfaceContext } from "./SysVerilogHDLParser";
import { Task_item_declaration_semicolonContext } from "./SysVerilogHDLParser";
import { Task_item_declarationContext } from "./SysVerilogHDLParser";
import { Task_item_declaration_starContext } from "./SysVerilogHDLParser";
import { Task_statementContext } from "./SysVerilogHDLParser";
import { Struct_item_semicolonContext } from "./SysVerilogHDLParser";
import { Struct_item_starContext } from "./SysVerilogHDLParser";
import { Struct_itemContext } from "./SysVerilogHDLParser";
import { Struct_typeContext } from "./SysVerilogHDLParser";
import { Enum_typeContext } from "./SysVerilogHDLParser";
import { List_of_enum_itemsContext } from "./SysVerilogHDLParser";
import { Enum_itemContext } from "./SysVerilogHDLParser";
import { Enum_identifierContext } from "./SysVerilogHDLParser";
import { Comma_enum_item_starContext } from "./SysVerilogHDLParser";
import { Comma_enum_itemContext } from "./SysVerilogHDLParser";
import { Enumerated_typeContext } from "./SysVerilogHDLParser";
import { Module_instantiationContext } from "./SysVerilogHDLParser";
import { Parameter_interface_assignmentsContext } from "./SysVerilogHDLParser";
import { List_of_interface_assignmentsContext } from "./SysVerilogHDLParser";
import { List_of_ordered_interface_assignmentsContext } from "./SysVerilogHDLParser";
import { Comma_ordered_interface_assignment_starContext } from "./SysVerilogHDLParser";
import { Comma_ordered_interface_assignmentContext } from "./SysVerilogHDLParser";
import { Ordered_interface_assignmentContext } from "./SysVerilogHDLParser";
import { List_of_named_interface_assignmentsContext } from "./SysVerilogHDLParser";
import { Comma_named_interface_assignment_starContext } from "./SysVerilogHDLParser";
import { Comma_named_interface_assignmentContext } from "./SysVerilogHDLParser";
import { Named_interface_assignmentContext } from "./SysVerilogHDLParser";
import { List_of_module_instancesContext } from "./SysVerilogHDLParser";
import { Comma_module_instance_starContext } from "./SysVerilogHDLParser";
import { Comma_module_instanceContext } from "./SysVerilogHDLParser";
import { Module_instanceContext } from "./SysVerilogHDLParser";
import { Module_instance_identifierContext } from "./SysVerilogHDLParser";
import { Arrayed_identifierContext } from "./SysVerilogHDLParser";
import { Simple_arrayed_identifierContext } from "./SysVerilogHDLParser";
import { Escaped_arrayed_identifierContext } from "./SysVerilogHDLParser";
import { Port_interface_assignmentsContext } from "./SysVerilogHDLParser";
import { DelayContext } from "./SysVerilogHDLParser";
import { List_of_delay_valuesContext } from "./SysVerilogHDLParser";
import { Comma_delay_value_starContext } from "./SysVerilogHDLParser";
import { Comma_delay_valueContext } from "./SysVerilogHDLParser";
import { Delay_valueContext } from "./SysVerilogHDLParser";
import { Pulldown_strengthContext } from "./SysVerilogHDLParser";
import { Pullup_strengthContext } from "./SysVerilogHDLParser";
import { Gate_instance_identifierContext } from "./SysVerilogHDLParser";
import { Gate_instantiationContext } from "./SysVerilogHDLParser";
import { Enable_gatetypeContext } from "./SysVerilogHDLParser";
import { Mos_switchtypeContext } from "./SysVerilogHDLParser";
import { Cmos_switchtypeContext } from "./SysVerilogHDLParser";
import { N_output_gatetypeContext } from "./SysVerilogHDLParser";
import { N_input_gatetypeContext } from "./SysVerilogHDLParser";
import { Pass_switchtypeContext } from "./SysVerilogHDLParser";
import { Pass_enable_switchtypeContext } from "./SysVerilogHDLParser";
import { Pulldown_instantiationContext } from "./SysVerilogHDLParser";
import { Pullup_instantiationContext } from "./SysVerilogHDLParser";
import { Enable_instantiationContext } from "./SysVerilogHDLParser";
import { Mos_instantiationContext } from "./SysVerilogHDLParser";
import { Cmos_instantiationContext } from "./SysVerilogHDLParser";
import { N_output_instantiationContext } from "./SysVerilogHDLParser";
import { N_input_instantiationContext } from "./SysVerilogHDLParser";
import { Pass_instantiationContext } from "./SysVerilogHDLParser";
import { Pass_enable_instantiationContext } from "./SysVerilogHDLParser";
import { List_of_pull_gate_instanceContext } from "./SysVerilogHDLParser";
import { List_of_enable_gate_instanceContext } from "./SysVerilogHDLParser";
import { List_of_mos_switch_instanceContext } from "./SysVerilogHDLParser";
import { List_of_cmos_switch_instanceContext } from "./SysVerilogHDLParser";
import { List_of_n_input_gate_instanceContext } from "./SysVerilogHDLParser";
import { List_of_n_output_gate_instanceContext } from "./SysVerilogHDLParser";
import { List_of_pass_switch_instanceContext } from "./SysVerilogHDLParser";
import { List_of_pass_enable_switch_instanceContext } from "./SysVerilogHDLParser";
import { Comma_pull_gate_instance_starContext } from "./SysVerilogHDLParser";
import { Comma_enable_gate_instance_starContext } from "./SysVerilogHDLParser";
import { Comma_mos_switch_instance_starContext } from "./SysVerilogHDLParser";
import { Comma_cmos_switch_instance_starContext } from "./SysVerilogHDLParser";
import { Comma_n_input_gate_instance_starContext } from "./SysVerilogHDLParser";
import { Comma_n_output_gate_instance_starContext } from "./SysVerilogHDLParser";
import { Comma_pass_switch_instance_starContext } from "./SysVerilogHDLParser";
import { Comma_pass_enable_switch_instance_starContext } from "./SysVerilogHDLParser";
import { Comma_pull_gate_instanceContext } from "./SysVerilogHDLParser";
import { Comma_enable_gate_instanceContext } from "./SysVerilogHDLParser";
import { Comma_mos_switch_instanceContext } from "./SysVerilogHDLParser";
import { Comma_cmos_switch_instanceContext } from "./SysVerilogHDLParser";
import { Comma_n_input_gate_instanceContext } from "./SysVerilogHDLParser";
import { Comma_n_output_gate_instanceContext } from "./SysVerilogHDLParser";
import { Comma_pass_switch_instanceContext } from "./SysVerilogHDLParser";
import { Comma_pass_enable_switch_instanceContext } from "./SysVerilogHDLParser";
import { Pull_gate_instanceContext } from "./SysVerilogHDLParser";
import { Enable_gate_instanceContext } from "./SysVerilogHDLParser";
import { Mos_switch_instanceContext } from "./SysVerilogHDLParser";
import { Cmos_switch_instanceContext } from "./SysVerilogHDLParser";
import { N_input_gate_instanceContext } from "./SysVerilogHDLParser";
import { N_output_gate_instanceContext } from "./SysVerilogHDLParser";
import { Pass_switch_instanceContext } from "./SysVerilogHDLParser";
import { Pass_enable_switch_instanceContext } from "./SysVerilogHDLParser";
import { Pull_gate_interfaceContext } from "./SysVerilogHDLParser";
import { Enable_gate_interfaceContext } from "./SysVerilogHDLParser";
import { Mos_switch_interfaceContext } from "./SysVerilogHDLParser";
import { Cmos_switch_interfaceContext } from "./SysVerilogHDLParser";
import { N_input_gate_interfaceContext } from "./SysVerilogHDLParser";
import { N_output_gate_interfaceContext } from "./SysVerilogHDLParser";
import { Pass_switch_interfaceContext } from "./SysVerilogHDLParser";
import { Pass_enable_switch_interfaceContext } from "./SysVerilogHDLParser";
import { List_of_input_terminalsContext } from "./SysVerilogHDLParser";
import { List_of_output_terminalsContext } from "./SysVerilogHDLParser";
import { Comma_input_terminal_starContext } from "./SysVerilogHDLParser";
import { Comma_output_terminal_starContext } from "./SysVerilogHDLParser";
import { Comma_input_terminalContext } from "./SysVerilogHDLParser";
import { Comma_output_terminalContext } from "./SysVerilogHDLParser";
import { Enable_terminalContext } from "./SysVerilogHDLParser";
import { Input_terminalContext } from "./SysVerilogHDLParser";
import { Inout_terminalContext } from "./SysVerilogHDLParser";
import { Ncontrol_terminalContext } from "./SysVerilogHDLParser";
import { Output_terminalContext } from "./SysVerilogHDLParser";
import { Pcontrol_terminalContext } from "./SysVerilogHDLParser";
import { Statement_starContext } from "./SysVerilogHDLParser";
import { Statement_semicolonContext } from "./SysVerilogHDLParser";
import { StatementContext } from "./SysVerilogHDLParser";
import { Assignment_statementContext } from "./SysVerilogHDLParser";
import { Flow_control_statementContext } from "./SysVerilogHDLParser";
import { Block_statementContext } from "./SysVerilogHDLParser";
import { Task_call_statementContext } from "./SysVerilogHDLParser";
import { Event_statementContext } from "./SysVerilogHDLParser";
import { Procedural_statementContext } from "./SysVerilogHDLParser";
import { Expression_statementContext } from "./SysVerilogHDLParser";
import { Subroutine_statementContext } from "./SysVerilogHDLParser";
import { Return_statementContext } from "./SysVerilogHDLParser";
import { Null_statementContext } from "./SysVerilogHDLParser";
import { Procedural_continuous_assignmentsContext } from "./SysVerilogHDLParser";
import { Assign_statementContext } from "./SysVerilogHDLParser";
import { Deassign_statementContext } from "./SysVerilogHDLParser";
import { Force_statementContext } from "./SysVerilogHDLParser";
import { Release_statementContext } from "./SysVerilogHDLParser";
import { Procedural_timing_control_statementContext } from "./SysVerilogHDLParser";
import { Property_statementContext } from "./SysVerilogHDLParser";
import { Disable_condition_statementContext } from "./SysVerilogHDLParser";
import { Property_expressionContext } from "./SysVerilogHDLParser";
import { Procedural_assertion_statementContext } from "./SysVerilogHDLParser";
import { Assert_else_statementContext } from "./SysVerilogHDLParser";
import { Assert_statementContext } from "./SysVerilogHDLParser";
import { System_task_enableContext } from "./SysVerilogHDLParser";
import { System_task_identifierContext } from "./SysVerilogHDLParser";
import { Task_interface_assignmentsContext } from "./SysVerilogHDLParser";
import { Task_enableContext } from "./SysVerilogHDLParser";
import { Hierarchical_task_identifierContext } from "./SysVerilogHDLParser";
import { Disable_statementContext } from "./SysVerilogHDLParser";
import { Hierarchical_block_identifierContext } from "./SysVerilogHDLParser";
import { Variable_lvalueContext } from "./SysVerilogHDLParser";
import { Hierarchical_variable_lvalueContext } from "./SysVerilogHDLParser";
import { Variable_concatenationContext } from "./SysVerilogHDLParser";
import { Variable_concatenation_valueContext } from "./SysVerilogHDLParser";
import { Comma_vcv_starContext } from "./SysVerilogHDLParser";
import { Blocking_assignmentContext } from "./SysVerilogHDLParser";
import { Nonblocking_assignmentContext } from "./SysVerilogHDLParser";
import { Prefix_assignmentContext } from "./SysVerilogHDLParser";
import { Postfix_assignmentContext } from "./SysVerilogHDLParser";
import { Operator_assignmentContext } from "./SysVerilogHDLParser";
import { Declarative_assignmentContext } from "./SysVerilogHDLParser";
import { Delay_or_event_controlContext } from "./SysVerilogHDLParser";
import { Delay_controlContext } from "./SysVerilogHDLParser";
import { Event_controlContext } from "./SysVerilogHDLParser";
import { Event_control_identifierContext } from "./SysVerilogHDLParser";
import { Event_control_expressionContext } from "./SysVerilogHDLParser";
import { Event_expressionContext } from "./SysVerilogHDLParser";
import { Single_event_expressionContext } from "./SysVerilogHDLParser";
import { Event_expression_edgespecContext } from "./SysVerilogHDLParser";
import { Event_expression_orContext } from "./SysVerilogHDLParser";
import { List_of_event_expression_commaContext } from "./SysVerilogHDLParser";
import { Comma_event_expression_starContext } from "./SysVerilogHDLParser";
import { Comma_event_expressionContext } from "./SysVerilogHDLParser";
import { List_of_event_expression_orContext } from "./SysVerilogHDLParser";
import { Or_event_expression_starContext } from "./SysVerilogHDLParser";
import { Or_event_expressionContext } from "./SysVerilogHDLParser";
import { Event_control_wildcardContext } from "./SysVerilogHDLParser";
import { Repeat_event_controlContext } from "./SysVerilogHDLParser";
import { Event_triggerContext } from "./SysVerilogHDLParser";
import { Hierarchical_event_identifierContext } from "./SysVerilogHDLParser";
import { Event_identifierContext } from "./SysVerilogHDLParser";
import { Wait_statementContext } from "./SysVerilogHDLParser";
import { Attr_generated_instantiationContext } from "./SysVerilogHDLParser";
import { Generated_instantiationContext } from "./SysVerilogHDLParser";
import { Generate_item_starContext } from "./SysVerilogHDLParser";
import { Generate_itemContext } from "./SysVerilogHDLParser";
import { Generate_blockContext } from "./SysVerilogHDLParser";
import { Generate_colon_block_identifier0Context } from "./SysVerilogHDLParser";
import { Generate_colon_block_identifier1Context } from "./SysVerilogHDLParser";
import { Generate_colon_block_identifierContext } from "./SysVerilogHDLParser";
import { Generate_block_identifierContext } from "./SysVerilogHDLParser";
import { Generate_conditional_statementContext } from "./SysVerilogHDLParser";
import { Generate_if_statementContext } from "./SysVerilogHDLParser";
import { Generate_else_statementContext } from "./SysVerilogHDLParser";
import { Generate_loop_statementContext } from "./SysVerilogHDLParser";
import { Generate_forever_loop_statementContext } from "./SysVerilogHDLParser";
import { Generate_repeat_loop_statementContext } from "./SysVerilogHDLParser";
import { Generate_while_loop_statementContext } from "./SysVerilogHDLParser";
import { Generate_do_loop_statementContext } from "./SysVerilogHDLParser";
import { Generate_for_loop_statementContext } from "./SysVerilogHDLParser";
import { Generate_case_statementContext } from "./SysVerilogHDLParser";
import { Generate_case_item_starContext } from "./SysVerilogHDLParser";
import { Generate_case_itemContext } from "./SysVerilogHDLParser";
import { Conditional_statementContext } from "./SysVerilogHDLParser";
import { If_statementContext } from "./SysVerilogHDLParser";
import { Else_statementContext } from "./SysVerilogHDLParser";
import { Conditional_expressionContext } from "./SysVerilogHDLParser";
import { Loop_statementContext } from "./SysVerilogHDLParser";
import { Forever_loop_statementContext } from "./SysVerilogHDLParser";
import { Repeat_loop_statementContext } from "./SysVerilogHDLParser";
import { While_loop_statementContext } from "./SysVerilogHDLParser";
import { Do_loop_statementContext } from "./SysVerilogHDLParser";
import { For_loop_statementContext } from "./SysVerilogHDLParser";
import { Loop_init_assignmentContext } from "./SysVerilogHDLParser";
import { Loop_terminate_expressionContext } from "./SysVerilogHDLParser";
import { Loop_step_assignmentContext } from "./SysVerilogHDLParser";
import { Case_statementContext } from "./SysVerilogHDLParser";
import { Case_item_starContext } from "./SysVerilogHDLParser";
import { Case_itemContext } from "./SysVerilogHDLParser";
import { Case_switchContext } from "./SysVerilogHDLParser";
import { Case_item_keyContext } from "./SysVerilogHDLParser";
import { Case_item_key_expressionContext } from "./SysVerilogHDLParser";
import { Comma_case_item_key_expressionContext } from "./SysVerilogHDLParser";
import { Comma_case_item_key_expression_starContext } from "./SysVerilogHDLParser";
import { ExpressionContext } from "./SysVerilogHDLParser";
import { Single_expressionContext } from "./SysVerilogHDLParser";
import { Primary_rangeContext } from "./SysVerilogHDLParser";
import { PrimaryContext } from "./SysVerilogHDLParser";
import { Unary_expressionContext } from "./SysVerilogHDLParser";
import { Unary_post_assign_expressionContext } from "./SysVerilogHDLParser";
import { Unary_pre_assign_expressionContext } from "./SysVerilogHDLParser";
import { Binary_expressionContext } from "./SysVerilogHDLParser";
import { Ternary_expressionContext } from "./SysVerilogHDLParser";
import { Mintypmax_expressionContext } from "./SysVerilogHDLParser";
import { Structured_valueContext } from "./SysVerilogHDLParser";
import { Arrayed_structured_valueContext } from "./SysVerilogHDLParser";
import { Arrayed_structure_itemContext } from "./SysVerilogHDLParser";
import { Comma_arrayed_structure_itemContext } from "./SysVerilogHDLParser";
import { Comma_arrayed_structure_item_starContext } from "./SysVerilogHDLParser";
import { Arrayed_structure_item_plusContext } from "./SysVerilogHDLParser";
import { Variable_type_castContext } from "./SysVerilogHDLParser";
import { Width_type_castContext } from "./SysVerilogHDLParser";
import { Sign_type_castContext } from "./SysVerilogHDLParser";
import { Null_type_castContext } from "./SysVerilogHDLParser";
import { Variable_typeContext } from "./SysVerilogHDLParser";
import { Type_cast_identifierContext } from "./SysVerilogHDLParser";
import { Type_cast_expressionContext } from "./SysVerilogHDLParser";
import { Function_callContext } from "./SysVerilogHDLParser";
import { Hierarchical_function_identifierContext } from "./SysVerilogHDLParser";
import { Function_interface_assignmentsContext } from "./SysVerilogHDLParser";
import { System_function_callContext } from "./SysVerilogHDLParser";
import { System_function_identifierContext } from "./SysVerilogHDLParser";
import { Constant_function_callContext } from "./SysVerilogHDLParser";
import { Imported_function_callContext } from "./SysVerilogHDLParser";
import { Imported_function_hierarchical_identifierContext } from "./SysVerilogHDLParser";
import { Primary_hierarchical_identifierContext } from "./SysVerilogHDLParser";
import { Primary_imported_hierarchical_identifierContext } from "./SysVerilogHDLParser";
import { Imported_hierarchical_identifierContext } from "./SysVerilogHDLParser";
import { Parenthesis_expressionContext } from "./SysVerilogHDLParser";
import { ConcatenationContext } from "./SysVerilogHDLParser";
import { Multiple_concatenationContext } from "./SysVerilogHDLParser";
import { Comma_expression_plusContext } from "./SysVerilogHDLParser";
import { Comma_expression_starContext } from "./SysVerilogHDLParser";
import { Typedef_declarationContext } from "./SysVerilogHDLParser";
import { Typedef_identifierContext } from "./SysVerilogHDLParser";
import { Typedef_definitionContext } from "./SysVerilogHDLParser";
import { Typedef_definition_typeContext } from "./SysVerilogHDLParser";
import { Complex_typeContext } from "./SysVerilogHDLParser";
import { Typedef_typeContext } from "./SysVerilogHDLParser";
import { Par_blockContext } from "./SysVerilogHDLParser";
import { Seq_blockContext } from "./SysVerilogHDLParser";
import { Block_identifierContext } from "./SysVerilogHDLParser";
import { Colon_block_identifierContext } from "./SysVerilogHDLParser";
import { Block_item_declaration_starContext } from "./SysVerilogHDLParser";
import { Block_item_declaration_semicolonContext } from "./SysVerilogHDLParser";
import { Block_item_declarationContext } from "./SysVerilogHDLParser";
import { Join_keywordContext } from "./SysVerilogHDLParser";
import { Continuous_assignContext } from "./SysVerilogHDLParser";
import { List_of_variable_assignmentsContext } from "./SysVerilogHDLParser";
import { Comma_variable_assignment_starContext } from "./SysVerilogHDLParser";
import { Comma_variable_assignmentContext } from "./SysVerilogHDLParser";
import { Variable_assignmentContext } from "./SysVerilogHDLParser";
import { Initial_constructContext } from "./SysVerilogHDLParser";
import { Final_constructContext } from "./SysVerilogHDLParser";
import { Always_keywordContext } from "./SysVerilogHDLParser";
import { Always_constructContext } from "./SysVerilogHDLParser";
import { Attribute_instance_starContext } from "./SysVerilogHDLParser";
import { Attribute_instanceContext } from "./SysVerilogHDLParser";
import { Attr_spec_starContext } from "./SysVerilogHDLParser";
import { Attr_specContext } from "./SysVerilogHDLParser";
import { Attr_nameContext } from "./SysVerilogHDLParser";
import { IdentifierContext } from "./SysVerilogHDLParser";
import { Hierarchical_identifierContext } from "./SysVerilogHDLParser";
import { Dot_hierarchical_identifier_branch_item_starContext } from "./SysVerilogHDLParser";
import { Dot_hierarchical_identifier_branch_itemContext } from "./SysVerilogHDLParser";
import { Hierarchical_identifier_branch_itemContext } from "./SysVerilogHDLParser";
import { Timescale_compiler_directiveContext } from "./SysVerilogHDLParser";
import { Timeunit_directiveContext } from "./SysVerilogHDLParser";
import { Timeprecision_directiveContext } from "./SysVerilogHDLParser";
import { Default_nettype_statementContext } from "./SysVerilogHDLParser";
import { NumberContext } from "./SysVerilogHDLParser";
import { Integral_numberContext } from "./SysVerilogHDLParser";
import { Real_numberContext } from "./SysVerilogHDLParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `SysVerilogHDLParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface SysVerilogHDLVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.module_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_keyword?: (ctx: Module_keywordContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.struct_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStruct_keyword?: (ctx: Struct_keywordContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.any_case_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAny_case_keyword?: (ctx: Any_case_keywordContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSemicolon?: (ctx: SemicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.unary_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary_operator?: (ctx: Unary_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.binary_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary_operator?: (ctx: Binary_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.unary_assign_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary_assign_operator?: (ctx: Unary_assign_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.binary_assign_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary_assign_operator?: (ctx: Binary_assign_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.source_text`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSource_text?: (ctx: Source_textContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.description_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDescription_star?: (ctx: Description_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.header_text`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHeader_text?: (ctx: Header_textContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.design_attribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDesign_attribute?: (ctx: Design_attributeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.compiler_directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompiler_directive?: (ctx: Compiler_directiveContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDescription?: (ctx: DescriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.module_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_declaration?: (ctx: Module_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.module_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_identifier?: (ctx: Module_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.module_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_interface?: (ctx: Module_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.module_parameter_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_parameter_interface?: (ctx: Module_parameter_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.module_port_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_port_interface?: (ctx: Module_port_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.module_item_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_item_star?: (ctx: Module_item_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.module_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_item?: (ctx: Module_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.colon_module_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColon_module_identifier?: (ctx: Colon_module_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.package_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_declaration?: (ctx: Package_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.package_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_identifier?: (ctx: Package_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.colon_package_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColon_package_identifier?: (ctx: Colon_package_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.package_item_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_item_star?: (ctx: Package_item_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.package_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_item?: (ctx: Package_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.import_package`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_package?: (ctx: Import_packageContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.package_item_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_item_identifier?: (ctx: Package_item_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.parameter_item_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_item_semicolon?: (ctx: Parameter_item_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.parameter_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_item?: (ctx: Parameter_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_port_item_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_port_item_semicolon?: (ctx: Attr_port_item_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_variable_item_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_variable_item_semicolon?: (ctx: Attr_variable_item_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.variable_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_item?: (ctx: Variable_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.subroutine_item_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubroutine_item_semicolon?: (ctx: Subroutine_item_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.subroutine_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubroutine_item?: (ctx: Subroutine_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_construct_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_construct_item?: (ctx: Attr_construct_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.construct_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstruct_item?: (ctx: Construct_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_component_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_component_item?: (ctx: Attr_component_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.component_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponent_item?: (ctx: Component_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.compiler_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompiler_item?: (ctx: Compiler_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.type_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_item?: (ctx: Type_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.null_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNull_item?: (ctx: Null_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_interface_parameters`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_interface_parameters?: (ctx: List_of_interface_parametersContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_parameter_declarations`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_parameter_declarations?: (ctx: List_of_parameter_declarationsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_parameter_declaration_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_parameter_declaration_star?: (ctx: Comma_parameter_declaration_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_parameter_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_parameter_declaration?: (ctx: Comma_parameter_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_parameter_descriptions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_parameter_descriptions?: (ctx: List_of_parameter_descriptionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.param_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam_declaration?: (ctx: Param_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.param_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam_description?: (ctx: Param_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.parameter_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_declaration?: (ctx: Parameter_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.local_parameter_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocal_parameter_declaration?: (ctx: Local_parameter_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.parameter_override`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_override?: (ctx: Parameter_overrideContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_tf_interface_ports`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_tf_interface_ports?: (ctx: List_of_tf_interface_portsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_tf_port_declarations`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_tf_port_declarations?: (ctx: List_of_tf_port_declarationsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_tf_port_declarations_comma`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_tf_port_declarations_comma?: (ctx: List_of_tf_port_declarations_commaContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_attr_tf_port_declaration_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_attr_tf_port_declaration_star?: (ctx: Comma_attr_tf_port_declaration_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_attr_tf_port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_attr_tf_port_declaration?: (ctx: Comma_attr_tf_port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_tf_port_declarations_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_tf_port_declarations_semicolon?: (ctx: List_of_tf_port_declarations_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_tf_port_declaration_semicolon_plus`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_tf_port_declaration_semicolon_plus?: (ctx: Attr_tf_port_declaration_semicolon_plusContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_tf_port_declaration_semicolon_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_tf_port_declaration_semicolon_star?: (ctx: Attr_tf_port_declaration_semicolon_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_tf_port_declaration_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_tf_port_declaration_semicolon?: (ctx: Attr_tf_port_declaration_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_tf_port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_tf_port_declaration?: (ctx: Attr_tf_port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.tf_port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTf_port_declaration?: (ctx: Tf_port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_interface_ports`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_interface_ports?: (ctx: List_of_interface_portsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_port_identifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_port_identifiers?: (ctx: List_of_port_identifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_port_identifier_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_port_identifier_star?: (ctx: Comma_port_identifier_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_port_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_port_identifier?: (ctx: Comma_port_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.port_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort_identifier?: (ctx: Port_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_port_declarations`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_port_declarations?: (ctx: List_of_port_declarationsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_port_declarations_comma`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_port_declarations_comma?: (ctx: List_of_port_declarations_commaContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_attr_port_declaration_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_attr_port_declaration_star?: (ctx: Comma_attr_port_declaration_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_attr_port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_attr_port_declaration?: (ctx: Comma_attr_port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_port_declarations_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_port_declarations_semicolon?: (ctx: List_of_port_declarations_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_port_declaration_semicolon_plus`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_port_declaration_semicolon_plus?: (ctx: Attr_port_declaration_semicolon_plusContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_port_declaration_semicolon_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_port_declaration_semicolon_star?: (ctx: Attr_port_declaration_semicolon_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_port_declaration_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_port_declaration_semicolon?: (ctx: Attr_port_declaration_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_port_declaration?: (ctx: Attr_port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort_declaration?: (ctx: Port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.port_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort_description?: (ctx: Port_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.inout_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInout_description?: (ctx: Inout_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.input_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInput_description?: (ctx: Input_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.output_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutput_description?: (ctx: Output_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.ref_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRef_description?: (ctx: Ref_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.tf_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTf_declaration?: (ctx: Tf_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.inout_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInout_declaration?: (ctx: Inout_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.input_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInput_declaration?: (ctx: Input_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.output_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutput_declaration?: (ctx: Output_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.ref_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRef_declaration?: (ctx: Ref_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.user_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUser_type?: (ctx: User_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.user_type_identifer`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUser_type_identifer?: (ctx: User_type_identiferContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.dimension_plus`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDimension_plus?: (ctx: Dimension_plusContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.dimension_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDimension_star?: (ctx: Dimension_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.dimension`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDimension?: (ctx: DimensionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.range_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRange_expression?: (ctx: Range_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.index_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndex_expression?: (ctx: Index_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.sb_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSb_range?: (ctx: Sb_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.base_increment_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBase_increment_range?: (ctx: Base_increment_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.base_decrement_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBase_decrement_range?: (ctx: Base_decrement_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.base_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBase_expression?: (ctx: Base_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.net_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_type?: (ctx: Net_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.drive_strength`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrive_strength?: (ctx: Drive_strengthContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.drive_strength_value_0`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrive_strength_value_0?: (ctx: Drive_strength_value_0Context) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.drive_strength_value_1`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrive_strength_value_1?: (ctx: Drive_strength_value_1Context) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.strength0`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrength0?: (ctx: Strength0Context) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.strength1`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrength1?: (ctx: Strength1Context) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.highz0`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHighz0?: (ctx: Highz0Context) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.highz1`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHighz1?: (ctx: Highz1Context) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.charge_strength`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCharge_strength?: (ctx: Charge_strengthContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.charge_size`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCharge_size?: (ctx: Charge_sizeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_variable_descriptions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_variable_descriptions?: (ctx: List_of_variable_descriptionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_variable_description_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_variable_description_star?: (ctx: Comma_variable_description_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_variable_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_variable_description?: (ctx: Comma_variable_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.variable_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_description?: (ctx: Variable_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.variable_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_identifier?: (ctx: Variable_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_hierarchical_variable_descriptions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_hierarchical_variable_descriptions?: (ctx: List_of_hierarchical_variable_descriptionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_hierarchical_variable_description_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_hierarchical_variable_description_star?: (ctx: Comma_hierarchical_variable_description_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_hierarchical_variable_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_hierarchical_variable_description?: (ctx: Comma_hierarchical_variable_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.hierarchical_variable_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_variable_description?: (ctx: Hierarchical_variable_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.hierarchical_variable_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_variable_identifier?: (ctx: Hierarchical_variable_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.net_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_declaration?: (ctx: Net_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.reg_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReg_declaration?: (ctx: Reg_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.logic_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogic_declaration?: (ctx: Logic_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.bits_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBits_type?: (ctx: Bits_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.bits_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBits_declaration?: (ctx: Bits_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.integer_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInteger_declaration?: (ctx: Integer_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.int_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInt_declaration?: (ctx: Int_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.real_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReal_declaration?: (ctx: Real_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.time_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTime_declaration?: (ctx: Time_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.realtime_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRealtime_declaration?: (ctx: Realtime_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.event_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_declaration?: (ctx: Event_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.genvar_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenvar_declaration?: (ctx: Genvar_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.usertype_variable_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUsertype_variable_declaration?: (ctx: Usertype_variable_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.string_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitString_declaration?: (ctx: String_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.struct_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStruct_declaration?: (ctx: Struct_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.enum_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnum_declaration?: (ctx: Enum_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.function_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_declaration?: (ctx: Function_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.function_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_type?: (ctx: Function_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.function_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_identifier?: (ctx: Function_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.function_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_interface?: (ctx: Function_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.function_item_declaration_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_item_declaration_star?: (ctx: Function_item_declaration_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.function_item_declaration_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_item_declaration_semicolon?: (ctx: Function_item_declaration_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.function_item_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_item_declaration?: (ctx: Function_item_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.function_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_statement?: (ctx: Function_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.colon_function_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColon_function_identifier?: (ctx: Colon_function_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.task_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_declaration?: (ctx: Task_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.task_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_identifier?: (ctx: Task_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.task_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_interface?: (ctx: Task_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.task_item_declaration_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_item_declaration_semicolon?: (ctx: Task_item_declaration_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.task_item_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_item_declaration?: (ctx: Task_item_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.task_item_declaration_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_item_declaration_star?: (ctx: Task_item_declaration_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.task_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_statement?: (ctx: Task_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.struct_item_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStruct_item_semicolon?: (ctx: Struct_item_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.struct_item_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStruct_item_star?: (ctx: Struct_item_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.struct_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStruct_item?: (ctx: Struct_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.struct_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStruct_type?: (ctx: Struct_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.enum_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnum_type?: (ctx: Enum_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_enum_items`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_enum_items?: (ctx: List_of_enum_itemsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.enum_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnum_item?: (ctx: Enum_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.enum_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnum_identifier?: (ctx: Enum_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_enum_item_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_enum_item_star?: (ctx: Comma_enum_item_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_enum_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_enum_item?: (ctx: Comma_enum_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.enumerated_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumerated_type?: (ctx: Enumerated_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.module_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_instantiation?: (ctx: Module_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.parameter_interface_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_interface_assignments?: (ctx: Parameter_interface_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_interface_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_interface_assignments?: (ctx: List_of_interface_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_ordered_interface_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_ordered_interface_assignments?: (ctx: List_of_ordered_interface_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_ordered_interface_assignment_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_ordered_interface_assignment_star?: (ctx: Comma_ordered_interface_assignment_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_ordered_interface_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_ordered_interface_assignment?: (ctx: Comma_ordered_interface_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.ordered_interface_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrdered_interface_assignment?: (ctx: Ordered_interface_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_named_interface_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_named_interface_assignments?: (ctx: List_of_named_interface_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_named_interface_assignment_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_named_interface_assignment_star?: (ctx: Comma_named_interface_assignment_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_named_interface_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_named_interface_assignment?: (ctx: Comma_named_interface_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.named_interface_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamed_interface_assignment?: (ctx: Named_interface_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_module_instances`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_module_instances?: (ctx: List_of_module_instancesContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_module_instance_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_module_instance_star?: (ctx: Comma_module_instance_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_module_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_module_instance?: (ctx: Comma_module_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.module_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_instance?: (ctx: Module_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.module_instance_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_instance_identifier?: (ctx: Module_instance_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.arrayed_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayed_identifier?: (ctx: Arrayed_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.simple_arrayed_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_arrayed_identifier?: (ctx: Simple_arrayed_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.escaped_arrayed_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEscaped_arrayed_identifier?: (ctx: Escaped_arrayed_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.port_interface_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort_interface_assignments?: (ctx: Port_interface_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.delay`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelay?: (ctx: DelayContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_delay_values`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_delay_values?: (ctx: List_of_delay_valuesContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_delay_value_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_delay_value_star?: (ctx: Comma_delay_value_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_delay_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_delay_value?: (ctx: Comma_delay_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.delay_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelay_value?: (ctx: Delay_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pulldown_strength`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPulldown_strength?: (ctx: Pulldown_strengthContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pullup_strength`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPullup_strength?: (ctx: Pullup_strengthContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.gate_instance_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGate_instance_identifier?: (ctx: Gate_instance_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.gate_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGate_instantiation?: (ctx: Gate_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.enable_gatetype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnable_gatetype?: (ctx: Enable_gatetypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.mos_switchtype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMos_switchtype?: (ctx: Mos_switchtypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.cmos_switchtype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmos_switchtype?: (ctx: Cmos_switchtypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.n_output_gatetype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_output_gatetype?: (ctx: N_output_gatetypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.n_input_gatetype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_input_gatetype?: (ctx: N_input_gatetypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pass_switchtype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_switchtype?: (ctx: Pass_switchtypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pass_enable_switchtype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_enable_switchtype?: (ctx: Pass_enable_switchtypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pulldown_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPulldown_instantiation?: (ctx: Pulldown_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pullup_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPullup_instantiation?: (ctx: Pullup_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.enable_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnable_instantiation?: (ctx: Enable_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.mos_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMos_instantiation?: (ctx: Mos_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.cmos_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmos_instantiation?: (ctx: Cmos_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.n_output_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_output_instantiation?: (ctx: N_output_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.n_input_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_input_instantiation?: (ctx: N_input_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pass_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_instantiation?: (ctx: Pass_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pass_enable_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_enable_instantiation?: (ctx: Pass_enable_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_pull_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_pull_gate_instance?: (ctx: List_of_pull_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_enable_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_enable_gate_instance?: (ctx: List_of_enable_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_mos_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_mos_switch_instance?: (ctx: List_of_mos_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_cmos_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_cmos_switch_instance?: (ctx: List_of_cmos_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_n_input_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_n_input_gate_instance?: (ctx: List_of_n_input_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_n_output_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_n_output_gate_instance?: (ctx: List_of_n_output_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_pass_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_pass_switch_instance?: (ctx: List_of_pass_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_pass_enable_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_pass_enable_switch_instance?: (ctx: List_of_pass_enable_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_pull_gate_instance_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_pull_gate_instance_star?: (ctx: Comma_pull_gate_instance_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_enable_gate_instance_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_enable_gate_instance_star?: (ctx: Comma_enable_gate_instance_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_mos_switch_instance_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_mos_switch_instance_star?: (ctx: Comma_mos_switch_instance_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_cmos_switch_instance_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_cmos_switch_instance_star?: (ctx: Comma_cmos_switch_instance_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_n_input_gate_instance_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_n_input_gate_instance_star?: (ctx: Comma_n_input_gate_instance_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_n_output_gate_instance_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_n_output_gate_instance_star?: (ctx: Comma_n_output_gate_instance_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_pass_switch_instance_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_pass_switch_instance_star?: (ctx: Comma_pass_switch_instance_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_pass_enable_switch_instance_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_pass_enable_switch_instance_star?: (ctx: Comma_pass_enable_switch_instance_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_pull_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_pull_gate_instance?: (ctx: Comma_pull_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_enable_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_enable_gate_instance?: (ctx: Comma_enable_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_mos_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_mos_switch_instance?: (ctx: Comma_mos_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_cmos_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_cmos_switch_instance?: (ctx: Comma_cmos_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_n_input_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_n_input_gate_instance?: (ctx: Comma_n_input_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_n_output_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_n_output_gate_instance?: (ctx: Comma_n_output_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_pass_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_pass_switch_instance?: (ctx: Comma_pass_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_pass_enable_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_pass_enable_switch_instance?: (ctx: Comma_pass_enable_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pull_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPull_gate_instance?: (ctx: Pull_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.enable_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnable_gate_instance?: (ctx: Enable_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.mos_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMos_switch_instance?: (ctx: Mos_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.cmos_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmos_switch_instance?: (ctx: Cmos_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.n_input_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_input_gate_instance?: (ctx: N_input_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.n_output_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_output_gate_instance?: (ctx: N_output_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pass_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_switch_instance?: (ctx: Pass_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pass_enable_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_enable_switch_instance?: (ctx: Pass_enable_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pull_gate_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPull_gate_interface?: (ctx: Pull_gate_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.enable_gate_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnable_gate_interface?: (ctx: Enable_gate_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.mos_switch_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMos_switch_interface?: (ctx: Mos_switch_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.cmos_switch_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmos_switch_interface?: (ctx: Cmos_switch_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.n_input_gate_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_input_gate_interface?: (ctx: N_input_gate_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.n_output_gate_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_output_gate_interface?: (ctx: N_output_gate_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pass_switch_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_switch_interface?: (ctx: Pass_switch_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pass_enable_switch_interface`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_enable_switch_interface?: (ctx: Pass_enable_switch_interfaceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_input_terminals`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_input_terminals?: (ctx: List_of_input_terminalsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_output_terminals`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_output_terminals?: (ctx: List_of_output_terminalsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_input_terminal_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_input_terminal_star?: (ctx: Comma_input_terminal_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_output_terminal_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_output_terminal_star?: (ctx: Comma_output_terminal_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_input_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_input_terminal?: (ctx: Comma_input_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_output_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_output_terminal?: (ctx: Comma_output_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.enable_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnable_terminal?: (ctx: Enable_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.input_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInput_terminal?: (ctx: Input_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.inout_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInout_terminal?: (ctx: Inout_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.ncontrol_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNcontrol_terminal?: (ctx: Ncontrol_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.output_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutput_terminal?: (ctx: Output_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.pcontrol_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPcontrol_terminal?: (ctx: Pcontrol_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.statement_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement_star?: (ctx: Statement_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.statement_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement_semicolon?: (ctx: Statement_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.assignment_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_statement?: (ctx: Assignment_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.flow_control_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFlow_control_statement?: (ctx: Flow_control_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.block_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_statement?: (ctx: Block_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.task_call_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_call_statement?: (ctx: Task_call_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.event_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_statement?: (ctx: Event_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.procedural_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedural_statement?: (ctx: Procedural_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.expression_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression_statement?: (ctx: Expression_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.subroutine_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubroutine_statement?: (ctx: Subroutine_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.return_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturn_statement?: (ctx: Return_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.null_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNull_statement?: (ctx: Null_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.procedural_continuous_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedural_continuous_assignments?: (ctx: Procedural_continuous_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.assign_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssign_statement?: (ctx: Assign_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.deassign_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeassign_statement?: (ctx: Deassign_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.force_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForce_statement?: (ctx: Force_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.release_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelease_statement?: (ctx: Release_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.procedural_timing_control_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedural_timing_control_statement?: (ctx: Procedural_timing_control_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.property_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_statement?: (ctx: Property_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.disable_condition_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDisable_condition_statement?: (ctx: Disable_condition_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.property_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_expression?: (ctx: Property_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.procedural_assertion_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedural_assertion_statement?: (ctx: Procedural_assertion_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.assert_else_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssert_else_statement?: (ctx: Assert_else_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.assert_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssert_statement?: (ctx: Assert_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.system_task_enable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSystem_task_enable?: (ctx: System_task_enableContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.system_task_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSystem_task_identifier?: (ctx: System_task_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.task_interface_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_interface_assignments?: (ctx: Task_interface_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.task_enable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_enable?: (ctx: Task_enableContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.hierarchical_task_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_task_identifier?: (ctx: Hierarchical_task_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.disable_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDisable_statement?: (ctx: Disable_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.hierarchical_block_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_block_identifier?: (ctx: Hierarchical_block_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.variable_lvalue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_lvalue?: (ctx: Variable_lvalueContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.hierarchical_variable_lvalue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_variable_lvalue?: (ctx: Hierarchical_variable_lvalueContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.variable_concatenation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_concatenation?: (ctx: Variable_concatenationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.variable_concatenation_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_concatenation_value?: (ctx: Variable_concatenation_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_vcv_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_vcv_star?: (ctx: Comma_vcv_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.blocking_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlocking_assignment?: (ctx: Blocking_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.nonblocking_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonblocking_assignment?: (ctx: Nonblocking_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.prefix_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrefix_assignment?: (ctx: Prefix_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.postfix_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPostfix_assignment?: (ctx: Postfix_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.operator_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperator_assignment?: (ctx: Operator_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.declarative_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarative_assignment?: (ctx: Declarative_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.delay_or_event_control`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelay_or_event_control?: (ctx: Delay_or_event_controlContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.delay_control`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelay_control?: (ctx: Delay_controlContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.event_control`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_control?: (ctx: Event_controlContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.event_control_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_control_identifier?: (ctx: Event_control_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.event_control_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_control_expression?: (ctx: Event_control_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.event_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_expression?: (ctx: Event_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.single_event_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingle_event_expression?: (ctx: Single_event_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.event_expression_edgespec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_expression_edgespec?: (ctx: Event_expression_edgespecContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.event_expression_or`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_expression_or?: (ctx: Event_expression_orContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_event_expression_comma`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_event_expression_comma?: (ctx: List_of_event_expression_commaContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_event_expression_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_event_expression_star?: (ctx: Comma_event_expression_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_event_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_event_expression?: (ctx: Comma_event_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_event_expression_or`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_event_expression_or?: (ctx: List_of_event_expression_orContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.or_event_expression_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOr_event_expression_star?: (ctx: Or_event_expression_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.or_event_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOr_event_expression?: (ctx: Or_event_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.event_control_wildcard`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_control_wildcard?: (ctx: Event_control_wildcardContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.repeat_event_control`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRepeat_event_control?: (ctx: Repeat_event_controlContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.event_trigger`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_trigger?: (ctx: Event_triggerContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.hierarchical_event_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_event_identifier?: (ctx: Hierarchical_event_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.event_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_identifier?: (ctx: Event_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.wait_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWait_statement?: (ctx: Wait_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_generated_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_generated_instantiation?: (ctx: Attr_generated_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generated_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerated_instantiation?: (ctx: Generated_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_item_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_item_star?: (ctx: Generate_item_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_item?: (ctx: Generate_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_block?: (ctx: Generate_blockContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_colon_block_identifier0`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_colon_block_identifier0?: (ctx: Generate_colon_block_identifier0Context) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_colon_block_identifier1`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_colon_block_identifier1?: (ctx: Generate_colon_block_identifier1Context) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_colon_block_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_colon_block_identifier?: (ctx: Generate_colon_block_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_block_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_block_identifier?: (ctx: Generate_block_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_conditional_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_conditional_statement?: (ctx: Generate_conditional_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_if_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_if_statement?: (ctx: Generate_if_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_else_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_else_statement?: (ctx: Generate_else_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_loop_statement?: (ctx: Generate_loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_forever_loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_forever_loop_statement?: (ctx: Generate_forever_loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_repeat_loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_repeat_loop_statement?: (ctx: Generate_repeat_loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_while_loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_while_loop_statement?: (ctx: Generate_while_loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_do_loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_do_loop_statement?: (ctx: Generate_do_loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_for_loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_for_loop_statement?: (ctx: Generate_for_loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_case_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_case_statement?: (ctx: Generate_case_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_case_item_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_case_item_star?: (ctx: Generate_case_item_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.generate_case_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_case_item?: (ctx: Generate_case_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.conditional_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditional_statement?: (ctx: Conditional_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.if_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_statement?: (ctx: If_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.else_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElse_statement?: (ctx: Else_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.conditional_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditional_expression?: (ctx: Conditional_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoop_statement?: (ctx: Loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.forever_loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForever_loop_statement?: (ctx: Forever_loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.repeat_loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRepeat_loop_statement?: (ctx: Repeat_loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.while_loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhile_loop_statement?: (ctx: While_loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.do_loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDo_loop_statement?: (ctx: Do_loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.for_loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_loop_statement?: (ctx: For_loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.loop_init_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoop_init_assignment?: (ctx: Loop_init_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.loop_terminate_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoop_terminate_expression?: (ctx: Loop_terminate_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.loop_step_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoop_step_assignment?: (ctx: Loop_step_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.case_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_statement?: (ctx: Case_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.case_item_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_item_star?: (ctx: Case_item_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.case_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_item?: (ctx: Case_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.case_switch`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_switch?: (ctx: Case_switchContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.case_item_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_item_key?: (ctx: Case_item_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.case_item_key_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_item_key_expression?: (ctx: Case_item_key_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_case_item_key_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_case_item_key_expression?: (ctx: Comma_case_item_key_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_case_item_key_expression_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_case_item_key_expression_star?: (ctx: Comma_case_item_key_expression_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.single_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingle_expression?: (ctx: Single_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.primary_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary_range?: (ctx: Primary_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary?: (ctx: PrimaryContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.unary_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary_expression?: (ctx: Unary_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.unary_post_assign_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary_post_assign_expression?: (ctx: Unary_post_assign_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.unary_pre_assign_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary_pre_assign_expression?: (ctx: Unary_pre_assign_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.binary_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary_expression?: (ctx: Binary_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.ternary_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTernary_expression?: (ctx: Ternary_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.mintypmax_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMintypmax_expression?: (ctx: Mintypmax_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.structured_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructured_value?: (ctx: Structured_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.arrayed_structured_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayed_structured_value?: (ctx: Arrayed_structured_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.arrayed_structure_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayed_structure_item?: (ctx: Arrayed_structure_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_arrayed_structure_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_arrayed_structure_item?: (ctx: Comma_arrayed_structure_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_arrayed_structure_item_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_arrayed_structure_item_star?: (ctx: Comma_arrayed_structure_item_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.arrayed_structure_item_plus`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayed_structure_item_plus?: (ctx: Arrayed_structure_item_plusContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.variable_type_cast`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_type_cast?: (ctx: Variable_type_castContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.width_type_cast`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWidth_type_cast?: (ctx: Width_type_castContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.sign_type_cast`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSign_type_cast?: (ctx: Sign_type_castContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.null_type_cast`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNull_type_cast?: (ctx: Null_type_castContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.variable_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_type?: (ctx: Variable_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.type_cast_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_cast_identifier?: (ctx: Type_cast_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.type_cast_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_cast_expression?: (ctx: Type_cast_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_call?: (ctx: Function_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.hierarchical_function_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_function_identifier?: (ctx: Hierarchical_function_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.function_interface_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_interface_assignments?: (ctx: Function_interface_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.system_function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSystem_function_call?: (ctx: System_function_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.system_function_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSystem_function_identifier?: (ctx: System_function_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.constant_function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_function_call?: (ctx: Constant_function_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.imported_function_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImported_function_call?: (ctx: Imported_function_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.imported_function_hierarchical_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImported_function_hierarchical_identifier?: (ctx: Imported_function_hierarchical_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.primary_hierarchical_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary_hierarchical_identifier?: (ctx: Primary_hierarchical_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.primary_imported_hierarchical_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary_imported_hierarchical_identifier?: (ctx: Primary_imported_hierarchical_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.imported_hierarchical_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImported_hierarchical_identifier?: (ctx: Imported_hierarchical_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.parenthesis_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesis_expression?: (ctx: Parenthesis_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.concatenation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcatenation?: (ctx: ConcatenationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.multiple_concatenation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiple_concatenation?: (ctx: Multiple_concatenationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_expression_plus`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_expression_plus?: (ctx: Comma_expression_plusContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_expression_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_expression_star?: (ctx: Comma_expression_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.typedef_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypedef_declaration?: (ctx: Typedef_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.typedef_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypedef_identifier?: (ctx: Typedef_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.typedef_definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypedef_definition?: (ctx: Typedef_definitionContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.typedef_definition_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypedef_definition_type?: (ctx: Typedef_definition_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.complex_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComplex_type?: (ctx: Complex_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.typedef_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypedef_type?: (ctx: Typedef_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.par_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPar_block?: (ctx: Par_blockContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.seq_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSeq_block?: (ctx: Seq_blockContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.block_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_identifier?: (ctx: Block_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.colon_block_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColon_block_identifier?: (ctx: Colon_block_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.block_item_declaration_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_item_declaration_star?: (ctx: Block_item_declaration_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.block_item_declaration_semicolon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_item_declaration_semicolon?: (ctx: Block_item_declaration_semicolonContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.block_item_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_item_declaration?: (ctx: Block_item_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.join_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoin_keyword?: (ctx: Join_keywordContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.continuous_assign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinuous_assign?: (ctx: Continuous_assignContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.list_of_variable_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_variable_assignments?: (ctx: List_of_variable_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_variable_assignment_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_variable_assignment_star?: (ctx: Comma_variable_assignment_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.comma_variable_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComma_variable_assignment?: (ctx: Comma_variable_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.variable_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_assignment?: (ctx: Variable_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.initial_construct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInitial_construct?: (ctx: Initial_constructContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.final_construct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFinal_construct?: (ctx: Final_constructContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.always_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlways_keyword?: (ctx: Always_keywordContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.always_construct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlways_construct?: (ctx: Always_constructContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attribute_instance_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttribute_instance_star?: (ctx: Attribute_instance_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attribute_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttribute_instance?: (ctx: Attribute_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_spec_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_spec_star?: (ctx: Attr_spec_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_spec?: (ctx: Attr_specContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.attr_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_name?: (ctx: Attr_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.hierarchical_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_identifier?: (ctx: Hierarchical_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.dot_hierarchical_identifier_branch_item_star`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDot_hierarchical_identifier_branch_item_star?: (ctx: Dot_hierarchical_identifier_branch_item_starContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.dot_hierarchical_identifier_branch_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDot_hierarchical_identifier_branch_item?: (ctx: Dot_hierarchical_identifier_branch_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.hierarchical_identifier_branch_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_identifier_branch_item?: (ctx: Hierarchical_identifier_branch_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.timescale_compiler_directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimescale_compiler_directive?: (ctx: Timescale_compiler_directiveContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.timeunit_directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeunit_directive?: (ctx: Timeunit_directiveContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.timeprecision_directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeprecision_directive?: (ctx: Timeprecision_directiveContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.default_nettype_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefault_nettype_statement?: (ctx: Default_nettype_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.integral_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntegral_number?: (ctx: Integral_numberContext) => Result;

	/**
	 * Visit a parse tree produced by `SysVerilogHDLParser.real_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReal_number?: (ctx: Real_numberContext) => Result;
}

