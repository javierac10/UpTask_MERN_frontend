import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Alerta } from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

export const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      setAlerta({
        msg: 'El email es obligatorio',
        error: true
      });
      return;
    }

    try {
      const {data} = await clienteAxios.post(`/usuarios/olvide-password`, { email })
      console.log(data);
      setAlerta({
        msg: data.msg,
        error: false
      });
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
      Recupera tu acceso y no pierdas tus <span className='text-slate-700'>proyectos</span>
    </h1>

    { msg && <Alerta alerta={alerta} />}

    <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
      <div className='my-5'>
        <label htmlFor='email'
          className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
        <input id="email" onChange={ e => setEmail(e.target.value)}
        type="email" placeholder='Email de Regisro' className='w-full mt-3 p-3 border rounded-xl bg-gray-50' />
      </div>
      
      <input type="submit"
      value="Enviar instrucciones "
      className='mb-5 hover:cursor-pointer hover:bg-sky-800 transition-colors bg-sky-700 w-full py-3 text-white uppercase font-bold rounded' />
    </form>

    <nav className='lg:flex lg:justify-between '>
      <Link to="/login"
        className='block text-center my-5 text-slate-500 uppercase text-sm'>
          ¿Ya tienes uan cuenta?, Iniciar sesión</Link>
          <Link to="/registrar"
           className='block text-center my-5 text-slate-500 uppercase text-sm'>
            ¿No tienes una cuenta?, Regístrate</Link>
    </nav>
    </>
  )
}

