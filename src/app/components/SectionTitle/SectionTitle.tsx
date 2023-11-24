import React from 'react'
import './sectionTitle.scss'

type SectionTitleProps = {
	directory:string,
	run:string | React.ReactNode,
}

export default function SectionTitle({directory,run}: SectionTitleProps) {
	return (
		<div className='section-title container'>
			<p className="directory">
				{directory}
			</p>
			<p className="run-command">
				{run} <span className='cursor'>_</span>
			</p>
		</div>
	)
}