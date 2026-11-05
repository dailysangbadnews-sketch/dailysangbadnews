import React, { useRef, useEffect } from 'react';
import { AspectRatio, Layer, StudioValues, TemplateId } from '../types/studio';
import { drawTemplateBackground } from '../data/templates';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Copy,
  Layers,
  ZoomIn,
  Move,
  AlignCenter,
  Undo2,
  Redo2,
  Maximize2,
} from 'lucide-react';

interface CanvasStageProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  layers: Layer[];
  selectedLayerIndex: number | null;
  onSelectLayer: (index: number | null) => void;
  onUpdateLayer: (index: number, updates: Partial<Layer>) => void;
  template: TemplateId;
  values: StudioValues;
  aspectRatio: AspectRatio;
  photoImg: HTMLImageElement | null;
  logoImg: HTMLImageElement | null;
  bgImg: HTMLImageElement | null;
  onAddText: () => void;
  onAddRect: () => void;
  onDuplicateLayer: () => void;
  onDeleteLayer: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  onCenterLayer: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  moveStep: number;
  onMoveStepChange: (step: number) => void;
  onMoveLayer: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

export const CanvasStage: React.FC<CanvasStageProps> = ({
  canvasRef,
  layers,
  selectedLayerIndex,
  onSelectLayer,
  onUpdateLayer,
  template,
  values,
  aspectRatio,
  photoImg,
  logoImg,
  bgImg,
  onAddText,
  onAddRect,
  onDuplicateLayer,
  onDeleteLayer,
  onBringToFront,
  onSendToBack,
  onCenterLayer,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  moveStep,
  onMoveStepChange,
  onMoveLayer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute Canvas Dimensions based on Aspect Ratio
  const W = 1080;
  const H = aspectRatio === '4:5' ? 1350 : aspectRatio === '16:9' ? 608 : 1080;

  // Text wrap function
  const wrapText = (
    cx: CanvasRenderingContext2D,
    str: string,
    maxW: number,
    size: number,
    weight: number,
    font: string
  ): string[] => {
    cx.font = `${weight} ${size}px "${font}", "Noto Sans Bengali", sans-serif`;
    const words = (str || '').split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const test = currentLine ? currentLine + ' ' + word : word;
      if (cx.measureText(test).width > maxW && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = test;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  // Helper for drawing image with cover fit
  const drawImageCover = (
    cx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number,
    scale: number = 1
  ) => {
    const ir = img.width / img.height;
    const br = w / h;
    let sx = 0;
    let sy = 0;
    let sw = img.width;
    let sh = img.height;

    if (ir > br) {
      sw = img.height * br;
      sx = (img.width - sw) / 2;
    } else {
      sh = img.width / br;
      sy = (img.height - sh) / 2;
    }

    sw /= scale;
    sh /= scale;
    sx += (img.width - sw) / 2 - (img.width - img.width / scale) / 2;
    sy += (img.height - sh) / 2 - (img.height - img.height / scale) / 2;

    cx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  };

  // Helper for rounded rectangle
  const roundRect = (
    cx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    cx.beginPath();
    if (cx.roundRect) {
      cx.roundRect(x, y, w, h, r);
    } else {
      cx.rect(x, y, w, h);
    }
  };

  // Render routine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.getContext('2d');
    if (!cx) return;

    // Set dimensions
    canvas.width = W;
    canvas.height = H;

    // Draw background
    cx.clearRect(0, 0, W, H);
    drawTemplateBackground(cx, template, W, H, values.accent, values.background, bgImg);

    // Draw each layer
    layers.forEach((layer, index) => {
      if (layer.visible === false) return;
      cx.save();
      cx.globalAlpha = layer.opacity ?? 1;

      if (layer.type === 'text') {
        const textStr = layer.text || '';
        const fontName = layer.font || values.font || 'Noto Sans Bengali';
        const fontSize = layer.size || 30;
        const fontWeight = layer.weight || 600;
        const fontStyle = `${fontWeight} ${fontSize}px "${fontName}", "Noto Sans Bengali", sans-serif`;

        cx.font = fontStyle;
        cx.fillStyle = layer.color || '#18212b';
        cx.textAlign = layer.align || 'left';
        cx.textBaseline = 'alphabetic';

        const maxLineWidth = Math.max(100, layer.w || 850);
        const lines = wrapText(cx, textStr, maxLineWidth, fontSize, fontWeight, fontName);
        const lineHeight = fontSize * 1.42;

        let startX = layer.x;
        if (layer.align === 'center') startX = layer.x;
        else if (layer.align === 'right') startX = layer.x + (layer.w || 850);

        let currentY = layer.y;
        lines.forEach((line) => {
          cx.fillText(line, startX, currentY);
          currentY += lineHeight;
        });
      } else if (layer.type === 'image') {
        const targetImg =
          layer.id === 'photo'
            ? photoImg
            : layer.id === 'logo'
            ? logoImg
            : layer._img;

        if (targetImg) {
          cx.save();
          roundRect(cx, layer.x, layer.y, layer.w, layer.h, Math.min(18, layer.w * 0.04));
          cx.clip();
          drawImageCover(cx, targetImg, layer.x, layer.y, layer.w, layer.h, layer.scale || 1);
          cx.restore();
        } else {
          // Placeholder box
          cx.fillStyle = '#dfe4e8';
          roundRect(cx, layer.x, layer.y, layer.w, layer.h, 14);
          cx.fill();
          cx.strokeStyle = '#9ba6b1';
          cx.setLineDash([9, 7]);
          cx.stroke();
          cx.setLineDash([]);
          cx.fillStyle = '#63717e';
          cx.font = '600 24px "Noto Sans Bengali", sans-serif';
          cx.textAlign = 'center';
          cx.textBaseline = 'middle';
          cx.fillText('ছবি যুক্ত করুন', layer.x + layer.w / 2, layer.y + layer.h / 2);
        }
      } else if (layer.type === 'rect') {
        cx.fillStyle = layer.fill || layer.color || '#a71924';
        roundRect(cx, layer.x, layer.y, layer.w, layer.h, 12);
        cx.fill();
      }

      cx.restore();

      // Draw selection bounding box
      if (index === selectedLayerIndex) {
        cx.save();
        cx.strokeStyle = '#1877d2';
        cx.lineWidth = 3;
        cx.setLineDash([10, 7]);
        const boxH = Math.max(layer.h, 45);
        cx.strokeRect(layer.x - 5, layer.y - 5, layer.w + 10, boxH + 10);
        cx.setLineDash([]);
        cx.fillStyle = '#1877d2';
        cx.fillRect(layer.x - 9, layer.y - 9, 14, 14);
        cx.fillRect(layer.x + layer.w - 5, layer.y - 9, 14, 14);
        cx.fillRect(layer.x - 9, layer.y + boxH - 5, 14, 14);
        cx.fillRect(layer.x + layer.w - 5, layer.y + boxH - 5, 14, 14);
        cx.restore();
      }
    });
  }, [layers, selectedLayerIndex, template, values, aspectRatio, photoImg, logoImg, bgImg]);

  // Handle canvas click to select layer
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Check layers in reverse order (topmost first)
    for (let i = layers.length - 1; i >= 0; i--) {
      const l = layers[i];
      const boxH = Math.max(l.h, 50);
      if (
        clickX >= l.x - 10 &&
        clickX <= l.x + l.w + 10 &&
        clickY >= l.y - 10 &&
        clickY <= l.y + boxH + 10
      ) {
        onSelectLayer(i);
        return;
      }
    }
    // Deselect if clicked outside
    onSelectLayer(null);
  };

  const selectedLayer = selectedLayerIndex !== null ? layers[selectedLayerIndex] : null;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 sm:p-4 shadow-sm">
      {/* Top Workspace Toolbar */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-gray-200 dark:border-gray-800 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={onAddText}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200"
            title="নতুন লেখা যোগ করুন"
          >
            <Plus className="w-3.5 h-3.5 text-[#a71924]" />
            <span>লেখা যোগ</span>
          </button>

          <button
            onClick={onAddRect}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200"
            title="রঙিন আকৃতি যোগ করুন"
          >
            <Plus className="w-3.5 h-3.5 text-blue-600" />
            <span>আকৃতি</span>
          </button>

          <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-1 hidden sm:block" />

          <button
            onClick={onDuplicateLayer}
            disabled={!selectedLayer}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 disabled:opacity-40"
            title="ডুপ্লিকেট"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            onClick={onDeleteLayer}
            disabled={!selectedLayer}
            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 dark:hover:bg-red-950/40 disabled:opacity-40"
            title="মুছুন"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={onCenterLayer}
            disabled={!selectedLayer}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 disabled:opacity-40"
            title="মাঝখানে আনুন"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-30"
            title="আগের অবস্থায় ফিরে যান"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-30"
            title="পরের অবস্থা"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Stage & Canvas */}
      <div
        ref={containerRef}
        className="flex-1 my-3 bg-[#e8ebef] dark:bg-[#0c131c] rounded-xl p-2 sm:p-4 flex items-center justify-center overflow-auto min-h-[360px] sm:min-h-[480px] shadow-inner"
      >
        <div className="w-full max-w-[560px] mx-auto transition-all shadow-2xl rounded-sm overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full h-auto block cursor-crosshair touch-none"
            style={{ aspectRatio: `${W}/${H}` }}
          />
        </div>
      </div>

      {/* Bottom Floating Bar / Position & Layer Controller */}
      {selectedLayer && selectedLayerIndex !== null ? (
        <div className="bg-gray-50 dark:bg-gray-800/80 p-3 rounded-xl border border-gray-200 dark:border-gray-700/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              নির্বাচিত উপাদান: <span className="text-[#a71924] font-semibold">{selectedLayer.id}</span>
            </span>

            {/* D-Pad Step Selector */}
            <div className="flex items-center gap-1 text-[11px] text-gray-500">
              <span>ধাপ:</span>
              <select
                value={moveStep}
                onChange={(e) => onMoveStepChange(Number(e.target.value))}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5 text-xs font-semibold"
              >
                <option value={5}>৫ px</option>
                <option value={10}>১০ px</option>
                <option value={25}>২৫ px</option>
                <option value={50}>৫০ px</option>
              </select>
            </div>
          </div>

          {/* Quick D-Pad Movement Controller */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => onMoveLayer('left')}
                className="p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-red-50 text-gray-800 dark:text-gray-200 active:scale-95 shadow-sm"
                title="বামে সরান"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => onMoveLayer('up')}
                  className="p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-red-50 text-gray-800 dark:text-gray-200 active:scale-95 shadow-sm"
                  title="উপরে সরান"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onMoveLayer('down')}
                  className="p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-red-50 text-gray-800 dark:text-gray-200 active:scale-95 shadow-sm"
                  title="নিচে সরান"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => onMoveLayer('right')}
                className="p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-red-50 text-gray-800 dark:text-gray-200 active:scale-95 shadow-sm"
                title="ডানে সরান"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scale / Zoom Slider */}
            <div className="flex items-center gap-2 flex-1 min-w-[160px] max-w-[240px]">
              <ZoomIn className="w-3.5 h-3.5 text-gray-400" />
              <div className="flex-1">
                <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                  <span>সাইজ / জুম</span>
                  <span>{Math.round((selectedLayer.scale || 1) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.05"
                  value={selectedLayer.scale || 1}
                  onChange={(e) =>
                    onUpdateLayer(selectedLayerIndex, { scale: Number(e.target.value) })
                  }
                  className="w-full accent-[#a71924] cursor-pointer"
                />
              </div>
            </div>

            {/* Front / Back */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onBringToFront}
                className="px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 text-gray-700 dark:text-gray-200"
              >
                সামনে
              </button>
              <button
                onClick={onSendToBack}
                className="px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 text-gray-700 dark:text-gray-200"
              >
                পেছনে
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-2 text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
          ক্যানভাসের যেকোনো লেখা বা ছবিতে ট্যাপ করে নির্বাচন করুন এবং সহজেই অবস্থান পরিবর্তন করুন
        </div>
      )}
    </div>
  );
};
