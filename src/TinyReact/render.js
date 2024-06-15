import diff from "./diff";

/**
 * 这段代码定义了一个名为 render 的函数，它用于将一个虚拟 DOM 对象 virtualDOM 渲染到一个真实的 DOM 容器 container 中。
 * 这个函数接受三个参数：virtualDOM，container 和 oldDOM。
 * @param {*} virtualDOM 这是一个虚拟 DOM 对象，它描述了一个 DOM 元素或组件的状态。
 * @param {*} container 这是一个真实的 DOM 元素，它将作为新元素的父容器。
 * @param {*} oldDOM 这是一个真实的 DOM 元素，如果它存在，那么新元素将会插入到它之前，否则新元素将会被添加到容器的末尾。如果没有提供 oldDOM 参数，那么默认值是 container 的第一个子元素。
 */
export default function render(virtualDOM, container, oldDOM = container.firstChild) {
	// 它调用 diff 函数，将 virtualDOM、container 和 oldDOM 作为参数。diff 函数的作用是比较新旧两个虚拟 DOM 对象，并根据比较结果更新真实的 DOM 树。
	diff(virtualDOM, container, oldDOM);
}
