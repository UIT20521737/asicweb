// components/LabDutyCalendar.js
"use client";
import { useState, useEffect } from 'react';

// Dữ liệu giả lập cho lịch trực
const dummyDutyEvents = [
  // Roster for Phát (morning and afternoon)
  { day: 'Monday', time: '07:30', duration: 4, title: 'Phát' },
  { day: 'Monday', time: '13:30', duration: 3, title: 'Phát' },
  { day: 'Tuesday', time: '07:30', duration: 4, title: 'Phát' },
  { day: 'Tuesday', time: '13:30', duration: 3, title: 'Phát' },
  { day: 'Wednesday', time: '07:30', duration: 4, title: 'Phát' },
  { day: 'Wednesday', time: '13:30', duration: 3, title: 'Phát' },
  { day: 'Thursday', time: '07:30', duration: 4, title: 'Phát' },
  { day: 'Thursday', time: '13:30', duration: 3, title: 'Phát' },
  { day: 'Friday', time: '07:30', duration: 4, title: 'Phát' },
  { day: 'Friday', time: '13:30', duration: 3, title: 'Phát' },

  // Roster for Thịnh (morning and afternoon)
  { day: 'Monday', time: '07:30', duration: 4, title: 'Thịnh' },
  { day: 'Monday', time: '13:30', duration: 3, title: 'Thịnh' },
  { day: 'Tuesday', time: '07:30', duration: 4, title: 'Thịnh' },
  { day: 'Tuesday', time: '13:30', duration: 3, title: 'Thịnh' },
  { day: 'Wednesday', time: '07:30', duration: 4, title: 'Thịnh' },
  { day: 'Wednesday', time: '13:30', duration: 3, title: 'Thịnh' },
  { day: 'Thursday', time: '07:30', duration: 4, title: 'Thịnh' },
  { day: 'Thursday', time: '13:30', duration: 3, title: 'Thịnh' },
  { day: 'Friday', time: '07:30', duration: 4, title: 'Thịnh' },
  { day: 'Friday', time: '13:30', duration: 3, title: 'Thịnh' },

  // Roster for Đức (morning and afternoon)
  { day: 'Friday', time: '07:30', duration: 4, title: 'Đức' },
  { day: 'Friday', time: '13:30', duration: 3, title: 'Đức' },
];

const fetchDutyEventsFromServer = async (url) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyDutyEvents;
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

export default function LabDutyCalendar({ url }) {
  const [currentDate, setCurrentDate] = useState(getStartOfWeek(new Date()));
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const morningStartTime = 7.5;
  const afternoonStartTime = 13.5;

  const timeSlots = ['Morning', 'Afternoon'];

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
      setIsLoading(true);
      const data = await fetchDutyEventsFromServer(url);
      setEvents(data);
      setIsLoading(false);
    };
    fetchEvents();
  }, [currentDate, url]);

  const groupedEvents = weekdays.reduce((acc, day) => {
    const morningEvents = events.filter(e => e.day === day && timeToMinutes(e.time) === morningStartTime * 60);
    const afternoonEvents = events.filter(e => e.day === day && timeToMinutes(e.time) === afternoonStartTime * 60);
    acc[day] = {
      morning: morningEvents,
      afternoon: afternoonEvents,
    };
    return acc;
  }, {});

  return (
    <div className="bg-background rounded-lg shadow-xl p-4 sm:p-6 overflow-hidden flex flex-col h-full">
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
            <div className="text-sm font-normal sm:hidden">
              {day.shortName}
            </div>
            <div className="text-lg font-bold">{day.date}</div>
          </div>
        ))}
      </div>

      {/* Grid for Time Slots and Events */}
      <div className="grid grid-cols-8 gap-1 flex-grow overflow-y-auto">
        {isLoading ? (
          <div className="col-span-8 flex items-center justify-center p-8 text-foreground absolute inset-0 bg-background/80 z-10">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading Events...
          </div>
        ) : (
          timeSlots.map(timeSlot => (
            <div key={timeSlot} className="contents">
              {/* Cell for the time slot name */}
              <div className="col-span-1 text-right pr-2 text-primary-light text-sm flex items-center justify-end">
                <span className="hidden sm:inline">{timeSlot}</span>
                <span className="sm:hidden">{timeSlot.charAt(0)}</span>
              </div>
              {/* Cells for duty roster members */}
              {weekdays.map(day => (
                <div
                  key={`${day}-${timeSlot}`}
                  className="col-span-1 p-1 sm:p-2 border-b border-r border-border flex flex-col justify-start items-center text-center text-txt-primary"
                >
                  {/* Display Morning shift events */}
                  {timeSlot === 'Morning' && groupedEvents[day].morning.map(event => (
                    <div key={event.title} className="bg-green-500 rounded-md p-1 mb-1 w-full text-white">
                      <div className="font-semibold text-xs sm:text-sm hidden sm:block">{event.title}</div>
                      <div className="font-semibold text-xs sm:text-sm sm:hidden">{event.title.charAt(0)}</div>
                      <div className="text-xs text-opacity-75 hidden sm:block">
                        {formatTimeRange(event.time, event.duration)}
                      </div>
                    </div>
                  ))}
                  {/* Display Afternoon shift events */}
                  {timeSlot === 'Afternoon' && groupedEvents[day].afternoon.map(event => (
                    <div key={event.title} className="bg-green-500 rounded-md p-1 mb-1 w-full text-white">
                      <div className="font-semibold text-xs sm:text-sm hidden sm:block">{event.title}</div>
                      <div className="font-semibold text-xs sm:text-sm sm:hidden">{event.title.charAt(0)}</div>
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
        <button onClick={goToPreviousWeek} className="p-2 rounded-lg bg-muted transition-colors cursor-pointer text-txt-primary bg-primary hover:bg-accent-hover hover:text-white">
          Previous Week
        </button>
        <button onClick={goToNextWeek} className="p-2 rounded-lg bg-muted transition-colors cursor-pointer text-txt-primary bg-primary hover:bg-accent-hover hover:text-white">
          Next Week
        </button>
      </div>
    </div>
  );
}