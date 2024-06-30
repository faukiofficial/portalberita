const Input = (props) => {
    return (
        <input
            type="text"
            className="form-control mb-4"
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
    )
}

export default Input;