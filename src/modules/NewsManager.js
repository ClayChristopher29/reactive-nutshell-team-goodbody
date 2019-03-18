const NewsAPIManager = {
    getAllNews: () => {
        return fetch ("http://localhost:5002/news")
        .then(news => news.json())
    },
    deleteNewsArticle: (id) => {
        return fetch (`http://localhost:5002/news/${id}`, {
        method: "DELETE"
    })
        .then(()=> fetch(`http://localhost:5002/news`))
        .then(r=>r.json())
},
postNewsArticle(newArticle) {
    return fetch("http://localhost:5002/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newArticle)
    }).then(r => r.json())
  }
}

export default NewsAPIManager;
