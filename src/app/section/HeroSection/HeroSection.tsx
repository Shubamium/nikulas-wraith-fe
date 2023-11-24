import './heroSection.scss'
export default function HeroSection() {
	return (
		<section id="container_hero">
			<h1 style={{display:'none'}}>Nikulas Wraith</h1>

			<div className="display">
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
				<div className="section-title">
					<p>C:/Users/NikulasWraith/Project_Phantom/Nik.exe</p>
				</div>
				<nav>

				</nav>
			</header>
		</section>
	)
}