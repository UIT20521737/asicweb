// components/CustomCalendar.js
"use client"
import { useState, useEffect } from 'react';

// Hàm giả lập việc fetch dữ liệu từ server
const fetchEventsFromServer = async (url) => {
  if (!url) {
    console.error("URL for fetching data is not provided.");
    return [];
  }
  await new Promise(resolve => setTimeout(resolve, 500)); 
  const dummyEvents = [
    { day: 'Monday', time: '09:15', duration: 1.5, title: 'Team Sync' },
    { day: 'Tuesday', time: '13:30', duration: 2, title: 'IC Design Session' },
    { day: 'Wednesday', time: '08:00', duration: 1, title: 'Component Review'},
    { day: 'Thursday', time: '10:45', duration: 2.5, title: 'AIoT Platform Meeting' },
    { day: 'Friday', time: '14:00', duration: 1, title: 'Weekly Report' },
    { day: 'Friday', time: '16:15', duration: 1, title: 'Client Call'},
    { day: 'Saturday', time: '10:00', duration: 1.25, title: 'Internal Workshop' },
    { day: 'Sunday', time: '14:00', duration: 1.5, title: 'Free Time' },
  ];
  return dummyEvents;
};

const getStartOfWeek = (date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const formatTimeRange = (time, duration) => {
    const startHours = timeToMinutes(time) / 60;
    const endHours = startHours + duration;
    const endMinutes = (endHours % 1) * 60;
    const endHourFormatted = Math.floor(endHours).toString().padStart(2, '0');
    const endMinutesFormatted = Math.round(endMinutes).toString().padStart(2, '0');
    return `${time} - ${endHourFormatted}:${endMinutesFormatted}`;
};

export default function CustomCalendar({ url }) {
  const [currentDate, setCurrentDate] = useState(getStartOfWeek(new Date()));
  const [events, setEvents] = useState([]);
  const [isCustomLoading, setIsCustomLoading] = useState(true);
  const [modalEvent, setModalEvent] = useState(null);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const morningStartTime = 7.5; 
  const morningEndTime = 11.5; 
  const afternoonStartTime = 13.5; 
  const afternoonEndTime = 17.5; 

  const timeSlots = [
    { name: 'Morning', shortName: 'M' }, 
    { name: 'Afternoon', shortName: 'A' }
  ];

  const getWeekdays = () => {
    const startOfWeek = getStartOfWeek(currentDate);
    return weekdays.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        name: day,
        shortName: day.substring(0, 3),
        date: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
    });
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const getWeekRange = () => {
    const start = getWeekdays()[0];
    const end = getWeekdays()[6];
    const startDate = `${start.name}, ${start.date}/${start.month}`;
    const endDate = `${end.name}, ${end.date}/${end.month}`;
    return `${startDate} - ${endDate} - ${end.year}`;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setIsCustomLoading(true);
      const data = await fetchEventsFromServer(url); 
      setEvents(data);
      setIsCustomLoading(false);
    };
    fetchEvents();
  }, [currentDate, url]);
  
  const groupedEvents = weekdays.reduce((acc, day) => {
    const morningEvents = events.filter(e => e.day === day && timeToMinutes(e.time) >= morningStartTime * 60 && timeToMinutes(e.time) <= morningEndTime * 60);
    const afternoonEvents = events.filter(e => e.day === day && timeToMinutes(e.time) >= afternoonStartTime * 60 && timeToMinutes(e.time) <= afternoonEndTime * 60);
    acc[day] = {
      morning: morningEvents,
      afternoon: afternoonEvents,
    };
    return acc;
  }, {});
  
  return (
    <div className="bg-background rounded-lg shadow-xl p-4 sm:p-6 overflow-hidden flex flex-col h-full">
      {/* Event Details Modal */}
      {modalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setModalEvent(null)}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm mx-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{modalEvent.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">Start Time: {modalEvent.time}</p>
            <p className="text-gray-600 dark:text-gray-300">Duration: {modalEvent.duration} hours</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={() => setModalEvent(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <div className="flex justify-center items-center mb-4">
        <span className="text-xl font-bold text-foreground">
          {getWeekRange()}
        </span>
      </div>

      {/* Grid Header with Days of the Week */}
      <div className="grid grid-cols-8 gap-1 border-b border-border mb-4">
        <div className="py-2 text-center text-foreground font-semibold"></div>
        {getWeekdays().map(day => (
          <div key={day.name} className="py-2 text-center text-foreground font-semibold">
            <div className="text-sm font-normal hidden sm:block">
              {day.name}
            </div>
            {/* Hiển thị tên viết tắt trên điện thoại và ẩn trên màn hình nhỏ trở lên */}
            <div className="text-sm font-normal sm:hidden">
              {day.shortName}
            </div>
            <div className="text-lg font-bold">{day.date}</div>
          </div>
        ))}
      </div>

      {/* Grid for Time Slots and Events */}
      <div className="grid grid-cols-8 gap-1 flex-grow overflow-y-auto">
        {isCustomLoading ? ( 
          <div className="col-span-8 flex items-center justify-center p-8 text-foreground absolute inset-0 bg-background/80 z-10">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading Events...
          </div>
        ) : (
          timeSlots.map(timeSlot => (
            <div key={timeSlot.name} className="contents">
              {/* Cell for the time slot name */}
              <div className="col-span-1 text-right pr-1 sm:pr-2 text-primary-light text-xs sm:text-sm flex items-center justify-end">
                <span className="hidden sm:inline">{timeSlot.name}</span>
                <span className="sm:hidden">{timeSlot.shortName}</span>
              </div>
              {/* Cells for events */}
              {weekdays.map(day => (
                <div
                  key={`${day}-${timeSlot.name}`}
                  className="col-span-1 p-1 sm:p-2 border-b border-r border-border flex flex-col justify-start items-center text-center text-txt-primary"
                >
                  {/* Display Morning shift events */}
                  {timeSlot.name === 'Morning' && groupedEvents[day].morning.map((event, eventIndex) => (
                    <div 
                      key={eventIndex} 
                      className="bg-green-500 rounded-md p-1 mb-1 w-full text-white sm:cursor-pointer"
                      onClick={() => setModalEvent(event)}
                    >
                      <div className="font-semibold hidden sm:block">{event.title}</div>
                      <div className="text-xs text-opacity-75 hidden sm:block">
                        {formatTimeRange(event.time, event.duration)}
                      </div>
                    </div>
                  ))}
                  {/* Display Afternoon shift events */}
                  {timeSlot.name === 'Afternoon' && groupedEvents[day].afternoon.map((event, eventIndex) => (
                    <div 
                      key={eventIndex} 
                      className="bg-green-500 rounded-md p-1 mb-1 w-full text-white sm:cursor-pointer"
                      onClick={() => setModalEvent(event)}
                    >
                      <div className="font-semibold hidden sm:block">{event.title}</div>
                      <div className="text-xs text-opacity-75 hidden sm:block">
                        {formatTimeRange(event.time, event.duration)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={goToPreviousWeek} className="p-2 rounded-lg  bg-muted  transition-colors cursor-pointer text-txt-primary bg-primary hover:bg-accent-hover hover:text-white">
          Previous Week
        </button>
        <button onClick={goToNextWeek} className="p-2 rounded-lg  bg-muted  transition-colors cursor-pointer text-txt-primary bg-primary hover:bg-accent-hover hover:text-white">
          Next Week
        </button>
      </div>
    </div>
  );
}