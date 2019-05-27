function SuperType() {
  this.colors = ["red", "blue", "green"];
}
function SubType() {
  // 继承SuperType
  SuperType.call(this);
}

var A = new SubType();

var instance1 = Object.create(SubType);
var instance2 = Object.create(SubType);

instance1.colors.push("black");

console.log(instance1.colors); // ["red", "blue", "green", "black"]
console.log(instance2.colors); // ["red", "blue", "green"]
