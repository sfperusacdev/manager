import { DataResultNodos } from '../../modesl/data_result_nodos'
import PB from '../../pb/pb'
interface Result {
  message: string
  data: DataResultNodos
}
export const getAllNodos = async () => {
  const results = await PB.send<Result>('/v1/api/nodos', { method: 'GET' })
  return results.data
}
