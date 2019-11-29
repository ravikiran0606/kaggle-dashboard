export const renderIf = (condition, render) => (condition() ? render() : null);

export const renderIfElse = (condition, renderIf, renderElse) => (condition() ? renderIf() : renderElse())

export const buildOptions = (options) => {
  if (options.sort) {
    return `?_sort=${options.key}&_order=${options.order}`
  }
}
