import StatCard from "../components/StatCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const signupData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 180 },
  { month: "Mar", users: 260 },
  { month: "Apr", users: 320 },
  { month: "May", users: 410 }
];

const categoryData = [
  { name: "Hoodies", value: 55 },
  { name: "Premium", value: 30 },
  { name: "Accessories", value: 15 }
];

const growthData = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 520 },
  { month: "Mar", users: 710 },
  { month: "Apr", users: 980 },
  { month: "May", users: 1240 }
];

const COLORS = ["#d4a373", "#6b6b6b", "#eaeaea"];

export default function Overview() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Users" value="1,240" />
        <StatCard title="Waitlist" value="320" />
        <StatCard title="Revenue" value="₦4.2M" />
        <StatCard title="Drop Status" value="LIVE" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 p-6 rounded-xl bg-white/5">
          <h3 className="text-white mb-4">Monthly Waitlist Signups</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={signupData}>
              <XAxis dataKey="month" stroke="#777" />
              <YAxis stroke="#777" />
              <Tooltip />
              <Bar dataKey="users" fill="#d4a373" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 rounded-xl bg-white/5">
          <h3 className="text-white mb-4">Product Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" outerRadius={90}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-white/5">
        <h3 className="text-white mb-4">User Growth</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={growthData}>
            <XAxis dataKey="month" stroke="#777" />
            <YAxis stroke="#777" />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#d4a373" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}