import { useState, useEffect } from "react";

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/says';

export function App() {
  const [fact, setFact] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Obtener el hecho aleatorio de gatos
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data;
        setFact(fact);

        // Obtener las primeras tres palabras del hecho
        const threeFirstWords = fact.split(' ', 3).join(' ');
        console.log('Tres primeras palabras:', threeFirstWords);

        // Formar manualmente la URL de la imagen
        const constructedUrl = `${CAT_PREFIX_IMAGE_URL}/${threeFirstWords}?size=50&color=red&json=true`;

        // Intentar obtener la imagen con la URL construida
        fetch(constructedUrl)
          .then(res => res.json())
          .then(response => {
            console.log('Respuesta de la API de Cataas:', response);
            if (response && response.tags) { // Verificar si tiene tags o cualquier campo que sirva
              const fullImageUrl = `${CAT_PREFIX_IMAGE_URL}/${threeFirstWords}?size=50&color=red`;
              setImageUrl(fullImageUrl);  // Formar manualmente la URL de la imagen
            } else {
              console.error('Error: La respuesta no contiene el campo "url" pero tiene otra data.');
            }
          })
          .catch(error => {
            console.error('Error al obtener la imagen de Cataas:', error);
          });
      })
      .catch(error => {
        console.error('Error al obtener el hecho del gato:', error);
      });
  }, []);

  return (
    <main>
      <h1>Generador de imágenes de gatos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl ? (
        <img src={imageUral} alt={`Imagen generada usando las primeras tres palabras del hecho: ${fact}`} />
      ) : (
        <p>Cargando imagen...</p>
      )}
    </main>
  );
}
