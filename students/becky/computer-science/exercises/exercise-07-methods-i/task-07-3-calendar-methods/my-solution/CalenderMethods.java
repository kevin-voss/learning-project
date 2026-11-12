public class CalenderMethods {
    public static void main(String[] args) {
        System.out.println("Please put in the Year: ");
        int year = new java.util.Scanner(System.in).nextInt();

        System.out.println("Please put in the Month: ");
        int month = new java.util.Scanner(System.in).nextInt();

        System.out.println("Please put in the Day: ");
        int day = new java.util.Scanner(System.in).nextInt();

       //nextDateCalc String return "dd.mm.yyyy" 
       //DateValidation boolean
       //daysPerMonth int - 31 || 30 || 28 || 29
       //leapYear boolean
       //-> leapYear(int month, int year)
       //-> daysPerMonth(int month, boolean leapYear)
       //-> DateValidation(int daysPerMonth,int day, int month)
       //-> nextDateCalc(boolean valid, int daysPerMonth, int day, int month, int year)
        System.out.println(nextDateCalc(DateValidation(daysPerMonthCalc(month, isLeapYear(month, year)), day, month), daysPerMonthCalc(month, isLeapYear(month, year)), day, month, year));
    }
    
    public static boolean isLeapYear(int month, int year) {
        boolean leapYear = false;

        if (month != 2) {
            return leapYear;
        } else if ((year % 4) == 0 && (year % 100) != 0 || (year % 400) == 0) {
           leapYear = true;
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
        } 

        return daysPerMonth;
    }

    public static boolean DateValidation(int daysPerMonth, int day, int month) {
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
    public static String nextDateCalc(boolean valid, int daysPerMonth, int day, int month, int year) {
    
        if (day < daysPerMonth && valid) {  //day + 1, if day < daysPerMonth -> day = 1
            day ++;
        } else if (day == daysPerMonth && valid) { //month: if day == daysPerMonth -> month +1
            month ++;
            day = 1;
        } else if (day == daysPerMonth && month == 12 && valid) { //year: if day == daysPerMonth & month == 12 -> day = 1, Month = 1, Year + 1
            year ++;
            month = 1;
            day = 1;
        } else {
            return "Das eingegebene Datum ist nicht korrekt!";
        }

        String date = "" + day + "." + "" + month + "." + "" + year;
        
        return date;
        
        
    }


}
