export const MODEL_KEYS = {
  HOME_DAYCARE_NURSERY: "home_daycare_nursery",
  PART_TIME_NURSERY: "part_time_nursery",
  DROP_IN_CARE: "drop_in_care",
  KIDS_CLASSES: "kids_classes",
  MOMMY_AND_ME: "mommy_and_me",
  PLAYGROUP_OPEN_PLAY: "playgroup_open_play",
  HOMESCHOOL_POD: "homeschool_pod",
  NANNY_STYLE_CARE: "nanny_style_care",
  HYBRID_MODEL: "hybrid_model"
};

export const US_STATES_COMPACT = [
  { label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" }, { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" }, { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" }, { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" }, { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" }, { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" }, { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" }, { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" }, { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" }, { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" }, { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" }, { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" }, { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" }, { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" }, { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" }, { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" }, { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" }, { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" }, { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" }, { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" }, { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" }, { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" }, { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" }, { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" }, { label: "Wyoming", value: "WY" }
];

export const quizConfig = {
  questions: [
    {
      id: "q_season",
      text: "Which best describes your current season?",
      type: "single_choice",
      options: [
        { label: "I have a baby/toddler at home", value: "baby_toddler_at_home", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 1, [MODEL_KEYS.MOMMY_AND_ME]: 2 } },
        { label: "I have preschool or school-age children", value: "preschool_school_age", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 1, [MODEL_KEYS.HOMESCHOOL_POD]: 2 } },
        { label: "I'm home with children and looking for income", value: "seeking_income", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.NANNY_STYLE_CARE]: 2 } },
        { label: "I have childcare/teaching experience and want something of my own", value: "seeking_own_program", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 2, [MODEL_KEYS.HOMESCHOOL_POD]: 1 } },
        { label: "I'm exploring a future transition", value: "exploring_future", scores: {} }
      ]
    },
    {
      id: "q_own_kids_present",
      text: "Will your own children be present during program hours?",
      type: "single_choice",
      options: [
        { label: "Yes, fully integrated in the group", value: "yes_integrated", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.HOMESCHOOL_POD]: 2, [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 1 } },
        { label: "Yes, but with separate helper or schedule", value: "yes_separate", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 2, [MODEL_KEYS.KIDS_CLASSES]: 2 } },
        { label: "No, they will not be present", value: "no", scores: { [MODEL_KEYS.NANNY_STYLE_CARE]: 2, [MODEL_KEYS.DROP_IN_CARE]: 2, [MODEL_KEYS.HYBRID_MODEL]: 2 } }
      ]
    },
    {
      id: "q_age_group",
      text: "Which age group do you feel most aligned to care for?",
      type: "multi_select",
      max_select: 2,
      options: [
        { label: "Infants & Toddlers (0-2 years)", value: "infants_toddlers", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.NANNY_STYLE_CARE]: 2 } },
        { label: "Preschoolers (3-5 years)", value: "preschool_prek", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 2, [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 1 } },
        { label: "School-Age (6+ years)", value: "school_age", scores: { [MODEL_KEYS.HOMESCHOOL_POD]: 2, [MODEL_KEYS.KIDS_CLASSES]: 2 } }
      ]
    },
    {
      id: "q_parent_presence",
      text: "Do you want parents to remain on-site during sessions?",
      type: "single_choice",
      options: [
        { label: "Drop-off: parents leave immediately", value: "drop_off", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.PART_TIME_NURSERY]: 2, [MODEL_KEYS.HOMESCHOOL_POD]: 2 } },
        { label: "Parent-and-Me: parents stay and engage", value: "parent_and_me", scores: { [MODEL_KEYS.MOMMY_AND_ME]: 3, [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 2 } },
        { label: "Flexible / Hybrid options", value: "hybrid", scores: { [MODEL_KEYS.DROP_IN_CARE]: 2, [MODEL_KEYS.HYBRID_MODEL]: 2 } }
      ]
    },
    {
      id: "q_days_per_week",
      text: "How many days per week do you want to run your program?",
      type: "single_choice",
      options: [
        { label: "Full week (5 days)", value: "five_days", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 3, [MODEL_KEYS.HYBRID_MODEL]: 2 } },
        { label: "Part-time (2-4 days)", value: "two_four_days", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 3, [MODEL_KEYS.HOMESCHOOL_POD]: 2 } },
        { label: "Occasional or 1 day", value: "occasional", scores: { [MODEL_KEYS.KIDS_CLASSES]: 3, [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 3, [MODEL_KEYS.DROP_IN_CARE]: 2 } }
      ]
    },
    {
      id: "q_hours_per_day",
      text: "How many hours per day do you want to host children?",
      type: "single_choice",
      options: [
        { label: "Full days (6+ hours)", value: "full_days", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 3, [MODEL_KEYS.HYBRID_MODEL]: 2, [MODEL_KEYS.NANNY_STYLE_CARE]: 2 } },
        { label: "Half days or blocks (3-5 hours)", value: "half_days", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 3, [MODEL_KEYS.HOMESCHOOL_POD]: 2 } },
        { label: "Brief sessions (1-2 hours)", value: "brief_sessions", scores: { [MODEL_KEYS.KIDS_CLASSES]: 3, [MODEL_KEYS.MOMMY_AND_ME]: 3, [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 2 } }
      ]
    },
    {
      id: "q_care_location",
      text: "Where would you most likely host this program or care arrangement?",
      type: "single_choice",
      options: [
        { label: "In my home", value: "in_my_home", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 3, [MODEL_KEYS.PART_TIME_NURSERY]: 3, [MODEL_KEYS.DROP_IN_CARE]: 3 } },
        { label: "In another family's home", value: "in_another_family_home", scores: { [MODEL_KEYS.NANNY_STYLE_CARE]: 3 } },
        { label: "In a rented or community space", value: "in_rented_space", scores: { [MODEL_KEYS.KIDS_CLASSES]: 2, [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 2 } },
        { label: "At a church, school, or local organization", value: "at_church_school", scores: { [MODEL_KEYS.HOMESCHOOL_POD]: 2, [MODEL_KEYS.KIDS_CLASSES]: 2 } },
        { label: "Outdoors / park-based", value: "outdoors_park", scores: { [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 2, [MODEL_KEYS.KIDS_CLASSES]: 1 } },
        { label: "I'm not sure yet", value: "not_sure", scores: {} }
      ]
    },
    {
      id: "q_provider_identity",
      text: "What is your primary caregiving background or professional identity?",
      type: "single_choice",
      options: [
        { label: "Experienced educator or teacher", value: "educator", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 2, [MODEL_KEYS.HOMESCHOOL_POD]: 3 } },
        { label: "Mother or caregiver", value: "mother", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.NANNY_STYLE_CARE]: 2 } },
        { label: "Enrichment lead or facilitator", value: "caregiver", scores: { [MODEL_KEYS.KIDS_CLASSES]: 3, [MODEL_KEYS.MOMMY_AND_ME]: 2 } }
      ]
    },
    {
      id: "q_unique_qualifications",
      text: "Which unique qualifications or credentials do you bring?",
      type: "multi_select",
      max_select: 3,
      options: [
        { label: "I'm a mom with lived experience caring for young children", value: "lived_experience", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.MOMMY_AND_ME]: 1 } },
        { label: "I have childcare, daycare, nanny, or babysitting experience", value: "childcare_experience", scores: { [MODEL_KEYS.NANNY_STYLE_CARE]: 3, [MODEL_KEYS.DROP_IN_CARE]: 1 } },
        { label: "I have teaching, homeschool, tutoring, or classroom experience", value: "classroom_experience", scores: { [MODEL_KEYS.HOMESCHOOL_POD]: 3, [MODEL_KEYS.PART_TIME_NURSERY]: 1 } },
        { label: "I have healthcare, therapy, special needs, or child development experience", value: "special_needs_experience", scores: { [MODEL_KEYS.NANNY_STYLE_CARE]: 2, [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 1 } },
        { label: "I'm creative and love planning activities, crafts, music, or sensory play", value: "creative", scores: { [MODEL_KEYS.KIDS_CLASSES]: 3, [MODEL_KEYS.MOMMY_AND_ME]: 2 } },
        { label: "I love hosting, gathering families, and building community", value: "hosting", scores: { [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 3, [MODEL_KEYS.MOMMY_AND_ME]: 2 } },
        { label: "I'm organized and good at routines, schedules, and structure", value: "organized", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.PART_TIME_NURSERY]: 2 } },
        { label: "I love outdoor play, nature, movement, or active learning", value: "outdoors", scores: { [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 2, [MODEL_KEYS.KIDS_CLASSES]: 1 } },
        { label: "I speak another language or bring a cultural/family tradition", value: "bilingual", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 1, [MODEL_KEYS.NANNY_STYLE_CARE]: 1 } },
        { label: "I'm still discovering what makes my approach unique", value: "discovering", scores: {} }
      ]
    },
    {
      id: "q_program_vibe",
      text: "What is your preferred educational philosophy or classroom vibe?",
      type: "multi_select",
      max_select: 3,
      options: [
        { label: "Play-based, child-led exploration", value: "play_based", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 2, [MODEL_KEYS.MOMMY_AND_ME]: 1 } },
        { label: "Structured academic or project blocks", value: "structured", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 2, [MODEL_KEYS.HOMESCHOOL_POD]: 3 } },
        { label: "Cozy home-away-from-home rhythm", value: "cozy_home", scores: { [MODEL_KEYS.NANNY_STYLE_CARE]: 2, [MODEL_KEYS.HYBRID_MODEL]: 2 } },
        { label: "I'm still discovering my style", value: "still_discovering", scores: {} }
      ]
    },
    {
      id: "q_care_task_comfort",
      text: "Which of these daily care tasks are you most comfortable managing?",
      type: "multi_select",
      max_select: 3,
      options: [
        { label: "Diapering, potty training, and feeding schedules", value: "diapering_potty", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.NANNY_STYLE_CARE]: 2 } },
        { label: "Directing collaborative group play and circles", value: "group_play", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 2, [MODEL_KEYS.MOMMY_AND_ME]: 2 } },
        { label: "Facilitating structured curriculum & lessons", value: "academics", scores: { [MODEL_KEYS.HOMESCHOOL_POD]: 3, [MODEL_KEYS.KIDS_CLASSES]: 2 } }
      ]
    },
    {
      id: "q_income_goal",
      text: "What monthly gross income goal would feel meaningful?",
      type: "single_choice",
      options: [
        { label: "High replacement ($4,000+)", value: "replace_income", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 3, [MODEL_KEYS.HYBRID_MODEL]: 2 } },
        { label: "Solid supplemental ($1,500 - $3,500)", value: "supplemental", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 3, [MODEL_KEYS.HOMESCHOOL_POD]: 2, [MODEL_KEYS.NANNY_STYLE_CARE]: 2 } },
        { label: "Flexible side income (Under $1,500)", value: "side_income", scores: { [MODEL_KEYS.KIDS_CLASSES]: 2, [MODEL_KEYS.MOMMY_AND_ME]: 2, [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 2 } }
      ]
    },
    {
      id: "q_income_style",
      text: "How do you prefer to collect tuition and program fees?",
      type: "single_choice",
      options: [
        { label: "Steady monthly tuition from the same families", value: "monthly_tuition", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 3, [MODEL_KEYS.PART_TIME_NURSERY]: 3, [MODEL_KEYS.HOMESCHOOL_POD]: 3 } },
        { label: "Flexible session/class income from multiple families", value: "flexible_sessions", scores: { [MODEL_KEYS.KIDS_CLASSES]: 3, [MODEL_KEYS.MOMMY_AND_ME]: 3, [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 2, [MODEL_KEYS.DROP_IN_CARE]: 2 } },
        { label: "One-family/private care income", value: "private_care", scores: { [MODEL_KEYS.NANNY_STYLE_CARE]: 3 } },
        { label: "A mix of offers over time", value: "mix_of_offers", scores: { [MODEL_KEYS.HYBRID_MODEL]: 3 } }
      ]
    },
    {
      id: "q_startup_budget",
      text: "What is your target startup setup budget?",
      type: "single_choice",
      options: [
        { label: "Very minimal (Under $500)", value: "under_500", scores: { [MODEL_KEYS.PLAYGROUP_OPEN_PLAY]: 2, [MODEL_KEYS.KIDS_CLASSES]: 2, [MODEL_KEYS.MOMMY_AND_ME]: 2 } },
        { label: "Moderate ($500 - $1,500)", value: "mid_budget", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 2, [MODEL_KEYS.HOMESCHOOL_POD]: 2, [MODEL_KEYS.NANNY_STYLE_CARE]: 1 } },
        { label: "Investment-ready ($1,500+)", value: "high_budget", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.HYBRID_MODEL]: 2 } }
      ]
    },
    {
      id: "q_launch_timeline",
      text: "What is your target launch timeline?",
      type: "single_choice",
      options: [
        { label: "As soon as possible (Next 1-2 months)", value: "asap", scores: {} },
        { label: "Slightly flexible (Next 3-6 months)", value: "medium_term", scores: {} },
        { label: "Just researching / Planning forward", value: "researching", scores: {} }
      ]
    },
    {
      id: "q_biggest_blocker",
      text: "What is your biggest blocker to launching your program?",
      type: "single_choice",
      options: [
        { label: "Understanding regulations & licensing requirements", value: "licensing_rules", scores: {} },
        { label: "Marketing, branding, and finding local families", value: "marketing", scores: {} },
        { label: "Designing space layout and finding curriculum", value: "space_design", scores: {} }
      ]
    },
    {
      id: "q_support_needed",
      text: "What support or tool do you need most right now?",
      type: "multi_select",
      max_select: 3,
      options: [
        { label: "Licensing checklist", value: "licensing_checklist", scores: {} },
        { label: "Pricing / income calculator", value: "pricing_calculator", scores: {} },
        { label: "Sample schedule", value: "sample_schedule", scores: {} },
        { label: "Space setup plan", value: "space_setup", scores: {} },
        { label: "Parent handbook / policies", value: "policies", scores: {} },
        { label: "Marketing plan", value: "marketing_plan", scores: {} },
        { label: "Confidence / clarity", value: "confidence_clarity", scores: {} },
        { label: "Community support", value: "community_support", scores: {} },
        { label: "Mama Launch AI help", value: "ai_help", scores: {} },
        { label: "Step-by-step roadmap", value: "roadmap", scores: {} }
      ]
    },
    {
      id: "q_local_parent_need",
      text: "What is the biggest childcare gap you hear local parents requesting?",
      type: "multi_select",
      max_select: 3,
      options: [
        { label: "Infant care", value: "infant_care", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.NANNY_STYLE_CARE]: 2 } },
        { label: "Toddler care", value: "toddler_care", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.DROP_IN_CARE]: 1 } },
        { label: "Part-time care", value: "part_time_care", scores: { [MODEL_KEYS.PART_TIME_NURSERY]: 3 } },
        { label: "Drop-in / backup care", value: "drop_in_backup_care", scores: { [MODEL_KEYS.DROP_IN_CARE]: 3 } },
        { label: "Parent-child activities", value: "parent_child_activities", scores: { [MODEL_KEYS.MOMMY_AND_ME]: 3 } },
        { label: "Enrichment classes", value: "enrichment_classes", scores: { [MODEL_KEYS.KIDS_CLASSES]: 3 } },
        { label: "Homeschool support", value: "homeschool_support", scores: { [MODEL_KEYS.HOMESCHOOL_POD]: 3 } },
        { label: "Smaller home-like care", value: "home_like_care", scores: { [MODEL_KEYS.HOME_DAYCARE_NURSERY]: 2, [MODEL_KEYS.NANNY_STYLE_CARE]: 2 } },
        { label: "Flexible schedules", value: "flexible_schedules", scores: { [MODEL_KEYS.HYBRID_MODEL]: 3, [MODEL_KEYS.DROP_IN_CARE]: 2 } },
        { label: "I'm not sure yet", value: "not_sure", scores: {} }
      ]
    },
    {
      id: "q_readiness_level",
      text: "How ready are you to begin drafting your space and policies?",
      type: "single_choice",
      options: [
        { label: "Ready to begin drafting this week", value: "ready", scores: {} },
        { label: "Gently mapping out ideas as they unfold", value: "mapping", scores: {} },
        { label: "Just exploring possibilities", value: "exploring", scores: {} }
      ]
    },
    {
      id: "q_state",
      text: "Which state will your program operate in?",
      type: "state_select",
      options: US_STATES_COMPACT
    }
  ],
  models: {
    home_daycare_nursery: {
      title: "Home Daycare / Nursery",
      subtitle: "A structured, full-day program naturally integrated into family life.",
      description: "Focuses on a warm group setting, predictable rhythm, parent communication, and a home-like care environment.",
      incomeRange: "$4,000 – $8,500 / month gross",
      surfaceReason: "Your answers highlight a high gross income goal, full-day care preference, and a willingness to provide consistent group care for younger children.",
      alternatives: ["Part-Time Nursery", "Hybrid Model"],
      lightestStartingVersion: "Begin with a small morning pilot for a few families so you can test your rhythm, space, and interest before building something bigger."
    },
    part_time_nursery: {
      title: "Part-Time Nursery",
      subtitle: "Focused morning sessions for Pre-K learning and play.",
      description: "Operates in morning blocks (e.g., 9:00 AM – 12:00 PM). Perfect for supplemental income, preschool readiness, and leaving your afternoons free.",
      incomeRange: "$1,800 – $3,500 / month gross",
      surfaceReason: "You preferred half-day blocks, wanted to keep afternoons open, and selected structured or play-focused educational goals.",
      alternatives: ["Homeschool Pod", "Mommy & Me"],
      lightestStartingVersion: "Launch a 2-day-a-week morning Pre-K block for 3 neighborhood children."
    },
    drop_in_care: {
      title: "Drop-In Care",
      subtitle: "Flexible, fluid booking care for modern schedules.",
      description: "Enables parents to book hours dynamically. Focuses on safety, rapid check-ins, and fluid playrooms.",
      incomeRange: "$2,000 – $4,500 / month gross",
      surfaceReason: "You prioritized highly flexible booking structures and wanted to support backup care needs.",
      alternatives: ["Playgroup & Open Play", "Hybrid Model"],
      lightestStartingVersion: "Run drop-in slots exclusively on Tuesday and Thursday mornings via reservation list."
    },
    kids_classes: {
      title: "Kids Programs",
      subtitle: "Enrichment-style themed workshops and series.",
      description: "Host specialized, 1-2 hour sensory, art, or movement workshops for children, organized in structured multi-week packs.",
      incomeRange: "$800 – $2,200 / month gross",
      surfaceReason: "You preferred creative theme sessions, short daily intervals, and multi-week recurring class booking.",
      alternatives: ["Mommy & Me", "Playgroup & Open Play"],
      lightestStartingVersion: "Host a single Saturday morning sensory craft series limited to 5 children."
    },
    mommy_and_me: {
      title: "Mommy & Me",
      subtitle: "Cooperative spaces for mothers and young children.",
      description: "Mothers remain on-site, sharing socialization and community bonds during led workshops, play sessions, or morning circles.",
      incomeRange: "$600 – $1,500 / month gross",
      surfaceReason: "You requested active parent presence, side-by-side connection, and community socialization structures.",
      alternatives: ["Playgroup & Open Play", "Kids Programs"],
      lightestStartingVersion: "Host a weekly cooperative circle group in your home or a local park."
    },
    playgroup_open_play: {
      title: "Playgroup & Open Play",
      subtitle: "Hosted, welcoming spaces for child-led exploration.",
      description: "Create structured play hours in your space with light setups, letting parents connect while kids self-direct.",
      incomeRange: "$800 – $2,000 / month gross",
      surfaceReason: "You want a beautiful child-led environment with occasional structured mornings where parents stay nearby.",
      alternatives: ["Mommy & Me", "Kids Programs"],
      lightestStartingVersion: "Open an indoor/outdoor morning play hour session 1 day per week."
    },
    homeschool_pod: {
      title: "Homeschool Pod",
      subtitle: "Small group collaborative learning environments.",
      description: "Host academic unit blocks, small groups, or learning pods for school-aged kids, offering deep educational autonomy.",
      incomeRange: "$1,500 – $4,000 / month gross",
      surfaceReason: "You bring teaching/tutoring experience, preferred school-aged kids, and structured lessons.",
      alternatives: ["Part-Time Nursery", "Kids Programs"],
      lightestStartingVersion: "Initiate a 2-day afternoon learning block for 3 elementary students."
    },
    nanny_style_care: {
      title: "Nanny-Style Care",
      subtitle: "Dedicated in-home care for a single family.",
      description: "Focus intensely on caring for 1-2 children from a single primary family, blending them naturally alongside your own children.",
      incomeRange: "$2,500 – $4,500 / month gross",
      surfaceReason: "You prefer an intimate, focused 1-family arrangement over a larger group setting.",
      alternatives: ["Home Daycare / Nursery", "Hybrid Model"],
      lightestStartingVersion: "Agree to a custom morning-care schedule with one neighborhood family."
    },
    hybrid_model: {
      title: "Hybrid Model",
      subtitle: "Coordinated custom hours blended for modern lives.",
      description: "A flexible fusion of structured programs with extended or alternative hours tailored to modern work models.",
      incomeRange: "$3,000 – $6,500 / month gross",
      surfaceReason: "Your answers combined stable full-time requirements with flexible or alternative scheduling preferences.",
      alternatives: ["Home Daycare / Nursery", "Drop-In Care"],
      lightestStartingVersion: "Combine regular morning-only slots with pre-booked extended afternoon options."
    }
  }
};