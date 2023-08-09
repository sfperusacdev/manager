import { Preferencia, PreferenciaGrupo } from '../../modesl/preferencia'
import PB from '../../pb/pb'

export const getPreferencias = async (perfilID: string) => {
  const results = await PB.send<{
    message: string
    data: PreferenciaGrupo[]
  }>(`/v1/api/perfil/${perfilID}/preferencias`, { method: 'GET' })

  return results.data ?? []
}

export const updatePreference = async (params: { perfilID: string; preff: Preferencia }) => {
  const body = {
    perfil_id: params.perfilID,
    preferencia_id: params.preff.id,
    valor: params.preff.valor,
  }
  await PB.send('/v1/api/preferencias', { method: 'PATCH', body })
}
