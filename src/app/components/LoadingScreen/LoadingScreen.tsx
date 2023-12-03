'use client'
import React, { useEffect, useRef, useState } from 'react'
import './loadingScreen.scss'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export default function LoadingScreen({}) {

	const [isLoaded, setIsLoaded] = useState(false)
	const [canPower, setCanPower] = useState(false)
	const [isSplashing , setIsSplashing] = useState(false)
	const [remove , setRemove] = useState(false)
	const audioRef = useRef<HTMLAudioElement>(null)
	useEffect(()=>{
		window.addEventListener('DOMContentLoaded',()=>{
			console.log('load')
			console.error('hey')
		})
		setTimeout(()=>{
			setCanPower(true)
		},6000)
		// setTimeout(()=>{
			// setIsLoaded(true)
		// },10000)
	},[])

	const handleClearLoading = () => {
		setIsSplashing(true)
		audioRef.current?.play()
		setTimeout(()=>{
			setIsLoaded(true)
			setTimeout(()=>{
				document.body.classList.add('loaded')
				setRemove(true)
			},1000)
		},1000)
	}

	if(remove) return <></>
	return (
		<div className={`loading-screen ${isLoaded ? 'loaded' : ''}`}>
			<div className="decor_frame top">
				<p> {'>'} Initializing connection to the Phantom Realm server... </p>
				<p> {'>'} Connecting to the Phantom Realm network...</p>
				<p> {'>'} Connection established. Preparing for secure login.</p>
				<p>{'>'} Loading Nik.exe</p>
				<p> {'>'} [INFO] Loading Complete</p>
				<p> {'>'} Initializing Path Selector <FaArrowRight/> </p>
			</div>
			<div className="decor_frame bottom"></div>
			<svg width="2692" height="1493" viewBox="0 0 2692 1493" fill="none"  className='connection' xmlns="http://www.w3.org/2000/svg">
				<g id="connection_group">
				<path id="right" d="M2692 473H2040.12V1132H1563.21H0" stroke="#AFD9FD"/>
				<path id="top" d="M1043 0.5V268.5H1611.5V167H2393" stroke="#AFD9FD"/>
				<path id="left" d="M24 358H426V1239H645V1492.5H633" stroke="#AFD9FD"/>
				</g>
			</svg>

			<div className={`loading-bar ${canPower ? 'on' : 'off'}`}>
				<div className="bar-container">
					<div className="top">
						<p>Connecting . . . </p>
					</div>

					<div className="bar">
						<div className="fill-bar">
							<div className="fill"></div>
							<div className="fill"></div>
							<div className="fill"></div>
							<div className="fill"></div>
							<div className="fill"></div>
							<div className="fill"></div>
							<div className="fill"></div>
						</div>
					</div>
				</div>
				<div className="power-container" onClick={handleClearLoading}>
					<div className={`splash ${isSplashing ? 'splashing' : ' '}`}></div>

					<svg className='power' xmlns="http://www.w3.org/2000/svg" width="394" height="394" viewBox="0 0 394 394" fill="none">
						<path d="M197 0.555542C158.147 0.555542 120.167 12.0768 87.8615 33.6624C55.5564 55.248 30.3776 85.9284 15.5092 121.824C0.64078 157.719 -3.24947 197.218 4.33038 235.324C11.9102 273.431 30.6198 308.434 58.093 335.907C85.5662 363.38 120.569 382.09 158.676 389.67C196.782 397.25 236.281 393.359 272.176 378.491C308.072 363.623 338.752 338.444 360.338 306.139C381.923 273.834 393.445 235.853 393.445 197C393.445 144.9 372.748 94.9333 335.907 58.0928C299.067 21.2523 249.101 0.555542 197 0.555542ZM197.737 217.627C195.663 217.643 193.606 217.248 191.685 216.466C189.764 215.683 188.017 214.528 186.545 213.067C185.072 211.606 183.904 209.868 183.106 207.954C182.309 206.039 181.898 203.985 181.899 201.911V82.2028C181.899 78.0022 183.567 73.9736 186.537 71.0034C189.508 68.0331 193.536 66.3644 197.737 66.3644C201.937 66.3644 205.966 68.0331 208.936 71.0034C211.907 73.9736 213.575 78.0022 213.575 82.2028V201.911C213.575 203.985 213.165 206.039 212.367 207.954C211.57 209.868 210.401 211.606 208.929 213.067C207.457 214.528 205.71 215.683 203.789 216.466C201.868 217.248 199.811 217.643 197.737 217.627ZM197 317.199C171.141 317.505 145.86 309.539 124.848 294.463C103.836 279.386 88.1922 257.989 80.1995 233.394C72.2067 208.799 72.2836 182.293 80.4187 157.745C88.5539 133.196 104.322 111.89 125.421 96.9361C129.096 94.3166 133.653 93.2476 138.11 93.9597C142.566 94.6718 146.564 97.108 149.24 100.742C150.546 102.537 151.484 104.572 152 106.731C152.516 108.89 152.599 111.13 152.245 113.321C151.891 115.513 151.107 117.612 149.938 119.499C148.769 121.386 147.238 123.023 145.434 124.316C133.297 133.228 123.647 145.101 117.401 158.802C111.155 172.503 108.523 187.575 109.756 202.582C110.988 217.589 116.043 232.03 124.44 244.528C132.837 257.027 144.296 267.166 157.723 273.98C171.151 280.794 186.1 284.054 201.145 283.451C216.19 282.848 230.83 278.401 243.669 270.535C256.508 262.668 267.118 251.644 274.488 238.514C281.858 225.383 285.741 210.584 285.769 195.527C285.727 181.653 282.361 167.992 275.953 155.687C269.544 143.382 260.279 132.793 248.935 124.807C245.442 122.05 243.184 118.021 242.654 113.603C242.125 109.185 243.368 104.737 246.111 101.233C248.823 97.6376 252.839 95.2501 257.293 94.5842C261.747 93.9183 266.285 95.0274 269.93 97.6728C290.809 112.798 306.325 134.183 314.229 158.723C322.132 183.264 322.01 209.685 313.882 234.152C305.754 258.619 290.041 279.86 269.024 294.793C248.007 309.726 222.779 317.574 197 317.199Z" fill="#AFD9FD"/>
					</svg>
					<p>{'>> Enter The Phantom Realm <<'}</p>
					<audio src='audio/beep.mp3' loop={false} autoPlay={false} ref={audioRef}/>
				</div>
			</div>
			
		</div>
	)
}