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
          size="sm" 
          className="h-8 px-2 text-sm font-normal hover:bg-medical-electric/5"
        >
          <Globe className="h-4 w-4 mr-1" />
          <span className="text-xs">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center gap-2 cursor-pointer text-sm py-1.5"
          >
            <span>{language.flag}</span>
            <span className="text-xs">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}