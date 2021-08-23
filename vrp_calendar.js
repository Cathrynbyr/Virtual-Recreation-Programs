"use strict";

/*

   Author: Cathryn Byrnes
   Date:  8-21-21

   Filename:   vrp_calendar.js  

   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the weekday title rows in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate
	
*/

// Set the Date Displayed in the Calendar
var thisDay = new Date();

// Write the calendar to the element with the id "calendar".
document.getElementById("calendar").innerHTML = createCalendar(thisDay);

//Function to generate the calendar table
function createCalendar(calDate) {
   var calendarHTML = "<table id ='calendar_table'>";
   calendarHTML += calCaption(calDate);
   calendarHTML += calWeekdayRow();
   calendarHTML += calDays(calDate);
   calendarHTML += "</table>";
   return calendarHTML;
}

// Function to write calendar caption
function calCaption(calDate)  {
   //monthName array contains the list of month names
   var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   
   //Determine Current Month
   var thisMonth = calDate.getMonth();

   //Determine the Current Year
   var thisYear = calDate.getFullYear();

   // Write (build) the Caption
   return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>"; 
}

// Function to write a table row of weekday abbreviations
function calWeekdayRow()  {
   //Array of weekday abbreviations
   var dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
   var rowHTML = "<tr>";

   //Loop through the dayName array
   for(var i = 0; i < dayName.length; i++)  {
      rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
   }//end of loop
   
   rowHTML += "</tr>";
   //return statement to pass rowHTML to whereever calWeekdayRow was called
   return rowHTML;
}//end of calWeekdayRow function

// Function to calculate the number of days in the month
function daysInMonth(calDate) {
   // Array of days in each month
   var dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

   // Extract the four digit year and month values
   var thisYear = calDate.getFullYear();
   var thisMonth = calDate.getMonth();

   // Revise the number of days in February for leap years
   if(thisYear % 4 === 0) {
      if((thisYear % 100 != 0) || (thisYear % 400 === 0)) {
         dayCount[1] = 29;
      }
   }

   // Return the number of days for the current month
   return dayCount[thisMonth];

}

// Function to write table rows for each day of the month
function calDays(calDate) {
   
   // Determine the starting day of the month
   var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
   var weekDay = day.getDay(); 

   // Write blank cells preceding the starting day
   var htmlCode = "<tr>";
   for(var i = 0; i < weekDay; i++) {
      htmlCode += "<td></td>";    
   }
   // Write blank cells for each day of the month
   var totalDays = daysInMonth(calDate);

   var highlightDay = calDate.getDate();
   for(var i = 1; i <= totalDays; i++) {
      day.setDate(i);
      weekDay = day.getDay();

      // check the weekDay variable to figure if the week is starting new or ending.
      if(weekDay === 0) {
        htmlCode += "<tr>";
      }
      
      if(i === highlightDay){
      htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] + "</td>";
      } else {
         htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>";
      }

      if(weekDay === 6) {
         htmlCode += "</tr>";
      }
   }// end of the loop that writes the cells for the month
   return htmlCode;
} // end of calDays function



/* the beginning of the form function*/

window.onload = setForm;

function setForm() {
   document.forms[0].onsubmit = function() {
      if (this.checkValidity()) alert("No invalid data detected. Will retain data for further testing.");
      return false;
   }
}

