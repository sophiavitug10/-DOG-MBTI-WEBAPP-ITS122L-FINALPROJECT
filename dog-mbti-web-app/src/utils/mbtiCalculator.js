import { calculateMBTI, getMBTIType, getTraitScores } from '../data/questions';
import { getBreedByMBTI } from '../data/breeds';

export const processDogMBTIQuiz = (answers) => {
  // Calculate MBTI type from answers
  const calculations = calculateMBTI(answers);
  const mbtiType = getMBTIType(calculations);
  
  // Get compatible dog breed
  const compatibleBreed = getBreedByMBTI(mbtiType);
  
  // Get detailed trait scores
  const traitScores = getTraitScores(answers.map(a => a.value));
  
  return {
    mbtiType,
    compatibleBreed,
    traitScores,
    calculations
  };
};

export const getMBTIDescription = (mbtiType) => {
  const descriptions = {
    'ESTJ': 'The Executive - Organized, practical, and driven',
    'ESTP': 'The Entrepreneur - Bold, adaptable, and action-oriented',
    'ESFJ': 'The Consul - Warm, conscientious, and loyal',
    'ESFP': 'The Entertainer - Outgoing, spontaneous, and fun-loving',
    'ISTJ': 'The Logistician - Responsible, dependable, and practical',
    'ISTP': 'The Virtuoso - Analytical, logical, and adaptable',
    'ISFJ': 'The Defender - Supportive, protective, and dedicated',
    'ISFP': 'The Adventurer - Sensitive, flexible, and artistic',
    'ENTJ': 'The Commander - Strategic, determined, and ambitious',
    'ENTP': 'The Debater - Innovative, clever, and curious',
    'ENFJ': 'The Protagonist - Charismatic, inspiring, and decisive',
    'ENFP': 'The Campaigner - Enthusiastic, creative, and spontaneous',
    'INTJ': 'The Architect - Independent, strategic, and analytical',
    'INTP': 'The Logician - Curious, logical, and inventive',
    'INFJ': 'The Advocate - Insightful, compassionate, and dedicated',
    'INFP': 'The Mediator - Idealistic, creative, and passionate'
  };
  
  return descriptions[mbtiType] || 'Unknown Type';
};

export const getMultipleCompatibleBreeds = (mbtiType) => {
  // In future, can expand to return multiple compatible breeds
  // based on personality similarities
  const primaryBreed = getBreedByMBTI(mbtiType);
  return primaryBreed ? [primaryBreed] : [];
};
