package com.gosun.sas.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
/**
 * 日历工具类
 * @author Abe
 *
 */
public  class CalendarUtils {
    
    public final static long s = 24 * 60 * 60 * 1000;//一天的毫秒
	/**
	 * 得到年份
	 * @param date
	 * @return
	 */
	public static int getYear(Date date){
		return getByField(date, Calendar.YEAR);
	}
	/**
	 * 得到月份
	 * @param date
	 * @return
	 */
	public static int getMonth(Date date){
		return getByField(date, Calendar.MONTH)+1;
	}
	/**
	 * 得到日期
	 * @param date
	 * @return
	 */
	public static int getDay(Date date){
		return getByField(date, Calendar.DATE);
	}
	/**
	 * 得到小时
	 * @param date
	 * @return
	 */
	public static int getHour(Date date){
		return getByField(date, Calendar.HOUR_OF_DAY);
	}
	/**
	 * 得到分钟
	 * @param date
	 * @return
	 */
	public static int getMinute(Date date){
		return getByField(date, Calendar.MINUTE);
	}
	/**
	 * 得到秒
	 * @param date
	 * @return
	 */
	public static int getSecond(Date date){
		return getByField(date, Calendar.SECOND);
	}
	/**
	 * 得到毫秒
	 * @param date
	 * @return
	 */
	public static int getMilliSecond(Date date){
		return getByField(date, Calendar.MILLISECOND);
	}
	/**
	 * 得到对应的字段值
	 * @param date
	 * @return
	 */
	public static int getByField(Date date,int field){
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(field);
	}
	/**
	 * 清除时间对象时分秒
	 * @param date
	 * @return
	 */
	public static Date clearTime(Date date){
	    Calendar cal = Calendar.getInstance();
	    cal.setTime(date);
	    cal.set(Calendar.HOUR_OF_DAY, 0);
	    cal.set(Calendar.MINUTE, 0);
	    cal.set(Calendar.SECOND, 0);
	    cal.set(Calendar.MILLISECOND, 0);
	    return cal.getTime();
	}
	
	 /**
     * 得到指定日期是一年中的第几周
     * @param date
     * @return
     */
    public static int getWeek(Date date){
        Calendar cal = getCalendar(date);
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        int week = cal.get(Calendar.WEEK_OF_YEAR);
        if(week==1){
            int day = getDayOfMonth(date);
            if(day >= 25){
                return getWeek(new Date(date.getTime() - 7*s)) + 1;
            }
        }
        return week;
    }
    
    /**
     * 根据日期得到本周第一天
     * @param date
     * @return
     */
    public static Date getFirstDayOfWeek(Date date){
        Calendar cal = getCalendar(date);
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        Date res = cal.getTime();
        return res;
    }
    
    /**
     * 得到指定日期星期的最后一天
     * @param date
     * @return
     */
    public static Date getLastDayOfWeek(Date date){
        Calendar cal = getCalendar(date);
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        Date res = new Date(cal.getTimeInMillis() + s - 1000);
        return res;
    }
    
