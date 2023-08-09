import CryptoJS from 'crypto-js'
import React, { useState } from 'react'
const secretPass = 'kpjiQfBYEmUk'

const encryptData = (text: string, { pass }: { pass?: string }) => {
  let usepass = secretPass
  if (pass) usepass = pass
  return CryptoJS.AES.encrypt(JSON.stringify(text), usepass).toString()
}
const decryptData = (text: string, { pass }: { pass?: string }) => {
  let usepass = secretPass
  if (pass) usepass = pass
  const bytes = CryptoJS.AES.decrypt(text, usepass)
  return JSON.parse(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))
}
type crypt = { protect?: boolean; aespass?: string }

export const useStoredState = <T>(
  key: string,
  init: T,
  scurityParams?: crypt,
  // eslint-disable-next-line no-unused-vars
): [T, (value: React.SetStateAction<T>) => void] => {
  const [state, setState] = useState<T>(() => {
    const storedData = localStorage.getItem(key)
    if (!storedData) return init
    if (scurityParams?.protect) return decryptData(storedData, { pass: scurityParams?.aespass }) as T
    else return JSON.parse(storedData) as T
  })
  const setStoredState = (value: React.SetStateAction<T>) => {
    let jsonValue = JSON.stringify(value)
    if (scurityParams?.protect) jsonValue = encryptData(jsonValue, { pass: scurityParams?.aespass })
    localStorage.setItem(key, jsonValue)
    setState(value)
  }
  return [state, setStoredState]
}
