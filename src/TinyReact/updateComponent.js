import diff from "./diff";


/**
 * 这段代码定义了一个名为 updateComponent 的函数，它用于更新一个组件。
 * 这个函数接受四个参数：virtualDOM，oldComponent，oldDOM 和 container。
 * @param {*} virtualDOM 这是一个新的虚拟 DOM 对象，它描述了组件的当前状态。
 * @param {*} oldComponent 这是一个旧的组件实例，它描述了组件的前一个状态。
 * @param {*} oldDOM 这是一个真实的 DOM 节点，它是组件的真实表示。
 * @param {*} container 这是一个真实的 DOM 元素，它将作为新元素的父容器。
 */
export default function updateComponent(virtualDOM, oldComponent, oldDOM, container) {
    // 它调用 oldComponent.componentWillReceiveProps 方法，表示组件将要接收新的属性。
    oldComponent.componentWillReceiveProps(virtualDOM.props);
    // 它检查 oldComponent.shouldComponentUpdate 方法的返回值。如果返回 true，那么就继续更新组件。
    if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
        let prevProps = oldComponent.props;
        // 调用 oldComponent.componentWillUpdate 方法，表示组件将要更新。
        oldComponent.componentWillUpdate(virtualDOM.props);

        // 它调用 oldComponent.updateProps 方法，将 virtualDOM.props 更新到 oldComponent.props。
        oldComponent.updateProps(virtualDOM.props);
        // 它调用 oldComponent.render 方法生成一个新的虚拟 DOM 对象 nextVirtualDOM
        let nextVirtualDOM = oldComponent.render();
        // 并将 oldComponent 保存到 nextVirtualDOM.component。
        nextVirtualDOM.component = oldComponent;
        // 它调用 diff 函数，将 nextVirtualDOM、container 和 oldDOM 作为参数。diff 函数的作用是比较新旧两个虚拟 DOM 对象，并根据比较结果更新真实的 DOM 树。
        diff(nextVirtualDOM, container, oldDOM);
        // 它调用 oldComponent.componentDidUpdate 方法，表示组件已经更新完成。
        oldComponent.componentDidUpdate(prevProps)
    }
   
}