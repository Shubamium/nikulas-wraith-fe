import React from 'react'
import './supportSection.scss'
import Window from '@/app/components/Window/Window'

export default function SupportSection() {

	return (
		
		<section id="support">
			<div className="decor">
			<img src="/decor/connect2.png" alt="" className='decor_text' />
			</div>
			<div className="support-container container">
				<div className="support-part">
					<Window header='Support Me'>
						<img src="/decor/placeholder_support.png" alt="" className='support-art' />
						<p>{'>'} Some text about it here</p>
					</Window>
				</div>
				<div className="media-part">
						<div className="media">
							<img src="/decor/support_text.png" alt="" className='decor_text' />
							<div className="media-logo">
								<img src="decor/ko-fi_logo.png" alt="" />
							</div>
							<div className="details">
							<h2>Ko-Fi</h2>
							<p>{'>>'} <a href="https://ko-fi.com/nikulaswraith" target='_blank'>https://ko-fi.com/nikulaswraith</a></p>
							</div>
						</div>
						<div className="media">
							<img src="/decor/support_text.png" alt="" className='decor_text' />
							<div className="media-logo">
								<img src="decor/throne_logo.png" alt="" />
							</div>
							<div className="details">
							<h2>Ko-Fi</h2>
							<p>{'>>'} <a href="https://ko-fi.com/nikulaswraith" target='_blank'>https://ko-fi.com/nikulaswraith</a></p>
							</div>
						</div>
				</div>
			</div>
			<div className="bottom-connect">
				<img src="/decor/connect3.png" alt="" className='' />
			</div>
		</section>
	)
}