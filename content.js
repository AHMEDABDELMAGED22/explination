export const lesson = {
  title: "Development of Information Technology and Social Transformation",
  titleAr: "تطوّر تكنولوجيا المعلومات والتحول الاجتماعي",
  number: "1-1",
  guidingQuestion: "How has information technology developed through its major stages, and how has each stage changed society?",
  guidingQuestionAr: "كيف تطورت تكنولوجيا المعلومات؟ وكيف غيّرت المجتمع؟",
  keyFact: "At each stage, information technology introduced a new technology or service and also changed how society communicates, works, and does business.",
  stages: [
    {
      id: "eniac", era: "1940s–60s", label: "Birth of the computer", technology: "ENIAC + vacuum tubes",
      impact: "Mainly used for military and scientific computation", image: "media/eniac.jpg", imageAlt: "Historical ENIAC computer room",
      significance: "The first computers filled a whole room. Computing began as large-scale work for institutions rather than a personal activity.",
      question: "What becomes possible when a machine can perform large-scale computation?",
      example: "ENIAC represented the birth of electronic computing: a room-sized system built for demanding military and scientific calculations.",
      before: "No electronic general-purpose computer", after: "Large-scale electronic computation",
      source: "Wikimedia Commons — Classic shot of the ENIAC, public domain"
    },
    {
      id: "pc", era: "1970s–80s", label: "Personal computers", technology: "PCs spread",
      impact: "Beginning of personal computer use", image: "media/early_pcs.jpg", imageAlt: "Early personal computers",
      significance: "Computing moved closer to the individual. Instead of a computer mainly serving a large institution, an individual could use a PC directly.",
      question: "What becomes possible when computing is on a person’s desk?",
      example: "The personal computer changed the user relationship: the computer was no longer only a shared institutional machine.",
      before: "Computing mainly served large institutions", after: "Individuals could use a computer directly",
      source: "Wikimedia Commons — Early Personal Computers"
    },
    {
      id: "web", era: "1990s", label: "Internet + Web", technology: "Commercialization of the Internet; the Web",
      impact: "Globalization of information; spread of email", image: "media/first_web.png", imageAlt: "The first World Wide Web project page",
      significance: "The Web made information reachable through pages and links. Commercial Internet access connected information across locations and accelerated the spread of email.",
      question: "How did pages, links, and email change the reach of information?",
      example: "The first Web page is a historical reminder that information could be organized as linked pages and reached through a network.",
      before: "Information access was more local and separated", after: "Information became global and email spread",
      source: "Wikimedia Commons — The World Wide Web project"
    },
    {
      id: "mobile", era: "2000s", label: "Smartphones", technology: "iPhone and other smartphones",
      impact: "Explosive spread of mobile Internet", image: "media/ibm_simon.png", imageAlt: "IBM Simon Personal Communicator",
      modernImage: "media/smartphone.jpg", modernAlt: "Modern smartphone",
      significance: "The rise of smartphones moved computing and information access into the pocket, helping mobile Internet spread explosively.",
      question: "What changes when information access is available almost any time and anywhere?",
      example: "The IBM Simon and modern smartphones show the move from an early multifunction mobile device to a connected pocket computer.",
      before: "Internet access from a fixed place", after: "Mobile Internet access in the pocket",
      source: "Wikimedia Commons — IBM Simon Personal Communicator, public domain; smartphone category"
    },
    {
      id: "cloud", era: "2010s onward", label: "Cloud computing", technology: "IT as a service",
      impact: "Large-scale data analysis and AI; IT as a service becomes widespread", image: null, imageAlt: "Cloud computing architecture diagram",
      significance: "Cloud computing does not mean no machines. It means that computing resources are accessed as a service over a network. Real machines, storage, and computing services remain in physical places.",
      question: "Why might a school or company access computing as a service instead of providing every resource locally?",
      example: "A device can connect through a network to shared compute, storage, large-scale data analysis, and AI services.",
      before: "Every user or organization provides more resources locally", after: "Computing resources are accessed as a network service",
      source: "Official Lesson 1 source extraction"
    }
  ],
  socialChanges: [
    { id: "sns", term: "SNS", ar: "خدمات التواصل الاجتماعي", title: "Social Networking Service", short: "Connect, post, share, and spread information rapidly.", visual: "network", example: "Sharing photos with friends on SNS.", sourceText: "Services that allow users to connect with each other and post and share information. They are highly effective at spreading information rapidly." },
    { id: "ecommerce", term: "E-commerce", ar: "التجارة الإلكترونية", title: "Electronic commerce (EC)", short: "Buy and sell goods and services through the Internet.", visual: "commerce", example: "Online shops such as Amazon and eBay.", sourceText: "Buying and selling goods and services through the Internet." },
    { id: "remote", term: "Remote work", ar: "العمل عن بُعد", title: "Remote work", short: "Work from home or another remote location using the Internet.", visual: "remote", example: "A company introducing a work-from-home system.", sourceText: "A working style in which work is performed from home or other remote locations using the Internet." },
    { id: "learning", term: "Online learning", ar: "التعلّم عبر الإنترنت", title: "Online learning", short: "Classes and study materials are delivered using the Internet.", visual: "learning", example: "Taking classes through online learning.", sourceText: "A learning style in which classes and study materials are delivered using the Internet." },
    { id: "cashless", term: "Cashless payment", ar: "الدفع غير النقدي", title: "Cashless payment", short: "Pay using electronic money, QR codes, cards, or mobile apps without cash.", visual: "payment", example: "Paying with a mobile payment app on a smartphone.", sourceText: "A system for making payments using electronic money, QR codes, etc., without using cash." }
  ],
  emerging: [
    { id: "autonomous", term: "Autonomous driving", ar: "القيادة الذاتية", short: "AI uses cameras and sensors to recognize surroundings, make driving decisions, and control a vehicle.", detail: "Because a delay of even 0.1 seconds can lead to an accident, edge computing processes data instantly on the vehicle itself instead of waiting for a cloud judgment.", visual: "car" },
    { id: "edge", term: "Edge computing", ar: "الحوسبة الطرفية", short: "Processing data on the device itself, instantly, instead of sending it to the cloud.", detail: "The vehicle decides on the spot: observe with cameras and sensors → process on board → control the vehicle.", visual: "edge" },
    { id: "ar", term: "AR", ar: "الواقع المعزّز", short: "Overlays digital information on real-world images.", detail: "AR adds a digital layer while the real-world scene remains visible.", visual: "ar" },
    { id: "vr", term: "VR", ar: "الواقع الافتراضي", short: "Allows users to immerse themselves in a virtual space generated by a computer.", detail: "VR replaces the visible environment with a computer-generated virtual space.", visual: "vr" },
    { id: "quantum", term: "Quantum computing", ar: "الحوسبة الكمية", short: "Expected to speed up computations that are difficult or impossible for traditional computers by using quantum mechanics.", detail: "A classical bit holds one definite state, either 0 or 1. A qubit uses superposition: a combination of 0 and 1 at once.", visual: "quantum" }
  ],
  moore: {
    definition: "The number of transistors on an integrated circuit doubles approximately every two years.",
    ar: "يتضاعف عدد الترانزستورات على الدائرة المتكاملة تقريبًا كل سنتين.",
    points: [
      ["1971", "Intel 4004", "2,300"], ["1978", "Intel 8086", "29,000"], ["1989", "Intel 80486", "1.2 million"],
      ["2000", "Pentium 4", "42 million"], ["2010", "Core i7", "1.17 billion"], ["2022", "Apple M1 Ultra", "114 billion"]
    ],
    limits: ["Quantum tunneling: electrons may slip through barriers.", "Leakage current: current escapes unintentionally.", "Higher performance and lower power become difficult to achieve together."],
    directions: ["Parallel processing using multiple processor cores", "Quantum computers based on quantum mechanics"]
  },
  exam: {
    question: "Analyze how the spread of cloud computing (from the 2010s onward) has changed the way information technology is used.",
    marks: "[6]",
    command: "Analyze",
    requirements: ["large-scale data analysis", "AI", "IT as a service"],
    structure: ["Start with the change: cloud computing spread from the 2010s onward.", "Connect cloud access to large-scale data analysis.", "Connect cloud access to AI.", "Explain the idea of IT as a service.", "Finish by linking the technical change to how IT is used."],
    evidence: ["Cloud resources are accessed over a network.", "Large-scale data analysis and AI are source-supported impacts.", "The wording “IT as a service” is required by the question."]
  },
  sidebars: [
    { label: "Key Fact", text: "At each stage, information technology introduced a new technology or service and also changed how society communicates, works, and does business." },
    { label: "Pause & Think", text: "Of these five changes, which would be hardest to give up — and why?" },
    { label: "Pause & Think", text: "In autonomous driving, why is it necessary to process data instantly on the vehicle side using edge computing, rather than sending the data to the cloud for judgment? Explain your answer." },
    { label: "Pause & Think", text: "Cashless payment is spreading in many countries. If a fully cashless society were realized, choose one advantage and one possible concern, and briefly explain the reason for each." },
    { label: "Key Takeaway", text: "Information technology developed in stages — computers, the Internet, smartphones, and cloud computing. At each stage it introduced a new technology or service and also changed how society communicates, works, learns, and pays." }
  ],
  workedExample: {
    order: {
      prompt: "From the following options (A–D), choose the one that lists the stages of information technology (IT) development in the correct chronological order.",
      choices: [
        "A  Birth of the computer → Rise of smartphones → Commercialization of the Internet → Spread of cloud computing",
        "B  Birth of the computer → Commercialization of the Internet → Rise of smartphones → Spread of cloud computing",
        "C  Commercialization of the Internet → Birth of the computer → Spread of cloud computing → Rise of smartphones",
        "D  Rise of smartphones → Commercialization of the Internet → Birth of the computer → Spread of cloud computing"
      ],
      answer: "B — Birth of the computer (1940s-60s) → Commercialization of the Internet (1990s) → Rise of smartphones (2000s) → Spread of cloud computing (2010s onward)."
    },
    truth: [
      ["A", "Moore's Law is the empirical observation that the number of transistors on an integrated circuit doubles approximately every two years.", "○"],
      ["B", "Moore's Law has been said to be approaching a physical limit in recent years.", "○"],
      ["C", "SNS is highly effective at spreading information rapidly.", "○"],
      ["D", "E-commerce (EC) refers to purchasing goods at physical stores using cash.", "×"]
    ],
    matching: {
      prompt: "Match each description (a–c) with the most appropriate technology from the choices below (A–C).",
      choices: "A Autonomous driving    B AR    C VR",
      rows: [
        ["a", "A technology that overlays digital information on real-world images", "B"],
        ["b", "A technology that uses AI to drive a vehicle without human operation", "A"],
        ["c", "A technology that allows users to immerse themselves in a virtual space generated by a computer", "C"]
      ]
    }
  },
  tryQuestions: {
    terms: [
      "What is the name of the empirical observation that the number of transistors on an integrated circuit doubles approximately every two years?",
      "What is the term for the buying and selling of goods and services using the Internet?",
      "What is the term for the working style in which one works from home or other remote locations using the Internet?",
      "What is the term for the system for making payments using electronic money, QR codes, etc., without using cash?",
      "What is the term for the technology that uses AI to drive a vehicle without human operation?"
    ],
    categories: [
      ["Taking classes through online learning.", "C — Changes in healthcare and education"],
      ["Paying for purchases using a mobile payment app on a smartphone.", "A — Changes in daily life"],
      ["Sharing photos with friends on SNS.", "A — Changes in daily life"],
      ["A company introducing a work-from-home system.", "B — Changes in industry and the economy"]
    ],
    notEmerging: {
      choices: [
        "A Autonomous driving uses AI to drive a vehicle without human operation.",
        "B AR is a technology that overlays digital information on real-world images.",
        "C VR is a technology that dramatically improves the processing speed of a computer.",
        "D Quantum computing is expected to speed up computations that are difficult for traditional computers."
      ],
      answer: "C — this is not the definition of VR. VR immerses users in a computer-generated virtual space."
    }
  },
  engineerTask: {
    prompt: "Start from the advantage and concern you named in the Pause & Think note, then investigate further and decide.",
    collect: "Survey ten classmates: do they usually pay with cash or with a cashless method (card, mobile app, or QR code)? Record the results in a table and identify the most common response.",
    stakeholders: [
      ["A customer paying", "", ""],
      ["A small shop owner", "", ""],
      ["A person with no bank card or smartphone", "", ""]
    ],
    decide: "Using your survey and your table, decide: should your community move toward cashless payment? Recommend one step and give two reasons.",
    stuck: "Start with the customer — one benefit is speed of payment; one drawback is needing a card or a phone."
  },
  newContext: "A village that has never had Internet access is connected to high-speed Internet and cashless payment for the first time. Using the stages and social changes you studied, predict two ways daily life in the village will change, and identify one new problem the village may face.",
  lessonAnswer: "The lesson question asked how information technology developed and how each stage changed society. Information technology advanced through a series of stages rather than in a single step, and each stage changed much more than the technology itself. As computing spread, information became global and then mobile, many everyday activities moved online, and information technology grew into a service that supports large-scale data analysis and AI. Each stage also brought social changes in how people communicate, work, learn, and make payments. Overall, the development of information technology is not only about faster machines; at every stage it has reshaped daily life, industry, and the way society handles information.",
  reflect: "Which stage of information technology do you think will matter most in the next ten years? Give one reason. Was your prediction at the start of the lesson correct? What changed your mind?",
  challenge: "Choose one emerging technology from this lesson (autonomous driving, AR, VR, or quantum computing). Suggest one way it could help solve a real problem, and state one risk.",
  exercise: {
    passage: "Computers were invented in the 1940s and were initially used mainly for military and scientific computation. Later, in the 1970s and 1980s, ( a ) became widespread, allowing individuals to use computers. In the 1990s, ( b ) was commercialized, advancing the globalization of information. In the 2000s, ( c ) emerged, leading to the explosive spread of mobile Internet.",
    blanks: ["personal computers (PCs)", "the Internet / the Web", "smartphones"],
    question2: "What technology, which spread from the 2010s onward, supports large-scale data analysis and the use of AI?",
    question3: "According to Moore's Law, about how often does the number of transistors on an integrated circuit double?",
    emergingChoices: "A Email    B Autonomous driving    C Personal computers    D AR    E VR    F Quantum computing",
    snsChoices: [
      "A A service that allows users to connect with each other and post and share information, and is highly effective at spreading information rapidly.",
      "B A service for buying and selling goods and services through the Internet.",
      "C A working style in which one works from home or other remote locations.",
      "D A system for making payments using electronic money or QR codes without using cash."
    ]
  },
  keyConcepts: ["Moore’s Law", "SNS", "e-commerce", "remote work", "online learning", "cashless payment", "edge computing", "autonomous driving", "AR / VR", "quantum computing"]
};

export const imageCredits = [
  ["ENIAC", "https://commons.wikimedia.org/wiki/File:Classic_shot_of_the_ENIAC.jpg"],
  ["Early personal computers", "https://commons.wikimedia.org/wiki/File:Early_Personal_Computers.jpg"],
  ["First Web page", "https://commons.wikimedia.org/wiki/File:The_World_Wide_Web_project.png"],
  ["IBM Simon Personal Communicator", "https://commons.wikimedia.org/wiki/File:IBM_Simon_Personal_Communicator.png"],
  ["Moore’s Law chart", "https://commons.wikimedia.org/wiki/File:Moore%27s_Law_%E2%80%93_chart_of_transistor_count_of_microchips.png"],
  ["VR headset", "https://commons.wikimedia.org/wiki/File:Virtual_reality_headset.jpg"]
];
