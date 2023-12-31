import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


export const PreviewProyecto = ({proyecto}) => {
    const {auth } = useAuth();
    const { nombre, _id, cliente, creador } = proyecto


    return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
        
        <div className="flex items-center gap-2">
            <p className="flex-1">
                {nombre}
                <span className="text-sm text-gray-500 uppercase pl-1">
                    {''} {cliente}</span>
            </p>
            {auth._id !== creador &&  (
            <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">Colaborador</p>)}
        </div>
        
        <Link to={`${_id}`}
        className="text-gray-600 font-bold cursor-pointer 
        hover:text-gray-800 text-sm uppercase">Ver Proyecto</Link>
    </div>
  )
}
