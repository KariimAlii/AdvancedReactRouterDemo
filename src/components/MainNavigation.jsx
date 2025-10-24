import classes from './styles/MainNavigation.module.css';
import {Form, NavLink} from "react-router-dom";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
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

          <li>
            <NavLink
                to="/auth?mode=login"
                className={({isActive}) => isActive ? classes.active : null}
            >
              Authentication
            </NavLink>
          </li>
          <li>
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>

          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
