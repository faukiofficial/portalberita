const Header = (props) => {
    return (
        <div className="container-fluid bg-danger">
          <h1 className="container text-white py-3 p-2 mb-4">{props.webname}</h1>
        </div>
    )
}

export default Header;