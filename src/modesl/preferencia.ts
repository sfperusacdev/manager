export interface PreferenciaGrupo {
  created: Date
  descripcion: string
  id: string
  updated: Date
  servicio_id: string
  preferencias: Preferencia[]
}

export interface Preferencia {
  id: string
  identiticador: string
  nombre: string
  descripcion: string
  tipo_campo: 'boolean' | 'texto' | 'numero' | 'json'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valor: any
  updated: Date
  created: Date
  grupo_preferencia_id: string
}
