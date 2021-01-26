import React from 'react';
import Layout from 'antd/lib/layout';
import Spin from 'antd/lib/spin';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import 'antd/dist/antd.css';

import Login from "./components/Login"
import Home from "./components/Home"
import Faq from "./components/Faq"
import Inbox from "./components/Inbox"
import Header from "./components/Header"
import Footer from "./components/Footer"

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
          history.push('/login');
        }
      });
  }, [history, setUser, setLoading]);

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
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/inbox">
                <Inbox />
              </Route>
              <Route path="/faq">
                <Faq />
              </Route>
              <Route path="/">
                <Home user={user} setUser={setUser} />
              </Route>
            </Switch>
          ) }
        </Layout.Content>

        <Footer />
      </div>
  );
}
