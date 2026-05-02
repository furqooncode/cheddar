import StatCard from "../StatCard";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";

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
    <div className="space-y-6">

      {/* Stat Cards — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Users" value="1,240" />
        <StatCard title="Waitlist" value="320" />
        <StatCard title="Revenue" value="₦4.2M" />
        <StatCard title="Drop Status" value="LIVE" />
      </div>

      {/* Charts row — stacked on mobile, side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Bar Chart — takes 2/3 on desktop */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-white/5">
          <h3 className="text-white text-sm font-semibold mb-4">Monthly Waitlist Signups</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={signupData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" stroke="#555" tick={{ fontSize: 12 }} />
              <YAxis stroke="#555" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: "#111", border: "none", borderRadius: 8, fontSize: 12 }}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Bar dataKey="users" fill="#d4a373" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart — takes 1/3 on desktop */}
        <div className="p-5 rounded-xl bg-white/5">
          <h3 className="text-white text-sm font-semibold mb-4">Product Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                outerRadius={75}
                innerRadius={35}
                paddingAngle={3}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ color: "#aaa", fontSize: 12 }}>{value}</span>
                )}
              />
              <Tooltip
                contentStyle={{ background: "#111", border: "none", borderRadius: 8, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart — full width */}
      <div className="p-5 rounded-xl bg-white/5">
        <h3 className="text-white text-sm font-semibold mb-4">User Growth</h3>
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={growthData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" stroke="#555" tick={{ fontSize: 12 }} />
            <YAxis stroke="#555" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: "#111", border: "none", borderRadius: 8, fontSize: 12 }}
              cursor={{ stroke: "rgba(255,255,255,0.1)" }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#d4a373"
              strokeWidth={2.5}
              dot={{ fill: "#d4a373", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
