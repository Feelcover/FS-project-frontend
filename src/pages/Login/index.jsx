import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, isAuthSelector } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  console.log(isAuth);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "qweqwe@qwe.ru",
      password: "qweqwe",
    },
    mode: "onChange",
  });
  const onSubmit = async (value) => {
    const data = await dispatch(fetchUser(value));
    if (data.payload.token) {
      window.localStorage.setItem("token", data.payload.token);
    }
    if (!data.payload) {
      window.alert("Не удалось авторизоваться");
    }
  };



  return isAuth ? (
    <Navigate to="/" />
  ) : (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          type="email"
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          label="Пароль"
          {...register("password", { required: "Укажите пароль" })}
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
