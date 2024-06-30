const Error = (props) => {
    return (
        <div className={`alert ${props.classname} alert-dismissible fade show`}>
            <strong>{props.type}</strong> {props.text}
        </div>
    )
}

export default Error;