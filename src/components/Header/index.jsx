import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isAuthSelector, logout } from '../../redux/slices/auth';
import styles from './Header.module.scss';


export const Header = () => {
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    window.confirm('Вы хотите выйти из аккаунта?') && dispatch(logout());
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>FULLSTACK BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
