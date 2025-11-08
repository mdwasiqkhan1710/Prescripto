const doctors = [
  /* 1 */ {
    name: "Dr. William Carter",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846601/doc1_pbalkb.png",
    email: "william.carter@prescripto.com",
    password: "WillC@123",
    speciality: "General physician",
    degree: "MBBS, MD",
    experience: "7 Years",
    about:
      "Dr. William Carter delivers compassionate primary care with a focus on preventive screening and chronic disease management. He spends time explaining treatment options and lifestyle interventions. Patients praise his thoroughness and measured approach to diagnosis.",
    fee: 60,
    date: Date.now(),
    address: {
      line1: "12 Westbourne Terrace",
      line2: "Paddington, London, UK",
    },
  },

  /* 2 */ {
    name: "Dr. Olivia Bennett",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846602/doc2_npgvkm.png",
    email: "olivia.bennett@prescripto.com",
    password: "OliviaB@123",
    speciality: "Gynecologist",
    degree: "MBBS, MS (ObGyn)",
    experience: "6 Years",
    about:
      "Dr. Olivia Bennett specializes in women’s health, prenatal care and minimally invasive procedures. She advocates for evidence-based care and empathetic counseling through pregnancy and fertility challenges. Patients find her communication clear and reassuring.",
    fee: 75,
    date: Date.now(),
    address: { line1: "44 Riverbank Road", line2: "Brooklyn, NY, USA" },
  },

  /* 3 */ {
    name: "Dr. James Cooper",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc4_lbihmr.png",
    email: "james.cooper@prescripto.com",
    password: "JamesC@123",
    speciality: "Dermatologist",
    degree: "MBBS, MD (Dermatology)",
    experience: "5 Years",
    about:
      "Dr. James Cooper focuses on medical and cosmetic dermatology including acne, eczema, and hair disorders. He creates treatment plans that combine medical therapy and lifestyle advice. He emphasizes long-term skin health and patient education.",
    fee: 65,
    date: Date.now(),
    address: { line1: "18 Elm Street", line2: "Cambridge, MA, USA" },
  },

  /* 4 */ {
    name: "Dr. Amelia Hughes",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846561/doc5_pzlxcw.png",
    email: "amelia.hughes@prescripto.com",
    password: "AmeliaH@123",
    speciality: "Pediatricians",
    degree: "MBBS, MD (Pediatrics)",
    experience: "4 Years",
    about:
      "Dr. Amelia Hughes provides expert pediatric care for infants and children, focusing on growth, immunization, and nutrition. She keeps families informed and comfortable during every visit. Parents value her calm bedside manner and clear guidance.",
    fee: 55,
    date: Date.now(),
    address: { line1: "90 Baker Avenue", line2: "Bristol, UK" },
  },

  /* 5 */ {
    name: "Dr. Henry Mitchell",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846562/doc8_l6mfkx.png",
    email: "henry.mitchell@prescripto.com",
    password: "HenryM@123",
    speciality: "Neurologist",
    degree: "MBBS, DM (Neurology)",
    experience: "9 Years",
    about:
      "Dr. Henry Mitchell treats a wide range of neurologic disorders including migraines, epilepsy and stroke care. He emphasizes accurate diagnosis and long-term management plans. Patients appreciate his careful explanations and structured follow-up.",
    fee: 95,
    date: Date.now(),
    address: { line1: "7 Park Lane", line2: "Mayfair, London, UK" },
  },

  /* 6 */ {
    name: "Dr. Emma Collins",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846562/doc9_sfwxuj.png",
    email: "emma.collins@prescripto.com",
    password: "EmmaC@123",
    speciality: "Gastroenterologist",
    degree: "MBBS, DM (Gastroenterology)",
    experience: "10 Years",
    about:
      "Dr. Emma Collins is an expert in digestive health, including IBS, acid reflux and liver disease. She integrates endoscopic skills with dietary guidance to achieve sustained improvement. Her patient-first approach and practical advice are highly valued.",
    fee: 85,
    date: Date.now(),
    address: { line1: "320 Madison Ave", line2: "New York, NY, USA" },
  },

  /* 7 */ {
    name: "Dr. Alexander Graham",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846560/doc7_m8lcx6.png",
    email: "alex.graham@prescripto.com",
    password: "AlexG@123",
    speciality: "General physician",
    degree: "MBBS, MRCP",
    experience: "8 Years",
    about:
      "Dr. Alexander Graham is experienced in outpatient medicine and complex chronic care management. He emphasizes preventive strategies and evidence-based therapies. His clear communication helps patients make informed decisions about their health.",
    fee: 70,
    date: Date.now(),
    address: { line1: "2 Queen's Crescent", line2: "Camden, London, UK" },
  },

  /* 8 */ {
    name: "Dr. Charlotte Reed",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc11_flchu4.png",
    email: "charlotte.reed@prescripto.com",
    password: "CharlotteR@123",
    speciality: "Gynecologist",
    degree: "MBBS, DGO",
    experience: "5 Years",
    about:
      "Dr. Charlotte Reed provides comprehensive gynecologic care including antenatal monitoring and menstrual disorder management. She places emphasis on shared decision-making and gentle clinical practice. Her patients trust her for both routine and advanced care.",
    fee: 68,
    date: Date.now(),
    address: { line1: "112 North Road", line2: "Bournemouth, UK" },
  },

  /* 9 */ {
    name: "Dr. Daniel Foster",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc10_d3pcud.png",
    email: "daniel.foster@prescripto.com",
    password: "DanielF@123",
    speciality: "Dermatologist",
    degree: "MBBS, MD",
    experience: "6 Years",
    about:
      "Dr. Daniel Foster focuses on complex dermatologic conditions and cosmetic dermatology. He uses the latest evidence-based treatments for skin health and aesthetic concerns. The practice emphasizes realistic goals and long-term maintenance.",
    fee: 72,
    date: Date.now(),
    address: { line1: "44 Park Road", line2: "Leeds, UK" },
  },

  /* 10 */ {
    name: "Dr. Sophia Turner",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc13_ddw6qy.png",
    email: "sophia.turner@prescripto.com",
    password: "SophiaT@123",
    speciality: "Pediatricians",
    degree: "MBBS, DCH",
    experience: "3 Years",
    about:
      "Dr. Sophia Turner provides friendly, evidence-based pediatric care and developmental screening. She supports families with practical feeding and sleep strategies and follows a gentle, communicative approach to reduce stress during visits.",
    fee: 58,
    date: Date.now(),
    address: { line1: "8 Willow Lane", line2: "Portsmouth, UK" },
  },

  /* 11 */ {
    name: "Dr. Ethan Walker",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc4_lbihmr.png",
    email: "ethan.walker@prescripto.com",
    password: "EthanW@123",
    speciality: "Neurologist",
    degree: "MBBS, MD, FRCP",
    experience: "7 Years",
    about:
      "Dr. Ethan Walker works on headache disorders and epilepsy management, providing tailored medical plans and rehabilitation coordination. He prioritizes clear patient education and supports long-term wellness strategies for neurological health.",
    fee: 88,
    date: Date.now(),
    address: { line1: "120 Beacon Street", line2: "Boston, MA, USA" },
  },

  /* 12 */ {
    name: "Dr. Grace Wilson",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc14_wbhiql.png",
    email: "grace.wilson@prescripto.com",
    password: "GraceW@123",
    speciality: "Gastroenterologist",
    degree: "MBBS, MD",
    experience: "6 Years",
    about:
      "Dr. Grace Wilson manages liver and gastrointestinal disorders with a focus on diagnostic precision and patient-centered diet plans. She pairs clinical interventions with practical lifestyle strategies to optimize digestive health.",
    fee: 82,
    date: Date.now(),
    address: { line1: "25 King's Road", line2: "Brighton, UK" },
  },

  /* 13 */ {
    name: "Dr. Benjamin Price",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846602/doc3_br2rzy.png",
    email: "benjamin.price@prescripto.com",
    password: "BenjaminP@123",
    speciality: "General physician",
    degree: "MBBS, DNB",
    experience: "2 Years",
    about:
      "Dr. Benjamin Price provides thorough primary care consultations and focuses on evidence-led preventive health interventions. He enjoys teaching patients about chronic disease prevention and healthy lifestyle changes.",
    fee: 45,
    date: Date.now(),
    address: { line1: "6 Long Street", line2: "Oxford, UK" },
  },

  /* 14 */ {
    name: "Dr. Isabella Ward",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846562/doc9_sfwxuj.png",
    email: "isabella.ward@prescripto.com",
    password: "IsabellaW@123",
    speciality: "Gynecologist",
    degree: "MBBS, MS",
    experience: "4 Years",
    about:
      "Dr. Isabella Ward emphasizes prenatal safety, family planning and minimally invasive gynecologic care. Her warm bedside manner and clear explanations are appreciated by patients seeking continuity of care.",
    fee: 70,
    date: Date.now(),
    address: { line1: "210 Elm Grove", line2: "Manchester, UK" },
  },

  /* 15 */ {
    name: "Dr. Oliver Hayes",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc13_ddw6qy.png",
    email: "oliver.hayes@prescripto.com",
    password: "OliverH@123",
    speciality: "Dermatologist",
    degree: "MBBS, DDV",
    experience: "3 Years",
    about:
      "Dr. Oliver Hayes treats common and chronic skin conditions with a combination of medical therapy and patient-tailored skincare regimes. He focuses on sustainable outcomes and patient education for daily skin maintenance.",
    fee: 60,
    date: Date.now(),
    address: { line1: "34 Church Lane", line2: "Sheffield, UK" },
  },

  /* 16 */ {
    name: "Dr. Charlotte Morgan",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc15_yasunw.png",
    email: "charlotte.morgan@prescripto.com",
    password: "CharlotteM@123",
    speciality: "Pediatricians",
    degree: "MBBS, MD (Pediatrics)",
    experience: "5 Years",
    about:
      "Dr. Charlotte Morgan provides comprehensive pediatric care from infancy through adolescence, including vaccination schedules and developmental assessments. She supports families with practical care plans and friendly consultations.",
    fee: 60,
    date: Date.now(),
    address: { line1: "9 Oak Court", line2: "Richmond, London, UK" },
  },

  /* 17 */ {
    name: "Dr. Matthew Price",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846602/doc12_pa06tn.png",
    email: "matthew.price@prescripto.com",
    password: "MatthewP@123",
    speciality: "Neurologist",
    degree: "MBBS, DM",
    experience: "4 Years",
    about:
      "Dr. Matthew Price is experienced in neuropathies, migraine and coordination disorders. He emphasizes diagnostic clarity and rehabilitation pathways to restore patients’ quality of life. His hands-on approach encourages active recovery.",
    fee: 78,
    date: Date.now(),
    address: { line1: "77 Willow Road", line2: "Baltimore, MD, USA" },
  },

  /* 18 */ {
    name: "Dr. Emily Lawson",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846561/doc5_pzlxcw.png",
    email: "emily.lawson@prescripto.com",
    password: "EmilyL@123",
    speciality: "Gastroenterologist",
    degree: "MBBS, DNB",
    experience: "5 Years",
    about:
      "Dr. Emily Lawson manages gut health and liver conditions with a focus on endoscopic skills and nutrition-led recovery. She believes in careful diagnostics and collaborative treatment planning. Patients note her practical, reassuring guidance.",
    fee: 72,
    date: Date.now(),
    address: { line1: "146 Bay Street", line2: "Liverpool, UK" },
  },

  /* 19 */ {
    name: "Dr. Samuel Clarke",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846562/doc8_l6mfkx.png",
    email: "samuel.clarke@prescripto.com",
    password: "SamuelC@123",
    speciality: "General physician",
    degree: "MBBS, MD",
    experience: "1 Years",
    about:
      "Dr. Samuel Clarke provides friendly and evidence-based general practice consultations, focusing on acute care and preventive checks. He is thorough in history-taking and ensures patients understand their care plan.",
    fee: 42,
    date: Date.now(),
    address: { line1: "305 Willow Street", line2: "Hartford, CT, USA" },
  },

  /* 20 */ {
    name: "Dr. Grace Bennett",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc13_ddw6qy.png",
    email: "grace.bennett@prescripto.com",
    password: "GraceB@123",
    speciality: "Gynecologist",
    degree: "MBBS, MD",
    experience: "8 Years",
    about:
      "Dr. Grace Bennett has expertise in high-risk pregnancy care and gynecologic surgery. She combines surgical precision with compassionate counseling to support patients through complex reproductive concerns.",
    fee: 82,
    date: Date.now(),
    address: { line1: "2 Lakeview Crescent", line2: "Birmingham, UK" },
  },

  /* 21 */ {
    name: "Dr. Noah Bennett",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846601/doc1_pbalkb.png",
    email: "noah.bennett@prescripto.com",
    password: "NoahB@123",
    speciality: "Dermatologist",
    degree: "MBBS, MD",
    experience: "10 Years",
    about:
      "Dr. Noah Bennett specializes in dermatologic surgery, psoriasis care, and medical dermatology. He designs long-term treatment plans that address root causes and maintain healthy skin over time.",
    fee: 95,
    date: Date.now(),
    address: { line1: "58 Elmwood Avenue", line2: "Providence, RI, USA" },
  },

  /* 22 */ {
    name: "Dr. Ava Richardson",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc15_yasunw.png",
    email: "ava.richardson@prescripto.com",
    password: "AvaR@123",
    speciality: "Pediatricians",
    degree: "MBBS, DCH",
    experience: "3 Years",
    about:
      "Dr. Ava Richardson focuses on preventative child health, nutrition and developmental milestones. She supports parents through clear, evidence-based advice and tailors care for each child’s needs.",
    fee: 52,
    date: Date.now(),
    address: { line1: "12 Orchard Street", line2: "Exeter, UK" },
  },

  /* 23 */ {
    name: "Dr. Lucas Bennett",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846602/doc12_pa06tn.png",
    email: "lucas.bennett@prescripto.com",
    password: "LucasB@123",
    speciality: "Neurologist",
    degree: "MBBS, DM",
    experience: "6 Years",
    about:
      "Dr. Lucas Bennett treats neuro-muscular and headache disorders with careful diagnostics and individualized care plans. He works closely with multidisciplinary teams to optimize patient outcomes and rehabilitation plans.",
    fee: 88,
    date: Date.now(),
    address: { line1: "9 Stonebridge Lane", line2: "Richmond, VA, USA" },
  },

  /* 24 */ {
    name: "Dr. Mia Clarke",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846602/doc2_npgvkm.png",
    email: "mia.clarke@prescripto.com",
    password: "MiaC@123",
    speciality: "Gastroenterologist",
    degree: "MBBS, MD",
    experience: "2 Years",
    about:
      "Dr. Mia Clarke is skilled in diagnostic endoscopy and managing chronic gut disorders. She focuses on nutrition and lifestyle adjustments along with targeted medical therapy to support recovery.",
    fee: 62,
    date: Date.now(),
    address: { line1: "48 Queens Gate", line2: "Edinburgh, UK" },
  },

  /* 25 */ {
    name: "Dr. Jacob Turner",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc14_wbhiql.png",
    email: "jacob.turner@prescripto.com",
    password: "JacobT@123",
    speciality: "General physician",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Jacob Turner focuses on acute care and chronic disease monitoring with strong patient communication. He supports preventative medicine and comprehensive screening programs for families.",
    fee: 48,
    date: Date.now(),
    address: { line1: "11 Redwood Road", line2: "Norwich, UK" },
  },

  /* 26 */ {
    name: "Dr. Lily Patterson",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc11_flchu4.png",
    email: "lily.patterson@prescripto.com",
    password: "LilyP@123",
    speciality: "Gynecologist",
    degree: "MBBS, MS",
    experience: "9 Years",
    about:
      "Dr. Lily Patterson manages reproductive health with a focus on minimally invasive surgery and fertility counseling. She provides thorough pre- and post-operative guidance and individualized treatment plans.",
    fee: 90,
    date: Date.now(),
    address: { line1: "3 Harbour Lane", line2: "Brighton, UK" },
  },

  /* 27 */ {
    name: "Dr. Ryan Brooks",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846602/doc3_br2rzy.png",
    email: "ryan.brooks@prescripto.com",
    password: "RyanB@123",
    speciality: "Dermatologist",
    degree: "MBBS, MD (Derm)",
    experience: "4 Years",
    about:
      "Dr. Ryan Brooks treats acne, rosacea and chronic eczema with up-to-date medical therapies. He emphasizes realistic expectations for cosmetic interventions and long-term skin maintenance.",
    fee: 66,
    date: Date.now(),
    address: { line1: "21 Orchard Park", line2: "Birmingham, AL, USA" },
  },

  /* 28 */ {
    name: "Dr. Zoe Mitchell",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846603/doc11_flchu4.png",
    email: "zoe.mitchell@prescripto.com",
    password: "ZoeM@123",
    speciality: "Pediatricians",
    degree: "MBBS, DCH",
    experience: "5 Years",
    about:
      "Dr. Zoe Mitchell provides family-centered pediatric care with an emphasis on disease prevention and developmental follow-up. She’s known for a steady, gentle approach that helps anxious children feel safe.",
    fee: 59,
    date: Date.now(),
    address: { line1: "66 Seaview Terrace", line2: "Bournemouth, UK" },
  },

  /* 29 */ {
    name: "Dr. George Reid",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846562/doc6_lxccrt.png",
    email: "george.reid@prescripto.com",
    password: "GeorgeR@123",
    speciality: "Neurologist",
    degree: "MBBS, DM",
    experience: "8 Years",
    about:
      "Dr. George Reid treats stroke, neurodegenerative disease and neuropathic pain conditions. He focuses on coordinated care with rehab teams and uses evidence-based approaches to optimize neurologic function.",
    fee: 92,
    date: Date.now(),
    address: { line1: "9 Sefton Road", line2: "Liverpool, UK" },
  },

  /* 30 */ {
    name: "Dr. Hannah Edwards",
    image: "https://res.cloudinary.com/dcltezm5t/image/upload/v1761846602/doc2_npgvkm.png",
    email: "hannah.edwards@prescripto.com",
    password: "HannahE@123",
    speciality: "Gastroenterologist",
    degree: "MBBS, MD (Gastro)",
    experience: "5 Years",
    about:
      "Dr. Hannah Edwards focuses on inflammatory bowel disease, functional gut disorders and dietary therapy for digestive health. She pursues thorough assessment and practical management plans tailored to each patient.",
    fee: 78,
    date: Date.now(),
    address: { line1: "140 Green Lane", line2: "Cambridge, UK" },
  },
];

export default doctors;