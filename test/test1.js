// var pat = new RegExp("[^a-zA-Z0-9\_\u4e00-\u9fa5]", "i")
// var strTest = '11a试试'
// if (pat.test(strTest)) {
//   console.log("项目名称中含有非法字符")
// } else {
//   console.log('error')
// }

var reg = /^[a-zA-Z0-9\_\u4e00-\u9fa5]*$/g

console.log(reg.test('123edd是是是_'))
