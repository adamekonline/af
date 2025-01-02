import { Heart, Smile } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-4 text-center">
      <p className="text-xs text-[#8E9196] flex items-center justify-center gap-1">
        Aplikacja stworzona przez Adama{" "}
        <Heart className="inline-block text-red-500" size={12} fill="currentColor" />{" "}
        do rodziny i pieniędzy{" "}
        <Smile className="inline-block" size={12} />
      </p>
    </footer>
  );
};

export default Footer;