import React, { useRef, useState } from 'react'
import './contact.css'
import emailjs from 'emailjs-com';

const Contact = () => {
    const formRef =  useRef()
    const [done, setDone] = useState(false)
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject ,setSubject] = useState("");
    const [message, setMessage] = useState("");

   
    const handleSubmit = (e) =>{
        e.preventDefault()
 
        emailjs.sendForm('service_pwxtyon', 'template_232i2kv', formRef.current, 'user_gfZyqBaSrcJOLE25y0LE5')
        .then((result) => {
            setEmail("");
            setName("");
            setMessage("");
            setSubject("")
            setDone(true)

        }, (error) => {
            console.log(error.text);
        });
    }
    return (
        <div className='crypto__contact'>
            {
                 done && (<div className='crypto__thank'>Thanks, for contacting us</div>)
            }
            <h1 className='crypto__heading'><span>Contact</span> Us</h1>

            <form className='crypto__form' ref={formRef} onSubmit={handleSubmit}>
                <input type="text" placeholder='your name' className='crypto__box' value={name} name='user_name'  onChange={(e) => setName(e.target.value)} required/>
                <input type="email" placeholder='your email' className='crypto__box'  value={email} name='user_email' onChange={(e) => setEmail(e.target.value)} required/>
                <input type="text" placeholder='Subject' className='crypto__box' value={subject}  name='user_subject' onChange={(e) => setSubject(e.target.value)} required/>
                <textarea className='crypto__box' placeholder='your message' required cols='30' rows='10' value={message} name='message' onChange={(e) => setMessage(e.target.value)}/>
                <input type="submit" value="send message" className='crypto__btn' />
            </form>
        </div>
    )
}

export default Contact
