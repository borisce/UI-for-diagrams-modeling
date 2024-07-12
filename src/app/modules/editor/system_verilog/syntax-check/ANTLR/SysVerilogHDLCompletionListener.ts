
import { SysVerilogHDLListener } from "./SysVerilogHDLListener";
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

export class SysVerilogHDLCompletionListener implements SysVerilogHDLListener {
    
    moduleNames = [];
    parameterNames = [];
    
  
    enterModule_declaration(ctx) {
      const nameCtx = ctx.module_identifier().identifier();
      const name = nameCtx.getText();
      this.moduleNames.push(name);
    }
  
    enterParameter_declaration(ctx) {
      const nameCtx = ctx.parameter_identifier().identifier();
      const name = nameCtx.getText();
      this.parameterNames.push(name);
    }
  
    /**
	 * Enter a parse tree produced by `SysVerilogHDLParser.module_keyword`.
	 * @param ctx the parse tree
	 */
	enterModule_keyword?: (ctx: Module_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.module_keyword`.
	 * @param ctx the parse tree
	 */
	exitModule_keyword?: (ctx: Module_keywordContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.struct_keyword`.
	 * @param ctx the parse tree
	 */
	enterStruct_keyword?: (ctx: Struct_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.struct_keyword`.
	 * @param ctx the parse tree
	 */
	exitStruct_keyword?: (ctx: Struct_keywordContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.any_case_keyword`.
	 * @param ctx the parse tree
	 */
	enterAny_case_keyword?: (ctx: Any_case_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.any_case_keyword`.
	 * @param ctx the parse tree
	 */
	exitAny_case_keyword?: (ctx: Any_case_keywordContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.semicolon`.
	 * @param ctx the parse tree
	 */
	enterSemicolon?: (ctx: SemicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.semicolon`.
	 * @param ctx the parse tree
	 */
	exitSemicolon?: (ctx: SemicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.unary_operator`.
	 * @param ctx the parse tree
	 */
	enterUnary_operator?: (ctx: Unary_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.unary_operator`.
	 * @param ctx the parse tree
	 */
	exitUnary_operator?: (ctx: Unary_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.binary_operator`.
	 * @param ctx the parse tree
	 */
	enterBinary_operator?: (ctx: Binary_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.binary_operator`.
	 * @param ctx the parse tree
	 */
	exitBinary_operator?: (ctx: Binary_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.unary_assign_operator`.
	 * @param ctx the parse tree
	 */
	enterUnary_assign_operator?: (ctx: Unary_assign_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.unary_assign_operator`.
	 * @param ctx the parse tree
	 */
	exitUnary_assign_operator?: (ctx: Unary_assign_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.binary_assign_operator`.
	 * @param ctx the parse tree
	 */
	enterBinary_assign_operator?: (ctx: Binary_assign_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.binary_assign_operator`.
	 * @param ctx the parse tree
	 */
	exitBinary_assign_operator?: (ctx: Binary_assign_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.source_text`.
	 * @param ctx the parse tree
	 */
	enterSource_text?: (ctx: Source_textContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.source_text`.
	 * @param ctx the parse tree
	 */
	exitSource_text?: (ctx: Source_textContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.description_star`.
	 * @param ctx the parse tree
	 */
	enterDescription_star?: (ctx: Description_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.description_star`.
	 * @param ctx the parse tree
	 */
	exitDescription_star?: (ctx: Description_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.header_text`.
	 * @param ctx the parse tree
	 */
	enterHeader_text?: (ctx: Header_textContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.header_text`.
	 * @param ctx the parse tree
	 */
	exitHeader_text?: (ctx: Header_textContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.design_attribute`.
	 * @param ctx the parse tree
	 */
	enterDesign_attribute?: (ctx: Design_attributeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.design_attribute`.
	 * @param ctx the parse tree
	 */
	exitDesign_attribute?: (ctx: Design_attributeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.compiler_directive`.
	 * @param ctx the parse tree
	 */
	enterCompiler_directive?: (ctx: Compiler_directiveContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.compiler_directive`.
	 * @param ctx the parse tree
	 */
	exitCompiler_directive?: (ctx: Compiler_directiveContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.description`.
	 * @param ctx the parse tree
	 */
	enterDescription?: (ctx: DescriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.description`.
	 * @param ctx the parse tree
	 */
	exitDescription?: (ctx: DescriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.module_declaration`.
	 * @param ctx the parse tree
	 */
	exitModule_declaration?: (ctx: Module_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.module_identifier`.
	 * @param ctx the parse tree
	 */
	enterModule_identifier?: (ctx: Module_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.module_identifier`.
	 * @param ctx the parse tree
	 */
	exitModule_identifier?: (ctx: Module_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.module_interface`.
	 * @param ctx the parse tree
	 */
	enterModule_interface?: (ctx: Module_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.module_interface`.
	 * @param ctx the parse tree
	 */
	exitModule_interface?: (ctx: Module_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.module_parameter_interface`.
	 * @param ctx the parse tree
	 */
	enterModule_parameter_interface?: (ctx: Module_parameter_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.module_parameter_interface`.
	 * @param ctx the parse tree
	 */
	exitModule_parameter_interface?: (ctx: Module_parameter_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.module_port_interface`.
	 * @param ctx the parse tree
	 */
	enterModule_port_interface?: (ctx: Module_port_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.module_port_interface`.
	 * @param ctx the parse tree
	 */
	exitModule_port_interface?: (ctx: Module_port_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.module_item_star`.
	 * @param ctx the parse tree
	 */
	enterModule_item_star?: (ctx: Module_item_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.module_item_star`.
	 * @param ctx the parse tree
	 */
	exitModule_item_star?: (ctx: Module_item_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.module_item`.
	 * @param ctx the parse tree
	 */
	enterModule_item?: (ctx: Module_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.module_item`.
	 * @param ctx the parse tree
	 */
	exitModule_item?: (ctx: Module_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.colon_module_identifier`.
	 * @param ctx the parse tree
	 */
	enterColon_module_identifier?: (ctx: Colon_module_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.colon_module_identifier`.
	 * @param ctx the parse tree
	 */
	exitColon_module_identifier?: (ctx: Colon_module_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.package_declaration`.
	 * @param ctx the parse tree
	 */
	enterPackage_declaration?: (ctx: Package_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.package_declaration`.
	 * @param ctx the parse tree
	 */
	exitPackage_declaration?: (ctx: Package_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.package_identifier`.
	 * @param ctx the parse tree
	 */
	enterPackage_identifier?: (ctx: Package_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.package_identifier`.
	 * @param ctx the parse tree
	 */
	exitPackage_identifier?: (ctx: Package_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.colon_package_identifier`.
	 * @param ctx the parse tree
	 */
	enterColon_package_identifier?: (ctx: Colon_package_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.colon_package_identifier`.
	 * @param ctx the parse tree
	 */
	exitColon_package_identifier?: (ctx: Colon_package_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.package_item_star`.
	 * @param ctx the parse tree
	 */
	enterPackage_item_star?: (ctx: Package_item_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.package_item_star`.
	 * @param ctx the parse tree
	 */
	exitPackage_item_star?: (ctx: Package_item_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.package_item`.
	 * @param ctx the parse tree
	 */
	enterPackage_item?: (ctx: Package_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.package_item`.
	 * @param ctx the parse tree
	 */
	exitPackage_item?: (ctx: Package_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.import_package`.
	 * @param ctx the parse tree
	 */
	enterImport_package?: (ctx: Import_packageContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.import_package`.
	 * @param ctx the parse tree
	 */
	exitImport_package?: (ctx: Import_packageContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.package_item_identifier`.
	 * @param ctx the parse tree
	 */
	enterPackage_item_identifier?: (ctx: Package_item_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.package_item_identifier`.
	 * @param ctx the parse tree
	 */
	exitPackage_item_identifier?: (ctx: Package_item_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.parameter_item_semicolon`.
	 * @param ctx the parse tree
	 */
	enterParameter_item_semicolon?: (ctx: Parameter_item_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.parameter_item_semicolon`.
	 * @param ctx the parse tree
	 */
	exitParameter_item_semicolon?: (ctx: Parameter_item_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.parameter_item`.
	 * @param ctx the parse tree
	 */
	enterParameter_item?: (ctx: Parameter_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.parameter_item`.
	 * @param ctx the parse tree
	 */
	exitParameter_item?: (ctx: Parameter_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_port_item_semicolon`.
	 * @param ctx the parse tree
	 */
	enterAttr_port_item_semicolon?: (ctx: Attr_port_item_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_port_item_semicolon`.
	 * @param ctx the parse tree
	 */
	exitAttr_port_item_semicolon?: (ctx: Attr_port_item_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_variable_item_semicolon`.
	 * @param ctx the parse tree
	 */
	enterAttr_variable_item_semicolon?: (ctx: Attr_variable_item_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_variable_item_semicolon`.
	 * @param ctx the parse tree
	 */
	exitAttr_variable_item_semicolon?: (ctx: Attr_variable_item_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.variable_item`.
	 * @param ctx the parse tree
	 */
	enterVariable_item?: (ctx: Variable_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.variable_item`.
	 * @param ctx the parse tree
	 */
	exitVariable_item?: (ctx: Variable_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.subroutine_item_semicolon`.
	 * @param ctx the parse tree
	 */
	enterSubroutine_item_semicolon?: (ctx: Subroutine_item_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.subroutine_item_semicolon`.
	 * @param ctx the parse tree
	 */
	exitSubroutine_item_semicolon?: (ctx: Subroutine_item_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.subroutine_item`.
	 * @param ctx the parse tree
	 */
	enterSubroutine_item?: (ctx: Subroutine_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.subroutine_item`.
	 * @param ctx the parse tree
	 */
	exitSubroutine_item?: (ctx: Subroutine_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_construct_item`.
	 * @param ctx the parse tree
	 */
	enterAttr_construct_item?: (ctx: Attr_construct_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_construct_item`.
	 * @param ctx the parse tree
	 */
	exitAttr_construct_item?: (ctx: Attr_construct_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.construct_item`.
	 * @param ctx the parse tree
	 */
	enterConstruct_item?: (ctx: Construct_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.construct_item`.
	 * @param ctx the parse tree
	 */
	exitConstruct_item?: (ctx: Construct_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_component_item`.
	 * @param ctx the parse tree
	 */
	enterAttr_component_item?: (ctx: Attr_component_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_component_item`.
	 * @param ctx the parse tree
	 */
	exitAttr_component_item?: (ctx: Attr_component_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.component_item`.
	 * @param ctx the parse tree
	 */
	enterComponent_item?: (ctx: Component_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.component_item`.
	 * @param ctx the parse tree
	 */
	exitComponent_item?: (ctx: Component_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.compiler_item`.
	 * @param ctx the parse tree
	 */
	enterCompiler_item?: (ctx: Compiler_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.compiler_item`.
	 * @param ctx the parse tree
	 */
	exitCompiler_item?: (ctx: Compiler_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.type_item`.
	 * @param ctx the parse tree
	 */
	enterType_item?: (ctx: Type_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.type_item`.
	 * @param ctx the parse tree
	 */
	exitType_item?: (ctx: Type_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.null_item`.
	 * @param ctx the parse tree
	 */
	enterNull_item?: (ctx: Null_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.null_item`.
	 * @param ctx the parse tree
	 */
	exitNull_item?: (ctx: Null_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_interface_parameters`.
	 * @param ctx the parse tree
	 */
	enterList_of_interface_parameters?: (ctx: List_of_interface_parametersContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_interface_parameters`.
	 * @param ctx the parse tree
	 */
	exitList_of_interface_parameters?: (ctx: List_of_interface_parametersContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_parameter_declarations`.
	 * @param ctx the parse tree
	 */
	enterList_of_parameter_declarations?: (ctx: List_of_parameter_declarationsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_parameter_declarations`.
	 * @param ctx the parse tree
	 */
	exitList_of_parameter_declarations?: (ctx: List_of_parameter_declarationsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_parameter_declaration_star`.
	 * @param ctx the parse tree
	 */
	enterComma_parameter_declaration_star?: (ctx: Comma_parameter_declaration_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_parameter_declaration_star`.
	 * @param ctx the parse tree
	 */
	exitComma_parameter_declaration_star?: (ctx: Comma_parameter_declaration_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_parameter_declaration`.
	 * @param ctx the parse tree
	 */
	enterComma_parameter_declaration?: (ctx: Comma_parameter_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_parameter_declaration`.
	 * @param ctx the parse tree
	 */
	exitComma_parameter_declaration?: (ctx: Comma_parameter_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_parameter_descriptions`.
	 * @param ctx the parse tree
	 */
	enterList_of_parameter_descriptions?: (ctx: List_of_parameter_descriptionsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_parameter_descriptions`.
	 * @param ctx the parse tree
	 */
	exitList_of_parameter_descriptions?: (ctx: List_of_parameter_descriptionsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.param_declaration`.
	 * @param ctx the parse tree
	 */
	enterParam_declaration?: (ctx: Param_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.param_declaration`.
	 * @param ctx the parse tree
	 */
	exitParam_declaration?: (ctx: Param_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.param_description`.
	 * @param ctx the parse tree
	 */
	enterParam_description?: (ctx: Param_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.param_description`.
	 * @param ctx the parse tree
	 */
	exitParam_description?: (ctx: Param_descriptionContext) => void;

	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.parameter_declaration`.
	 * @param ctx the parse tree
	 */
	exitParameter_declaration?: (ctx: Parameter_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.local_parameter_declaration`.
	 * @param ctx the parse tree
	 */
	enterLocal_parameter_declaration?: (ctx: Local_parameter_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.local_parameter_declaration`.
	 * @param ctx the parse tree
	 */
	exitLocal_parameter_declaration?: (ctx: Local_parameter_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.parameter_override`.
	 * @param ctx the parse tree
	 */
	enterParameter_override?: (ctx: Parameter_overrideContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.parameter_override`.
	 * @param ctx the parse tree
	 */
	exitParameter_override?: (ctx: Parameter_overrideContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_tf_interface_ports`.
	 * @param ctx the parse tree
	 */
	enterList_of_tf_interface_ports?: (ctx: List_of_tf_interface_portsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_tf_interface_ports`.
	 * @param ctx the parse tree
	 */
	exitList_of_tf_interface_ports?: (ctx: List_of_tf_interface_portsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_tf_port_declarations`.
	 * @param ctx the parse tree
	 */
	enterList_of_tf_port_declarations?: (ctx: List_of_tf_port_declarationsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_tf_port_declarations`.
	 * @param ctx the parse tree
	 */
	exitList_of_tf_port_declarations?: (ctx: List_of_tf_port_declarationsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_tf_port_declarations_comma`.
	 * @param ctx the parse tree
	 */
	enterList_of_tf_port_declarations_comma?: (ctx: List_of_tf_port_declarations_commaContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_tf_port_declarations_comma`.
	 * @param ctx the parse tree
	 */
	exitList_of_tf_port_declarations_comma?: (ctx: List_of_tf_port_declarations_commaContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_attr_tf_port_declaration_star`.
	 * @param ctx the parse tree
	 */
	enterComma_attr_tf_port_declaration_star?: (ctx: Comma_attr_tf_port_declaration_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_attr_tf_port_declaration_star`.
	 * @param ctx the parse tree
	 */
	exitComma_attr_tf_port_declaration_star?: (ctx: Comma_attr_tf_port_declaration_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_attr_tf_port_declaration`.
	 * @param ctx the parse tree
	 */
	enterComma_attr_tf_port_declaration?: (ctx: Comma_attr_tf_port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_attr_tf_port_declaration`.
	 * @param ctx the parse tree
	 */
	exitComma_attr_tf_port_declaration?: (ctx: Comma_attr_tf_port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_tf_port_declarations_semicolon`.
	 * @param ctx the parse tree
	 */
	enterList_of_tf_port_declarations_semicolon?: (ctx: List_of_tf_port_declarations_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_tf_port_declarations_semicolon`.
	 * @param ctx the parse tree
	 */
	exitList_of_tf_port_declarations_semicolon?: (ctx: List_of_tf_port_declarations_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_tf_port_declaration_semicolon_plus`.
	 * @param ctx the parse tree
	 */
	enterAttr_tf_port_declaration_semicolon_plus?: (ctx: Attr_tf_port_declaration_semicolon_plusContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_tf_port_declaration_semicolon_plus`.
	 * @param ctx the parse tree
	 */
	exitAttr_tf_port_declaration_semicolon_plus?: (ctx: Attr_tf_port_declaration_semicolon_plusContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_tf_port_declaration_semicolon_star`.
	 * @param ctx the parse tree
	 */
	enterAttr_tf_port_declaration_semicolon_star?: (ctx: Attr_tf_port_declaration_semicolon_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_tf_port_declaration_semicolon_star`.
	 * @param ctx the parse tree
	 */
	exitAttr_tf_port_declaration_semicolon_star?: (ctx: Attr_tf_port_declaration_semicolon_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_tf_port_declaration_semicolon`.
	 * @param ctx the parse tree
	 */
	enterAttr_tf_port_declaration_semicolon?: (ctx: Attr_tf_port_declaration_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_tf_port_declaration_semicolon`.
	 * @param ctx the parse tree
	 */
	exitAttr_tf_port_declaration_semicolon?: (ctx: Attr_tf_port_declaration_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_tf_port_declaration`.
	 * @param ctx the parse tree
	 */
	enterAttr_tf_port_declaration?: (ctx: Attr_tf_port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_tf_port_declaration`.
	 * @param ctx the parse tree
	 */
	exitAttr_tf_port_declaration?: (ctx: Attr_tf_port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.tf_port_declaration`.
	 * @param ctx the parse tree
	 */
	enterTf_port_declaration?: (ctx: Tf_port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.tf_port_declaration`.
	 * @param ctx the parse tree
	 */
	exitTf_port_declaration?: (ctx: Tf_port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_interface_ports`.
	 * @param ctx the parse tree
	 */
	enterList_of_interface_ports?: (ctx: List_of_interface_portsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_interface_ports`.
	 * @param ctx the parse tree
	 */
	exitList_of_interface_ports?: (ctx: List_of_interface_portsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_port_identifiers`.
	 * @param ctx the parse tree
	 */
	enterList_of_port_identifiers?: (ctx: List_of_port_identifiersContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_port_identifiers`.
	 * @param ctx the parse tree
	 */
	exitList_of_port_identifiers?: (ctx: List_of_port_identifiersContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_port_identifier_star`.
	 * @param ctx the parse tree
	 */
	enterComma_port_identifier_star?: (ctx: Comma_port_identifier_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_port_identifier_star`.
	 * @param ctx the parse tree
	 */
	exitComma_port_identifier_star?: (ctx: Comma_port_identifier_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_port_identifier`.
	 * @param ctx the parse tree
	 */
	enterComma_port_identifier?: (ctx: Comma_port_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_port_identifier`.
	 * @param ctx the parse tree
	 */
	exitComma_port_identifier?: (ctx: Comma_port_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.port_identifier`.
	 * @param ctx the parse tree
	 */
	enterPort_identifier?: (ctx: Port_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.port_identifier`.
	 * @param ctx the parse tree
	 */
	exitPort_identifier?: (ctx: Port_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_port_declarations`.
	 * @param ctx the parse tree
	 */
	enterList_of_port_declarations?: (ctx: List_of_port_declarationsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_port_declarations`.
	 * @param ctx the parse tree
	 */
	exitList_of_port_declarations?: (ctx: List_of_port_declarationsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_port_declarations_comma`.
	 * @param ctx the parse tree
	 */
	enterList_of_port_declarations_comma?: (ctx: List_of_port_declarations_commaContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_port_declarations_comma`.
	 * @param ctx the parse tree
	 */
	exitList_of_port_declarations_comma?: (ctx: List_of_port_declarations_commaContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_attr_port_declaration_star`.
	 * @param ctx the parse tree
	 */
	enterComma_attr_port_declaration_star?: (ctx: Comma_attr_port_declaration_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_attr_port_declaration_star`.
	 * @param ctx the parse tree
	 */
	exitComma_attr_port_declaration_star?: (ctx: Comma_attr_port_declaration_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_attr_port_declaration`.
	 * @param ctx the parse tree
	 */
	enterComma_attr_port_declaration?: (ctx: Comma_attr_port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_attr_port_declaration`.
	 * @param ctx the parse tree
	 */
	exitComma_attr_port_declaration?: (ctx: Comma_attr_port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_port_declarations_semicolon`.
	 * @param ctx the parse tree
	 */
	enterList_of_port_declarations_semicolon?: (ctx: List_of_port_declarations_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_port_declarations_semicolon`.
	 * @param ctx the parse tree
	 */
	exitList_of_port_declarations_semicolon?: (ctx: List_of_port_declarations_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_port_declaration_semicolon_plus`.
	 * @param ctx the parse tree
	 */
	enterAttr_port_declaration_semicolon_plus?: (ctx: Attr_port_declaration_semicolon_plusContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_port_declaration_semicolon_plus`.
	 * @param ctx the parse tree
	 */
	exitAttr_port_declaration_semicolon_plus?: (ctx: Attr_port_declaration_semicolon_plusContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_port_declaration_semicolon_star`.
	 * @param ctx the parse tree
	 */
	enterAttr_port_declaration_semicolon_star?: (ctx: Attr_port_declaration_semicolon_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_port_declaration_semicolon_star`.
	 * @param ctx the parse tree
	 */
	exitAttr_port_declaration_semicolon_star?: (ctx: Attr_port_declaration_semicolon_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_port_declaration_semicolon`.
	 * @param ctx the parse tree
	 */
	enterAttr_port_declaration_semicolon?: (ctx: Attr_port_declaration_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_port_declaration_semicolon`.
	 * @param ctx the parse tree
	 */
	exitAttr_port_declaration_semicolon?: (ctx: Attr_port_declaration_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_port_declaration`.
	 * @param ctx the parse tree
	 */
	enterAttr_port_declaration?: (ctx: Attr_port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_port_declaration`.
	 * @param ctx the parse tree
	 */
	exitAttr_port_declaration?: (ctx: Attr_port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.port_declaration`.
	 * @param ctx the parse tree
	 */
	enterPort_declaration?: (ctx: Port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.port_declaration`.
	 * @param ctx the parse tree
	 */
	exitPort_declaration?: (ctx: Port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.port_description`.
	 * @param ctx the parse tree
	 */
	enterPort_description?: (ctx: Port_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.port_description`.
	 * @param ctx the parse tree
	 */
	exitPort_description?: (ctx: Port_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.inout_description`.
	 * @param ctx the parse tree
	 */
	enterInout_description?: (ctx: Inout_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.inout_description`.
	 * @param ctx the parse tree
	 */
	exitInout_description?: (ctx: Inout_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.input_description`.
	 * @param ctx the parse tree
	 */
	enterInput_description?: (ctx: Input_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.input_description`.
	 * @param ctx the parse tree
	 */
	exitInput_description?: (ctx: Input_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.output_description`.
	 * @param ctx the parse tree
	 */
	enterOutput_description?: (ctx: Output_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.output_description`.
	 * @param ctx the parse tree
	 */
	exitOutput_description?: (ctx: Output_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.ref_description`.
	 * @param ctx the parse tree
	 */
	enterRef_description?: (ctx: Ref_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.ref_description`.
	 * @param ctx the parse tree
	 */
	exitRef_description?: (ctx: Ref_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.tf_declaration`.
	 * @param ctx the parse tree
	 */
	enterTf_declaration?: (ctx: Tf_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.tf_declaration`.
	 * @param ctx the parse tree
	 */
	exitTf_declaration?: (ctx: Tf_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.inout_declaration`.
	 * @param ctx the parse tree
	 */
	enterInout_declaration?: (ctx: Inout_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.inout_declaration`.
	 * @param ctx the parse tree
	 */
	exitInout_declaration?: (ctx: Inout_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.input_declaration`.
	 * @param ctx the parse tree
	 */
	enterInput_declaration?: (ctx: Input_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.input_declaration`.
	 * @param ctx the parse tree
	 */
	exitInput_declaration?: (ctx: Input_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.output_declaration`.
	 * @param ctx the parse tree
	 */
	enterOutput_declaration?: (ctx: Output_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.output_declaration`.
	 * @param ctx the parse tree
	 */
	exitOutput_declaration?: (ctx: Output_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.ref_declaration`.
	 * @param ctx the parse tree
	 */
	enterRef_declaration?: (ctx: Ref_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.ref_declaration`.
	 * @param ctx the parse tree
	 */
	exitRef_declaration?: (ctx: Ref_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.user_type`.
	 * @param ctx the parse tree
	 */
	enterUser_type?: (ctx: User_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.user_type`.
	 * @param ctx the parse tree
	 */
	exitUser_type?: (ctx: User_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.user_type_identifer`.
	 * @param ctx the parse tree
	 */
	enterUser_type_identifer?: (ctx: User_type_identiferContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.user_type_identifer`.
	 * @param ctx the parse tree
	 */
	exitUser_type_identifer?: (ctx: User_type_identiferContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.dimension_plus`.
	 * @param ctx the parse tree
	 */
	enterDimension_plus?: (ctx: Dimension_plusContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.dimension_plus`.
	 * @param ctx the parse tree
	 */
	exitDimension_plus?: (ctx: Dimension_plusContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.dimension_star`.
	 * @param ctx the parse tree
	 */
	enterDimension_star?: (ctx: Dimension_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.dimension_star`.
	 * @param ctx the parse tree
	 */
	exitDimension_star?: (ctx: Dimension_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.dimension`.
	 * @param ctx the parse tree
	 */
	enterDimension?: (ctx: DimensionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.dimension`.
	 * @param ctx the parse tree
	 */
	exitDimension?: (ctx: DimensionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.range_expression`.
	 * @param ctx the parse tree
	 */
	enterRange_expression?: (ctx: Range_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.range_expression`.
	 * @param ctx the parse tree
	 */
	exitRange_expression?: (ctx: Range_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.index_expression`.
	 * @param ctx the parse tree
	 */
	enterIndex_expression?: (ctx: Index_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.index_expression`.
	 * @param ctx the parse tree
	 */
	exitIndex_expression?: (ctx: Index_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.sb_range`.
	 * @param ctx the parse tree
	 */
	enterSb_range?: (ctx: Sb_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.sb_range`.
	 * @param ctx the parse tree
	 */
	exitSb_range?: (ctx: Sb_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.base_increment_range`.
	 * @param ctx the parse tree
	 */
	enterBase_increment_range?: (ctx: Base_increment_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.base_increment_range`.
	 * @param ctx the parse tree
	 */
	exitBase_increment_range?: (ctx: Base_increment_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.base_decrement_range`.
	 * @param ctx the parse tree
	 */
	enterBase_decrement_range?: (ctx: Base_decrement_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.base_decrement_range`.
	 * @param ctx the parse tree
	 */
	exitBase_decrement_range?: (ctx: Base_decrement_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.base_expression`.
	 * @param ctx the parse tree
	 */
	enterBase_expression?: (ctx: Base_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.base_expression`.
	 * @param ctx the parse tree
	 */
	exitBase_expression?: (ctx: Base_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.net_type`.
	 * @param ctx the parse tree
	 */
	enterNet_type?: (ctx: Net_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.net_type`.
	 * @param ctx the parse tree
	 */
	exitNet_type?: (ctx: Net_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.drive_strength`.
	 * @param ctx the parse tree
	 */
	enterDrive_strength?: (ctx: Drive_strengthContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.drive_strength`.
	 * @param ctx the parse tree
	 */
	exitDrive_strength?: (ctx: Drive_strengthContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.drive_strength_value_0`.
	 * @param ctx the parse tree
	 */
	enterDrive_strength_value_0?: (ctx: Drive_strength_value_0Context) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.drive_strength_value_0`.
	 * @param ctx the parse tree
	 */
	exitDrive_strength_value_0?: (ctx: Drive_strength_value_0Context) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.drive_strength_value_1`.
	 * @param ctx the parse tree
	 */
	enterDrive_strength_value_1?: (ctx: Drive_strength_value_1Context) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.drive_strength_value_1`.
	 * @param ctx the parse tree
	 */
	exitDrive_strength_value_1?: (ctx: Drive_strength_value_1Context) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.strength0`.
	 * @param ctx the parse tree
	 */
	enterStrength0?: (ctx: Strength0Context) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.strength0`.
	 * @param ctx the parse tree
	 */
	exitStrength0?: (ctx: Strength0Context) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.strength1`.
	 * @param ctx the parse tree
	 */
	enterStrength1?: (ctx: Strength1Context) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.strength1`.
	 * @param ctx the parse tree
	 */
	exitStrength1?: (ctx: Strength1Context) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.highz0`.
	 * @param ctx the parse tree
	 */
	enterHighz0?: (ctx: Highz0Context) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.highz0`.
	 * @param ctx the parse tree
	 */
	exitHighz0?: (ctx: Highz0Context) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.highz1`.
	 * @param ctx the parse tree
	 */
	enterHighz1?: (ctx: Highz1Context) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.highz1`.
	 * @param ctx the parse tree
	 */
	exitHighz1?: (ctx: Highz1Context) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.charge_strength`.
	 * @param ctx the parse tree
	 */
	enterCharge_strength?: (ctx: Charge_strengthContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.charge_strength`.
	 * @param ctx the parse tree
	 */
	exitCharge_strength?: (ctx: Charge_strengthContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.charge_size`.
	 * @param ctx the parse tree
	 */
	enterCharge_size?: (ctx: Charge_sizeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.charge_size`.
	 * @param ctx the parse tree
	 */
	exitCharge_size?: (ctx: Charge_sizeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_variable_descriptions`.
	 * @param ctx the parse tree
	 */
	enterList_of_variable_descriptions?: (ctx: List_of_variable_descriptionsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_variable_descriptions`.
	 * @param ctx the parse tree
	 */
	exitList_of_variable_descriptions?: (ctx: List_of_variable_descriptionsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_variable_description_star`.
	 * @param ctx the parse tree
	 */
	enterComma_variable_description_star?: (ctx: Comma_variable_description_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_variable_description_star`.
	 * @param ctx the parse tree
	 */
	exitComma_variable_description_star?: (ctx: Comma_variable_description_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_variable_description`.
	 * @param ctx the parse tree
	 */
	enterComma_variable_description?: (ctx: Comma_variable_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_variable_description`.
	 * @param ctx the parse tree
	 */
	exitComma_variable_description?: (ctx: Comma_variable_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.variable_description`.
	 * @param ctx the parse tree
	 */
	enterVariable_description?: (ctx: Variable_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.variable_description`.
	 * @param ctx the parse tree
	 */
	exitVariable_description?: (ctx: Variable_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.variable_identifier`.
	 * @param ctx the parse tree
	 */
	enterVariable_identifier?: (ctx: Variable_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.variable_identifier`.
	 * @param ctx the parse tree
	 */
	exitVariable_identifier?: (ctx: Variable_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_hierarchical_variable_descriptions`.
	 * @param ctx the parse tree
	 */
	enterList_of_hierarchical_variable_descriptions?: (ctx: List_of_hierarchical_variable_descriptionsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_hierarchical_variable_descriptions`.
	 * @param ctx the parse tree
	 */
	exitList_of_hierarchical_variable_descriptions?: (ctx: List_of_hierarchical_variable_descriptionsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_hierarchical_variable_description_star`.
	 * @param ctx the parse tree
	 */
	enterComma_hierarchical_variable_description_star?: (ctx: Comma_hierarchical_variable_description_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_hierarchical_variable_description_star`.
	 * @param ctx the parse tree
	 */
	exitComma_hierarchical_variable_description_star?: (ctx: Comma_hierarchical_variable_description_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_hierarchical_variable_description`.
	 * @param ctx the parse tree
	 */
	enterComma_hierarchical_variable_description?: (ctx: Comma_hierarchical_variable_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_hierarchical_variable_description`.
	 * @param ctx the parse tree
	 */
	exitComma_hierarchical_variable_description?: (ctx: Comma_hierarchical_variable_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.hierarchical_variable_description`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_variable_description?: (ctx: Hierarchical_variable_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.hierarchical_variable_description`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_variable_description?: (ctx: Hierarchical_variable_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.hierarchical_variable_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_variable_identifier?: (ctx: Hierarchical_variable_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.hierarchical_variable_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_variable_identifier?: (ctx: Hierarchical_variable_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.net_declaration`.
	 * @param ctx the parse tree
	 */
	enterNet_declaration?: (ctx: Net_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.net_declaration`.
	 * @param ctx the parse tree
	 */
	exitNet_declaration?: (ctx: Net_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.reg_declaration`.
	 * @param ctx the parse tree
	 */
	enterReg_declaration?: (ctx: Reg_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.reg_declaration`.
	 * @param ctx the parse tree
	 */
	exitReg_declaration?: (ctx: Reg_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.logic_declaration`.
	 * @param ctx the parse tree
	 */
	enterLogic_declaration?: (ctx: Logic_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.logic_declaration`.
	 * @param ctx the parse tree
	 */
	exitLogic_declaration?: (ctx: Logic_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.bits_type`.
	 * @param ctx the parse tree
	 */
	enterBits_type?: (ctx: Bits_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.bits_type`.
	 * @param ctx the parse tree
	 */
	exitBits_type?: (ctx: Bits_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.bits_declaration`.
	 * @param ctx the parse tree
	 */
	enterBits_declaration?: (ctx: Bits_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.bits_declaration`.
	 * @param ctx the parse tree
	 */
	exitBits_declaration?: (ctx: Bits_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.integer_declaration`.
	 * @param ctx the parse tree
	 */
	enterInteger_declaration?: (ctx: Integer_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.integer_declaration`.
	 * @param ctx the parse tree
	 */
	exitInteger_declaration?: (ctx: Integer_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.int_declaration`.
	 * @param ctx the parse tree
	 */
	enterInt_declaration?: (ctx: Int_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.int_declaration`.
	 * @param ctx the parse tree
	 */
	exitInt_declaration?: (ctx: Int_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.real_declaration`.
	 * @param ctx the parse tree
	 */
	enterReal_declaration?: (ctx: Real_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.real_declaration`.
	 * @param ctx the parse tree
	 */
	exitReal_declaration?: (ctx: Real_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.time_declaration`.
	 * @param ctx the parse tree
	 */
	enterTime_declaration?: (ctx: Time_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.time_declaration`.
	 * @param ctx the parse tree
	 */
	exitTime_declaration?: (ctx: Time_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.realtime_declaration`.
	 * @param ctx the parse tree
	 */
	enterRealtime_declaration?: (ctx: Realtime_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.realtime_declaration`.
	 * @param ctx the parse tree
	 */
	exitRealtime_declaration?: (ctx: Realtime_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.event_declaration`.
	 * @param ctx the parse tree
	 */
	enterEvent_declaration?: (ctx: Event_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.event_declaration`.
	 * @param ctx the parse tree
	 */
	exitEvent_declaration?: (ctx: Event_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.genvar_declaration`.
	 * @param ctx the parse tree
	 */
	enterGenvar_declaration?: (ctx: Genvar_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.genvar_declaration`.
	 * @param ctx the parse tree
	 */
	exitGenvar_declaration?: (ctx: Genvar_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.usertype_variable_declaration`.
	 * @param ctx the parse tree
	 */
	enterUsertype_variable_declaration?: (ctx: Usertype_variable_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.usertype_variable_declaration`.
	 * @param ctx the parse tree
	 */
	exitUsertype_variable_declaration?: (ctx: Usertype_variable_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.string_declaration`.
	 * @param ctx the parse tree
	 */
	enterString_declaration?: (ctx: String_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.string_declaration`.
	 * @param ctx the parse tree
	 */
	exitString_declaration?: (ctx: String_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.struct_declaration`.
	 * @param ctx the parse tree
	 */
	enterStruct_declaration?: (ctx: Struct_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.struct_declaration`.
	 * @param ctx the parse tree
	 */
	exitStruct_declaration?: (ctx: Struct_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.enum_declaration`.
	 * @param ctx the parse tree
	 */
	enterEnum_declaration?: (ctx: Enum_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.enum_declaration`.
	 * @param ctx the parse tree
	 */
	exitEnum_declaration?: (ctx: Enum_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.function_declaration`.
	 * @param ctx the parse tree
	 */
	enterFunction_declaration?: (ctx: Function_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.function_declaration`.
	 * @param ctx the parse tree
	 */
	exitFunction_declaration?: (ctx: Function_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.function_type`.
	 * @param ctx the parse tree
	 */
	enterFunction_type?: (ctx: Function_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.function_type`.
	 * @param ctx the parse tree
	 */
	exitFunction_type?: (ctx: Function_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.function_identifier`.
	 * @param ctx the parse tree
	 */
	enterFunction_identifier?: (ctx: Function_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.function_identifier`.
	 * @param ctx the parse tree
	 */
	exitFunction_identifier?: (ctx: Function_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.function_interface`.
	 * @param ctx the parse tree
	 */
	enterFunction_interface?: (ctx: Function_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.function_interface`.
	 * @param ctx the parse tree
	 */
	exitFunction_interface?: (ctx: Function_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.function_item_declaration_star`.
	 * @param ctx the parse tree
	 */
	enterFunction_item_declaration_star?: (ctx: Function_item_declaration_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.function_item_declaration_star`.
	 * @param ctx the parse tree
	 */
	exitFunction_item_declaration_star?: (ctx: Function_item_declaration_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.function_item_declaration_semicolon`.
	 * @param ctx the parse tree
	 */
	enterFunction_item_declaration_semicolon?: (ctx: Function_item_declaration_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.function_item_declaration_semicolon`.
	 * @param ctx the parse tree
	 */
	exitFunction_item_declaration_semicolon?: (ctx: Function_item_declaration_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.function_item_declaration`.
	 * @param ctx the parse tree
	 */
	enterFunction_item_declaration?: (ctx: Function_item_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.function_item_declaration`.
	 * @param ctx the parse tree
	 */
	exitFunction_item_declaration?: (ctx: Function_item_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.function_statement`.
	 * @param ctx the parse tree
	 */
	enterFunction_statement?: (ctx: Function_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.function_statement`.
	 * @param ctx the parse tree
	 */
	exitFunction_statement?: (ctx: Function_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.colon_function_identifier`.
	 * @param ctx the parse tree
	 */
	enterColon_function_identifier?: (ctx: Colon_function_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.colon_function_identifier`.
	 * @param ctx the parse tree
	 */
	exitColon_function_identifier?: (ctx: Colon_function_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.task_declaration`.
	 * @param ctx the parse tree
	 */
	enterTask_declaration?: (ctx: Task_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.task_declaration`.
	 * @param ctx the parse tree
	 */
	exitTask_declaration?: (ctx: Task_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.task_identifier`.
	 * @param ctx the parse tree
	 */
	enterTask_identifier?: (ctx: Task_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.task_identifier`.
	 * @param ctx the parse tree
	 */
	exitTask_identifier?: (ctx: Task_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.task_interface`.
	 * @param ctx the parse tree
	 */
	enterTask_interface?: (ctx: Task_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.task_interface`.
	 * @param ctx the parse tree
	 */
	exitTask_interface?: (ctx: Task_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.task_item_declaration_semicolon`.
	 * @param ctx the parse tree
	 */
	enterTask_item_declaration_semicolon?: (ctx: Task_item_declaration_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.task_item_declaration_semicolon`.
	 * @param ctx the parse tree
	 */
	exitTask_item_declaration_semicolon?: (ctx: Task_item_declaration_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.task_item_declaration`.
	 * @param ctx the parse tree
	 */
	enterTask_item_declaration?: (ctx: Task_item_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.task_item_declaration`.
	 * @param ctx the parse tree
	 */
	exitTask_item_declaration?: (ctx: Task_item_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.task_item_declaration_star`.
	 * @param ctx the parse tree
	 */
	enterTask_item_declaration_star?: (ctx: Task_item_declaration_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.task_item_declaration_star`.
	 * @param ctx the parse tree
	 */
	exitTask_item_declaration_star?: (ctx: Task_item_declaration_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.task_statement`.
	 * @param ctx the parse tree
	 */
	enterTask_statement?: (ctx: Task_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.task_statement`.
	 * @param ctx the parse tree
	 */
	exitTask_statement?: (ctx: Task_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.struct_item_semicolon`.
	 * @param ctx the parse tree
	 */
	enterStruct_item_semicolon?: (ctx: Struct_item_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.struct_item_semicolon`.
	 * @param ctx the parse tree
	 */
	exitStruct_item_semicolon?: (ctx: Struct_item_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.struct_item_star`.
	 * @param ctx the parse tree
	 */
	enterStruct_item_star?: (ctx: Struct_item_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.struct_item_star`.
	 * @param ctx the parse tree
	 */
	exitStruct_item_star?: (ctx: Struct_item_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.struct_item`.
	 * @param ctx the parse tree
	 */
	enterStruct_item?: (ctx: Struct_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.struct_item`.
	 * @param ctx the parse tree
	 */
	exitStruct_item?: (ctx: Struct_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.struct_type`.
	 * @param ctx the parse tree
	 */
	enterStruct_type?: (ctx: Struct_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.struct_type`.
	 * @param ctx the parse tree
	 */
	exitStruct_type?: (ctx: Struct_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.enum_type`.
	 * @param ctx the parse tree
	 */
	enterEnum_type?: (ctx: Enum_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.enum_type`.
	 * @param ctx the parse tree
	 */
	exitEnum_type?: (ctx: Enum_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_enum_items`.
	 * @param ctx the parse tree
	 */
	enterList_of_enum_items?: (ctx: List_of_enum_itemsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_enum_items`.
	 * @param ctx the parse tree
	 */
	exitList_of_enum_items?: (ctx: List_of_enum_itemsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.enum_item`.
	 * @param ctx the parse tree
	 */
	enterEnum_item?: (ctx: Enum_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.enum_item`.
	 * @param ctx the parse tree
	 */
	exitEnum_item?: (ctx: Enum_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.enum_identifier`.
	 * @param ctx the parse tree
	 */
	enterEnum_identifier?: (ctx: Enum_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.enum_identifier`.
	 * @param ctx the parse tree
	 */
	exitEnum_identifier?: (ctx: Enum_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_enum_item_star`.
	 * @param ctx the parse tree
	 */
	enterComma_enum_item_star?: (ctx: Comma_enum_item_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_enum_item_star`.
	 * @param ctx the parse tree
	 */
	exitComma_enum_item_star?: (ctx: Comma_enum_item_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_enum_item`.
	 * @param ctx the parse tree
	 */
	enterComma_enum_item?: (ctx: Comma_enum_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_enum_item`.
	 * @param ctx the parse tree
	 */
	exitComma_enum_item?: (ctx: Comma_enum_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.enumerated_type`.
	 * @param ctx the parse tree
	 */
	enterEnumerated_type?: (ctx: Enumerated_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.enumerated_type`.
	 * @param ctx the parse tree
	 */
	exitEnumerated_type?: (ctx: Enumerated_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.module_instantiation`.
	 * @param ctx the parse tree
	 */
	enterModule_instantiation?: (ctx: Module_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.module_instantiation`.
	 * @param ctx the parse tree
	 */
	exitModule_instantiation?: (ctx: Module_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.parameter_interface_assignments`.
	 * @param ctx the parse tree
	 */
	enterParameter_interface_assignments?: (ctx: Parameter_interface_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.parameter_interface_assignments`.
	 * @param ctx the parse tree
	 */
	exitParameter_interface_assignments?: (ctx: Parameter_interface_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_interface_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_interface_assignments?: (ctx: List_of_interface_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_interface_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_interface_assignments?: (ctx: List_of_interface_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_ordered_interface_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_ordered_interface_assignments?: (ctx: List_of_ordered_interface_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_ordered_interface_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_ordered_interface_assignments?: (ctx: List_of_ordered_interface_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_ordered_interface_assignment_star`.
	 * @param ctx the parse tree
	 */
	enterComma_ordered_interface_assignment_star?: (ctx: Comma_ordered_interface_assignment_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_ordered_interface_assignment_star`.
	 * @param ctx the parse tree
	 */
	exitComma_ordered_interface_assignment_star?: (ctx: Comma_ordered_interface_assignment_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_ordered_interface_assignment`.
	 * @param ctx the parse tree
	 */
	enterComma_ordered_interface_assignment?: (ctx: Comma_ordered_interface_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_ordered_interface_assignment`.
	 * @param ctx the parse tree
	 */
	exitComma_ordered_interface_assignment?: (ctx: Comma_ordered_interface_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.ordered_interface_assignment`.
	 * @param ctx the parse tree
	 */
	enterOrdered_interface_assignment?: (ctx: Ordered_interface_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.ordered_interface_assignment`.
	 * @param ctx the parse tree
	 */
	exitOrdered_interface_assignment?: (ctx: Ordered_interface_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_named_interface_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_named_interface_assignments?: (ctx: List_of_named_interface_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_named_interface_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_named_interface_assignments?: (ctx: List_of_named_interface_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_named_interface_assignment_star`.
	 * @param ctx the parse tree
	 */
	enterComma_named_interface_assignment_star?: (ctx: Comma_named_interface_assignment_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_named_interface_assignment_star`.
	 * @param ctx the parse tree
	 */
	exitComma_named_interface_assignment_star?: (ctx: Comma_named_interface_assignment_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_named_interface_assignment`.
	 * @param ctx the parse tree
	 */
	enterComma_named_interface_assignment?: (ctx: Comma_named_interface_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_named_interface_assignment`.
	 * @param ctx the parse tree
	 */
	exitComma_named_interface_assignment?: (ctx: Comma_named_interface_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.named_interface_assignment`.
	 * @param ctx the parse tree
	 */
	enterNamed_interface_assignment?: (ctx: Named_interface_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.named_interface_assignment`.
	 * @param ctx the parse tree
	 */
	exitNamed_interface_assignment?: (ctx: Named_interface_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_module_instances`.
	 * @param ctx the parse tree
	 */
	enterList_of_module_instances?: (ctx: List_of_module_instancesContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_module_instances`.
	 * @param ctx the parse tree
	 */
	exitList_of_module_instances?: (ctx: List_of_module_instancesContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_module_instance_star`.
	 * @param ctx the parse tree
	 */
	enterComma_module_instance_star?: (ctx: Comma_module_instance_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_module_instance_star`.
	 * @param ctx the parse tree
	 */
	exitComma_module_instance_star?: (ctx: Comma_module_instance_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_module_instance`.
	 * @param ctx the parse tree
	 */
	enterComma_module_instance?: (ctx: Comma_module_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_module_instance`.
	 * @param ctx the parse tree
	 */
	exitComma_module_instance?: (ctx: Comma_module_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.module_instance`.
	 * @param ctx the parse tree
	 */
	enterModule_instance?: (ctx: Module_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.module_instance`.
	 * @param ctx the parse tree
	 */
	exitModule_instance?: (ctx: Module_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.module_instance_identifier`.
	 * @param ctx the parse tree
	 */
	enterModule_instance_identifier?: (ctx: Module_instance_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.module_instance_identifier`.
	 * @param ctx the parse tree
	 */
	exitModule_instance_identifier?: (ctx: Module_instance_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.arrayed_identifier`.
	 * @param ctx the parse tree
	 */
	enterArrayed_identifier?: (ctx: Arrayed_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.arrayed_identifier`.
	 * @param ctx the parse tree
	 */
	exitArrayed_identifier?: (ctx: Arrayed_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.simple_arrayed_identifier`.
	 * @param ctx the parse tree
	 */
	enterSimple_arrayed_identifier?: (ctx: Simple_arrayed_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.simple_arrayed_identifier`.
	 * @param ctx the parse tree
	 */
	exitSimple_arrayed_identifier?: (ctx: Simple_arrayed_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.escaped_arrayed_identifier`.
	 * @param ctx the parse tree
	 */
	enterEscaped_arrayed_identifier?: (ctx: Escaped_arrayed_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.escaped_arrayed_identifier`.
	 * @param ctx the parse tree
	 */
	exitEscaped_arrayed_identifier?: (ctx: Escaped_arrayed_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.port_interface_assignments`.
	 * @param ctx the parse tree
	 */
	enterPort_interface_assignments?: (ctx: Port_interface_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.port_interface_assignments`.
	 * @param ctx the parse tree
	 */
	exitPort_interface_assignments?: (ctx: Port_interface_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.delay`.
	 * @param ctx the parse tree
	 */
	enterDelay?: (ctx: DelayContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.delay`.
	 * @param ctx the parse tree
	 */
	exitDelay?: (ctx: DelayContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_delay_values`.
	 * @param ctx the parse tree
	 */
	enterList_of_delay_values?: (ctx: List_of_delay_valuesContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_delay_values`.
	 * @param ctx the parse tree
	 */
	exitList_of_delay_values?: (ctx: List_of_delay_valuesContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_delay_value_star`.
	 * @param ctx the parse tree
	 */
	enterComma_delay_value_star?: (ctx: Comma_delay_value_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_delay_value_star`.
	 * @param ctx the parse tree
	 */
	exitComma_delay_value_star?: (ctx: Comma_delay_value_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_delay_value`.
	 * @param ctx the parse tree
	 */
	enterComma_delay_value?: (ctx: Comma_delay_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_delay_value`.
	 * @param ctx the parse tree
	 */
	exitComma_delay_value?: (ctx: Comma_delay_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.delay_value`.
	 * @param ctx the parse tree
	 */
	enterDelay_value?: (ctx: Delay_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.delay_value`.
	 * @param ctx the parse tree
	 */
	exitDelay_value?: (ctx: Delay_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pulldown_strength`.
	 * @param ctx the parse tree
	 */
	enterPulldown_strength?: (ctx: Pulldown_strengthContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pulldown_strength`.
	 * @param ctx the parse tree
	 */
	exitPulldown_strength?: (ctx: Pulldown_strengthContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pullup_strength`.
	 * @param ctx the parse tree
	 */
	enterPullup_strength?: (ctx: Pullup_strengthContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pullup_strength`.
	 * @param ctx the parse tree
	 */
	exitPullup_strength?: (ctx: Pullup_strengthContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.gate_instance_identifier`.
	 * @param ctx the parse tree
	 */
	enterGate_instance_identifier?: (ctx: Gate_instance_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.gate_instance_identifier`.
	 * @param ctx the parse tree
	 */
	exitGate_instance_identifier?: (ctx: Gate_instance_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.gate_instantiation`.
	 * @param ctx the parse tree
	 */
	enterGate_instantiation?: (ctx: Gate_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.gate_instantiation`.
	 * @param ctx the parse tree
	 */
	exitGate_instantiation?: (ctx: Gate_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.enable_gatetype`.
	 * @param ctx the parse tree
	 */
	enterEnable_gatetype?: (ctx: Enable_gatetypeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.enable_gatetype`.
	 * @param ctx the parse tree
	 */
	exitEnable_gatetype?: (ctx: Enable_gatetypeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.mos_switchtype`.
	 * @param ctx the parse tree
	 */
	enterMos_switchtype?: (ctx: Mos_switchtypeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.mos_switchtype`.
	 * @param ctx the parse tree
	 */
	exitMos_switchtype?: (ctx: Mos_switchtypeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.cmos_switchtype`.
	 * @param ctx the parse tree
	 */
	enterCmos_switchtype?: (ctx: Cmos_switchtypeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.cmos_switchtype`.
	 * @param ctx the parse tree
	 */
	exitCmos_switchtype?: (ctx: Cmos_switchtypeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.n_output_gatetype`.
	 * @param ctx the parse tree
	 */
	enterN_output_gatetype?: (ctx: N_output_gatetypeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.n_output_gatetype`.
	 * @param ctx the parse tree
	 */
	exitN_output_gatetype?: (ctx: N_output_gatetypeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.n_input_gatetype`.
	 * @param ctx the parse tree
	 */
	enterN_input_gatetype?: (ctx: N_input_gatetypeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.n_input_gatetype`.
	 * @param ctx the parse tree
	 */
	exitN_input_gatetype?: (ctx: N_input_gatetypeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pass_switchtype`.
	 * @param ctx the parse tree
	 */
	enterPass_switchtype?: (ctx: Pass_switchtypeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pass_switchtype`.
	 * @param ctx the parse tree
	 */
	exitPass_switchtype?: (ctx: Pass_switchtypeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pass_enable_switchtype`.
	 * @param ctx the parse tree
	 */
	enterPass_enable_switchtype?: (ctx: Pass_enable_switchtypeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pass_enable_switchtype`.
	 * @param ctx the parse tree
	 */
	exitPass_enable_switchtype?: (ctx: Pass_enable_switchtypeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pulldown_instantiation`.
	 * @param ctx the parse tree
	 */
	enterPulldown_instantiation?: (ctx: Pulldown_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pulldown_instantiation`.
	 * @param ctx the parse tree
	 */
	exitPulldown_instantiation?: (ctx: Pulldown_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pullup_instantiation`.
	 * @param ctx the parse tree
	 */
	enterPullup_instantiation?: (ctx: Pullup_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pullup_instantiation`.
	 * @param ctx the parse tree
	 */
	exitPullup_instantiation?: (ctx: Pullup_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.enable_instantiation`.
	 * @param ctx the parse tree
	 */
	enterEnable_instantiation?: (ctx: Enable_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.enable_instantiation`.
	 * @param ctx the parse tree
	 */
	exitEnable_instantiation?: (ctx: Enable_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.mos_instantiation`.
	 * @param ctx the parse tree
	 */
	enterMos_instantiation?: (ctx: Mos_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.mos_instantiation`.
	 * @param ctx the parse tree
	 */
	exitMos_instantiation?: (ctx: Mos_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.cmos_instantiation`.
	 * @param ctx the parse tree
	 */
	enterCmos_instantiation?: (ctx: Cmos_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.cmos_instantiation`.
	 * @param ctx the parse tree
	 */
	exitCmos_instantiation?: (ctx: Cmos_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.n_output_instantiation`.
	 * @param ctx the parse tree
	 */
	enterN_output_instantiation?: (ctx: N_output_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.n_output_instantiation`.
	 * @param ctx the parse tree
	 */
	exitN_output_instantiation?: (ctx: N_output_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.n_input_instantiation`.
	 * @param ctx the parse tree
	 */
	enterN_input_instantiation?: (ctx: N_input_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.n_input_instantiation`.
	 * @param ctx the parse tree
	 */
	exitN_input_instantiation?: (ctx: N_input_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pass_instantiation`.
	 * @param ctx the parse tree
	 */
	enterPass_instantiation?: (ctx: Pass_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pass_instantiation`.
	 * @param ctx the parse tree
	 */
	exitPass_instantiation?: (ctx: Pass_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pass_enable_instantiation`.
	 * @param ctx the parse tree
	 */
	enterPass_enable_instantiation?: (ctx: Pass_enable_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pass_enable_instantiation`.
	 * @param ctx the parse tree
	 */
	exitPass_enable_instantiation?: (ctx: Pass_enable_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_pull_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterList_of_pull_gate_instance?: (ctx: List_of_pull_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_pull_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitList_of_pull_gate_instance?: (ctx: List_of_pull_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_enable_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterList_of_enable_gate_instance?: (ctx: List_of_enable_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_enable_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitList_of_enable_gate_instance?: (ctx: List_of_enable_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_mos_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterList_of_mos_switch_instance?: (ctx: List_of_mos_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_mos_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitList_of_mos_switch_instance?: (ctx: List_of_mos_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_cmos_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterList_of_cmos_switch_instance?: (ctx: List_of_cmos_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_cmos_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitList_of_cmos_switch_instance?: (ctx: List_of_cmos_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_n_input_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterList_of_n_input_gate_instance?: (ctx: List_of_n_input_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_n_input_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitList_of_n_input_gate_instance?: (ctx: List_of_n_input_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_n_output_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterList_of_n_output_gate_instance?: (ctx: List_of_n_output_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_n_output_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitList_of_n_output_gate_instance?: (ctx: List_of_n_output_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_pass_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterList_of_pass_switch_instance?: (ctx: List_of_pass_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_pass_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitList_of_pass_switch_instance?: (ctx: List_of_pass_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_pass_enable_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterList_of_pass_enable_switch_instance?: (ctx: List_of_pass_enable_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_pass_enable_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitList_of_pass_enable_switch_instance?: (ctx: List_of_pass_enable_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_pull_gate_instance_star`.
	 * @param ctx the parse tree
	 */
	enterComma_pull_gate_instance_star?: (ctx: Comma_pull_gate_instance_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_pull_gate_instance_star`.
	 * @param ctx the parse tree
	 */
	exitComma_pull_gate_instance_star?: (ctx: Comma_pull_gate_instance_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_enable_gate_instance_star`.
	 * @param ctx the parse tree
	 */
	enterComma_enable_gate_instance_star?: (ctx: Comma_enable_gate_instance_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_enable_gate_instance_star`.
	 * @param ctx the parse tree
	 */
	exitComma_enable_gate_instance_star?: (ctx: Comma_enable_gate_instance_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_mos_switch_instance_star`.
	 * @param ctx the parse tree
	 */
	enterComma_mos_switch_instance_star?: (ctx: Comma_mos_switch_instance_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_mos_switch_instance_star`.
	 * @param ctx the parse tree
	 */
	exitComma_mos_switch_instance_star?: (ctx: Comma_mos_switch_instance_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_cmos_switch_instance_star`.
	 * @param ctx the parse tree
	 */
	enterComma_cmos_switch_instance_star?: (ctx: Comma_cmos_switch_instance_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_cmos_switch_instance_star`.
	 * @param ctx the parse tree
	 */
	exitComma_cmos_switch_instance_star?: (ctx: Comma_cmos_switch_instance_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_n_input_gate_instance_star`.
	 * @param ctx the parse tree
	 */
	enterComma_n_input_gate_instance_star?: (ctx: Comma_n_input_gate_instance_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_n_input_gate_instance_star`.
	 * @param ctx the parse tree
	 */
	exitComma_n_input_gate_instance_star?: (ctx: Comma_n_input_gate_instance_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_n_output_gate_instance_star`.
	 * @param ctx the parse tree
	 */
	enterComma_n_output_gate_instance_star?: (ctx: Comma_n_output_gate_instance_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_n_output_gate_instance_star`.
	 * @param ctx the parse tree
	 */
	exitComma_n_output_gate_instance_star?: (ctx: Comma_n_output_gate_instance_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_pass_switch_instance_star`.
	 * @param ctx the parse tree
	 */
	enterComma_pass_switch_instance_star?: (ctx: Comma_pass_switch_instance_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_pass_switch_instance_star`.
	 * @param ctx the parse tree
	 */
	exitComma_pass_switch_instance_star?: (ctx: Comma_pass_switch_instance_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_pass_enable_switch_instance_star`.
	 * @param ctx the parse tree
	 */
	enterComma_pass_enable_switch_instance_star?: (ctx: Comma_pass_enable_switch_instance_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_pass_enable_switch_instance_star`.
	 * @param ctx the parse tree
	 */
	exitComma_pass_enable_switch_instance_star?: (ctx: Comma_pass_enable_switch_instance_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_pull_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterComma_pull_gate_instance?: (ctx: Comma_pull_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_pull_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitComma_pull_gate_instance?: (ctx: Comma_pull_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_enable_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterComma_enable_gate_instance?: (ctx: Comma_enable_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_enable_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitComma_enable_gate_instance?: (ctx: Comma_enable_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_mos_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterComma_mos_switch_instance?: (ctx: Comma_mos_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_mos_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitComma_mos_switch_instance?: (ctx: Comma_mos_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_cmos_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterComma_cmos_switch_instance?: (ctx: Comma_cmos_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_cmos_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitComma_cmos_switch_instance?: (ctx: Comma_cmos_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_n_input_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterComma_n_input_gate_instance?: (ctx: Comma_n_input_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_n_input_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitComma_n_input_gate_instance?: (ctx: Comma_n_input_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_n_output_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterComma_n_output_gate_instance?: (ctx: Comma_n_output_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_n_output_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitComma_n_output_gate_instance?: (ctx: Comma_n_output_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_pass_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterComma_pass_switch_instance?: (ctx: Comma_pass_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_pass_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitComma_pass_switch_instance?: (ctx: Comma_pass_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_pass_enable_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterComma_pass_enable_switch_instance?: (ctx: Comma_pass_enable_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_pass_enable_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitComma_pass_enable_switch_instance?: (ctx: Comma_pass_enable_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pull_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterPull_gate_instance?: (ctx: Pull_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pull_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitPull_gate_instance?: (ctx: Pull_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.enable_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterEnable_gate_instance?: (ctx: Enable_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.enable_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitEnable_gate_instance?: (ctx: Enable_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.mos_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterMos_switch_instance?: (ctx: Mos_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.mos_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitMos_switch_instance?: (ctx: Mos_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.cmos_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterCmos_switch_instance?: (ctx: Cmos_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.cmos_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitCmos_switch_instance?: (ctx: Cmos_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.n_input_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterN_input_gate_instance?: (ctx: N_input_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.n_input_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitN_input_gate_instance?: (ctx: N_input_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.n_output_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterN_output_gate_instance?: (ctx: N_output_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.n_output_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitN_output_gate_instance?: (ctx: N_output_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pass_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterPass_switch_instance?: (ctx: Pass_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pass_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitPass_switch_instance?: (ctx: Pass_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pass_enable_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterPass_enable_switch_instance?: (ctx: Pass_enable_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pass_enable_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitPass_enable_switch_instance?: (ctx: Pass_enable_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pull_gate_interface`.
	 * @param ctx the parse tree
	 */
	enterPull_gate_interface?: (ctx: Pull_gate_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pull_gate_interface`.
	 * @param ctx the parse tree
	 */
	exitPull_gate_interface?: (ctx: Pull_gate_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.enable_gate_interface`.
	 * @param ctx the parse tree
	 */
	enterEnable_gate_interface?: (ctx: Enable_gate_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.enable_gate_interface`.
	 * @param ctx the parse tree
	 */
	exitEnable_gate_interface?: (ctx: Enable_gate_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.mos_switch_interface`.
	 * @param ctx the parse tree
	 */
	enterMos_switch_interface?: (ctx: Mos_switch_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.mos_switch_interface`.
	 * @param ctx the parse tree
	 */
	exitMos_switch_interface?: (ctx: Mos_switch_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.cmos_switch_interface`.
	 * @param ctx the parse tree
	 */
	enterCmos_switch_interface?: (ctx: Cmos_switch_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.cmos_switch_interface`.
	 * @param ctx the parse tree
	 */
	exitCmos_switch_interface?: (ctx: Cmos_switch_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.n_input_gate_interface`.
	 * @param ctx the parse tree
	 */
	enterN_input_gate_interface?: (ctx: N_input_gate_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.n_input_gate_interface`.
	 * @param ctx the parse tree
	 */
	exitN_input_gate_interface?: (ctx: N_input_gate_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.n_output_gate_interface`.
	 * @param ctx the parse tree
	 */
	enterN_output_gate_interface?: (ctx: N_output_gate_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.n_output_gate_interface`.
	 * @param ctx the parse tree
	 */
	exitN_output_gate_interface?: (ctx: N_output_gate_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pass_switch_interface`.
	 * @param ctx the parse tree
	 */
	enterPass_switch_interface?: (ctx: Pass_switch_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pass_switch_interface`.
	 * @param ctx the parse tree
	 */
	exitPass_switch_interface?: (ctx: Pass_switch_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pass_enable_switch_interface`.
	 * @param ctx the parse tree
	 */
	enterPass_enable_switch_interface?: (ctx: Pass_enable_switch_interfaceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pass_enable_switch_interface`.
	 * @param ctx the parse tree
	 */
	exitPass_enable_switch_interface?: (ctx: Pass_enable_switch_interfaceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_input_terminals`.
	 * @param ctx the parse tree
	 */
	enterList_of_input_terminals?: (ctx: List_of_input_terminalsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_input_terminals`.
	 * @param ctx the parse tree
	 */
	exitList_of_input_terminals?: (ctx: List_of_input_terminalsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_output_terminals`.
	 * @param ctx the parse tree
	 */
	enterList_of_output_terminals?: (ctx: List_of_output_terminalsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_output_terminals`.
	 * @param ctx the parse tree
	 */
	exitList_of_output_terminals?: (ctx: List_of_output_terminalsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_input_terminal_star`.
	 * @param ctx the parse tree
	 */
	enterComma_input_terminal_star?: (ctx: Comma_input_terminal_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_input_terminal_star`.
	 * @param ctx the parse tree
	 */
	exitComma_input_terminal_star?: (ctx: Comma_input_terminal_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_output_terminal_star`.
	 * @param ctx the parse tree
	 */
	enterComma_output_terminal_star?: (ctx: Comma_output_terminal_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_output_terminal_star`.
	 * @param ctx the parse tree
	 */
	exitComma_output_terminal_star?: (ctx: Comma_output_terminal_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_input_terminal`.
	 * @param ctx the parse tree
	 */
	enterComma_input_terminal?: (ctx: Comma_input_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_input_terminal`.
	 * @param ctx the parse tree
	 */
	exitComma_input_terminal?: (ctx: Comma_input_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_output_terminal`.
	 * @param ctx the parse tree
	 */
	enterComma_output_terminal?: (ctx: Comma_output_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_output_terminal`.
	 * @param ctx the parse tree
	 */
	exitComma_output_terminal?: (ctx: Comma_output_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.enable_terminal`.
	 * @param ctx the parse tree
	 */
	enterEnable_terminal?: (ctx: Enable_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.enable_terminal`.
	 * @param ctx the parse tree
	 */
	exitEnable_terminal?: (ctx: Enable_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.input_terminal`.
	 * @param ctx the parse tree
	 */
	enterInput_terminal?: (ctx: Input_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.input_terminal`.
	 * @param ctx the parse tree
	 */
	exitInput_terminal?: (ctx: Input_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.inout_terminal`.
	 * @param ctx the parse tree
	 */
	enterInout_terminal?: (ctx: Inout_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.inout_terminal`.
	 * @param ctx the parse tree
	 */
	exitInout_terminal?: (ctx: Inout_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.ncontrol_terminal`.
	 * @param ctx the parse tree
	 */
	enterNcontrol_terminal?: (ctx: Ncontrol_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.ncontrol_terminal`.
	 * @param ctx the parse tree
	 */
	exitNcontrol_terminal?: (ctx: Ncontrol_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.output_terminal`.
	 * @param ctx the parse tree
	 */
	enterOutput_terminal?: (ctx: Output_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.output_terminal`.
	 * @param ctx the parse tree
	 */
	exitOutput_terminal?: (ctx: Output_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.pcontrol_terminal`.
	 * @param ctx the parse tree
	 */
	enterPcontrol_terminal?: (ctx: Pcontrol_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.pcontrol_terminal`.
	 * @param ctx the parse tree
	 */
	exitPcontrol_terminal?: (ctx: Pcontrol_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.statement_star`.
	 * @param ctx the parse tree
	 */
	enterStatement_star?: (ctx: Statement_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.statement_star`.
	 * @param ctx the parse tree
	 */
	exitStatement_star?: (ctx: Statement_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.statement_semicolon`.
	 * @param ctx the parse tree
	 */
	enterStatement_semicolon?: (ctx: Statement_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.statement_semicolon`.
	 * @param ctx the parse tree
	 */
	exitStatement_semicolon?: (ctx: Statement_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.assignment_statement`.
	 * @param ctx the parse tree
	 */
	enterAssignment_statement?: (ctx: Assignment_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.assignment_statement`.
	 * @param ctx the parse tree
	 */
	exitAssignment_statement?: (ctx: Assignment_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.flow_control_statement`.
	 * @param ctx the parse tree
	 */
	enterFlow_control_statement?: (ctx: Flow_control_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.flow_control_statement`.
	 * @param ctx the parse tree
	 */
	exitFlow_control_statement?: (ctx: Flow_control_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.block_statement`.
	 * @param ctx the parse tree
	 */
	enterBlock_statement?: (ctx: Block_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.block_statement`.
	 * @param ctx the parse tree
	 */
	exitBlock_statement?: (ctx: Block_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.task_call_statement`.
	 * @param ctx the parse tree
	 */
	enterTask_call_statement?: (ctx: Task_call_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.task_call_statement`.
	 * @param ctx the parse tree
	 */
	exitTask_call_statement?: (ctx: Task_call_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.event_statement`.
	 * @param ctx the parse tree
	 */
	enterEvent_statement?: (ctx: Event_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.event_statement`.
	 * @param ctx the parse tree
	 */
	exitEvent_statement?: (ctx: Event_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.procedural_statement`.
	 * @param ctx the parse tree
	 */
	enterProcedural_statement?: (ctx: Procedural_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.procedural_statement`.
	 * @param ctx the parse tree
	 */
	exitProcedural_statement?: (ctx: Procedural_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.expression_statement`.
	 * @param ctx the parse tree
	 */
	enterExpression_statement?: (ctx: Expression_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.expression_statement`.
	 * @param ctx the parse tree
	 */
	exitExpression_statement?: (ctx: Expression_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.subroutine_statement`.
	 * @param ctx the parse tree
	 */
	enterSubroutine_statement?: (ctx: Subroutine_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.subroutine_statement`.
	 * @param ctx the parse tree
	 */
	exitSubroutine_statement?: (ctx: Subroutine_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.return_statement`.
	 * @param ctx the parse tree
	 */
	enterReturn_statement?: (ctx: Return_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.return_statement`.
	 * @param ctx the parse tree
	 */
	exitReturn_statement?: (ctx: Return_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.null_statement`.
	 * @param ctx the parse tree
	 */
	enterNull_statement?: (ctx: Null_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.null_statement`.
	 * @param ctx the parse tree
	 */
	exitNull_statement?: (ctx: Null_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.procedural_continuous_assignments`.
	 * @param ctx the parse tree
	 */
	enterProcedural_continuous_assignments?: (ctx: Procedural_continuous_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.procedural_continuous_assignments`.
	 * @param ctx the parse tree
	 */
	exitProcedural_continuous_assignments?: (ctx: Procedural_continuous_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.assign_statement`.
	 * @param ctx the parse tree
	 */
	enterAssign_statement?: (ctx: Assign_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.assign_statement`.
	 * @param ctx the parse tree
	 */
	exitAssign_statement?: (ctx: Assign_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.deassign_statement`.
	 * @param ctx the parse tree
	 */
	enterDeassign_statement?: (ctx: Deassign_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.deassign_statement`.
	 * @param ctx the parse tree
	 */
	exitDeassign_statement?: (ctx: Deassign_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.force_statement`.
	 * @param ctx the parse tree
	 */
	enterForce_statement?: (ctx: Force_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.force_statement`.
	 * @param ctx the parse tree
	 */
	exitForce_statement?: (ctx: Force_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.release_statement`.
	 * @param ctx the parse tree
	 */
	enterRelease_statement?: (ctx: Release_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.release_statement`.
	 * @param ctx the parse tree
	 */
	exitRelease_statement?: (ctx: Release_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.procedural_timing_control_statement`.
	 * @param ctx the parse tree
	 */
	enterProcedural_timing_control_statement?: (ctx: Procedural_timing_control_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.procedural_timing_control_statement`.
	 * @param ctx the parse tree
	 */
	exitProcedural_timing_control_statement?: (ctx: Procedural_timing_control_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.property_statement`.
	 * @param ctx the parse tree
	 */
	enterProperty_statement?: (ctx: Property_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.property_statement`.
	 * @param ctx the parse tree
	 */
	exitProperty_statement?: (ctx: Property_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.disable_condition_statement`.
	 * @param ctx the parse tree
	 */
	enterDisable_condition_statement?: (ctx: Disable_condition_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.disable_condition_statement`.
	 * @param ctx the parse tree
	 */
	exitDisable_condition_statement?: (ctx: Disable_condition_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.property_expression`.
	 * @param ctx the parse tree
	 */
	enterProperty_expression?: (ctx: Property_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.property_expression`.
	 * @param ctx the parse tree
	 */
	exitProperty_expression?: (ctx: Property_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.procedural_assertion_statement`.
	 * @param ctx the parse tree
	 */
	enterProcedural_assertion_statement?: (ctx: Procedural_assertion_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.procedural_assertion_statement`.
	 * @param ctx the parse tree
	 */
	exitProcedural_assertion_statement?: (ctx: Procedural_assertion_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.assert_else_statement`.
	 * @param ctx the parse tree
	 */
	enterAssert_else_statement?: (ctx: Assert_else_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.assert_else_statement`.
	 * @param ctx the parse tree
	 */
	exitAssert_else_statement?: (ctx: Assert_else_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.assert_statement`.
	 * @param ctx the parse tree
	 */
	enterAssert_statement?: (ctx: Assert_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.assert_statement`.
	 * @param ctx the parse tree
	 */
	exitAssert_statement?: (ctx: Assert_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.system_task_enable`.
	 * @param ctx the parse tree
	 */
	enterSystem_task_enable?: (ctx: System_task_enableContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.system_task_enable`.
	 * @param ctx the parse tree
	 */
	exitSystem_task_enable?: (ctx: System_task_enableContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.system_task_identifier`.
	 * @param ctx the parse tree
	 */
	enterSystem_task_identifier?: (ctx: System_task_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.system_task_identifier`.
	 * @param ctx the parse tree
	 */
	exitSystem_task_identifier?: (ctx: System_task_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.task_interface_assignments`.
	 * @param ctx the parse tree
	 */
	enterTask_interface_assignments?: (ctx: Task_interface_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.task_interface_assignments`.
	 * @param ctx the parse tree
	 */
	exitTask_interface_assignments?: (ctx: Task_interface_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.task_enable`.
	 * @param ctx the parse tree
	 */
	enterTask_enable?: (ctx: Task_enableContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.task_enable`.
	 * @param ctx the parse tree
	 */
	exitTask_enable?: (ctx: Task_enableContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.hierarchical_task_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_task_identifier?: (ctx: Hierarchical_task_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.hierarchical_task_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_task_identifier?: (ctx: Hierarchical_task_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.disable_statement`.
	 * @param ctx the parse tree
	 */
	enterDisable_statement?: (ctx: Disable_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.disable_statement`.
	 * @param ctx the parse tree
	 */
	exitDisable_statement?: (ctx: Disable_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.hierarchical_block_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_block_identifier?: (ctx: Hierarchical_block_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.hierarchical_block_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_block_identifier?: (ctx: Hierarchical_block_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.variable_lvalue`.
	 * @param ctx the parse tree
	 */
	enterVariable_lvalue?: (ctx: Variable_lvalueContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.variable_lvalue`.
	 * @param ctx the parse tree
	 */
	exitVariable_lvalue?: (ctx: Variable_lvalueContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.hierarchical_variable_lvalue`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_variable_lvalue?: (ctx: Hierarchical_variable_lvalueContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.hierarchical_variable_lvalue`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_variable_lvalue?: (ctx: Hierarchical_variable_lvalueContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.variable_concatenation`.
	 * @param ctx the parse tree
	 */
	enterVariable_concatenation?: (ctx: Variable_concatenationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.variable_concatenation`.
	 * @param ctx the parse tree
	 */
	exitVariable_concatenation?: (ctx: Variable_concatenationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.variable_concatenation_value`.
	 * @param ctx the parse tree
	 */
	enterVariable_concatenation_value?: (ctx: Variable_concatenation_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.variable_concatenation_value`.
	 * @param ctx the parse tree
	 */
	exitVariable_concatenation_value?: (ctx: Variable_concatenation_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_vcv_star`.
	 * @param ctx the parse tree
	 */
	enterComma_vcv_star?: (ctx: Comma_vcv_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_vcv_star`.
	 * @param ctx the parse tree
	 */
	exitComma_vcv_star?: (ctx: Comma_vcv_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.blocking_assignment`.
	 * @param ctx the parse tree
	 */
	enterBlocking_assignment?: (ctx: Blocking_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.blocking_assignment`.
	 * @param ctx the parse tree
	 */
	exitBlocking_assignment?: (ctx: Blocking_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.nonblocking_assignment`.
	 * @param ctx the parse tree
	 */
	enterNonblocking_assignment?: (ctx: Nonblocking_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.nonblocking_assignment`.
	 * @param ctx the parse tree
	 */
	exitNonblocking_assignment?: (ctx: Nonblocking_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.prefix_assignment`.
	 * @param ctx the parse tree
	 */
	enterPrefix_assignment?: (ctx: Prefix_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.prefix_assignment`.
	 * @param ctx the parse tree
	 */
	exitPrefix_assignment?: (ctx: Prefix_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.postfix_assignment`.
	 * @param ctx the parse tree
	 */
	enterPostfix_assignment?: (ctx: Postfix_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.postfix_assignment`.
	 * @param ctx the parse tree
	 */
	exitPostfix_assignment?: (ctx: Postfix_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.operator_assignment`.
	 * @param ctx the parse tree
	 */
	enterOperator_assignment?: (ctx: Operator_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.operator_assignment`.
	 * @param ctx the parse tree
	 */
	exitOperator_assignment?: (ctx: Operator_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.declarative_assignment`.
	 * @param ctx the parse tree
	 */
	enterDeclarative_assignment?: (ctx: Declarative_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.declarative_assignment`.
	 * @param ctx the parse tree
	 */
	exitDeclarative_assignment?: (ctx: Declarative_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.delay_or_event_control`.
	 * @param ctx the parse tree
	 */
	enterDelay_or_event_control?: (ctx: Delay_or_event_controlContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.delay_or_event_control`.
	 * @param ctx the parse tree
	 */
	exitDelay_or_event_control?: (ctx: Delay_or_event_controlContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.delay_control`.
	 * @param ctx the parse tree
	 */
	enterDelay_control?: (ctx: Delay_controlContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.delay_control`.
	 * @param ctx the parse tree
	 */
	exitDelay_control?: (ctx: Delay_controlContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.event_control`.
	 * @param ctx the parse tree
	 */
	enterEvent_control?: (ctx: Event_controlContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.event_control`.
	 * @param ctx the parse tree
	 */
	exitEvent_control?: (ctx: Event_controlContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.event_control_identifier`.
	 * @param ctx the parse tree
	 */
	enterEvent_control_identifier?: (ctx: Event_control_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.event_control_identifier`.
	 * @param ctx the parse tree
	 */
	exitEvent_control_identifier?: (ctx: Event_control_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.event_control_expression`.
	 * @param ctx the parse tree
	 */
	enterEvent_control_expression?: (ctx: Event_control_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.event_control_expression`.
	 * @param ctx the parse tree
	 */
	exitEvent_control_expression?: (ctx: Event_control_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.event_expression`.
	 * @param ctx the parse tree
	 */
	enterEvent_expression?: (ctx: Event_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.event_expression`.
	 * @param ctx the parse tree
	 */
	exitEvent_expression?: (ctx: Event_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.single_event_expression`.
	 * @param ctx the parse tree
	 */
	enterSingle_event_expression?: (ctx: Single_event_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.single_event_expression`.
	 * @param ctx the parse tree
	 */
	exitSingle_event_expression?: (ctx: Single_event_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.event_expression_edgespec`.
	 * @param ctx the parse tree
	 */
	enterEvent_expression_edgespec?: (ctx: Event_expression_edgespecContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.event_expression_edgespec`.
	 * @param ctx the parse tree
	 */
	exitEvent_expression_edgespec?: (ctx: Event_expression_edgespecContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.event_expression_or`.
	 * @param ctx the parse tree
	 */
	enterEvent_expression_or?: (ctx: Event_expression_orContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.event_expression_or`.
	 * @param ctx the parse tree
	 */
	exitEvent_expression_or?: (ctx: Event_expression_orContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_event_expression_comma`.
	 * @param ctx the parse tree
	 */
	enterList_of_event_expression_comma?: (ctx: List_of_event_expression_commaContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_event_expression_comma`.
	 * @param ctx the parse tree
	 */
	exitList_of_event_expression_comma?: (ctx: List_of_event_expression_commaContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_event_expression_star`.
	 * @param ctx the parse tree
	 */
	enterComma_event_expression_star?: (ctx: Comma_event_expression_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_event_expression_star`.
	 * @param ctx the parse tree
	 */
	exitComma_event_expression_star?: (ctx: Comma_event_expression_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_event_expression`.
	 * @param ctx the parse tree
	 */
	enterComma_event_expression?: (ctx: Comma_event_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_event_expression`.
	 * @param ctx the parse tree
	 */
	exitComma_event_expression?: (ctx: Comma_event_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_event_expression_or`.
	 * @param ctx the parse tree
	 */
	enterList_of_event_expression_or?: (ctx: List_of_event_expression_orContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_event_expression_or`.
	 * @param ctx the parse tree
	 */
	exitList_of_event_expression_or?: (ctx: List_of_event_expression_orContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.or_event_expression_star`.
	 * @param ctx the parse tree
	 */
	enterOr_event_expression_star?: (ctx: Or_event_expression_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.or_event_expression_star`.
	 * @param ctx the parse tree
	 */
	exitOr_event_expression_star?: (ctx: Or_event_expression_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.or_event_expression`.
	 * @param ctx the parse tree
	 */
	enterOr_event_expression?: (ctx: Or_event_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.or_event_expression`.
	 * @param ctx the parse tree
	 */
	exitOr_event_expression?: (ctx: Or_event_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.event_control_wildcard`.
	 * @param ctx the parse tree
	 */
	enterEvent_control_wildcard?: (ctx: Event_control_wildcardContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.event_control_wildcard`.
	 * @param ctx the parse tree
	 */
	exitEvent_control_wildcard?: (ctx: Event_control_wildcardContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.repeat_event_control`.
	 * @param ctx the parse tree
	 */
	enterRepeat_event_control?: (ctx: Repeat_event_controlContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.repeat_event_control`.
	 * @param ctx the parse tree
	 */
	exitRepeat_event_control?: (ctx: Repeat_event_controlContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.event_trigger`.
	 * @param ctx the parse tree
	 */
	enterEvent_trigger?: (ctx: Event_triggerContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.event_trigger`.
	 * @param ctx the parse tree
	 */
	exitEvent_trigger?: (ctx: Event_triggerContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.hierarchical_event_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_event_identifier?: (ctx: Hierarchical_event_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.hierarchical_event_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_event_identifier?: (ctx: Hierarchical_event_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.event_identifier`.
	 * @param ctx the parse tree
	 */
	enterEvent_identifier?: (ctx: Event_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.event_identifier`.
	 * @param ctx the parse tree
	 */
	exitEvent_identifier?: (ctx: Event_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.wait_statement`.
	 * @param ctx the parse tree
	 */
	enterWait_statement?: (ctx: Wait_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.wait_statement`.
	 * @param ctx the parse tree
	 */
	exitWait_statement?: (ctx: Wait_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_generated_instantiation`.
	 * @param ctx the parse tree
	 */
	enterAttr_generated_instantiation?: (ctx: Attr_generated_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_generated_instantiation`.
	 * @param ctx the parse tree
	 */
	exitAttr_generated_instantiation?: (ctx: Attr_generated_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generated_instantiation`.
	 * @param ctx the parse tree
	 */
	enterGenerated_instantiation?: (ctx: Generated_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generated_instantiation`.
	 * @param ctx the parse tree
	 */
	exitGenerated_instantiation?: (ctx: Generated_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_item_star`.
	 * @param ctx the parse tree
	 */
	enterGenerate_item_star?: (ctx: Generate_item_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_item_star`.
	 * @param ctx the parse tree
	 */
	exitGenerate_item_star?: (ctx: Generate_item_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_item`.
	 * @param ctx the parse tree
	 */
	enterGenerate_item?: (ctx: Generate_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_item`.
	 * @param ctx the parse tree
	 */
	exitGenerate_item?: (ctx: Generate_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_block`.
	 * @param ctx the parse tree
	 */
	enterGenerate_block?: (ctx: Generate_blockContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_block`.
	 * @param ctx the parse tree
	 */
	exitGenerate_block?: (ctx: Generate_blockContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_colon_block_identifier0`.
	 * @param ctx the parse tree
	 */
	enterGenerate_colon_block_identifier0?: (ctx: Generate_colon_block_identifier0Context) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_colon_block_identifier0`.
	 * @param ctx the parse tree
	 */
	exitGenerate_colon_block_identifier0?: (ctx: Generate_colon_block_identifier0Context) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_colon_block_identifier1`.
	 * @param ctx the parse tree
	 */
	enterGenerate_colon_block_identifier1?: (ctx: Generate_colon_block_identifier1Context) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_colon_block_identifier1`.
	 * @param ctx the parse tree
	 */
	exitGenerate_colon_block_identifier1?: (ctx: Generate_colon_block_identifier1Context) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_colon_block_identifier`.
	 * @param ctx the parse tree
	 */
	enterGenerate_colon_block_identifier?: (ctx: Generate_colon_block_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_colon_block_identifier`.
	 * @param ctx the parse tree
	 */
	exitGenerate_colon_block_identifier?: (ctx: Generate_colon_block_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_block_identifier`.
	 * @param ctx the parse tree
	 */
	enterGenerate_block_identifier?: (ctx: Generate_block_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_block_identifier`.
	 * @param ctx the parse tree
	 */
	exitGenerate_block_identifier?: (ctx: Generate_block_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_conditional_statement`.
	 * @param ctx the parse tree
	 */
	enterGenerate_conditional_statement?: (ctx: Generate_conditional_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_conditional_statement`.
	 * @param ctx the parse tree
	 */
	exitGenerate_conditional_statement?: (ctx: Generate_conditional_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_if_statement`.
	 * @param ctx the parse tree
	 */
	enterGenerate_if_statement?: (ctx: Generate_if_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_if_statement`.
	 * @param ctx the parse tree
	 */
	exitGenerate_if_statement?: (ctx: Generate_if_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_else_statement`.
	 * @param ctx the parse tree
	 */
	enterGenerate_else_statement?: (ctx: Generate_else_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_else_statement`.
	 * @param ctx the parse tree
	 */
	exitGenerate_else_statement?: (ctx: Generate_else_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_loop_statement`.
	 * @param ctx the parse tree
	 */
	enterGenerate_loop_statement?: (ctx: Generate_loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_loop_statement`.
	 * @param ctx the parse tree
	 */
	exitGenerate_loop_statement?: (ctx: Generate_loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_forever_loop_statement`.
	 * @param ctx the parse tree
	 */
	enterGenerate_forever_loop_statement?: (ctx: Generate_forever_loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_forever_loop_statement`.
	 * @param ctx the parse tree
	 */
	exitGenerate_forever_loop_statement?: (ctx: Generate_forever_loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_repeat_loop_statement`.
	 * @param ctx the parse tree
	 */
	enterGenerate_repeat_loop_statement?: (ctx: Generate_repeat_loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_repeat_loop_statement`.
	 * @param ctx the parse tree
	 */
	exitGenerate_repeat_loop_statement?: (ctx: Generate_repeat_loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_while_loop_statement`.
	 * @param ctx the parse tree
	 */
	enterGenerate_while_loop_statement?: (ctx: Generate_while_loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_while_loop_statement`.
	 * @param ctx the parse tree
	 */
	exitGenerate_while_loop_statement?: (ctx: Generate_while_loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_do_loop_statement`.
	 * @param ctx the parse tree
	 */
	enterGenerate_do_loop_statement?: (ctx: Generate_do_loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_do_loop_statement`.
	 * @param ctx the parse tree
	 */
	exitGenerate_do_loop_statement?: (ctx: Generate_do_loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_for_loop_statement`.
	 * @param ctx the parse tree
	 */
	enterGenerate_for_loop_statement?: (ctx: Generate_for_loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_for_loop_statement`.
	 * @param ctx the parse tree
	 */
	exitGenerate_for_loop_statement?: (ctx: Generate_for_loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_case_statement`.
	 * @param ctx the parse tree
	 */
	enterGenerate_case_statement?: (ctx: Generate_case_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_case_statement`.
	 * @param ctx the parse tree
	 */
	exitGenerate_case_statement?: (ctx: Generate_case_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_case_item_star`.
	 * @param ctx the parse tree
	 */
	enterGenerate_case_item_star?: (ctx: Generate_case_item_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_case_item_star`.
	 * @param ctx the parse tree
	 */
	exitGenerate_case_item_star?: (ctx: Generate_case_item_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.generate_case_item`.
	 * @param ctx the parse tree
	 */
	enterGenerate_case_item?: (ctx: Generate_case_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.generate_case_item`.
	 * @param ctx the parse tree
	 */
	exitGenerate_case_item?: (ctx: Generate_case_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.conditional_statement`.
	 * @param ctx the parse tree
	 */
	enterConditional_statement?: (ctx: Conditional_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.conditional_statement`.
	 * @param ctx the parse tree
	 */
	exitConditional_statement?: (ctx: Conditional_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.if_statement`.
	 * @param ctx the parse tree
	 */
	enterIf_statement?: (ctx: If_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.if_statement`.
	 * @param ctx the parse tree
	 */
	exitIf_statement?: (ctx: If_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.else_statement`.
	 * @param ctx the parse tree
	 */
	enterElse_statement?: (ctx: Else_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.else_statement`.
	 * @param ctx the parse tree
	 */
	exitElse_statement?: (ctx: Else_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.conditional_expression`.
	 * @param ctx the parse tree
	 */
	enterConditional_expression?: (ctx: Conditional_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.conditional_expression`.
	 * @param ctx the parse tree
	 */
	exitConditional_expression?: (ctx: Conditional_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.loop_statement`.
	 * @param ctx the parse tree
	 */
	enterLoop_statement?: (ctx: Loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.loop_statement`.
	 * @param ctx the parse tree
	 */
	exitLoop_statement?: (ctx: Loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.forever_loop_statement`.
	 * @param ctx the parse tree
	 */
	enterForever_loop_statement?: (ctx: Forever_loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.forever_loop_statement`.
	 * @param ctx the parse tree
	 */
	exitForever_loop_statement?: (ctx: Forever_loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.repeat_loop_statement`.
	 * @param ctx the parse tree
	 */
	enterRepeat_loop_statement?: (ctx: Repeat_loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.repeat_loop_statement`.
	 * @param ctx the parse tree
	 */
	exitRepeat_loop_statement?: (ctx: Repeat_loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.while_loop_statement`.
	 * @param ctx the parse tree
	 */
	enterWhile_loop_statement?: (ctx: While_loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.while_loop_statement`.
	 * @param ctx the parse tree
	 */
	exitWhile_loop_statement?: (ctx: While_loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.do_loop_statement`.
	 * @param ctx the parse tree
	 */
	enterDo_loop_statement?: (ctx: Do_loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.do_loop_statement`.
	 * @param ctx the parse tree
	 */
	exitDo_loop_statement?: (ctx: Do_loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.for_loop_statement`.
	 * @param ctx the parse tree
	 */
	enterFor_loop_statement?: (ctx: For_loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.for_loop_statement`.
	 * @param ctx the parse tree
	 */
	exitFor_loop_statement?: (ctx: For_loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.loop_init_assignment`.
	 * @param ctx the parse tree
	 */
	enterLoop_init_assignment?: (ctx: Loop_init_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.loop_init_assignment`.
	 * @param ctx the parse tree
	 */
	exitLoop_init_assignment?: (ctx: Loop_init_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.loop_terminate_expression`.
	 * @param ctx the parse tree
	 */
	enterLoop_terminate_expression?: (ctx: Loop_terminate_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.loop_terminate_expression`.
	 * @param ctx the parse tree
	 */
	exitLoop_terminate_expression?: (ctx: Loop_terminate_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.loop_step_assignment`.
	 * @param ctx the parse tree
	 */
	enterLoop_step_assignment?: (ctx: Loop_step_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.loop_step_assignment`.
	 * @param ctx the parse tree
	 */
	exitLoop_step_assignment?: (ctx: Loop_step_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.case_statement`.
	 * @param ctx the parse tree
	 */
	enterCase_statement?: (ctx: Case_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.case_statement`.
	 * @param ctx the parse tree
	 */
	exitCase_statement?: (ctx: Case_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.case_item_star`.
	 * @param ctx the parse tree
	 */
	enterCase_item_star?: (ctx: Case_item_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.case_item_star`.
	 * @param ctx the parse tree
	 */
	exitCase_item_star?: (ctx: Case_item_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.case_item`.
	 * @param ctx the parse tree
	 */
	enterCase_item?: (ctx: Case_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.case_item`.
	 * @param ctx the parse tree
	 */
	exitCase_item?: (ctx: Case_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.case_switch`.
	 * @param ctx the parse tree
	 */
	enterCase_switch?: (ctx: Case_switchContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.case_switch`.
	 * @param ctx the parse tree
	 */
	exitCase_switch?: (ctx: Case_switchContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.case_item_key`.
	 * @param ctx the parse tree
	 */
	enterCase_item_key?: (ctx: Case_item_keyContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.case_item_key`.
	 * @param ctx the parse tree
	 */
	exitCase_item_key?: (ctx: Case_item_keyContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.case_item_key_expression`.
	 * @param ctx the parse tree
	 */
	enterCase_item_key_expression?: (ctx: Case_item_key_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.case_item_key_expression`.
	 * @param ctx the parse tree
	 */
	exitCase_item_key_expression?: (ctx: Case_item_key_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_case_item_key_expression`.
	 * @param ctx the parse tree
	 */
	enterComma_case_item_key_expression?: (ctx: Comma_case_item_key_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_case_item_key_expression`.
	 * @param ctx the parse tree
	 */
	exitComma_case_item_key_expression?: (ctx: Comma_case_item_key_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_case_item_key_expression_star`.
	 * @param ctx the parse tree
	 */
	enterComma_case_item_key_expression_star?: (ctx: Comma_case_item_key_expression_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_case_item_key_expression_star`.
	 * @param ctx the parse tree
	 */
	exitComma_case_item_key_expression_star?: (ctx: Comma_case_item_key_expression_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.single_expression`.
	 * @param ctx the parse tree
	 */
	enterSingle_expression?: (ctx: Single_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.single_expression`.
	 * @param ctx the parse tree
	 */
	exitSingle_expression?: (ctx: Single_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.primary_range`.
	 * @param ctx the parse tree
	 */
	enterPrimary_range?: (ctx: Primary_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.primary_range`.
	 * @param ctx the parse tree
	 */
	exitPrimary_range?: (ctx: Primary_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.primary`.
	 * @param ctx the parse tree
	 */
	enterPrimary?: (ctx: PrimaryContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.primary`.
	 * @param ctx the parse tree
	 */
	exitPrimary?: (ctx: PrimaryContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.unary_expression`.
	 * @param ctx the parse tree
	 */
	enterUnary_expression?: (ctx: Unary_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.unary_expression`.
	 * @param ctx the parse tree
	 */
	exitUnary_expression?: (ctx: Unary_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.unary_post_assign_expression`.
	 * @param ctx the parse tree
	 */
	enterUnary_post_assign_expression?: (ctx: Unary_post_assign_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.unary_post_assign_expression`.
	 * @param ctx the parse tree
	 */
	exitUnary_post_assign_expression?: (ctx: Unary_post_assign_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.unary_pre_assign_expression`.
	 * @param ctx the parse tree
	 */
	enterUnary_pre_assign_expression?: (ctx: Unary_pre_assign_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.unary_pre_assign_expression`.
	 * @param ctx the parse tree
	 */
	exitUnary_pre_assign_expression?: (ctx: Unary_pre_assign_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.binary_expression`.
	 * @param ctx the parse tree
	 */
	enterBinary_expression?: (ctx: Binary_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.binary_expression`.
	 * @param ctx the parse tree
	 */
	exitBinary_expression?: (ctx: Binary_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.ternary_expression`.
	 * @param ctx the parse tree
	 */
	enterTernary_expression?: (ctx: Ternary_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.ternary_expression`.
	 * @param ctx the parse tree
	 */
	exitTernary_expression?: (ctx: Ternary_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.mintypmax_expression`.
	 * @param ctx the parse tree
	 */
	enterMintypmax_expression?: (ctx: Mintypmax_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.mintypmax_expression`.
	 * @param ctx the parse tree
	 */
	exitMintypmax_expression?: (ctx: Mintypmax_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.structured_value`.
	 * @param ctx the parse tree
	 */
	enterStructured_value?: (ctx: Structured_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.structured_value`.
	 * @param ctx the parse tree
	 */
	exitStructured_value?: (ctx: Structured_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.arrayed_structured_value`.
	 * @param ctx the parse tree
	 */
	enterArrayed_structured_value?: (ctx: Arrayed_structured_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.arrayed_structured_value`.
	 * @param ctx the parse tree
	 */
	exitArrayed_structured_value?: (ctx: Arrayed_structured_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.arrayed_structure_item`.
	 * @param ctx the parse tree
	 */
	enterArrayed_structure_item?: (ctx: Arrayed_structure_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.arrayed_structure_item`.
	 * @param ctx the parse tree
	 */
	exitArrayed_structure_item?: (ctx: Arrayed_structure_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_arrayed_structure_item`.
	 * @param ctx the parse tree
	 */
	enterComma_arrayed_structure_item?: (ctx: Comma_arrayed_structure_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_arrayed_structure_item`.
	 * @param ctx the parse tree
	 */
	exitComma_arrayed_structure_item?: (ctx: Comma_arrayed_structure_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_arrayed_structure_item_star`.
	 * @param ctx the parse tree
	 */
	enterComma_arrayed_structure_item_star?: (ctx: Comma_arrayed_structure_item_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_arrayed_structure_item_star`.
	 * @param ctx the parse tree
	 */
	exitComma_arrayed_structure_item_star?: (ctx: Comma_arrayed_structure_item_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.arrayed_structure_item_plus`.
	 * @param ctx the parse tree
	 */
	enterArrayed_structure_item_plus?: (ctx: Arrayed_structure_item_plusContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.arrayed_structure_item_plus`.
	 * @param ctx the parse tree
	 */
	exitArrayed_structure_item_plus?: (ctx: Arrayed_structure_item_plusContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.variable_type_cast`.
	 * @param ctx the parse tree
	 */
	enterVariable_type_cast?: (ctx: Variable_type_castContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.variable_type_cast`.
	 * @param ctx the parse tree
	 */
	exitVariable_type_cast?: (ctx: Variable_type_castContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.width_type_cast`.
	 * @param ctx the parse tree
	 */
	enterWidth_type_cast?: (ctx: Width_type_castContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.width_type_cast`.
	 * @param ctx the parse tree
	 */
	exitWidth_type_cast?: (ctx: Width_type_castContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.sign_type_cast`.
	 * @param ctx the parse tree
	 */
	enterSign_type_cast?: (ctx: Sign_type_castContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.sign_type_cast`.
	 * @param ctx the parse tree
	 */
	exitSign_type_cast?: (ctx: Sign_type_castContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.null_type_cast`.
	 * @param ctx the parse tree
	 */
	enterNull_type_cast?: (ctx: Null_type_castContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.null_type_cast`.
	 * @param ctx the parse tree
	 */
	exitNull_type_cast?: (ctx: Null_type_castContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.variable_type`.
	 * @param ctx the parse tree
	 */
	enterVariable_type?: (ctx: Variable_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.variable_type`.
	 * @param ctx the parse tree
	 */
	exitVariable_type?: (ctx: Variable_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.type_cast_identifier`.
	 * @param ctx the parse tree
	 */
	enterType_cast_identifier?: (ctx: Type_cast_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.type_cast_identifier`.
	 * @param ctx the parse tree
	 */
	exitType_cast_identifier?: (ctx: Type_cast_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.type_cast_expression`.
	 * @param ctx the parse tree
	 */
	enterType_cast_expression?: (ctx: Type_cast_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.type_cast_expression`.
	 * @param ctx the parse tree
	 */
	exitType_cast_expression?: (ctx: Type_cast_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.function_call`.
	 * @param ctx the parse tree
	 */
	enterFunction_call?: (ctx: Function_callContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.function_call`.
	 * @param ctx the parse tree
	 */
	exitFunction_call?: (ctx: Function_callContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.hierarchical_function_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_function_identifier?: (ctx: Hierarchical_function_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.hierarchical_function_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_function_identifier?: (ctx: Hierarchical_function_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.function_interface_assignments`.
	 * @param ctx the parse tree
	 */
	enterFunction_interface_assignments?: (ctx: Function_interface_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.function_interface_assignments`.
	 * @param ctx the parse tree
	 */
	exitFunction_interface_assignments?: (ctx: Function_interface_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.system_function_call`.
	 * @param ctx the parse tree
	 */
	enterSystem_function_call?: (ctx: System_function_callContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.system_function_call`.
	 * @param ctx the parse tree
	 */
	exitSystem_function_call?: (ctx: System_function_callContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.system_function_identifier`.
	 * @param ctx the parse tree
	 */
	enterSystem_function_identifier?: (ctx: System_function_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.system_function_identifier`.
	 * @param ctx the parse tree
	 */
	exitSystem_function_identifier?: (ctx: System_function_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.constant_function_call`.
	 * @param ctx the parse tree
	 */
	enterConstant_function_call?: (ctx: Constant_function_callContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.constant_function_call`.
	 * @param ctx the parse tree
	 */
	exitConstant_function_call?: (ctx: Constant_function_callContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.imported_function_call`.
	 * @param ctx the parse tree
	 */
	enterImported_function_call?: (ctx: Imported_function_callContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.imported_function_call`.
	 * @param ctx the parse tree
	 */
	exitImported_function_call?: (ctx: Imported_function_callContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.imported_function_hierarchical_identifier`.
	 * @param ctx the parse tree
	 */
	enterImported_function_hierarchical_identifier?: (ctx: Imported_function_hierarchical_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.imported_function_hierarchical_identifier`.
	 * @param ctx the parse tree
	 */
	exitImported_function_hierarchical_identifier?: (ctx: Imported_function_hierarchical_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.primary_hierarchical_identifier`.
	 * @param ctx the parse tree
	 */
	enterPrimary_hierarchical_identifier?: (ctx: Primary_hierarchical_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.primary_hierarchical_identifier`.
	 * @param ctx the parse tree
	 */
	exitPrimary_hierarchical_identifier?: (ctx: Primary_hierarchical_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.primary_imported_hierarchical_identifier`.
	 * @param ctx the parse tree
	 */
	enterPrimary_imported_hierarchical_identifier?: (ctx: Primary_imported_hierarchical_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.primary_imported_hierarchical_identifier`.
	 * @param ctx the parse tree
	 */
	exitPrimary_imported_hierarchical_identifier?: (ctx: Primary_imported_hierarchical_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.imported_hierarchical_identifier`.
	 * @param ctx the parse tree
	 */
	enterImported_hierarchical_identifier?: (ctx: Imported_hierarchical_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.imported_hierarchical_identifier`.
	 * @param ctx the parse tree
	 */
	exitImported_hierarchical_identifier?: (ctx: Imported_hierarchical_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.parenthesis_expression`.
	 * @param ctx the parse tree
	 */
	enterParenthesis_expression?: (ctx: Parenthesis_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.parenthesis_expression`.
	 * @param ctx the parse tree
	 */
	exitParenthesis_expression?: (ctx: Parenthesis_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.concatenation`.
	 * @param ctx the parse tree
	 */
	enterConcatenation?: (ctx: ConcatenationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.concatenation`.
	 * @param ctx the parse tree
	 */
	exitConcatenation?: (ctx: ConcatenationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.multiple_concatenation`.
	 * @param ctx the parse tree
	 */
	enterMultiple_concatenation?: (ctx: Multiple_concatenationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.multiple_concatenation`.
	 * @param ctx the parse tree
	 */
	exitMultiple_concatenation?: (ctx: Multiple_concatenationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_expression_plus`.
	 * @param ctx the parse tree
	 */
	enterComma_expression_plus?: (ctx: Comma_expression_plusContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_expression_plus`.
	 * @param ctx the parse tree
	 */
	exitComma_expression_plus?: (ctx: Comma_expression_plusContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_expression_star`.
	 * @param ctx the parse tree
	 */
	enterComma_expression_star?: (ctx: Comma_expression_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_expression_star`.
	 * @param ctx the parse tree
	 */
	exitComma_expression_star?: (ctx: Comma_expression_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.typedef_declaration`.
	 * @param ctx the parse tree
	 */
	enterTypedef_declaration?: (ctx: Typedef_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.typedef_declaration`.
	 * @param ctx the parse tree
	 */
	exitTypedef_declaration?: (ctx: Typedef_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.typedef_identifier`.
	 * @param ctx the parse tree
	 */
	enterTypedef_identifier?: (ctx: Typedef_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.typedef_identifier`.
	 * @param ctx the parse tree
	 */
	exitTypedef_identifier?: (ctx: Typedef_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.typedef_definition`.
	 * @param ctx the parse tree
	 */
	enterTypedef_definition?: (ctx: Typedef_definitionContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.typedef_definition`.
	 * @param ctx the parse tree
	 */
	exitTypedef_definition?: (ctx: Typedef_definitionContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.typedef_definition_type`.
	 * @param ctx the parse tree
	 */
	enterTypedef_definition_type?: (ctx: Typedef_definition_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.typedef_definition_type`.
	 * @param ctx the parse tree
	 */
	exitTypedef_definition_type?: (ctx: Typedef_definition_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.complex_type`.
	 * @param ctx the parse tree
	 */
	enterComplex_type?: (ctx: Complex_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.complex_type`.
	 * @param ctx the parse tree
	 */
	exitComplex_type?: (ctx: Complex_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.typedef_type`.
	 * @param ctx the parse tree
	 */
	enterTypedef_type?: (ctx: Typedef_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.typedef_type`.
	 * @param ctx the parse tree
	 */
	exitTypedef_type?: (ctx: Typedef_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.par_block`.
	 * @param ctx the parse tree
	 */
	enterPar_block?: (ctx: Par_blockContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.par_block`.
	 * @param ctx the parse tree
	 */
	exitPar_block?: (ctx: Par_blockContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.seq_block`.
	 * @param ctx the parse tree
	 */
	enterSeq_block?: (ctx: Seq_blockContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.seq_block`.
	 * @param ctx the parse tree
	 */
	exitSeq_block?: (ctx: Seq_blockContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.block_identifier`.
	 * @param ctx the parse tree
	 */
	enterBlock_identifier?: (ctx: Block_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.block_identifier`.
	 * @param ctx the parse tree
	 */
	exitBlock_identifier?: (ctx: Block_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.colon_block_identifier`.
	 * @param ctx the parse tree
	 */
	enterColon_block_identifier?: (ctx: Colon_block_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.colon_block_identifier`.
	 * @param ctx the parse tree
	 */
	exitColon_block_identifier?: (ctx: Colon_block_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.block_item_declaration_star`.
	 * @param ctx the parse tree
	 */
	enterBlock_item_declaration_star?: (ctx: Block_item_declaration_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.block_item_declaration_star`.
	 * @param ctx the parse tree
	 */
	exitBlock_item_declaration_star?: (ctx: Block_item_declaration_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.block_item_declaration_semicolon`.
	 * @param ctx the parse tree
	 */
	enterBlock_item_declaration_semicolon?: (ctx: Block_item_declaration_semicolonContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.block_item_declaration_semicolon`.
	 * @param ctx the parse tree
	 */
	exitBlock_item_declaration_semicolon?: (ctx: Block_item_declaration_semicolonContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.block_item_declaration`.
	 * @param ctx the parse tree
	 */
	enterBlock_item_declaration?: (ctx: Block_item_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.block_item_declaration`.
	 * @param ctx the parse tree
	 */
	exitBlock_item_declaration?: (ctx: Block_item_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.join_keyword`.
	 * @param ctx the parse tree
	 */
	enterJoin_keyword?: (ctx: Join_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.join_keyword`.
	 * @param ctx the parse tree
	 */
	exitJoin_keyword?: (ctx: Join_keywordContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.continuous_assign`.
	 * @param ctx the parse tree
	 */
	enterContinuous_assign?: (ctx: Continuous_assignContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.continuous_assign`.
	 * @param ctx the parse tree
	 */
	exitContinuous_assign?: (ctx: Continuous_assignContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.list_of_variable_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_variable_assignments?: (ctx: List_of_variable_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.list_of_variable_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_variable_assignments?: (ctx: List_of_variable_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_variable_assignment_star`.
	 * @param ctx the parse tree
	 */
	enterComma_variable_assignment_star?: (ctx: Comma_variable_assignment_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_variable_assignment_star`.
	 * @param ctx the parse tree
	 */
	exitComma_variable_assignment_star?: (ctx: Comma_variable_assignment_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.comma_variable_assignment`.
	 * @param ctx the parse tree
	 */
	enterComma_variable_assignment?: (ctx: Comma_variable_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.comma_variable_assignment`.
	 * @param ctx the parse tree
	 */
	exitComma_variable_assignment?: (ctx: Comma_variable_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.variable_assignment`.
	 * @param ctx the parse tree
	 */
	enterVariable_assignment?: (ctx: Variable_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.variable_assignment`.
	 * @param ctx the parse tree
	 */
	exitVariable_assignment?: (ctx: Variable_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.initial_construct`.
	 * @param ctx the parse tree
	 */
	enterInitial_construct?: (ctx: Initial_constructContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.initial_construct`.
	 * @param ctx the parse tree
	 */
	exitInitial_construct?: (ctx: Initial_constructContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.final_construct`.
	 * @param ctx the parse tree
	 */
	enterFinal_construct?: (ctx: Final_constructContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.final_construct`.
	 * @param ctx the parse tree
	 */
	exitFinal_construct?: (ctx: Final_constructContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.always_keyword`.
	 * @param ctx the parse tree
	 */
	enterAlways_keyword?: (ctx: Always_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.always_keyword`.
	 * @param ctx the parse tree
	 */
	exitAlways_keyword?: (ctx: Always_keywordContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.always_construct`.
	 * @param ctx the parse tree
	 */
	enterAlways_construct?: (ctx: Always_constructContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.always_construct`.
	 * @param ctx the parse tree
	 */
	exitAlways_construct?: (ctx: Always_constructContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attribute_instance_star`.
	 * @param ctx the parse tree
	 */
	enterAttribute_instance_star?: (ctx: Attribute_instance_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attribute_instance_star`.
	 * @param ctx the parse tree
	 */
	exitAttribute_instance_star?: (ctx: Attribute_instance_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attribute_instance`.
	 * @param ctx the parse tree
	 */
	enterAttribute_instance?: (ctx: Attribute_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attribute_instance`.
	 * @param ctx the parse tree
	 */
	exitAttribute_instance?: (ctx: Attribute_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_spec_star`.
	 * @param ctx the parse tree
	 */
	enterAttr_spec_star?: (ctx: Attr_spec_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_spec_star`.
	 * @param ctx the parse tree
	 */
	exitAttr_spec_star?: (ctx: Attr_spec_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_spec`.
	 * @param ctx the parse tree
	 */
	enterAttr_spec?: (ctx: Attr_specContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_spec`.
	 * @param ctx the parse tree
	 */
	exitAttr_spec?: (ctx: Attr_specContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.attr_name`.
	 * @param ctx the parse tree
	 */
	enterAttr_name?: (ctx: Attr_nameContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.attr_name`.
	 * @param ctx the parse tree
	 */
	exitAttr_name?: (ctx: Attr_nameContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.hierarchical_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_identifier?: (ctx: Hierarchical_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.hierarchical_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_identifier?: (ctx: Hierarchical_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.dot_hierarchical_identifier_branch_item_star`.
	 * @param ctx the parse tree
	 */
	enterDot_hierarchical_identifier_branch_item_star?: (ctx: Dot_hierarchical_identifier_branch_item_starContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.dot_hierarchical_identifier_branch_item_star`.
	 * @param ctx the parse tree
	 */
	exitDot_hierarchical_identifier_branch_item_star?: (ctx: Dot_hierarchical_identifier_branch_item_starContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.dot_hierarchical_identifier_branch_item`.
	 * @param ctx the parse tree
	 */
	enterDot_hierarchical_identifier_branch_item?: (ctx: Dot_hierarchical_identifier_branch_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.dot_hierarchical_identifier_branch_item`.
	 * @param ctx the parse tree
	 */
	exitDot_hierarchical_identifier_branch_item?: (ctx: Dot_hierarchical_identifier_branch_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.hierarchical_identifier_branch_item`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_identifier_branch_item?: (ctx: Hierarchical_identifier_branch_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.hierarchical_identifier_branch_item`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_identifier_branch_item?: (ctx: Hierarchical_identifier_branch_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.timescale_compiler_directive`.
	 * @param ctx the parse tree
	 */
	enterTimescale_compiler_directive?: (ctx: Timescale_compiler_directiveContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.timescale_compiler_directive`.
	 * @param ctx the parse tree
	 */
	exitTimescale_compiler_directive?: (ctx: Timescale_compiler_directiveContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.timeunit_directive`.
	 * @param ctx the parse tree
	 */
	enterTimeunit_directive?: (ctx: Timeunit_directiveContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.timeunit_directive`.
	 * @param ctx the parse tree
	 */
	exitTimeunit_directive?: (ctx: Timeunit_directiveContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.timeprecision_directive`.
	 * @param ctx the parse tree
	 */
	enterTimeprecision_directive?: (ctx: Timeprecision_directiveContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.timeprecision_directive`.
	 * @param ctx the parse tree
	 */
	exitTimeprecision_directive?: (ctx: Timeprecision_directiveContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.default_nettype_statement`.
	 * @param ctx the parse tree
	 */
	enterDefault_nettype_statement?: (ctx: Default_nettype_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.default_nettype_statement`.
	 * @param ctx the parse tree
	 */
	exitDefault_nettype_statement?: (ctx: Default_nettype_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.number`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.number`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.integral_number`.
	 * @param ctx the parse tree
	 */
	enterIntegral_number?: (ctx: Integral_numberContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.integral_number`.
	 * @param ctx the parse tree
	 */
	exitIntegral_number?: (ctx: Integral_numberContext) => void;

	/**
	 * Enter a parse tree produced by `SysVerilogHDLParser.real_number`.
	 * @param ctx the parse tree
	 */
	enterReal_number?: (ctx: Real_numberContext) => void;
	/**
	 * Exit a parse tree produced by `SysVerilogHDLParser.real_number`.
	 * @param ctx the parse tree
	 */
	exitReal_number?: (ctx: Real_numberContext) => void;

    getCompletionItems(prefix) {
      const items = [];
  
      // generate completion items for module names
      for (const name of this.moduleNames) {
        if (name.startsWith(prefix)) {
          items.push({
            label: name,
            kind: monaco.languages.CompletionItemKind.Module
          });
        }
      }
  
      // generate completion items for parameter names
      for (const name of this.parameterNames) {
        if (name.startsWith(prefix)) {
          items.push({
            label: name,
            kind: monaco.languages.CompletionItemKind.Variable
          });
        }
      }
  
      return items;
    }
  }
  