import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PERFIL_PREFERENCIAS } from '../../../keys/keys'
import { getPreferencias } from '../../../services/preferencias/preferencia'
import { Preferencia } from '../../../modesl/preferencia'
import { produce } from 'immer'

export const usePreferenciaList = (perfilID: string) => {
  const client = useQueryClient()
  const { data, isFetching } = useQuery({
    queryKey: [PERFIL_PREFERENCIAS, perfilID],
    queryFn: () => getPreferencias(perfilID),
    keepPreviousData: false,
  })
  const changeValue = (p: Preferencia) => {
    client.setQueryData<Preferencia[]>([PERFIL_PREFERENCIAS, perfilID], oldstae => {
      oldstae ??= []
      return produce(oldstae, draff => {
        const index = draff.findIndex(d => d.id === p.id)
        if (index == -1) return
        draff[index].valor = p.valor
      })
    })
  }
  const refresh = () => client.invalidateQueries([PERFIL_PREFERENCIAS, perfilID])
  return {
    grupos: data ?? [],
    loading: isFetching,
    changeValue,
    refresh,
  }
}
