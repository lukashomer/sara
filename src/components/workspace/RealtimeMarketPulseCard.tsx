import React, { useMemo } from "react";
import { Button } from "@/components/ui/cup-button";
import { Download, Share } from "lucide-react";
import { Card, CardContent } from "@/components/ui/cup-card";
import { motion } from "framer-motion";
import { RealtimeMarketPulseResult } from "@/api/saraSchemas";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";

interface RealtimeMarketPulseCardProps {
  title?: string;
  subtitle?: string;
  realtimeMarketPulseResult?: RealtimeMarketPulseResult;
}

const RealtimeMarketPulseCard: React.FC<RealtimeMarketPulseCardProps> = ({
  title = "Market Pulse",
  subtitle = "Real-time market analysis for your area",
  realtimeMarketPulseResult,
}) => {
  const metrics = realtimeMarketPulseResult?.data?.metrics;

  const chartData = useMemo(
    () =>
      (metrics?.trend_data?.days_on_market_trend ?? [])
        .map((point) =>
          point.value
            ? {
                label: point.period ?? "",
                value: point.value,
                extra: "",
              }
            : null
        )
        .filter(Boolean),
    [metrics]
  );

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
            {title}
          </h1>
        </div>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scroll-container">
        <Card className="overflow-hidden bg-white border rounded-lg shadow-sm flex flex-col">
          <CardContent className="p-4 flex flex-col h-full">
            {/* Header */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">Avg DOM</span>
                <span className="text-4xl font-extrabold ml-2">
                  {metrics?.average_days_on_market ?? "--"}
                </span>
              </div>
              <div className="flex justify-between mt-4 text-gray-500 text-base font-medium">
                <span>Median Price</span>
                <span className="text-black font-semibold">
                  {metrics?.median_price
                    ? `$${(metrics.median_price / 1000).toFixed(0)}k`
                    : "--"}
                </span>
              </div>
              <div className="flex justify-between mt-1 text-gray-500 text-base font-medium">
                <span>Price Reduction</span>
                <span className="text-black font-semibold">
                  {metrics?.price_reduction_percent != null
                    ? `${metrics.price_reduction_percent}%`
                    : "--"}
                </span>
              </div>
            </div>
            {/* Chart */}
            <div className="flex items-end mt-2 pb-2">
              <ResponsiveContainer width="100%" aspect={1.5}>
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="extra"
                    height={20}
                    padding={{ left: 10, right: 10 }}
                    axisLine={{ stroke: "#c7c7c7", strokeWidth: 1.5 }}
                    tickLine={{ stroke: "#c7c7c7", strokeWidth: 1.5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2196F3"
                    strokeWidth={4}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Median Price",
                    ]}
                    labelFormatter={(_, payload) =>
                      payload && payload[0] && payload[0].payload.label
                        ? payload[0].payload.label
                        : ""
                    }
                    contentStyle={{
                      background: "#fff",
                      borderRadius: 8,
                      border: "1px solid #eee",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default RealtimeMarketPulseCard;
