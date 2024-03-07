'use client'
import React, { useEffect } from 'react'
import HeroSection from '../section/HeroSection/HeroSection'
import TimeSyncSection from '../section/TimeSyncSection/TimeSyncSection'
type Props = {}

export default function Stream({}: Props) {
	useEffect(() => {
		document.body.classList.add('loaded')
	},[])
	return (
		<main id="container_home">
			<HeroSection activeNav='stream' />
			<TimeSyncSection/>
		</main>
	)
}