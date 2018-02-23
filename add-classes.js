import selector from 'hast-util-select';

const { selectAll } = selector;

export default additions => {
    const adders = Object.entries(additions)
        .map(([selector, className]) => addClass(className, selector));
    return node => adders.forEach(a => a(node));
};

const addClass = (className, selector) => {
    const add = addClassTo(className) ;
    return node => selectAll(selector, node).forEach(add);
};

const addClassTo = className => ({ properties }) => {
    if(!properties.class) properties.class = className;
    else properties.class += ` ${className}`;
};
