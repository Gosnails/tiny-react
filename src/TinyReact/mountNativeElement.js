import createDOMElement from "./createDOMElement"
import unmountNode from "./unmountNode";

/*
virtualDOM：这是一个虚拟 DOM 对象，它描述了一个 DOM 元素或组件的状态。
container：这是一个真实的 DOM 元素，它将作为新元素的父容器。
oldDOM：这是一个真实的 DOM 元素，如果它存在，那么新元素将会插入到它之前，否则新元素将会被添加到容器的末尾。
*/

export default function mountNativeElement(virtualDOM, container, oldDOM) {

    //首先，它使用 createDOMElement 函数将 virtualDOM 转换为一个真实的 DOM 元素 newElement。
    let newElement = createDOMElement(virtualDOM)

    // 如果 oldDOM 存在，那么就使用 insertBefore 方法将 newElement 插入到 oldDOM 之前。否则，使用 appendChild 方法将 newElement 添加到 container 的末尾。
    if (oldDOM) {
        container.insertBefore(newElement, oldDOM)
    } else {
        container.appendChild(newElement)
    }

    // 如果 oldDOM 存在，那么就使用 unmountNode 函数将 oldDOM 从 DOM 树中移除。
    if (oldDOM) {
        unmountNode(oldDOM);
    }

    // 如果 virtualDOM 是一个组件（即 virtualDOM.component 存在），那么就调用组件的 setDOM 方法，将 newElement 设置为组件的 DOM 表示。
    let component = virtualDOM.component;
    if(component) {
        component.setDOM(newElement);
    }
}

