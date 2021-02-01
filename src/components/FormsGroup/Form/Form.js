export default (props) => {
    const attrs = props.attrName || {}
    return  (
        <form 
            id={props.id} 
            method={props.method} 
            onSubmit={props.onSubmit}
            {...attrs}
            > 
            {props.children}
        </form>
    )
}