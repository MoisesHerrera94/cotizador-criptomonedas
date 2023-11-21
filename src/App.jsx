import { useState, useEffect } from 'react'
import Formulario from './componets/Formulario'
import Resultado from './componets/Resultado'
import Spinner from './componets/Spinner'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'

const Heading = styled.h1`
    font-family:'Lato', sans-serif;
    color: #fff;
    text-align: center;
    font-weight: 700;
    margin-top: 80px;
    margin-bottom: 50px;
    font-size: 34px;

    &::after {
      content:'';
      width: 100px;
      height: 6px;
      background-color: #66a2fe;
      display: block;
      margin: 10px auto 0 auto;
    }
  `

const Imagen = styled.img`
    max-width: 400px;
    width: 80%;
    margin: 100px auto 0 auto;
    display: block;
  `

const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    width: 90%;
    @media (min-width: 992px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
    }
  `
function App() {

  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0){
      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})
        const {moneda, criptoMoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda},EUR`;
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        
        setResultado(resultado.DISPLAY[criptoMoneda][moneda])
        setCargando(false)
      }

      cotizarCripto()
    }
  }, [monedas])
  

  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
        alt='Imagenes Criptomonedas'
      />

      <div>
        <Heading>Cotiza Criptomonedas al Instante.</Heading>
        <Formulario
          setMonedas={setMonedas}
        ></Formulario>

        {cargando && <Spinner/>}
        {resultado.PRICE && <Resultado resultado={resultado}/>}
      </div>
    </Contenedor>
  )
}

export default App
