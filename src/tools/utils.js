import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/ru";

dayjs.extend(customParseFormat);

/**
 * Конвертор даты
 * @param {Object} params - объект параметров
 * @param {String} params.date - дата для конвертации
 * @param {String} params.formatString - формат для конвертации
 * @param {String} params.originalFormatString - оригинальный формат, в котором представлена дата
 * @param {String} params.locale - локаль
 *
 * @example
 *      convertDate({
 *			date: '12.05.18',
 *			formatString: 'DD MMM YYYY, dd',
 *			locale: 'ru'
 *		}); // 12 мая 2018, сб
 *
 * @returns {string}
 */
function convertDate(params) {
    const { date, formatString = "YYYY-MM-DDHH:mmZ", originalFormatString, locale = "ru" } = params;
    const formattedDate = dayjs(Number(date), originalFormatString, locale).locale(locale);

    return formattedDate.isValid() ? formattedDate.format(formatString) : "";
}

export { convertDate };
