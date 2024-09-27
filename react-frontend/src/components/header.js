import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link class="logo-link" to="~jogo19/editor/">
        <h1>SSR Editor</h1>
      </Link>
    </header>
  );
}

export default Header;
