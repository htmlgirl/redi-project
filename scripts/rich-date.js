export var TimeUnits;
(function (TimeUnits) {
    TimeUnits["YEARS"] = "YEARS";
    TimeUnits["MONTHS"] = "MONTHS";
    TimeUnits["DAYS"] = "DAYS";
    TimeUnits["HOURS"] = "HOURS";
    TimeUnits["MINUTES"] = "MINUTES";
    TimeUnits["SECONDS"] = "SECONDS";
})(TimeUnits || (TimeUnits = {}));
export var DateFormats;
(function (DateFormats) {
    DateFormats["DD.MM.YYYY"] = "DD.MM.YYYY";
    DateFormats["DD-MM-YYYY"] = "DD-MM-YYYY";
    DateFormats["DD.MM.YYYY HH:mm:ss"] = "DD.MM.YYYY HH:mm:ss";
    DateFormats["DD-MM-YYYY HH:mm:ss"] = "DD-MM-YYYY HH:mm:ss";
})(DateFormats || (DateFormats = {}));
var ChangeActions;
(function (ChangeActions) {
    ChangeActions["ADD"] = "ADD";
    ChangeActions["SUBTRACT"] = "SUBTRACT";
})(ChangeActions || (ChangeActions = {}));
class RichDate extends Date {
    /**
     * Transform RichDate object to string with specific pattern
     * @param outputDateFormat {DateFormats | string} - specific pattern for resulting string
     * @returns {string}
     * Pattern abbreviations:
     *  YYYY - years,
     *  MM - months,
     *  DD - days,
     *  HH - hours,
     *  mm - minutes,
     *  ss - seconds
     */
    format(outputDateFormat = DateFormats['DD.MM.YYYY']) {
        const particlesOfTime = {
            YYYY: String(this.getFullYear()),
            MM: String(this.getMonth() + 1).padStart(2, '0'),
            DD: String(this.getDate()).padStart(2, '0'),
            HH: String(this.getHours()).padStart(2, '0'),
            mm: String(this.getMinutes()).padStart(2, '0'),
            ss: String(this.getSeconds()).padStart(2, '0')
        };
        return Object.keys(particlesOfTime).reduce((resultStr, key) => {
            return resultStr.replace(key, particlesOfTime[key]);
        }, outputDateFormat);
    }
    /**
     * Get the difference between RichDate and date from "dateForComparing" parameter, in required units
     * @param dateForComparing {RichDate | Date} - date to compare with RichDate
     * @param timeUnits {TimeUnits | string} - units for result value. Possible values: 'YEARS', 'MONTHS' or 'DAYS'
     * @param useDecimal {boolean} - default value FALSE. If you set TRUE, you will receive more precise result
     * @returns {number}
     */
    diff(dateForComparing, timeUnits = TimeUnits.YEARS, useDecimal = false) {
        switch (timeUnits) {
            case TimeUnits.YEARS:
                let differenceInYears = (this.getFullYear() - dateForComparing.getFullYear());
                if (useDecimal) {
                    const timeSinceDateAYearBeginning = this.getTime() - (new Date(this.getFullYear(), 0, 1).getTime());
                    const timeSinceDateBYearBeginning = dateForComparing.getTime() - (new Date(dateForComparing.getFullYear(), 0, 1).getTime());
                    differenceInYears
                        = differenceInYears + ((timeSinceDateAYearBeginning - timeSinceDateBYearBeginning) / (1000 * 60 * 60 * 24 * 365));
                }
                return differenceInYears;
            case TimeUnits.MONTHS:
                let differenceInMonths = ((this.getFullYear() - dateForComparing.getFullYear()) * 12) + (this.getMonth() - dateForComparing.getMonth());
                if (useDecimal) {
                    const timeSinceDateAMonthBeginning = this.getTime() - (new Date(this.getFullYear(), this.getMonth(), 1).getTime());
                    const timeSinceDateBMonthBeginning = dateForComparing.getTime() - (new Date(dateForComparing.getFullYear(), dateForComparing.getMonth(), 1).getTime());
                    differenceInMonths
                        = differenceInMonths + ((timeSinceDateAMonthBeginning - timeSinceDateBMonthBeginning) / ((1000 * 60 * 60 * 24 * 365) / 12));
                }
                return differenceInMonths;
            case TimeUnits.DAYS:
                let differenceInDays = (this.getTime() - dateForComparing.getTime()) / (1000 * 60 * 60 * 24);
                if (!useDecimal) {
                    differenceInDays = Math.trunc(differenceInDays);
                }
                return differenceInDays;
            default:
                throw new Error('Unfortunately, method "diff" does not support such time unit. Please use "YEARS", "MONTHS" or "DAYS" as "timeUnits" parameter!!!');
        }
    }
    /**
     * Check that RichDate happened before date from "dateForComparing" parameter
     * @param dateForComparing {RichDate | Date} - date to compare with RichDate
     * @returns {boolean}
     */
    isBefore(dateForComparing) {
        return (this.getTime() < dateForComparing.getTime());
    }
    /**
     * Check that RichDate happened after date from "dateForComparing" parameter
     * @param dateForComparing {RichDate | Date} - date to compare with RichDate
     * @returns {boolean}
     */
    isAfter(dateForComparing) {
        return (dateForComparing.getTime() < this.getTime());
    }
    /**
     * Check that RichDate happened between two dates from parameters
     * @param dateA {RichDate | Date} - first date to compare with RichDate
     * @param dateB {RichDate | Date} - second date to compare with RichDate
     * @param betweenOrEqual {boolean} - default value FALSE. If you set TRUE, you will receive positive result even if dateA or dateB is equal RichDate
     * @returns {boolean}
     */
    isBetween(dateA, dateB, betweenOrEqual = false) {
        let earlierDate;
        let laterDate;
        if (dateA.getTime() < dateB.getTime()) {
            earlierDate = dateA;
            laterDate = dateB;
        }
        else {
            earlierDate = dateB;
            laterDate = dateA;
        }
        if (betweenOrEqual) {
            return (this.getTime() >= earlierDate.getTime()
                && this.getTime() <= laterDate.getTime());
        }
        else {
            return (this.getTime() > earlierDate.getTime()
                && this.getTime() < laterDate.getTime());
        }
    }
    /**
     * Add to RichDate some amount of time
     * @param amountOfTime {number} - the amount of time to add
     * @param timeUnits {TimeUnits | string} - the units of added time
     * @returns {RichDate}
     */
    add(amountOfTime, timeUnits = TimeUnits.YEARS) {
        return this.change(ChangeActions.ADD, amountOfTime, timeUnits);
    }
    /**
     * Subtract from RichDate some amount of time
     * @param amountOfTime {number} - the amount of time to subtract
     * @param timeUnits {TimeUnits | string} - the units of subtracted time
     * @returns {RichDate}
     */
    subtract(amountOfTime, timeUnits = TimeUnits.YEARS) {
        return this.change(ChangeActions.SUBTRACT, amountOfTime, timeUnits);
    }
    change(action, amountOfTime, timeUnits) {
        switch (timeUnits) {
            case TimeUnits.YEARS:
                if (action === ChangeActions.ADD) {
                    this.setFullYear(this.getFullYear() + amountOfTime);
                }
                else if (action === ChangeActions.SUBTRACT) {
                    this.setFullYear(this.getFullYear() - amountOfTime);
                }
                return this;
            case TimeUnits.MONTHS:
                if (action === ChangeActions.ADD) {
                    this.setMonth(this.getMonth() + amountOfTime);
                }
                else if (action === ChangeActions.SUBTRACT) {
                    this.setMonth(this.getMonth() - amountOfTime);
                }
                return this;
            case TimeUnits.DAYS:
                if (action === ChangeActions.ADD) {
                    this.setDate(this.getDate() + amountOfTime);
                }
                else if (action === ChangeActions.SUBTRACT) {
                    this.setDate(this.getDate() - amountOfTime);
                }
                return this;
            case TimeUnits.HOURS:
                if (action === ChangeActions.ADD) {
                    this.setHours(this.getHours() + amountOfTime);
                }
                else if (action === ChangeActions.SUBTRACT) {
                    this.setHours(this.getHours() - amountOfTime);
                }
                return this;
            case TimeUnits.MINUTES:
                if (action === ChangeActions.ADD) {
                    this.setMinutes(this.getMinutes() + amountOfTime);
                }
                else if (action === ChangeActions.SUBTRACT) {
                    this.setMinutes(this.getMinutes() - amountOfTime);
                }
                return this;
            case TimeUnits.SECONDS:
                if (action === ChangeActions.ADD) {
                    this.setSeconds(this.getSeconds() + amountOfTime);
                }
                else if (action === ChangeActions.SUBTRACT) {
                    this.setSeconds(this.getSeconds() - amountOfTime);
                }
                return this;
            default:
                throw new Error(`Unfortunately, method "${(action === ChangeActions.ADD) ? 'add' : 'subtract'}" does not support such time unit. Please use "YEARS", "MONTHS", "DAYS", "HOURS", "MINUTES" or "SECONDS" as "timeUnits" parameter!!!`);
        }
    }
}
export function richDate(date) {
    return (date instanceof Date)
        ? new RichDate(date.getTime())
        : ((typeof date === 'string' && date !== '') || typeof date === 'number')
            ? new RichDate(date)
            : new RichDate();
}
//# sourceMappingURL=rich-date.js.map