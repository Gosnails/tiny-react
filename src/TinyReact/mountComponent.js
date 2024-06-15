import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

/**
 * 这段代码定义了一个名为 mountComponent 的函数，它用于将一个虚拟 DOM 对象 virtualDOM 挂载到一个真实的 DOM 容器 container 中。这个函数接受三个参数：virtualDOM，container 和 oldDOM。
 * @param {*} virtualDOM 这是一个虚拟 DOM 对象，它描述了一个 DOM 元素或组件的状态。
 * @param {*} container 这是一个真实的 DOM 元素，它将作为新元素的父容器。
 * @param {*} oldDOM 这是一个真实的 DOM 元素，如果它存在，那么新元素将会插入到它之前，否则新元素将会被添加到容器的末尾。
 */
export default function mountComponent(virtualDOM, container, oldDOM) {
    let nextVirtualDOM = null;
    let component = null;
    // 它检查 virtualDOM 是否是一个函数组件。
    if (isFunctionComponent(virtualDOM)) {
        // 如果是，那么就调用 buildFunctionComponent 函数，将 virtualDOM 转换为一个新的虚拟 DOM 对象 nextVirtualDOM。
        nextVirtualDOM = buildFunctionComponent(virtualDOM)
    } else {
        // 否则，就调用 buildClassComponent 函数，将 virtualDOM 转换为一个新的虚拟 DOM 对象 nextVirtualDOM，
        nextVirtualDOM = buildClassComponent(virtualDOM)
        // 并将 nextVirtualDOM.component 设置为 component。
        component = nextVirtualDOM.component;
    }
    // 它再次检查 nextVirtualDOM 是否是一个函数。
    if(isFunction(nextVirtualDOM)) {
        // 如果是，那么就递归调用 mountComponent 函数，将 nextVirtualDOM 挂载到 container 中。
        mountComponent(nextVirtualDOM, container, oldDOM)
    } else {
        // 否则，就调用 mountNativeElement 函数，将 nextVirtualDOM 挂载到 container 中。
        mountNativeElement(nextVirtualDOM, container, oldDOM)
    }
    // 如果 component 存在，
    if (component) {
        // 那么就调用 component.componentDidMount 方法，表示组件已经挂载完成。
        component.componentDidMount();
        // 然后，如果 component.props.ref 是一个函数，
        if (component.props && component.props.ref) {
            // 那么就调用 component.props.ref(component)，将 component 传递给引用函数。
            component.props.ref(component)
        }
    }

}

/**
 * buildClassComponent 函数接受一个虚拟 DOM 对象 virtualDOM 作为参数。
 * 它首先使用 new 关键字和 virtualDOM.type 创建一个新的类组件实例 component，
 * 然后调用 component.render 方法生成一个新的虚拟 DOM 对象 nextVirtualDOM。
 * 接着，它将 component 保存到 nextVirtualDOM.component 中，最后返回 nextVirtualDOM。
 * @param {*} virtualDOM 虚拟 DOM 对象
 * @returns 
 */
function buildClassComponent(virtualDOM) {
    const component= new virtualDOM.type(virtualDOM.props || {})
   const nextVirtualDOM = component.render();
   nextVirtualDOM.component = component;
   return nextVirtualDOM;
}

/**
 * buildFunctionComponent 函数接受一个虚拟 DOM 对象 virtualDOM 作为参数。
 * 它直接调用 virtualDOM.type 函数并返回结果。
 * 这里假定 virtualDOM.type 是一个函数组件，它接受 props 作为参数并返回一个虚拟 DOM 对象。
 * @param {*} virtualDOM 虚拟 DOM 对象
 * @returns 
 */
function buildFunctionComponent(virtualDOM) {
    return virtualDOM.type(virtualDOM.props || {})
}