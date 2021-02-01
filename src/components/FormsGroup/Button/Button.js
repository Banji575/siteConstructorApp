export default (props) => {
    const attrs = props.attrName || {}
    return (
        <button onClick={props.onClick} className={props.className} {...attrs}>{props.children}</button>
    )
    
}