    /**
     * 根据日期得到本月第一天
     * @param date
     * @return
     */
    public static Date getFirstDayOfMonth(Date date){
        Calendar cal = new GregorianCalendar();
        cal.setTime(date);
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMinimum(Calendar.DAY_OF_MONTH));
        Date res = cal.getTime();
        return res;
    }
    
    /**
     * 根据日期得到本月最后一天
     * @param date
     * @return
     */
    public static Date getLastDayOfMonth(Date date){
        Calendar cal = getCalendar(date);
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
        Date res = new Date(cal.getTimeInMillis() + s - 1000);
        return res;
    }
    /**
     * 根据日期得到一个季度的第一天
     * @param date
     * @return
     */
    public static Date  getFirstDayOfSeason(Date date){
        return getFirstDayOfMonth(getSeasonDate(date)[0]);
    }
    /**
     * 根据日期得到一个季度的最后一天
     * @param date
     * @return
     */
    public static Date getLastDayOfSeason(Date date){
        return getLastDayOfMonth(getSeasonDate(date)[2]);
    }
    /**
     * 得到X个季度以后的日期
     * @param date
     * @return
     */
    public static Date getNextXSeason(Date date , int x){
        return getNextXMonth(date, x * 3);
    }
    
    /** 
     * 取得季度已过天数 
     * 
     * @param date 
     * @return 
     */  
    public static int getPassDayOfSeason(Date date) {  
        int day = 0;  
        Date[] seasonDates  = getSeasonDate(date);  
        Calendar c = getCalendar(date);  
        int month = c.get(Calendar.MONTH);  
        if(month == Calendar.JANUARY || month == Calendar.APRIL || month == Calendar.JULY || month == Calendar.OCTOBER) {//季度第一个月  
            day = getDayOfMonth(seasonDates[0]);  
        } else if(month == Calendar.FEBRUARY || month == Calendar.MAY || month == Calendar.AUGUST || month == Calendar.NOVEMBER) {//季度第二个月  
            day = getDaysOfMonth(seasonDates[0]) + getDayOfMonth(seasonDates[1]);  
        } else if(month == Calendar.MARCH || month == Calendar.JUNE || month == Calendar.SEPTEMBER || month == Calendar.DECEMBER) {//季度第三个月  
            day = getDaysOfMonth(seasonDates[0]) + getDaysOfMonth(seasonDates[1]) + getDayOfMonth(seasonDates[2]);  
        }  
        return day;  
    } 
    
    /** 
     * 取得季度天数 
     * @param date 
     * @return 
     */  
    public static int getDayOfSeason(Date date) {  
        int day = 0;  
        Date[] seasonDates  = getSeasonDate(date);  
        for (Date date2 : seasonDates) {  
            day += getDaysOfMonth(date2);  
        }  
        return day;  
    } 
    
    /** 
     * 根据日期取得所在季度的月份 
     * @param date 
     * @return 
     */  
    public static Date[] getSeasonDate(Date date) {  
        Date[] season = new Date[3];  
        Calendar c = getCalendar(date);  
  
        int nSeason = getSeason(date);  
        if(nSeason == 1) {//第一季度  
            c.set(Calendar.MONTH, Calendar.JANUARY);  
            season[0] = c.getTime();  
            c.set(Calendar.MONTH, Calendar.FEBRUARY);  
            season[1] = c.getTime();  
            c.set(Calendar.MONTH, Calendar.MARCH);  
            season[2] = c.getTime();  
        } else if(nSeason == 2) {//第二季度  
            c.set(Calendar.MONTH, Calendar.APRIL);  
            season[0] = c.getTime();  
            c.set(Calendar.MONTH, Calendar.MAY);  
            season[1] = c.getTime();  
            c.set(Calendar.MONTH, Calendar.JUNE);  
            season[2] = c.getTime();  
        } else if(nSeason == 3) {//第三季度  
            c.set(Calendar.MONTH, Calendar.JULY);  
            season[0] = c.getTime();  
            c.set(Calendar.MONTH, Calendar.AUGUST);  
            season[1] = c.getTime();  
            c.set(Calendar.MONTH, Calendar.SEPTEMBER);  
            season[2] = c.getTime();  
        } else if(nSeason == 4) {//第四季度  
            c.set(Calendar.MONTH, Calendar.OCTOBER);  
            season[0] = c.getTime();  
            c.set(Calendar.MONTH, Calendar.NOVEMBER);  
            season[1] = c.getTime();  
            c.set(Calendar.MONTH, Calendar.DECEMBER);  
            season[2] = c.getTime();  
        }  
        return season;  
    }
    
    /** 
     * 取得日期所属季度
     * 1 第一季度  2 第二季度 3 第三季度 4 第四季度 
     * @param date 
     * @return 
     */  
    public static int getSeason(Date date) {  
        int season = 0;  
        Calendar c = getCalendar(date);  
        int month = c.get(Calendar.MONTH);  
        switch (month) {
            case Calendar.JANUARY:  
            case Calendar.FEBRUARY:  
            case Calendar.MARCH:  
                season =  1;  
                break;  
            case Calendar.APRIL:  
            case Calendar.MAY:  
            case Calendar.JUNE:  
                season =  2;  
                break;  
            case Calendar.JULY:  
            case Calendar.AUGUST:  
            case Calendar.SEPTEMBER:  
                season =  3;  
                break;  
            case Calendar.OCTOBER:  
            case Calendar.NOVEMBER:  
            case Calendar.DECEMBER:  
                season =  4;  
                break;  
            default:  
                break;  
        }  
        return season;  
    }
    
    /**
     * 某天为那一周的第几天
     * @param date
     * @return
     */
    public static int getDayOfWeek(Date date){
        Calendar cal = getCalendar(date);
        int day = cal.get(Calendar.DAY_OF_WEEK) -1;
        if(day == 0 ){
            day = 7 ;
        }
        return day ;
    }
    
    /**
     * 根据日期参数计算出一周的最后一天
     * @param date
     * @return
     */
    public static Date getEndDateOfWeek(Date date){
        Calendar cal = getCalendar(date);
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        Date res = new Date(cal.getTimeInMillis() + s - 1000);
        return res ; 
    }
    
    public static Date getNextXWeek(Date date,int x){
        Calendar cal = getCalendar(date);
        cal.add(Calendar.DATE, 7 * x );
        Date res = cal.getTime();
        return res;
    }
    
    /**
     * 根据日期得到X个月后的日期
     * @param date
     * @param x
     * @return
     */
    public static Date getNextXMonth(Date date , int x){
        Calendar cal = getCalendar(date);
        cal.add(Calendar.MONTH, x);
        Date res = new Date(cal.getTimeInMillis());
        return res; 
    }
    
    /**
     * 根据日期得到X年后的日期
     * @param date
     * @param x
     * @return
     */
    public static Date getNextXYear(Date date , int x){
        Calendar cal = getCalendar(date);
        cal.add(Calendar.YEAR, x);
        Date res = new Date(cal.getTimeInMillis());
        return res;
    }
    
    /**
     * 得到指定月份共多少天
     * @param date
     * @return
     */
    public static int getDaysOfMonth(Date date){
        Calendar calendar = getCalendar(date);
        return calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
    }
    
    /**
     * 得到指定日期为当月的第几天
     * @param date
     * @return
     */
    public static int getDayOfMonth(Date date){
        Calendar cal = getCalendar(date);
        int day = cal.get(Calendar.DAY_OF_MONTH);
        return day;
    }
    
    /**
     * 得到指定日期后X天的日期
     * @param date
     * @param x
     * @return
     */
    public static Date getNextXDay(Date date , int x){
        Calendar cal = getCalendar(date);
        cal.add(Calendar.DATE, x);
        Date res = cal.getTime();
        return res ;
    }
    
    /**
     * 得到一年中的第一天
     * @return
     */
    public static Date getFirstDayOfYear(Date date){
        Calendar c = getCalendar(date);
        c.set(Calendar.MONTH, Calendar.JANUARY);
        c.set(Calendar.DATE, 1);
        Date res = c.getTime();
        return res;
    }
    
    /**
     * 得到一年的天数
     * @param date
     * @return
     */
    public static int getDaysOfYear(Date date){
        Calendar cal = getCalendar(date);
        int days = cal.getActualMaximum(Calendar.DAY_OF_YEAR);
        return days;
    }
    
    /**
     * 得到日期为一年中的第几天
     * @param date
     * @return
     */
    public static int getDayOfYear(Date date){
        Calendar cal = getCalendar(date);
        int day = cal.get(Calendar.DAY_OF_YEAR);
        return day;
    }
    /**
     * 得到day天后的日期，如果day为负数则为day天前的日期
     * @param date
     * @param day
     * @return
     */
    public static Date getDateAfter(Date date , int day){
        Calendar cal = getCalendar(date);
        cal.add(Calendar.DATE  , day);
        return cal.getTime();
    }
    
    public static Date getLastDayOfYear(Date date){
        Calendar cal = getCalendar(date);
        cal.set(Calendar.MONTH, Calendar.DECEMBER);
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
//        Date res = new Date(cal.getTimeInMillis() - 1000);
        Date res = new Date(cal.getTimeInMillis());
        return res;
    }
	public static void main(String a[]){
	    Calendar cal = Calendar.getInstance();
        cal.setTime(new Date("2012-06-08"));
        int aa = 1;
	}
	
	public static Calendar getCalendar(Date date){
	    Calendar cal = Calendar.getInstance();
	    cal.setTime(date);
	    return cal;
	}
	
	/**
     * 当前日期
     * @return
     */
    public static Date getCurrentDay(){
       return clearTime(new Date());
    }
    
    /**
     * 修正日期时分秒为当天的23:59:59 
     */
    public static Date fixDateToLastTime (Date date){
        Calendar cal = getCalendar(date);
        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime() ;
    }
    
    public static DateFormat format;
    
    public static Date formatToYmd(Date date){
        try {
            if(date == null) return null;
            if(format == null){
                format = new SimpleDateFormat("yyyy-MM-dd");
            }
           return format.parse(format.format(date));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public static Date covertSecondsToDate(int seconds){
    	Date date = getCurrentDay();
    	Date res = new Date(date.getTime()+seconds*1000);
    	return res;
    }
    
    /**
     * 获取几个小时后的时间
     */
    public static Date getDateAfterByHour(Long hour){
    	Calendar cal = Calendar.getInstance();
    	Date res = new Date(cal.getTimeInMillis()+hour*60*60*1000);
    	return res;
    }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
