import { Star, AlertCircle, Zap } from 'lucide-react';

interface WorkCardProps {
  work: {
    id: string;
    title: string;
    matchScore: number;
    image: string;
    description: string;
    explanation: string;
    warnings?: string[];
    relatedWorks?: string[];
  };
}

export default function WorkCard({ work }: WorkCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={work.image}
            alt={work.title}
            className="w-24 h-36 object-cover rounded-md bg-muted"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-semibold text-lg leading-tight truncate">{work.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                    {work.matchScore.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">匹配度</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {work.description}
          </p>

          {/* Explanation */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-2 mb-3">
            <p className="text-xs text-blue-900 dark:text-blue-100">
              <span className="font-semibold">✓ 为什么推荐：</span> {work.explanation}
            </p>
          </div>

          {/* Warnings */}
          {work.warnings && work.warnings.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded p-2 mb-3">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-amber-900 dark:text-amber-100">注意</p>
                  {work.warnings.map((warning, i) => (
                    <p key={i} className="text-xs text-amber-800 dark:text-amber-200">
                      {warning}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Related Works */}
          {work.relatedWorks && work.relatedWorks.length > 0 && (
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-muted-foreground">相关推荐：</span>
              <div className="flex gap-1 flex-wrap">
                {work.relatedWorks.map((title, i) => (
                  <span
                    key={i}
                    className="text-xs bg-muted px-2 py-1 rounded hover:bg-muted-foreground/20 cursor-pointer"
                  >
                    {title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
