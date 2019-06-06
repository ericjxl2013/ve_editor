function test(para) {
  para.para1 = 100;
  para.para2.para1 = 1000;
}

function test2(para) {
  para.para2 = {ha: 'haha'};
}

var obj1 = { para1: 1, para2: "2", para3: true };

var obj2 = { para1: 10, para2: obj1 };

test(obj2);

console.log(obj2);

var obj3 = obj2.para2;
console.log(obj3)
test2(obj2);
console.log(obj2)
console.log(obj3)
obj1.para2 = 'aaaaaaaaaa';
console.log(obj1)
console.log(obj3)

var ttt = {}

test2(ttt)
console.log(ttt)

