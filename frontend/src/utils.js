export const renderIf = (condition, render) => (condition() ? render() : null);

export const buildOptions = (options) => {
  if (options.sort) {
    return `?_sort=${options.key}&_order=${options.order}`
  }
}
