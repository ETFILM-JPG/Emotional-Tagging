import { usePreferencesStore } from '@/store/preferences';
import { Slider } from './ui/slider';
import { Info } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

const dimensions = [
  {
    id: 'emotionResonance',
    label: '情感共鸣度',
    description: '作品对你的情感冲击力和共鸣程度',
    examples: '温暖治愈、令人绝望、引发思考',
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'aestheticPleasure',
    label: '审美愉悦度',
    description: '视觉、听觉、文字等感官层面的享受',
    examples: '视觉震撼、文字优美、意境深远',
    color: 'from-purple-500 to-blue-500',
  },
  {
    id: 'valueAlignment',
    label: '价值认同度',
    description: '作品传递的价值观与你的契合度',
    examples: '充满希望、价值观正向、直击人心',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'narrativeCompletion',
    label: '叙事完成度',
    description: '故事逻辑的严谨性和节奏的张力',
    examples: '结构严谨、逻辑混乱、张力拉满',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'technicalExecution',
    label: '技术完成度',
    description: '制作层面的专业水准',
    examples: '表演自然、音效沉浸、特效粗糙',
    color: 'from-yellow-500 to-orange-500',
  },
];

export default function DimensionSliders() {
  const preferences = usePreferencesStore();

  const handleSliderChange = (id: string, value: number[]) => {
    preferences.setDimension(id as any, value[0]);
  };

  return (
    <div className="space-y-6">
      {dimensions.map((dimension) => {
        const value = preferences[dimension.id as keyof typeof preferences] as number;
        return (
          <div key={dimension.id}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">{dimension.label}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-0 h-4 w-4 rounded-full hover:bg-muted">
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 text-sm">
                    <div className="space-y-2">
                      <p className="font-semibold">{dimension.label}</p>
                      <p className="text-muted-foreground">{dimension.description}</p>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground mb-1">示例词汇:</p>
                        <p className="text-xs">{dimension.examples}</p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <span className="text-sm font-mono font-semibold text-primary">{value}/10</span>
            </div>
            <Slider
              value={[value]}
              onValueChange={(v) => handleSliderChange(dimension.id, v)}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>
        );
      })}
    </div>
  );
}
