import { useNavigate } from 'react-router';

export default function ArticleCard({article}) {

    const navigate = useNavigate()

    const handleClick = (article) => {
        const article_id = article.article_id
        navigate(`/articles/${article_id}`)
    };
 

	return (
        
      
		<li className='article-card' key={article.article_id} onClick={()=>{handleClick(article)}}>
			<h3 id="article-card-title">{article.title}</h3>
			<img id="article-img" src={article.article_img_url} alt={article.title}/>
            <p>Published: {new Date(article.created_at).toLocaleDateString()}</p>
		</li>
    
	);

}