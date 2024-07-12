function normalizeName(name: string): string {
  if (name.endsWith('.sv')) {
    name = name.substring(0, name.lastIndexOf('.'));
  }
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9_]+/g, '_');
}

export function newSvFileTemplate(name: string, type: 'module' | 'package' | 'entity' ): string {
  name = normalizeName(name);
  if (type === 'module') {
    return `module ${name}();\n\nendmodule : ${name}`;
  }
  if (type === 'package') {
    return `package ${name};\n\nendpackage`;
  }
  if (type === 'entity') {
    return `entity ${name} is\n\nend entity ${name};`;
  }
}
