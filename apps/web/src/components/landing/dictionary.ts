export type Locale = "zh" | "en" | "de";

export const locales: Locale[] = ["zh", "en", "de"];

/**
 * 將型別中的「string literal（例如 "zh"）」轉為「一般 string」
 * 並且支援：
 * - 陣列（array / tuple）
 * - 物件（object）
 * - 深層遞迴（deep recursive）
 */
type WidenLiteralStrings<T> =

  /**
   * 🧩 Case 1：如果 T 是 string（包含 literal type）
   *
   * T extends string：
   * - "zh" extends string ✅
   * - string extends string ✅
   *
   * 👉 統一轉成 string（達到 widening）
   */
  T extends string
    ? string

    /**
     * 🧩 Case 2：如果 T 是 readonly 陣列（包含 tuple）
     *
     * readonly (infer U)[]
     *
     * 👉 infer U：
     *    把「陣列元素型別」抽出來
     *
     * 例如：
     *   readonly ["zh", "en"]
     * 👉 U = "zh" | "en"
     *
     * 再對每個元素做遞迴轉換
     *
     * ⚠️ 保留 readonly 是刻意的（immutable 設計）
     */
    : T extends readonly (infer U)[]
      ? readonly WidenLiteralStrings<U>[]

      /**
       * 🧩 Case 3：如果 T 是 object（物件）
       *
       * 👉 使用 mapped type 遍歷每個 key
       *
       * keyof T：
       *   取得所有 key
       *
       * [K in keyof T]：
       *   對每個 key 做轉換
       *
       * 👉 每個 value 再遞迴呼叫 WidenLiteralStrings
       *
       * ⚠️ 加上 readonly：
       *   保持資料不可變（immutable pattern）
       */
      : T extends object
        ? {
            readonly [K in keyof T]: WidenLiteralStrings<T[K]>
          }

        /**
         * 🧩 Case 4：其他型別（number / boolean / null / undefined / function）
         *
         * 👉 完全不變
         */
        : T;

