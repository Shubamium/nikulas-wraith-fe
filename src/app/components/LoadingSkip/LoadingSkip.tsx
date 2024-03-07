'use client'
import React, { useEffect } from 'react'

type Props = {}

export default function LoadingSkip({}: Props) {
	useEffect(() => {
		document.body.classList.add('loaded')
	},[])
	return (
		<></>
	)
}