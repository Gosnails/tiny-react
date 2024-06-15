import isFunction from "./isFunction"
import mountNativeElement from "./mountNativeElement"
import mountComponent from "./mountComponent"


/**
 * 
 * @param {*} virtualDOM 这是一个虚拟 DOM 对象，它描述了一个 DOM 元素或组件的状态。
 * @param {*} container 这是一个真实的 DOM 元素，它将作为新元素的父容器。
 * @param {*} oldDOM 这是一个真实的 DOM 元素，如果它存在，那么新元素将会插入到它之前，否则新元素将会被添加到容器的末尾。
 */
export default function mountElement(virtualDOM, container, oldDOM) {

    // 它检查 virtualDOM 的type是否是一个函数。如果是，那么就调用 mountComponent 函数，将 virtualDOM 作为一个组件挂载到 container 中。
    if (isFunction(virtualDOM)) {
        mountComponent(virtualDOM, container, oldDOM)
    } else {
        // 否则，就调用 mountNativeElement 函数，将 virtualDOM 作为一个普通的 DOM 元素挂载到 container 中。
        mountNativeElement(virtualDOM, container, oldDOM)
    }
}