export const dict = {
  zh: {
    brand: "RunAI",
    nav: {
      features: "Features",
      howItWorks: "How it works",
      pricing: "Pricing",
      startTraining: "開始訓練",
      languageLabel: "語言切換",
      themeLabel: "主題切換",
    },
    hero: {
      eyebrow: "ADAPTIVE RUNNING OS",
      title: "你的 AI 跑步教練，幫你跑得更快、更遠、更聰明",
      description:
        "根據你的能力、目標與環境，自動生成每日課表與最佳路線。讓恢復、訓練刺激與安全性一起被計算。",
      primaryCta: "立即開始（免費）",
      secondaryCta: "查看 Demo",
      proof: [
        { value: "15K+", label: "本週已生成訓練課表" },
        { value: "4.8★", label: "跑者平均週留存" },
        { value: "-22%", label: "疲勞累積風險下降" },
      ],
      dashboard: {
        title: "今日訓練面板",
        badge: "AI Ready",
        workoutLabel: "今日課表",
        workoutTitle: "10K 漸進跑 + 4x1K 閾值",
        workoutMeta: "建議配速 4'45 - 4'55 / 恢復心率 < 142 / 目標負荷 78",
        predictionLabel: "比賽預測",
        predictionValue: "Half Marathon 1:37:42",
        predictionText:
          "根據近 6 週負荷、VO2 Max 估算與地形適性，自動調整完賽預測。",
      },
    },
    features: {
      eyebrow: "CORE FEATURES",
      title: "為每一次出發，提供課表、路線與賽事判斷",
      description:
        "把訓練決策拆成你每天都會用到的三件事：今天該跑什麼、該跑哪裡、這樣跑離目標還差多少。",
      items: [
        {
          title: "今日課表 AI",
          description:
            "根據恢復程度、近期負荷與目標賽事，自動生成今天最有效的訓練安排。",
        },
        {
          title: "跑步路線推薦",
          description:
            "結合時間、地形、天候與安全權重，推薦最適合你今天狀態的路線。",
        },
        {
          title: "比賽預測系統",
          description:
            "從週期進展、配速穩定度與生理指標變化，持續修正你的完賽預測。",
        },
      ],
    },
    howItWorks: {
      eyebrow: "HOW IT WORKS",
      title: "從資料到回饋，形成每天都會變聰明的訓練循環",
      description:
        "你輸入的跑者背景、裝置資料與每次訓練回饋，會持續回到模型裡重新校正課表與路線策略。",
      steps: [
        {
          title: "輸入資料",
          description: "建立目標賽事、週跑量、心率區間與常跑時間帶。",
        },
        {
          title: "AI 評估",
          description: "模型衡量疲勞、恢復、地形偏好與近期表現，決定今日策略。",
        },
        {
          title: "今日課表 + 路線",
          description: "輸出當日訓練內容、建議配速與最適合當下條件的跑線。",
        },
        {
          title: "跑後回饋",
          description: "上傳主觀疲勞、HR drift 與完成度，讓模型知道今天是否過量。",
        },
        {
          title: "持續優化",
          description: "系統依週期與反應自動修正後續節奏，避免停滯與受傷風險。",
        },
      ],
    },
    route: {
      eyebrow: "SMART ROUTE",
      title: "不只知道該跑什麼，也知道今天該跑哪裡",
      description:
        "系統依據你的訓練目的、剩餘時間、累積疲勞與區域地圖資料，優先考慮安全、地形與距離，推薦最適合今天狀態的路線。",
      bullets: [
        "安全優先：避開高車流與低照明區段",
        "地形匹配：平路恢復、坡度刺激、長距離耐力",
        "距離控制：精準對齊今日課表需要的總里程",
      ],
      metrics: [
        { value: "8.6 km", label: "平緩河岸路線" },
        { value: "94 / 100", label: "安全與照明評分" },
      ],
    },
    trust: {
      eyebrow: "TRUST / SOCIAL PROOF",
      title: "根據你的訓練數據持續優化，每一週都更貼近你的目標",
      description:
        "用清楚的 metrics 告訴跑者，這不是固定課表，而是一個會隨著你的狀態持續修正的訓練系統。",
      stats: [
        { value: "+18%", label: "配速穩定度" },
        { value: "32 天", label: "平均訓練連續週期" },
        { value: "91%", label: "路線推薦接受率" },
        { value: "-26%", label: "高疲勞週發生率" },
      ],
    },
    cta: {
      eyebrow: "START NOW",
      title: "開始你的第一個訓練週期",
      description:
        "讓 AI 根據你的能力與目標，產出第一週的跑步節奏、課表與路線。",
      button: "開始訓練",
    },
    footer: {
      links: ["Features", "Pricing", "中文 / EN / DE"],
      copyright: "Built for runners who train with intent.",
    },
  },
  en: {
    brand: "RunAI",
    nav: {
      features: "Features",
      howItWorks: "How it works",
      pricing: "Pricing",
      startTraining: "Start Training",
      languageLabel: "Switch language",
      themeLabel: "Toggle theme",
    },
    hero: {
      eyebrow: "ADAPTIVE RUNNING OS",
      title: "Your AI running coach helps you run faster, farther, and smarter.",
      description:
        "Generate daily workouts and route suggestions automatically from your ability, goals, and environment.",
      primaryCta: "Start Free",
      secondaryCta: "View Demo",
      proof: [
        { value: "15K+", label: "weekly plans generated" },
        { value: "4.8★", label: "average weekly retention" },
        { value: "-22%", label: "fatigue risk reduction" },
      ],
      dashboard: {
        title: "Today's Training Dashboard",
        badge: "AI Ready",
        workoutLabel: "Workout",
        workoutTitle: "10K progression + 4x1K threshold",
        workoutMeta: "Target pace 4'45 - 4'55 / Recovery HR < 142 / Load target 78",
        predictionLabel: "Race Prediction",
        predictionValue: "Half Marathon 1:37:42",
        predictionText:
          "Adjust finishing-time forecasts from six-week load trends, VO2 Max estimates, and terrain fit.",
      },
    },
    features: {
      eyebrow: "CORE FEATURES",
      title: "Give every run a better plan, a better route, and a better forecast.",
      description:
        "Break daily training decisions into the three things runners use most: what to run, where to run, and how close they are to their goal.",
      items: [
        {
          title: "AI Daily Workout",
          description:
            "Create the most effective workout for today from recovery, recent load, and goal-race context.",
        },
        {
          title: "Route Recommendation",
          description:
            "Balance terrain, weather, time window, and safety weighting to suggest the best route for today.",
        },
        {
          title: "Race Prediction Engine",
          description:
            "Continuously refine your finishing-time outlook from progress, pacing stability, and biometric trends.",
        },
      ],
    },
    howItWorks: {
      eyebrow: "HOW IT WORKS",
      title: "A training loop that gets smarter every day from data to feedback.",
      description:
        "Runner profile, device data, and post-run feedback flow back into the model to recalibrate workouts and route logic.",
      steps: [
        {
          title: "Input Data",
          description: "Set your race goal, weekly volume, heart-rate zones, and preferred run windows.",
        },
        {
          title: "AI Evaluation",
          description: "The model scores fatigue, recovery, terrain fit, and recent performance.",
        },
        {
          title: "Workout + Route",
          description: "You receive a daily session, suggested pace, and the route that best matches it.",
        },
        {
          title: "Post-run Feedback",
          description: "Upload perceived effort, HR drift, and completion quality for model adjustment.",
        },
        {
          title: "Optimize Continuously",
          description: "The system adapts each coming session to reduce plateau and injury risk.",
        },
      ],
    },
    route: {
      eyebrow: "SMART ROUTE",
      title: "Know not only what to run, but where to run it today.",
      description:
        "Route recommendations account for training intent, available time, accumulated fatigue, and mapped area data, with safety, terrain, and distance prioritized.",
      bullets: [
        "Safety first: avoid high-traffic and low-light segments",
        "Terrain fit: recovery flats, hill stimulus, or endurance routes",
        "Distance control: match the exact mileage your session needs",
      ],
      metrics: [
        { value: "8.6 km", label: "flat riverside route" },
        { value: "94 / 100", label: "safety and lighting score" },
      ],
    },
    trust: {
      eyebrow: "TRUST / SOCIAL PROOF",
      title: "Continuously improve from your training data and get closer every week.",
      description:
        "Clear metrics show runners this is not a static plan. It is a training system that adapts to current condition.",
      stats: [
        { value: "+18%", label: "pace stability" },
        { value: "32 days", label: "average continuous cycle" },
        { value: "91%", label: "route recommendation acceptance" },
        { value: "-26%", label: "high-fatigue weeks" },
      ],
    },
    cta: {
      eyebrow: "START NOW",
      title: "Start your first training cycle",
      description:
        "Let AI generate your first week of pacing, workouts, and routes from your ability and goals.",
      button: "Start Training",
    },
    footer: {
      links: ["Features", "Pricing", "中文 / EN / DE"],
      copyright: "Built for runners who train with intent.",
    },
  },
  de: {
    brand: "RunAI",
    nav: {
      features: "Funktionen",
      howItWorks: "Ablauf",
      pricing: "Preise",
      startTraining: "Training starten",
      languageLabel: "Sprache wechseln",
      themeLabel: "Theme wechseln",
    },
    hero: {
      eyebrow: "ADAPTIVE RUNNING OS",
      title:
        "Dein KI-Laufcoach hilft dir, schneller, weiter und intelligenter zu laufen.",
      description:
        "Erstelle tägliche Trainingspläne und Routenvorschläge automatisch aus deinem Leistungsstand, deinen Zielen und deiner Umgebung.",
      primaryCta: "Kostenlos starten",
      secondaryCta: "Demo ansehen",
      proof: [
        { value: "15K+", label: "wöchentlich erzeugte Pläne" },
        { value: "4.8★", label: "durchschnittliche Wochenbindung" },
        { value: "-22%", label: "weniger Ermüdungsrisiko" },
      ],
      dashboard: {
        title: "Heutiges Trainings-Dashboard",
        badge: "AI Ready",
        workoutLabel: "Training",
        workoutTitle: "10 km Progression + 4x1 km Schwelle",
        workoutMeta: "Zieltempo 4'45 - 4'55 / Erholungs-HF < 142 / Belastungsziel 78",
        predictionLabel: "Wettkampfprognose",
        predictionValue: "Halbmarathon 1:37:42",
        predictionText:
          "Passe Zielzeiten anhand von Sechs-Wochen-Last, VO2-Max-Schätzung und Geländefit an.",
      },
    },
    features: {
      eyebrow: "CORE FEATURES",
      title:
        "Für jeden Lauf der bessere Plan, die bessere Route und die bessere Prognose.",
      description:
        "Zerlege tägliche Trainingsentscheidungen in die drei Fragen, die Läufer wirklich brauchen: was, wo und wie nah am Ziel.",
      items: [
        {
          title: "KI-Tagesplan",
          description:
            "Erzeuge das effektivste Training des Tages aus Erholung, aktueller Belastung und Zielrennen.",
        },
        {
          title: "Routenempfehlung",
          description:
            "Gewichte Terrain, Wetter, Zeitfenster und Sicherheit für die beste Route des Tages.",
        },
        {
          title: "Wettkampfprognose",
          description:
            "Verfeinere deine Zielzeit laufend anhand von Fortschritt, Pace-Stabilität und Biomarkern.",
        },
      ],
    },
    howItWorks: {
      eyebrow: "HOW IT WORKS",
      title:
        "Ein Trainingskreislauf, der von Daten bis Feedback jeden Tag intelligenter wird.",
      description:
        "Läuferprofil, Gerätedaten und Feedback nach dem Lauf fließen zurück ins Modell und kalibrieren Training und Route neu.",
      steps: [
        {
          title: "Daten eingeben",
          description:
            "Lege Zielrennen, Wochenumfang, Herzfrequenzzonen und bevorzugte Laufzeiten fest.",
        },
        {
          title: "KI-Bewertung",
          description:
            "Das Modell bewertet Ermüdung, Erholung, Geländefit und aktuelle Leistung.",
        },
        {
          title: "Training + Route",
          description:
            "Du erhältst die Tageseinheit, Zieltempo und die passende Route.",
        },
        {
          title: "Feedback danach",
          description:
            "Lade subjektive Belastung, HR-Drift und Trainingsqualität zur Anpassung hoch.",
        },
        {
          title: "Kontinuierlich optimieren",
          description:
            "Das System passt kommende Einheiten an und reduziert Plateau- und Verletzungsrisiko.",
        },
      ],
    },
    route: {
      eyebrow: "SMART ROUTE",
      title:
        "Nicht nur wissen, was du läufst, sondern auch wo du heute laufen solltest.",
      description:
        "Routenempfehlungen berücksichtigen Trainingsziel, verfügbares Zeitfenster, kumulierte Ermüdung und Kartendaten mit Fokus auf Sicherheit, Terrain und Distanz.",
      bullets: [
        "Sicherheit zuerst: meide Verkehr und schlecht beleuchtete Abschnitte",
        "Terrain passend: flach zur Erholung, Hügel für Reiz, lang für Ausdauer",
        "Distanz präzise: exakt passend zur heutigen Einheit",
      ],
      metrics: [
        { value: "8.6 km", label: "flache Flussroute" },
        { value: "94 / 100", label: "Sicherheits- und Lichtscore" },
      ],
    },
    trust: {
      eyebrow: "TRUST / SOCIAL PROOF",
      title:
        "Optimiere kontinuierlich mit deinen Trainingsdaten und komme Woche für Woche näher ans Ziel.",
      description:
        "Klare Kennzahlen zeigen: Das ist kein statischer Plan, sondern ein System, das sich deinem Zustand anpasst.",
      stats: [
        { value: "+18%", label: "Pace-Stabilität" },
        { value: "32 Tage", label: "durchschnittlicher Trainingszyklus" },
        { value: "91%", label: "Akzeptanz der Routenvorschläge" },
        { value: "-26%", label: "Wochen mit hoher Ermüdung" },
      ],
    },
    cta: {
      eyebrow: "START NOW",
      title: "Starte deinen ersten Trainingszyklus",
      description:
        "Lass KI deine erste Woche mit Pacing, Workouts und Routen aus deinen Zielen erzeugen.",
      button: "Training starten",
    },
    footer: {
      links: ["Funktionen", "Preise", "中文 / EN / DE"],
      copyright: "Built for runners who train with intent.",
    },
  },
} as const;

export type LandingDictionary = WidenLiteralStrings<(typeof dict)["zh"]>;
