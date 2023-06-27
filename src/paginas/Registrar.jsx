import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alerta } from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

export const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los passwords no son iguales',
        error: true
      })
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: 'El password es muy corto agrega mínimo 6 caracteres',
        error: true
      })
      return;
    }
    
    setAlerta({});
    
    try {
      const { data } = await clienteAxios.post(`/usuarios`,
        {
          nombre,
          email,
          password
        })

        setAlerta({
          msg: data.msg,
          error: false
        });

        setNombre('')
        setEmail('')
        setPassword('')
        setRepetirPassword('')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }

  const { msg } = alerta;

  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl'>
      Crea tu cuenta y Administra tus <span className='text-slate-700'>proyectos</span>
    </h1>
    { msg && <Alerta alerta={alerta} /> }
    <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
    <div className='my-5'>
        <label htmlFor='nombre'
          className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
        <input id="nombre" onChange={e => setNombre(e.target.value)}
        type="nombre" placeholder='Tu nombre' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
      </div>
      <div className='my-5'>
        <label htmlFor='email'
          className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
        <input id="email" onChange={e => setEmail(e.target.value)}
        type="email" placeholder='Email de Regisro' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
      </div>
      <div className='my-5'>
        <label htmlFor='password'
          className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
        <input id="password" onChange={e => setPassword(e.target.value)}
        type="password" placeholder='Password de Regisro' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
      </div>
      <div className='my-5'>
        <label htmlFor='password2'
          className='uppercase text-gray-600 block text-xl font-bold'>Repetir Password</label>
        <input id="password2" onChange={e => setRepetirPassword(e.target.value)}
        type="password" placeholder='Repite tu Password' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
      </div>

      <input type="submit"
      value="Crear cuenta"
      className='mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors bg-sky-700 w-full py-3 text-white uppercase font-bold rounded' />
    </form>

    <nav className='lg:flex lg:justify-between '>
      <Link to="/login"
        className='block text-center my-5 text-slate-500 uppercase text-sm'>
          ¿Ya tienes uan cuenta?, Iniciar sesión</Link>
    <Link to="/olvide-password"
        className='block text-center my-5 text-slate-500 uppercase text-sm'>Olvidé mi Password</Link>
    </nav>
    </>
  )
}

