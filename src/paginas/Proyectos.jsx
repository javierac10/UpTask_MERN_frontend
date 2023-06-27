import { useEffect } from 'react'
import { PreviewProyecto } from '../components/PreviewProyecto';
import useProyectos from '../hooks/useProyectos'

export const Proyectos = () => {
    const { proyectos, alerta } = useProyectos();

    const { msg } = alerta;
  return (
    <>
    <h1 className='text-4xl font-black'>Proyectos</h1>


   {  msg && alerta.error && <Alerta alerta={alerta} /> }

    <div className='bg-white shadow mt-10 rounded-lg '>
        { proyectos.length > 0 ? 
            proyectos.map(proyecto => (

                <PreviewProyecto
                    key={proyecto._id}
                    proyecto={proyecto}

                 />
            ))
        : <p className='text-gray-600 p-5 uppercase'>No hay proyectos aún</p>}
    </div>
    </>
  )
}
