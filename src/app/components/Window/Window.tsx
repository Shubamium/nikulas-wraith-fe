import React from 'react'
import './window.scss'
type WindowProps = {
	header?: string,
	children: React.ReactNode
}

export default function Window({header = 'Terminal',children}: WindowProps) {

	return (
		<div className="window-container">
			<div className="window-header">
				<h2>{header}</h2>
				<img src="/decor/window_decor.png" alt="" />
			</div>
			<div className="window-body">
					{children}
			</div>
		</div>
	)
}