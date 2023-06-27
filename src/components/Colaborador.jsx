import useProyectos from "../hooks/useProyectos";



export const Colaborador = ({colaborador}) => {
  const { nombre, email } = colaborador;

  const { handleModalEliminarColaborador, modalEliminarColaborador } = useProyectos();
  return (
    <div className='border-b p-5 flex justify-between items-center'>
      <div className=''>
        <p>{nombre}</p>
        <p className='text-sm text-gray-700'>{email}</p>
      </div>
      <div className=''>
        <button
          onClick={() => handleModalEliminarColaborador(colaborador)}
          className='bg-red-600 px-4 py-3 text-white
          uppercase font-bold rounded-lg text-sm
          hover:bg-red-400'>Eliminar</button>
      </div>
    </div>
  )
}
