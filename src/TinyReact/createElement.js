export default function createElement(type, props, ...children) {
	const childElements = [].concat(...children).reduce((result, child) => {
		if (child !== false && child !== true && child !== null) {
			if (child instanceof Object) {
				result.push(child);
			} else {
				result.push(createElement("text", { textContent: child }));
			}
		}
		return result;
	}, []);
	return {
		type,
		props: Object.assign({children: childElements}, props),
		children: childElements,
	};
}

/*
type：这是一个字符串，表示元素的类型。
props：这是一个对象，包含了元素的属性。
children：这是一个数组，包含了元素的子元素。

首先，它将 children 数组展开并合并成一个新的数组 childElements。这是通过 concat 方法和扩展运算符 ... 实现的。
然后，它使用 reduce 方法遍历 children，对每个子元素进行处理。如果子元素不是 false、true 或 null，并且是一个对象，那么就直接将其添加到 childElements 中。否则，它会递归创建一个新的文本元素，并将其添加到 childElements 中。
最后，函数返回一个新的元素对象，该对象包含 type、props 和 children。其中，props 是通过 Object.assign 方法将 childElements 和传入的 props 合并得到的。
*/
