import React from 'react'
import { usePreferenciaList } from './hooks/usePreferenciaList'
import { PreferenciaItem } from '../components/PreferenciaItem'
import { Spinner } from '../../components/Spinner'

interface props {
  perfilID: string
}

export const PreferencesList: React.FC<props> = ({ perfilID }) => {
  const { grupos, loading, changeValue } = usePreferenciaList(perfilID)
  return (
    <div className='relative'>
      <div className='absolute flex justify-end right-0 px-3 py-4'>{loading && <Spinner />}</div>
      {grupos.map(g => {
        return (
          <div key={g.id}>
            {g.preferencias.map(p => {
              return <PreferenciaItem key={p.id} preff={p} onChange={changeValue} perfilID={perfilID} />
            })}
          </div>
        )
      })}
    </div>
  )
}
