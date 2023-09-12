import React from 'react'
import { ToggleInput } from '../../components/ToggleInput'
import { userPreferenciaItem } from './userPreferenciaItem'
import { SmallSpinner } from '../../components/SmallSpinner'
import { Preferencia } from '../../modesl/preferencia'
import classNames from 'classnames'

interface itemprops {
  perfilID: string
  preff: Preferencia
  // eslint-disable-next-line no-unused-vars
  onChange: (preff: Preferencia) => void
}

const NumeroPreferenceItem: React.FC<itemprops> = ({ preff, perfilID, onChange }) => {
  const { isLoading, onChangeValue, value } = userPreferenciaItem(preff, { onChange, perfilID })
  return (
    <div className='mb-1 px-2 pt-1 rounded'>
      <div className='flex items-center gap-1'>
        <h1 className='text-xs text-primary font-semibold'>{preff.nombre}</h1>
        {isLoading && <SmallSpinner />}
      </div>
      <p className='text-xs mb-1'>{preff.descripcion}</p>
      <input
        className='form-input text-xs p-1 rounded'
        type='number'
        value={value}
        disabled={isLoading}
        onChange={e => onChangeValue(e.target.value)}
      />
      <p className='font-mono text-[10px] text-black/70'>{preff.identiticador}</p>
    </div>
  )
}

const BoolPreferenceItem: React.FC<itemprops> = ({ preff, perfilID, onChange }) => {
  const { isLoading, onChangeValue, value } = userPreferenciaItem(preff, { onChange, perfilID })
  return (
    <div className='mb-1 px-2 pt-1 rounded flex w-full  lg:w-[50vw] justify-between'>
      <div>
        <div className='flex items-center gap-1'>
          <h1 className='text-xs text-primary font-semibold'>{preff.nombre}</h1>
          {isLoading && <SmallSpinner />}
        </div>
        <p className='text-xs mb-1'>{preff.descripcion}</p>
        <p className='font-mono text-[10px] text-black/70'>{preff.identiticador}</p>
      </div>
      <div>
        <ToggleInput value={value} disabled={isLoading} onChange={onChangeValue} />
      </div>
    </div>
  )
}

const TextPreferenceItem: React.FC<itemprops> = ({ preff, perfilID, onChange }) => {
  const { isLoading, onChangeValue, value } = userPreferenciaItem(preff, { onChange, perfilID })
  return (
    <div className='mb-1 px-2 pt-1 rounded'>
      <div className='flex items-center gap-1'>
        <h1 className='text-xs text-primary font-semibold'>{preff.nombre}</h1>
        {isLoading && <SmallSpinner />}
      </div>
      <p className='text-xs mb-1'>{preff.descripcion}</p>
      <textarea
        className={classNames('text-[8px] p-1 rounded w-full lg:w-[50vw] overflow-auto', {
          'font-mono': preff.tipo_campo === 'json',
        })}
        rows={preff.tipo_campo === 'json' ? 6 : 1}
        disabled={isLoading}
        onChange={e => onChangeValue(e.target.value)}
        value={value}
      />
      <p className='font-mono text-[10px] text-black/70'>{preff.identiticador}</p>
    </div>
  )
}

export const PreferenciaItem: React.FC<itemprops> = ({ preff, onChange, perfilID }) => {
  if (preff.tipo_campo === 'numero')
    return <NumeroPreferenceItem preff={preff} onChange={onChange} perfilID={perfilID} />
  if (preff.tipo_campo === 'boolean')
    return <BoolPreferenceItem preff={preff} onChange={onChange} perfilID={perfilID} />
  return <TextPreferenceItem preff={preff} onChange={onChange} perfilID={perfilID} />
}
