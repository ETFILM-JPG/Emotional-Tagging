import { useEffect, useState } from 'react';
import WorkCard from './WorkCard';
import { usePreferencesStore } from '@/store/preferences';
import { Loader2 } from 'lucide-react';

interface WorkResult {
  id: string;
  title: string;
  category: string;
  matchScore: number;
  image: string;
  description: string;
  explanation: string;
  warnings?: string[];
  relatedWorks?: string[];
}

interface ResultsPanelProps {
  category: string;
  tier: 'perfect' | 'tryit' | 'discover';
}

export default function ResultsPanel({ category, tier }: ResultsPanelProps) {
  const [results, setResults] = useState<WorkResult[]>([]);
  const [loading, setLoading] = useState(true);
  const preferences = usePreferencesStore();

  useEffect(() => {
    // 模拟加载
    setLoading(true);
    const timer = setTimeout(() => {
      // TODO: 调用Tauri后端API
      // const mockResults: WorkResult[] = [
      //   {
      //     id: '1',
      //     title: '海街日记',
      //     category: 'movie',
      //     matchScore: 9.2,
      //     image: '...',
      //     description: '...',
      //     explanation: '你偏好情感共鸣度高，本作品完美匹配',
      //   },
      // ];
      // setResults(mockResults);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category, tier, preferences]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">正在查询推荐...</span>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground mb-2">暂无推荐结果</p>
        <p className="text-xs text-muted-foreground">
          请调整维度权重后重新查询
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <WorkCard key={result.id} work={result} />
      ))}
    </div>
  );
}
