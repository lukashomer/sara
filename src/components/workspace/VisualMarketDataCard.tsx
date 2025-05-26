import React from "react";
import { Card, CardContent } from "@/components/ui/cup-card";
import { motion } from "framer-motion";
import { FamilyExpensesResult } from "@/api/saraSchemas";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { COLORS } from "@/lib/themeUtils";

interface VisualMarketDataCardProps {
  familyExpensesResult?: FamilyExpensesResult;
}

const VisualMarketDataCard: React.FC<VisualMarketDataCardProps> = ({
  familyExpensesResult,
}) => {
  const categories = familyExpensesResult?.expense_data?.categories ?? [];

  // Prepare data for the pie chart with random colors from theme
  const pieData = categories.map((cat, index) => ({
    name: cat.name ?? "",
    value: cat.amount ?? 0,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full rounded-lg overflow-hidden bg-[#fbfbfb]"
    >
      <div className="p-4 sm:p-5 border-b bg-[#fbfbfb]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-2 justify-start sm:justify-between">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-1">
            Your workspace
          </h1>
        </div>
        <p className="text-sm text-gray-500">
          Typical expenses for a family of{" "}
          {familyExpensesResult?.expense_data?.family_size ?? "--"} people
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scroll-container">
        <Card className="overflow-hidden bg-white border rounded-lg shadow-sm">
          <CardContent className="p-4">
            {/* Main Content */}
            <div className="rounded-xl  flex flex-col sm:flex-row gap-4 items-stretch">
              {/* Left: Categories */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="col-span-2 text-lg font-semibold mb-2">
                  Monthly Cost Estimate
                </div>
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="border border-solid border-gray-100 rounded-md px-4 py-2 flex flex-col justify-center bg-white"
                  >
                    <span className="text-base text-gray-700 font-medium">
                      {cat.name}
                    </span>
                    <span className="text-2xl font-bold">
                      {cat.amount != null
                        ? `$${cat.amount.toLocaleString()}`
                        : "--"}
                    </span>
                  </div>
                ))}
              </div>
              {/* Right: Pie Chart and Legend */}
              <div className="flex flex-col items-center justify-center min-w-[180px]">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={60}
                      paddingAngle={2}
                    >
                      {pieData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex flex-col gap-2">
                  {pieData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm" style={{ color: "#222" }}>
                        {entry.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default VisualMarketDataCard;
