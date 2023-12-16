import {translation} from "@/ui/translations/translation";
import {Language} from "./Language";
import React, {createContext} from "react";

interface LanguageContextType {
    language: Language;
    translations: translation;
    updateLanguage: (newLanguage: Language) => void
}

export const LanguageContext: React.Context<LanguageContextType | undefined> = createContext<LanguageContextType | undefined>(undefined);
