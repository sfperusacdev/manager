import { useState } from 'react'
import { uid } from 'uid'

export const useCode = (codigo?: string, len?: number) => {
  const [value] = useState(removePrefix(codigo ?? uid(len ?? 20).toUpperCase()))
  return value
}
const removePrefix = (val: string) => {
  const parts = val.split('.')
  return parts[parts.length - 1]
}
