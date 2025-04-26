import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
const AppLayout = lazy(() => import("../components/AppLayout"));
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
// const Admin = lazy(() => import("../pages/Admin"));
const ArticleDetails = lazy(() => import("../pages/ArticleDetails"));
const SignUp = lazy(() => import("../Auth/SignUp"));
const LogIn = lazy(() => import("../Auth/LogIn"));
const Profile = lazy(() => import("../pages/Profile"));
const Posts = lazy(() => import("../pages/Posts"));
const CategoryPage = lazy(() => import ("../pages/CategoryPage"));
const MyPosts = lazy(() => import("../pages/MyPosts"));
import { Provider } from "react-redux";
import {store} from "../Redux/Store";
import Loading from "../components/common/Loading";
import ErrorMessage from './../components/common/Error';


const AppRouter = () => {
     return (
        <Provider store={store}>
            <BrowserRouter>
                <Suspense
                    fallback={<Loading/>} >
                    <Routes>
                        <Route  path="/" element={<AppLayout/>}>
                            <Route index element={<Home/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/articleDetails/:id" element={<ArticleDetails/>}/>
                            <Route path="/category/:categoryName" element={<CategoryPage />} />
                            <Route path="/Contact" element={<Contact/>}/>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/posts" element={<Posts />} />
<Route path="/my-posts" element={<MyPosts />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<LogIn />} />
                            <Route path="/signup" element={<SignUp/>}/>
                            <Route path="*" element={<ErrorMessage/>}/>

                        </Route>
                    </Routes>   
                </Suspense>
            </BrowserRouter>
        </Provider>
     )
}

// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       >
//         <Routes>
//           <Route path="/" element={<AppLayout />}>
//             <Route index element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/admin" element={<Admin />} />
//             <Route path="/articleDetails" element={<ArticleDetails />} />
//             <Route path="/Contact" element={<Contact />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/posts" element={<Posts />} />
<Route path="/my-posts" element={<MyPosts />} />
//             <Route path="*" element={<div>404 Not Found</div>} />
//           </Route>
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// };

export default AppRouter;
