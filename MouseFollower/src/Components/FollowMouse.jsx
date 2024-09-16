import { useEffect,useState } from "react"


export const FollowMouse = () =>{

    const [enable, setEnable] = useState(false)
    const [position, setPosition] = useState({x: 0, y: 0})
  
    useEffect(()=>{
      console.log('effect', {enable})
  
      const handleMove = (event)=>{
        const {clientX, clientY} = event
        console.log('Handlemove', {clientX, clientY})
        setPosition({ x: clientX, y: clientY})
      }
  
      if(enable){
      window.addEventListener('pointermove', handleMove)
      }
      return ()=>{
      console.log('Cleanup')
      window.removeEventListener('pointermove', handleMove)
      }
  }, [enable])

  return(<>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(9, 8, 9, 0.6)',
        borderRadius: '50% solid #fff',
        opacity: 0.8,
        pointerEvents:'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`,

      }}>

      </div>
      <button onClick={()=> setEnable(!enable)}>
      {enable ? 'Desactivar' : 'Activar'}  Seguir puntero
      </button>
      </>
  )
  }