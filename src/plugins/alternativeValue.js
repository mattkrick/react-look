const camelToDashCase = (str) => str.replace(/([a-z]|^)([A-Z])/g, (match, p1, p2) => p1 + '-' + p2.toLowerCase())

const alternativeValue = (styles, scopeArgs, config) => {
  Object.keys(styles).forEach(property => {
    const value = styles[property]
    if (value instanceof Array) {
      styles[property] = value.join(';' + camelToDashCase(property) + ':')
    } else if (value instanceof Object) {
      styles[property] = alternativeValue(value, config, scopeArgs)
    }
  })
  return styles
}

export { alternativeValue as default }
