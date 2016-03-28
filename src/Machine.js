/**
 * Builder VM
 * @author Mikhail Yurasov <me@yurasov.me>
 */

'use strict';

const SourceParser = require('./SourceParser');
const LocalFileReader = require('./LocalFileReader');

class Machine {

  constructor() {
    this._instructions = []; // tokens
    this._pointer = 0; // execution poiner
  }

  excecute() {
    let instruction;

    while (this._pointer < this._instructions.length) {
      instruction = this._instructions[this._pointer++];

      switch (instruction.token) {

        case SourceParser.tokens.INCLUDE:
          this._executeInclude(instruction);
          break;

        default:
          throw new Error('Unknown token "' + instruction.token + '"');
      }
    }
  }

  _executeInclude(instruction) {

    if (/^https?:/i.test(instruction.path)) {
      // URL
      throw new Error('Remote sources are not supported at the moment');
    } else if (/\.git\b/i.test(instruction.path)) {
      // GIT
      throw new Error('GIT sources are not supported at the moment');
    } else {
      // local file
      this.localFileReader.read(instruction.path);
    }

  }

  // <editor-fold desc="Accessors" defaultstate="collapsed">

  get instructions() {
    return this._instructions;
  }

  set instructions(value) {
    this._instructions = value;
  }

  get localFileReader() {
    return this._localFileReader;
  }

  set localFileReader(value) {
    this._localFileReader = value;
  }

  // </editor-fold>
}

module.exports = Machine;