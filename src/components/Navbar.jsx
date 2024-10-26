import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/'>
        <p className="red-gradient_text">Portraitstone</p>
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-200" : "text-black" }>
          MBTI
        </NavLink>
        <NavLink to='/projects' className={({ isActive }) => isActive ? "text-blue-200" : "text-black"}>
          News FAQs & Gaming
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;