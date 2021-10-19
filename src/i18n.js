import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            "dropzone_prompt": "Drag 'n' drop your files here, or click to select",
            "message_count": "Total message count:",
            "created_at": "Created at:",
            "messages_per_user": "Messages per user:",
            "words_per_user": "Words per user:",
            "most_frequent_words": "Most frequent words:",
            "most_frequent_words_input": "letters",
            "messages_per_year": "Message count per year:",
            "average_word_sentence": "Average number of words per sentence:",
            "images_sent": "Number of images sent:",
            "best_period": "Best period:",
            "worst_period": "Worst period:",
            "year": "Year",
            "month": "Month",
            "day": "Day",
            "period_messages_abbr": "messages"
        }
    },
    pl: {
        translation: {
            "dropzone_prompt": "Przenieś swoje pliki tutaj, albo kliknij by wybrać",
            "message_count": "Liczba wiadomości:",
            "created_at": "Data założenia:",
            "messages_per_user": "Wiadomości na użytkownika:",
            "words_per_user": "Liczba słów na użytkownika:",
            "most_frequent_words": "Najczęściej używane słowa:",
            "most_frequent_words_input": "liter",
            "messages_per_year": "Liczba wiadomości w ciągu roku:",
            "average_word_sentence": "Średnia ilość słów w zdaniu:",
            "images_sent": "Liczba wysłanych obrazków:",
            "best_period": "Najlepszy okres:",
            "worst_period": "Najgorszy okres:",
            "year": "Rok",
            "month": "Miesiąc",
            "day": "Dzień",
            "period_messages_abbr": "wiadomości"
        }
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    interpolation: {
        escapeValue: false,
    }
})
export default i18n
