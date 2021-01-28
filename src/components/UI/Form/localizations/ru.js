export default function localize_ru(errors) {
    if (!(errors && errors.length)) return;

    for (let error of errors) {
        let outMessage = "";

        switch (error.name) {
            case "$ref": {
                outMessage = "не найдена схема " + error.params.ref;

                break;
            }
            case "additionalItems": {
                const n = error.params.limit;

                outMessage = "";
                outMessage += "должно иметь не более, чем " + n + " элемент";

                if (n >= 2 && n <= 4) {
                    outMessage += "а";
                } else if (n !== 1) {
                    outMessage += "ов";
                }

                break;
            }
            case "additionalProperties": {
                outMessage = "не должно иметь дополнительные поля";

                break;
            }
            case "anyOf": {
                outMessage = 'должно соответствовать одной их схем в "anyOf"';

                break;
            }
            case "const": {
                outMessage = "должно быть равно заданному значению";

                break;
            }
            case "contains": {
                outMessage = "должно содержать значение соответствующее схеме";

                break;
            }
            case "custom": {
                outMessage = 'должно соответствовать правилу "' + error.name + '"';

                break;
            }
            case "dependencies": {
                const n = error.params.depsCount;

                outMessage = "";
                outMessage += "должно иметь пол";

                if (n === 1) {
                    outMessage += "е";
                } else {
                    outMessage += "я";
                }

                outMessage += " " + error.params.deps + ", когда присутствует поле " + error.params.property;

                break;
            }
            case "enum": {
                outMessage = 'должно быть равен одному из значений в "enum"';

                break;
            }
            case "exclusiveMaximum": {
                const cond = error.params.comparison + " " + error.params.limit;

                outMessage = "";
                outMessage += "должно быть " + cond;

                break;
            }
            case "exclusiveMinimum": {
                const cond = error.params.comparison + " " + error.params.limit;

                outMessage = "";
                outMessage += "должно быть " + cond;

                break;
            }
            case "false schema": {
                outMessage = "схема равна false";

                break;
            }
            case "format": {
                if (error.params.format === "email") {
                    outMessage = "введите валидный email";

                    break;
                }

                outMessage = 'должно соответствовать формату "' + error.params.format + '"';

                break;
            }
            case "formatExclusiveMaximum": {
                outMessage = "formatExclusiveMaximum должно быть boolean";

                break;
            }
            case "formatExclusiveMinimum": {
                outMessage = "formatExclusiveMinimum должно быть boolean";

                break;
            }
            case "formatMaximum": {
                const cond = error.params.comparison + " " + error.params.limit;

                outMessage = "";
                outMessage += "должно быть " + cond;

                break;
            }
            case "formatMinimum": {
                const cond = error.params.comparison + " " + error.params.limit;

                outMessage = "";
                outMessage += "должно быть " + cond;

                break;
            }
            case "if": {
                outMessage = 'должно соответствовать схемe "' + error.params.failingKeyword + '"';

                break;
            }
            case "maximum": {
                const cond = error.params.comparison + " " + error.params.limit;

                outMessage = "";
                outMessage += "должно быть " + cond;

                break;
            }
            case "maxItems": {
                const n = error.params.limit;

                outMessage = "";
                outMessage += "должно иметь не более, чем " + n + " элемент";

                if (n >= 2 && n <= 4) {
                    outMessage += "а";
                } else if (n !== 1) {
                    outMessage += "ов";
                }

                break;
            }
            case "maxLength": {
                const n = error.params.limit;

                outMessage = "";
                outMessage += "должно быть не длиннее, чем " + n + " символ";

                if (n >= 2 && n <= 4) {
                    outMessage += "а";
                } else if (n !== 1) {
                    outMessage += "ов";
                }

                break;
            }
            case "maxProperties": {
                const n = error.params.limit;

                outMessage = "";
                outMessage += "должно иметь не более, чем " + n + " пол";

                if (n === 1) {
                    outMessage += "е";
                } else if (n >= 2 && n <= 4) {
                    outMessage += "я";
                } else {
                    outMessage += "ей";
                }

                break;
            }
            case "minimum": {
                const cond = error.params.comparison + " " + error.params.limit;
                outMessage = "";
                outMessage += "должно быть " + cond;

                break;
            }
            case "minItems": {
                const n = error.params.limit;

                outMessage = "";
                outMessage += "должно иметь не менее, чем " + n + " элемент";

                if (n >= 2 && n <= 4) {
                    outMessage += "а";
                } else if (n !== 1) {
                    outMessage += "ов";
                }

                break;
            }
            case "minLength": {
                const n = error.params.limit;

                outMessage = "";
                outMessage += "должно быть не короче, чем " + n + " символ";

                if (n >= 2 && n <= 4) {
                    outMessage += "а";
                } else if (n !== 1) {
                    outMessage += "ов";
                }

                break;
            }
            case "minProperties": {
                const n = error.params.limit;

                outMessage = "";
                outMessage += "должно иметь не менее, чем " + n + " пол";

                if (n === 1) {
                    outMessage += "е";
                } else if (n >= 2 && n <= 4) {
                    outMessage += "я";
                } else {
                    outMessage += "ей";
                }

                break;
            }
            case "multipleOf": {
                outMessage = "должно быть кратным " + error.params.multipleOf;

                break;
            }
            case "not": {
                outMessage = 'должно не соответствовать схеме в "not"';

                break;
            }
            case "oneOf": {
                outMessage = 'должно соответствовать в точности одной схемe в "oneOf"';

                break;
            }
            case "pattern": {
                outMessage = 'должно соответствовать образцу "' + error.params.pattern + '"';

                break;
            }
            case "patternRequired": {
                outMessage = 'должно иметь поле, соответствующее образцу "' + error.params.missingPattern + '"';

                break;
            }
            case "propertyNames": {
                outMessage = "имя поля '" + error.params.propertyName + "' не соответствует схеме";

                break;
            }
            case "required": {
                outMessage = "поле обязательно для заполнения";

                break;
            }
            case "switch": {
                outMessage = "должно соответствовать правилу " + error.params.caseIndex + ' в "switch"';

                break;
            }
            case "type": {
                outMessage = "должно быть " + error.params.type;

                break;
            }
            case "uniqueItems": {
                outMessage =
                    "не должно иметь повторяющихся элементов (элементы " +
                    error.params.j +
                    " и " +
                    error.params.i +
                    " идентичны)";

                break;
            }
            default:
        }

        error.message = outMessage;
    }
}
