import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import { AddPost, AllPosts, EditPost, Home, Post, Signup } from './pages';
import { AuthLayout, Login } from './components';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="login" element={<AuthLayout authentication = {false}>
        <Login />
      </AuthLayout>} />
      <Route path="signup" element={<AuthLayout authentication = {false}>
        <Signup />
      </AuthLayout>} />
      <Route path="all-posts" element={<AuthLayout>
        <AllPosts />
      </AuthLayout>} />
      <Route path="add-post" element={<AuthLayout>
        <AddPost />
      </AuthLayout>} />
      <Route path="edit-post/:slug" element={<AuthLayout>
        <EditPost />
      </AuthLayout>} />
      <Route path="post/:slug" element={<AuthLayout>
        <Post />
      </AuthLayout>} />
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
