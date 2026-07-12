import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DimensionPreferences {
  emotionResonance: number;      // 情感共鸣度 1-10
  aestheticPleasure: number;     // 审美愉悦度 1-10
  valueAlignment: number;        // 价值认同度 1-10
  narrativeCompletion: number;   // 叙事完成度 1-10
  technicalExecution: number;    // 技术完成度 1-10
}

export interface PreferencesState extends DimensionPreferences {
  sensoryWeight: number;  // 感性权重 0-100
  rationalWeight: number; // 理性权重 0-100 (自动计算)
  setDimension: (key: keyof DimensionPreferences, value: number) => void;
  setSensoryWeight: (weight: number) => void;
  resetToDefaults: () => void;
}

const defaultPreferences: DimensionPreferences = {
  emotionResonance: 5,
  aestheticPleasure: 5,
  valueAlignment: 5,
  narrativeCompletion: 5,
  technicalExecution: 5,
};

export const usePreferencesStore = create<PreferencesState>()((
  set,
  get
) => ({
  ...defaultPreferences,
  sensoryWeight: 50,
  rationalWeight: 50,
  setDimension: (key: keyof DimensionPreferences, value: number) => {
    set((state) => ({ ...state, [key]: Math.max(1, Math.min(10, value)) }));
  },
  setSensoryWeight: (weight: number) => {
    set({
      sensoryWeight: Math.max(0, Math.min(100, weight)),
      rationalWeight: Math.max(0, Math.min(100, 100 - weight)),
    });
  },
  resetToDefaults: () => {
    set({
      ...defaultPreferences,
      sensoryWeight: 50,
      rationalWeight: 50,
    });
  },
}), {
  name: 'emotional-tagging-preferences',
});
