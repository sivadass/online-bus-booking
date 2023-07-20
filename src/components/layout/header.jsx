const Header = () => {
  return (
    <header className="flex content-center justify-between py-3 border-1 max-w-5xl mx-auto">
      <a href="/" className="flex content-center gap-3">
        <img className="w-12 h-12" src="/obb-logo.svg" alt="OBB Logo" />
        <h1 className="leading-normal">Online Bus Booking</h1>
      </a>

      <a href="/login" className="flex content-center gap-3">
        <span class="material-symbols-outlined">account_circle</span>
        Login/Signup
      </a>
    </header>
  );
};

export default Header;
