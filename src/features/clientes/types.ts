import type { Database } from '../../types/database'

export type Cliente = Database['public']['Tables']['clientes']['Row']
export type DatosCliente = Pick<Cliente, 'nombre' | 'correo' | 'telefono'>
