import React from 'react';
import Layout from 'antd/lib/layout';
import Spin from 'antd/lib/spin';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import 'antd/dist/antd.css';

import Login from "./components/Login"
import Home from "./components/Home"
import Faq from "./components/Faq"
// import Inbox from "./components/Inbox"
import Header from "./components/Header"
import Footer from "./components/Footer"
import NotFound from "./components/NotFound"

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [doneFirstLoad, setDoneFirstLoad] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  const reloadUser = React.useCallback(() => {
    return fetch('/user')
      .then(res => res.json())
      .then(user => {
        setLoading(false);
        setUser(user);

        if (!user) {
          if (location.pathname === '/') {
            history.push('/login');
          }
        } else {
          if (location.pathname === '/login') {
            history.push('/')
          }
        }
      }).catch(e => {
        setLoading(true);
      });
  }, [history, setUser, setLoading, location.pathname]);

  React.useEffect(() => {
    if (!doneFirstLoad || location.pathname) {
      reloadUser();
      setDoneFirstLoad(true);
    }
    const interval = setInterval(reloadUser, 5000);

    return () => {
      clearInterval(interval);
    }
  }, [reloadUser, setDoneFirstLoad, doneFirstLoad, location.pathname]);

  return (
      <div style={{maxWidth: '1200px', margin: 'auto'}}>
        <Header user={user} />

        <Layout.Content style={{margin: 20, minHeight: 'calc(100vh - 182px)'}}>
          { loading ? (
            <div style={{textAlign: 'center', paddingTop: 50}}>
              <Spin size="large" tip="Connecting..."/>
            </div>
          ) : (
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              {/* <Route exact path="/inbox">
                <Inbox />
              </Route> */}
              <Route exact path="/faq">
                <Faq />
              </Route>
              <Route exact path="/">
                <Home user={user} setUser={setUser} />
              </Route>
              <Route exact path="*">
                <NotFound />
              </Route>
            </Switch>
          ) }
        </Layout.Content>

        <Footer />
      </div>
  );
}
