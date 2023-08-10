import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import React, { CSSProperties, useContext, useRef, useState } from 'react'
import ReactModal from 'react-modal'
import classNames from 'classnames'
import { produce } from 'immer'

ReactModal.setAppElement('#root')
type handleProps = {
  onOpenModal?: () => void
  onCloseModal?: () => void
}
export const useModalHandle = <T,>(props?: handleProps) => {
  const ref = useRef<T>()
  const [isOpen, setState] = React.useState(false)
  const closeModal = () => {
    setState(false)
    if (props?.onCloseModal) props.onCloseModal()
  }
  const openModal = (entity?: T) => {
    ref.current = entity
    setState(true)
    if (props?.onOpenModal) props.onOpenModal()
  }
  return { isOpen, closeModal, openModal, entity: ref.current }
}

type Props = {
  children: React.ReactNode
  handle: ReturnType<typeof useModalHandle<any>>
  title?: string
  customTop?: CSSProperties['top']
}

const customStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
}

const closeModalContext = React.createContext(() => {})
export const WrapModal: React.FC<Props> = ({ children, handle, title, customTop }) => {
  const [state, setState] = useState({
    disabled: true,
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
  })
  const draggleRef = React.createRef<HTMLDivElement>()
  const onStart = (_: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement
    const targetRect = draggleRef?.current?.getBoundingClientRect()
    if (targetRect == null) return
    setState(
      produce(draff => {
        draff.bounds = {
          left: -targetRect?.left + uiData?.x,
          right: clientWidth - (targetRect?.right - uiData?.x),
          top: -targetRect?.top + uiData?.y,
          bottom: clientHeight - (targetRect?.bottom - uiData?.y),
        }
      }),
    )
  }
  return (
    <ReactModal
      style={customStyles}
      isOpen={handle.isOpen}
      onRequestClose={handle.closeModal}
      shouldCloseOnOverlayClick={false}
      contentElement={_ => (
        <div
          className={classNames('absolute left-1/2 -translate-x-1/2 rounded-md', {
            'top-[50%] -translate-y-1/2': customTop == null,
          })}
          style={{ minWidth: '100px', minHeight: '50px', maxWidth: '70%', maxHeight: '80%', top: customTop }}
        >
          <Draggable
            disabled={state.disabled}
            bounds={state.bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef} className='bg-white border-2 shadow-md rounded-md'>
              <div
                className={classNames(
                  'flex bg-primary justify-between items-start cursor-move p-1 border-b-2 rounded-md',
                  {
                    'border-b select-none ': title,
                  },
                )}
                onMouseOver={() => {
                  setState(
                    produce(draff => {
                      draff.disabled = false
                    }),
                  )
                }}
                onMouseOut={() =>
                  setState(
                    produce(draff => {
                      draff.disabled = true
                    }),
                  )
                }
                onFocus={() => {}}
                onBlur={() => {}}
              >
                {title && <h3 className='text-md font-medium text-white py-1 px-1 '>{title}</h3>}
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                  onClick={handle.closeModal}
                >
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>
              <div
                onMouseEnter={() => {
                  setState(
                    produce(draff => {
                      draff.disabled = true
                    }),
                  )
                }}
              >
                <closeModalContext.Provider value={handle.closeModal}>{children}</closeModalContext.Provider>
              </div>
            </div>
          </Draggable>
        </div>
      )}
    />
  )
}

export const useModalCloser = () => useContext(closeModalContext)
