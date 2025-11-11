import classes from './styles/MainNavigation.module.css';
import {Form, NavLink, useRouteLoaderData} from "react-router-dom";
import {useSelector} from "react-redux";

function MainNavigation() {
  const token = useRouteLoaderData('root');
  const { isAuthenticated, claims } = useSelector((state) => state.auth);

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {isAuthenticated && <span>Welcome, {claims?.email}</span>}
            {isAuthenticated && claims?.roles.includes('Admin') && <a href="/dashboard">Admin</a>}
            {!isAuthenticated && <a href="/authentication">Login</a>}
          </li>
          <li>
            <NavLink
                to="/"
                className={({isActive}) => isActive ? classes.active : null}
                end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
                to="/events"
                className={({isActive}) => isActive ? classes.active : null}
            >
              Events
            </NavLink>
          </li>
          {!token && (
              <li>
                <NavLink
                    to="/auth?mode=login"
                    className={({isActive}) => isActive ? classes.active : null}
                >
                  Authentication
                </NavLink>
              </li>
          )}

          {token && (
              <li>
                <Form action="/logout" method="post">
                  <button>Logout</button>
                </Form>
              </li>
          )}


        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
