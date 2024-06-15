import mountElement from "./mountElement";
import updateComponent from "./updateComponent";

/**
 * 这段代码定义了两个函数：diffComponent 和 isSameComponent，它们用于比较和更新组件。
 * @param {*} virtualDOM 
 * @param {*} oldComponent 
 * @param {*} oldDOM 
 * @param {*} container 
 */
export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) {
    // 使用 isSameComponent 函数检查 virtualDOM 和 oldComponent 是否是同一个组件
    if (isSameComponent(virtualDOM, oldComponent)) {
        // 如果是，那么就调用 updateComponent 函数更新组件
        updateComponent(virtualDOM, oldComponent, oldDOM, container)
    } else {
        // 就调用 mountElement 函数挂载新的组件。
        mountElement(virtualDOM, container, oldDOM)
    }
}

/**
 * isSameComponent 函数接受两个参数：virtualDOM 和 oldComponent。
 * 它检查 oldComponent 是否存在，并且 virtualDOM.type 是否等于 oldComponent.constructor。
 * 如果都满足，那么就返回 true，表示它们是同一个组件。
 * @param {*} virtualDOM 
 * @param {*} oldComponent 
 * @returns 
 */
function isSameComponent(virtualDOM, oldComponent) {
    return oldComponent && virtualDOM.type === oldComponent.constructor;
}