import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alerta } from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }
    console.log('Logeando');
    try {
      console.log('try');
      const { data } = await clienteAxios.post('usuarios/login', {
        email, password
      })
      setAlerta({})
      console.log('data', data);
      localStorage.setItem('token', data.token)
      setAuth(data);
      navigate('/proyectos');
    } catch (error) {
      console.log('INGRESA AL CATCH', error);
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
      Inicia sesión y administra <span className='text-slate-700'>proyectos</span>
    </h1>

    { msg && <Alerta alerta={alerta} /> }

    <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
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
      <input type="submit"
      value="Iniciar Sesión"
      className='mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors bg-sky-700 w-full py-3 text-white uppercase font-bold rounded' />
    </form>

    <nav className='lg:flex lg:justify-between '>
      <Link to="/registrar"
        className='block text-center my-5 text-slate-500 uppercase text-sm'>¿No tienes una cuenta?, Regístrate</Link>
    <Link to="/olvide-password"
        className='block text-center my-5 text-slate-500 uppercase text-sm'>Olvidé mi Password</Link>
    </nav>
    </>
  )
}
