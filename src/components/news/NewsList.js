import React, {Component} from 'react';
import "./News.css"
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
                this.props.news.map(news =>
                    <div key={news.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">

                                {news.title}
                                <Link className="nav-link" to={`/news/${news.id}`}>Details</Link>
                            </h5>
                        </div>
                    </div>
                )
            }
            </section>
            </React.Fragment>
        );
    }
}

export default NewsList;