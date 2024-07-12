import { vhdlKeywords } from '../proposals/vhdlKeywords';

export function getVhdl(): any {
  return {
    keywords: vhdlKeywords(),
    variables: ['include', 'ROM_ADDR_WIDTH', 'wire', 'input', 'output', 'logic', 'std_logic', 'std_logic_vector', 'unsigned', 'ALL'],
    ne:['--'],//[^\r\n]*'],
    specialChars: ['(', '#', ')', '@', '[', ']'],
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    operators: [
      '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',':', ':=',
      '&&', '||', '++', '+', '-', '*', '/', '&', '|', '^', '%',
      '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
      '%=', '<<=', '>>=', '>>>=', '=',
    ],
    tokenizer: {
      root: [
        [/\-\-.*/, 'comment'],
        [/\/\*[\s\S\n\r\v]*?\*\//gm, 'comment'],
        [/([`])\w*/, 'variables'],
        [/[0-9]/, 'numbers'],
        [/boot_rom/, 'class'],
        [/[()\[\]]/, 'specialChars'],

        { include: '@whitespace' },
        [/"[A-Za-z()_@% $:.0-9#\-\.\,]+"/, 'string'],
        [/[a-z_$@#()\[\]=+^<>|&%][\w$]*/, {
          cases: {
            '@variables': 'variables',
            '@keywords': 'keywords',
            '@specialChars': 'specialChars',
            '@operators': 'operators'
          }
        }],
        [/\s(\w+?)\s(?=#)/, 'class'],
        [/(?<=module)\s(\w+)/, 'class'],

      ],
      comment: [
        [/[^\-*]+/, 'comment'],
        [/\/\*/, 'comment', '@push'],
        [/\\*\//, 'comment', '@pop'],
        [/[\/*]/, 'comment']
      ],
      whitespace: [
        [/\/\*/, 'comment', '@comment'],
        [/\/\/.*$/, 'comment'],
      ],

      numbers: [
        [/[0-9]/, 'numbers'],
      ],

      string: [
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
      ],
    },
  };
}
