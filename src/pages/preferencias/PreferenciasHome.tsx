import { PreferenciasTreeMenu } from './PreferenciasTreeMenu'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { TreeNodo, usePreferenciasContent } from './hooks/usePreferenciasContent'
import { GrAdd } from 'react-icons/gr'
import { PreferencesList } from './ PreferencesList'
export const PreferenciasHome = () => {
  const { nodos, onSelectNode, selectedPerfilID } = usePreferenciasContent()
  const getDescription = (pefilID?: string) => {
    if (pefilID == null) return ''
    if (pefilID === '') return ''
    const perfilNodo = nodos.find(n => n.id === pefilID) as TreeNodo
    const servicioNodo = nodos.find(n => n.id === perfilNodo.parent) as TreeNodo
    const empresaNode = nodos.find(n => n.id === servicioNodo.parent) as TreeNodo
    return `Empresa: ${empresaNode.name} | Servicio: ${servicioNodo.name} | Perfil: ${perfilNodo.name}`
  }
  return (
    <div className='h-full flex flex-col'>
      <div className='bg-primary h-[40px] flex items-center'>
        <p className='text-white px-8'>SF PERU SAC</p>
      </div>
      <div className='h-full flex-grow'>
        <PanelGroup autoSaveId='preff_panel_cj977uj0hnn3bdddaop0' direction='horizontal'>
          <Panel defaultSize={20} minSize={20}>
            <div className='h-full flex flex-col'>
              <div className='h-6 bg-gris flex justify-end px-2'>
                <div className='flex justify-end items-center gap-1 select-none cursor-pointer clickable'>
                  <span className='text-[11px] leading-[10px]'>Crear</span>
                  <GrAdd />
                </div>
              </div>
              <div className='flex-grow'>
                <PreferenciasTreeMenu nodos={nodos} onSelect={onSelectNode} />
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className='w-[2px] bg-primary ' />
          <Panel minSize={30}>
            <div className='h-full flex flex-col'>
              <div className='h-6 bg-gris flex px-2 items-center'>
                <p className='text-xs'>{getDescription(selectedPerfilID)}</p>
              </div>
              <div className='flex-grow px-2'>
                {selectedPerfilID && <PreferencesList perfilID={selectedPerfilID} />}
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  )
}
