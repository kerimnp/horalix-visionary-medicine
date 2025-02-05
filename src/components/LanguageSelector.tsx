import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "bs", name: "Bosanski", flag: "🇧🇦" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
] as const;

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useTranslation();

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
            onClick={() => setLanguage(language.code)}
            className={`flex items-center gap-2.5 cursor-pointer py-2 ${
              currentLanguage === language.code ? 'bg-medical-electric/10' : ''
            }`}
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