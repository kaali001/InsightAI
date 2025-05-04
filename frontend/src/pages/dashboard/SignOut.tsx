
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add logout logic here
    console.log("Signing out...");
    navigate("/login");
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Are you sure you want to sign out?</h2>
      <Button onClick={handleSignOut} >Sign Out</Button>
    </div>
  );
};

export default SignOut;
