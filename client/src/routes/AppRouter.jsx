import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
const AppLayout = lazy(() => import("../components/AppLayout"));
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Admin = lazy(() => import("../pages/Admin"));
const ArticleDetails = lazy(() => import("./../pages/ArticleDetails"))

const AppRouter = () => {
     return (
        <BrowserRouter>
            <Suspense fallback={<div>loading ...</div>}>
                <Routes>
                    <Route  path="/" element={<AppLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/articleDetails" element={<ArticleDetails/>}/>
                        <Route path="/Contact" element={<Contact/>}/>
                    </Route>
                </Routes>   
            </Suspense>
        </BrowserRouter>
     )
}

export default AppRouter;