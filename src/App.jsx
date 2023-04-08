import { useEffect, useState } from 'react';

import './App.css';

const FACTS_API_URL = 'https://catfact.ninja/fact';
const CATS_API_URL = 'https://cataas.com/cat/says';
const CAT_PREFIX_IMG_URL = 'https://cataas.com';

function App() {

  const [randomFact, setRandomFact] = useState();
  const [catImage, setCatImage] = useState();

  useEffect(() => {

    const getRandomFact = async () => {

      try {
        const factResponse = await fetch(FACTS_API_URL);
        if (!factResponse.ok) throw new Error('Error al obtener el random fact');

        const dataFact = await factResponse.json();
        const fact = dataFact.fact;

        setRandomFact(fact);

        const firstWord = fact.split(' ')[0];
        /** obtener las 3 primeras palabras
         * const firstThreeWords = fact.split(' ').slice(0, 3).join(' ');
         */
        const catResponse = await fetch(`${CATS_API_URL}/${firstWord}?json=true`);
        if (!catResponse.ok) throw new Error('Error al obtener la imagen del gato');

        const dataCat = await catResponse.json();
        setCatImage(`${CAT_PREFIX_IMG_URL}${dataCat.url}`);

      } catch (error) {
        //entra al catch tanto si hay error con la respuesta 
        //como si hay un error con la peticion
        console.error(error);
      }
    }

    getRandomFact();

  }, [])

  /**
   * OTRA FORMA DE HACERLO SIN ASYNC AWAIT
   * useEffect(() => {
   * 
   * fetch(FACTS_API_URL)
   *  .then(response => response.json())
   *  .then(data => setRandomFact(data.fact))
   * 
   * }, [])
   */

  /**
   * DIVIDIR LOS USEEFFECT PARA TENER UNA RESPONSABILIDAD POR EFECTO
   * useEffect( () => {

      const getRandomFact = async () => {
        const factResponse = await fetch(FACTS_API_URL);
        const dataFact = await factResponse.json();
        const fact = dataFact.fact;
        setRandomFact(fact);        
      }

      getRandomFact();
      }, [])

    useEffect( () => {

      if(!randomFact) return;

      const getCatImage = async () => {
        const firstWord = fact.split(' ')[0];
        const catResponse = await fetch(`${CATS_API_URL}/${firstWord}?json=true`);
        const dataCat = await catResponse.json();
        setCatImage(`${CAT_PREFIX_IMG_URL}${dataCat.url}`);
      }

      getCatImage();
    }, [randomFact])
    
   */

  return (
    <main>
      <h1>Kitten App</h1>
      {/* <section> */}
      {randomFact && <p>{randomFact}</p>}
      <img src={catImage} alt={`Image extracted using the first word of ${randomFact}`} />
      {/* </section>    */}
    </main>
  )
}

export default App;
