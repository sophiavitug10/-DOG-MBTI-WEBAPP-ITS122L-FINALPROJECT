export const quizQuestions = [
  {
    id: 1,
    question: 'At a social gathering, you tend to:',
    dimension: 'EI',
    options: [
      { text: 'Mingle and chat with many people', value: 'E' },
      { text: 'Spend time with a few close people', value: 'I' }
    ]
  },
  {
    id: 2,
    question: 'You prefer to focus on:',
    dimension: 'SN',
    options: [
      { text: 'What is real and concrete', value: 'S' },
      { text: 'Possibilities and meanings', value: 'N' }
    ]
  },
  {
    id: 3,
    question: 'When making decisions, you rely more on:',
    dimension: 'TF',
    options: [
      { text: 'Logic and objective analysis', value: 'T' },
      { text: 'Personal values and how it affects people', value: 'F' }
    ]
  },
  {
    id: 4,
    question: 'Your work and life style is:',
    dimension: 'JP',
    options: [
      { text: 'Well-organized and planned', value: 'J' },
      { text: 'Flexible and spontaneous', value: 'P' }
    ]
  },
  {
    id: 5,
    question: 'You feel energized by:',
    dimension: 'EI',
    options: [
      { text: 'Being around people and activities', value: 'E' },
      { text: 'Solitude and quiet reflection', value: 'I' }
    ]
  },
  {
    id: 6,
    question: 'When learning something new, you prefer:',
    dimension: 'SN',
    options: [
      { text: 'Step-by-step practical instructions', value: 'S' },
      { text: 'Understanding the big picture and theory', value: 'N' }
    ]
  },
  {
    id: 7,
    question: 'What matters more to you:',
    dimension: 'TF',
    options: [
      { text: 'Being right and fair', value: 'T' },
      { text: 'Harmony and understanding others', value: 'F' }
    ]
  },
  {
    id: 8,
    question: 'You prefer to approach life:',
    dimension: 'JP',
    options: [
      { text: 'With a clear plan and structure', value: 'J' },
      { text: 'Going with the flow and improvising', value: 'P' }
    ]
  },
  {
    id: 9,
    question: 'In a group, you are more likely to:',
    dimension: 'EI',
    options: [
      { text: 'Be the center of attention', value: 'E' },
      { text: 'Observe and listen', value: 'I' }
    ]
  },
  {
    id: 10,
    question: 'You trust:',
    dimension: 'SN',
    options: [
      { text: 'Your direct experience and senses', value: 'S' },
      { text: 'Your intuition and insight', value: 'N' }
    ]
  },
  {
    id: 11,
    question: 'You believe that:',
    dimension: 'TF',
    options: [
      { text: 'Principles and standards are important', value: 'T' },
      { text: 'Compassion and empathy are most important', value: 'F' }
    ]
  },
  {
    id: 12,
    question: 'You would rather:',
    dimension: 'JP',
    options: [
      { text: 'Finish tasks and complete projects', value: 'J' },
      { text: 'See what other opportunities come up', value: 'P' }
    ]
  },
  {
    id: 13,
    question: 'When facing challenges, you:',
    dimension: 'EI',
    options: [
      { text: 'Talk it through with others', value: 'E' },
      { text: 'Think it through on your own', value: 'I' }
    ]
  },
  {
    id: 14,
    question: 'You pay more attention to:',
    dimension: 'SN',
    options: [
      { text: 'Details and specifics', value: 'S' },
      { text: 'Patterns and connections', value: 'N' }
    ]
  },
  {
    id: 15,
    question: 'In conflicts, you:',
    dimension: 'TF',
    options: [
      { text: 'Focus on finding the most logical solution', value: 'T' },
      { text: 'Try to understand everyone\'s feelings', value: 'F' }
    ]
  },
  {
    id: 16,
    question: 'Your ideal weekend is:',
    dimension: 'JP',
    options: [
      { text: 'Well-planned activities', value: 'J' },
      { text: 'Spontaneous and unscheduled', value: 'P' }
    ]
  }
];

export const calculateMBTI = (answers) => {
  let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;
  
  answers.forEach(answer => {
    const question = quizQuestions.find(q => q.id === answer.questionId);
    
    if (question) {
      switch (answer.value) {
        case 'E':
          E++;
          break;
        case 'I':
          I++;
          break;
        case 'S':
          S++;
          break;
        case 'N':
          N++;
          break;
        case 'T':
          T++;
          break;
        case 'F':
          F++;
          break;
        case 'J':
          J++;
          break;
        case 'P':
          P++;
          break;
        default:
          break;
      }
    }
  });
  
  return {
    E: E > I ? 'E' : 'I',
    S: S > N ? 'S' : 'N',
    T: T > F ? 'T' : 'F',
    J: J > P ? 'J' : 'P'
  };
};

export const getMBTIType = (calculations) => {
  return `${calculations.E}${calculations.S}${calculations.T}${calculations.J}`;
};

export const getTraitScores = (answers) => {
  const scores = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
  };
  
  answers.forEach(answer => {
    if (scores.hasOwnProperty(answer.value)) {
      scores[answer.value]++;
    }
  });
  
  return {
    extroversion: scores.E,
    introversion: scores.I,
    sensing: scores.S,
    intuition: scores.N,
    thinking: scores.T,
    feeling: scores.F,
    judging: scores.J,
    perceiving: scores.P
  };
};
