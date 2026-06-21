import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // JSON API Endpoint: Scientific Agricultural Advisory via Gemini 3.5 Flash
  app.post("/api/gemini/advisory", async (req, res) => {
    try {
      const { crop, moisture, temperature, humidity, mass, language } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        // Return a clean fallback advisory structure if API key is not configured yet
        const isEn = language !== "te";
        return res.json({
          summary: isEn
            ? `Standard calculation model active. Crop: ${crop}, Moisture: ${moisture}%, Temp: ${temperature}°C, RH: ${humidity}%. To activate full AI-powered predictive telemetry, please set your GEMINI_API_KEY in the Secrets panel.`
            : `ప్రామాణిక గణన నమూనా సక్రియంగా ఉంది. పంట: ${crop}, తేమ: ${moisture}%, ఉష్ణోగ్రత: ${temperature}°C. పూర్తి AI-ఆధారిత అంచనాలను యాక్టివేట్ చేయడానికి, దయచేసి సీక్రెట్స్ ప్యానెల్‌లో మీ GEMINI_API_KEYని కాన్ఫిగర్ చేయండి.`,
          riskNarrative: isEn
            ? `Calculated standard biological incubation forecast indicates steady decay rate based on ${moisture}% moisture and ${humidity}% relative humidity. Recommended safe moisture envelope is below 13.5%.`
            : `పరిస్థితుల ఆధారంగా నిల్వ కాలక్రమేణా దెబ్బతినే ప్రమాదం ఉంది. సురక్షితమైన నిల్వ కోసం తేమ శాతం 13.5% కంటే తక్కువగా ఉండాలని సిఫార్సు చేయబడింది.`,
          financialAnalysis: isEn
            ? `Estimated financial exposure on ${mass} tons is based on market rates. Moisture levels above safety thresholds degrade quality premiums by 2% to 15%.`
            : `${mass} టన్నుల నిల్వపై మార్కెట్ ధరల ఆధారంగా అంచనా వేయబడిన సంభావ్య నష్టం. అధిక తేమ నాణ్యతను దెబ్బతీస్తుంది.`,
          expertActions: isEn
            ? [
                `Dry target batch until moisture content reaches stable safety zone (13.5%).`,
                `Turn on main aeration fans during cool evening hours to lower temperature below 22°C.`,
                `Inspect grain weekly for temperature hotspots and potential insect activity.`,
                `Maintain tight hermetic sealing if moisture limits are strictly satisfied.`
              ]
            : [
                `తేమ శాతం 13.5% కి వచ్చే వరకు ధాన్యాన్ని ఆరబోయండి.`,
                `ఉష్ణోగ్రత 22°C కంటే తగ్గించడానికి సాయంత్రం వేళల్లో గాలి ప్రసరణ ఫ్యాన్లను ఆన్ చేయండి.`,
                `వేడి మచ్చలు మరియు పురుగుల ఉనికి కోసం ప్రతి వారం నిల్వను తనిఖీ చేయండి.`,
                `తేమ ప్రమాణాలు సరిగ్గా ఉన్నప్పుడు సీలింగ్ బ్యాగులలో భద్రపరచండి.`
              ]
        });
      }

      // Lazy load modern GoogleGenAI SDK
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const languageLabel = language === "te" ? "Telugu" : "English";

      const prompt = `Conduct a precision post-harvest storage assessment for the following bulk grain condition:
- Crop Type: ${crop}
- Moisture Content: ${moisture}%
- Temperature: ${temperature}°C
- Relative Ambient Humidity: ${humidity}%
- Batch Mass: ${mass} Metric Tons

You are writing for an application called GrainGuardian.
Translate the output fully into ${languageLabel}. If custom Telugu text is requested, write fluent, local Telugu script that farmers and local grain experts can read. Show absolute agricultural expertise.
Predict specific microbial/fungal risks (e.g. Aspergillus flavus producing aflatoxins, Penicillium mold, or standard grain weevils/Sitophilus oryzae) at these ranges. Make it highly professional and actionable.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are GrainGuardian AI, an esteemed senior agricultural post-harvest scientist and grain preservation consultant.
Provide rich, highly scientific, detailed and precise advice concerning grain storage safety, microbial/fungal infestation indexes, and actionable mitigation logic.
Output must match the JSON schema perfectly and be written completely and naturally in the requested language (English or Telugu).`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: {
                type: Type.STRING,
                description: `A sophisticated, high-level post-harvest assessment summary. Explains whether the batch is ready for long-term safe placement. Limit to 3 dense sentences.`
              },
              riskNarrative: {
                type: Type.STRING,
                description: `Deep analysis of fungal, bacterial, and temperature hazards under these moisture levels. Name biological organisms like Aspergillus flavus or grain devouring weevils where appropriate.`
              },
              financialAnalysis: {
                type: Type.STRING,
                description: `Detailed market and physiological deterioration breakdown, outlining potential grade reduction and weight losses.`
              },
              expertActions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: `A list of exactly 4 specific, logical, chronological actions the farmer/warehouse manager must take immediately (e.g., turning on aeration, continuing sun-drying, inspect hotspots, hermetic bagging, standard pesticide fumigation).`
              }
            },
            required: ["summary", "riskNarrative", "financialAnalysis", "expertActions"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (error: any) {
      console.error("Gemini API Error in /api/gemini/advisory:", error);
      res.status(500).json({ error: error.message || "Failed to generate agricultural AI advisory" });
    }
  });

  // Serve static UI assets using Vite in Dev vs Production modes
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[GrainGuardian Backend] Server fully running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
