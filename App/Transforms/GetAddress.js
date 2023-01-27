import {create} from 'apisauce'

/**
 * Get Address
 */

export default (zip: string) => {

  const api = create({
	  baseURL: 'https://viacep.com.br/ws/',
	  headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
	})

	
	return api
	  .get(`${zip}/json/`)
	  .then((response) => {
	  	return {
				street: response.data.logradouro,
  			district: response.data.bairro,
  			city: response.data.localidade,
  			state: response.data.uf,
			}
		})
}