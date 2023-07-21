import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import HomePage from "./pages/index";

function App() {
  return (
    <div className="">
      <Header />
      <main className="py-3 max-w-5xl mx-auto">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
