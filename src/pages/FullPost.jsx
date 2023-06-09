import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Не удалось загрузить статью");
      });
  }, []);

  return isLoading ? (
    <Post isLoading={isLoading} isFullPost />
  ) : (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl !== "http://localhost:4444" ? data.imageUrl : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
       <ReactMarkdown children={data.text}/>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/6.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/6.jpg",
            },
            text: "Тестовый комментарий",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
