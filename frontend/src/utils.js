export const renderIf = (condition, render) => (condition() ? render() : null);
