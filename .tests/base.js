
const fnExist = (fn_name, object) => {
  if (fn_name.map) {
    for (let fn of fn_name) {
      fnExist(fn, object);
    }
  } else {
    it(`fn-exists: ${fn_name}`, () => {
      expect(object[fn_name]).toBeTruthy();
    });
  }
}

module.exports = {
  fnExist
};