import React from 'react'
import { BrowserRouter, Redirect, Route, Switch, } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import PersonalCenter from './pages/PersonalCenter'
import { Provider } from 'react-redux'
import store from './redux/store'

export default function App(props) {
  const token = window.localStorage.getItem('token')
  return (
    <div>
      {/* 让所有的后代组件都能用store */}
      <Provider store={store}>
        <BrowserRouter>
          {token !== null ? (
            <Switch>
              <Redirect from='/login' to='/' />
              <Route path='/PersonalCenter' component={PersonalCenter} />
              <Route path='/' component={Home} />
            </Switch>
          ) : (
            <Switch>
              <Route path='/login' component={Login} />
              <Redirect to='/login' />
            </Switch>
          )
          }
        </BrowserRouter>
      </Provider>
    </div >
  )
}
