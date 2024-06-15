
// 判断是不是组件类型
export default function isFunction(virtualDOM) {
	return virtualDOM && typeof virtualDOM.type === "function";
}
