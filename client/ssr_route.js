const app = require('express')();
import createHistory from 'react-router/lib/createMemoryHistory';
import createStore from './redux/create';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import React from 'react';
import ReactDOM from 'react-dom/server';
import ApiClient from './helpers/ApiClient';
import { match } from 'react-router';
import Html from './helpers/Html';

import getRoutes from './routes';


app.use((req, res) => {
  console.log('inside of the ssr')
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    console.log("trying to refresh webpackisomorphic tools")
    webpackIsomorphicTools.refresh();
    console.log("after webpackisomorphic tools refersh")
  }
  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  console.log('hello')
  function hydrateOnClient() {
    console.log('inside hydrateOnClient')
    res.send('<!doctype html>\n' +
        ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    console.log('match callbakc')
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
        );

        res.status(200);

        global.navigator = {userAgent: req.headers['user-agent']};
        res.send('meow')
        //
        // res.send('<!doctype html>\n' +
        //     ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});


module.exports = app;