public class CalenderMethods {
    public static void main(String[] args) {
        System.out.println("Please put in the Year: ");
        int year = new java.util.Scanner(System.in).nextInt();

        System.out.println("Please put in the Month: ");
        int month = new java.util.Scanner(System.in).nextInt();

        System.out.println("Please put in the Day: ");
        int day = new java.util.Scanner(System.in).nextInt();

        
        
       
        nextDateCalc( DateValidation(daysPerMonthCalc(month, isLeapYear(month, year)), isLeapYear(month, year), day, month), daysPerMonthCalc(month, isLeapYear(month, year)), isLeapYear(month, year), day, month, year);
    }
    
    public static boolean isLeapYear(int month, int year) {
        boolean leapYear = false;

        if (month != 2) {
            return leapYear;
        } else if ((year % 4) == 0 || (year % 400) == 0) {
           leapYear = true;

           if ((year % 100) == 0) {
            leapYear = false;
           }
        }
        return leapYear;
    }

    public static int daysPerMonthCalc(int month, boolean leap) {
        int daysPerMonth = 31;

        if (!leap && month == 2) {      //normal Feb
            daysPerMonth = 28;
        } else if(leap && month == 2){  //leap Feb
            daysPerMonth = 29;
        } else if (month == 4 || month == 6 || month == 9 || month == 11 ) {
           daysPerMonth = 30;           //Month with 30d
        } else if (month == 1 || month == 3 || month == 5 || month == 7 ||
            month == 8 || month == 10 || month == 12) {
            daysPerMonth = 31;
        } 

        return daysPerMonth;
    }

    public static boolean DateValidation(int daysPerMonth, boolean leap, int day, int month) {
        //month <= 12, day <= daysPerMonth
        boolean isDateValid = false;

        if (month <= 12 && day <= daysPerMonth) {
            isDateValid = true;
        } else {
            System.out.println("Date is not valid!");
        }

        return isDateValid;
    }

    //Valid answer
    public static void nextDateCalc(boolean valid, int daysPerMonth, int day, int month, int year) {
        //day + 1, if day == daysPerMonth -> day = 1
        //month: if day == daysPerMonth -> month + 1
        //year: if day == daysPerMonth & month = 12 -> Month = 1, Year + 1
    }


}
