import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  to?: string; // optional path — if not provided, goes back (-1)
}

export const BackButton = ({ label = "Back", to }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center text-ev-blue hover:text-ev-green transition-colors mb-4"
    >
      <ArrowLeft className="h-5 w-5 mr-1" />
      <span className="font-medium">{label}</span>
    </button>
  );
};
