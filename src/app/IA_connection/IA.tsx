const axios = require('axios');

export async function postReq(body: any) {
  try {
    const response = await axios.post("https://fastapi-example-endl.onrender.com/upload-image", { data: body });
    return response.data; // Devuelve los datos de la respuesta correctamente
  } catch (error) {
    console.error(error); // Imprime el error en la consola para depuración
    return 'error'; // Devuelve una cadena indicando que ocurrió un error
  }
}


 
  