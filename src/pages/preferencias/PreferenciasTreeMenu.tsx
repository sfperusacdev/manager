import TreeView from 'react-accessible-treeview'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { TreeNodo } from './hooks/usePreferenciasContent'
import classNames from 'classnames'
import React from 'react'
// eslint-disable-next-line no-unused-vars
export const PreferenciasTreeMenu: React.FC<{ nodos: TreeNodo[]; onSelect: (node: TreeNodo) => void }> = ({
  nodos,
  onSelect,
}) => {
  return (
    <>
      <div>
        <div className='checkbox'>
          <TreeView
            data={nodos}
            aria-label='Checkbox tree'
            className='font-roboto text-sm'
            nodeRenderer={({ element, isExpanded, isSelected, getNodeProps, level, handleSelect, handleExpand }) => {
              return (
                <div
                  {...getNodeProps({
                    onClick: e => {
                      handleSelect(e)
                      onSelect(element as TreeNodo)
                      e.stopPropagation()
                    },
                  })}
                >
                  <div
                    style={{ paddingLeft: 25 * (level - 1), backgroundColor: '' }}
                    className={classNames({ 'bg-secondary/50': isSelected })}
                  >
                    <div className={classNames('flex items-center')}>
                      {element.children.length > 0 && (
                        <span onClick={handleExpand} className='cursor-pointer'>
                          {isExpanded ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
                        </span>
                      )}
                      <p className={classNames('select-none', { 'pl-[14px]': element.children.length == 0 })}>
                        {element.name}
                      </p>
                    </div>
                  </div>
                </div>
              )
            }}
          />
        </div>
      </div>
    </>
  )
}
