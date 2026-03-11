//home page with welcome message and navigation options
import NavBar from '../components/NavBar';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <div className="page-container">
        <h1>Welcome to Paws & Personalities</h1>
        <p>Start your journey by taking the quiz or browsing breed profiles.</p>
      </div>
    </>
  );
}
