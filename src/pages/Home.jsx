import React from "react";
import Header from "../elements/Header";
import Input from "../elements/Input";
import Loading from "../elements/Loading";
import Error from "../elements/Error";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      error: null,
      searchString: "",
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchString !== this.state.searchString) {
      this.fetchNews(this.state.searchString);
    }
  }

  // componentWillUnmount() {
  //   alert("Process Succesfully");
  // }

  fetchNews(searchString = "") {
    this.setState({ loading: true });

    fetch(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=85fb02859de646ebb09c2df399e91f97`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let articles = data.articles;
        if (searchString) {
          articles = articles.filter((article) =>
            article.title.toLowerCase().includes(searchString.toLowerCase())
          );
        }
        this.setState({ articles, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  handleSearchInput = (event) => {
    this.setState({ searchString: event.target.value });
  };

  render() {
    const { articles, loading, error } = this.state;

    return (
      <>
        <Header webname="Portal Berita" />
        <div className="container">
          <Input
            placeholder="Cari berita..."
            onChange={this.handleSearchInput}
          />

          {loading ? (
            <div className="d-flex justify-content-center">
              <Loading />
            </div>
          ) : error ? (
            <Error
              classname="alert-danger text-center"
              type="Error!"
              text={error}
            />
          ) : articles.length === 0 ? (
            <Error
              classname="alert-warning text-center"
              type="Warning!"
              text="Tidak ada berita yang sesuai dengan yang Anda cari"
            />
          ) : (
            <div className="row" id="newsDisplay">
              {articles.map((article, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card mb-4">
                    <img
                      src={article.urlToImage || "./150.png"}
                      className="card-img-top"
                      alt={article.title}
                    />
                    <div className="card-body">
                      <h5
                        className="card-title"
                        style={{ textAlign: "justify" }}
                      >
                        {article.title}
                      </h5>
                      <p
                        className="desciption"
                        style={{ textAlign: "justify" }}
                      >
                        {article.description}
                      </p>
                      <p className="text-muted" style={{ fontSize: "13px" }}>
                        Diunggah pada {article.publishedAt.split("T")[0]} <br />{" "}
                        oleh {article.author}
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Baca Selengkapnya...
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Home;
