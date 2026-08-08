"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { MyStats } from "@/types/questions";

const CHART_TICK_STYLE = { fontSize: 11 };

export function DailyChart({ data }: { data: MyStats["dailyChart"] }) {
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit" }),
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={formatted}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
        <XAxis dataKey="label" tick={CHART_TICK_STYLE} />
        <YAxis allowDecimals={false} tick={CHART_TICK_STYLE} />
        <Tooltip />
        <Bar dataKey="count" name="Çözülen Soru" fill="#0EA5A0" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function WeeklyChart({ data }: { data: MyStats["weeklyChart"] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
        <XAxis dataKey="week" tick={CHART_TICK_STYLE} />
        <YAxis allowDecimals={false} tick={CHART_TICK_STYLE} />
        <Tooltip />
        <Bar dataKey="count" name="Çözülen Soru" fill="#F5A623" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
