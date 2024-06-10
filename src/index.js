import TinyReact from "./TinyReact";

const root = document.getElementById("root")

const virtualDom = (
    <div className="container">
        <h1>你好 Tiny React</h1>
        <h2 data-test="test">(编码必杀技)</h2>
        <div>
            嵌套1<div>嵌套1.1</div>
        </div>
        <h3>(观察：这个将会被改变)</h3>
        {2==1 && <div>如果2和1相等渲染当前内容</div>}
        {2==2 && <div>2</div>}
        <span>这是一段内容</span>
        <button onClick={() => alert("你好")}>点击我</button>
        <h3>这个将会被删除</h3>
        2,3
        <input type="text" value="13" />
    </div>
)

const modifyDOM = (
    <div className="container">
        <h1>你好 Tiny React</h1>
        <h2 data-test="test123">(编码必杀技)</h2>
        <div>
            嵌套1<div>嵌套1.1</div>
        </div>
        <h3>(观察：这个将会被改变)</h3>
        {2==1 && <div>如果2和1相等渲染当前内容</div>}
        {2==2 && <div>2</div>}
        <span>这是一段修改过的段内容</span>
        <button onClick={() => alert("你好！！！")}>点击我</button>
        <h6>这个将会被删除</h6>
        2,3
        <input type="text" />
    </div>
)
TinyReact.render(virtualDom, root)

setTimeout(() => {
    TinyReact.render(modifyDOM, root)
}, 2000);

function Demo() {
    return <div>hello</div>
}

function Heart(props) {
    return <div>
        {props.title}
        &hearts; <Demo /></div>
}
// TinyReact.render(<Heart title="Hello React" />, root)

class Alert extends TinyReact.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>{this.props.title}</div>
    }
}

// TinyReact.render(<Alert title="Hello React" />, root)
