import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './app.jsx'
import fs from 'fs'
import {Presets, LookRoot, StyleSheet} from '../modules'
import {match, RouterContext} from 'react-router';
import routes from '../build/prerender';

const indexHTML = fs.readFileSync(__dirname + '/index.html').toString()
const app = express()
const host = 'localhost'
const port = 8000

app.use('/app.js', proxy('localhost:8080', {
  forwardPath: () => '/app.js'
}))

app.get('/', (req, res) => {

  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      const serverConfig = Presets['react-dom'];
      serverConfig.userAgent = req.headers['user-agent'];
      const appCSS = StyleSheet.renderToString(serverConfig.prefixer);
      const appHtml = renderToString(<LookRoot config={serverConfig}><RouterContext {...renderProps} /></LookRoot>);
      res.send(indexHTML.replace('<!-- {{app}} -->', appHtml).replace('<!-- {{css}} -->', appCSS))
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(port, host, () => {
  console.log('Access the universal app at http://%s:%d', host, port)
})
