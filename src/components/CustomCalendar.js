"use client"
import { useState, useEffect } from 'react';

// 1. Dữ liệu họp tiếng Anh
const fetchEventsFromServer = async () => {
  await new Promise(resolve => setTimeout(resolve, 300)); 
  return [
    { day: 'Monday', time: '08:30', duration: 2, title: 'Research Meeting' },
    { day: 'Wednesday', time: '09:00', duration: 1.5, title: 'Internship Evaluation' },
    { day: 'Friday', time: '08:00', duration: 2, title: 'Lab Operations Meeting' },
  ];
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
    const period = Math.floor(endHours) >= 12 ? 'PM' : 'AM';
    return `${time} AM - ${endHourFormatted}:${endMinutesFormatted} ${period}`;
};

export default function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState(getStartOfWeek(new Date()));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalEvent, setModalEvent] = useState(null);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [{ name: 'Morning', shortName: 'M' }, { name: 'Afternoon', shortName: 'A' }];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchEventsFromServer();
      setEvents(data);
      setLoading(false);
    };
    fetchData();
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
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 flex flex-col h-full border border-slate-100 dark:border-slate-800 font-sans">
      
      {/* Modal chi tiết (Màu Xanh lá) */}
      {modalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm" onClick={() => setModalEvent(null)}>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] max-w-sm w-full shadow-2xl border dark:border-slate-700 mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-green-500/20 rounded-full mb-6 mx-auto"></div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 text-center uppercase tracking-tight leading-tight">
                {modalEvent.title}
            </h3>
            <div className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-6">
                <div className="flex justify-between items-center">
                    <span>Schedule</span>
                    <span className="text-green-600 dark:text-green-400">{formatTimeRange(modalEvent.time, modalEvent.duration)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Duration</span>
                    <span className="text-slate-900 dark:text-white">{modalEvent.duration} Hours</span>
                </div>
            </div>
            <button className="w-full mt-8 py-4 bg-green-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-green-600 transition-all shadow-lg shadow-green-100 dark:shadow-none" onClick={() => setModalEvent(null)}>
                Close Details
            </button>
          </div>
        </div>
      )}

      {/* Header Điều hướng */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Lab Calendar</h2>
          <div className="h-1.5 w-8 bg-green-500 mt-1 rounded-full"></div>
        </div>
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border dark:border-slate-700">
            <button onClick={() => changeWeek(-7)} className="p-2.5 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm font-bold text-slate-400">←</button>
            <span className="px-6 text-[10px] font-black text-slate-600 dark:text-slate-300 min-w-[180px] text-center uppercase tracking-[0.2em]">
                Week: {getWeekdays()[0].date}/{getWeekdays()[0].month} — {getWeekdays()[6].date}/{getWeekdays()[6].month}
            </span>
            <button onClick={() => changeWeek(7)} className="p-2.5 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm font-bold text-slate-400">→</button>
        </div>
      </div>

      {/* Grid Table */}
      <div className="border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl bg-white dark:bg-slate-900">
        {/* Header Ngày */}
        <div className="grid grid-cols-8 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
          <div className="p-4 flex items-center justify-center border-r border-slate-100 dark:border-slate-800 text-green-500">
             ★
          </div>
          {getWeekdays().map(day => {
            const isMeetingDay = ['Monday', 'Wednesday', 'Friday'].includes(day.name);
            return (
              <div key={day.name} className={`p-4 text-center border-l border-slate-100 dark:border-slate-800 transition-colors ${isMeetingDay ? 'bg-green-500/[0.03]' : ''}`}>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{day.shortName}</div>
                <div className={`text-xl font-black mt-1 ${isMeetingDay ? 'text-green-600 dark:text-green-400' : 'text-slate-300 opacity-30'}`}>{day.date}</div>
              </div>
            );
          })}
        </div>

        {/* Rows Morning/Afternoon */}
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm z-20 flex items-center justify-center font-black text-[10px] uppercase tracking-[0.3em] text-green-600">Refreshing...</div>
          )}
          
          {timeSlots.map(slot => (
            <div key={slot.name} className="grid grid-cols-8 border-b last:border-0 border-slate-100 dark:border-slate-800 min-h-[150px]">
              <div className="p-4 flex flex-col justify-center items-center text-center border-r border-slate-100 dark:border-slate-800 bg-slate-50/20">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 -rotate-90 whitespace-nowrap">{slot.name}</span>
              </div>
              
              {weekdays.map(day => {
                const dayEvents = slot.name === 'Morning' ? groupedEvents[day].morning : groupedEvents[day].afternoon;
                const isMeetingDay = ['Monday', 'Wednesday', 'Friday'].includes(day);

                return (
                  <div key={`${day}-${slot.name}`} className={`p-2 border-l border-slate-100 dark:border-slate-800 flex flex-col gap-3 transition-all ${!isMeetingDay ? 'bg-slate-50/10 opacity-10' : ''}`}>
                    {dayEvents.map((event, i) => (
                      <div 
                        key={i} 
                        onClick={() => setModalEvent(event)}
                        className="bg-green-500 dark:bg-green-600 text-white p-4 rounded-2xl shadow-lg shadow-green-100 dark:shadow-none cursor-pointer hover:scale-[1.05] transition-all active:scale-95 group border border-white/10"
                      >
                        <div className="text-[8px] font-black uppercase tracking-widest opacity-70 mb-1 leading-none">
                            {event.time} AM
                        </div>
                        <div className="text-[11px] font-black leading-[1.2] tracking-tight group-hover:underline uppercase">
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
      
      {/* Footer Legend */}
      <div className="mt-6 flex justify-center sm:justify-end px-2">
        <p className="text-[9px] font-black text-slate-300 italic uppercase tracking-[0.2em]">
          * Weekly Fixed Schedule
        </p>
      </div>
    </div>
  );
}