import { NavbarDemo } from "../components/Navbar";
import { SignupFormDemo } from "../components/SignupForm";

function SignupPage() {
  return (
    <div>
      <NavbarDemo />
      <div className="flex justify-center items-center h-screen">
        <SignupFormDemo />
      </div>
    </div>
  );
}

export default SignupPage