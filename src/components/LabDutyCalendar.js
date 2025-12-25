"use client";
import { useState, useEffect } from 'react';

const dummyDutyEvents = [
  { day: 'Monday', time: '08:30', duration: 2, title: 'Research Meeting' },
  { day: 'Wednesday', time: '09:00', duration: 1.5, title: 'Internship Evaluation' },
  { day: 'Friday', time: '08:00', duration: 2, title: 'Lab Operations Meeting' },
];

const getStartOfWeek = (date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export default function LabDutyCalendar() {
  const [currentDate, setCurrentDate] = useState(getStartOfWeek(new Date()));
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    { name: 'Morning', label: 'Morning' },
    { name: 'Afternoon', label: 'Afternoon' }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setEvents(dummyDutyEvents);
      setIsLoading(false);
    };
    fetchEvents();
  }, [currentDate]);

  const getWeekdays = () => {
    const startOfWeek = getStartOfWeek(new Date(currentDate));
    return weekdays.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        name: day,
        shortName: day.substring(0, 3),
        date: date.getDate(),
        month: date.getMonth() + 1,
      };
    });
  };

  const changeWeek = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  const groupedEvents = weekdays.reduce((acc, day) => {
    acc[day] = {
      morning: events.filter(e => e.day === day && timeToMinutes(e.time) < 720),
      afternoon: events.filter(e => e.day === day && timeToMinutes(e.time) >= 720),
    };
    return acc;
  }, {});

  return (
    <div className="w-full h-full font-sans text-slate-900 dark:text-slate-100">
      
      {/* 1. Header Điều hướng */}
      <div className="flex flex-col sm:flex-row justify-between items-end mb-6 gap-4 px-1">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic leading-none text-slate-900 dark:text-white">Lab Calendar</h2>
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mt-2 ml-1 italic">Weekly Fixed Schedule</p>
        </div>
        
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button onClick={() => changeWeek(-7)} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all font-bold text-slate-400">←</button>
          <span className="px-4 text-[9px] font-black text-slate-500 dark:text-slate-400 min-w-[150px] text-center uppercase tracking-widest">
            {getWeekdays()[0].date}/{getWeekdays()[0].month} — {getWeekdays()[6].date}/{getWeekdays()[6].month}
          </span>
          <button onClick={() => changeWeek(7)} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all font-bold text-slate-400">→</button>
        </div>
      </div>

      {/* 2. Grid Table - Chia cột rõ ràng */}
      <div className="rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        
        {/* Day Header */}
        <div className="grid grid-cols-8 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
          <div className="p-4 border-r border-slate-200 dark:border-slate-800 flex items-center justify-center">
             <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
          {getWeekdays().map((day, index) => {
            const isMeetingDay = ['Monday', 'Wednesday', 'Friday'].includes(day.name);
            return (
              <div 
                key={day.name} 
                className={`p-4 text-center border-r last:border-r-0 border-slate-200 dark:border-slate-800 
                  ${isMeetingDay ? 'bg-primary/[0.04]' : 'bg-transparent'}`}
              >
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{day.shortName}</div>
                <div className={`text-xl font-black mt-1 ${isMeetingDay ? 'text-primary' : 'text-slate-300 opacity-40'}`}>{day.date}</div>
              </div>
            );
          })}
        </div>

        {/* Content Rows */}
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm z-20 flex items-center justify-center font-black text-[9px] uppercase tracking-widest text-primary">Refreshing...</div>
          )}

          {timeSlots.map(slot => (
            <div key={slot.name} className="grid grid-cols-8 border-b last:border-0 border-slate-200 dark:border-slate-800 min-h-[160px]">
              {/* Cột Shift Label dọc */}
              <div className="p-4 flex flex-col justify-center items-center border-r border-slate-200 dark:border-slate-800 bg-slate-50/30">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 -rotate-90 whitespace-nowrap">{slot.label}</span>
              </div>

              {/* Dữ liệu từng cột ngày */}
              {weekdays.map((day, index) => {
                const dayEvents = slot.name === 'Morning' ? groupedEvents[day].morning : groupedEvents[day].afternoon;
                const isMeetingDay = ['Monday', 'Wednesday', 'Friday'].includes(day);

                return (
                  <div 
                    key={`${day}-${slot.name}`} 
                    className={`p-2 border-r last:border-r-0 border-slate-200 dark:border-slate-800 flex flex-col gap-2 transition-all
                      ${isMeetingDay ? 'bg-primary/[0.02]' : 'bg-transparent opacity-10'}
                    `}
                  >
                    {dayEvents.map((event, i) => (
                      <div 
                        key={i}
                        className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all cursor-default border border-white/10"
                      >
                        <div className="text-[7px] font-black uppercase tracking-widest opacity-80 mb-1 leading-none">
                            {event.time} AM
                        </div>
                        <div className="text-[10px] font-black leading-tight uppercase tracking-tight">
                            {event.title}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex justify-between items-center px-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-primary">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            Meeting Scheduled
          </div>
        </div>
        <p className="text-[8px] font-black text-slate-300 italic uppercase tracking-[0.3em]">
          Internal Lab Access
        </p>
      </div>
    </div>
  );
}