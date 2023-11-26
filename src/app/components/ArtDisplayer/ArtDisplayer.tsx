'use client'
import { useState } from 'react'
import './artDisplayer.scss'

type artDisplayerProps = {
	images: string[]
}
export default function ArtDisplayer({images}:artDisplayerProps) {
	// const [activeImg,setActiveImg] = useState('')
	const [imgId, setImgId ] = useState(0)

	const handleNext = ()=>{
		if(images.length > 0)
		setImgId((imgId) => (imgId+1)%images.length)
	}
	const handlePrev = ()=>{
		if(images.length > 0)
		setImgId((imgId) => ((imgId-1)+ images.length) % images.length)
	}
	return (
		<div className="art-displayer">
			<div className="art-container">
				<img src={images[imgId]} alt="" />
			</div>
			<div className="controls">
				<p onClick={handlePrev}>{'<< Previous'}</p>
				<b>{imgId}</b>
				<p onClick={handleNext}>{'Next >>'}</p>
			</div>
		</div>
	)
}