import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import { Alerta } from "./Alerta";


export const FormularioProyecto = () => {

    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');

    const params = useParams();
    const { proyecto } = useProyectos();

    useEffect(() => {
        if (params.id &&  proyecto.nombre) {
            console.log('user', proyecto);
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)

        }
    }, [params])
    
    const { mostrarAlerta, alerta, submitProyecto } = useProyectos();

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        // Mandando los datos hacia el provider
        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });

        setId(null);
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('')

    }

    const  { msg } = alerta;

  return (
    <form className='bg-white py-10 px-5 md_w-1/2 rounded-lg shadow'
    onSubmit={handleSubmit}>

        { msg && <Alerta alerta={alerta} />}

        <div className="mb-5">
            <label 
            className='text-gray-700 uppercase font-bold text-sm' 
            htmlFor="nombre">
                Nombre Proyecto
            </label>
            <input type="text"
            id="nombre"
            placeholder='Nombre del Proyecto'
            className='border w-full p-2 mt-2 
            placehoder-gray-400 rounded-md'
            value={nombre}
            onChange={e => setNombre(e.target.value)} />
        </div>
        <div className="mb-5">
            <label 
            className='text-gray-700 uppercase font-bold text-sm' 
            htmlFor="descripcion">
                Descripción
            </label>
            <textarea
            id="descripcion"
            placeholder='Descripcion del Proyecto'
            className='border w-full p-2 mt-2 
            placehoder-gray-400 rounded-md'
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)} />
        </div>
        <div className="mb-5">
            <label 
            className='text-gray-700 uppercase font-bold text-sm' 
            htmlFor="fecha-entrega">
                Fecha de Entrga
            </label>
            <input
            id="fecha-entrega"
            type="date"
            placeholder='Fecha de Entrega del Proyecto'
            className='border w-full p-2 mt-2 
            placehoder-gray-400 rounded-md'
            value={fechaEntrega}
            onChange={e => setFechaEntrega(e.target.value)} />
        </div>
        <div className="mb-5">
            <label 
            className='text-gray-700 uppercase font-bold text-sm' 
            htmlFor="cliente">
                Nombre del Cliene
            </label>
            <input
            id="cliente"
            placeholder='Cliente del Proyecto'
            className='border w-full p-2 mt-2 
            placehoder-gray-400 rounded-md'
            value={cliente}
            onChange={e => setCliente(e.target.value)} />
        </div>

        <input type="submit" 
        value={ proyecto._id ? "Editar Proyecto" : "Crear Proyecto"} 
        className="bg-sky-600 w-full p-3 
        uppercase text-white rounded cursor-pointer hover:bg-sky-700 transtion-colors" />
    </form>
  )
}
