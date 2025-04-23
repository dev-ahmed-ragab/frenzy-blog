import { Formik, Form, Field } from 'formik';
import contact from "../assets/contact-img.webp";
import { motion, easeInOut } from 'framer-motion';
function Contact () {
    const inputClassName = "bg-[#dde7f5] outline-0 py-3 border-b mb-5 pb-4 border-black focus:border-[#3898ec] placeholder:text-black placeholder:text-[23px] placeholder:font-thin";
    return (
            <div className="px-[30px] pt-10 bg-[#dde7f5] pb-24">
                {/* first contact section */}
                <div className="flex gap-5 flex-col md:flex-row">
                    {/* left contact card */}
                    <motion.div 
                        className="bg-white flex flex-col px-8 md:px-16 rounded-2xl justify-start shadow-xl"
                        initial={{translateX: "-100%"}}
                        whileInView={{translateX: 0 }}
                        transition={{duration: 0.7, delay: 0.8, ease: easeInOut}}
                        viewport={{once: true}}
                    >
                        <div className="flex items-center gap-3 border-b pb-7 border-black pt-8">
                            <div >
                                <img src={contact} alt="contact-img"/>
                            </div>
                            <h2 className="text-[20px] md:text-[24px] font-normal text-[#4f5f67]">Contact us for inquiries.</h2>
                        </div>
                        <h2 className="pt-3 md:pt-0 text-[40px] md:text-[70px] uppercase font-light pb-4">contact</h2>
                    </motion.div>
                        
                    {/* right numbers card */}
                    <motion.div 
                        className="flex-1"
                        initial={{translateX: "100%"}}
                        whileInView={{translateX: 0}}
                        transition={{duration: 0.7,  delay: 0.8, ease: easeInOut }}
                        viewport={{once: true}}
                    >
                        <p className="bg-[#dde7f5] shadow-xl font-[400] text-center py-5 mb-6 text-[32px] border-[5px] rounded-3xl border-white ">+5 (123) 456-78-90</p>
                        <p className="bg-[#dde7f5] shadow-xl font-[400] text-center py-5 text-[32px] border-[5px] rounded-3xl border-white ">info@frenzzy.com</p>
                    </motion.div>
                </div>
                {/* form section */}
                <motion.div 
                    className="bg-[#dde7f5] shadow-2xl border-[5px] px-7 rounded-3xl border-white mt-9"
                    initial={{translateY: "30%", opacity: 0}}
                    whileInView={{translateY: 0, opacity: 1 }}
                    transition={{duration: 0.3, delay: 0.9, ease: easeInOut}}
                    viewport={{once: true}}
                >
                    <h2 className="text-[40px] uppercase font-[400] p-5">Send us a Message</h2>
                    <Formik
                         initialValues={{name: "", city: "", email: "", message: ""}}
                        onSubmit={(values, actions) => {
                            console.log(values);
                            actions.setSubmitting(false);
                        }}
                    >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col p-5">
                            <Field className={inputClassName} required type="text" name="name" placeholder="name" />
                            <Field className={inputClassName} required type="address" name="city" placeholder="city"/>
                            <Field className={inputClassName} required type="email" name="email" placeholder="email" />
                            <Field className={`${inputClassName} pt-5 pb-20`} type="text" name="message" required placeholder="message"/>
                            <button type="submit" disabled={isSubmitting} className="ease-in-out bg-black hover:bg-white hover:text-black hover:border-2 hover:border-black w-[150px] font-medium text-[20px] text-center py-4 text-white rounded-xl">
                                Submit
                            </button>
                        </Form>
                    )}
                    </Formik>
                </motion.div>
            </div>
    )
}

export default Contact ;
