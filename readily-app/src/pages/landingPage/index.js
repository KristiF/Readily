import { useEffect, useState } from "react";
import { fetchArticle } from "src/lib/fetchArticle";
import FrontpageView from "src/views/frontPageview";

export default function landingPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticle().then((data)=>setArticles(data));
  }, []);

  return (
    <div>
      <FrontpageView articles={articles} />
    </div>
  );
}
