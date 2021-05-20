import { fetchFunction } from "../../app/helpers/fetch";

// probando que la funcion que realiza mis peticiones
// este funcionando correctamente
describe('Pruebas en el helper fetch', () => {

	test('el fetch debe de funcionar', async() => {
		const resp = await fetchFunction('tasks');

		// se espera que la peticion se una instancia de Response
		expect(resp instanceof Response).toBe(true)

		// el ok que me trae la respuesta debe ser true
		// eso quire decir que la petición se hizo bien
		const body = await resp.json();

		expect(body.ok).toBe(true);
	});

});
