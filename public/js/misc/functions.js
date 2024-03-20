function isEmpty(obj) {
  for (const property in obj) {
    if (Object.hasOwn(obj, property)) {
      return false;
    }
  }
  return true;
}

function sum(input) {
  if (typeof input === "object") {
    return Object.values(input).reduce((sum, num) => sum + num, 0);
  } else {
    throw new Error("function sum only defined for objects");
  }
}

export default {
  isEmpty,
  sum,
};
