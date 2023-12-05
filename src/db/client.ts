import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { GeneralType } from '@/app/page'

export const client = createClient({
	projectId:'6l12l23f',
	dataset:'production',
	apiVersion:'2023-05-03',
	token:'skkFOdI7Jpbd1kdZ00eoc5h3KrTdbpmgQQuLn6kHTteaq0GJgSPVcuK81j8R0FMxHbkethHb1qTBOOc6cC9oOVZQHSe3C5iniEkNhMrol8YiT8MoXWzzDMeY2SZ0cgPRrm9tYmljjKAngaMhIzUW0OYHBQlHWtbzpeuXJO2FyUqenF6uIAvQ',
	useCdn:false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source:any) {
  return builder.image(source)
}

const config = {
	next:{
		revalidate:5
	}
}
export function fetchData<T>(grocQuery:string){
	return client.fetch<T>(grocQuery,undefined,{...config});
}

export function createData(documentType:string, data:any){
	const mutation = {
			_type: documentType,
			...data
	};

	return client.create(mutation)
	
}

export async function mutateData(data:any){
	const idQuery = `*[_type == 'general' && preset == 'main']{
		_id,
		preset,
	}`

	const generalData = await client.fetch(idQuery) as GeneralType[]
	const selectedDocument = generalData[0]
	return client.patch(selectedDocument._id).set(data).commit()
}

