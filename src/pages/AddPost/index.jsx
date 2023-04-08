import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { isAuthSelector } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "../../utils/axios";

export const AddPost = () => {
  const [value, setValue] = React.useState("");
  const [field, setField] = React.useState({ title: "", tags: "", imageUrl:""});
  const fileRef = React.useRef(null);
  const isAuth = useSelector(isAuthSelector);
  const handleChangeFile = async (evt) => {
    try {
      const formData = new FormData();
      const file = evt.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      const url = data.url.replace('..','')
      setField({...field, imageUrl: url });
    } catch (err) {
      console.log(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

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
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
