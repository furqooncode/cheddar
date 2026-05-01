import { Order } from "../../data/orders";

interface Props {
  orders: Order[];
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function OrdersTable({ orders, onCancel, onDelete }: Props) {
  return (
    <div className="glass rounded-xl p-6">
      <table className="w-full text-sm">
        <thead className="text-gray-400 uppercase">
          <tr>
            <th>Product</th>
            <th>Status</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-white/5">
              <td>{order.name}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    order.status === "paid"
                      ? "bg-gold/20 text-gold"
                      : order.status === "pending"
                        ? "bg-gray-700 text-gray-300"
                        : order.status === "cancelled"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {order.status}
                </span>
              </td>

              <td>{order.quantity}</td>
              <td>${order.price * order.quantity}</td>

              <td className="flex gap-2">
                {order.status !== "cancelled" && (
                  <button
                    onClick={() => onCancel(order.id)}
                    className="text-xs px-3 py-1 rounded bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                  >
                    Cancel
                  </button>
                )}

                <button
                  onClick={() => onDelete(order.id)}
                  className="text-xs px-3 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
