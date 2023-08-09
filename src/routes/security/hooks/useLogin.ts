import { toast } from 'react-hot-toast'
import { useStoredState } from '../../../hooks/useStoredState'
import { LoginData, LoginDataSchema } from '../entities/login'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { loginService } from '../../../services/login'
import { useLogged } from '../session/auth'

export const useLogin = () => {
  const [savePass, setSavePassState] = useStoredState('save_password', false)
  const [storedFrom, setStoredData] = useStoredState<LoginData | null>('__form_data_filed', null, { protect: true })
  const { openSession } = useLogged()
  const [iniciando, setRqState] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ resolver: yupResolver(LoginDataSchema) })

  useEffect(() => {
    if (!storedFrom) return
    setValue('username', storedFrom.username)
    setValue('password', storedFrom.password)
  }, [storedFrom])

  const handleLogin = handleSubmit(async data => {
    const id = toast.loading('Iniciando...')
    setRqState(true)
    try {
      if (savePass) setStoredData(data)
      else setStoredData(null)
      openSession(await loginService(data))
      toast.success('bienvenido', { id })
    } catch (err) {
      toast.error((err as Error).message, { id })
    }
    setRqState(false)
  })

  return {
    register,
    errors,
    savePass,
    setSavePassState,
    getValues,
    handleLogin,
    iniciando,
  }
}
