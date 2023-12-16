'use server'

import {cookies} from 'next/headers'
import {getLanguageValueFromCountryCode, getLanguageValueFromId, Language} from "@/utils/language/Language";
import {isDevelop} from "@/utils/Config";

const cookieName = "language"
const ipCheckerRequest = "https://ipapi.co/json/"

type IpCountry = {
    country: string
}

export async function getLanguageFromCookie(): Promise<Language> {
    const languageId = cookies().get(cookieName)?.value
    if (isDevelop) {
        console.log(`Cookie: Current language selected: ${languageId}`)
    }
    if (languageId) {
        return getLanguageValueFromId(languageId)
    } else {
        return getLanguageFromIP()
    }
}

export async function saveLanguageToCookie(language: Language): Promise<void> {
    if (isDevelop) {
        console.log(`Cookie: New language save to cookie: ${language.toString()}`)
    }
    cookies().set(
        cookieName,
        language.toString(),
        {httpOnly: true}
    )
}

async function getLanguageFromIP(): Promise<Language> {
    if (isDevelop) {
        console.log(`Cookie: Try get language from country code`)
    }
    const res = await fetch(ipCheckerRequest)
    const repo = await res.json() as IpCountry
    if (isDevelop) {
        console.log(`Cookie: Result of country ip check. Country: ${repo.country}`)
    }
    const language = getLanguageValueFromCountryCode(repo.country)
    saveLanguageToCookie(language).then()
    return language
}