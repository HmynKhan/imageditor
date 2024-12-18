import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {store} from './components/ReduxToolkit/store/store'

// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
// import Layout from './components/ReactRouter/Layout';
// import Home from './components/ReactRouter/Home/Home';
// import About from './components/ReactRouter/About/About';
// import Contact from './components/ReactRouter/Contact/Contact';
// import User from './components/ReactRouter/User/User';
// import Github, {GitHubInfoLoader} from './components/ReactRouter/Github/Github';
// import SubAbout from './components/ReactRouter/About/SubAbout';

// const router = createBrowserRouter([
//   {
//     path:'/',
//     element:<Layout />,
//     children:[
//       { 
//         path:'',
//         element:<Home />
//       },
//       {
//         path:"about",
//         element:<About />,
//         children:[
//           {
//             path:"humayoun",
//             element:<SubAbout />
//           },
//         ]
//       },
      
//       {
//         path:"contact",
//         element:<Contact />
//       },
//       {
//         path:"github",
//         element:<Github />,
//         loader:{GitHubInfoLoader}
//       }
//     ]
//   }
// ])


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout />}>
//     <Route path='' element={<Home />} />
//     <Route path="about" element={<About />}>
//     <Route path="humayoun" element={<SubAbout />} />
//     </Route>
//     <Route path='contact' element={<Contact />} />
//     <Route path='user/:userid' element={<User />} />
//     <Route loader={GitHubInfoLoader} path='github' element={<Github />} />

//     </Route>
//   )
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router}> */}
    <Provider store={store}>
      <App />
      </Provider>
    {/* </RouterProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
