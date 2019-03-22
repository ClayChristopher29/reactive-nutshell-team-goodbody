import React, { Component } from 'react';
import "../appStyles/applicationStyles.css"
import { Link } from "react-router-dom";

class NewsList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="newsButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/news/new")
                        }
                        }>
                        Add News Article
                    </button>
                </div>
                <section className="news">
                    {
                        this.props.news.reverse().map(news => {
                            if (news.userId === sessionStorage.getItem('credentials')) {
                            return <div key={news.id} className="news-card">
                                <div className="news-card-body">
                                    <h5 className="news-card-title">

                                        {news.title}
                                        <Link className="nav-link" to={`/news/${news.id}`}>Details</Link>
                                    </h5>
                                </div>
                            </div>
                            }
                        }
                        )}
                    }
                </section>
            </React.Fragment>
        );
    }
}

export default NewsList;