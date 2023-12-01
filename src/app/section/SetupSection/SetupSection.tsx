import React from 'react'
import './setupSection.scss'
import SectionTitle from '@/app/components/SectionTitle/SectionTitle'

export default function SetupSection() {
	
	return (
		<section id="setup">
			<img src="/decor/connect1.png" alt="" className='decor' />
			<div className="setup-container glowHover ">
				<img src="/decor/arrow_small.png" alt="" className='decor_small_arrow'   />
				<SectionTitle directory='' run={"View >> System/Specs/Hardware_Software"} description={'Some text here about this section'}/>
				<div className="spec">
					<p className='spec-text'> <b>{'O/S >>'}</b> Windows 11 x64</p>
					<p className='spec-text'> <b>{'CPU >>'}</b> Intel Core i9 13900 24 Cores 5.20 GHz</p>
					<p className='spec-text'> <b>{'GPU >>'}</b> Gigabyte GeForce RTX 4070 Gaming OC 12G Graphics Card</p>
					<p className='spec-text'> <b>{'MOTHERBOARD >>'}</b> ASUS ROG Strix B760-I Gaming WiFi Intel® B760 (ITX Board)</p>
					<p className='spec-text'> <b>{'PSU >>'}</b> Cooler Master V850 SFX Gold Full Modular 850W</p>
					<p className='spec-text'> <b>{'RAM >>'}</b> G.SKILL Trident Z5 RGB Series (Intel XMP 3.0) DDR5 RAM 96GB (2x48GB) 6800MT/s</p>
					<p className='spec-text'> <b>{'CASE >>'}</b> Cooler Master NR200P MAX</p>
				</div>
			</div>
		</section>
	)
}