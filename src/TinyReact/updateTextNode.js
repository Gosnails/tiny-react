
/**
 * 这段代码定义了一个名为 updateTextNode 的函数，它用于更新一个文本节点的内容。
 * 这个函数接受三个参数：virtualDOM，oldVirtualDOM 和 oldDOM。
 * @param {*} virtualDOM 这是一个新的虚拟 DOM 对象，它描述了一个文本节点的当前状态。
 * @param {*} oldVirtualDOM 这是一个旧的虚拟 DOM 对象，它描述了文本节点的前一个状态。
 * @param {*} oldDOM 这是一个真实的 DOM 节点，它是文本节点的真实表示。
 */
export default function updateTextNode(virtualDOM, oldVirtualDOM, oldDOM) {
    // 它比较 virtualDOM.props.textContent 和 oldVirtualDOM.props.textContent。
    if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
        // 如果它们不相等，那么就将 oldDOM.textContent 更新为 virtualDOM.props.textContent
        oldDOM.textContent = virtualDOM.props.textContent;
        // 并将 oldDOM._virtualDOM 更新为 virtualDOM。
        oldDOM._virtualDOM = virtualDOM;
    }

}