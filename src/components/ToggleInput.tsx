import classNames from 'classnames'
import React from 'react'

type Props = {
  disabled?: boolean
  type?: React.HTMLInputTypeAttribute
  value: any
  // eslint-disable-next-line no-unused-vars,
  onChange: (value: any) => void
}
export const ToggleInput: React.FC<Props> = ({ value, disabled, onChange }) => {
  return (
    <div className={'mb-2'}>
      <span className='px-4' />
      <input
        checked={value}
        disabled={disabled}
        type='checkbox'
        onChange={({ target }) => {
          onChange(target.checked)
        }}
        className={classNames(
          'w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:text-primary/90 focus:ring-0 form-checkbox',
          { 'bg-gray-100 ': disabled },
        )}
      />
    </div>
  )
}
