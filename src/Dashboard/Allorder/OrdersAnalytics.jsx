import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip } from "recharts";

const GOLD = "#d4a373";
const GRAY = "#3f3f3f";

export default function OrdersAnalytics({ orders }) {
  const paid = orders.filter((o) => o.status === "paid").length;
  const pending = orders.filter((o) => o.status === "pending").length;

  const revenueData = [
    {
      name: "Revenue",
      value: orders
        .filter((o) => o.status === "paid")
        .reduce((sum, o) => sum + o.price * o.quantity, 0),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Paid vs Pending */}
      <div className="glass rounded-xl p-6">
        <h3 className="mb-4 uppercase text-xs tracking-widest">
          Orders Status
        </h3>

        <PieChart width={250} height={250}>
          <Pie
            data={[
              { name: "Paid", value: paid },
              { name: "Pending", value: pending },
            ]}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
          >
            <Cell fill={GOLD} />
            <Cell fill={GRAY} />
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Revenue */}
      <div className="glass rounded-xl p-6">
        <h3 className="mb-4 uppercase text-xs tracking-widest">Paid Revenue</h3>

        <BarChart width={300} height={250} data={revenueData}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" fill={GOLD} radius={[8, 8, 0, 0]} />
        </BarChart>
      </div>
    </div>
  );
}
