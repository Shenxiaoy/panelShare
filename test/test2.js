function Person () {
  this.name = 'sxy'

}

Person.prototype.name = 'ddd'
Person.prototype.age = 'nnnn'

var a = new Person()
console.log(a.age)