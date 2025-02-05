import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const languages = [
  { code: "", name: "Bosanski", flag: "🇧🇦" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
];

export function LanguageSelector() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const currentLangCode = currentPath.split('/')[1] || '';
  
  const handleLanguageChange = (langCode: string) => {
    const newPath = langCode ? `/${langCode}` : '/';
    navigate(newPath);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLangCode) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="w-9 h-9 hover:bg-medical-electric/5"
        >
          <Globe className="h-[1.2rem] w-[1.2rem] text-medical-deep/70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[140px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center gap-2.5 cursor-pointer py-2"
          >
            <span className="text-base">{language.flag}</span>
            <span className="text-sm font-medium text-medical-deep/80">
              {language.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}