import { useState } from 'react';
import { usePreferencesStore } from './store/preferences';
import CategorySelector from './components/CategorySelector';
import DimensionSliders from './components/DimensionSliders';
import ResultsPanel from './components/ResultsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('movie');
  const preferences = usePreferencesStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-6xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Emotional-Tagging</h1>
              <p className="text-sm text-muted-foreground mt-1">用感性与理性的维度，发现最适合你的艺术作品</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Selection */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">内容类型</h2>
              <CategorySelector
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            {/* Dimension Sliders */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">筛选维度</h2>
              <DimensionSliders />
            </div>

            {/* Weight Distribution */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border p-6">
              <h2 className="text-sm font-semibold mb-3 text-muted-foreground">权重分配</h2>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>感性权重</span>
                  <span className="font-mono font-semibold text-primary">
                    {preferences.sensoryWeight}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-200"
                    style={{ width: `${preferences.sensoryWeight}%` }}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <span>理性权重</span>
                  <span className="font-mono font-semibold text-secondary">
                    {100 - preferences.sensoryWeight}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-secondary h-full transition-all duration-200"
                    style={{ width: `${100 - preferences.sensoryWeight}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="perfect" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="perfect">
                  <span className="hidden sm:inline">完美匹配</span>
                  <span className="sm:hidden">完美</span>
                </TabsTrigger>
                <TabsTrigger value="tryit">
                  <span className="hidden sm:inline">值得尝试</span>
                  <span className="sm:hidden">尝试</span>
                </TabsTrigger>
                <TabsTrigger value="discover">
                  <span className="hidden sm:inline">发现惊喜</span>
                  <span className="sm:hidden">惊喜</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="perfect" className="space-y-4">
                <ResultsPanel category={selectedCategory} tier="perfect" />
              </TabsContent>
              <TabsContent value="tryit" className="space-y-4">
                <ResultsPanel category={selectedCategory} tier="tryit" />
              </TabsContent>
              <TabsContent value="discover" className="space-y-4">
                <ResultsPanel category={selectedCategory} tier="discover" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 Emotional-Tagging · 所有数据存储在本地 · 
            <a href="#" className="hover:text-foreground">反馈</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
