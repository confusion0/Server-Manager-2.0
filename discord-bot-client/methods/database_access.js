module.exports = {
  get: async (database, key, objectpath) => {
    const base = await database.get(key)

    if(!objectpath || !base) return base

    const oPaths = objectpath.split('.')

    var finalValue = base

    do {
      finalValue = finalValue[oPaths[0]] 
      oPaths.shift()
    } while(oPaths.length > 0 || finalValue === undefined)

    return finalValue
  },
  set: async (database, key, newValue, objectpath) => {
    if(!objectpath) return await database.set(key, newValue)

    const oPaths = objectpath.split('.')

    const oldValue = await database.get(key) || {}

    return await database.set(key, setNestedObject(oldValue, oPaths, newValue))
  },
  delete: async (database, key) => {
    return await database.delete(key)
  }
}

const setNestedObject = (nestedObj, pathArr, newValue) => {
  if(!nestedObj) nestedObj = {}
  if(pathArr.length > 0) nestedObj[pathArr.slice(0, 1)] = setNestedObject(nestedObj[pathArr.slice(0, 1)], pathArr.slice(1), newValue)
  if(pathArr.length <= 0) return newValue
  return nestedObj
}