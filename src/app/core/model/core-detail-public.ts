import {CorePublic} from './core-public';

export interface CoreDetailPublic extends CorePublic {

  description: string;
  upgrade_price: number;
  have_pdf_documentation: boolean;
  created: string;
  last_modified: string;
  top_module_name: string;
  top_module_interface: string[];
  top_module_parameters: string;
}
