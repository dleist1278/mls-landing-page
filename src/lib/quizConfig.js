export const US_STATES = [
  { label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" }, { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" }, { label: "California", value: "CA" }, { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" }, { label: "Delaware", value: "DE" }, { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" }, { label: "Hawaii", value: "HI" }, { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" }, { label: "Indiana", value: "IN" }, { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" }, { label: "Kentucky", value: "KY" }, { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" }, { label: "Maryland", value: "MD" }, { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" }, { label: "Minnesota", value: "MN" }, { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" }, { label: "Montana", value: "MT" }, { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" }, { label: "New Hampshire", value: "NH" }, { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" }, { label: "New York", value: "NY" }, { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" }, { label: "Ohio", value: "OH" }, { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" }, { label: "Pennsylvania", value: "PA" }, { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" }, { label: "South Dakota", value: "SD" }, { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" }, { label: "Utah", value: "UT" }, { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" }, { label: "Washington", value: "WA" }, { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" }, { label: "Wyoming", value: "WY" }
];

// 8 approved active pathways — hybrid_model is NOT included
export const PATHWAY_KEYS = [
  "home_daycare_nursery",
  "part_time_nursery",
  "drop_in_care",
  "kids_classes",
  "mommy_and_me",
  "playgroup_open_play",
  "homeschool_pod",
  "nanny_style_care",
];

export const PATHWAY_LABELS = {
  home_daycare_nursery: "Home Daycare / Nursery",
  part_time_nursery: "Part-Time Nursery",
  drop_in_care: "Drop-In Care",
  kids_classes: "Kids Classes & Enrichment",
  mommy_and_me: "Mommy & Me / Caregiver & Me",
  playgroup_open_play: "Playgroup / Open Play",
  homeschool_pod: "Homeschool Pod",
  nanny_style_care: "Nanny-Style / Private Care",
};

export const PATHWAY_DESCRIPTIONS = {
  home_daycare_nursery: "A calm, structured home-based program woven into your daily family life. Great for consistent income and building deep relationships with a small group of families.",
  part_time_nursery: "A flexible part-time program — perfect for mothers who want structure without a full-day commitment.",
  drop_in_care: "Flexible, on-demand care for families who need occasional coverage. Low barrier to entry with strong community demand.",
  kids_classes: "Enrichment classes, workshops, or themed programs. Great for educators who want variety and don't want to commit to full-day care.",
  mommy_and_me: "Parent-present programs that build community while introducing structured learning for young children and caregivers.",
  playgroup_open_play: "Community-driven open play or guided group time. Ideal for mothers who love connection and low-key structured fun.",
  homeschool_pod: "A small-group learning environment for school-age children. Perfect for educators who want to design their own curriculum.",
  nanny_style_care: "Dedicated in-home care for one family. Intimate, flexible, and relationship-centered.",
};

// Home-based pathways that should show the licensing/insurance setup note
export const HOME_BASED_PATHWAYS = ["home_daycare_nursery", "part_time_nursery", "drop_in_care", "nanny_style_care"];

export const QUESTIONS = [
  {
    id: "q_season",
    text: "What season of life are you in right now?",
    type: "single",
    options: [
      { label: "Mother with young children at home", value: "mother_young_kids", scores: { home_daycare_nursery: 2, part_time_nursery: 2, playgroup_open_play: 2, mommy_and_me: 2 } },
      { label: "Mother with school-aged children", value: "mother_school_kids", scores: { homeschool_pod: 2, kids_classes: 2 } },
      { label: "Empty nester or experienced grandmother", value: "empty_nester", scores: { home_daycare_nursery: 1, part_time_nursery: 1 } },
      { label: "Expecting parent or planning for a family", value: "expecting", scores: { home_daycare_nursery: 1 } },
      { label: "None of the above", value: "other", scores: {} }
    ]
  },
  {
    id: "q_own_kids_present",
    text: "Will your own children be present during your program?",
    type: "single",
    options: [
      { label: "Yes — I want to care for my kids alongside others", value: "yes_present", scores: { home_daycare_nursery: 2, mommy_and_me: 2, playgroup_open_play: 2, part_time_nursery: 2 } },
      { label: "No — they are in school or grown up", value: "no_not_present", scores: { nanny_style_care: 2, homeschool_pod: 1, kids_classes: 1 } },
      { label: "Maybe — depends on the schedule", value: "maybe_present", scores: { part_time_nursery: 1, drop_in_care: 1, kids_classes: 1 } }
    ]
  },
  {
    id: "q_age_group",
    text: "What age group are you most drawn to caring for?",
    type: "multi",
    maxSelect: 4,
    options: [
      { label: "Infants & Toddlers (0 - 2 years)", value: "infants_toddlers", scores: { home_daycare_nursery: 2, nanny_style_care: 2, mommy_and_me: 1 } },
      { label: "Preschoolers (3 - 5 years)", value: "preschoolers", scores: { home_daycare_nursery: 1, part_time_nursery: 2, playgroup_open_play: 2, mommy_and_me: 1 } },
      { label: "School-age kids / Homeschoolers (5+ years)", value: "school_age", scores: { homeschool_pod: 3, kids_classes: 3 } },
      { label: "Mixed age groups (all ages)", value: "mixed_ages", scores: { home_daycare_nursery: 3, drop_in_care: 2, playgroup_open_play: 1 } }
    ]
  },
  {
    id: "q_parent_presence",
    text: "Do you want parents to stay during the program?",
    type: "single",
    options: [
      { label: "No — traditional drop-off care", value: "no", scores: { home_daycare_nursery: 3, part_time_nursery: 3, drop_in_care: 3, nanny_style_care: 3 } },
      { label: "Yes — parent-child classes or playgroups", value: "yes", scores: { mommy_and_me: 3, playgroup_open_play: 3 } },
      { label: "Sometimes — flexible depending on program type", value: "sometimes", scores: { kids_classes: 2, drop_in_care: 1, part_time_nursery: 1 } }
    ]
  },
  {
    id: "q_days_per_week",
    text: "How many days per week do you want to run your program?",
    type: "single",
    options: [
      { label: "1 - 2 days per week (highly flexible)", value: "1_2_days", scores: { mommy_and_me: 2, playgroup_open_play: 2, kids_classes: 2 } },
      { label: "3 - 4 days per week (balanced)", value: "3_4_days", scores: { part_time_nursery: 3, homeschool_pod: 2 } },
      { label: "5 days per week (full business)", value: "5_days", scores: { home_daycare_nursery: 3, nanny_style_care: 2 } },
      { label: "On-demand or occasional weekends", value: "on_demand", scores: { drop_in_care: 3, kids_classes: 1 } }
    ]
  },
  {
    id: "q_hours_per_day",
    text: "How many hours per day do you want to run your program?",
    type: "single",
    options: [
      { label: "Half-day / Mornings only (3 - 4 hours)", value: "half_day", scores: { part_time_nursery: 3, playgroup_open_play: 2 } },
      { label: "Full school day (6 - 7 hours)", value: "school_day", scores: { homeschool_pod: 3 } },
      { label: "Full working day (8 - 10 hours)", value: "full_day", scores: { home_daycare_nursery: 3, nanny_style_care: 2 } },
      { label: "Occasional hours / Classes (1 - 2 hours)", value: "hourly_classes", scores: { kids_classes: 3, mommy_and_me: 3 } }
    ]
  },
  {
    id: "q_care_location",
    text: "Where would you most likely host this program or care arrangement?",
    subtext: "Think about the general setting, not specific rooms.",
    type: "single",
    options: [
      { label: "In my home", value: "in_home", scores: { home_daycare_nursery: 3, part_time_nursery: 2, playgroup_open_play: 1 } },
      { label: "In another family's home", value: "other_family_home", scores: { nanny_style_care: 3 } },
      { label: "In a rented or community space", value: "rented_community", scores: { kids_classes: 2, playgroup_open_play: 2, part_time_nursery: 1 } },
      { label: "At a church, school, or local organization", value: "church_school_org", scores: { homeschool_pod: 2, kids_classes: 2 } },
      { label: "Outdoors / park-based", value: "outdoors_park", scores: { kids_classes: 2, playgroup_open_play: 2 } },
      { label: "I'm not sure yet", value: "not_sure", scores: { drop_in_care: 1, part_time_nursery: 1 } }
    ]
  },
  {
    id: "q_provider_identity",
    text: "Which best describes your background?",
    type: "single",
    options: [
      { label: "Stay-at-home parent looking to earn from home", value: "sahp", scores: { home_daycare_nursery: 2, playgroup_open_play: 1 } },
      { label: "Working parent wanting to transition to self-employment", value: "working_parent", scores: { part_time_nursery: 2, nanny_style_care: 1 } },
      { label: "Early childhood educator or teacher", value: "ece", scores: { homeschool_pod: 3, kids_classes: 2 } },
      { label: "Current childcare provider wanting to grow", value: "provider", scores: { home_daycare_nursery: 2, part_time_nursery: 2 } },
      { label: "None of the above", value: "other", scores: {} }
    ]
  },
  {
    id: "q_unique_qualifications",
    text: "What unique qualifications or strengths do you bring?",
    type: "multi",
    maxSelect: 3,
    options: [
      { label: "I'm a mom with lived experience caring for young children", value: "lived_exp", scores: { home_daycare_nursery: 1, mommy_and_me: 1 } },
      { label: "I have childcare, daycare, nanny, or babysitting experience", value: "childcare_exp", scores: { nanny_style_care: 1, home_daycare_nursery: 1 } },
      { label: "I have teaching, homeschool, tutoring, or classroom experience", value: "teaching_exp", scores: { homeschool_pod: 2, kids_classes: 1 } },
      { label: "I have healthcare, therapy, special needs, or child development experience", value: "healthcare_dev", scores: { home_daycare_nursery: 1 } },
      { label: "I'm creative and love planning activities, crafts, music, or sensory play", value: "creative_play", scores: { kids_classes: 2, mommy_and_me: 1 } },
      { label: "I love hosting, gathering families, and building community", value: "hosting_community", scores: { playgroup_open_play: 2, mommy_and_me: 1 } },
      { label: "I'm organized and good at routines, schedules, and structure", value: "organized_routines", scores: { home_daycare_nursery: 1, part_time_nursery: 1 } },
      { label: "I love outdoor play, nature, movement, or active learning", value: "nature_active", scores: { playgroup_open_play: 1, kids_classes: 1 } },
      { label: "I speak another language or bring a cultural/family tradition", value: "bilingual_culture", scores: { kids_classes: 1 } },
      { label: "I'm still discovering what makes my approach unique", value: "still_discovering", scores: {} }
    ]
  },
  {
    id: "q_program_vibe",
    text: "What is the ideal 'vibe' or environment of your program?",
    type: "multi",
    maxSelect: 2,
    options: [
      { label: "Reggio / Montessori inspired (child-led discovery)", value: "child_led", scores: { part_time_nursery: 1, homeschool_pod: 1 } },
      { label: "Academic / School readiness (structured learning)", value: "academic", scores: { homeschool_pod: 2 } },
      { label: "Nature school / Outdoor-focused (forest school)", value: "nature_outdoor", scores: { kids_classes: 1, playgroup_open_play: 1 } },
      { label: "Cozy home / Family environment (nurturing)", value: "cozy_home", scores: { home_daycare_nursery: 2, nanny_style_care: 1 } },
      { label: "Art & play centered (highly creative)", value: "art_play", scores: { kids_classes: 2, mommy_and_me: 1 } }
    ]
  },
  {
    id: "q_care_task_comfort",
    text: "Which daily childcare tasks are you most comfortable with?",
    type: "multi",
    maxSelect: 3,
    options: [
      { label: "Diaper changes, feeding, and basic care", value: "physical_care", scores: { home_daycare_nursery: 1, nanny_style_care: 1 } },
      { label: "Designing lessons, storytelling, and teaching", value: "teaching_instruction", scores: { homeschool_pod: 2, kids_classes: 1 } },
      { label: "Organizing messy play and sensory activities", value: "play_activities", scores: { playgroup_open_play: 1, mommy_and_me: 1 } },
      { label: "Managing logistics, parent communication, and scheduling", value: "operations", scores: { home_daycare_nursery: 1, part_time_nursery: 1 } },
      { label: "Facilitating conflict resolution and emotional coaching", value: "emotional_coaching", scores: { homeschool_pod: 1 } }
    ]
  },
  {
    id: "q_income_goal",
    text: "What is your monthly income goal for this business?",
    type: "single",
    options: [
      { label: "Under $1,000 / month", value: "under_1k", scores: { playgroup_open_play: 2, mommy_and_me: 2 } },
      { label: "$1,000 – $3,000 / month", value: "1k_3k", scores: { kids_classes: 1, part_time_nursery: 1 } },
      { label: "$3,000 – $5,000 / month", value: "3k_5k", scores: { part_time_nursery: 2, homeschool_pod: 1 } },
      { label: "$5,000 – $10,000 / month", value: "5k_10k", scores: { home_daycare_nursery: 2, homeschool_pod: 2 } },
      { label: "$10,000+ / month", value: "10k_plus", scores: { home_daycare_nursery: 3, nanny_style_care: 1 } }
    ]
  },
  {
    id: "q_income_style",
    text: "How do you prefer to earn?",
    type: "single",
    options: [
      { label: "Steady monthly tuition from the same families", value: "steady_tuition", scores: { home_daycare_nursery: 3, part_time_nursery: 3, homeschool_pod: 3 } },
      { label: "Flexible session/class income from multiple families", value: "flexible_sessions", scores: { kids_classes: 3, mommy_and_me: 3, playgroup_open_play: 3 } },
      { label: "One-family/private care income", value: "private_care", scores: { nanny_style_care: 3 } },
      { label: "A mix of offers over time", value: "mix_offers", scores: { drop_in_care: 2, kids_classes: 2, playgroup_open_play: 1, mommy_and_me: 1 } }
    ]
  },
  {
    id: "q_startup_budget",
    text: "What is your approximate startup budget?",
    type: "single",
    options: [
      { label: "Very minimal / Bootstrapping ($0 - $500)", value: "bootstrap", scores: { nanny_style_care: 2, playgroup_open_play: 1 } },
      { label: "Moderate ($500 - $2,000)", value: "moderate", scores: { part_time_nursery: 1, kids_classes: 1 } },
      { label: "Significant investment ($2,000+)", value: "significant", scores: { home_daycare_nursery: 1 } }
    ]
  },
  {
    id: "q_launch_timeline",
    text: "When are you hoping to start?",
    type: "single",
    options: [
      { label: "As soon as possible", value: "asap", scores: {} },
      { label: "Within 1–3 months", value: "1_3_months", scores: {} },
      { label: "Within 3–6 months", value: "3_6_months", scores: {} },
      { label: "Within 6–12 months", value: "6_12_months", scores: {} },
      { label: "Just exploring for now", value: "exploring", scores: {} }
    ]
  },
  {
    id: "q_biggest_blocker",
    text: "What feels like your biggest blocker right now?",
    type: "single",
    options: [
      { label: "Licensing, insurance, regulations, and paperwork", value: "licensing_insurance_admin", scores: {} },
      { label: "Finding families and marketing", value: "finding_families", scores: {} },
      { label: "Confidence and knowing where to start", value: "confidence", scores: {} },
      { label: "Money or startup costs", value: "money_startup_costs", scores: {} },
      { label: "Time and energy", value: "time_energy", scores: {} },
      { label: "Not enough knowledge or training", value: "knowledge", scores: {} },
      { label: "Insurance and protecting my home/business", value: "insurance_protection", scores: {} }
    ]
  },
  {
    id: "q_support_needed",
    text: "What kind of support would help you most?",
    type: "multi",
    maxSelect: 3,
    optional: true,
    options: [
      { label: "Licensing checklist", value: "licensing", scores: {} },
      { label: "Pricing/income calculator", value: "calculator", scores: {} },
      { label: "Sample schedule", value: "schedule", scores: {} },
      { label: "Space setup plan", value: "space_setup", scores: {} },
      { label: "Parent handbook/policies", value: "handbook", scores: {} },
      { label: "Marketing plan", value: "marketing", scores: {} },
      { label: "Insurance guidance", value: "insurance", scores: {} },
      { label: "Confidence/clarity", value: "confidence", scores: {} },
      { label: "Community support", value: "community", scores: {} },
      { label: "Mama Launch AI help", value: "ai_help", scores: {} },
      { label: "Step-by-step roadmap", value: "roadmap", scores: {} }
    ]
  },
  {
    id: "q_local_parent_need",
    text: "What is the biggest childcare need for parents in your area?",
    type: "multi",
    maxSelect: 3,
    optional: true,
    options: [
      { label: "Infant care", value: "infant", scores: { home_daycare_nursery: 2, nanny_style_care: 2 } },
      { label: "Toddler care", value: "toddler", scores: { home_daycare_nursery: 1, part_time_nursery: 1 } },
      { label: "Part-time care", value: "part_time", scores: { part_time_nursery: 2 } },
      { label: "Drop-in/backup care", value: "drop_in", scores: { drop_in_care: 2 } },
      { label: "Parent-child activities", value: "parent_child", scores: { mommy_and_me: 2 } },
      { label: "Enrichment classes", value: "enrichment", scores: { kids_classes: 2 } },
      { label: "Homeschool support", value: "homeschool", scores: { homeschool_pod: 2 } },
      { label: "Smaller home-like care", value: "smaller_home", scores: { home_daycare_nursery: 2 } },
      { label: "Flexible schedules", value: "flexible_sched", scores: { drop_in_care: 2, part_time_nursery: 1 } },
      { label: "I'm not sure yet", value: "not_sure", scores: {} }
    ]
  },
  {
    id: "q_readiness_level",
    text: "How would you describe your readiness?",
    type: "single",
    options: [
      { label: "Just curious — exploring the idea", value: "just_curious", scores: {} },
      { label: "Actively researching and planning", value: "actively_exploring", scores: {} },
      { label: "Ready to plan and make moves", value: "ready_to_plan", scores: {} },
      { label: "Ready to start very soon", value: "ready_to_start_soon", scores: {} }
    ]
  },
  {
    id: "q_state",
    text: "Which state do you live in?",
    type: "dropdown",
    optional: false,
    options: [] // Populated from US_STATES at runtime
  }
];