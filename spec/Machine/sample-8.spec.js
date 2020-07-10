// Copyright (c) 2016-2020 Electric Imp
// This file is licensed under the MIT License
// http://opensource.org/licenses/MIT

'use strict';

require('jasmine-expect');

const fs = require('fs');
const path = require('path');
const eol = require('eol');

const contextPath = path.resolve(__dirname, './../..').replace(/\\/g, '/');

const FILE = __dirname + '/../fixtures/sample-8/input.nut';
const init = require('./init')(FILE);

describe('Machine', () => {
  let machine, src;

  beforeEach(() => {
    machine = init.createMachine();
    machine.file = path.basename(FILE);
    src = eol.lf(fs.readFileSync(FILE, 'utf-8'));
  });

  it('should run sample #8', () => {
    machine.generateLineControlStatements = false;
    const result = eol.lf(machine.execute(src));
    expect(result).toEqual(init.getResult());
  });

  it('should run sample #8 with line control', () => {
    const pathToFile = path.join(contextPath, 'input.nut').replace(/\\/g, '/');
    machine.generateLineControlStatements = true;
    const result = eol.lf(machine.execute(src)).split(pathToFile).join('input.nut');
    expect(result).toEqual(init.getResultWithLineControl());
  });

});
