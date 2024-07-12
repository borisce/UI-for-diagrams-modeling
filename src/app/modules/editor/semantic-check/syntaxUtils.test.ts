import { ObjectType, Reference } from "./interfaces/reference";
import {
  endingWordColumn,
  getBitSize,
  getReferenceBitSize,
  isAssignmentStatement,
  isIfStatement,
  isReferenceInString,
  isStatementComment,
  returnAssignmentStatementVariables,
  returnIfStatementVariables,
  sliceStringBeforeWord,
  startingWordColumn
} from "./syntaxUtils";
import { expect, it, describe  } from '@jest/globals';


describe('syntaxUtils', () => {
  describe('sliceStringBeforeWord', () => {
    it('should return the slice of the string before the word if the string includes the word', () => {
      const string = 'Hello, world!';
      const word = 'world';
      const result = sliceStringBeforeWord(string, word);
      expect(result).toBe('Hello, ');
    });

    it('should return the original string if the string does not include the word', () => {
      const string = 'Hello, world!';
      const word = 'test';
      const result = sliceStringBeforeWord(string, word);
      expect(result).toBe(string);
    });
  });


  describe('startingWordColumn', () => {
    it('should return the starting column of the word in the SystemVerilog code', () => {
      const string = 'reg [3:0] my_register;';
      const word = 'my_register';
      const result = startingWordColumn(string, word);
      expect(result).toBe(11);
    });

    it('should return the starting column of the word in the SystemVerilog code, case insensitive', () => {
      const string = 'module test;\n  reg [3:0] my_register;\nendmodule';
      const word = 'MY_REGISTER';
      const result = startingWordColumn(string, word, false);
      expect(result).toBe(26);
    });

    it('should return 1 if the word is not in the SystemVerilog code', () => {
      const string = 'module test;\n  reg [3:0] my_register;\nendmodule';
      const word = 'test_register';
      const result = startingWordColumn(string, word);
      expect(result).toBe(1);
    });
  });


  describe('endingWordColumn', () => {
    it('should return the column number of the end of the word in the string', () => {
      const string = 'Hello, world!';
      const word = 'world';
      const result = endingWordColumn(string, word);
      expect(result).toBe(13);
    });

    it('should return the length of the string plus one if the word is not in the string', () => {
      const string = 'Hello, world!';
      const word = 'test';
      const result = endingWordColumn(string, word);
      expect(result).toBe(string.length + 1);
    });

    it('should be case insensitive if caseSensitive is false', () => {
      const string = 'Hello, world!';
      const word = 'WORLD';
      const result = endingWordColumn(string, word, false);
      expect(result).toBe(13);
    });
  });


  describe('isReferenceInString', () => {
    it('should return true if the SystemVerilog code includes the reference, case insensitive', () => {
      const string = 'module test;\n  reg [3:0] my_register;\nendmodule';
      const reference = 'MY_REGISTER';
      const result = isReferenceInString(string, reference);
      expect(result).toBe(true);
    });
  
    it('should return false if the SystemVerilog code does not include the reference', () => {
      const string = 'module test;\n  reg [3:0] my_register;\nendmodule';
      const reference = 'test_register';
      const result = isReferenceInString(string, reference);
      expect(result).toBe(false);
    });
  });

  
  describe('isIfStatement', () => {
    it('should return true if the string is an if statement', () => {
      const string = 'if (a == b) then\n  a = b;\nend if;';
      const result = isIfStatement(string);
      expect(result).toBe(true);
    });

    it('should return false if the string is not an if statement', () => {
      const string = 'a = b;';
      const result = isIfStatement(string);
      expect(result).toBe(false);
    });
  });


  describe('returnIfStatementVariables', () => {
    it('should return the left and right variables of an if statement', () => {
      const ifStatement = 'a = b';
      const result = returnIfStatementVariables(ifStatement);
      expect(result).toEqual(['a', 'b']);
    });

    it('should return the left and right variables of an if statement', () => {
      const ifStatement = 'a := b';
      const result = returnIfStatementVariables(ifStatement, ':=');
      expect(result).toEqual(['a', 'b']);
    });
  });


  describe('isAssignmentStatement', () => {
    it('should return true if the string is a non-blocking assignment statement', () => {
      const string = 'a <= b;';
      const result = isAssignmentStatement(string);
      expect(result).toBe(true);
    });

    it('should return false if the string is a blocking assignment statement', () => {
      const string = 'a = b;';
      const result = isAssignmentStatement(string);
      expect(result).toBe(false);
    });
  });



  describe('getReferenceBitSize', () => {
    it ('should return the bit size of the reference', () => {
      const reference = new Reference(
        'my_register',
        'process',
        20,
        false,
        ObjectType.CONSTANT
      );

      reference.dataType = '(2 downto 0)';
      const result = getReferenceBitSize(reference);
      expect(result).toBe(8);
    });

    it ('should return the bit size of the reference', () => {
      const reference = new Reference(
        'my_register',
        'process',
        20,
        false,
        ObjectType.CONSTANT
      );

      reference.dataType = '(2 to 0)';
      const result = getReferenceBitSize(reference);
      expect(result).toBe(8);
    });

    it ('should return null because there is not correct dataType', () => {
      const reference = new Reference(
        'my_register',
        'process',
        20,
        false,
        ObjectType.CONSTANT
      );

      reference.dataType = '2:0';
      const result = getReferenceBitSize(reference);
      expect(result).toBe(null);
    });
  });


  describe('returnAssignmentStatementVariables', () => {
    it('should return the left and right variables of an assignment statement', () => {
      const assignmentStatement = 'a <= b';
      const result = returnAssignmentStatementVariables(assignmentStatement);
      expect(result).toEqual(['a', 'b']);
    });

    it('should return the left and right variables of an assignment statement', () => {
      const assignmentStatement = 'a := b';
      const result = returnAssignmentStatementVariables(assignmentStatement, ':=');
      expect(result).toEqual(['a', 'b']);
    });
  });


  describe('isStatementComment', () => {
    it('should return true if the string is a comment', () => {
      const string = '-- This is a comment';
      const result = isStatementComment(string);
      expect(result).toBe(true);
    });

    it('should return false if the string is not a comment', () => {
      const string = 'a = b;';
      const result = isStatementComment(string);
      expect(result).toBe(false);
    });
  });


  describe('getBitSize', () => {
    it('should return the bit size of the reference', () => {
      const bitsize = '[3:0]';
      const result  = getBitSize(bitsize);
      expect(result).toBe(16);
    });

    it('should return the bit size of the reference', () => {
      const bitsize = '[1:0]';
      const result  = getBitSize(bitsize);
      expect(result).toBe(4);
    });
  });
});