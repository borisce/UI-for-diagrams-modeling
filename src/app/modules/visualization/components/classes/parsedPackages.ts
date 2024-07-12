import { PackageItem } from 'src/app/api/systemverilogparser/models';

export class ParsedPackages {
    public items?: ParsedPackage[];
}

export class ParsedPackage {
    public package?: {
    name: string,
    dataTypes: Array<PackageItem>,
}; }
