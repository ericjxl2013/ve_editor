import {VeryTable} from '../verytable/veryTable';
//  import {expect} from 'chai';
 import 'mocha';

 var assert = require('assert')

 describe('VeryTable', () => {
  const table = new VeryTable([['a', 'b', 'c'], ['1', '2', '3']], 'TestTable');
  it('#getData should return "b"', () => {
    assert.equal('b', table.getData(0, 1));
  });
  it('#pos(1,1) should return "表名：TestTable，位置：（2，B）"', () => {
    assert.equal('表名：TestTable，位置：（2，B）', table.pos(1, 1));
  });
  it('#pos(1,26) should return "表名：TestTable，位置：（2，AA）"', () => {
    assert.equal('表名：TestTable，位置：（2，AA）', table.pos(1, 26));
  });
});

// describe('VeryTable', () => {
//   it('pos should return 表名：TestTable，位置：（2，B）', () => {
//     const table = new VeryTable([['a', 'b', 'c'], ['1', '2', '3']], 'TestTable');
//     // expect(table.getData(0, 1)).to.equal('b');
//     assert.equal('表名：TestTable，位置：（2，B）', table.pos(1, 1));
//     assert.equal('表名：TestTable，位置：（2，AA）', table.pos(1, 26));
//   });
// });