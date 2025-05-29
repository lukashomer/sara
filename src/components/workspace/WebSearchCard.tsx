import { WebSearchResult } from "@/api/saraSchemas";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/cup-card";
import { useState } from "react";

interface Props {
  webSearchResult?: WebSearchResult;
}

const WebSearchCard: React.FC<Props> = ({ webSearchResult }) => {
  const length = webSearchResult?.search_results?.length ?? 0;
  const [expandedSnippets, setExpandedSnippets] = useState<
    Record<string, boolean>
  >({});

  const toggleSnippet = (url: string) => {
    setExpandedSnippets((prev) => ({
      ...prev,
      [url]: !prev[url],
    }));
  };

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
            Top {length} results found
          </h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 gap-4">
        {webSearchResult?.search_results?.map((result) => (
          <Card
            className="overflow-hidden bg-white border rounded-lg shadow-sm"
            key={result.url}
          >
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium line-clamp-1">
                  {result.title}
                </h3>
                <div
                  onClick={() => toggleSnippet(result.url)}
                  className="cursor-pointer group"
                >
                  <p
                    className={`text-sm ${expandedSnippets[result.url] ? "" : "line-clamp-3"}`}
                  >
                    {result.snippet}
                  </p>
                  {!expandedSnippets[result.url] && (
                    <span className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to expand...
                    </span>
                  )}
                </div>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 flex items-center gap-1"
                >
                  <span className="text-primary">Source</span>
                  <span className="line-clamp-1 break-all">
                    {result.url.replace("https://", "")}
                  </span>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default WebSearchCard;
