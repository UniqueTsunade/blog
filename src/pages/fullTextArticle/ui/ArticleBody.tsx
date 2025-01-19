import ReactMarkdown from "react-markdown";

interface ArticleBodyProp {
  body: string;
}

const ArticleBody: React.FC<ArticleBodyProp> = ({ body }) => {
  return (
    <div>
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  );
};

export default ArticleBody;
