export class DependencieProposal {
  public label?: string;
  public kind?: monaco.languages.CompletionItemKind;
  public insertText?: string;
  public insertTextRules: monaco.languages.CompletionItemInsertTextRule;
  public documentation?:{};
  public detail?: string;
  public prob?: number;

  constructor(label: string,
              kind: monaco.languages.CompletionItemKind,
              insertText: string,
              rule: monaco.languages.CompletionItemInsertTextRule,
              documentation: {},
              detail: string,
              prob?: number
  ) {
    this.label = label;
    this.kind = kind as monaco.languages.CompletionItemKind;
    this.insertText = insertText;
    this.insertTextRules = rule;
    this.documentation = documentation;
    this.detail = detail;
    this.prob = prob ?? 0;
  }

}
