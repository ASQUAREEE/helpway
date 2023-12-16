"use client"

import React, {useEffect, useState} from "react";
import {Language, getLanguageValueFromEnum} from "./Language";
import {LanguageContext} from "@/utils/language/LanguageContext";
import {getLanguageFromCookie, saveLanguageToCookie} from "@/lib/cookies/language/LanguageCookieRequests";

export default function LanguageProvider({children}: { children: React.ReactNode }) {

    const [language, setLanguage] = useState<Language>(Language.ENG);
    const translations = getLanguageValueFromEnum(language)

    function updateLanguage(newLanguage: Language) {
        setLanguage(newLanguage)
        saveLanguageToCookie(newLanguage).then()
    }

    useEffect(() => {
        getLanguageFromCookie().then((language) => {
            setLanguage(language)
        })
    }, [])

    return (
        <LanguageContext.Provider value={{language, translations, updateLanguage}}>{children}</LanguageContext.Provider>
    )
}

