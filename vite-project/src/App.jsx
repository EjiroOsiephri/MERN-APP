import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlace from "./places/pages/UserPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";

function App() {
  return (
    <Router>
      <MainNavigation></MainNavigation>
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/places/:placeId">
            <UpdatePlace />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlace />
          </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Redirect to="/" exact />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
