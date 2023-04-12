import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchPostsByView, fetchTags } from "../redux/slices/post";

export const Home = () => {
  const [sort, setSort] = useState(0);
  const { posts, tags } = useSelector((state) => state.postsReducer);
  const userData = useSelector((state) => state.authReducer.data);
  const isLoadingPosts = posts.status === "loading";
  const isLoadingTags = tags.status === "loading";
  const dispatch = useDispatch();
  useEffect(() => {
    if (sort === 0) {
      dispatch(fetchPosts());
    } else {
      dispatch(fetchPostsByView());
    }
  }, [sort]);
  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={sort}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" onClick={() => setSort(0)} />
        <Tab label="Популярные" onClick={() => setSort(1)} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isLoadingPosts ? [...Array(5)] : posts.items).map((item, index) =>
            isLoadingPosts ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={item._id}
                title={item.title}
                imageUrl={
                  item.imageUrl !== "http://localhost:4444" ? item.imageUrl : ""
                }
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={3}
                tags={item.tags}
                isEditable={userData && userData._id === item.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isLoadingTags} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Александр Гончаров",
                  avatarUrl: "https://mui.com/static/images/avatar/4.jpg",
                },
                text: "Это братишка",
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
          />
        </Grid>
      </Grid>
    </>
  );
};
