// location-enrichment.ts
// Unique enrichment content for all 18 Kenyan cyberecitizen.com locations.
// Each entry provides deep-dive prose, local tips, popular services,
// location-specific FAQs, and per-service notes.

export interface LocationEnrichment {
  deep_dive: string;
  local_tips: string[];
  popular_services: string[];
  faqs: { question: string; answer: string }[];
  service_notes: Record<string, string>;
}

export const locationEnrichments: Record<string, LocationEnrichment> = {
  // ─────────────────────────────────────────────
  // 1. NAIROBI CBD
  // ─────────────────────────────────────────────
  "nairobi-cbd": {
    deep_dive:
      "Nairobi CBD is the administrative heart of Kenya and the single busiest corridor for eCitizen government services. " +
      "The Huduma Centre at GPO Teleposta Towers on Kenyatta Avenue processes thousands of applications daily, from passport " +
      "submissions to KRA PIN registrations. Our cyber cafe on Tom Mboya Street sits within walking distance of the Immigration " +
      "headquarters on Nyayo House, the Sheria House DCI offices, and the Times Tower KRA headquarters. The CBD attracts workers " +
      "from Eastleigh, Pangani, South B, and satellite towns who commute via matatu termini at Kencom, Railway, and Ambassador. " +
      "Peak foot traffic between 8 AM and 10 AM means government portals can slow down; we advise clients to start applications " +
      "before 7:30 AM or after 2 PM. The dense concentration of government offices makes Nairobi CBD ideal for same-day service " +
      "chains — for example, applying for a DCI certificate online and walking to Sheria House for fingerprinting within the hour.",

    local_tips: [
      "The Huduma Centre at GPO Teleposta Towers (Kenyatta Avenue) opens at 8 AM — arrive by 7:30 AM to beat queues for passport and ID collection.",
      "DCI fingerprinting for police clearance is done at the DCI National Headquarters on Kiambu Road or at Sheria House, Harambee Avenue — book your slot online first.",
      "Times Tower (KRA headquarters) is a 5-minute walk along Haile Selassie Avenue for any KRA PIN issues requiring in-person resolution.",
      "Avoid driving into the CBD on weekday mornings; matatus from Kencom or the Railway terminus are faster and cheaper.",
      "Passport interviews and biometrics are at Nyayo House, Kenyatta Avenue — schedule your appointment via eCitizen before visiting.",
    ],

    popular_services: [
      "kra-pin-registration",
      "police-clearance",
      "passport-application",
    ],

    faqs: [
      {
        question:
          "Where do I collect my DCI police clearance certificate after applying online from Nairobi CBD?",
        answer:
          "After completing your online application and fingerprinting, DCI certificates are collected from the DCI Headquarters on Kiambu Road. You will receive an SMS notification once your certificate is ready, typically within 7-14 working days.",
      },
      {
        question:
          "Can I complete my KRA PIN registration and visit Times Tower on the same day?",
        answer:
          "Yes. Our Nairobi CBD cyber cafe is a short walk from Times Tower on Haile Selassie Avenue. We can register your KRA PIN online, and if you need to resolve any iTax issues in person, you can walk to the KRA service centre immediately after.",
      },
      {
        question:
          "What time should I arrive at the Huduma Centre on Kenyatta Avenue to avoid long waits?",
        answer:
          "The Huduma Centre opens at 8 AM but queues start forming by 7:30 AM. For passport and ID services, arriving before 7:45 AM typically means you are served within the first hour. Afternoons after 2 PM are also less crowded.",
      },
    ],

    service_notes: {
      "passport-application":
        "Passport biometrics and interviews are conducted at Nyayo House on Kenyatta Avenue, a 10-minute walk from our CBD location. Book your appointment via eCitizen before visiting.",
      "smart-dl-renewal":
        "The NTSA headquarters at Hill Park Building, Upper Hill, handles interim driving licence collection. You can also collect at the Huduma Centre, GPO Teleposta Towers.",
      "logbook-transfer":
        "NTSA logbook transfer queries can be resolved at the NTSA offices at Hill Park Building, Upper Hill, about 15 minutes by matatu from the CBD.",
      "police-clearance":
        "Fingerprinting is available at Sheria House (Harambee Avenue) and DCI Headquarters (Kiambu Road). Both are accessible from the CBD — Sheria House is within walking distance.",
      "kra-pin-registration":
        "Times Tower KRA headquarters on Haile Selassie Avenue is the primary office for resolving iTax and PIN-related issues. Walk-in service available Monday to Friday.",
      "business-name-search":
        "The Registrar of Companies (Sheria House, ground floor) is a 5-minute walk for business name reservation follow-ups and company registration queries.",
      "birth-registration":
        "Birth certificate applications are processed at the Civil Registration Bureau on Uhuru Highway. Collect certificates from the same office after 2-4 weeks.",
      "helb-loan-application":
        "The HELB offices at Anniversary Towers on University Way are accessible from the CBD for loan-related queries and repayment schedules.",
    },
  },

  // ─────────────────────────────────────────────
  // 2. WESTLANDS
  // ─────────────────────────────────────────────
  westlands: {
    deep_dive:
      "Westlands is Nairobi's premier commercial and expatriate hub, home to The Sarit Centre, Westgate Mall, and dozens of " +
      "multinational offices along Waiyaki Way and Peponi Road. The area draws a high concentration of entrepreneurs, NGO workers, " +
      "and foreign nationals who need KRA PIN registration, business name searches, and police clearance certificates for overseas " +
      "employment. Our Westlands cyber cafe serves the surrounding estates of Parklands, Highridge, and Kangemi, catering to a " +
      "tech-savvy but time-pressed clientele. The Huduma Centre at the GPO is accessible via Waiyaki Way or the Westlands " +
      "roundabout, roughly 20 minutes by car outside peak hours. Many Westlands residents prefer to process everything online " +
      "through us rather than travel into the CBD. The area has reliable fibre internet, which helps with large uploads such as " +
      "passport photos and scanned documents. We also assist numerous businesses along Muthithi Road and Chiromo Lane with " +
      "bulk KRA compliance and business registration tasks.",

    local_tips: [
      "The nearest Huduma Centre is at GPO Teleposta Towers in the CBD — take a matatu from the Westlands roundabout along Uhuru Highway, approximately 20 minutes off-peak.",
      "DCI fingerprinting appointments are best done at DCI Headquarters, Kiambu Road, which is accessible from Westlands via Limuru Road in about 15 minutes.",
      "Avoid Waiyaki Way between 7-9 AM and 5-7 PM; traffic backs up from Kangemi to the Westlands roundabout. Mid-morning appointments are more practical.",
      "For passport collection, Nyayo House is about 25 minutes from Westlands — plan to go mid-week when queues are shorter.",
    ],

    popular_services: [
      "kra-pin-registration",
      "business-name-search",
      "police-clearance",
    ],

    faqs: [
      {
        question:
          "Is there a Huduma Centre in Westlands or do I need to go to the CBD?",
        answer:
          "There is no Huduma Centre in Westlands. The nearest one is at GPO Teleposta Towers on Kenyatta Avenue in the CBD, approximately 20 minutes by car. Our cyber cafe can complete all your eCitizen applications so you only need to visit the Huduma Centre for biometrics or collection.",
      },
      {
        question:
          "Can foreign nationals use your Westlands cyber cafe for KRA PIN registration?",
        answer:
          "Yes. Foreign nationals with a valid passport or alien ID can register for a KRA PIN through our Westlands location. We handle the eCitizen portal process and you will receive your PIN certificate via email within minutes.",
      },
      {
        question:
          "Where is the nearest NTSA office for driving licence matters from Westlands?",
        answer:
          "The NTSA headquarters at Hill Park Building in Upper Hill is the nearest full-service office, about 20 minutes from Westlands. For interim driving licence collection, the Huduma Centre at GPO also processes NTSA services.",
      },
    ],

    service_notes: {
      "kra-pin-registration":
        "Westlands businesses requiring iTax support can visit the KRA Domestic Taxes office at Times Tower, CBD, or the KRA Parklands office on Limuru Road for smaller queries.",
      "business-name-search":
        "Business name reservations are processed online through eCitizen BRS portal. For company registration follow-ups, the Registrar of Companies at Sheria House (CBD) is 20 minutes away.",
      "police-clearance":
        "DCI Headquarters on Kiambu Road is the closest fingerprinting centre, accessible from Westlands via Limuru Road in about 15 minutes.",
      "passport-application":
        "Passport biometrics require a visit to Nyayo House in the CBD. From Westlands, allow 25-30 minutes by car or matatu via Uhuru Highway.",
      "smart-dl-renewal":
        "NTSA services are available at Hill Park Building, Upper Hill. Smart DL applications are processed online and the card is delivered via courier or collected at NTSA offices.",
      "nssf-registration":
        "The NSSF Nairobi branch on Bishop Road (Upper Hill) is about 15 minutes from Westlands and handles employer and individual registration queries.",
    },
  },

  // ─────────────────────────────────────────────
  // 3. KASARANI
  // ─────────────────────────────────────────────
  kasarani: {
    deep_dive:
      "Kasarani is one of Nairobi's most densely populated sub-counties, stretching from Roysambu and Kahawa West to Mwiki " +
      "and Githurai. The area is home to Kenyatta University, thousands of students, and a growing middle-class population in " +
      "estates like Kasarani Sportview, Garden Estate, and TRM (Thika Road Mall) corridor. Our Kasarani cyber cafe serves " +
      "residents who face heavy traffic along Thika Superhighway when trying to reach CBD government offices. HELB loan " +
      "applications are extremely popular here due to the high student population from Kenyatta University and USIU-Africa. " +
      "Police clearance certificates are in constant demand from young professionals seeking employment. The Kasarani Stadium " +
      "area occasionally hosts government outreach events including mobile Huduma services. The nearest permanent Huduma Centre " +
      "is at GPO in the CBD, reachable via Thika Road in about 30-40 minutes depending on traffic. We help clients avoid the " +
      "commute by handling all online steps from our location, so they only travel when biometrics or physical collection is required.",

    local_tips: [
      "The nearest Huduma Centre is at GPO Teleposta Towers in the CBD — take a matatu along Thika Superhighway from Kasarani or Roysambu stage, about 30-40 minutes in traffic.",
      "Kenyatta University students can access HELB loan services online through our cafe without travelling to HELB offices at Anniversary Towers in the CBD.",
      "DCI fingerprinting is done at DCI Headquarters, Kiambu Road — from Kasarani, use the Northern Bypass to reach Kiambu Road in about 20 minutes.",
      "Thika Superhighway traffic peaks between 6:30-9 AM and 5-8 PM. Schedule any CBD visits for mid-morning or early afternoon.",
      "For birth certificate collection, the Civil Registration office in Kasarani DC's office on Kasarani-Mwiki Road handles local registrations.",
    ],

    popular_services: [
      "helb-loan-application",
      "police-clearance",
      "kra-pin-registration",
    ],

    faqs: [
      {
        question:
          "Can Kenyatta University students apply for HELB loans at your Kasarani cyber cafe?",
        answer:
          "Yes. We assist KU students with first-time HELB loan applications and subsequent loan requests through the HELB portal. You will need your KU admission letter, national ID, and parent/guardian details. Our Kasarani location saves you the trip to HELB offices at Anniversary Towers in the CBD.",
      },
      {
        question:
          "Where is the nearest DCI office for fingerprinting from Kasarani?",
        answer:
          "The DCI National Headquarters on Kiambu Road is accessible from Kasarani via the Northern Bypass, approximately 20 minutes drive. Book your fingerprinting appointment through the eCitizen portal before visiting.",
      },
      {
        question:
          "Is there a Huduma Centre near Kasarani or Roysambu?",
        answer:
          "There is no permanent Huduma Centre in Kasarani. The nearest is the GPO Huduma Centre in the CBD. However, mobile Huduma services occasionally visit the Kasarani area — check the Huduma Kenya social media pages for schedules. Our cyber cafe handles all online applications to minimise your trips.",
      },
    ],

    service_notes: {
      "helb-loan-application":
        "Very popular among Kenyatta University, USIU, and TUK students. Bring your admission letter, ID copy, and parent/guardian KRA PIN for the application. HELB offices are at Anniversary Towers, University Way, CBD.",
      "police-clearance":
        "DCI Headquarters on Kiambu Road is reachable via the Northern Bypass in 20 minutes. Book your fingerprinting slot online before visiting to avoid being turned away.",
      "kra-pin-registration":
        "KRA PIN is required for all students seeking HELB loans and graduates entering employment. We process registration immediately — you receive the PIN certificate via email.",
      "birth-registration":
        "The Kasarani Deputy County Commissioner's office on Kasarani-Mwiki Road processes local birth registrations. Late registration requires a statutory declaration.",
      "passport-application":
        "Passport biometrics are at Nyayo House in the CBD. From Kasarani, the trip takes 30-45 minutes via Thika Superhighway. Book appointments during off-peak hours.",
      "smart-dl-renewal":
        "NTSA services are processed online. Interim DLs can be collected at the Huduma Centre (GPO) or NTSA Hill Park offices. Allow extra time for Thika Road traffic.",
    },
  },

  // ─────────────────────────────────────────────
  // 4. EMBAKASI
  // ─────────────────────────────────────────────
  embakasi: {
    deep_dive:
      "Embakasi is Nairobi's largest sub-county by population, encompassing estates such as Pipeline, Utawala, Tassia, " +
      "Embakasi Village, Mihango, and Donholm. Its proximity to Jomo Kenyatta International Airport (JKIA) means a " +
      "significant number of residents work in aviation, logistics, and export industries, driving high demand for passport " +
      "applications and police clearance certificates needed for international employment. The area is connected to the CBD " +
      "via Mombasa Road and Outering Road, both of which experience severe congestion during rush hours. Our Embakasi cyber " +
      "cafe provides a critical service by allowing residents to complete eCitizen applications locally, avoiding the 45-minute " +
      "to one-hour commute to the CBD. The NTSA operates a satellite office near the Embakasi area, and the Embakasi Law Courts " +
      "complex on North Airport Road handles affidavits and statutory declarations. The young, working-class population in " +
      "Pipeline and Tassia frequently requires KRA PIN registration for new employment and NSSF registration for first-time " +
      "formal workers.",

    local_tips: [
      "The nearest Huduma Centre is at GPO Teleposta Towers, CBD — reach it via Mombasa Road, about 40-50 minutes in morning traffic. Off-peak, the trip is 25 minutes.",
      "For DCI fingerprinting, the DCI Headquarters on Kiambu Road is far from Embakasi. The DCI Embakasi regional office handles some services — confirm availability before visiting.",
      "Outering Road is heavily congested during rush hours; use the Southern Bypass if heading towards Upper Hill or Westlands for government offices.",
      "Affidavits and statutory declarations (needed for late birth registration or name changes) can be done at Embakasi Law Courts on North Airport Road.",
      "JKIA workers needing urgent police clearance or passport renewal should start applications online with us to save time, then visit CBD offices during off-peak hours.",
    ],

    popular_services: [
      "passport-application",
      "police-clearance",
      "kra-pin-registration",
    ],

    faqs: [
      {
        question:
          "I work at JKIA and need an urgent passport renewal — can you help from Embakasi?",
        answer:
          "Yes. We process the full eCitizen passport application online at our Embakasi location. You will then need to visit Nyayo House for biometrics, but starting the application with us saves considerable time. We recommend scheduling your Nyayo House visit for mid-week mornings.",
      },
      {
        question:
          "Is there an NTSA office near Embakasi for driving licence collection?",
        answer:
          "The NTSA has a presence in the Embakasi area near North Airport Road. For smart driving licence collection, the NTSA head office at Hill Park Building (Upper Hill) and the Huduma Centre (GPO) are the primary collection points.",
      },
      {
        question:
          "Where can I get a statutory declaration for late birth registration near Embakasi?",
        answer:
          "Statutory declarations can be sworn at the Embakasi Law Courts on North Airport Road. You will need the declaration for late birth registration applications processed through eCitizen.",
      },
    ],

    service_notes: {
      "passport-application":
        "High demand among JKIA and logistics workers. Biometrics are at Nyayo House, CBD — a 25-40 minute drive via Mombasa Road depending on traffic.",
      "police-clearance":
        "The DCI Embakasi office may handle fingerprinting — confirm availability. Otherwise, DCI Headquarters on Kiambu Road is the main centre. Certificate collection is at DCI HQ.",
      "kra-pin-registration":
        "Essential for Pipeline and Tassia residents entering formal employment. We process registration instantly and you receive the certificate via email.",
      "nssf-registration":
        "First-time formal workers in Embakasi's industrial area frequently need NSSF registration. The NSSF branch on Bishop Road (Upper Hill) handles in-person queries.",
      "birth-registration":
        "The Embakasi DC's office processes local birth registrations. Late registration requires a statutory declaration from the Embakasi Law Courts on North Airport Road.",
      "logbook-transfer":
        "The Embakasi area has many used-car dealers. Logbook transfers are processed via eCitizen NTSA portal; physical verification may be required at NTSA offices.",
    },
  },

  // ─────────────────────────────────────────────
  // 5. KIBRA
  // ─────────────────────────────────────────────
  kibra: {
    deep_dive:
      "Kibra sub-county includes Kibera — one of Africa's largest informal settlements — alongside middle-income estates " +
      "such as Woodley, Jamhuri, and parts of Ngong Road. The area has a large youthful population, many of whom are first-time " +
      "applicants for national IDs, KRA PINs, and police clearance certificates as they enter the job market. Our Kibra cyber " +
      "cafe bridges the digital divide for residents who may lack reliable internet access or personal computers at home. " +
      "Birth registration is a critical service here, as many Kibera residents need to formalise civil records before applying " +
      "for other government services. The nearest Huduma Centre is at GPO in the CBD, about 20 minutes via Mbagathi Road or " +
      "Langata Road. The Kibra DO's office on Kibera Drive handles local administrative matters including birth registration " +
      "referrals. We assist with the full eCitizen process, from filling out forms to uploading scanned documents, ensuring " +
      "that residents who are less familiar with online portals can access government services efficiently and affordably.",

    local_tips: [
      "The Huduma Centre at GPO Teleposta Towers is the nearest full-service centre — take a matatu via Mbagathi Road or Langata Road, about 20 minutes off-peak.",
      "The Kibra Deputy County Commissioner's office on Kibera Drive assists with local administrative queries and birth registration referrals.",
      "DCI fingerprinting is at DCI Headquarters, Kiambu Road, or Sheria House in the CBD. From Kibra, the CBD is closer — about 20 minutes via Ngong Road.",
      "For ID replacement applications, start the process online with us, then visit the Huduma Centre for biometrics. Mid-week visits have shorter queues.",
    ],

    popular_services: [
      "birth-registration",
      "police-clearance",
      "kra-pin-registration",
    ],

    faqs: [
      {
        question:
          "Can I register a birth that happened more than 6 months ago from your Kibra cyber cafe?",
        answer:
          "Yes, we process late birth registration applications via eCitizen. Late registration (beyond 6 months) requires a statutory declaration, which can be sworn at the Kibera Law Courts or the CBD courts. We guide you through the entire process.",
      },
      {
        question:
          "Do I need a computer at home to track my eCitizen application status?",
        answer:
          "No. You can visit our Kibra cyber cafe anytime to check the status of your application. You will also receive SMS and email notifications at each stage. We are here to help if you need to respond to queries or upload additional documents.",
      },
      {
        question:
          "How much does it cost to get a police clearance certificate through your Kibra location?",
        answer:
          "The government fee for a police clearance (Good Conduct) certificate is KES 1,050 paid via eCitizen. Our cyber cafe charges a small service fee for filling the application and uploading your documents. The total is significantly less than using an agent in the CBD.",
      },
    ],

    service_notes: {
      "birth-registration":
        "High demand in Kibra. For timely registration (within 6 months), the process is straightforward online. Late registration needs a statutory declaration — the Kibera Law Courts or CBD courts can provide this.",
      "police-clearance":
        "Popular among youth seeking employment. DCI fingerprinting can be done at Sheria House (CBD), about 20 minutes from Kibra via Ngong Road.",
      "kra-pin-registration":
        "Required for all formal employment. We process KRA PIN applications for first-time job seekers — you receive the PIN certificate via email within minutes.",
      "passport-application":
        "Passport applications are processed online and biometrics taken at Nyayo House, CBD. From Kibra, the trip is approximately 20 minutes by matatu.",
      "change-ecitizen-phone":
        "Many residents need to update their eCitizen phone number after changing SIM cards. We handle the process including the OTP verification on the new number.",
      "helb-loan-application":
        "Students from Kibra attending universities across Nairobi can apply for HELB loans at our location. Bring your admission letter, ID, and parent/guardian details.",
    },
  },

  // ─────────────────────────────────────────────
  // 6. MOMBASA ISLAND
  // ─────────────────────────────────────────────
  "mombasa-island": {
    deep_dive:
      "Mombasa Island is the historic and commercial centre of Kenya's coast, home to the Mombasa Huduma Centre on Moi " +
      "Avenue, Fort Jesus, and the Old Town. The island is the administrative hub of Mombasa County and hosts the regional " +
      "offices of most government agencies including KRA, Immigration, and the DCI Coast Regional Office. Our cyber cafe on " +
      "Mombasa Island serves the dense population of the Old Town, Tudor, Makupa, and Ganjoni areas, as well as workers commuting " +
      "from the mainland via the Likoni Ferry, Makupa Causeway, and Nyali Bridge. The port economy drives demand for KRA PIN " +
      "registration and business name searches among clearing and forwarding agents. Passport applications are popular among " +
      "residents seeking overseas employment, particularly in the Middle East. The Mombasa Huduma Centre on Moi Avenue is " +
      "within walking distance and handles passport biometrics, NTSA services, and ID applications, making Mombasa Island " +
      "one of the most convenient locations for completing government services end-to-end.",

    local_tips: [
      "The Mombasa Huduma Centre on Moi Avenue is within walking distance and processes passport biometrics, ID applications, and NTSA services. Opens at 8 AM.",
      "The DCI Mombasa Regional Office near the Mombasa Central Police Station handles fingerprinting for police clearance — book your slot via eCitizen first.",
      "KRA Mombasa office is on Archbishop Makarios Road, close to the Old Town, for iTax and PIN-related queries.",
      "Likoni Ferry crossings cause significant delays during peak hours (7-9 AM, 5-7 PM). Mainland residents should plan visits accordingly.",
      "Immigration offices for passport collection are at the Mombasa Immigration Office on Mama Ngina Drive.",
    ],

    popular_services: [
      "passport-application",
      "kra-pin-registration",
      "business-name-search",
    ],

    faqs: [
      {
        question:
          "Can I complete passport biometrics at the Mombasa Huduma Centre instead of travelling to Nairobi?",
        answer:
          "Yes. The Mombasa Huduma Centre on Moi Avenue conducts passport biometrics and interviews. You do not need to travel to Nairobi. Apply online through eCitizen at our cyber cafe, then visit the Huduma Centre for your biometrics appointment.",
      },
      {
        question:
          "Where is the KRA office in Mombasa for resolving iTax issues?",
        answer:
          "The KRA Mombasa office is on Archbishop Makarios Road, near the Old Town. It handles iTax queries, KRA PIN issues, and tax compliance matters for coastal residents and businesses.",
      },
      {
        question:
          "I live on the mainland (Likoni side). Should I use your Mombasa Island location or wait for a Likoni branch?",
        answer:
          "Our Mombasa Island location is currently the most convenient option for Likoni residents. We recommend crossing via the Likoni Ferry during off-peak hours (mid-morning or early afternoon) to avoid the rush. All online steps can be completed at our cafe in one visit.",
      },
    ],

    service_notes: {
      "passport-application":
        "The Mombasa Huduma Centre on Moi Avenue handles passport biometrics — no need to travel to Nairobi. Passport collection is at the Mombasa Immigration Office on Mama Ngina Drive.",
      "kra-pin-registration":
        "The KRA Mombasa office on Archbishop Makarios Road is nearby for resolving iTax and PIN issues. Registration is processed online instantly.",
      "business-name-search":
        "Popular among clearing and forwarding agents in the port area. Business name reservations are processed online via the BRS portal. Registrar of Companies matters are referred to the Mombasa office or Nairobi head office.",
      "police-clearance":
        "DCI Mombasa Regional Office near Mombasa Central Police Station handles fingerprinting. Certificate collection is at the same office or DCI HQ in Nairobi.",
      "logbook-transfer":
        "NTSA Mombasa office at the Huduma Centre processes logbook transfers. Vehicle inspection may be required at the NTSA yard.",
      "smart-dl-renewal":
        "Smart DL applications are processed online. Collection is at the Mombasa Huduma Centre or NTSA office. Allow 2-3 weeks for card production.",
    },
  },

  // ─────────────────────────────────────────────
  // 7. NYALI
  // ─────────────────────────────────────────────
  nyali: {
    deep_dive:
      "Nyali is Mombasa's affluent residential and tourism corridor, stretching from the Nyali Bridge to Bamburi and " +
      "encompassing upmarket estates, beach hotels, and the City Mall and Nyali Centre shopping complexes. The area is home " +
      "to business owners, hotel industry professionals, and expatriates who frequently require KRA PIN services, business " +
      "registrations, and police clearance certificates for travel. Our Nyali cyber cafe serves residents of Nyali, Bamburi, " +
      "Mkomani, and Shanzu who prefer to avoid crossing the Nyali Bridge into the congested Mombasa Island for government " +
      "services. The bridge experiences heavy traffic during morning and evening rush hours, making a local eCitizen service " +
      "point invaluable. The tourism industry drives demand for NSSF and NHIF registration for hotel staff, and many Nyali " +
      "residents are dual nationals or frequent travellers who need passport and visa-related documentation. For physical " +
      "government office visits, the Mombasa Huduma Centre on Moi Avenue is approximately 15-25 minutes from Nyali depending on bridge traffic.",

    local_tips: [
      "The Mombasa Huduma Centre on Moi Avenue is the nearest full-service centre — cross the Nyali Bridge and drive along Moi Avenue, about 15-25 minutes depending on traffic.",
      "Avoid crossing the Nyali Bridge between 7-9 AM and 5-7 PM when traffic backs up significantly from both directions.",
      "The DCI Mombasa office near Mombasa Central Police Station handles fingerprinting for police clearance — accessible from Nyali via the Nyali Bridge.",
      "Hotel and tourism workers in Bamburi and Shanzu can process NSSF and KRA registrations at our cafe without travelling to the island.",
    ],

    popular_services: [
      "police-clearance",
      "kra-pin-registration",
      "nssf-registration",
    ],

    faqs: [
      {
        question:
          "Is there a government office in Nyali or do I have to go to Mombasa Island?",
        answer:
          "Most government services require visiting offices on Mombasa Island, including the Huduma Centre and DCI office. Our Nyali cyber cafe completes all online steps so you only need to cross the Nyali Bridge for biometrics or document collection.",
      },
      {
        question:
          "I'm an expatriate in Nyali — can I register for a KRA PIN through your service?",
        answer:
          "Yes. Foreign nationals with a valid passport or alien card can register for a KRA PIN. We process the application via the eCitizen portal and you receive your PIN certificate by email. The KRA Mombasa office on Archbishop Makarios Road handles any follow-up queries.",
      },
      {
        question:
          "Can hotel staff from Bamburi and Shanzu use your Nyali location for NSSF registration?",
        answer:
          "Absolutely. We register employees for NSSF through the eCitizen portal. Employers need their business registration certificate and KRA PIN. Individual employees need their national ID. No trip to the island is required for the online registration step.",
      },
    ],

    service_notes: {
      "police-clearance":
        "DCI fingerprinting is at the DCI Mombasa office on the island. From Nyali, allow 20-30 minutes via the Nyali Bridge. Book your appointment online first.",
      "kra-pin-registration":
        "KRA Mombasa office on Archbishop Makarios Road handles in-person queries. Online registration through our cafe is instant — no need to visit the office.",
      "nssf-registration":
        "Hotel and tourism industry workers in the Nyali-Bamburi-Shanzu corridor frequently need NSSF registration. We handle employer and individual registrations online.",
      "passport-application":
        "Passport biometrics are at the Mombasa Huduma Centre on Moi Avenue. From Nyali, plan your visit during off-peak hours to avoid Nyali Bridge traffic.",
      "business-name-search":
        "Tourism and hospitality businesses in Nyali can search and reserve business names online. Company registration follow-ups are at the Mombasa Registrar office.",
      "smart-dl-renewal":
        "Smart DL applications are processed online. Collection is at the Mombasa Huduma Centre on Moi Avenue. The NTSA Mombasa office also handles queries.",
    },
  },

  // ─────────────────────────────────────────────
  // 8. KISUMU CITY
  // ─────────────────────────────────────────────
  "kisumu-city": {
    deep_dive:
      "Kisumu is the principal city of western Kenya, situated on the shores of Lake Victoria and serving as the economic " +
      "hub for Kisumu, Siaya, Homa Bay, and Migori counties. The Kisumu Huduma Centre on Oginga Odinga Street processes a " +
      "high volume of government services for the entire lake region. Our cyber cafe in Kisumu City serves residents of Milimani, " +
      "Kondele, Nyalenda, and Obunga, as well as traders from Kibuye Market and the Kisumu port area. The city is experiencing " +
      "rapid growth with the revitalised Kisumu port and the Kisumu-Kakamega highway improvements, bringing new business " +
      "registrations and KRA compliance needs. Police clearance certificates are in high demand among the large number of " +
      "young people seeking employment in Nairobi and abroad. The DCI Kisumu Regional Office on Ogada Street handles " +
      "fingerprinting for the region. Passport applications are increasingly common as more western Kenya residents seek " +
      "overseas opportunities. Our location on the main commercial strip makes it accessible by matatu from all Kisumu estates.",

    local_tips: [
      "The Kisumu Huduma Centre on Oginga Odinga Street is within walking distance of the main commercial area and handles passport biometrics, NTSA, and ID services.",
      "DCI Kisumu Regional Office on Ogada Street handles fingerprinting for police clearance — book your appointment via eCitizen before visiting.",
      "KRA Kisumu office is on Oginga Odinga Street, near the Huduma Centre, for tax compliance queries.",
      "Kibuye Market traders needing business registrations and KRA PINs can visit our city centre location without closing their stalls for the whole day.",
      "Matatu connections from Kondele, Nyalenda, and Obunga to the city centre are frequent — our cafe is accessible from all routes.",
    ],

    popular_services: [
      "police-clearance",
      "kra-pin-registration",
      "passport-application",
    ],

    faqs: [
      {
        question:
          "Can I complete passport biometrics at the Kisumu Huduma Centre?",
        answer:
          "Yes. The Kisumu Huduma Centre on Oginga Odinga Street conducts passport biometrics and interviews. You do not need to travel to Nairobi. Apply online at our cyber cafe, then walk to the Huduma Centre for your appointment.",
      },
      {
        question:
          "Where do I collect my DCI certificate in Kisumu?",
        answer:
          "DCI certificates are typically collected from the DCI Kisumu Regional Office on Ogada Street. You will receive an SMS when your certificate is ready, usually within 7-14 working days after fingerprinting.",
      },
      {
        question:
          "Do you assist traders from Kibuye Market with business registration?",
        answer:
          "Yes. We help Kibuye and Kisumu traders with business name searches, reservations, and full company registration through the eCitizen BRS portal. We also handle KRA PIN registration for new businesses.",
      },
    ],

    service_notes: {
      "passport-application":
        "The Kisumu Huduma Centre on Oginga Odinga Street handles biometrics — no need to travel to Nairobi. Passport collection is at the Kisumu Immigration Office.",
      "police-clearance":
        "DCI Kisumu Regional Office on Ogada Street is the fingerprinting centre for the lake region. Book your appointment via eCitizen.",
      "kra-pin-registration":
        "KRA Kisumu office on Oginga Odinga Street handles in-person queries. Online registration is instant through our cafe.",
      "business-name-search":
        "Popular among Kibuye Market traders and Lake Victoria fishing cooperatives. Business name reservations are processed online through the BRS portal.",
      "birth-registration":
        "The Kisumu County Civil Registration office handles birth registrations. Late registrations require a statutory declaration from the Kisumu Law Courts.",
      "logbook-transfer":
        "NTSA Kisumu office at the Huduma Centre processes logbook transfers and driving licence services for the western Kenya region.",
    },
  },

  // ─────────────────────────────────────────────
  // 9. NAKURU TOWN
  // ─────────────────────────────────────────────
  "nakuru-town": {
    deep_dive:
      "Nakuru is Kenya's fourth-largest city and the administrative capital of Nakuru County, strategically located along " +
      "the Nairobi-Eldoret highway (A104). The Nakuru Huduma Centre on George Morara Avenue is one of the busiest outside " +
      "Nairobi, serving not only Nakuru residents but also people from Naivasha, Gilgil, Njoro, and Molo. Our cyber cafe " +
      "in Nakuru Town serves the commercial district around Kenyatta Avenue, the residential estates of Milimani, Section 58, " +
      "Lanet, and Free Area. Nakuru's agricultural economy — centred on pyrethrum, dairy, and flower farming — drives demand " +
      "for business registrations and KRA compliance. The town is also a major education hub with Egerton University (Njoro " +
      "campus) and several colleges, generating high demand for HELB loan applications. The NTSA Nakuru office handles " +
      "driving licence and logbook services for the Rift Valley region. Our location near the town centre allows clients " +
      "to process online applications and walk to the Huduma Centre for biometrics within minutes.",

    local_tips: [
      "The Nakuru Huduma Centre on George Morara Avenue is centrally located and handles passport biometrics, NTSA services, and ID applications. Arrive before 8:30 AM for shorter queues.",
      "DCI Nakuru office at the Nakuru Central Police Station handles fingerprinting for police clearance. Book your slot online first.",
      "KRA Nakuru office is near the town centre on Kenyatta Avenue for tax compliance and iTax queries.",
      "Egerton University students from the Njoro campus can take a matatu to Nakuru Town (30 minutes) for HELB loan applications at our cafe.",
      "Parking in Nakuru CBD is limited — use the municipal parking lots off Kenyatta Avenue or take a boda-boda from your estate.",
    ],

    popular_services: [
      "kra-pin-registration",
      "logbook-transfer",
      "helb-loan-application",
    ],

    faqs: [
      {
        question:
          "Does the Nakuru Huduma Centre process passport biometrics?",
        answer:
          "Yes. The Nakuru Huduma Centre on George Morara Avenue handles passport biometrics and interviews, so Nakuru residents do not need to travel to Nairobi. Apply online at our cafe and schedule your biometrics appointment at the Huduma Centre.",
      },
      {
        question:
          "Can Egerton University students apply for HELB loans at your Nakuru location?",
        answer:
          "Yes. Egerton students can visit our Nakuru Town cyber cafe to apply for HELB loans. Bring your admission letter, national ID, and parent/guardian details. It saves a trip to HELB offices in Nairobi.",
      },
      {
        question:
          "Where is the NTSA office in Nakuru for logbook transfers and driving licences?",
        answer:
          "The NTSA Nakuru office is at the Nakuru Huduma Centre on George Morara Avenue. They process logbook transfers, smart DL applications, and vehicle-related services for the Rift Valley region.",
      },
    ],

    service_notes: {
      "kra-pin-registration":
        "High demand from Nakuru's agricultural and small business community. KRA Nakuru office on Kenyatta Avenue handles in-person queries. Online registration is instant.",
      "logbook-transfer":
        "The NTSA Nakuru office at the Huduma Centre processes logbook transfers. Nakuru has a busy used-car market, so demand for this service is high.",
      "helb-loan-application":
        "Popular among Egerton University and Kabarak University students. Bring your admission letter and ID. HELB offices are in Nairobi, but the application is fully online.",
      "passport-application":
        "Passport biometrics are available at the Nakuru Huduma Centre — no Nairobi trip required. Collection is at the same centre or Nakuru Immigration office.",
      "police-clearance":
        "DCI fingerprinting is at the Nakuru Central Police Station. Certificate collection is typically at the same office. Allow 7-14 working days.",
      "business-name-search":
        "Popular among Nakuru's agricultural traders and flower farm operators. Business name searches and reservations are processed online through the BRS portal.",
    },
  },

  // ─────────────────────────────────────────────
  // 10. ELDORET TOWN
  // ─────────────────────────────────────────────
  "eldoret-town": {
    deep_dive:
      "Eldoret is the fifth-largest city in Kenya and the commercial capital of the North Rift, serving as the gateway " +
      "to Uganda via the A104 highway. The Eldoret Huduma Centre on Uganda Road is a vital service point for residents " +
      "of Uasin Gishu, Nandi, Elgeyo-Marakwet, and Trans Nzoia counties. Our cyber cafe in Eldoret Town caters to the " +
      "city's diverse population, including students from Moi University (main campus in nearby Kesses), athletes training " +
      "at the Kipchoge Keino Stadium and Iten high-altitude camps, and farmers from the surrounding grain-basket region. " +
      "Police clearance certificates are in high demand from athletes and professionals seeking international opportunities. " +
      "The agricultural economy — maize, wheat, and dairy — drives strong demand for KRA PIN registrations and business " +
      "name searches. The NTSA Eldoret office handles driving licence and logbook services for the North Rift. Eldoret's " +
      "growing middle class in estates like Elgon View, Langas, and Pioneer also generates steady demand for passport " +
      "applications and birth registrations.",

    local_tips: [
      "The Eldoret Huduma Centre on Uganda Road processes passport biometrics, NTSA services, and ID applications. Arrive early as it serves the entire North Rift region.",
      "DCI Eldoret office at the Eldoret Central Police Station handles fingerprinting for police clearance. Book your appointment online.",
      "KRA Eldoret office is on Uganda Road, near the Huduma Centre, for tax compliance queries.",
      "Moi University students can take a matatu from Kesses campus to Eldoret Town (20 minutes) for HELB and other government service applications.",
      "Athletes needing urgent police clearance for international competitions should start applications early — DCI processing takes 7-14 working days.",
    ],

    popular_services: [
      "police-clearance",
      "kra-pin-registration",
      "passport-application",
    ],

    faqs: [
      {
        question:
          "Can athletes training in Eldoret and Iten get police clearance certificates locally?",
        answer:
          "Yes. Police clearance applications are made online through eCitizen at our Eldoret cafe. Fingerprinting is done at the DCI Eldoret office at the Central Police Station. Athletes from Iten can visit Eldoret (about 40 minutes) for this service rather than travelling to Nairobi.",
      },
      {
        question:
          "Does the Eldoret Huduma Centre handle passport biometrics?",
        answer:
          "Yes. The Eldoret Huduma Centre on Uganda Road processes passport biometrics and interviews. North Rift residents do not need to travel to Nairobi. Apply online at our cafe and schedule your appointment at the Huduma Centre.",
      },
      {
        question:
          "Can Moi University students apply for HELB loans at your Eldoret location?",
        answer:
          "Yes. Moi University students can visit our Eldoret Town location to apply for first-time or subsequent HELB loans. Bring your admission letter, national ID, and parent/guardian KRA PIN.",
      },
    ],

    service_notes: {
      "police-clearance":
        "High demand among athletes and professionals. DCI Eldoret office at the Central Police Station handles fingerprinting. Certificate collection is at the same office.",
      "kra-pin-registration":
        "KRA Eldoret office on Uganda Road handles in-person queries. Agricultural traders and businesses can register instantly online at our cafe.",
      "passport-application":
        "Biometrics available at the Eldoret Huduma Centre. Passport collection is at the Eldoret Immigration office. No need to travel to Nairobi.",
      "helb-loan-application":
        "Popular among Moi University and University of Eldoret students. The application is fully online — no trip to Nairobi HELB offices required.",
      "business-name-search":
        "Agricultural cooperatives and grain traders frequently need business name searches. Processed online through the BRS portal at our cafe.",
      "smart-dl-renewal":
        "NTSA Eldoret office at the Huduma Centre handles driving licence applications and collections for the North Rift region.",
      "logbook-transfer":
        "NTSA Eldoret processes logbook transfers. The Eldoret vehicle inspection centre handles physical inspections when required.",
    },
  },

  // ─────────────────────────────────────────────
  // 11. THIKA TOWN
  // ─────────────────────────────────────────────
  "thika-town": {
    deep_dive:
      "Thika Town is an industrial and commercial hub in Kiambu County, located approximately 45 kilometres northeast of " +
      "Nairobi along the Thika Superhighway. The town is known for its pineapple and coffee plantations, the Blue Post Hotel " +
      "at the confluence of the Thika and Chania rivers, and a growing industrial base including Del Monte, BIDCO, and numerous " +
      "SMEs. Our Thika Town cyber cafe serves the surrounding areas of Makongeni, Landless, Ngoingwa, and Juja, as well as " +
      "students from Jomo Kenyatta University of Agriculture and Technology (JKUAT). The Thika Huduma Centre on Commercial " +
      "Street handles a range of government services and serves as the primary service point for Kiambu County's eastern " +
      "corridor. Logbook transfers are popular due to Thika's active used-vehicle market, while business registrations " +
      "serve the industrial sector. HELB applications are driven by the large JKUAT student population. The town's " +
      "connectivity to Nairobi via the superhighway means some residents still travel to the CBD for services, but our " +
      "cafe helps them complete everything online locally.",

    local_tips: [
      "The Thika Huduma Centre on Commercial Street handles passport biometrics, NTSA services, and ID applications for Kiambu County's eastern region.",
      "DCI Thika office at the Thika Police Station handles fingerprinting for police clearance. Book your appointment online.",
      "JKUAT students from the Juja campus can take a matatu to Thika Town (15 minutes) for HELB loan applications and other government services.",
      "Thika Superhighway traffic peaks between 6-9 AM and 5-8 PM. If you must travel to Nairobi, leave before 6 AM or after 9:30 AM.",
      "The KRA office in Thika is on Kenyatta Highway for local tax compliance queries.",
    ],

    popular_services: [
      "logbook-transfer",
      "kra-pin-registration",
      "helb-loan-application",
    ],

    faqs: [
      {
        question:
          "Is there a Huduma Centre in Thika Town?",
        answer:
          "Yes. The Thika Huduma Centre on Commercial Street is a full-service centre that processes passport biometrics, NTSA driving licence services, ID applications, and other government services. It serves the eastern Kiambu County corridor.",
      },
      {
        question:
          "Can JKUAT students apply for HELB loans at your Thika location?",
        answer:
          "Yes. JKUAT students from the Juja campus can visit our Thika Town cyber cafe to apply for HELB loans. The town is about 15 minutes from Juja by matatu. Bring your admission letter, national ID, and parent/guardian details.",
      },
      {
        question:
          "Where do I do vehicle inspection for logbook transfers in Thika?",
        answer:
          "The NTSA Thika office handles logbook transfers and may require vehicle inspection at the Thika vehicle inspection centre. Start the application online at our cafe, then complete the physical steps at the NTSA office.",
      },
    ],

    service_notes: {
      "logbook-transfer":
        "Thika has an active used-vehicle market. NTSA logbook transfers are processed online and physical inspection is at the Thika NTSA office. We assist with the full online process.",
      "kra-pin-registration":
        "Thika's industrial and agricultural businesses require KRA compliance. The KRA Thika office on Kenyatta Highway handles in-person queries.",
      "helb-loan-application":
        "High demand from JKUAT and Mount Kenya University (Thika campus) students. Applications are processed online — no Nairobi trip needed.",
      "smart-dl-renewal":
        "NTSA Thika office at the Huduma Centre handles driving licence applications and collections. Smart DL cards are produced centrally and delivered to local offices.",
      "police-clearance":
        "DCI Thika office at the Thika Police Station handles fingerprinting. Certificate collection is at the same office, typically within 7-14 working days.",
      "business-name-search":
        "Popular among Thika's SME and manufacturing sector. Business names are searched and reserved online through the BRS portal.",
    },
  },

  // ─────────────────────────────────────────────
  // 12. MALINDI TOWN
  // ─────────────────────────────────────────────
  "malindi-town": {
    deep_dive:
      "Malindi is a coastal town in Kilifi County, approximately 120 kilometres northeast of Mombasa, known for its tourism " +
      "industry, Italian expatriate community, and fishing economy. The town centre along Lamu Road and Jamia Mosque Road " +
      "hosts the Malindi Huduma Centre, which serves Malindi, Watamu, Magarini, and surrounding areas. Our Malindi cyber " +
      "cafe caters to hotel and resort workers, marine park operators, boat operators, and the growing local business " +
      "community. Passport applications are particularly popular among residents seeking overseas employment in the Middle " +
      "East and Europe. The tourism sector generates demand for NSSF registration and KRA compliance for hospitality " +
      "businesses. Police clearance certificates are needed by workers joining international cruise lines and resort chains. " +
      "Malindi's relative distance from Mombasa makes local eCitizen services especially valuable — residents save a four-hour " +
      "round trip to Mombasa for services that can be initiated online. The Malindi DCI office handles fingerprinting for " +
      "the region, and the Malindi Immigration office processes passport collection.",

    local_tips: [
      "The Malindi Huduma Centre on Lamu Road handles passport biometrics, NTSA services, and ID applications. It serves the wider Kilifi County north corridor.",
      "DCI Malindi office at the Malindi Police Station handles fingerprinting for police clearance. Book your appointment via eCitizen.",
      "The Malindi Immigration office on Uhuru Road handles passport collection — you do not need to travel to Mombasa.",
      "For KRA and business registration queries, the nearest KRA office is in Mombasa. Handle everything online at our cafe to avoid the 2-hour drive.",
      "Watamu residents can reach our Malindi cafe in about 20 minutes by matatu via the Malindi-Watamu road.",
    ],

    popular_services: [
      "passport-application",
      "police-clearance",
      "nssf-registration",
    ],

    faqs: [
      {
        question:
          "Can I get a passport without travelling to Mombasa or Nairobi from Malindi?",
        answer:
          "Yes. The Malindi Huduma Centre processes passport biometrics. Apply online at our cafe, complete biometrics at the Huduma Centre, and collect your passport from the Malindi Immigration Office on Uhuru Road.",
      },
      {
        question:
          "Do you help hotel workers in Watamu with police clearance certificates?",
        answer:
          "Yes. Watamu is about 20 minutes from our Malindi location. We process the police clearance application online, and fingerprinting is done at the DCI Malindi office at the Malindi Police Station.",
      },
      {
        question:
          "Is there a KRA office in Malindi?",
        answer:
          "There is no full KRA office in Malindi. The nearest KRA office is in Mombasa, about 120 km away. Our cyber cafe handles KRA PIN registration and basic iTax queries online, saving you the trip to Mombasa.",
      },
    ],

    service_notes: {
      "passport-application":
        "Biometrics at the Malindi Huduma Centre. Collection at the Malindi Immigration Office on Uhuru Road. No Mombasa or Nairobi trip needed.",
      "police-clearance":
        "DCI Malindi office at the Malindi Police Station handles fingerprinting. Popular among tourism and cruise line workers seeking overseas employment.",
      "nssf-registration":
        "Hotels and resorts in Malindi and Watamu need NSSF registration for staff. We handle both employer and employee registrations online.",
      "kra-pin-registration":
        "No KRA office in Malindi — all registration is done online. For complex iTax issues, the KRA Mombasa office is the nearest service point.",
      "business-name-search":
        "Tourism and marine businesses in Malindi can search and reserve business names online through the BRS portal at our cafe.",
      "smart-dl-renewal":
        "NTSA services are available at the Malindi Huduma Centre. Smart DL applications are processed online and cards collected locally.",
    },
  },

  // ─────────────────────────────────────────────
  // 13. KAKAMEGA TOWN
  // ─────────────────────────────────────────────
  "kakamega-town": {
    deep_dive:
      "Kakamega is the administrative capital of Kakamega County in western Kenya, known for the Kakamega Forest — Kenya's " +
      "only tropical rainforest — and a vibrant agricultural economy based on sugarcane farming. The Kakamega Huduma Centre " +
      "on Mumias Road serves the town and surrounding sub-counties including Mumias, Butere, and Khwisero. Our cyber cafe " +
      "in Kakamega Town caters to sugarcane farmers, small-scale traders, teachers, and students from Masinde Muliro University " +
      "of Science and Technology (MMUST). KRA PIN registration and business name searches are popular among the agricultural " +
      "trading community, while HELB loan applications are driven by the large student population. Birth registration is a " +
      "critical service as many rural Kakamega residents seek to formalise civil records. The town centre along Mumias Road " +
      "and Kakamega-Kisumu Road is the commercial hub, with matatu connections to Kisumu (about 1 hour), Mumias (30 minutes), " +
      "and Bungoma (1 hour). Our location near the town centre makes government services accessible without travelling to " +
      "Kisumu or Nairobi.",

    local_tips: [
      "The Kakamega Huduma Centre on Mumias Road handles passport biometrics, NTSA services, and ID applications for western Kenya.",
      "DCI Kakamega office at the Kakamega Central Police Station handles fingerprinting for police clearance.",
      "KRA Kakamega office is near the town centre for tax compliance and iTax queries for sugarcane farmers and traders.",
      "MMUST students can walk to our town centre location for HELB loan applications and KRA PIN registration.",
      "Matatus to Kisumu (1 hour) and Mumias (30 minutes) run frequently from the Kakamega bus stage near the town centre.",
    ],

    popular_services: [
      "kra-pin-registration",
      "helb-loan-application",
      "birth-registration",
    ],

    faqs: [
      {
        question:
          "Can sugarcane farmers in Kakamega get KRA PINs at your cyber cafe?",
        answer:
          "Yes. We register KRA PINs for individual farmers and agricultural businesses. Sugarcane out-growers contracted to Mumias Sugar and other millers need KRA PINs for payment processing. We handle the registration instantly.",
      },
      {
        question:
          "Does the Kakamega Huduma Centre process passport biometrics?",
        answer:
          "Yes. The Kakamega Huduma Centre on Mumias Road conducts passport biometrics, meaning western Kenya residents do not need to travel to Kisumu or Nairobi for this step.",
      },
      {
        question:
          "Can MMUST students apply for HELB loans at your Kakamega location?",
        answer:
          "Yes. Masinde Muliro University students can visit our Kakamega Town cafe for first-time or subsequent HELB loan applications. Bring your admission letter, ID, and parent/guardian details.",
      },
    ],

    service_notes: {
      "kra-pin-registration":
        "High demand from sugarcane farmers, traders, and agricultural cooperatives. KRA Kakamega office is nearby for in-person queries.",
      "helb-loan-application":
        "Popular among MMUST and western Kenya college students. Applications are processed online — no need to travel to HELB offices in Nairobi.",
      "birth-registration":
        "Many rural Kakamega residents need birth registration for children and late registration for adults. The Kakamega DC's office handles local civil registrations.",
      "police-clearance":
        "DCI Kakamega office at the Central Police Station handles fingerprinting. Certificate collection is at the same office.",
      "passport-application":
        "Biometrics available at the Kakamega Huduma Centre. No need to travel to Kisumu or Nairobi. Collection is at the local immigration office.",
      "business-name-search":
        "Agricultural cooperatives and sugarcane out-grower companies can register business names online through the BRS portal.",
    },
  },

  // ─────────────────────────────────────────────
  // 14. MACHAKOS TOWN
  // ─────────────────────────────────────────────
  "machakos-town": {
    deep_dive:
      "Machakos Town is the capital of Machakos County, located about 63 kilometres southeast of Nairobi along the " +
      "Nairobi-Mombasa highway (A109). Known as the first inland colonial capital of Kenya, Machakos has transformed into " +
      "a growing urban centre with the Machakos People's Park, New Machakos Stadium, and expanding residential areas in " +
      "Katoloni, Muthwani, and Mavoko. The Machakos Huduma Centre on Syokimau-Machakos Road serves the town and surrounding " +
      "sub-counties including Kangundo, Matungulu, and Yatta. Our cyber cafe in Machakos Town caters to local traders, " +
      "civil servants, and the growing commuter population that works in Nairobi but lives in Machakos. Police clearance " +
      "and KRA PIN registration are the most demanded services. The proximity to Nairobi means some residents still travel " +
      "to the CBD, but our cafe eliminates this need for the online portion of applications. The Machakos DCI office handles " +
      "local fingerprinting, and the NTSA office at the Huduma Centre processes driving licence and logbook services for " +
      "the entire county.",

    local_tips: [
      "The Machakos Huduma Centre on Syokimau-Machakos Road handles passport biometrics, NTSA, and ID services for Machakos County.",
      "DCI Machakos office at the Machakos Police Station handles fingerprinting for police clearance. Book online first.",
      "The Nairobi-Machakos commute via the A109 takes about 1-1.5 hours depending on traffic at Athi River and Mlolongo. Consider completing applications locally.",
      "Machakos Town market traders can visit our cafe during non-market days for KRA and business registration services.",
    ],

    popular_services: [
      "police-clearance",
      "kra-pin-registration",
      "logbook-transfer",
    ],

    faqs: [
      {
        question:
          "Do I need to travel to Nairobi for government services if I live in Machakos?",
        answer:
          "No. Most eCitizen services can be completed online at our Machakos cyber cafe. The Machakos Huduma Centre handles passport biometrics, NTSA services, and ID applications. Only specialised services may require a Nairobi visit.",
      },
      {
        question:
          "Where is the DCI office for police clearance fingerprinting in Machakos?",
        answer:
          "The DCI Machakos office at the Machakos Police Station handles fingerprinting. It is centrally located in the town and serves the entire county. Book your appointment online before visiting.",
      },
      {
        question:
          "Can I process a logbook transfer at the Machakos Huduma Centre?",
        answer:
          "Yes. The NTSA desk at the Machakos Huduma Centre processes logbook transfers and other vehicle-related services. Start the application online at our cafe, then complete any physical verification at the Huduma Centre.",
      },
    ],

    service_notes: {
      "police-clearance":
        "DCI Machakos office at the Machakos Police Station handles fingerprinting. Certificate collection is at the same office. Processing takes 7-14 working days.",
      "kra-pin-registration":
        "Machakos traders and commuters working in Nairobi frequently need KRA PINs. We process registrations instantly online.",
      "logbook-transfer":
        "NTSA desk at the Machakos Huduma Centre handles logbook transfers. Machakos has an active vehicle resale market along the Nairobi-Mombasa highway.",
      "passport-application":
        "Biometrics available at the Machakos Huduma Centre. Collection at the local immigration office. No Nairobi trip required.",
      "birth-registration":
        "The Machakos DC's office handles local birth registrations. Late registration applications require a statutory declaration from Machakos Law Courts.",
      "smart-dl-renewal":
        "NTSA Machakos office at the Huduma Centre processes driving licence applications. Smart DL cards are collected locally.",
    },
  },

  // ─────────────────────────────────────────────
  // 15. NYERI TOWN
  // ─────────────────────────────────────────────
  "nyeri-town": {
    deep_dive:
      "Nyeri Town is the capital of Nyeri County in central Kenya, nestled in the foothills of Mount Kenya and the " +
      "Aberdare Range. The town is the administrative hub for the region and serves Mathira, Kieni, Othaya, and Tetu " +
      "sub-counties. Our cyber cafe in Nyeri Town caters to tea and coffee farmers, local traders, civil servants, and " +
      "students from Dedan Kimathi University of Technology. The Nyeri Huduma Centre on Kimathi Way processes a wide range " +
      "of government services for the central highlands region. KRA PIN registration is heavily demanded by the agricultural " +
      "community — coffee cooperative members, tea farmers selling through KTDA, and dairy farmers in the Aberdare slopes. " +
      "Police clearance certificates are popular among graduates seeking employment. The DCI Nyeri office at the County " +
      "Police Headquarters handles regional fingerprinting. Nyeri's relatively compact town centre means our cafe, the " +
      "Huduma Centre, and the DCI office are all within walking distance, making it possible to complete online applications " +
      "and physical steps on the same day.",

    local_tips: [
      "The Nyeri Huduma Centre on Kimathi Way handles passport biometrics, NTSA, and ID services. Everything is within walking distance of our cafe in the town centre.",
      "DCI Nyeri office at the County Police Headquarters handles fingerprinting for police clearance. It is a short walk from the Huduma Centre.",
      "KRA Nyeri office is in the town centre for tax compliance queries. Coffee and tea farmers can resolve iTax issues there.",
      "Dedan Kimathi University students can walk to our town centre location for HELB applications and other government services.",
      "Nyeri's compact town centre means you can process an online application at our cafe and walk to the Huduma Centre for biometrics in the same morning.",
    ],

    popular_services: [
      "kra-pin-registration",
      "police-clearance",
      "business-name-search",
    ],

    faqs: [
      {
        question:
          "Can coffee and tea farmers register for KRA PINs at your Nyeri location?",
        answer:
          "Yes. We assist individual farmers and cooperative members with KRA PIN registration. Coffee and tea farmers need KRA PINs for KTDA and cooperative payments. The registration is instant and the certificate is delivered via email.",
      },
      {
        question:
          "How close is the Nyeri Huduma Centre to your cyber cafe?",
        answer:
          "The Nyeri Huduma Centre on Kimathi Way is within walking distance of our town centre location. You can complete your online application at our cafe and walk to the Huduma Centre for biometrics or document collection on the same day.",
      },
      {
        question:
          "Can Dedan Kimathi University students apply for HELB loans at your cafe?",
        answer:
          "Yes. DeKUT students can visit our Nyeri Town cafe to apply for HELB loans. Our location is walking distance from the university's town campus. Bring your admission letter, national ID, and parent/guardian details.",
      },
    ],

    service_notes: {
      "kra-pin-registration":
        "Critical for coffee, tea, and dairy farmers receiving cooperative payments. KRA Nyeri office in the town centre handles in-person queries.",
      "police-clearance":
        "DCI Nyeri office at the County Police Headquarters is walking distance from our cafe. Fingerprinting and certificate collection are at the same location.",
      "business-name-search":
        "Agricultural cooperatives, tea buying centres, and dairy enterprises frequently need business name searches. Processed online through the BRS portal.",
      "passport-application":
        "Biometrics available at the Nyeri Huduma Centre on Kimathi Way. No need to travel to Nairobi. Collection is at the local immigration office.",
      "helb-loan-application":
        "Popular among Dedan Kimathi University students. The application is fully online — no Nairobi trip required.",
      "smart-dl-renewal":
        "NTSA Nyeri office at the Huduma Centre processes driving licence applications. Smart DL cards are collected locally after production.",
    },
  },

  // ─────────────────────────────────────────────
  // 16. KISII TOWN
  // ─────────────────────────────────────────────
  "kisii-town": {
    deep_dive:
      "Kisii Town is the capital of Kisii County in the southwestern highlands of Kenya, serving as the economic hub " +
      "for the Gusii community across Kisii and Nyamira counties. The town is a bustling commercial centre along the " +
      "Kisii-Kisumu highway, known for its vibrant open-air Daraja Mbili market, soapstone carving industry, and tea and " +
      "banana farming. Our cyber cafe in Kisii Town serves local traders, farmers, soapstone artisans, and students from " +
      "Kisii University and Kisii National Polytechnic. The Kisii Huduma Centre on Hospital Road processes government " +
      "services for the region. KRA PIN registration and business name searches are popular among the entrepreneurial " +
      "population. Birth registration is a key service due to the high birth rate in the region. The DCI Kisii office " +
      "handles fingerprinting for police clearance, serving job seekers heading to Nairobi and overseas. The town's " +
      "hilly terrain and narrow streets can be congested during market days, but our central location is accessible from " +
      "all matatu stages.",

    local_tips: [
      "The Kisii Huduma Centre on Hospital Road handles passport biometrics, NTSA services, and ID applications for Kisii and Nyamira counties.",
      "DCI Kisii office at the Kisii Police Station handles fingerprinting for police clearance. Book online to avoid queues.",
      "Market days (especially Tuesday and Friday at Daraja Mbili) bring heavy traffic into town — plan government office visits for non-market days.",
      "Kisii University students can use our cafe for HELB applications and KRA PIN registration without travelling to Nairobi.",
      "The KRA Kisii office near the town centre handles local tax queries for traders and farmers.",
    ],

    popular_services: [
      "kra-pin-registration",
      "birth-registration",
      "police-clearance",
    ],

    faqs: [
      {
        question:
          "Can soapstone artisans and traders register businesses at your Kisii cafe?",
        answer:
          "Yes. We assist Kisii's soapstone artisans, Daraja Mbili market traders, and other small business owners with business name searches, reservations, and KRA PIN registration through the eCitizen portal.",
      },
      {
        question:
          "Does the Kisii Huduma Centre handle passport biometrics?",
        answer:
          "Yes. The Kisii Huduma Centre on Hospital Road processes passport biometrics. Residents of Kisii and Nyamira counties do not need to travel to Kisumu or Nairobi.",
      },
      {
        question:
          "Where do I register a birth in Kisii County?",
        answer:
          "Birth registration is processed through eCitizen and the Kisii DC's office handles local civil registrations. For late registrations (beyond 6 months), a statutory declaration from the Kisii Law Courts is required.",
      },
    ],

    service_notes: {
      "kra-pin-registration":
        "High demand among Daraja Mbili market traders, soapstone artisans, and tea farmers. KRA Kisii office is nearby for in-person queries.",
      "birth-registration":
        "Critical service in Kisii due to high birth rates. The Kisii DC's office processes local registrations. Late registration requires a statutory declaration.",
      "police-clearance":
        "DCI Kisii office at the Kisii Police Station handles fingerprinting. Popular among graduates and job seekers heading to Nairobi or overseas.",
      "passport-application":
        "Biometrics at the Kisii Huduma Centre on Hospital Road. No Nairobi trip needed. Collection at the local immigration office.",
      "business-name-search":
        "Soapstone carving businesses, tea cooperatives, and market traders can search and reserve business names online at our cafe.",
      "helb-loan-application":
        "Popular among Kisii University and Kisii National Polytechnic students. Processed fully online at our cafe.",
    },
  },

  // ─────────────────────────────────────────────
  // 17. GARISSA TOWN
  // ─────────────────────────────────────────────
  "garissa-town": {
    deep_dive:
      "Garissa Town is the capital of Garissa County in northeastern Kenya, situated along the Tana River and serving as " +
      "the commercial and administrative hub for the former North Eastern Province. The town is a key trading centre for " +
      "the pastoral Somali community, with the Garissa livestock market being one of the largest in East Africa. Our cyber " +
      "cafe in Garissa Town addresses a critical connectivity gap — internet access is less reliable here than in central " +
      "Kenya, and many residents lack the technical familiarity to navigate eCitizen portals independently. Birth registration " +
      "is one of the most demanded services, as many Garissa residents need to formalise civil records that were not registered " +
      "at birth. KRA PIN registration is important for livestock traders and businesses. The Garissa Huduma Centre processes " +
      "government services for the region, but its capacity is limited, making online pre-processing at our cafe essential. " +
      "Police clearance certificates are needed by residents seeking employment in Nairobi and the Middle East. The DCI " +
      "Garissa office handles fingerprinting locally, saving residents the long journey to Nairobi.",

    local_tips: [
      "The Garissa Huduma Centre processes passport biometrics, NTSA services, and ID applications. Pre-process your application online at our cafe to minimise time at the centre.",
      "DCI Garissa office at the Garissa Police Station handles fingerprinting for police clearance. Book your appointment online.",
      "Internet connectivity in Garissa can be unreliable — our cafe has dedicated fibre and backup connections to ensure your applications go through smoothly.",
      "The Garissa-Nairobi journey takes about 5-6 hours by bus. Avoid unnecessary trips by completing all online steps at our cafe first.",
      "Livestock traders can register for KRA PINs at our cafe before the weekly livestock market days.",
    ],

    popular_services: [
      "birth-registration",
      "kra-pin-registration",
      "police-clearance",
    ],

    faqs: [
      {
        question:
          "Can I register a birth that was never recorded at all in Garissa?",
        answer:
          "Yes. We handle late birth registration applications through eCitizen. You will need a statutory declaration, witnesses, and supporting documents. The Garissa Law Courts can provide the statutory declaration. We guide you through the entire process.",
      },
      {
        question:
          "Is internet access reliable enough for eCitizen services in Garissa?",
        answer:
          "Our Garissa cyber cafe has dedicated fibre internet with backup connectivity, ensuring reliable access to eCitizen portals. We understand that home internet in Garissa can be intermittent, which is why our service is especially valuable here.",
      },
      {
        question:
          "Can livestock traders get KRA PINs at your Garissa cafe?",
        answer:
          "Yes. We register KRA PINs instantly for livestock traders and businesses. The KRA PIN is essential for formal trading and banking. We can also assist with business name registrations for trading enterprises.",
      },
    ],

    service_notes: {
      "birth-registration":
        "Critical service in Garissa. Many residents need late birth registration. The Garissa DC's office and Law Courts handle the necessary documentation. We guide clients through the full process.",
      "kra-pin-registration":
        "Essential for livestock traders and businesses. We process registrations instantly. The nearest KRA office for complex queries is in Garissa town centre.",
      "police-clearance":
        "DCI Garissa office handles fingerprinting locally. Saves the 5-6 hour journey to Nairobi. Certificate collection is at the DCI Garissa office.",
      "passport-application":
        "Biometrics at the Garissa Huduma Centre. Saves the long journey to Nairobi. Collection at the Garissa Immigration office.",
      "change-ecitizen-phone":
        "Many Garissa residents have changed phone numbers. We assist with updating eCitizen accounts including OTP verification on the new number.",
      "smart-dl-renewal":
        "NTSA Garissa office handles driving licence applications. Particularly important for commercial vehicle drivers and PSV operators in the region.",
    },
  },

  // ─────────────────────────────────────────────
  // 18. VOI TOWN
  // ─────────────────────────────────────────────
  "voi-town": {
    deep_dive:
      "Voi is the largest town in Taita-Taveta County, located along the Nairobi-Mombasa highway (A109) at the base of " +
      "the Taita Hills and adjacent to Tsavo East National Park. The town serves as a transport corridor hub, with " +
      "long-distance trucks, SGR (Standard Gauge Railway) commuters, and safari tourists passing through daily. Our Voi " +
      "cyber cafe serves residents of Voi, Mwatate, Taveta, and Wundanyi, as well as workers in the sisal, tourism, and " +
      "transport industries. The Voi Huduma Centre handles government services for the county, but capacity is limited and " +
      "queues can be long, making online pre-processing at our cafe essential. KRA PIN registration is popular among " +
      "transport operators and small business owners along the highway. Police clearance certificates are needed by tourism " +
      "workers seeking employment in Mombasa, Nairobi, and overseas safari companies. The DCI Voi office handles local " +
      "fingerprinting. Logbook transfers are in demand due to the high volume of commercial vehicles operating on the " +
      "Nairobi-Mombasa corridor. Voi's position midway between Kenya's two largest cities makes our cafe a convenient " +
      "stop for government services without detouring to either city.",

    local_tips: [
      "The Voi Huduma Centre handles passport biometrics, NTSA, and ID services for Taita-Taveta County. Pre-process applications online at our cafe to reduce waiting time.",
      "DCI Voi office at the Voi Police Station handles fingerprinting for police clearance. Book your appointment via eCitizen.",
      "Voi is roughly midway between Nairobi (about 330 km) and Mombasa (about 170 km). Complete services locally rather than detouring to either city.",
      "Transport operators on the Nairobi-Mombasa highway can visit our cafe for KRA and NTSA services during rest stops in Voi.",
      "The SGR Voi Station connects to Nairobi (about 2.5 hours) and Mombasa (about 1.5 hours) if you must visit government offices in those cities.",
    ],

    popular_services: [
      "kra-pin-registration",
      "logbook-transfer",
      "police-clearance",
    ],

    faqs: [
      {
        question:
          "Is there a Huduma Centre in Voi for passport biometrics?",
        answer:
          "Yes. The Voi Huduma Centre handles passport biometrics and other government services for Taita-Taveta County. Apply online at our cafe and visit the Huduma Centre for biometrics. No need to travel to Mombasa or Nairobi.",
      },
      {
        question:
          "Can truck operators along the Nairobi-Mombasa highway use your Voi cafe for NTSA services?",
        answer:
          "Yes. Transport operators can visit our Voi cafe for logbook transfers, driving licence renewals, and other NTSA services. We are conveniently located for highway users stopping in Voi.",
      },
      {
        question:
          "Where is the nearest DCI office for police clearance from Voi?",
        answer:
          "The DCI Voi office at the Voi Police Station handles fingerprinting for police clearance. This saves a trip to Mombasa (170 km) or Nairobi (330 km). Book your appointment online before visiting.",
      },
    ],

    service_notes: {
      "kra-pin-registration":
        "Popular among transport operators, highway businesses, and sisal estate workers. We process registrations instantly at our cafe.",
      "logbook-transfer":
        "High demand from commercial vehicle operators on the Nairobi-Mombasa corridor. NTSA Voi office at the Huduma Centre processes transfers.",
      "police-clearance":
        "DCI Voi office at the Voi Police Station handles fingerprinting. Popular among tourism workers and those seeking employment in Mombasa or overseas.",
      "passport-application":
        "Biometrics at the Voi Huduma Centre. Saves the trip to Mombasa or Nairobi. Collection at the local immigration office.",
      "smart-dl-renewal":
        "NTSA Voi office handles driving licence applications. Important for PSV and commercial vehicle drivers operating on the A109.",
      "business-name-search":
        "Tourism enterprises, transport companies, and Taita Hills agricultural businesses can register business names online at our cafe.",
    },
  },
};

// ─────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────

/**
 * Get the enrichment data for a given location slug.
 * Returns null if the slug is not found.
 */
export function getLocationEnrichment(
  slug: string,
): LocationEnrichment | null {
  return locationEnrichments[slug] ?? null;
}

/**
 * Check whether enrichment data exists for a given location slug.
 */
export function hasLocationEnrichment(slug: string): boolean {
  return slug in locationEnrichments;
}

/**
 * Get the list of service slugs that have service_notes for a given location.
 * Useful for sitemap filtering — only generate service pages for services
 * that have location-specific content.
 */
export function getEnrichedServiceSlugs(locationSlug: string): string[] {
  const enrichment = locationEnrichments[locationSlug];
  if (!enrichment) return [];
  return Object.keys(enrichment.service_notes);
}
