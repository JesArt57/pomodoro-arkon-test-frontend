const baseUrl = process.env.REACT_APP_API_URL;

// con esta funcion hago mis peticiones a API
// recibe el nombre del endpoint
// la data si es necesaria y el metodo http que por default es un GET
// extraigo la base de la URL de las variables de entorno
export function fetchFunction(endpoint, data, method = 'GET') {

	const url = `${baseUrl}/${endpoint}`;

	if(method === 'GET') {
		return fetch(url);
	}

	return fetch(url, {
		method,
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(data)
	});

}
