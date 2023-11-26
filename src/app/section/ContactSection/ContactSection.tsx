import React from 'react'
import './contactSection.scss'
import Window from '@/app/components/Window/Window'
import SectionTitle from '@/app/components/SectionTitle/SectionTitle'

export default function ContactSection() {

	return (
		<section id="contacts">
				<Window header='Contacts'>
					<SectionTitle directory='C:/Users/NikulasWraith/Project_Phantom/Nik.exe' run={<>{'run >>'} <b>contact-form</b>.bat</>}/>
					<form className='contact-form'>
						<div className="form-field">
							<label htmlFor="name">Enter your Name:</label>
							<input type="text" name="name" id="name" className='field' />
						</div>
						<div className="form-field">
							<label htmlFor="email">Enter your e-mail:</label>
							<input type="text" name="name" id="email" className='field' />
						</div>
						<div className="form-field">
							<label htmlFor="messages">Message {'->'}:</label>
							<textarea name="messages" id="messages"></textarea>
						</div>
						<button type='submit'>Send</button>
					</form>
				</Window>
				
		</section>
	)
}