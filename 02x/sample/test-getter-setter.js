const test = {
  info: {
    name: 'node debugger2'
  },
  get name() {
    return this.info.name
  },
  set name(val) {
    this.info.name = val
  }
}

console.log(test.name);
test.name = 'second test debugger'
console.log(test.name);

