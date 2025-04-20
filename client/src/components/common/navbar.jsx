// import * as React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Menu } from 'lucide-react';
import { AnimatePresence, easeInOut, motion } from "motion/react"
import logo from "../../assets/logo.webp";



function Navbar(){
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => setOpenMenu(!openMenu);
    const navlinkClassName = ({isActive}) => isActive? "active text-[#d681d6]": "text-black";
    const mobileNavlinkClassName = ({isActive}) => isActive? "active text-[#d681d6]": "text-white";

    return (
        <div className="bg-[#dde7f5] pt-[50px]">
            <motion.div 
                className=" bg-white mx-[30px] h-[100px] rounded-3xl flex justify-around items-center shadow-xl"
                initial={{opacity: 0, scale: 0}}
                whileInView={{opacity: 1, scale: 1}}
                transition={{duration: 0.7, ease: easeInOut}}
                viewport={{once: true}}
            >
                <div onClick={() => navigate("/")} className="cursor-pointer">
                    <img src={logo} className="w-[80%] md:w-full" alt="logo"/>
                </div>
                <div className="hidden  lg:flex gap-5 font-bold uppercase">
                    <NavLink to="/" className={navlinkClassName}>Home</NavLink>
                    <NavLink to="/about" className={navlinkClassName}> About</NavLink>
                    <NavLink to="/admin" className={navlinkClassName}> Admin</NavLink>
                    <NavLink to="/contact" className={navlinkClassName}>Contact </NavLink>
                </div>
                <Formik>
                    <Form className="relative hidden md:block ">
                        <Field type="search" name="Search" id="" className=" indent-0 bg-[#f5f7fa]  px-5 py-2 rounded-3xl outline-0 border border-slate-300 border-solid" placeholder="Type Something"/>
                        <Field type="submit" value="Search" className=" bg-black text-white indent-0 cursor-pointer absolute top-[1px] right-0 rounded-e-3xl py-2 px-3 outline-0"/>
                    </Form>
                </Formik>
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
                        className="lg:hidden  flex flex-col font-bold absolute top-36 right-8 bg-black p-8 items-center gap-2 rounded-xl">
                        <NavLink to="/" onClick={toggleMenu} className={mobileNavlinkClassName}>Home</NavLink>
                        <NavLink to="/about" onClick={toggleMenu} className={mobileNavlinkClassName}> About</NavLink>
                        <NavLink to="/admin" onClick={toggleMenu} className={mobileNavlinkClassName}> Admin</NavLink>
                        <NavLink to="/contact" onClick={toggleMenu} className={mobileNavlinkClassName}>Contact </NavLink>
                    </motion.div>
                    </AnimatePresence>
                )
                }
            </motion.div>

        </div>
    )
}

export default Navbar;