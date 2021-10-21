import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            "title": "Inspector for Messenger",
            "dropzone_files": "Loaded {{count}} files",
            "dropzone_prompt": "Drag 'n' drop your .json files here, or click to select",
            "dropzone_drag_prompt": "Drop your files here...",
            "message_count": "Total message count:",
            "created_at": "Created at:",
            "messages_per_user": "Messages per user:",
            "words_per_user": "Words per user:",
            "most_frequent_words": "Most frequent words:",
            "most_frequent_words_input": "letters",
            "messages_per_year": "Message count per year:",
            "average_word_sentence": "Average number of words per sentence:",
            "media_sent": "Number of non-text messages:",
            "best_period": "Best period:",
            "worst_period": "Worst period:",
            "year": "Year",
            "month": "Month",
            "day": "Day",
            "period_messages_abbr": "messages",
            "average_day_activity": "Average daily activity",
            "search_word_frequency": "Search word frequency"
        }
    },
    pl: {
        translation: {
            "title": "Inspector dla Messenger",
            "dropzone_files": "Załadowano {{count}} plików",
            "dropzone_prompt": "Przenieś swoje pliki .json tutaj, albo kliknij by wybrać",
            "dropzone_drag_prompt": "Upuść swoje pliki tutaj...",
            "message_count": "Liczba wiadomości:",
            "created_at": "Data założenia:",
            "messages_per_user": "Wiadomości na użytkownika:",
            "words_per_user": "Liczba słów na użytkownika:",
            "most_frequent_words": "Najczęściej używane słowa:",
            "most_frequent_words_input": "liter",
            "messages_per_year": "Liczba wiadomości w skali roku:",
            "average_word_sentence": "Średnia ilość słów w zdaniu:",
            "media_sent": "Liczba wiadomości nietekstowych:",
            "best_period": "Najlepszy okres:",
            "worst_period": "Najgorszy okres:",
            "year": "Rok",
            "month": "Miesiąc",
            "day": "Dzień",
            "period_messages_abbr": "wiadomości",
            "average_day_activity": "Średnia aktywność w ciągu dnia",
            "search_word_frequency": "Wyszukaj częstotliwość słowa"
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
