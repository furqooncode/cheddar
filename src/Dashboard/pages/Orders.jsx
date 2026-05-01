import { useState, useMemo } from 'react'
import { initialOrders, Order } from '../data/orders'
import OrdersTable from '../components/orders/OrdersTable'
import OrdersAnalytics from '../components/orders/OrdersAnalytics'

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  // ✅ Cancel order
  const cancelOrder = (id: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: 'cancelled' } : order
      )
    )
  }

  // ❌ Delete order
  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id))
  }

  return (
    <div className="space-y-8">
      <OrdersAnalytics orders={orders} />

      <OrdersTable
        orders={orders}
        onCancel={cancelOrder}
        onDelete={deleteOrder}
      />
    </div>
  )
}