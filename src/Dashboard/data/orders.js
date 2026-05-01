export type OrderStatus = 'paid' | 'pending' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  name: string
  price: number
  size: 'M' | 'L' | 'XL' | '2XL'
  state: string
  city: string
  country: string
  color: string
  quantity: number
  createdAt: string
  status: OrderStatus
}

export const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    name: 'Cheddar Signature Hoodie',
    price: 120,
    size: 'L',
    state: 'Lagos',
    city: 'Ikeja',
    country: 'Nigeria',
    color: 'Black',
    quantity: 2,
    createdAt: '2026-03-17 14:32',
    status: 'paid',
  },
  {
    id: 'ORD-002',
    name: 'Gold Crest Hoodie',
    price: 150,
    size: 'XL',
    state: 'Abuja',
    city: 'Gwarimpa',
    country: 'Nigeria',
    color: 'Cream',
    quantity: 1,
    createdAt: '2026-03-18 10:21',
    status: 'pending',
  },
]