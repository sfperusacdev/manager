import { MdSecurity } from 'react-icons/md'
import { useLogin } from './hooks/useLogin'
import { BACKGROUND_AGRICOLA, LOGO_SF } from '../../assets'
import { use100vh } from 'react-div-100vh'
import { Spinner } from '../../components/Spinner'
export const LoginPage = () => {
  const vh = use100vh()
  const { register, errors, savePass, setSavePassState, iniciando, handleLogin } = useLogin()
  return (
    <div className='h-full w-[100vw] flex select-none overflow-hidden min-w-full relative'>
      <img src={LOGO_SF} className='absolute top-10 left-10 w-[130px]' />
      <img src={BACKGROUND_AGRICOLA} className='md:w-30% lg:w-[55%] h-full object-cover hidden lg:inline-block' />
      <div className='w-[100%] lg:w-[45%] relative '>
        <div className='h-full w-min z-0m absolute top-0 left-0 hidden lg:inline-block'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox={`0 0 1440 320`}
            fill='none'
            style={{ width: vh?.toPrecision() ?? '100vh', height: '100%' }}
          >
            <g transform='rotate(-90 720 160)  translate(0 -730) scale(1 1.5)'>
              <path
                fill='#0C2131'
                fillOpacity='1'
                d='M0,128L40,149.3C80,171,160,213,240,240C320,267,400,277,480,256C560,235,640,181,720,149.3C800,117,880,107,960,133.3C1040,160,1120,224,1200,234.7C1280,245,1360,203,1400,181.3L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'
              ></path>
            </g>
          </svg>
        </div>
        <div className='bg-primary w-full h-full absolute top-0 lg:left-[calc(100vh/5)]'>
          <div className='w-full h-full lg:pr-[20%] flex justify-center items-center bg-primary'>
            <div className='w-[350px] h-[500px] bg-white pt-10 px-5 border shadow-sm rounded-xl'>
              <div className='flex justify-center pb-4'>
                <MdSecurity size={100} />
              </div>
              <form onSubmit={handleLogin}>
                <div className='flex flex-col mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
                  <input
                    autoComplete='off'
                    {...register('username')}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    placeholder='Nombre de usuario'
                  />
                  <p className='text-xs text-red-500 pl-2 m-0'>{errors.username?.message}</p>
                </div>
                <div className='flex flex-col mb-8'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                  <input
                    autoComplete='off'
                    {...register('password')}
                    type={'password'}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    placeholder='***************'
                  />
                  <p className='text-xs text-red-500 pl-2 m-0'>{errors.password?.message}</p>
                </div>
                <div className='flex justify-center mb-6'>
                  <button
                    className=' flex w-[180px] justify-center items-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='submit'
                  >
                    Iniciar sesión
                    {iniciando && <Spinner />}
                  </button>
                </div>
                <div className='flex items-center justify-end gap-3'>
                  <p className='text-sm text-gray-500'>Recordar contraseña</p>
                  <input
                    type='checkbox'
                    className='form-checkbox'
                    checked={savePass}
                    onChange={value => setSavePassState(value.target.checked)}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
