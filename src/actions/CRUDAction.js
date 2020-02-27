export function create(types, key, path, data) {
  return {
    types,
    data,
    success,
    failure,
  };
}
export function _delete(types, key, where) {
  type = types.DELETE;
  return {
    type,
    key,
    where,
  };
}
export function update(types, key, path, data) {
  type = types.UPDATE;
  return {
    type,
    key,
    path,
    data,
  };
}
