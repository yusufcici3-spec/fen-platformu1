"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChartPoint } from "@/types/analysis";

export function TrendChart({ data, dataKeyLabel, color = "#0EA5A0" }: { data: ChartPoint[]; dataKeyLabel: string; color?: string }) {
  const formatted = data.map((d) => ({
    label: d.date
      ? new Date(d.date).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit" })
      : d.week ?? d.month ?? "",
    count: d.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={formatted}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
        <XAxis dataKey="label" tick={{ fontSize: 10 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
        <Tooltip />
        <Line type="monotone" dataKey="count" name={dataKeyLabel} stroke={color} strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
