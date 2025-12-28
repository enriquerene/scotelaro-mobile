type DateObject = {
  day: number;
  month: number;
  year: number;
};
/**
 * Helper class for date operations related to expiration dates
 */
export class DateHelper {
  private parsedDate: DateObject;
  private currentDate: DateObject;

  /**
   * Creates a new DateHelper instance
   * @param dateStr Date string in DD/MM format
   */
  constructor(dateStr: string) {
    this.currentDate = this.DateToDateObject(new Date());
    this.parsedDate = this.parseDate(dateStr);
  }

  /**
   * Convert a Date object to a DateObject
   * @param date Date object
   * @returns DateObject
   */
  DateToDateObject(date: Date): DateObject {
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };
  }

  /**
   * Parse a date string in DD/MM format and set the correct year
   * @param dateStr Date string in DD/MM format
   * @returns Parsed date
   */
  private parseDate(dateStr: string): DateObject {
    const [day, month] = dateStr.split('/').map(p => parseInt(p));
    const currentYear = this.currentDate.year;
    const currentMonth = this.currentDate.month;
    return {
      day,
      month: month - 1,
      year: (currentMonth === 11 && month === 0) ? currentYear + 1 : currentYear
    };
  }

  /**
   * Check if the date is expired (in the past)
   * @returns True if date is in the past
   */
  isExpired(): boolean {
    if (this.currentDate.year === this.parsedDate.year) {
      if (this.currentDate.month === this.parsedDate.month) {
        return this.currentDate.day > this.parsedDate.day;
      }
      return this.currentDate.month > this.parsedDate.month;
    }
    return this.currentDate.year > this.parsedDate.year;
  }

  /**
   * Check if the date is close to expiration
   * @param days Number of days to consider "close" to expiration (default: 7)
   * @returns True if date is within the specified days
   */
  isCloseToExpiration(days: number = 7): boolean {
    return this.isExpired() ? false : this.getDaysRemaining() <= days;
  }


  /**
   * Get the number of days until the date
   * @returns Number of days until the date
   */
  getDaysRemaining(): number {
    if (this.isExpired()) {
      return -1;
    }
    let distance = 0;
    if (this.parsedDate.month > this.currentDate.month) {
      distance = this.parsedDate.day;
      const lastDayOfTheMonth = new Date(this.currentDate.year, this.currentDate.month + 1, 0).getDate();
      distance += lastDayOfTheMonth - this.currentDate.day;
    } else if (this.parsedDate.month === this.currentDate.month) {
      distance = this.parsedDate.day - this.currentDate.day;
    }
    return distance;
  }
}
