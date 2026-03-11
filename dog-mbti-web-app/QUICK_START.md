# Quick Start Guide - Dog MBTI Web App

## Installation Steps

### 1. Install Missing Dependencies
The project uses Charts.js for visualization. Install it with:

```bash
cd dog-mbti-web-app
npm install chart.js react-chartjs-2
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in terminal)

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy to Vercel
- Follow [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md)
- Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel environment variables

---

## App Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | AuthPage | Login/Signup |
| `/home` | HomePage | Home with carousel & features |
| `/quiz` | QuizPage | MBTI Quiz (16 questions) |
| `/results` | ResultsPage | Quiz results with charts |
| `/breeds` | BreedProfiles | Browse all breeds with carousel |
| `/admin/*` | Admin pages | Admin dashboard & management |

---

## User Journey

### 1. **Home Page** (`/home`)
- Welcome section with hero gradient
- Carousel showcasing dog breeds
- Feature cards explaining benefits
- Call-to-action: "Start the Quiz Now"

**Navigation:** Click "Start the Quiz Now" → Quiz Page

### 2. **Quiz Page** (`/quiz`)
- 16 MBTI personality questions
- Progress bar showing completion %
- Previous/Next navigation
- One question displayed at a time
- Auto-submits on last answer

**Navigation:** Answer all questions → Results Page

### 3. **Results Page** (`/results`)
- Your MBTI type display (e.g., ESFP)
- Compatible dog breed card with image
- Bar chart showing trait breakdown:
  - Extroversion vs Introversion
  - Sensing vs Intuition
  - Thinking vs Feeling
  - Judging vs Perceiving
- Detailed personality analysis
- Buttons to retake quiz or explore breeds

**Navigation:** 
- "Retake Quiz" → Quiz Page (resets answer)
- "Explore All Breeds" → Breed Profiles

### 4. **Breed Profiles** (`/breeds`)
- Top carousel gallery of all 9 breeds
- Click any breed image to scroll to detailed section
- Forum-like detailed profile for each breed:
  - Full description & MBTI type
  - Key traits with gradient badges
  - Characteristics list with checkmarks
  - Compatibility information
  - Community thoughts placeholder
- Quick comparison table at bottom
- Back to carousel button on each profile

---

## Customize Dog Breeds

To add/modify dog breeds, edit `src/data/breeds.js`:

```javascript
{
  id: 1,
  name: 'Breed Name',
  image: 'Breed_Name.png', // Must exist in src/assets/
  mbtiType: 'ESFP',
  traits: ['Trait1', 'Trait2', 'Trait3', 'Trait4'],
  description: 'Brief description...',
  characteristics: [
    'Characteristic 1',
    'Characteristic 2',
    'Characteristic 3'
  ],
  compatibility: ['Group type 1', 'Group type 2'],
  cardImage: 'Breed_Name.png'
}
```

---

## Customize Quiz Questions

To add/modify quiz questions, edit `src/data/questions.js`:

```javascript
{
  id: 1,
  question: 'Your question here?',
  dimension: 'EI', // E/I, S/N, T/F, or J/P
  options: [
    { text: 'Option A', value: 'E' }, // or I, S, N, T, F, J, P
    { text: 'Option B', value: 'I' }
  ]
}
```

---

## How MBTI Calculation Works

1. User answers 16 questions
2. Each answer contributes to one MBTI dimension
3. Dimension with more votes wins (E vs I, S vs N, etc.)
4. Final 4-letter type is determined (e.g., ESFP)
5. System finds matching dog breed with same MBTI
6. Results displayed with full breakdown

**Example:**
- 5 Extroversion answers vs 2 Introversion → E
- 4 Sensing vs 3 Intuition → S
- 5 Feeling vs 2 Thinking → F
- 4 Perceiving vs 3 Judging → P
- **Result: ESFP** (matches Golden Retriever or French Bulldog)

---

## Available Dog Breeds

1. Golden Retriever - ESFP
2. German Shepherd - ESTJ
3. Labrador - ESFJ
4. Husky - ENFP
5. Dobermann - ENTJ
6. French Bulldog - ESFP
7. Pug - ISFP
8. Border Collie - INTJ
9. King Charles - ISFJ

---

## Styling & Color Scheme

**Primary Colors:**
- Purple Gradient: `#667eea` to `#764ba2`
- Light Blue: `#e8f0ff`
- Dark Gray: `#333`
- Light Gray: `#f0f0f0`

All CSS in `src/styles/` folder:
- HomePage.css
- QuizPage.css
- ResultsPage.css
- BreedProfiles.css

---

## Troubleshooting

### Chart not displaying
**Solution:** Install chart.js and react-chartjs-2
```bash
npm install chart.js react-chartjs-2
```

### Images not loading
**Solution:** Check image files exist in `src/assets/` with correct names

### Quiz not saving results
**Solution:** Ensure QuizProvider wraps the app in App.jsx (already done)

### Navigation not working
**Solution:** Check that all routes added to App.jsx (already done)

---

## Future Enhancements

- Add backend API for data persistence
- Add authentication & user accounts
- Add comment system for breed profiles
- Add personality history tracking
- Add breed filtering/search
- Add more dog breeds
- Add social sharing of results
- Add mobile app version
