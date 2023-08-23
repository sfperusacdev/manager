export interface Nodo {
  id: string
  name: string
  children: string[] | null
  parent: null | string
  tipo: 'base' | 'empresa' | 'servicio' | 'perfil'
}
