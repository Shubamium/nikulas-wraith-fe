import React from 'react'
import './pathChooser.scss'
type Props = {
	onPathChosen: () => void
}

export default function PathChooser({onPathChosen}: Props) {
	return (
		<div className='path-container'>
				<h2>Welcome To The Phantom Realm, Spirit!</h2>
				<p>A choice for you to make before you enter.</p>

				<div className="paths">
					
					<div className="path good">
						<div className='path-button'>
							<svg xmlns="http://www.w3.org/2000/svg" width="136" height="136" viewBox="0 0 136 136" fill="none">
								<circle cx="68" cy="68" r="49" fill="#284E6F"/>
								<circle cx="68" cy="68" r="67.5" stroke="#284E6F"/>
							</svg>
							<p>Do you take <br/> the path of good?</p>
						</div>
					</div>

					<div className="path corruption">
						<div className='path-button'>
							<p>Or the path  <br/>  of C̸̹̋ȏ̸̧r̶̺̀r̸̛͚u̶̹͗p̴̭͝t̶̨̐į̸͆ó̷̥ǹ̶̥?</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="136" height="136" viewBox="0 0 136 136" fill="none">
								<circle cx="68" cy="68" r="49" fill="#284E6F"/>
								<circle cx="68" cy="68" r="67.5" stroke="#284E6F"/>
							</svg>
						</div>
					</div>
				</div>
		</div>
	)
}