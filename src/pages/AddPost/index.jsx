import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { isAuthSelector } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";

export const AddPost = () => {
  const [text, setText] = React.useState("");
  const [field, setField] = React.useState({
    title: "",
    tags: "",
    imageUrl: "",
    loading: false,
  });
  const { id } = useParams();
  const fileRef = React.useRef(null);
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthSelector);
  const handleChangeFile = async (evt) => {
    try {
      const formData = new FormData();
      const file = evt.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      const url = data.url.replace("..", "");
      setField({ ...field, imageUrl: url });
    } catch (err) {
      console.log(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = () => {
    setField({ ...field, imageUrl: "" });
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setField({ ...field, loading: true });
      const fields = {
        title: field.title,
        imageUrl: `http://localhost:4444${field.imageUrl}`,
        tags: field.tags.split(","),
        text: text,
      };
      const { data } = await axios.post("/posts", fields);
      const id = data._id;
      setField({ ...field, loading: false });
      navigate(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      alert("Ошибка при создании поста");
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );
  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setText(data.text);
          const img = data.imageUrl.replace("http://localhost:4444", "");
          setField({
            ...field,
            title: data.title,
            imageUrl: img,
            tags: data.tags.join(", "),
          });
        })
        .catch((err) => {
          console.log(err);
          alert("Ошибка получения статьи");
        });
    }
  }, []);

  return !window.localStorage.getItem("token") && !isAuth ? (
    <Navigate to="/" />
  ) : (
    <Paper style={{ padding: 30 }}>
      <Button
        variant="outlined"
        size="large"
        onClick={() => fileRef.current.click()}
      >
        Загрузить превью
      </Button>
      <input type="file" ref={fileRef} onChange={handleChangeFile} hidden />
      {field.imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${field.imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        value={field.title}
        onChange={(e) => setField({ ...field, title: e.target.value })}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        value={field.tags}
        onChange={(e) => setField({ ...field, tags: e.target.value })}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
