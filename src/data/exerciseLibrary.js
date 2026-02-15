/**
 * Comprehensive Exercise Library organized by body parts
 */

export const BODY_PARTS = {
  CHEST: 'Chest',
  BACK: 'Back',
  SHOULDERS: 'Shoulders',
  BICEPS: 'Biceps',
  TRICEPS: 'Triceps',
  LEGS: 'Legs',
  ABS: 'Abs',
  GLUTES: 'Glutes',
  FOREARMS: 'Forearms',
  CARDIO: 'Cardio',
  FULL_BODY: 'Full Body'
}

export const EXERCISE_LIBRARY = {
  [BODY_PARTS.CHEST]: [
    { name: 'Bench Press', variations: ['Flat Barbell', 'Incline Barbell', 'Decline Barbell', 'Flat Dumbbell', 'Incline Dumbbell', 'Decline Dumbbell'] },
    { name: 'Push-ups', variations: ['Standard', 'Wide Grip', 'Diamond', 'Decline', 'Incline', 'Clap'] },
    { name: 'Chest Fly', variations: ['Dumbbell Flat', 'Dumbbell Incline', 'Cable', 'Pec Deck Machine'] },
    { name: 'Dips', variations: ['Chest Focused', 'Weighted', 'Assisted'] },
    { name: 'Cable Crossover', variations: ['High to Low', 'Low to High', 'Middle'] },
    { name: 'Chest Press Machine', variations: ['Flat', 'Incline', 'Decline'] },
    { name: 'Landmine Press', variations: ['Single Arm', 'Double Arm'] },
    { name: 'Svend Press', variations: ['Standing', 'Seated'] }
  ],

  [BODY_PARTS.BACK]: [
    { name: 'Pull-ups', variations: ['Wide Grip', 'Close Grip', 'Neutral Grip', 'Weighted', 'Assisted'] },
    { name: 'Lat Pulldown', variations: ['Wide Grip', 'Close Grip', 'Neutral Grip', 'Single Arm'] },
    { name: 'Barbell Row', variations: ['Bent Over', 'Pendlay', 'Underhand', 'Yates Row'] },
    { name: 'Dumbbell Row', variations: ['Single Arm', 'Both Arms', 'Chest Supported'] },
    { name: 'T-Bar Row', variations: ['Close Grip', 'Wide Grip', 'V-Handle'] },
    { name: 'Cable Row', variations: ['Seated', 'Single Arm', 'Wide Grip', 'Close Grip'] },
    { name: 'Deadlift', variations: ['Conventional', 'Sumo', 'Romanian', 'Stiff Leg', 'Trap Bar'] },
    { name: 'Face Pulls', variations: ['Rope', 'Bands'] },
    { name: 'Shrugs', variations: ['Barbell', 'Dumbbell', 'Trap Bar'] },
    { name: 'Reverse Fly', variations: ['Dumbbell', 'Cable', 'Machine'] }
  ],

  [BODY_PARTS.SHOULDERS]: [
    { name: 'Overhead Press', variations: ['Barbell Standing', 'Barbell Seated', 'Dumbbell Standing', 'Dumbbell Seated', 'Arnold Press'] },
    { name: 'Lateral Raise', variations: ['Dumbbell', 'Cable', 'Machine', 'Single Arm'] },
    { name: 'Front Raise', variations: ['Dumbbell', 'Barbell', 'Cable', 'Plate'] },
    { name: 'Rear Delt Fly', variations: ['Dumbbell Bent Over', 'Cable', 'Machine', 'Reverse Pec Deck'] },
    { name: 'Upright Row', variations: ['Barbell', 'Dumbbell', 'Cable'] },
    { name: 'Pike Push-ups', variations: ['Standard', 'Elevated Feet', 'Handstand'] },
    { name: 'Shoulder Press Machine', variations: ['Seated', 'Standing'] },
    { name: 'Face Pulls', variations: ['Rope', 'Bands'] }
  ],

  [BODY_PARTS.BICEPS]: [
    { name: 'Barbell Curl', variations: ['Standing', 'EZ Bar', 'Wide Grip', 'Close Grip', 'Preacher'] },
    { name: 'Dumbbell Curl', variations: ['Standing Alternating', 'Standing Together', 'Seated', 'Hammer', 'Incline'] },
    { name: 'Cable Curl', variations: ['Straight Bar', 'EZ Bar', 'Rope', 'Single Arm'] },
    { name: 'Concentration Curl', variations: ['Seated', 'Standing'] },
    { name: 'Preacher Curl', variations: ['Barbell', 'Dumbbell', 'EZ Bar', 'Cable'] },
    { name: 'Chin-ups', variations: ['Standard', 'Weighted', 'Assisted'] },
    { name: '21s', variations: ['Barbell', 'Dumbbell', 'Cable'] },
    { name: 'Zottman Curl', variations: ['Standing', 'Seated'] }
  ],

  [BODY_PARTS.TRICEPS]: [
    { name: 'Close Grip Bench Press', variations: ['Barbell', 'Dumbbell', 'Smith Machine'] },
    { name: 'Tricep Dips', variations: ['Bodyweight', 'Weighted', 'Assisted', 'Bench'] },
    { name: 'Tricep Pushdown', variations: ['Rope', 'Straight Bar', 'V-Bar', 'Single Arm'] },
    { name: 'Overhead Extension', variations: ['Dumbbell Single Arm', 'Dumbbell Both Arms', 'Barbell', 'Cable', 'EZ Bar'] },
    { name: 'Skull Crushers', variations: ['Barbell', 'Dumbbell', 'EZ Bar', 'Cable'] },
    { name: 'Kickbacks', variations: ['Dumbbell', 'Cable'] },
    { name: 'Diamond Push-ups', variations: ['Standard', 'Elevated', 'Decline'] },
    { name: 'Tricep Extension Machine', variations: ['Seated', 'Standing'] }
  ],

  [BODY_PARTS.LEGS]: [
    { name: 'Squat', variations: ['Barbell Back', 'Barbell Front', 'Goblet', 'Bulgarian Split', 'Hack', 'Sumo'] },
    { name: 'Leg Press', variations: ['Standard', 'Single Leg', 'Wide Stance', 'Close Stance'] },
    { name: 'Lunges', variations: ['Walking', 'Reverse', 'Forward', 'Lateral', 'Curtsy', 'Jumping'] },
    { name: 'Leg Extension', variations: ['Machine', 'Single Leg'] },
    { name: 'Leg Curl', variations: ['Lying', 'Seated', 'Standing Single Leg'] },
    { name: 'Romanian Deadlift', variations: ['Barbell', 'Dumbbell', 'Single Leg'] },
    { name: 'Step-ups', variations: ['Bodyweight', 'Dumbbell', 'Barbell'] },
    { name: 'Calf Raise', variations: ['Standing', 'Seated', 'Single Leg', 'Donkey'] },
    { name: 'Box Jumps', variations: ['Standard', 'Single Leg', 'Depth Jumps'] },
    { name: 'Wall Sit', variations: ['Standard', 'Single Leg', 'Weighted'] }
  ],

  [BODY_PARTS.GLUTES]: [
    { name: 'Hip Thrust', variations: ['Barbell', 'Dumbbell', 'Single Leg', 'Banded'] },
    { name: 'Glute Bridge', variations: ['Bodyweight', 'Barbell', 'Single Leg', 'Elevated'] },
    { name: 'Cable Kickbacks', variations: ['Standing', 'Kneeling'] },
    { name: 'Fire Hydrants', variations: ['Bodyweight', 'Banded'] },
    { name: 'Donkey Kicks', variations: ['Bodyweight', 'Banded', 'Cable'] },
    { name: 'Sumo Deadlift', variations: ['Barbell', 'Dumbbell'] },
    { name: 'Step-ups', variations: ['High Box', 'Lateral', 'Curtsy'] }
  ],

  [BODY_PARTS.ABS]: [
    { name: 'Crunches', variations: ['Standard', 'Bicycle', 'Reverse', 'Cable', 'Weighted'] },
    { name: 'Plank', variations: ['Standard', 'Side', 'Walking', 'Up-Down', 'RKC'] },
    { name: 'Leg Raises', variations: ['Lying', 'Hanging', 'Captain\'s Chair', 'Single Leg'] },
    { name: 'Russian Twist', variations: ['Bodyweight', 'Weighted', 'Medicine Ball'] },
    { name: 'Mountain Climbers', variations: ['Standard', 'Cross Body', 'Slow'] },
    { name: 'Ab Wheel Rollout', variations: ['Kneeling', 'Standing', 'Single Arm'] },
    { name: 'Dead Bug', variations: ['Standard', 'Weighted', 'Banded'] },
    { name: 'Hollow Hold', variations: ['Standard', 'Rock'] },
    { name: 'Cable Woodchop', variations: ['High to Low', 'Low to High'] },
    { name: 'V-ups', variations: ['Standard', 'Single Leg', 'Weighted'] }
  ],

  [BODY_PARTS.FOREARMS]: [
    { name: 'Wrist Curl', variations: ['Barbell', 'Dumbbell', 'Reverse'] },
    { name: 'Farmer\'s Walk', variations: ['Dumbbell', 'Trap Bar', 'Single Arm'] },
    { name: 'Dead Hang', variations: ['Standard', 'One Arm', 'Weighted'] },
    { name: 'Reverse Curl', variations: ['Barbell', 'Dumbbell', 'EZ Bar'] },
    { name: 'Plate Pinch', variations: ['Static Hold', 'Walking'] },
    { name: 'Gripper', variations: ['Standard', 'Heavy', 'Timed Holds'] }
  ],

  [BODY_PARTS.CARDIO]: [
    { name: 'Running', variations: ['Treadmill', 'Outdoor', 'Intervals', 'Sprints'] },
    { name: 'Cycling', variations: ['Stationary Bike', 'Outdoor', 'Spin Class', 'HIIT'] },
    { name: 'Rowing', variations: ['Machine', 'Outdoor', 'Intervals'] },
    { name: 'Jump Rope', variations: ['Single Under', 'Double Under', 'Intervals'] },
    { name: 'Burpees', variations: ['Standard', 'Box Jump', 'Pull-up'] },
    { name: 'Battle Ropes', variations: ['Waves', 'Slams', 'Circles'] },
    { name: 'Swimming', variations: ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly'] },
    { name: 'Elliptical', variations: ['Forward', 'Reverse', 'HIIT'] }
  ],

  [BODY_PARTS.FULL_BODY]: [
    { name: 'Burpees', variations: ['Standard', 'Box Jump', 'Pull-up', 'Dumbbell'] },
    { name: 'Clean and Press', variations: ['Barbell', 'Dumbbell', 'Kettlebell'] },
    { name: 'Thrusters', variations: ['Barbell', 'Dumbbell'] },
    { name: 'Turkish Get-up', variations: ['Kettlebell', 'Dumbbell'] },
    { name: 'Man Makers', variations: ['Dumbbell', 'Kettlebell'] },
    { name: 'Bear Crawls', variations: ['Forward', 'Backward', 'Lateral'] },
    { name: 'Kettlebell Swings', variations: ['Two Arm', 'Single Arm', 'American'] }
  ]
}

// Flatten all exercises for easy searching
export const getAllExercises = () => {
  const allExercises = []
  Object.entries(EXERCISE_LIBRARY).forEach(([bodyPart, exercises]) => {
    exercises.forEach(exercise => {
      allExercises.push({
        name: exercise.name,
        bodyPart,
        variations: exercise.variations
      })
    })
  })
  return allExercises
}

// Search exercises by name
export const searchExercises = (query) => {
  if (!query || query.trim() === '') return []

  const allExercises = getAllExercises()
  const searchTerm = query.toLowerCase().trim()

  return allExercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm) ||
    exercise.bodyPart.toLowerCase().includes(searchTerm)
  )
}

// Get exercises by body part
export const getExercisesByBodyPart = (bodyPart) => {
  return EXERCISE_LIBRARY[bodyPart] || []
}
