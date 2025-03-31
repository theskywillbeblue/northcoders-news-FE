export default function ArticleCard({article}) {
	return (
		<li className='article-card' key={article.article_id}>
			<h3 id="article-card-title">{article.title}</h3>
			<img id="article-img" src={article.article_img_url} alt={article.title}/>
            <p>Published: {new Date(article.created_at).toLocaleDateString()}</p>
		</li>
	);
}
