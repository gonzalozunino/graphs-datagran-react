import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Posts from "./views/Posts";
import NoMatch from "./views/NoMatch";
import Hero from "./components/Hero";
import { Layout } from "antd";

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Hero />
      <Content style={{ padding: "0 50px", margin: "32px 0" }}>
        <div className="site-layout-content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
