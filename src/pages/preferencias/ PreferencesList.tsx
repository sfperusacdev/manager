import React from 'react'
import { usePreferenciaList } from './hooks/usePreferenciaList'
import { PreferenciaItem } from '../components/PreferenciaItem'
import { GrRefresh } from 'react-icons/gr'
import classNames from 'classnames'

interface props {
  perfilID: string
}

export const PreferencesList: React.FC<props> = ({ perfilID }) => {
  const { grupos, loading, changeValue, refresh } = usePreferenciaList(perfilID)
  return (
    <div className='relative'>
      <div className='absolute flex justify-end right-0 px-3 py-4 items-center gap-2 select-none'>
        <span
          onClick={() => {
            refresh()
          }}
        >
          <GrRefresh className={classNames({ 'animate-spin': loading })} />
        </span>
      </div>
      {grupos.map(g => {
        return (
          <div key={`${perfilID}-${g.id}`} className='mb-2'>
            <p>{g.descripcion}</p>
            {g.preferencias.map(p => {
              return (
                <PreferenciaItem key={`${perfilID}-${p.id}`} preff={p} onChange={changeValue} perfilID={perfilID} />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
