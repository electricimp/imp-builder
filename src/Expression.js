/**
 * Expression evaluator
 * @author Mikhail Yurasov <me@yurasov.me>
 */

/**
 * Supported binary operators:
 *
 *  - + * / %
 *
 *
 */

'use strict';

const jsep = require('jsep');

class Expression {

  constructor() {
    // configure JSEP

    this._jsep = jsep;

    // remove binary ops
    this._jsep.removeBinaryOp('>>>');
    this._jsep.removeBinaryOp('!==');
    this._jsep.removeBinaryOp('===');
  }

  evaluate(expression) {
    return this._evaluate(jsep(expression));
  }

  /**
   * @param {{}} node
   * @private
   */
  _evaluate(node) {

    let res;

    // walk through the AST

    switch (node.type) {

      case 'BinaryExpression':

        const left = parseFloat(this._evaluate(node.left));
        const right = parseFloat(this._evaluate(node.right));

        switch (node.operator) {

          case '-':
            res = left - right;
            break;

          case '+':
            res = left + right;
            break;

          case '*':
            res = left * right;
            break;

          case '/':

            if (0 === right) {
              throw new Error('Division by zero');
            }

            res = left / right;
            break;

          case '%':

            if (0 === right) {
              throw new Error('Division by zero');
            }

            res = left % right;
            break;
        }

        break;

      case 'Literal':

        res = node.value;
        break;

      case 'Identifier':

        // check if we have a variable
        if (!this.variables.hasOwnProperty(node.name)) {
          throw new Error(`Variable "${node.value}" is not defined`);
        }

        res = this.variables[node.name];
        break;

      default:
        throw new Error('Unknown node type: "' + node.type + '"');
    }

    return res;

  }

  // <editor-fold desc="Accessors" defaultstate="collapsed">

  get variables() {
    return this._variables || {};
  }

  set variables(value) {
    this._variables = value;
  }

  // </editor-fold>
}

module.exports = Expression;
