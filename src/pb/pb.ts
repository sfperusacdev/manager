import PocketBase from 'pocketbase'
const PB = new PocketBase(import.meta.env.VITE_API_URL)
export default PB
