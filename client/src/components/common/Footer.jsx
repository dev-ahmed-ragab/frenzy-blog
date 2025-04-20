import { Mail, Phone, Twitter, Facebook, Figma, Instagram, Youtube } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import footerBg from "../../assets/footer-bg.webp";
import { motion, easeInOut } from 'framer-motion';

function Footer () {
    return (
        <div className='bg-cover bg-center pb-4 bg-fixed' style={{backgroundImage: `url(${footerBg})`}}>
            <div className="py-20 px-3 flex flex-col md:flex-row  justify-center items-center gap-5 md:flex-wrap lg:flex-nowrap" >
                {/* first card */}
                <motion.div 
                    className=" flex flex-col items-start bg-white  shadow-2xl ps-6 md:ps-10 pe-20 md:pe-24 pt-6 pb-8 rounded-3xl sm:w-[90%]  md:w-auto"
                    initial={{translateX: "-100%"}}
                    whileInView={{translateX: 0 }}
                    transition={{duration: 0.7, delay: 0.5, ease: easeInOut}}
                    viewport={{once: true}}
                >
                    <h2 className="uppercase border-b  border-black text-[30px] mb-7 font-medium">contact</h2>
                    {/* body */}
                    <div className='flex flex-col gap-5'>
                        {/* icon and text */}
                        <div className='flex gap-5 items-center' >
                            <div className='bg-black cursor-pointer py-[7px] px-6 rounded-xl'>
                                <Mail color="white" size="28px"/>
                            </div>
                            <p>hello@frenzy.webflow.io</p>
                        </div>
                        {/* icon and text */}
                        <div className='flex gap-5 items-center'>
                            <div className='bg-black cursor-pointer py-[7px] px-6 rounded-xl'>
                                <Phone className='bg-black cursor-pointer' color="white" size="28px" />
                            </div>
                        <p>+5 (123) 456 789 0</p>
                        </div>
                    </div>
                </motion.div>
                {/* second card */}
                <motion.div 
                    className="flex flex-col items-start bg-white  shadow-2xl px-3 md:px-9 pb-16 md:pb-20 pt-7 rounded-3xl sm:w-[90%]  md:w-auto"
                    initial={{translateY: "100%", opacity: 0}}
                    whileInView={{translateY: 0, opacity: 1 }}
                    transition={{duration: 0.7, delay: 0.5, ease: easeInOut}}
                    viewport={{once: true}}

                >
                    <h2 className="uppercase border-b ms-4 md:ms-0  border-black text-[30px] mb-7 font-medium">Socials</h2>
                    {/* body */}
                    <div className='flex gap-1 md:gap-2 mb-2'>
                        {/* icon and text */}
                        <div className="bg-black cursor-pointer px-5 py-3 rounded-xl">
                            <Facebook color="white" size="25px" />
                        </div>
                        {/* icon and text */}
                        <div className="bg-black cursor-pointer px-5 py-3 rounded-xl">
                            <Twitter color="white" size="25px" />
                        </div>
                        {/* icon and text */}
                        <div className="bg-black cursor-pointer px-5 py-3 rounded-xl">
                            <Instagram color="white" size="25px" />
                        </div>
                        {/* icon and text */}
                        <div className="bg-black cursor-pointer px-5 py-3 rounded-xl">
                            <Youtube color="white" size="25px" />
                        </div>
                        {/* icon and text */}
                        <div className="bg-black cursor-pointer px-5 py-3 rounded-xl">
                            <Figma color="white" size="25px" />
                        </div>
                    </div>
                </motion.div>
                {/* third card */}
                <motion.div 
                    className="flex flex-col items-start bg-white  shadow-2xl px-2 md:px-12 pt-8 pb-8 rounded-3xl sm:w-[90%] md:w-auto"
                    initial={{translateX: "100%"}}
                    whileInView={{translateX: 0}}
                    transition={{duration: 0.7,  delay: 0.5, ease: easeInOut }}
                    viewport={{once: true}}
                >
                    <h2 className="uppercase border-b ms-3 md:ms-0 border-black text-[30px] mb-4 font-medium">Newsletter</h2>
                    {/* body */}
                    <div>
                        <p className='pb-3  ms-3 md:ms-0 '>Stay ahead of the curve with our exclusive daily newsletter directly in your inbox!</p>
                        {/* icon and text */}
                        <Formik>
                            <Form className="relative ">
                                <Field type="email" name="email" id="" className=" indent-0 bg-[#f5f7fa]  md:w-[90%]  pe-40  ps-4 py-3 rounded-xl outline-0 border border-slate-300 border-solid" placeholder="your e-mail"/>
                                <Field type="submit" value="Subscribe" className=" bg-black font-bold text-white indent-0 cursor-pointer absolute top-[1px] right-0 rounded-e-xl py-3 px-6 outline-0"/>
                            </Form>
                        </Formik>
                    </div>
                </motion.div>
            </div>
            <motion.div 
                className='w-[90%] font-bold bg-white text-center mx-auto py-4 mb-[20px] rounded-3xl text-[18px] shadow-2xl'
                initial={{translateY: "100%", opacity: 0}}
                whileInView={{translateY: 0, opacity: 1 }}
                transition={{duration: 0.7, delay: 0.7, ease: easeInOut}}
                viewport={{once: true}}
            >
                <span className='text-[#d681d6] '>© </span>
                 2024   
                <span className='text-[#d681d6]'> Frenzy </span>
                 Made by  
                <span className='text-[#d681d6]'>  Team 3</span>
            </motion.div>
        </div>
    )
}

export default Footer;


//  bg-cover bg-center h-96