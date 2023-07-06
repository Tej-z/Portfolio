import React, { useState } from 'react'
import './contact.css'
import { FaRegAddressBook, FaRegUser, FaRegEnvelope, FaRegMap } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
    const [form, setForm] = useState({
        name: '', 
        email: '', 
        subject:'',     
        message: ''});
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(
                'https://sheet.best/api/sheets/d904558e-dfcb-4d15-ae1b-ee806f9aa50e',
                 form
        )
        .then((response) => { console.log(response);
            setForm({ name: '' , email: '' , subject: '' , message: '' })
        });
    };

  return (
    <section className='contact section' id='contact'>
        <h2 className='section_title text-cs'>Contact Me</h2>

    <div className='contact_container container grid'>
        <div className='contact_content'>
            <div className='contact_card'>
                <span className='contact_card-icon'>
                    <FaRegMap />
                </span>

                <h3 className='contact_card-title'>Address</h3>
                <p className='contact_card-data'>why my address nigger</p>
            </div>

            <div className='contact_card'>
                <span className='contact_card-icon'>
                    <FaRegUser />
                </span>

                <h3 className='contact_card-title'>Freelance</h3>
                <p className='contact_card-data'>Not available RN</p>
            </div>

            <div className='contact_card'>
                <span className='contact_card-icon'>
                    <FaRegEnvelope />
                </span>

                <h3 className='contact_card-title'>Email</h3>
                <p className='contact_card-data'>tejasr0810@gmail.com</p>
            </div>

            <div className='contact_card'>
                <span className='contact_card-icon'>
                    <FaRegAddressBook />
                </span>

                <h3 className='contact_card-title'>Phone</h3>
                <p className='contact_card-data'>+91 9141919397</p>
            </div>
        </div>

        <form className='contact_form' onSubmit={handleSubmit}>
            <div className='contact_form-group'>
                <div className='contact_form-div'>
                    <label className='contact_form-tag'>
                        Your full Name <b>*</b>
                    </label>
                    <input type='text' name='name' onChange={handleChange} value ={ form.name } className='contact_form-input' />
                </div>

                <div className='contact_form-div'>
                    <label className='contact_form-tag'>
                        Your Email Address <b>*</b>
                    </label>
                    <input type='email' name='email' onChange={handleChange} value ={ form.email } className='contact_form-input' />
                </div>

                <div className='contact_form-div'>
                    <label className='contact_form-tag'>
                        Your Subject <b>*</b>
                    </label>
                    <input type='text' name='subject' onChange={handleChange} value ={ form.subject } className='contact_form-input' />
                </div>

                <div className='contact_form-div contact_form-area'>
                    <label className='contact_form-tag text-cs'>
                        Your Message <b>*</b>
                    </label>
                    <textarea name='message' onChange={handleChange} value ={ form.message }className='contact_form-input' ></textarea>
                </div>

                
            </div>
            <div className="contact_submit">
                <p>* Accept the Terms and Conditions.</p>
                <button type='submit' className='btn text-cs'>Send Message</button>
            </div>
        </form>
    </div>
    </section>
  )
}

export default Contact