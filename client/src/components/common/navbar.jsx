import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Menu, User, LogOut, Search } from 'lucide-react';
import { AnimatePresence, easeInOut, motion } from "motion/react"
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/UserSlice';
import logo from "../../assets/logo.webp";



function Navbar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openMenu, setOpenMenu] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const { token, username } = useSelector((state) => state.user);

    const closeAllMenus = () => {
        setOpenMenu(false);
        setOpenDropdown(false);
        setOpenSearch(false);
    };

    const toggleMenu = () => {
        closeAllMenus();
        setOpenMenu(true);
    };
    const toggleDropdown = () => {
        closeAllMenus();
        setOpenDropdown(true);
    };
    const toggleSearch = () => {
        closeAllMenus();
        setOpenSearch(true);
    };
    const navlinkClassName = ({isActive}) => isActive? "active text-[#d681d6]": "text-black";
    const mobileNavlinkClassName = ({isActive}) => isActive? "active text-[#d681d6]": "text-white";

    useEffect(() => {
        const handleScroll = () => closeAllMenus();
        const handleClickOutside = (event) => {
            const navbar = document.querySelector('.navbar-container');
            if (navbar && !navbar.contains(event.target)) {
                closeAllMenus();
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-[#dde7f5] pt-[50px] relative z-50">
            <motion.div 
                className="navbar-container bg-white mx-[30px] h-[100px] rounded-3xl flex justify-around items-center shadow-xl relative"
                initial={{opacity: 0, scale: 0}}
                whileInView={{opacity: 1, scale: 1}}
                transition={{duration: 0.7, ease: easeInOut}}
                viewport={{once: true}}
            >
                <div onClick={() => navigate("/")} className="cursor-pointer">
                    <img src={logo} className="w-[80%] md:w-full" alt="logo"/>
                </div>
                <div className="hidden lg:flex gap-5 font-bold uppercase items-center">
                    <NavLink to="/" className={navlinkClassName}>Home</NavLink>
                    <NavLink to="/posts" className={navlinkClassName}>Posts</NavLink>
                    <NavLink to="/about" className={navlinkClassName}> About</NavLink>
                    <NavLink to="/contact" className={navlinkClassName}>Contact </NavLink>
                </div>
                <div className="hidden lg:flex items-center gap-4">
                    <Formik>
                        <Form className="relative">
                            <Field 
                                type="search" 
                                name="Search" 
                                className="w-full indent-0 bg-[#f5f7fa] px-5 py-2 rounded-3xl outline-0 border border-slate-300 border-solid" 
                                placeholder="Search here..."
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                                <Search size={20} />
                            </button>
                        </Form>
                    </Formik>
                    {!token ? (
                        <div className="flex gap-4">
                            <NavLink to="/signup" className={navlinkClassName}> Sign Up</NavLink>
                            <NavLink to="/login" className={navlinkClassName}> Sign In</NavLink>
                        </div>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f7fa] hover:bg-[#e9ecf2] transition-colors"
                            >
                                <User size={20} />
                                <span>{username}</span>
                            </button>
                            {openDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                                    <NavLink to="/profile" className="block px-4 py-2 hover:bg-[#f5f7fa]">Account</NavLink>
                                    <NavLink to="/my-posts" className="block px-4 py-2 hover:bg-[#f5f7fa]">My Posts</NavLink>
                                    <button
                                        onClick={() => {
                                            dispatch(logout());
                                            navigate('/');
                                        }}
                                        className="w-full text-right px-4 py-2 text-red-600 hover:bg-[#f5f7fa] flex items-center gap-2"
                                    >
                                        <LogOut size={20} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* menu icon */}
                <button className="lg:hidden mr-2 focus:outline-none relative" onClick={toggleMenu}>
                    <Menu color="black" size="40px" />
                </button>
                {/* mobile menu */}
                {
                openMenu && (
                    <AnimatePresence>
                    <motion.div
                        initial = {{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0 }}
                        exit={{opacity: 0, y: -20}}
                        transition={{duration: 0.5, ease: "easeInOut"}}
                        className="lg:hidden flex flex-col font-bold z-50 absolute top-36 right-8 bg-black p-8 items-center gap-2 rounded-xl">
                        <div className="relative w-full mb-4">
                            <Formik>
                                <Form className="relative">
                                    <Field 
                                        type="search" 
                                        name="Search" 
                                        className="w-full indent-0 bg-[#f5f7fa] px-5 py-2 rounded-3xl outline-0 border border-slate-300 border-solid" 
                                        placeholder="Search here..."
                                    />
                                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                                        <Search size={20} />
                                    </button>
                                </Form>
                            </Formik>
                        </div>
                        <NavLink to="/" onClick={toggleMenu} className={mobileNavlinkClassName}>Home</NavLink>
                        <NavLink to="/about" onClick={toggleMenu} className={mobileNavlinkClassName}> About</NavLink>
                        <NavLink to="/contact" onClick={toggleMenu} className={mobileNavlinkClassName}>Contact </NavLink>
                        {!token ? (
                            <>
                                <NavLink to="/signup" onClick={toggleMenu} className={mobileNavlinkClassName}> Sign Up</NavLink>
                                <NavLink to="/login" onClick={toggleMenu} className={mobileNavlinkClassName}> Sign In</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/profile" onClick={toggleMenu} className={mobileNavlinkClassName}>Account</NavLink>
                                <NavLink to="/my-posts" onClick={toggleMenu} className={mobileNavlinkClassName}>My Posts</NavLink>
                                <button
                                    onClick={() => {
                                        dispatch(logout());
                                        navigate('/');
                                        toggleMenu();
                                    }}
                                    className="text-red-500 flex items-center gap-2"
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </>
                        )}
                    </motion.div>
                    </AnimatePresence>
                )
                }
            </motion.div>
        </div>
    )
}

export default Navbar;