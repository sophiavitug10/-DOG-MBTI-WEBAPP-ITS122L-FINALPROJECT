export const dogBreeds = [
  {
    id: 1,
    name: 'Golden Retriever',
    image: 'Golden_Retriever.png',
    mbtiType: 'ESFP',
    traits: ['Friendly', 'Outgoing', 'Playful', 'Intelligent'],
    description: 'Golden Retrievers are known for their friendly and tolerant attitudes. They are highly popular family pets and excellent with children.',
    characteristics: [
      'Highly sociable and affectionate',
      'Energetic and playful',
      'Eager to please',
      'Great with families and other pets',
      'Excellent swimmers'
    ],
    compatibility: ['Extroverts', 'Active individuals', 'Families'],
    cardImage: 'Golden_Retriever.png'
  },
  {
    id: 2,
    name: 'German Shepherd',
    image: 'German_Shepherd.png',
    mbtiType: 'ESTJ',
    traits: ['Intelligent', 'Confident', 'Courageous', 'Obedient'],
    description: 'German Shepherds are large, athletic dogs with a noble character and high intelligence. They are confident and extremely versatile.',
    characteristics: [
      'Highly intelligent and trainable',
      'Protective of family',
      'Strong work ethic',
      'Loyal and obedient',
      'Excellent with proper training'
    ],
    compatibility: ['Leaders', 'Organized individuals', 'Active owners'],
    cardImage: 'German_Shepherd.png'
  },
  {
    id: 3,
    name: 'Labrador',
    image: 'Labrador.png',
    mbtiType: 'ESFJ',
    traits: ['Friendly', 'Outgoing', 'Even-tempered', 'Loyal'],
    description: 'Labradors are friendly, outgoing, and even-tempered companions. They are the most popular breed and excel in family settings.',
    characteristics: [
      'Extremely friendly and loyal',
      'Even-tempered and patient',
      'Highly trainable',
      'Excellent with children',
      'Love water activities'
    ],
    compatibility: ['Social people', 'Families', 'Patient owners'],
    cardImage: 'Labrador.png'
  },
  {
    id: 4,
    name: 'Husky',
    image: 'Husky.png',
    mbtiType: 'ENFP',
    traits: ['Energetic', 'Playful', 'Mischievous', 'Independent'],
    description: 'Huskies are energetic and independent dogs with a playful nature. They love being outdoors and thrive in active environments.',
    characteristics: [
      'Extremely energetic',
      'Independent thinkers',
      'Love outdoor activities',
      'Playful and mischievous',
      'Require lots of exercise'
    ],
    compatibility: ['Active people', 'Adventurers', 'Energetic individuals'],
    cardImage: 'Husky.png'
  },
  {
    id: 5,
    name: 'Dobermann',
    image: 'Dobermann.png',
    mbtiType: 'ENTJ',
    traits: ['Alert', 'Intelligent', 'Fearless', 'Loyal'],
    description: 'Dobermanns are alert, intelligent, and fearless dogs. They are loyal and make excellent guard dogs when properly trained.',
    characteristics: [
      'Alert and intelligent',
      'Fearless and protective',
      'Loyal to family',
      'Requires experienced owner',
      'Excellent guard dog'
    ],
    compatibility: ['Confident leaders', 'Experienced dog owners', 'Protection seekers'],
    cardImage: 'Dobermann.png'
  },
  {
    id: 6,
    name: 'French Bulldog',
    image: 'French_Bulldog.png',
    mbtiType: 'ESFP',
    traits: ['Affectionate', 'Playful', 'Adaptable', 'Charming'],
    description: 'French Bulldogs are small, affectionate companions with great personality. They are perfect for apartment living and love human companionship.',
    characteristics: [
      'Small and affectionate',
      'Playful and charming',
      'Adapt well to apartment living',
      'Require minimal exercise',
      'Love being close to owners'
    ],
    compatibility: ['City dwellers', 'Apartment residents', 'Companionship seekers'],
    cardImage: 'French_Bulldog.png'
  },
  {
    id: 7,
    name: 'Pug',
    image: 'Pug.png',
    mbtiType: 'ISFP',
    traits: ['Charming', 'Mischievous', 'Affectionate', 'Lazy'],
    description: 'Pugs are small, charming dogs with big personalities. They are affectionate and enjoy being the center of attention.',
    characteristics: [
      'Charming and mischievous',
      'Affectionate lap dogs',
      'Enjoy lounging',
      'Minimal exercise needs',
      'Great apartment pets'
    ],
    compatibility: ['Quiet individuals', 'Retirees', 'Apartment dwellers'],
    cardImage: 'Pug.png'
  },
  {
    id: 8,
    name: 'Border Collie',
    image: 'Border_Collie.png',
    mbtiType: 'INTJ',
    traits: ['Extremely Intelligent', 'Energetic', 'Focused', 'Driven'],
    description: 'Border Collies are considered the most intelligent dog breed. They are intensely driven and require significant mental stimulation.',
    characteristics: [
      'Exceptionally intelligent',
      'High energy levels',
      'Intense focus and drive',
      'Require mental challenges',
      'Expert herding ability'
    ],
    compatibility: ['Intellectuals', 'Driven individuals', 'Active minds'],
    cardImage: 'Border_Collie.png'
  },
  {
    id: 9,
    name: 'King Charles',
    image: 'King_Charles.png',
    mbtiType: 'ISFJ',
    traits: ['Gentle', 'Affectionate', 'Graceful', 'Sensitive'],
    description: 'King Charles Spaniels are gentle, affectionate, and graceful dogs. They are sensitive to their owner\'s emotions and make excellent companions.',
    characteristics: [
      'Gentle and affectionate',
      'Sensitive to emotions',
      'Graceful and elegant',
      'Enjoy quiet time',
      'Excellent lap dogs'
    ],
    compatibility: ['Sensitive individuals', 'Gentle souls', 'Companion seekers'],
    cardImage: 'King_Charles.png'
  }
];

export const getBreedByMBTI = (mbtiType) => {
  return dogBreeds.find(breed => breed.mbtiType === mbtiType);
};

export const getBreedByName = (name) => {
  return dogBreeds.find(breed => breed.name.toLowerCase() === name.toLowerCase());
};
