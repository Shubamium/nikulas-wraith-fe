import 'react'
import SectionTitle from '@/app/components/SectionTitle/SectionTitle'
import './heroSection.scss'
export default function HeroSection() {
	return (
		<section id="container_hero">
			<h1 style={{display:'none'}}>Nikulas Wraith</h1>

			<div className="display" id='top'>
				<div className="bg-binary"></div>
				<div className="niks">
					<img src="/art/nik-art-center.png" alt="" className='nik-center' />
					{/* <img src="art/nik.png" alt="" className='nik' /> */}
					<img src="decor/frame-main.png" alt="" className='frame-main' />
					{/* <img src="art/cor_nik.png" alt="" className='cor-nik' /> */}
				</div>


				<div className="logo-container">
					<img src="decor/main_logo.png" alt="" className='main-logo' />
				</div>
				<div className="header-frame">
					<img src="/decor/header_l.png" alt="" />
					<img src="/decor/header_r.png" alt="" />
				</div>
			</div>
			
			<header className='header'>
				<div className="decor-stripe">
					
				</div>
				<SectionTitle
				contained={true}
					directory='C:/Users/NikulasWraith/Project_Phantom/Nik.exe'
					run={(<> {'run >>'} <b>navigation</b>.bat </>)}
				/>
				<nav className='navigation'>
						<a href="#about" className='selected'>About</a> ||
						<a href="#showcase" >Showcase</a> ||
						<a href="#schedules" >Schedules</a> ||
						<a href="#artwork" >Artwork</a> ||
						<a href="#setup" >Setup</a> ||
						<a href="#socials" >Socials</a> 
				</nav>
			</header>
		</section>
	)
}