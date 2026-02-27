import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import i18next from 'i18next';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);

const setDayjsLocale = () => {
    const currentLang = i18next.language;
    dayjs.locale(currentLang);
};

export function fDate(date: string | number | Date) {
    if (!date) return '';
    setDayjsLocale();
    return dayjs(date).format('DD MMMM YYYY');
}

export function fDateTime(date: string | number | Date) {
    if (!date) return '';
    setDayjsLocale();
    return dayjs(date).format('DD MMM YYYY hh:mm A');
}

export function fToNow(date: string | number | Date) {
    if (!date) return '';
    setDayjsLocale();
    return dayjs(date).fromNow();
}