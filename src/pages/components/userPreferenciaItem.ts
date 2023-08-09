import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { updatePreference } from '../../services/preferencias/preferencia'
import { useMutation } from '@tanstack/react-query'
import { produce } from 'immer'
import { toast } from 'react-hot-toast'
import { Preferencia } from '../../modesl/preferencia'
interface props {
  perfilID: string
  // eslint-disable-next-line no-unused-vars
  onChange: (preff: Preferencia) => void
}
export const userPreferenciaItem = (preff: Preferencia, { onChange, perfilID }: props) => {
  const initiValue = preff.tipo_campo === 'json' ? JSON.stringify(preff.valor, null, 2) : preff.valor
  const [state, setState] = useState({ lastsave: initiValue, value: initiValue, first_render: true })
  const [debouceVale, setDebounceValue] = useDebounce(initiValue, preff.tipo_campo === 'json' ? 2000 : 1000)
  const { mutate, isLoading } = useMutation({ mutationFn: updatePreference })
  useEffect(() => setDebounceValue(state.value), [state.value])
  useEffect(() => {
    if (state.first_render) {
      setState(last => ({ ...last, first_render: false }))
      return
    }
    if (state.lastsave === debouceVale) return
    const newValue = produce(preff, draff => {
      draff.valor = debouceVale
      if (preff.tipo_campo === 'json') {
        try {
          draff.valor = JSON.parse(debouceVale)
        } catch (err) {
          toast.error('JSON invalido, no se puede guardar este campo')
          return
        }
      }
    })
    mutate(
      { perfilID, preff: newValue },
      {
        onSuccess: () => {
          setState(last => ({ ...last, lastsave: debouceVale }))
          onChange({ ...newValue, valor: debouceVale })
        },
        onError: err => {
          console.log(err)
          toast.error('hubo un problema, no se pudo procesar el cambio')
          setState(last => ({ ...last, value: last.lastsave }))
        },
      },
    )
  }, [debouceVale])
  const onChangeValue = (value: string) => {
    setState(last => ({ ...last, value: value }))
  }
  return {
    value: state.value,
    onChangeValue,
    isLoading,
  }
}
