import React, { useState, useEffect } from 'react';
import {
  Sprout,
  Thermometer,
  Droplets,
  AlertTriangle,
  TrendingDown,
  Sparkles,
  Download,
  History,
  Globe,
  User,
  TrendingUp,
  Coins,
  FileText,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Play,
  ArrowRight,
  Printer,
  Scale,
  BrainCircuit,
  Award,
  ShieldCheck,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Scientific Agricultural Crop Configurations
interface CropConfig {
  id: string;
  nameEn: string;
  nameTe: string;
  safeMoisture: number;
  criticalMoisture: number;
  basePricePerTon: number; // in INR
  avatar: string;
}

const crops: CropConfig[] = [
  {
    id: 'paddy',
    nameEn: 'Paddy (Rice)',
    nameTe: 'వరి (ప్యాడీ)',
    safeMoisture: 13.5,
    criticalMoisture: 16.0,
    basePricePerTon: 22000,
    avatar: '🌾'
  },
  {
    id: 'wheat',
    nameEn: 'Wheat',
    nameTe: 'గోధుమలు',
    safeMoisture: 13.0,
    criticalMoisture: 15.0,
    basePricePerTon: 24000,
    avatar: '🍞'
  },
  {
    id: 'maize',
    nameEn: 'Maize (Corn)',
    nameTe: 'మొక్కజొన్న',
    safeMoisture: 13.0,
    criticalMoisture: 15.5,
    basePricePerTon: 21500,
    avatar: '🌽'
  },
  {
    id: 'sorghum',
    nameEn: 'Sorghum (Jowar)',
    nameTe: 'జొన్నలు',
    safeMoisture: 12.5,
    criticalMoisture: 15.0,
    basePricePerTon: 27000,
    avatar: '🌾'
  },
  {
    id: 'pulses',
    nameEn: 'Bengal Gram',
    nameTe: 'శనగలు',
    safeMoisture: 11.5,
    criticalMoisture: 14.0,
    basePricePerTon: 56000,
    avatar: '🌱'
  }
];

// Bilingual Translations Mapping
const translations = {
  en: {
    title: "GRAINGUARDIAN",
    subtitle: "Storage Intelligence for Post-Harvest Decisions",
    tagline: "Know when to store. Know when to act.",
    description: "Assess grain bulk conditions, understand complex physiological storage risks, predict potential financial deterioration, and secure direct scientific and AI-powered recommendations.",
    startAssessment: "Start Storage Assessment",
    viewDemo: "Load Wet Batch (Demo)",
    healthScore: "Grain Health Score",
    storageRisk: "Storage Risk",
    financialImpact: "Potential Financial Impact",
    actionsCount: "Recommended Actions",
    cropType: "Primary Crop Type",
    moistureContent: "Grain Moisture Content",
    temperature: "Storage Ambient Temperature",
    humidity: "Relative Air Humidity",
    batchMass: "Total Batch Mass",
    assessmentResult: "Live Intelligence Analysis",
    safeToStore: "SAFE TO STORE",
    notSafeToStore: "ATTENTION / ACTION REQUIRED",
    warningTitle: "WARNING / EXPOSURE RISK",
    criticalTitle: "CRITICAL / DECAY DETECTED",
    recsTitle: "Preservation Guidelines & Tactical Actions",
    risksTitle: "Biosecurity and Physiological Storage Risks",
    recentAssessments: "Telemetry Assessment Log & History",
    downloadLabel: "Download Report",
    expertModeActive: "EXPERT METRICS ACTIVE (EMC, DEWPOINT)",
    farmerModeActive: "FARMER ASSIST ACTIVE (LOCALLY OPTIMIZED)",
    languageLabel: "తెలుగు",
    modeLabel: "Expert View",
    saveLog: "Log Bin Telemetry",
    clearLogs: "Clear Local logs",
    loadingAI: "Synthesizing AI Agricultural Advisory Report...",
    consultGemini: "Power Intelligence with Gemini AI",
    aiAdvisoryResult: "Gemini AI Strategic Storage Report",
    fungalRisk: "Fungal Sprouting Hazard",
    moistureThreshold: "Safe Moisture Threshold",
    deteriorationRisk: "Deterioration Rate",
    tonnes: "Metric Tons",
    low: "LOW",
    medium: "MEDIUM",
    high: "HIGH",
    critical: "CRITICAL",
    noHistory: "No assessments logged for this device yet.",
    logDeleted: "Assessment cleared.",
    printReport: "Generate Professional PDF Report",
    reportSubtitle: "Post-Harvest Telemetry Certificate",
    grainHealthModel: "GrainGuardian Mathematical Model v2.4",
    binRef: "Storage Bin / Lot Reference",
    optionalBin: "e.g., Silo B-4",
    standardRulesTab: "Standard Calculations",
    geminiAdvisorTab: "Gemini AI Storage Advisory"
  },
  te: {
    title: "ధాన్యసంరక్షక",
    subtitle: "పంట తదుపరి నిల్వ నిర్ణయాల కోసం నిఘా వేదిక",
    tagline: "ఎప్పుడు నిల్వ చేయాలో తెలుసుకోండి. ఎప్పుడు స్పందించాలో తెలుసుకోండి.",
    description: "ధాన్యం పరిస్థితులను అంచనా వేయండి, నిల్వ ప్రమాదాలను అర్థం చేసుకోండి, సంభావ్య ఆర్థిక నష్టాలను ఊహించండి మరియు స్పష్టమైన సిఫార్సులను పొందండి.",
    startAssessment: "నిల్వ మూల్యాంకనాన్ని ప్రారంభించండి",
    viewDemo: "వెట్ బ్యాచ్ (డెమో) లోడ్ చేయండి",
    healthScore: "ధాన్యం ఆరోగ్య స్కోరు",
    storageRisk: "నిల్వ ప్రమాద స్థాయి",
    financialImpact: "సంభావ్య ఆర్థిక నష్టం",
    actionsCount: "సిఫార్సు చేయబడిన చర్యలు",
    cropType: "పంట రకాన్ని ఎంచుకోండి",
    moistureContent: "ధాన్యంలో తేమ శాతం",
    temperature: "నిల్వ ఉష్ణోగ్రత",
    humidity: "సాపేక్ష గాలి ఆర్ద్రత",
    batchMass: "మొత్తం బ్యాచ్ బరువు",
    assessmentResult: "ప్రత్యక్ష విశ్లేషణ ఫలితం",
    safeToStore: "నిల్వకు సురక్షితమైనది",
    notSafeToStore: "శ్రద్ధ వహించండి / ఆరబెట్టాలి",
    warningTitle: "హెచ్చరిక / నష్టపోయే అవకాశం",
    criticalTitle: "తీవ్రమైన ప్రమాదం / కుళ్లిపోయే స్థితి",
    recsTitle: "ధాన్యం భద్రత మరియు సిఫార్సులు",
    risksTitle: "జీవ భద్రత మరియు నిల్వ ప్రమాదాలు",
    recentAssessments: "ఇటీవలి మూల్యాంకనాల రికార్డులు",
    downloadLabel: "నివేదిక డౌన్‌లోడ్",
    expertModeActive: "నిపుణుల కొలమానాలు (EMC, డ్యూపాయింట్)",
    farmerModeActive: "రైతు మోడ్ (స్పష్టమైన సూచనలు)",
    languageLabel: "English",
    modeLabel: "నిపుణుల వీక్షణ",
    saveLog: "రికార్డును దాచుకోండి",
    clearLogs: "అన్ని రికార్డులను తీసివేయండి",
    loadingAI: "శాస్త్రీయ AI సిఫార్సులను లెక్కిస్తోంది...",
    consultGemini: "జెమిని AI నిపుణుడి సలహా పొందండి",
    aiAdvisoryResult: "జెమిని AI ధాన్యం నిపుణుడు",
    fungalRisk: "శిలీంధ్రాల వ్యాప్తి",
    moistureThreshold: "సురక్షిత తేమ పరిమితి",
    deteriorationRisk: "క్షీణత శాతం",
    tonnes: "మెట్రిక్ టన్నులు",
    low: "తక్కువ",
    medium: "మితమైన",
    high: "ఎక్కువ",
    critical: "తీవ్ర ప్రమాదం",
    noHistory: "ఈ పరికరంలో ఇంకా రికార్డులు ఏవీ లేవు.",
    logDeleted: "అంచనా తొలగించబడింది.",
    printReport: "అధికారిక నివేదికను ప్రింట్ చేయండి",
    reportSubtitle: "ధాన్య ఆరోగ్య భద్రతా పత్రం",
    grainHealthModel: "ధాన్య సంరక్షక మోడల్ v2.4",
    binRef: "నిల్వ బిన్ / లాట్ రిఫరెన్స్",
    optionalBin: "ఉదా: సైలో B-4",
    standardRulesTab: "ప్రామాణిక గణనలు",
    geminiAdvisorTab: "జెమిని AI నిల్వ సలహాదారు"
  }
};

interface ScanLog {
  id: string;
  timestamp: string;
  binRef: string;
  cropId: string;
  moisture: number;
  temperature: number;
  humidity: number;
  mass: number;
  healthScore: number;
  risk: string;
  financialLoss: number;
}

export default function App() {
  // Application Modes and Localization States
  const [lang, setLang] = useState<'en' | 'te'>('en');
  const [isExpertMode, setIsExpertMode] = useState<boolean>(true);

  // Storage Input Telemetry States
  const [selectedCrop, setSelectedCrop] = useState<string>('paddy');
  const [moisture, setMoisture] = useState<number>(14.5);
  const [temperature, setTemperature] = useState<number>(28);
  const [humidity, setHumidity] = useState<number>(72);
  const [mass, setMass] = useState<number>(50);
  const [binRef, setBinRef] = useState<string>('');

  // Assessment History List
  const [historyLogs, setHistoryLogs] = useState<ScanLog[]>([]);

  // Server-Side Gemini Advisor State
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<any | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [advisorTab, setAdvisorTab] = useState<'calc' | 'ai'>('calc');

  const text = translations[lang];

  // Initialize Default History Logs (Mode Analytics Busy Look)
  useEffect(() => {
    const saved = localStorage.getItem('grain_guardian_logs');
    if (saved) {
      try {
        setHistoryLogs(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      const initialLogs: ScanLog[] = [
        {
          id: '1',
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          binRef: 'Bulk Silo A3',
          cropId: 'paddy',
          moisture: 13.0,
          temperature: 22,
          humidity: 58,
          mass: 120,
          healthScore: 95,
          risk: 'LOW',
          financialLoss: 0
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          binRef: 'Storage Vault 2',
          cropId: 'wheat',
          moisture: 15.2,
          temperature: 31,
          humidity: 78,
          mass: 80,
          healthScore: 62,
          risk: 'HIGH',
          financialLoss: 43200
        }
      ];
      setHistoryLogs(initialLogs);
      localStorage.setItem('grain_guardian_logs', JSON.stringify(initialLogs));
    }
  }, [lang]);

  // Handle Demo Triggers
  const triggerDemo = () => {
    setSelectedCrop('maize');
    setMoisture(17.8);
    setTemperature(34);
    setHumidity(81);
    setMass(115);
    setBinRef('Demo Wet Batch 🌽');
    setAdvisorTab('calc');
    
    // Smooth scroll down to assessment target
    const element = document.getElementById('assessment-tool');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const jumpToAssessment = () => {
    const element = document.getElementById('assessment-tool');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Run Grain Science Mathematical Engine
  const getCalculations = () => {
    const crop = crops.find(c => c.id === selectedCrop) || crops[0];

    // 1. Calculate Moisture Deduction
    let moistureDeduction = 0;
    if (moisture > crop.safeMoisture) {
      const delta = moisture - crop.safeMoisture;
      if (moisture <= crop.criticalMoisture) {
        moistureDeduction = delta * 8; // standard penalty gradient
      } else {
        const excessDelta = moisture - crop.criticalMoisture;
        moistureDeduction = ((crop.criticalMoisture - crop.safeMoisture) * 8) + (excessDelta * 16);
      }
    }

    // 2. Calculate Temperature Deduction (Insect and Hotspot risk acceleration)
    let tempDeduction = 0;
    if (temperature > 25) {
      const delta = temperature - 25;
      if (temperature <= 32) {
        tempDeduction = delta * 2.5;
      } else {
        const criticalDelta = temperature - 32;
        tempDeduction = (7 * 2.5) + (criticalDelta * 6.5);
      }
    } else if (temperature < 15) {
      tempDeduction = -3; // slight cold health benefit
    }

    // 3. Relative Humidity Deduction (Equilibrium Mold Incubation)
    let humidityDeduction = 0;
    if (humidity > 65) {
      const delta = humidity - 65;
      if (humidity <= 76) {
        humidityDeduction = delta * 0.9;
      } else {
        const severeDelta = humidity - 76;
        humidityDeduction = (11 * 0.9) + (severeDelta * 2.1);
      }
    }

    const healthScore = Math.max(0, Math.min(100, Math.round(100 - moistureDeduction - tempDeduction - humidityDeduction)));

    // Risk mapping
    let risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    if (healthScore >= 85) risk = 'LOW';
    else if (healthScore >= 68) risk = 'MEDIUM';
    else if (healthScore >= 45) risk = 'HIGH';
    else risk = 'CRITICAL';

    // Fungal Spreading Hazard Index
    let fungalRiskLevel = "Low Risk / Dormant Spores";
    let fungalRiskTe = "తక్కువ ప్రమాదం / క్రియారహితం";
    if (moisture >= crop.criticalMoisture && temperature >= 24 && humidity >= 70) {
      fungalRiskLevel = "CRITICAL - Rapid Aspergillus flavus & Aflatoxin risk";
      fungalRiskTe = "తీవ్ర ప్రమాదం - అఫ్లాటాక్సిన్ మరియు మితమైన పెన్సిలియం పెరుగుదల";
    } else if (moisture > crop.safeMoisture || humidity > 65) {
      fungalRiskLevel = "MODERATE - Multi-strain Spore Germination Window";
      fungalRiskTe = "మితమైన ప్రమాదం - బూజు పట్టుకునే వాతావరణం";
    } else {
      fungalRiskLevel = "LOW - Safely Below Respiration Curve";
      fungalRiskTe = "సురక్షితం - అత్యల్ప మైక్రోబియల్ యాక్టివిటీ";
    }

    // Storage physiological deterioration rate percentage
    let deteriorationRate = 0; // %
    if (healthScore >= 90) {
      deteriorationRate = 0;
    } else if (healthScore >= 80) {
      deteriorationRate = Math.round((100 - healthScore) * 0.12 * 10) / 10;
    } else if (healthScore >= 65) {
      deteriorationRate = Math.round((1.2 + (80 - healthScore) * 0.35) * 10) / 10;
    } else {
      deteriorationRate = Math.round((6.5 + (65 - healthScore) * 0.75) * 10) / 10;
    }

    const totalBatchMarketValue = mass * crop.basePricePerTon;
    const potentialLoss = Math.round(totalBatchMarketValue * (deteriorationRate / 100));

    // Dynamic metrics (Equilibrium Moisture Content EMC)
    const emc = Math.round((0.013 * Math.pow(temperature, 0.35) * Math.log(100 - humidity) * -2.4 * 10) / 10) + 11.2;
    const dewPoint = Math.round((temperature - (100 - humidity) / 5) * 10) / 10;

    let actionsCount = 1;
    if (moisture > crop.safeMoisture) actionsCount++;
    if (temperature > 25 || humidity > 65) actionsCount++;
    if (healthScore < 80) actionsCount++;

    return {
      healthScore,
      risk,
      fungalRiskLevel,
      fungalRiskTe,
      deteriorationRate,
      potentialLoss,
      actionsCount,
      emc: emc < 0 ? 0 : Math.round(emc * 10) / 10,
      dewPoint,
      safeMoisture: crop.safeMoisture,
      criticalMoisture: crop.criticalMoisture
    };
  };

  const calc = getCalculations();

  // Log active assessment to local state & storage
  const handleLogAssessment = () => {
    const crop = crops.find(c => c.id === selectedCrop) || crops[0];
    const logItem: ScanLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      binRef: binRef.trim() ? binRef : (lang === 'te' ? 'సైలో/లాట్ రికార్డు' : 'Standard Log Bin'),
      cropId: selectedCrop,
      moisture,
      temperature,
      humidity,
      mass,
      healthScore: calc.healthScore,
      risk: calc.risk,
      financialLoss: calc.potentialLoss
    };

    const updated = [logItem, ...historyLogs];
    setHistoryLogs(updated);
    localStorage.setItem('grain_guardian_logs', JSON.stringify(updated));
    setBinRef('');
  };

  // Delete individual log
  const handleDeleteLog = (id: string) => {
    const filtered = historyLogs.filter(log => log.id !== id);
    setHistoryLogs(filtered);
    localStorage.setItem('grain_guardian_logs', JSON.stringify(filtered));
  };

  // Clear all logs
  const handleClearAllLogs = () => {
    setHistoryLogs([]);
    localStorage.removeItem('grain_guardian_logs');
  };

  // Call Server-Side Gemini Advisory Advisory Endpoint
  const requestGeminiAdvisory = async () => {
    setAiLoading(true);
    setAiError(null);
    setAdvisorTab('ai');
    try {
      const selectedCropName = crops.find(c => c.id === selectedCrop)?.nameEn || selectedCrop;
      const res = await fetch('/api/gemini/advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: selectedCropName,
          moisture,
          temperature,
          humidity,
          mass,
          language: lang
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      setAiResponse(data);
    } catch (err: any) {
      console.error(err);
      setAiError(lang === 'te' ? 'శాస్త్రీయ జెమిని సహాయకుడు ఆఫ్‌లైన్‌లో ఉంది. స్థానిక పరిమితి సిఫార్సులు పూర్తిగా సక్రియంగా ఉన్నాయి.' : 'Vite AI proxy unreachable. Displaying standard post-harvest biological advise.');
    } finally {
      setAiLoading(false);
    }
  };

  // Force system print layout to download report
  const triggerPrint = () => {
    window.print();
  };

  // Helper colors for metrics visual output
  const getRiskColorClass = (riskValue: string) => {
    switch (riskValue) {
      case 'LOW':
        return 'text-[#00FF9D]';
      case 'MEDIUM':
        return 'text-[#FACC15]';
      case 'HIGH':
        return 'text-[#FF5A5F]';
      case 'CRITICAL':
        return 'text-[#FF5A5F] border-[#FF5A5F] font-black';
      default:
        return 'text-white';
    }
  };

  const getRiskBgClass = (riskValue: string) => {
    switch (riskValue) {
      case 'LOW':
        return 'bg-[#00FF9D]/10 text-[#00FF9D] border-[#00FF9D]/20';
      case 'MEDIUM':
        return 'bg-[#FACC15]/10 text-[#FACC15] border-[#FACC15]/20';
      case 'HIGH':
        return 'bg-[#FF5A5F]/10 text-[#FF5A5F] border-[#FF5A5F]/20';
      case 'CRITICAL':
        return 'bg-[#FF5A5F]/20 text-[#FF5A5F] border-[#FF5A5F]/30 animate-pulse';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] font-sans antialiased overflow-x-hidden relative selection:bg-[#00FF9D]/30 selection:text-white">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00FF9D]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00D9FF]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* STICKY NAV BAR */}
      <header className="sticky top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-white/5 no-print">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-[72px] flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF9D] to-[#00D9FF] p-[1.5px] flex items-center justify-center shadow-lg shadow-emerald-500/15">
              <div className="w-full h-full bg-[#020617] rounded-[10px] flex items-center justify-center">
                <Sprout className="w-5.5 h-5.5 text-[#00FF9D]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#00FF9D] leading-none">
                {text.title}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold mt-1.5 block leading-tight">
                {lang === 'te' ? 'పంట తదుపరి నిల్వ నిర్ణయాల వేదిక' : 'Storage Intelligence for Post-Harvest Decisions'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Switch */}
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10" id="lang-toggle-btn">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  lang === 'en'
                    ? 'bg-slate-800 text-white'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('te')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  lang === 'te'
                    ? 'bg-slate-800 text-white'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                తెలుగు
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="bg-white/5 p-1 rounded-lg border border-white/10 flex items-center">
              <button
                onClick={() => setIsExpertMode(false)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                  !isExpertMode
                    ? 'bg-slate-800 text-[#00FF9D]'
                    : 'text-[#94A3B8] hover:text-slate-100'
                }`}
                id="farmer-mode-btn"
              >
                {lang === 'en' ? 'Farmer' : 'రైతు'}
              </button>
              <button
                onClick={() => setIsExpertMode(true)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                  isExpertMode
                    ? 'bg-slate-800 text-[#00D9FF]'
                    : 'text-[#94A3B8] hover:text-slate-100'
                }`}
                id="expert-mode-btn"
              >
                {lang === 'en' ? 'Expert' : 'నిపుణుడు'}
              </button>
            </div>

            <button
              onClick={jumpToAssessment}
              className="hidden md:block bg-[#00FF9D] text-[#020617] px-5 py-2 rounded-full font-bold text-xs hover:scale-105 transition-transform"
            >
              {text.startAssessment}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-11 gap-12 items-center border-b border-white/5 no-print">
          
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Tag / Micro Badge */}
            <div className="inline-flex items-center space-x-2 bg-slate-900/75 px-3 py-1.5 rounded-full border border-white/5">
              <ShieldCheck className="w-4 h-4 text-[#00FF9D]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#00FF9D]">
                {isExpertMode ? text.expertModeActive : text.farmerModeActive}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display font-bold leading-[0.9] tracking-tighter text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              {lang === 'en' ? (
                <>
                  Know when to store.<br />
                  <span className="text-white/40">Know when to act.</span>
                </>
              ) : (
                <>
                  ఎప్పుడు దాచుకోవాలో తెలుసుకోండి.<br />
                  <span className="text-white/40">ఎప్పుడు స్పందించాలో తెలుసుకోండి.</span>
                </>
              )}
            </h1>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-xl">
              {text.description}
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap gap-4 items-center pt-2">
              <button
                onClick={jumpToAssessment}
                className="px-8 py-3.5 bg-[#00D9FF] text-[#020617] font-bold text-sm sm:text-base rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#00D9FF]/20 cursor-pointer"
              >
                {lang === 'en' ? 'Begin Smart Scan' : 'స్మార్ట్ స్కాన్ ప్రారంభించండి'}
              </button>

              <button
                onClick={triggerDemo}
                className="px-8 py-3.5 border border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                {text.viewDemo}
              </button>
            </div>
          </div>

          {/* Interactive Live Dashboard Preview Container */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#0F172A]/65 border border-white/10 backdrop-blur-xl rounded-[24px] p-6 shadow-2xl relative overflow-hidden transition-all duration-300">
              
              <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold">
                    {lang === 'en' ? 'Current Batch Health' : 'ప్రస్తుత బ్యాచ్ ఆరోగ్యం'}
                  </p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {binRef || (lang === 'en' ? 'Rabi Harvest 24' : 'రబీ హార్వెస్ట్ 24')}
                  </h3>
                </div>
                <div className="bg-[#00FF9D]/20 text-[#00FF9D] text-[10px] font-bold px-3 py-1 rounded-full border border-[#00FF9D]/30 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-ping" />
                  <span>{lang === 'en' ? 'LIVE PREVIEW' : 'లైవ్ ప్రివ్యూ'}</span>
                </div>
              </div>

              {/* High precision telemetry parameters list */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-4xl sm:text-5xl font-light text-[#00FF9D] leading-none font-mono font-bold">
                      {calc.healthScore}
                    </span>
                    <p className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-wider">{text.healthScore}</p>
                  </div>
                  <div className="space-y-1">
                    <span className={`text-3xl sm:text-4xl font-light leading-none font-bold uppercase ${getRiskColorClass(calc.risk)}`}>
                      {lang === 'en' ? calc.risk : text[calc.risk.toLowerCase() as keyof typeof text]}
                    </span>
                    <p className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-wider">{text.storageRisk}</p>
                  </div>
                  <div className="space-y-1 col-span-2 pt-4 border-t border-white/5">
                    <p className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-wider">{text.financialImpact}</p>
                    <span className="text-xl sm:text-2xl font-semibold text-white">
                      ₹{calc.potentialLoss.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <hr className="border-white/5" />

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">{lang === 'en' ? 'Telemetry' : 'టెలిమెట్రీ'}</span>
                    <span className="font-mono text-sm block font-bold text-white mt-1">
                      {crops.find(c => c.id === selectedCrop)?.avatar} {moisture}%
                    </span>
                    <span className="text-[9px] text-[#00D9FF] block">Moisture index</span>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">{lang === 'en' ? 'Temp' : 'ఉష్ణోగ్రత'}</span>
                    <span className="font-mono text-xs block font-bold text-white mt-1">
                      {temperature}°C
                    </span>
                    <span className="text-[9px] text-slate-500 block">Ambient</span>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">{lang === 'en' ? 'Relative Hum' : 'గాలి ఆర్ద్రత'}</span>
                    <span className="font-mono text-xs block font-bold text-white mt-1">
                      {humidity}%
                    </span>
                    <span className="text-[9px] text-slate-500 block">Silo RH</span>
                  </div>
                </div>

                {/* Simulated Chart preview */}
                <div className="mt-4 p-3 bg-slate-950/40 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold uppercase mb-1">
                    <span>{lang === 'en' ? 'Spore Respiration' : 'సిద్ధబీజాల స్పందన రేటు'}</span>
                    <span className="text-[#00FF9D] font-mono">1.25x/day</span>
                  </div>
                  <div className="h-6 flex items-end gap-1 px-1">
                    <div className="w-full bg-slate-800 rounded-sm h-[30%]" />
                    <div className="w-full bg-slate-800 rounded-sm h-[40%]" />
                    <div className="w-full bg-slate-800 rounded-sm h-[55%]" />
                    <div className="w-full bg-slate-800 rounded-sm h-[50%]" />
                    <div className="w-full bg-[#00D9FF]/40 rounded-sm h-[70%]" />
                    <div className="w-full bg-[#00FF9D]/70 rounded-sm h-[85%]" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-1">
                  <span className="flex items-center gap-1">
                    <BrainCircuit className="w-3.5 h-3.5 text-[#00FF9D]" />
                    {text.grainHealthModel}
                  </span>
                  <span>{calc.actionsCount} {text.actionsCount}</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* METRICS GRID SECTION */}
        <section className="py-8 sm:py-12 border-b border-white/5 no-print">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Score Metric Card */}
            <div className="glass-panel rounded-[24px] p-6 border border-white/5 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#94A3B8]">
                    {text.healthScore}
                  </span>
                  <div className="font-mono font-bold text-white mt-2 select-none" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
                    {calc.healthScore}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#00FF9D]/15 flex items-center justify-center border border-[#00FF9D]/20">
                  <Award className="w-5.5 h-5.5 text-[#00FF9D]" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${calc.healthScore}%`,
                      backgroundColor: calc.healthScore > 80 ? '#00FF9D' : calc.healthScore > 65 ? '#FACC15' : '#FF5A5F' 
                    }} 
                  />
                </div>
              </div>
            </div>

            {/* Risk Level Card */}
            <div className="glass-panel rounded-[24px] p-6 border border-white/5 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#94A3B8]">
                    {text.storageRisk}
                  </span>
                  <div className={`font-mono font-bold mt-2 select-none uppercase ${getRiskColorClass(calc.risk)}`} style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                    {lang === 'en' ? calc.risk : text[calc.risk.toLowerCase() as keyof typeof translations['te']]}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FACC15]/10 flex items-center justify-center border border-[#FACC15]/20">
                  <AlertTriangle className="w-5.5 h-5.5 text-[#FACC15]" />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 line-clamp-1">
                {lang === 'en' ? `Safe limit threshold: ${calc.safeMoisture}%` : `సురక్షిత పరిమితి: ${calc.safeMoisture}%`}
              </p>
            </div>

            {/* Financial Impact Card */}
            <div className="glass-panel rounded-[24px] p-6 border border-white/5 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#94A3B8]">
                    {text.financialImpact}
                  </span>
                  <div className="font-mono font-bold text-[#FF5A5F] mt-2 select-none" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', lineHeight: 1.3 }}>
                    ₹{calc.potentialLoss.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FF5A5F]/10 flex items-center justify-center border border-[#FF5A5F]/20">
                  <Coins className="w-5.5 h-5.5 text-[#FF5A5F]" />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 font-mono">
                {calc.deteriorationRate}% {text.deteriorationRisk}
              </p>
            </div>

            {/* Actions Metric Card */}
            <div className="glass-panel rounded-[24px] p-6 border border-white/5 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#94A3B8]">
                    {text.actionsCount}
                  </span>
                  <div className="font-mono font-bold text-[#00D9FF] mt-2 select-none" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
                    {calc.actionsCount}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/10 flex items-center justify-center border border-[#00D9FF]/20">
                  <RefreshCw className="w-5.5 h-5.5 text-[#00D9FF]" />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 line-clamp-1">
                {lang === 'en' ? 'Critical conditions requiring attention' : 'తక్షణమే శ్రద్ధ వహించాల్సిన స్థితి'}
              </p>
            </div>

          </div>
        </section>

        {/* INTERACTIVE ASSESSMENT + LIVE RESULTS GRID */}
        <section id="assessment-tool" className="py-12 sm:py-20 border-b border-white/5 scroll-mt-10">
          
          <div className="mb-10 text-center max-w-2xl mx-auto no-print">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              {lang === 'en' ? 'Harvest Integrity Analytics' : 'ధాన్యపు ఆరోగ్య విశ్లేషణ సాధనం'}
            </h2>
            <p className="text-[#94A3B8] text-sm sm:text-base mt-2">
              {lang === 'en' 
                ? 'Adjust storage parameters below to simulate bulk crop conditioning, biological decay indexes, and receive immediate tactical drying recommendations.'
                : 'పంట నిల్వ పారామితులను సర్దుబాటు చేయడం ద్వారా తక్షణ జీవ అంచనాలను మరియు రక్షణ మార్గదర్శకాలను పొందండి.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* INPUT PANEL Column: Interactive Controls */}
            <div className="lg:col-span-6 space-y-6 bg-slate-900/[0.45] p-6 sm:p-8 rounded-[24px] border border-white/5 no-print">
              
              <div>
                <h3 className="font-display font-semibold text-lg text-white mb-4 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-[#00FF9D]" />
                  <span>{lang === 'en' ? 'Enter Telemetry Parameters' : 'నిల్వ కొలతలను నమోదు చేయండి'}</span>
                </h3>
              </div>

              {/* Crop Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] block">
                  {text.cropType}
                </label>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2">
                  {crops.map((crop) => {
                    const isSelected = selectedCrop === crop.id;
                    return (
                      <button
                        key={crop.id}
                        onClick={() => {
                          setSelectedCrop(crop.id);
                          // intelligently suggest slightly different moisture averages per crop
                          setMoisture(crop.safeMoisture + 1.2);
                        }}
                        className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-[#00FF9D]/15 border-[#00FF9D] text-white font-bold'
                            : 'bg-slate-950/40 border-white/5 text-[#94A3B8] hover:border-white/10 hover:text-white'
                        }`}
                      >
                        <span className="text-2xl mb-1 block select-none">{crop.avatar}</span>
                        <span className="text-[10px] sm:text-[11px] block whitespace-nowrap overflow-hidden text-ellipsis w-full">
                          {lang === 'en' ? crop.nameEn : crop.nameTe}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Bin Ref */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] block">
                  {text.binRef}
                </label>
                <input
                  type="text"
                  placeholder={text.optionalBin}
                  value={binRef}
                  onChange={(e) => setBinRef(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950/60 rounded-xl border border-white/5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00D9FF] transition font-mono"
                />
              </div>

              {/* Moisture Slider */}
              <div className="space-y-2 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-[#00D9FF]" />
                    {text.moistureContent}
                  </span>
                  <span className="font-mono text-base font-bold text-[#00D9FF]">{moisture}%</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="25"
                  step="0.1"
                  value={moisture}
                  onChange={(e) => setMoisture(parseFloat(e.target.value))}
                  className="w-full accent-[#00D9FF] cursor-pointer"
                  id="moisture-slider"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>8% - {lang === 'en' ? 'Bone Dry' : 'అతి పొడి'}</span>
                  <span className="text-[#00FF9D] font-bold">
                    {lang === 'en' ? 'Safe limit' : 'సురక్షిత మార్కు'}: {calc.safeMoisture}%
                  </span>
                  <span>25% - {lang === 'en' ? 'Extreme Saturated' : 'అతి తడి'}</span>
                </div>
              </div>

              {/* Temperature Slider */}
              <div className="space-y-2 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-[#FF5A5F]" />
                    {text.temperature}
                  </span>
                  <span className="font-mono text-base font-bold text-[#FF5A5F]">{temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="45"
                  step="1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseInt(e.target.value))}
                  className="w-full accent-[#FF5A5F] cursor-pointer"
                  id="temp-slider"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5°C - {lang === 'en' ? 'Chill/Silo Storage' : 'శీతల నిల్వ'}</span>
                  <span className="text-[#FF5A5F]">
                    {lang === 'en' ? 'Insect growth > 25°C' : 'కీటకాల పునరుత్పత్తి > 25°C'}
                  </span>
                  <span>45°C - {lang === 'en' ? 'High Hot Spot' : 'అతి వేడిగా'}</span>
                </div>
              </div>

              {/* Ambient Humidity Slider */}
              <div className="space-y-2 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-slate-400" />
                    {text.humidity}
                  </span>
                  <span className="font-mono text-base font-bold text-white">{humidity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="95"
                  value={humidity}
                  onChange={(e) => setHumidity(parseInt(e.target.value))}
                  className="w-full accent-slate-400 cursor-pointer"
                  id="humidity-slider"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>20% RH</span>
                  <span className="text-[#FACC15]">Mold breeding danger &gt; 70%</span>
                  <span>95% RH</span>
                </div>
              </div>

              {/* Mass Slider */}
              <div className="space-y-2 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-[#FACC15]" />
                    {text.batchMass}
                  </span>
                  <span className="font-mono text-base font-bold text-[#FACC15]">{mass} {text.tonnes}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="250"
                  value={mass}
                  onChange={(e) => setMass(parseInt(e.target.value))}
                  className="w-full accent-[#FACC15] cursor-pointer"
                  id="mass-slider"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 Ton</span>
                  <span>{lang === 'en' ? 'Large warehouse scale' : 'భారీ గిడ్డంగి స్థాయి'}</span>
                  <span>250 Tons</span>
                </div>
              </div>

              {/* Log Button */}
              <button
                onClick={handleLogAssessment}
                className="w-full py-3 bg-slate-950/80 hover:bg-slate-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/10 hover:border-white/25 transition-all flex items-center justify-center space-x-2"
              >
                <History className="w-4 h-4 text-[#00FF9D]" />
                <span>{text.saveLog}</span>
              </button>

            </div>

            {/* RESULTS VIEWPORT Column: Live Metrics */}
            <div className="lg:col-span-6 flex flex-col h-full bg-[#080d1e]/85 rounded-[24px] border border-white/10 overflow-hidden relative">
              
              {/* Report view - Print Layout Only hidden on standard web rendering */}
              <div className="print-only hidden p-8 text-black bg-white select-none">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold uppercase">{text.title} OFFICIAL tele-log</h1>
                  <p className="text-xs text-gray-500">{text.reportSubtitle}</p>
                </div>
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <tbody>
                    <tr className="border-b"><td className="p-2 font-bold">{text.cropType}</td><td className="p-2">{crops.find(c => c.id === selectedCrop)?.nameEn}</td></tr>
                    <tr className="border-b"><td className="p-2 font-bold">{text.moistureContent}</td><td className="p-2">{moisture}%</td></tr>
                    <tr className="border-b"><td className="p-2 font-bold">{text.temperature}</td><td className="p-2">{temperature}°C</td></tr>
                    <tr className="border-b"><td className="p-2 font-bold">{text.humidity}</td><td className="p-2">{humidity}%</td></tr>
                    <tr className="border-b"><td className="p-2 font-bold">{text.healthScore}</td><td className="p-2 font-bold">{calc.healthScore}/100</td></tr>
                    <tr className="border-b"><td className="p-2 font-bold">{text.storageRisk}</td><td className="p-2 font-bold">{calc.risk}</td></tr>
                    <tr className="border-b"><td className="p-2 font-bold">{text.financialImpact}</td><td className="p-2">₹{calc.potentialLoss}</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Tabs Switcher for results output */}
              <div className="no-print flex border-b border-white/5 bg-slate-950/50 p-1">
                <button
                  onClick={() => setAdvisorTab('calc')}
                  className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider rounded-t-xl transition ${
                    advisorTab === 'calc'
                      ? 'text-[#00FF9D] bg-slate-900 border-t border-x border-[#00FF9D]/20 shadow'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {text.standardRulesTab}
                </button>
                <button
                  onClick={requestGeminiAdvisory}
                  className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider rounded-t-xl transition flex items-center justify-center gap-1.5 ${
                    advisorTab === 'ai'
                      ? 'text-[#00D9FF] bg-slate-900 border-t border-x border-[#00D9FF]/20 shadow'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
                  <span>{text.geminiAdvisorTab}</span>
                </button>
              </div>

              <div className="p-6 sm:p-8 flex-1">
                {advisorTab === 'calc' ? (
                  <div className="space-y-6">
                    
                    {/* Upper Summary Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8]">
                          {text.assessmentResult}
                        </span>
                        <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white mt-1">
                          {calc.healthScore >= 80 ? text.safeToStore : text.notSafeToStore}
                        </h4>
                      </div>
                      
                      <div className={`px-4 py-2 rounded-full border text-center font-bold tracking-wider text-xs ${getRiskBgClass(calc.risk)}`}>
                        {lang === 'en' ? `${calc.risk} RISK` : `${text[calc.risk.toLowerCase() as keyof typeof translations['te']]} ప్రమాదం`}
                      </div>
                    </div>

                    {/* Circular Health Meter Design */}
                    <div className="flex flex-col sm:flex-row items-center justify-center p-4 bg-slate-950/40 rounded-2xl border border-white/5 gap-6">
                      
                      <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0 select-none">
                        
                        {/* Circular progress bar SVG mapping */}
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="52"
                            className="stroke-slate-800"
                            strokeWidth="10"
                            fill="transparent"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="52"
                            className="transition-all duration-1000 ease-out"
                            strokeWidth="10"
                            strokeDasharray={2 * Math.PI * 52}
                            strokeDashoffset={2 * Math.PI * 52 * (1 - calc.healthScore / 100)}
                            strokeLinecap="round"
                            stroke={calc.healthScore > 80 ? '#00FF9D' : calc.healthScore > 65 ? '#FACC15' : '#FF5A5F'}
                            fill="transparent"
                          />
                        </svg>

                        <div className="absolute flex flex-col items-center">
                          <span className="text-3xl font-extrabold text-white font-mono">{calc.healthScore}</span>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">health score</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-sm font-bold text-slate-300">
                          {crops.find(c => c.id === selectedCrop)?.nameEn} {lang === 'en' ? 'Batch Overview' : 'బ్యాచ్ పరిశీలన'}
                        </h5>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          {calc.healthScore >= 85 
                            ? (lang === 'en' 
                                ? 'Excellent storage preservation indexing. Keep sealed properly.' 
                                : 'అద్భుతమైన సంరక్షణ సూచీ. గాలి చొరబడకుండా గట్టిగా మూసి ఉంచండి.')
                            : calc.healthScore >= 68
                            ? (lang === 'en'
                                ? 'Borderline conditions. Immediate mechanical drying recommended.'
                                : 'సరిహద్దులో ఉన్న పరిస్థితులు. తక్షణమే ఆరబోయవలసిందిగా సిఫార్సు చేయబడింది.')
                            : (lang === 'en'
                                ? 'Dangerous degradation activity is highly likely. Action required immediately.'
                                : 'కుళ్ళిపోయే ప్రక్రియ అత్యంత వేగంగా జరిగే ముప్పు ఉంది. తక్షణమే రంగంలోకి దిగండి.')
                          }
                        </p>
                      </div>

                    </div>

                    {/* Scientific telemetry indicators shown only on Expert View mode */}
                    {isExpertMode && (
                      <div className="grid grid-cols-2 gap-4 bg-slate-950/25 p-4 rounded-xl border border-white/5">
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">Equilibrium Moisture (EMC)</span>
                          <span className="font-mono text-sm block font-bold text-[#00D9FF] mt-1">{calc.emc}%</span>
                          <span className="text-[9px] text-[#94A3B8] block">Air-grain relative balance</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">Dew Point Temperature</span>
                          <span className="font-mono text-sm block font-bold text-[#FF5A5F] mt-1">{calc.dewPoint}°C</span>
                          <span className="text-[9px] text-[#94A3B8] block">Condensation risk point</span>
                        </div>
                      </div>
                    )}

                    {/* Dynamic Biosecurity & fungal risk info */}
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                      <div className="flex items-center space-x-1 text-slate-300 font-semibold text-xs uppercase tracking-wider">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#FACC15]" />
                        <span>{text.fungalRisk}</span>
                      </div>
                      <p className="text-xs text-[#94A3B8]">
                        {lang === 'en' ? calc.fungalRiskLevel : calc.fungalRiskTe}
                      </p>
                    </div>

                    {/* Gemini Advisor Promo Box */}
                    <div className="no-print p-4 rounded-xl bg-gradient-to-br from-indigo-950/20 to-emerald-950/20 border border-white/5 flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-[#00FF9D] uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          AI Advisory Ready
                        </span>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {lang === 'en' ? 'Get highly specialized scientific advice powered by Google Gemini.' : 'జెమిని AI ద్వారా మీ పంట కోసం ప్రత్యేక నివేదికను పొందండి.'}
                        </p>
                      </div>
                      <button
                        onClick={requestGeminiAdvisory}
                        className="py-1.5 px-3 bg-[#00D9FF] hover:opacity-90 text-[#020617] text-xs font-bold rounded-lg transition"
                      >
                        {lang === 'en' ? 'Ask AI' : 'AI ని అడగండి'}
                      </button>
                    </div>

                  </div>
                ) : (
                  // AI REPORT TAB
                  <div className="space-y-4 text-xs font-sans leading-relaxed text-[#F8FAFC]">
                    
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                        <span className="font-bold text-sm text-white">{text.aiAdvisoryResult}</span>
                      </div>
                      <button
                        onClick={() => setAdvisorTab('calc')}
                        className="text-[10px] uppercase font-bold text-[#94A3B8] hover:text-white"
                      >
                        {lang === 'en' ? '← Back to Live Numbers' : '← అంకెల్లోకి వెళ్ళండి'}
                      </button>
                    </div>

                    {aiLoading ? (
                      <div className="py-12 flex flex-col items-center justify-center space-y-4">
                        <RefreshCw className="w-8 h-8 text-[#00D9FF] animate-spin" />
                        <span className="text-slate-400 font-medium pl-2 block animate-pulse">
                          {text.loadingAI}
                        </span>
                      </div>
                    ) : aiError ? (
                      <div className="p-4 bg-[#FF5A5F]/10 rounded-xl border border-[#FF5A5F]/20 text-center text-[#FF5A5F]">
                        {aiError}
                        <button
                          onClick={requestGeminiAdvisory}
                          className="mt-3 block mx-auto px-3 py-1 bg-slate-900 text-white rounded border border-[#FF5A5F]/40"
                        >
                          {lang === 'en' ? 'Retry AI Call' : 'తిరిగి ప్రయత్నించండి'}
                        </button>
                      </div>
                    ) : aiResponse ? (
                      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                        
                        <div>
                          <h6 className="font-bold font-display text-white text-xs mb-1 uppercase tracking-wider text-[#00D9FF]">
                            {lang === 'en' ? 'Summary Assessment' : 'నమూనా పరిచయం'}
                          </h6>
                          <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 text-[#94A3B8]">
                            {aiResponse.summary}
                          </div>
                        </div>

                        <div>
                          <h6 className="font-bold font-display text-white text-xs mb-1 uppercase tracking-wider text-[#FACC15]">
                            {lang === 'en' ? 'Fungal & Microbial Risks' : 'శిలీంధ్రాల మరియు బ్యాక్టీరియా హెచ్చరికలు'}
                          </h6>
                          <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 text-[#94A3B8]">
                            {aiResponse.riskNarrative}
                          </div>
                        </div>

                        <div>
                          <h6 className="font-bold font-display text-white text-xs mb-1 uppercase tracking-wider text-[#FF5A5F]">
                            {lang === 'en' ? 'Financial Degradation Analysis' : 'ఆర్థిక వ్యయ మరియు నష్ట విశ్లేషణ'}
                          </h6>
                          <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 text-[#94A3B8]">
                            {aiResponse.financialAnalysis}
                          </div>
                        </div>

                        <div>
                          <h6 className="font-bold font-display text-white text-xs mb-2 uppercase tracking-wider text-[#00FF9D]">
                            {lang === 'en' ? 'Strict Actions Directed' : 'అనుసరించాల్సిన ఖచ్చితమైన పద్ధతులు'}
                          </h6>
                          <ul className="space-y-2">
                            {aiResponse.expertActions?.map((act: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-[#94A3B8]">
                                <span className="w-5 h-5 rounded bg-[#00FF9D]/15 text-[#00FF9D] font-mono font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                                  {idx + 1}
                                </span>
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    ) : (
                      <div className="py-8 text-center text-slate-500">
                        {lang === 'en' 
                          ? 'Advisory analysis model resting. Tap the button to invoke AI scientific report.' 
                          : 'జెమిని సైంటిఫిక్ రిపోర్ట్ జారీ చేయడానికి పక్కన ఉన్న బటన్‌ను క్లిక్ చేయండి.'}
                        <button
                          onClick={requestGeminiAdvisory}
                          className="mt-4 block mx-auto px-4 py-2.5 bg-gradient-to-r from-[#00FF9D] to-[#00D9FF] text-[#020617] font-bold text-xs rounded-xl hover:opacity-95"
                        >
                          {text.consultGemini}
                        </button>
                      </div>
                    )}

                  </div>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* RECOMMENDED ACTIONS SECTION */}
        <section className="py-12 sm:py-20 border-b border-white/5">
          
          <div className="mb-10 no-print">
            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2">
              <Award className="w-6.5 h-6.5 text-[#00FF9D]" />
              <span>{text.recsTitle}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Action 1: Continue Drying */}
            <div className={`glass-panel rounded-[24px] p-6 border ${moisture > calc.safeMoisture ? 'border-[#FACC15]' : 'border-white/5'} flex gap-4 items-start`}>
              <div className="w-10 h-10 rounded-xl bg-[#FACC15]/10 flex items-center justify-center flex-shrink-0 border border-[#FACC15]/20">
                <TrendingDown className="w-5.5 h-5.5 text-[#FACC15]" />
              </div>
              <div>
                <h4 className="font-display font-medium text-lg text-white">
                  {lang === 'en' ? 'Continue Drying Cycles' : 'ఆరబోయడం కొనసాగించండి'}
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Threshold guideline: &lt; {calc.safeMoisture}% Moisture</p>
                <p className="text-sm text-slate-400 mt-2">
                  {moisture > calc.safeMoisture 
                    ? (lang === 'en'
                        ? `Critical moisture is warning. Bring batch from active ${moisture}% down to safety limit ${calc.safeMoisture}% to prevent exponential seed-matter degradation.`
                        : `తేమ చాలా ఎక్కువగా ఉంది. నిల్వ సురక్షితంగా ఉండాలంటే ప్రస్తుత ${moisture}% నుండి కనీసం ${calc.safeMoisture}% కి తేమను తగ్గించండి.`)
                    : (lang === 'en'
                        ? `Active batch moisture (${moisture}%) is fully within standard crop requirements. Ready for placement.`
                        : `తేమ శాతం (${moisture}%) సురక్షితమైన మార్కులోనే ఉంది. ఎలాంటి అదనపు ఆరబెట్టడం అవసరం లేదు.`)
                  }
                </p>
              </div>
            </div>

            {/* Action 2: Air Circulation */}
            <div className={`glass-panel rounded-[24px] p-6 border ${temperature > 25 ? 'border-[#FF5A5F]' : 'border-white/5'} flex gap-4 items-start`}>
              <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/10 flex items-center justify-center flex-shrink-0 border border-[#00D9FF]/20">
                <Thermometer className="w-5.5 h-5.5 text-[#00D9FF]" />
              </div>
              <div>
                <h4 className="font-display font-medium text-lg text-white">
                  {lang === 'en' ? 'Manage Ventilation Aeration' : 'గాలి ప్రసరణను సర్దుబాటు చేయండి'}
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Threshold guideline: &lt; 25°C Temperature</p>
                <p className="text-sm text-slate-400 mt-2">
                  {temperature > 25 
                    ? (lang === 'en'
                        ? `Warm lot temperature (${temperature}°C) acts as biological catalyst for micro-infestation. Blow cool forced air through bottom silo vents.`
                        : `ప్రస్తుత ${temperature}°C వేడి కీటకాల అభివృద్ధికి దారితీస్తుంది. గిడ్డంగిలో గాలి ప్రసరణ ఫ్యాన్లను తప్పనిసరిగా ఆన్ చేయండి.`)
                    : (lang === 'en'
                        ? `Temperature is safe (${temperature}°C). Cooling cycles are optimal. Keep monitoring.`
                        : `ఉష్ణోగ్రత సురక్షిత పరిమితిలో ఉంది. ఎలాంటి ఆందోళన అవసరం లేదు.`)
                  }
                </p>
              </div>
            </div>

            {/* Action 3: Inspect Hotspots */}
            <div className="glass-panel rounded-[24px] p-6 border border-white/5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-[#00FF9D]/15 flex items-center justify-center flex-shrink-0 border border-[#00FF9D]/20">
                <FileText className="w-5.5 h-5.5 text-[#00FF9D]" />
              </div>
              <div>
                <h4 className="font-display font-medium text-lg text-white">
                  {lang === 'en' ? 'Log weekly telemetry checks' : 'ప్రతి వారం ధాన్యం నిల్వను పరిశీలించండి'}
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Standard warehouse biosecurity audit</p>
                <p className="text-sm text-slate-400 mt-2">
                  {lang === 'en'
                    ? 'Check visual parameters, verify mold status, and use physical temperature cables at multi-point locations of lot bins.'
                    : 'ప్రతి శనివారమో ఆదివారమో నిల్వ బస్తాలను తనిఖీ చేసి వేడి మచ్చలు ఏర్పడకుండా చూసుకోండి.'}
                </p>
              </div>
            </div>

            {/* Action 4: Warehouse Strategy */}
            <div className="glass-panel rounded-[24px] p-6 border border-white/5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
                <BrainCircuit className="w-5.5 h-5.5 text-purple-400" />
              </div>
              <div>
                <h4 className="font-display font-medium text-lg text-white">
                  {lang === 'en' ? 'Long-term Hermetic bagging' : 'హెర్మెటిక్ సంచుల నిల్వ పద్ధతులు'}
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Optimum safety practices</p>
                <p className="text-sm text-slate-400 mt-2">
                  {lang === 'en'
                    ? 'Use tightly integrated PICS triple-layer hermetic bags to choke cellular respiration of any lurking bugs, holding index qualities.'
                    : 'ధాన్యాన్ని తాజా గాలి చొరబడని ప్రత్యేకమైన హెర్మెటిక్ సంచులలో దాచుకోవడం వలన రసాయనాలు చల్లాల్సిన అవసరం లేకుండానే పంట సురక్షితంగా ఉంటుంది.'}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* STORAGE RISKS / CRITICAL METERS SECTION */}
        <section className="py-12 sm:py-20 border-b border-white/5">
          
          <div className="mb-10">
            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-6.5 h-6.5 text-[#FF5A5F]" />
              <span>{text.risksTitle}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Risk Check 1: Moisture Limits */}
            <div className="p-6 bg-slate-950/45 rounded-2xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-semibold">{lang === 'en' ? 'Purity Moisture limit' : 'తేమ భద్రతా మార్కు'}</span>
                <span className={moisture > calc.safeMoisture ? 'text-[#FF5A5F] font-bold' : 'text-[#00FF9D]'}>
                  {moisture > calc.safeMoisture ? 'OVER LIMIT' : 'SAFE'}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Current: {moisture}%</span>
                  <span>Limit: {calc.safeMoisture}%</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${Math.min(100, (moisture / 25) * 100)}%`,
                      backgroundColor: moisture > calc.safeMoisture ? '#FF5A5F' : '#00FF9D'
                    }} 
                  />
                </div>
              </div>
            </div>

            {/* Risk Check 2: Thermal Decay */}
            <div className="p-6 bg-slate-950/45 rounded-2xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-semibold">{lang === 'en' ? 'Thermal Incubation' : 'ఉష్ణోగ్రత హెచ్చరిక'}</span>
                <span className={temperature > 25 ? 'text-[#FF5A5F] font-bold' : 'text-[#00FF9D]'}>
                  {temperature > 25 ? 'WARNING' : 'STABLE'}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Current: {temperature}°C</span>
                  <span>Threshold: 25°C</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${Math.min(100, (temperature / 45) * 100)}%`,
                      backgroundColor: temperature > 25 ? '#FF5A5F' : '#00FF9D'
                    }} 
                  />
                </div>
              </div>
            </div>

            {/* Risk Check 3: Mold Spore Respiration */}
            <div className="p-6 bg-slate-950/45 rounded-2xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-semibold">{lang === 'en' ? 'Ambient Air Condensation' : 'గాలి ఆర్ద్రత ప్రమాదం'}</span>
                <span className={humidity > 68 ? 'text-[#FACC15]' : 'text-[#00FF9D]'}>
                  {humidity > 68 ? 'HIGH RISK' : 'LOW'}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Current: {humidity}% RH</span>
                  <span>Safety: 68%</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${humidity}%`,
                      backgroundColor: humidity > 68 ? '#FACC15' : '#00FF9D'
                    }} 
                  />
                </div>
              </div>
            </div>

            {/* Risk Check 4: Biological Fungal Index */}
            <div className="p-6 bg-slate-950/45 rounded-2xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-semibold">{lang === 'en' ? 'Aflatoxin Index' : 'శిలీంధ్ర సూచీ'}</span>
                <span className={calc.healthScore < 60 ? 'text-[#FF5A5F] font-bold' : 'text-[#00FF9D]'}>
                  {calc.healthScore < 60 ? 'EXTREME' : 'DORMANT'}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Decay Rate: {calc.deteriorationRate}%</span>
                  <span>Health: {calc.healthScore}/100</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${100 - calc.healthScore}%`,
                      backgroundColor: calc.healthScore < 60 ? '#FF5A5F' : '#00FF9D'
                    }} 
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* TELEMETRY ASSESSMENT LOG & HISTORY */}
        <section className="py-12 sm:py-20 border-b border-white/5 no-print">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2">
                <History className="w-6.5 h-6.5 text-[#00D9FF]" />
                <span>{text.recentAssessments}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'en' 
                  ? 'Historical telemetry scans preserved locally on this device.'
                  : 'ఈ పరికరంలో స్థానికంగా భద్రపరచుకున్న గత మూల్యాంకనాలు.'}
              </p>
            </div>
            {historyLogs.length > 0 && (
              <button
                onClick={handleClearAllLogs}
                className="text-xs text-[#FF5A5F] hover:underline flex items-center space-x-1 font-bold uppercase tracking-wider"
              >
                <Trash2 className="w-4 h-4" />
                <span>{text.clearLogs}</span>
              </button>
            )}
          </div>

          {historyLogs.length === 0 ? (
            <div className="p-12 text-center bg-slate-950/40 rounded-[24px] border border-white/5">
              <History className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-400">{text.noHistory}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <AnimatePresence mode="popLayout">
                {historyLogs.map((log) => {
                  const cropObj = crops.find(c => c.id === log.cropId);
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={log.id}
                      className="p-5 bg-slate-950/45 rounded-2xl border border-white/5 hover:border-[#00D9FF]/20 transition flex justify-between items-start relative group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl select-none">{cropObj?.avatar || '🌾'}</span>
                          <div>
                            <span className="text-sm font-bold text-white block">
                              {lang === 'en' ? cropObj?.nameEn : cropObj?.nameTe}
                            </span>
                            <span className="text-[10px] text-slate-500 tracking-wider font-mono">
                              {log.timestamp} • {log.binRef}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-1 font-mono text-[11px] text-slate-400">
                          <div>
                            <span className="text-slate-600 block uppercase text-[8px] tracking-wider font-semibold">Moisture</span>
                            <span className="font-bold text-[#00D9FF]">{log.moisture}%</span>
                          </div>
                          <div>
                            <span className="text-slate-600 block uppercase text-[8px] tracking-wider font-semibold">Temp / Air</span>
                            <span className="font-bold">{log.temperature}°C • {log.humidity}%</span>
                          </div>
                          <div>
                            <span className="text-slate-600 block uppercase text-[8px] tracking-wider font-semibold">Loss Impact</span>
                            <span className="font-bold text-[#FF5A5F]">₹{log.financialLoss?.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between h-full space-y-4">
                        <div className="text-right">
                          <span className="text-xs text-slate-500 block uppercase tracking-wider font-semibold">Health Score</span>
                          <span className="text-lg font-bold font-mono text-[#00FF9D]">{log.healthScore}</span>
                        </div>
                        
                        <button
                          onClick={() => handleDeleteLog(log.id)}
                          className="text-slate-600 hover:text-[#FF5A5F] transition self-end"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>

            </div>
          )}

        </section>

        {/* DOWNLOAD / ACTIONS REPORT OVERLAY */}
        <section className="py-12 sm:py-20 text-center">
          
          <div className="max-w-xl mx-auto glass-panel rounded-[24px] p-8 border border-white/10 space-y-6 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF9D]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="w-12 h-12 rounded-xl bg-[#00FF9D]/15 border border-[#00FF9D]/20 flex items-center justify-center mx-auto shadow shadow-emerald-500/10">
              <Download className="w-6 h-6 text-[#00FF9D]" />
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                {lang === 'en' ? 'Quality Certificate & Report Generator' : 'ధాన్య ఆరోగ్య భద్రతా ధృవీకరణ పత్రం'}
              </h4>
              <p className="text-sm text-[#94A3B8]">
                {lang === 'en'
                  ? 'Download or print the generated physical post-harvest storage assessment document containing current biochemical variables and loss forecasting calculations.'
                  : 'ప్రస్తుత పంట పరిస్థితుల యొక్క సమగ్ర నివేదికను డౌన్‌లోడ్ లేదా ప్రింట్ చేసుకోండి.'}
              </p>
            </div>

            <button
              onClick={triggerPrint}
              className="py-3 px-6 bg-slate-900 border border-white/10 hover:border-[#00FF9D]/30 hover:bg-slate-950 text-white font-bold text-sm rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 mx-auto"
            >
              <Printer className="w-4 h-4 text-[#00FF9D]" />
              <span>{text.printReport}</span>
            </button>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 bg-[#01030b] text-center text-xs text-slate-500 mt-20 no-print">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Sprout className="w-4 h-4 text-[#00FF9D]" />
            <span className="font-bold tracking-widest text-[#94A3B8]">{text.title}</span>
            <span>•</span>
            <span className="font-mono text-[10px]">{text.grainHealthModel}</span>
          </div>
          <div>
            <p>
              {lang === 'en' 
                ? 'Optimized post-harvest storage algorithms. Fungal modeling follows equilibrium biological respiration standards.' 
                : 'పంట శ్రేయస్సు కోసం రూపొందించిన శాస్త్రీయ శిలీంధ్ర నిరోధక అంచనాలు.'}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
