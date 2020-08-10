/* * 时间格式化工具 
 * 把Long类型的1527672756454日期还原yyyy-MM-dd 00:00:00格式日期 
 */ 
export function datetimeFormat(longTypeDate){  
 var dateTypeDate = "";  
 var date = new Date();  
 date.setTime(longTypeDate);  
 dateTypeDate += date.getFullYear(); //年  
 dateTypeDate += "-" + getMonth(date); //月  
 dateTypeDate += "-" + getDay(date); //日  
 dateTypeDate += " " + getHours(date); //时  
 dateTypeDate += ":" + getMinutes(date);  //分 
 dateTypeDate += ":" + getSeconds(date);  //分 
 return dateTypeDate; 
}  

/* 
 * 时间格式化工具 
 * 把Long类型的1527672756454日期还原yyyy-MM-dd格式日期 
 */ 
export function dateFormat(longTypeDate){  
 var dateTypeDate = "";  
 var date = new Date();  
 date.setTime(longTypeDate);  
 dateTypeDate += date.getFullYear(); //年  
 dateTypeDate += "-" + getMonth(date); //月  
 dateTypeDate += "-" + getDay(date); //日  
 return dateTypeDate; 
}  
//返回 01-12 的月份值  
function getMonth(date){  
 var month = "";  
 month = date.getMonth() + 1; //getMonth()得到的月份是0-11  
 if(month<10){  
  month = "0" + month;  
 }  
 return month;  
}  
//返回01-30的日期  
function getDay(date){  
 var day = "";  
 day = date.getDate();  
 if(day<10){  
  day = "0" + day;  
 }  
 return day;  
} 
//小时 
function getHours(date){ 
 var hours = ""; 
 hours = date.getHours(); 
 if(hours<10){  
  hours = "0" + hours;  
 }  
 return hours;  
} 
//分 
function getMinutes(date){ 
 var minute = ""; 
 minute = date.getMinutes(); 
 if(minute<10){  
  minute = "0" + minute;  
 }  
 return minute;  
} 
//秒 
function getSeconds(date){ 
 var second = ""; 
 second = date.getSeconds(); 
 if(second<10){  
  second = "0" + second;  
 }  
 return second;  
}