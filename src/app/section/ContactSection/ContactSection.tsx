import React from 'react'
import './contactSection.scss'
import Window from '@/app/components/Window/Window'
import SectionTitle from '@/app/components/SectionTitle/SectionTitle'

export default function ContactSection() {

	return (
		<section id="contacts">
				<Window header='Contacts'>
					<SectionTitle contained={true} directory='C:/Users/NikulasWraith/Project_Phantom/Nik.exe' description='Write your message here to me Spirit, and I shall respond' run={<>{'run >>'} <b>contact-form</b>.bat</>}/>
					<form className='contact-form container'>
						<div className="form-field">
							<label htmlFor="name">Enter your Name:</label>
							<input type="text" name="name" id="name" className='field'  placeholder='Your Name' required/>
						</div>
						<div className="form-field">
							<label htmlFor="email">Enter your e-mail:</label>
							<input type="text" name="name" id="email" className='field'  placeholder='email@gmail.com' required/>
						</div>
						<div className="form-field">
							<label htmlFor="messages">Message:</label>
							<textarea name="messages" id="messages" placeholder='Write your message here' required></textarea>
						</div>
						<button type='submit'>Send</button>
					</form>
				</Window>
				
		</section>
	)
}