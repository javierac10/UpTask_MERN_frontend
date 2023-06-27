import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alerta } from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

export const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [passwordModificado, setPasswordModificado] = useState(false)
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const { token } = useParams();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const { data } = await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true);
      } catch (error) {
        console.log(error.response);
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    return () => { comprobarToken() }
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: 'El password debe ser mínimo de 6 caracteres',
        error: true
      })
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`;
      const { data } = await axios.post(url, { password })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl'>
      Restablece tu password y no pierdas tus <span className='text-slate-700'>proyectos</span>
    </h1>

    { msg && <Alerta alerta={alerta} /> }

    { tokenValido && (
    <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
      <div className='my-5'>
        <label htmlFor='password'
          className='uppercase text-gray-600 block text-xl font-bold'>Nuevo Password</label>
        <input id="password" onChange={ e => setPassword(e.target.value)}
        type="password" placeholder='Escribe tu nuevo password' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
      </div>
      <input type="submit"
      value="Guardar nuevo password"
      className='mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors bg-sky-700 w-full py-3 text-white uppercase font-bold rounded' />
    </form>) }
    

    { passwordModificado && (
      <Link to="/"
        className='block text-center my-5 text-slate-500 uppercase text-sm'>Inicia sesión</Link>
    ) }
    </>
  )
}
