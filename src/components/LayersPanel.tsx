import React from 'react';
import { Layer } from '../types/studio';
import {
  Type,
  Image as ImageIcon,
  Square,
  Eye,
  EyeOff,
  Move,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';

interface LayersPanelProps {
  layers: Layer[];
  selectedLayerIndex: number | null;
  onSelectLayer: (index: number) => void;
  onUpdateLayer: (index: number, updates: Partial<Layer>) => void;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({
  layers,
  selectedLayerIndex,
  onSelectLayer,
  onUpdateLayer,
}) => {
  const selected = selectedLayerIndex !== null ? layers[selectedLayerIndex] : null;

  return (
    <div className="space-y-4">
      {/* Layer List */}
      <div>
        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-2">
          ক্যানভাসের উপাদান তালিকা (Layers)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
          {layers.map((l, idx) => {
            const isSel = idx === selectedLayerIndex;
            return (
              <div
                key={idx}
                onClick={() => onSelectLayer(idx)}
                className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition ${
                  isSel
                    ? 'border-[#a71924] bg-red-50/70 dark:bg-red-950/30 text-[#a71924] font-bold ring-1 ring-red-400'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  {l.type === 'image' ? (
                    <ImageIcon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  ) : l.type === 'rect' ? (
                    <Square className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  ) : (
                    <Type className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  )}
                  <span className="truncate">{l.id}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateLayer(idx, { visible: l.visible === false ? true : false });
                    }}
                    className="text-gray-400 hover:text-gray-600 p-0.5"
                    title={l.visible === false ? 'দেখুন' : 'লুকান'}
                  >
                    {l.visible === false ? (
                      <EyeOff className="w-3 h-3 text-gray-400" />
                    ) : (
                      <Eye className="w-3 h-3 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Layer Properties Inspector */}
      {selected && selectedLayerIndex !== null && (
        <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl border border-gray-200 dark:border-gray-700/80 space-y-3">
          <div className="text-xs font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-1.5 flex items-center justify-between">
            <span>উপাদান সম্পাদনা: {selected.id}</span>
            <span className="text-[10px] text-gray-400 uppercase font-mono">{selected.type}</span>
          </div>

          {/* Text input if text */}
          {selected.type === 'text' && (
            <div>
              <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                লেখা পরিবর্তন
              </label>
              <textarea
                rows={2}
                value={selected.text || ''}
                onChange={(e) => onUpdateLayer(selectedLayerIndex, { text: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          )}

          {/* Font Style Selector for this specific layer */}
          {selected.type === 'text' && (
            <div className="bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700">
              <label className="block text-[10px] font-bold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                <Type className="w-3 h-3 text-[#a71924]" />
                <span>ফন্ট স্টাইল নির্বাচন (Font Style)</span>
              </label>

              {/* 3 Quick Switch Buttons */}
              <div className="grid grid-cols-3 gap-1 mb-2">
                {[
                  { id: 'Hind Siliguri', name: 'Hind Siliguri', bn: 'হিন্দ শিলিগুড়ি' },
                  { id: 'Tiro Bangla', name: 'Tiro Bangla', bn: 'তিরো বাংলা' },
                  { id: 'Noto Sans Bengali', name: 'Noto Sans', bn: 'নোটো সান্স' },
                ].map((f) => {
                  const isCur = (selected.font || 'Noto Sans Bengali') === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => onUpdateLayer(selectedLayerIndex, { font: f.id })}
                      className={`p-1.5 rounded-lg border text-center transition-all ${
                        isCur
                          ? 'border-[#a71924] bg-red-50 dark:bg-red-950/40 text-[#a71924] font-bold ring-1 ring-red-400'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-[11px] truncate font-bold" style={{ fontFamily: f.id }}>
                        {f.name}
                      </div>
                      <div className="text-[9px] text-gray-400 truncate mt-0.5" style={{ fontFamily: f.id }}>
                        {f.bn}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Select Dropdown */}
              <select
                value={selected.font || 'Noto Sans Bengali'}
                onChange={(e) => onUpdateLayer(selectedLayerIndex, { font: e.target.value })}
                className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs font-medium"
              >
                <option value="Hind Siliguri">Hind Siliguri — আধুনিক ও সংবাদপত্র</option>
                <option value="Tiro Bangla">Tiro Bangla — সম্পাদকীয় ও ক্লাসিক</option>
                <option value="Noto Sans Bengali">Noto Sans Bengali — স্পষ্ট ডিজিটাল</option>
                <option value="Noto Serif Bengali">Noto Serif Bengali — ঐতিহ্যবাহী</option>
              </select>
            </div>
          )}

          {/* Typography Controls (Size, Weight, Color, Align) */}
          {selected.type === 'text' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  ফন্ট সাইজ ({selected.size || 30}px)
                </label>
                <input
                  type="number"
                  min={10}
                  max={160}
                  value={selected.size || 30}
                  onChange={(e) =>
                    onUpdateLayer(selectedLayerIndex, { size: Number(e.target.value) })
                  }
                  className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  লেখার রং
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={selected.color || '#18212b'}
                    onChange={(e) => onUpdateLayer(selectedLayerIndex, { color: e.target.value })}
                    className="w-7 h-7 rounded border border-gray-300 cursor-pointer p-0.5"
                  />
                  <span className="text-[10px] font-mono text-gray-500">{selected.color}</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  বোল্ড / ওজন
                </label>
                <select
                  value={selected.weight || 600}
                  onChange={(e) =>
                    onUpdateLayer(selectedLayerIndex, { weight: Number(e.target.value) })
                  }
                  className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs"
                >
                  <option value={400}>Regular (সাধারণ)</option>
                  <option value={600}>Semi-Bold (মাঝারি)</option>
                  <option value={700}>Bold (বোল্ড)</option>
                  <option value={800}>Extra-Bold (অতিরিক্ত বোল্ড)</option>
                  <option value={900}>Black (ভারী)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  অ্যালাইন
                </label>
                <div className="flex rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
                  <button
                    type="button"
                    onClick={() => onUpdateLayer(selectedLayerIndex, { align: 'left' })}
                    className={`flex-1 p-1 flex justify-center ${
                      selected.align === 'left' ? 'bg-red-100 dark:bg-red-950 text-red-600' : ''
                    }`}
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateLayer(selectedLayerIndex, { align: 'center' })}
                    className={`flex-1 p-1 flex justify-center ${
                      selected.align === 'center' ? 'bg-red-100 dark:bg-red-950 text-red-600' : ''
                    }`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateLayer(selectedLayerIndex, { align: 'right' })}
                    className={`flex-1 p-1 flex justify-center ${
                      selected.align === 'right' ? 'bg-red-100 dark:bg-red-950 text-red-600' : ''
                    }`}
                  >
                    <AlignRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Rect Fill */}
          {selected.type === 'rect' && (
            <div>
              <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                আকৃতির রং (Fill Color)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={selected.fill || selected.color || '#a71924'}
                  onChange={(e) =>
                    onUpdateLayer(selectedLayerIndex, {
                      fill: e.target.value,
                      color: e.target.value,
                    })
                  }
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer p-0.5"
                />
                <span className="text-xs font-mono text-gray-500">
                  {selected.fill || selected.color}
                </span>
              </div>
            </div>
          )}

          {/* Position X, Y & Width, Height */}
          <div className="grid grid-cols-4 gap-1.5">
            <div>
              <label className="block text-[9px] text-gray-500 mb-0.5">X পজিশন</label>
              <input
                type="number"
                value={Math.round(selected.x)}
                onChange={(e) => onUpdateLayer(selectedLayerIndex, { x: Number(e.target.value) })}
                className="w-full px-1.5 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-xs"
              />
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 mb-0.5">Y পজিশন</label>
              <input
                type="number"
                value={Math.round(selected.y)}
                onChange={(e) => onUpdateLayer(selectedLayerIndex, { y: Number(e.target.value) })}
                className="w-full px-1.5 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-xs"
              />
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 mb-0.5">প্রস্থ (W)</label>
              <input
                type="number"
                value={Math.round(selected.w)}
                onChange={(e) => onUpdateLayer(selectedLayerIndex, { w: Number(e.target.value) })}
                className="w-full px-1.5 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-xs"
              />
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 mb-0.5">উচ্চতা (H)</label>
              <input
                type="number"
                value={Math.round(selected.h)}
                onChange={(e) => onUpdateLayer(selectedLayerIndex, { h: Number(e.target.value) })}
                className="w-full px-1.5 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded text-xs"
              />
            </div>
          </div>

          {/* Opacity Slider */}
          <div>
            <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
              <span>অস্বচ্ছতা (Opacity)</span>
              <span>{Math.round((selected.opacity ?? 1) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1"
              step="0.05"
              value={selected.opacity ?? 1}
              onChange={(e) =>
                onUpdateLayer(selectedLayerIndex, { opacity: Number(e.target.value) })
              }
              className="w-full accent-[#a71924] cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
