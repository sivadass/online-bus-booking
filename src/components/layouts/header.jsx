const Header = () => {
  return (
    <header className="bg-gray-light py-5 border-1">
      <div className="container flex content-center justify-between max-w-5xl mx-auto flex-wrap">
        <a href="/">
          <div className="flex content-center flex-wrap gap-3">
            <img className="w-8 h-8" src="/obb-logo.svg" alt="OBB Logo" />
            <h1 className="text-xl leading-normal">Online Bus Booking</h1>
          </div>
        </a>

        <div className="flex content-center flex-wrap gap-5">
          <a href="tel:+919898981234" className="my-1">
            <div className="flex content-center flex-wrap gap-2">
              <span className="material-symbols-outlined">call</span>
              <span>+91-98989-81234</span>
            </div>
          </a>
          <a href="/login" className="my-1">
            <div className="flex content-center flex-wrap gap-2">
              <span className="material-symbols-outlined">account_circle</span>
              <span>Login/Signup</span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
