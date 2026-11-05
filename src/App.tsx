import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  AspectRatio,
  HistoryState,
  Layer,
  StudioValues,
  TemplateId,
} from './types/studio';
import {
  ALL_TEMPLATES,
  DEFAULT_VALUES,
  PRESETS,
  SAMPLE_PHOTOS,
} from './data/templates';
import { SampleCard } from './data/samplePresets';
import { Header } from './components/Header';
import { TemplateSelector } from './components/TemplateSelector';
import { ContentEditor } from './components/ContentEditor';
import { MediaBranding } from './components/MediaBranding';
import { CanvasStage } from './components/CanvasStage';
import { LayersPanel } from './components/LayersPanel';
import { QuickGuideModal } from './components/QuickGuideModal';
import { SamplePresetsModal } from './components/SamplePresetsModal';
import { DownloadModal } from './components/DownloadModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import {
  LayoutTemplate,
  FileText,
  Palette,
  Layers,
  Eye,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [template, setTemplate] = useState<TemplateId>('quote');
  const [values, setValues] = useState<StudioValues>(DEFAULT_VALUES);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);

  // Images state
  const [photoData, setPhotoData] = useState<string | null>(SAMPLE_PHOTOS[0].url);
  const [logoData, setLogoData] = useState<string | null>(null);
  const [bgData, setBgData] = useState<string | null>(null);

  const [photoImg, setPhotoImg] = useState<HTMLImageElement | null>(null);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [bgImg, setBgImg] = useState<HTMLImageElement | null>(null);

  // History for Undo/Redo
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  // Navigation / UI Modals
  const [activeTab, setActiveTab] = useState<'templates' | 'content' | 'media' | 'layers'>('templates');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSamplePresetsOpen, setIsSamplePresetsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [moveStep, setMoveStep] = useState<number>(10);
  const [downloadModalData, setDownloadModalData] = useState<{
    isOpen: boolean;
    imageUrl: string;
    imageType: 'png' | 'jpg';
    filename: string;
  }>({
    isOpen: false,
    imageUrl: '',
    imageType: 'png',
    filename: '',
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const projectInputRef = useRef<HTMLInputElement>(null);

  // Helper to load image element from src/dataURL
  const loadImage = (src: string | null): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  };

  // Sync photo image element when photoData changes
  useEffect(() => {
    let active = true;
    loadImage(photoData).then((img) => {
      if (active) setPhotoImg(img);
    });
    return () => {
      active = false;
    };
  }, [photoData]);

  // Sync logo image element when logoData changes
  useEffect(() => {
    let active = true;
    loadImage(logoData).then((img) => {
      if (active) setLogoImg(img);
    });
    return () => {
      active = false;
    };
  }, [logoData]);

  // Sync background image element when bgData changes
  useEffect(() => {
    let active = true;
    loadImage(bgData).then((img) => {
      if (active) setBgImg(img);
    });
    return () => {
      active = false;
    };
  }, [bgData]);

  // Push state to undo history
  const recordHistory = useCallback(
    (customLayers?: Layer[], customValues?: StudioValues, customTemplate?: TemplateId) => {
      const stateObj: HistoryState = {
        layers: customLayers || layers,
        template: customTemplate || template,
        values: customValues || values,
        aspectRatio,
        photoData,
        logoData,
        bgData,
      };
      setUndoStack((prev) => {
        const next = [...prev, JSON.stringify(stateObj)];
        return next.length > 30 ? next.slice(1) : next;
      });
      setRedoStack([]);
    },
    [layers, template, values, aspectRatio, photoData, logoData, bgData]
  );

  // Initialize or rebuild layers when template changes
  const buildTemplate = useCallback(
    (tplId: TemplateId, currentVals: StudioValues, saveHistory = true) => {
      setTemplate(tplId);

      const isDark = [
        'darkquote',
        'gold',
        'impact',
        'breaking',
        'night',
        'premium',
        'feature',
        'cinema',
        'photojournal',
        'flashbrief',
      ].includes(tplId);

      const isGreen = ['green', 'minimal', 'agri', 'data'].includes(tplId);

      const nextAccent = isDark ? '#d0aa61' : isGreen ? '#176b54' : '#a71924';
      const nextBackground = isDark ? '#172330' : isGreen ? '#edf3ef' : '#f5f5f2';

      const updatedValues = {
        ...currentVals,
        accent: nextAccent,
        background: nextBackground,
      };
      setValues(updatedValues);

      const presetArr = PRESETS[tplId] || PRESETS.quote;
      const newLayers: Layer[] = presetArr.map((item) => {
        const [id, type, x, y, p5, p6, p7, p8] = item;
        const textContent =
          id === 'brand'
            ? updatedValues.brand
            : id === 'date'
            ? updatedValues.date
            : id === 'headline'
            ? updatedValues.headline
            : id === 'bodytext'
            ? updatedValues.bodytext
            : id === 'person'
            ? updatedValues.person
            : id === 'role'
            ? updatedValues.role
            : id === 'footer'
            ? updatedValues.footer
            : '';

        const layer: Layer = {
          id,
          type,
          x,
          y,
          w: type === 'image' ? (p5 as number) : 700,
          h: type === 'image' ? (p6 as number) : 90,
          size: type === 'text' ? (p5 as number) : 30,
          color: type === 'text' ? (p6 as string) : '#222222',
          weight: p7 || 600,
          align: p8 || 'left',
          opacity: 1,
          scale: 1,
          fill: (p6 as string) || '#a71924',
          text: textContent,
          visible: true,
          src: type === 'image' ? photoData : null,
        };
        return layer;
      });

      // Special quote mark for quote template
      if (tplId === 'quote') {
        newLayers.push({
          id: 'কোট চিহ্ন',
          type: 'text',
          x: 115,
          y: 315,
          w: 80,
          h: 80,
          size: 120,
          color: '#a71924',
          weight: 900,
          align: 'left',
          opacity: 1,
          scale: 1,
          text: '“',
          visible: true,
        });
      }

      setLayers(newLayers);
      const headlineIdx = newLayers.findIndex((x) => x.id === 'headline');
      setSelectedLayerIndex(headlineIdx >= 0 ? headlineIdx : 0);

      if (saveHistory) {
        recordHistory(newLayers, updatedValues, tplId);
      }
    },
    [photoData, recordHistory]
  );

  // Initial load
  useEffect(() => {
    buildTemplate('quote', DEFAULT_VALUES, false);
  }, []);

  // Update text or font in layers when values change
  const handleValuesChange = (key: keyof StudioValues, val: string) => {
    const updated = { ...values, [key]: val };
    setValues(updated);

    if (key === 'font') {
      setLayers((prev) =>
        prev.map((l) => {
          if (l.type === 'text') {
            return { ...l, font: val };
          }
          return l;
        })
      );
    } else {
      // Sync corresponding layer text
      setLayers((prev) =>
        prev.map((l) => {
          if (l.id === key) {
            return { ...l, text: val };
          }
          return l;
        })
      );
    }
  };

  // Set today's Bengali date
  const handleSetTodayDate = () => {
    const banglaMonths = [
      'জানুয়ারি',
      'ফেব্রুয়ারি',
      'মার্চ',
      'এপ্রিল',
      'মে',
      'জুন',
      'জুলাই',
      'আগস্ট',
      'সেপ্টেম্বর',
      'অক্টোবর',
      'নভেম্বর',
      'ডিসেম্বর',
    ];
    const toBengaliNumber = (num: number) => {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return String(num)
        .split('')
        .map((d) => bnDigits[Number(d)] || d)
        .join('');
    };

    const now = new Date();
    const day = toBengaliNumber(now.getDate());
    const month = banglaMonths[now.getMonth()];
    const year = toBengaliNumber(now.getFullYear());
    const formatted = `${day} ${month} ${year}`;
    handleValuesChange('date', formatted);
    setStatusMessage('তারিখ হালনাগাদ করা হয়েছে!');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  // Layer manipulation
  const handleUpdateLayer = (idx: number, updates: Partial<Layer>) => {
    setLayers((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], ...updates };
      return next;
    });
  };

  const handleMoveLayer = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (selectedLayerIndex === null) return;
    setLayers((prev) => {
      const next = [...prev];
      const target = { ...next[selectedLayerIndex] };
      if (direction === 'up') target.y -= moveStep;
      if (direction === 'down') target.y += moveStep;
      if (direction === 'left') target.x -= moveStep;
      if (direction === 'right') target.x += moveStep;
      next[selectedLayerIndex] = target;
      return next;
    });
  };

  const handleAddText = () => {
    const newLayer: Layer = {
      id: `নতুন লেখা ${layers.length + 1}`,
      type: 'text',
      x: 300,
      y: 500,
      w: 500,
      h: 80,
      size: 40,
      color: '#18212b',
      weight: 700,
      align: 'left',
      opacity: 1,
      scale: 1,
      text: 'এখানে আপনার টেক্সট লিখুন',
      visible: true,
    };
    const next = [...layers, newLayer];
    setLayers(next);
    setSelectedLayerIndex(next.length - 1);
    recordHistory(next);
  };

  const handleAddRect = () => {
    const newLayer: Layer = {
      id: `রঙিন আকৃতি ${layers.length + 1}`,
      type: 'rect',
      x: 300,
      y: 450,
      w: 400,
      h: 90,
      size: 30,
      color: values.accent,
      fill: values.accent,
      opacity: 1,
      scale: 1,
      visible: true,
    };
    const next = [...layers, newLayer];
    setLayers(next);
    setSelectedLayerIndex(next.length - 1);
    recordHistory(next);
  };

  const handleDuplicateLayer = () => {
    if (selectedLayerIndex === null) return;
    const item = layers[selectedLayerIndex];
    const duplicated: Layer = {
      ...JSON.parse(JSON.stringify(item)),
      id: `${item.id} কপি`,
      x: item.x + 25,
      y: item.y + 25,
    };
    const next = [...layers, duplicated];
    setLayers(next);
    setSelectedLayerIndex(next.length - 1);
    recordHistory(next);
  };

  const handleDeleteLayer = () => {
    if (selectedLayerIndex === null) return;
    const next = layers.filter((_, i) => i !== selectedLayerIndex);
    setLayers(next);
    setSelectedLayerIndex(next.length > 0 ? Math.min(selectedLayerIndex, next.length - 1) : null);
    recordHistory(next);
  };

  const handleBringToFront = () => {
    if (selectedLayerIndex === null) return;
    const item = layers[selectedLayerIndex];
    const next = layers.filter((_, i) => i !== selectedLayerIndex);
    next.push(item);
    setLayers(next);
    setSelectedLayerIndex(next.length - 1);
    recordHistory(next);
  };

  const handleSendToBack = () => {
    if (selectedLayerIndex === null) return;
    const item = layers[selectedLayerIndex];
    const next = layers.filter((_, i) => i !== selectedLayerIndex);
    next.unshift(item);
    setLayers(next);
    setSelectedLayerIndex(0);
    recordHistory(next);
  };

  const handleCenterLayer = () => {
    if (selectedLayerIndex === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const item = layers[selectedLayerIndex];
    const next = [...layers];
    next[selectedLayerIndex] = {
      ...item,
      x: (canvas.width - item.w) / 2,
    };
    setLayers(next);
    recordHistory(next);
  };

  // Undo / Redo
  const handleUndo = () => {
    if (undoStack.length < 2) return;
    const current = undoStack[undoStack.length - 1];
    const previous = undoStack[undoStack.length - 2];

    setRedoStack((prev) => [...prev, current]);
    setUndoStack((prev) => prev.slice(0, prev.length - 1));

    try {
      const parsed: HistoryState = JSON.parse(previous);
      setLayers(parsed.layers);
      setTemplate(parsed.template);
      setValues(parsed.values);
      setAspectRatio(parsed.aspectRatio);
      setPhotoData(parsed.photoData);
      setLogoData(parsed.logoData);
      setBgData(parsed.bgData);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, prev.length - 1));
    setUndoStack((prev) => [...prev, nextState]);

    try {
      const parsed: HistoryState = JSON.parse(nextState);
      setLayers(parsed.layers);
      setTemplate(parsed.template);
      setValues(parsed.values);
      setAspectRatio(parsed.aspectRatio);
      setPhotoData(parsed.photoData);
      setLogoData(parsed.logoData);
      setBgData(parsed.bgData);
    } catch (e) {
      console.error(e);
    }
  };

  // Image Uploads
  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPhotoData(dataUrl);
      setLayers((prev) =>
        prev.map((l) => (l.id === 'photo' ? { ...l, src: dataUrl } : l))
      );
      setStatusMessage('ছবি সফলভাবে আপলোড হয়েছে!');
      setTimeout(() => setStatusMessage(''), 2500);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setLogoData(dataUrl);
      // Ensure logo layer exists
      if (!layers.find((l) => l.id === 'logo')) {
        const logoLayer: Layer = {
          id: 'logo',
          type: 'image',
          x: 360,
          y: 22,
          w: 360,
          h: 90,
          opacity: 1,
          scale: 1,
          visible: true,
          src: dataUrl,
        };
        setLayers((prev) => [...prev, logoLayer]);
      }
      setStatusMessage('লোগো যুক্ত হয়েছে!');
      setTimeout(() => setStatusMessage(''), 2500);
    };
    reader.readAsDataURL(file);
  };

  const handleBgUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setBgData(reader.result as string);
      setStatusMessage('ব্যাকগ্রাউন্ড ছবি যুক্ত হয়েছে!');
      setTimeout(() => setStatusMessage(''), 2500);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSamplePhoto = (url: string) => {
    setPhotoData(url);
    setLayers((prev) =>
      prev.map((l) => (l.id === 'photo' ? { ...l, src: url } : l))
    );
    setStatusMessage('নমুনা ছবি লোড হয়েছে!');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  // Downloads & Export
  const handleDownload = (type: 'png' | 'jpg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Deselect layer so bounding box is not rendered in downloaded image
    setSelectedLayerIndex(null);

    // Small timeout to allow re-render without selection rectangle
    setTimeout(() => {
      const filename = `Dainik-Sangbad-${template}-${Date.now()}.${type}`;
      const mime = type === 'jpg' ? 'image/jpeg' : 'image/png';

      try {
        const dataUrl = canvas.toDataURL(mime, 0.95);

        // Open preview modal for mobile & desktop
        setDownloadModalData({
          isOpen: true,
          imageUrl: dataUrl,
          imageType: type,
          filename,
        });

        // Trigger direct browser download
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setStatusMessage(`${type.toUpperCase()} কার্ড প্রস্তুত হয়েছে!`);
        setTimeout(() => setStatusMessage(''), 3000);
      } catch (e) {
        // Fallback for CORS or canvas security restrictions
        canvas.toBlob(
          (blob) => {
            if (!blob) return;
            const blobUrl = URL.createObjectURL(blob);
            setDownloadModalData({
              isOpen: true,
              imageUrl: blobUrl,
              imageType: type,
              filename,
            });

            const link = document.createElement('a');
            link.download = filename;
            link.href = blobUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setStatusMessage(`${type.toUpperCase()} কার্ড ডাউনলোড হয়েছে!`);
            setTimeout(() => setStatusMessage(''), 3000);
          },
          mime,
          0.95
        );
      }
    }, 120);
  };

  const handleDownloadOfflineApp = () => {
    const link = document.createElement('a');
    link.href = '/assets/aistudio/Farhad_Ahmad_Mobile_Professional_News_Graphics_Studio_019342aa.html';
    link.download = 'Dainik-Sangbad-News-Graphics-Studio-Offline.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setStatusMessage('অফলাইন অ্যাপ ফাইল ডাউনলোড সম্পন্ন হয়েছে!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleCopyImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setSelectedLayerIndex(null);

    setTimeout(() => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        try {
          navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setIsCopied(true);
          setStatusMessage('ছবি ক্লিপবোর্ডে কপি হয়েছে! সরাসরি ফেসবুকে পেস্ট (Ctrl+V) করতে পারবেন।');
          setTimeout(() => setIsCopied(false), 2500);
          setTimeout(() => setStatusMessage(''), 4000);
        } catch (e) {
          console.error(e);
          setStatusMessage('ক্লিপবোর্ডে কপি করা যায়নি। অনুগ্রহ করে ডাউনলোড বাটন ব্যবহার করুন।');
        }
      }, 'image/png');
    }, 120);
  };

  // Reset
  const handleReset = () => {
    if (!window.confirm('আপনি কি নিশ্চিত যে বর্তমান সমস্ত কাজ রিসেট করবেন?')) return;
    setValues(DEFAULT_VALUES);
    setPhotoData(SAMPLE_PHOTOS[0].url);
    setLogoData(null);
    setBgData(null);
    buildTemplate('quote', DEFAULT_VALUES, false);
    setStatusMessage('সবকিছু নতুন করে রিসেট করা হয়েছে!');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  // Save Project JSON
  const handleSaveProject = () => {
    const project = {
      template,
      values,
      aspectRatio,
      layers,
      photoData,
      logoData,
      bgData,
    };
    const blob = new Blob([JSON.stringify(project, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sangbad-Project-${template}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMessage('প্রজেক্ট JSON ফাইল সেভ হয়েছে!');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  // Open Project JSON
  const handleOpenProject = () => {
    projectInputRef.current?.click();
  };

  const handleProjectFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(reader.result as string);
        if (obj.template) setTemplate(obj.template);
        if (obj.values) setValues(obj.values);
        if (obj.aspectRatio) setAspectRatio(obj.aspectRatio);
        if (obj.layers) setLayers(obj.layers);
        if (obj.photoData) setPhotoData(obj.photoData);
        if (obj.logoData) setLogoData(obj.logoData);
        if (obj.bgData) setBgData(obj.bgData);
        setSelectedLayerIndex(0);
        setStatusMessage('প্রজেক্ট ফাইল সফলভাবে খোলা হয়েছে!');
        setTimeout(() => setStatusMessage(''), 2500);
      } catch (err) {
        alert('প্রজেক্ট ফাইলটি পড়া যায়নি বা ফাইলের ফরম্যাট ভুল।');
      }
    };
    reader.readAsText(file);
  };

  // Apply Sample Preset Card
  const handleApplySamplePreset = (sample: SampleCard) => {
    const updatedValues: StudioValues = {
      ...values,
      ...sample.values,
    };
    setValues(updatedValues);
    setPhotoData(sample.photoUrl);
    buildTemplate(sample.template, updatedValues, true);
    setStatusMessage(`"${sample.title}" নমুনা সফলভাবে লোড হয়েছে!`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f3f5f8] dark:bg-[#0d1520] text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      {/* Hidden file input for opening project */}
      <input
        type="file"
        ref={projectInputRef}
        onChange={handleProjectFileChange}
        accept=".json,application/json"
        className="hidden"
      />

      {/* Global Header */}
      <Header
        onDownload={handleDownload}
        onCopyImage={handleCopyImage}
        onReset={handleReset}
        onSaveProject={handleSaveProject}
        onOpenProject={handleOpenProject}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenSamplePresets={() => setIsSamplePresetsOpen(true)}
        onDownloadOfflineApp={handleDownloadOfflineApp}
        isCopied={isCopied}
        statusMessage={statusMessage}
      />

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-2 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start">
        {/* Left Column: Design Library & Content Inputs */}
        <aside className="lg:col-span-4 xl:col-span-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col h-[calc(100vh-100px)] sticky top-20 overflow-hidden">
          {/* Tabs */}
          <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 mb-3">
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'templates'
                  ? 'bg-white dark:bg-gray-700 text-[#a71924] dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>ডিজাইন ({ALL_TEMPLATES.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'content'
                  ? 'bg-white dark:bg-gray-700 text-[#a71924] dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>সংবাদের তথ্য</span>
            </button>
          </div>

          {/* Tab Body */}
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
            {activeTab === 'templates' ? (
              <TemplateSelector
                currentTemplate={template}
                onSelectTemplate={(tplId) => buildTemplate(tplId, values, true)}
              />
            ) : (
              <ContentEditor
                values={values}
                onChange={handleValuesChange}
                onSetTodayDate={handleSetTodayDate}
              />
            )}
          </div>
        </aside>

        {/* Center Column: Interactive Canvas Stage */}
        <section className="lg:col-span-5 xl:col-span-6 flex flex-col h-full min-h-[500px]">
          <CanvasStage
            canvasRef={canvasRef}
            layers={layers}
            selectedLayerIndex={selectedLayerIndex}
            onSelectLayer={setSelectedLayerIndex}
            onUpdateLayer={handleUpdateLayer}
            template={template}
            values={values}
            aspectRatio={aspectRatio}
            photoImg={photoImg}
            logoImg={logoImg}
            bgImg={bgImg}
            onAddText={handleAddText}
            onAddRect={handleAddRect}
            onDuplicateLayer={handleDuplicateLayer}
            onDeleteLayer={handleDeleteLayer}
            onBringToFront={handleBringToFront}
            onSendToBack={handleSendToBack}
            onCenterLayer={handleCenterLayer}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={undoStack.length > 1}
            canRedo={redoStack.length > 0}
            moveStep={moveStep}
            onMoveStepChange={setMoveStep}
            onMoveLayer={handleMoveLayer}
          />
        </section>

        {/* Right Column: Media, Branding & Layers Inspector */}
        <aside className="lg:col-span-3 xl:col-span-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col h-[calc(100vh-100px)] sticky top-20 overflow-hidden">
          {/* Secondary Tabs */}
          <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 mb-3">
            <button
              onClick={() => setActiveTab('media')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'media'
                  ? 'bg-white dark:bg-gray-700 text-[#a71924] dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>ছবি ও রঙ</span>
            </button>

            <button
              onClick={() => setActiveTab('layers')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'layers'
                  ? 'bg-white dark:bg-gray-700 text-[#a71924] dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>লেয়ার ({layers.length})</span>
            </button>
          </div>

          {/* Right Tab Body */}
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
            {activeTab === 'media' ? (
              <MediaBranding
                values={values}
                aspectRatio={aspectRatio}
                onValuesChange={handleValuesChange}
                onAspectRatioChange={(r) => {
                  setAspectRatio(r);
                  recordHistory();
                }}
                onPhotoUpload={handlePhotoUpload}
                onLogoUpload={handleLogoUpload}
                onBgUpload={handleBgUpload}
                onSelectSamplePhoto={handleSelectSamplePhoto}
                hasPhoto={!!photoData}
                hasLogo={!!logoData}
                hasBg={!!bgData}
                onRemovePhoto={() => {
                  setPhotoData(null);
                  setLayers((prev) =>
                    prev.map((l) => (l.id === 'photo' ? { ...l, src: null } : l))
                  );
                }}
                onRemoveLogo={() => {
                  setLogoData(null);
                  setLayers((prev) => prev.filter((l) => l.id !== 'logo'));
                }}
              />
            ) : (
              <LayersPanel
                layers={layers}
                selectedLayerIndex={selectedLayerIndex}
                onSelectLayer={setSelectedLayerIndex}
                onUpdateLayer={handleUpdateLayer}
              />
            )}
          </div>
        </aside>
      </main>

      {/* Modals */}
      <QuickGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <SamplePresetsModal
        isOpen={isSamplePresetsOpen}
        onClose={() => setIsSamplePresetsOpen(false)}
        onSelectSample={handleApplySamplePreset}
      />
      <DownloadModal
        isOpen={downloadModalData.isOpen}
        onClose={() => setDownloadModalData((prev) => ({ ...prev, isOpen: false }))}
        imageUrl={downloadModalData.imageUrl}
        imageType={downloadModalData.imageType}
        filename={downloadModalData.filename}
      />
      <OfflineIndicator />
    </div>
  );
}
