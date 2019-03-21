import React, { Component } from "react"
import "./News.css"

export default class NewsDetail extends Component {
  render() {
    /*
        Using the route parameter, find the article that the
        user clicked on by looking at the `this.props.news`
        collection that was passed down from ApplicationViews
    */
    const news = this.props.news.find(a => a.id === parseInt(this.props.match.params.newsId)) || {}

    return (
      <section className="news">
        <div key={news.id} className="news-card">
          <div className="news-card-body">
            <h4 className="news-card-title">
              {news.title}
            </h4>
            <h6 className="news-card-title">{news.synopsis}</h6>
            <h6 className="news-card-title">{news.url}</h6>

            <button
              href="#"
              className="btn btn-danger"
              onClick={() =>
                this.props
                  .deleteNewsArticle(news.id)
                  .then(() => this.props.history.push("/news"))
              }
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push(
                  `/news/${news.id}/edit`
                );
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </section>
    );
  }
}