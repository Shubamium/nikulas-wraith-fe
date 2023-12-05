'use client'
import React, { useState } from 'react'
import './pathChooser.scss'
type Props = {
	onPathChosen: () => void
}

export default function PathChooser({onPathChosen}: Props) {
	const [pathChoosen, setPathChoosen] = useState(false)
	const pathChoosenHandler = () => {
		setPathChoosen(true)
	}

	const badCount = 120
	const goodCount = 12
	const total = badCount + goodCount
	const badPercentage = badCount / total * 100
	const goodPercentage = goodCount / total * 100
	return (
	<>
		<div className={`path-container ${pathChoosen ? 'choosen' : ''}`}>
			<div className="path-picker">
			<div className="title">
					<h2>Welcome To The <b>Phantom Realm</b>, Spirit!</h2>
					<p>A choice for you to make before you enter.</p>
				</div>
				<div className="paths">
					
					<div className="path good">
						<div className='path-button' onClick={pathChoosenHandler}>
							<svg xmlns="http://www.w3.org/2000/svg" width="136" height="136" viewBox="0 0 136 136" fill="none">
								<circle cx="68" cy="68" r="49" fill="#284E6F"/>
								<circle cx="68" cy="68" r="67.5" stroke="#284E6F"/>
							</svg>
							<p>Do you take <br/> the path of good?</p>
						</div>
					</div>

					<div className="path corruption" onClick={pathChoosenHandler}>
						<div className='path-button'>
							<p>Or the path  <br/>  of C̸̹̋ȏ̸̧r̶̺̀r̸̛͚u̶̹͗p̴̭͝t̶̨̐į̸͆ó̷̥ǹ̶̥?</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="136" height="136" viewBox="0 0 136 136" fill="none">
								<circle cx="68" cy="68" r="49" fill="#284E6F"/>
								<circle cx="68" cy="68" r="67.5" stroke="#284E6F"/>
							</svg>
						</div>
					</div>
					
				</div>
				<div className="path-art">
					<img src="art/nik.png" alt="" className='nik good-nik' />
					<img src="art/cor_nik.png" alt="" className='nik bad-nik' />
				</div>
			</div>
		</div>
		<div className={`path-result ${pathChoosen ? 'choosen' : ''}`}>
		<img src="decor/arrow_small.png" alt="" className='arrow' />
			<p className='good'>{goodCount}</p>
			<div className="bar">
				<div className="good-fill" style={pathChoosen ? {width:''+goodPercentage+'%'} : {}}></div>
				<div className="cor-fill" style={pathChoosen ? {width:''+badPercentage+'%'} : {}}></div>
			</div>
			<p className='corrupt'>{badCount}</p>
		<img src="decor/arrow_small.png" alt="" className='arrow reverse'/>
		</div>
	</>
	)
}