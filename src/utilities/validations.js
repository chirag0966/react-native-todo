const isEmpty = (value) => {
  if (!value) {
    return true;
  }

  switch (typeof value) {
    case 'string':
      return value.trim().length === 0;
    case 'object':
      return isEmptyObject(value);
    default:
      return false;
  }
};

const isEmptyObject = (object) => {
  if (object instanceof Array) {
    return object.length === 0;
  }
  return Object.keys(object).length === 0;
};

export {isEmpty};
