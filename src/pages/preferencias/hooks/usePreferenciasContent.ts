import { useQuery, useQueryClient } from '@tanstack/react-query'
import { INode } from 'react-accessible-treeview'
import { useEffect, useState } from 'react'
import { NODOS_REACT_QUERY_KEY } from '../../../keys/keys'
import { getAllNodos } from '../../../services/preferencias/nodos'
import { Nodo } from '../../../modesl/data_result_nodos'
export interface TreeNodo extends INode {
  tipo: 'base' | 'empresa' | 'servicio' | 'perfil'
}
const base: TreeNodo = {
  id: '!base',
  name: '',
  children: [],
  parent: null,
  tipo: 'base',
}
export const usePreferenciasContent = () => {
  const client = useQueryClient()
  const [selectedPerfilID, setPerfilID] = useState<string>()
  const [nodos, setNodos] = useState<TreeNodo[]>([base])
  const { data, isFetching } = useQuery<Nodo[], Error>({
    queryKey: [NODOS_REACT_QUERY_KEY],
    queryFn: getAllNodos,
  })
  useEffect(() => {
    if (data == null) return
    setNodos(
      data.map((n): TreeNodo => {
        return {
          id: n.id,
          name: n.name,
          tipo: n.tipo,
          parent: n.parent,
          children: n.children ?? [],
        }
      }),
    )
  }, [data])
  const onSelectNode = (node: TreeNodo) => {
    if (node.tipo === 'perfil') {
      setPerfilID(node.id as string)
    }
  }
  const refresh = () => client.invalidateQueries([NODOS_REACT_QUERY_KEY])
  return {
    nodos,
    isFetching,
    selectedPerfilID,
    onSelectNode,
    refresh,
  }
}
