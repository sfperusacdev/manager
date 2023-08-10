import React from 'react'
import { WrapModal, useModalHandle } from './Modal'
import classNames from 'classnames'

type ConfirmAlertCallerType = (message: string, buttons: { [x: string]: () => void }) => void

const ConfirmAlertContext = React.createContext<ConfirmAlertCallerType>(() => {})

export const ConfirmAlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [{ buttons, message }, setShowconfirmmodal] = React.useState({
    message: '',
    buttons: {} as { [x: string]: () => void },
  })
  const modalHandle = useModalHandle()
  const handlerOpenModal = (message: string, buttons: { [x: string]: () => void }) => {
    setShowconfirmmodal(laststate => {
      if (!modalHandle.isOpen) return { ...laststate, message, buttons: { ...buttons } }
      return laststate
    })
    modalHandle.openModal()
  }
  const handlerClose = () => {
    setShowconfirmmodal({ message: '', buttons: {} })
    modalHandle.closeModal()
  }
  return (
    <>
      <WrapModal handle={modalHandle} title='Sistema' customTop='20%'>
        <div className='px-3 py-1 pt-0 text-center select-none min-w-[250px]'>
          <p className='mb-3 font-normal text-gray-500 dark:text-gray-500 max-w-[300px] p-2'>{message}</p>
          {Object.keys(buttons).map(btn => (
            <button
              key={btn}
              data-modal-toggle='popup-modal'
              onClick={() => {
                buttons[btn]()
                handlerClose()
              }}
              type='button'
              className={classNames(
                'font-normal text-sm min-w-[90px] h-7 px-3 mx-2 my-1 focus:outline-none rounded-md',
                {
                  'bg-rose-500 active:bg-rose-500  hover:bg-rose-700 text-white ': btn.toLowerCase() === 'cancel',
                  'border border-[#0052CC] active:bg-[#0052CC] hover:bg-[#0065FF] text-black hover:text-white':
                    btn.toLowerCase() !== 'cancel',
                }
              )}
            >
              {btn}
            </button>
          ))}
        </div>
      </WrapModal>
      <ConfirmAlertContext.Provider value={handlerOpenModal}>{children}</ConfirmAlertContext.Provider>
    </>
  )
}
export const useConfirmAlert = () => {
  const confirmalert = React.useContext(ConfirmAlertContext)
  const invoker = (message: string, buttons?: { [x: string]: () => void }) => {
    if (!confirmalert) throw new Error('no se encontro el ConfirmAlertContext')
    if (buttons) {
      if (!buttons.Cancel) {
        buttons = { Cancel: () => {}, ...buttons }
      }
      confirmalert(message, buttons)
    } else {
      confirmalert(message, { OK: () => {} })
    }
  }
  return invoker
}
