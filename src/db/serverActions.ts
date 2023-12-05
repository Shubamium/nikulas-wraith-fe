'use server'
import { mutateData } from "./client"

export const updatePath = async(path:string,good:number,bad:number) =>{
	console.log('dataselected',good,bad)
	mutateData({
		stats:{
			good: good + (path === 'good' ? 1 : 0),
			bad: bad + (path === 'bad' ? 1 : 0)
		}
	})
	.then(()=>{
		console.log('path choosen')
	})
}