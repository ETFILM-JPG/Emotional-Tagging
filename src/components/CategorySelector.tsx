import { Button } from './ui/button';
import { BookOpen, Film, Music } from 'lucide-react';

interface CategorySelectorProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = [
  { id: 'book', label: '书籍', icon: BookOpen, description: '文学小说、非虚构' },
  { id: 'movie', label: '影视', icon: Film, description: '电影、剧集、纪录片' },
  { id: 'music', label: '音乐', icon: Music, description: '专辑、歌曲' },
];

export default function CategorySelector({
  selected,
  onSelect,
}: CategorySelectorProps) {
  return (
    <div className="space-y-2">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
              selected === category.id
                ? 'border-primary bg-primary/5'
                : 'border-muted hover:border-muted-foreground/50 bg-muted/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              <div>
                <div className="font-semibold text-sm">{category.label}</div>
                <div className="text-xs text-muted-foreground">{category.description}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
