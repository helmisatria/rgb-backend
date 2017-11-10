function inifunction() {
  const object = {
    nama: 'Foo',
    panggilan: 'Bar'
  }
  return object
}

function functionkedua(a,b) {
  return a+b
}

module.exports.inifunction = inifunction

module.exports.add = functionkedua