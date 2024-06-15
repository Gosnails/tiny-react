import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement"

/*
virtualDOM：这是一个虚拟 DOM 对象，它描述了一个 DOM 元素或组件的状态。
*/
export default function createDOMElement(virtualDOM) {
    let newElement = null;

    // 它检查 virtualDOM.type。如果 type 是 "text"，那么就使用 document.createTextNode 方法创建一个新的文本节点，其内容是 virtualDOM.props.textContent。
    if (virtualDOM.type === "text") {
        newElement = document.createTextNode(virtualDOM.props.textContent)
    } else {
        // 否则，使用 document.createElement 方法创建一个新的元素节点，其类型是 virtualDOM.type。
        newElement = document.createElement(virtualDOM.type);
        // 然后，使用 updateNodeElement 函数更新新元素的属性。
        updateNodeElement(newElement, virtualDOM)
    }

    // 它将 virtualDOM 保存到新元素的 _virtualDOM 属性中。这样，新元素就可以保留对虚拟 DOM 的引用，以便于后续的更新和比较。
    newElement._virtualDOM = virtualDOM;

    // 它使用 forEach 方法遍历 virtualDOM.children，对每个子节点调用 mountElement 函数，将子节点挂载到新元素上。
    virtualDOM.children.forEach(child => {
        mountElement(child, newElement)
    });

    // 如果 virtualDOM.props 存在并且 virtualDOM.props.ref 是一个函数，那么就调用 virtualDOM.props.ref(newElement)。这是一种常见的在 React 中实现引用（ref）的方法，可以让组件访问到真实的 DOM 元素。
    if (virtualDOM.props && virtualDOM.props.ref) {
        virtualDOM.props.ref(newElement)
    }

    // 最后，函数返回新创建的元素。
    return newElement;
}