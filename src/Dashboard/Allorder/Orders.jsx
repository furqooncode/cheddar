import { useState, useMemo } from 'react'
import { initialOrders } from '../data/orders.js'
import OrdersTable from './OrdersTable'
import OrdersAnalytics from './OrdersAnalytics'

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders)

  // ✅ Cancel order
  const cancelOrder = () => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: 'cancelled' } : order
      )
    )
  }

  // ❌ Delete order
  const deleteOrder = () => {
    setOrders(prev => prev.filter(order => order.id !== id))
  }

  return (
    <div className="space-y-8">
     

      <OrdersTable
        orders={orders}
        onCancel={cancelOrder}
        onDelete={deleteOrder}
      />
      
       <OrdersAnalytics orders={orders} />
    </div>
  )
}