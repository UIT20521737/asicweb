// src/app/(main)/calendar/CalendarList.js

"use client";
import { useState } from 'react';
import CustomCalendar from "@/components/CustomCalendar";
import LabDutyCalendar from "@/components/LabDutyCalendar";

// ... (các hằng số và logic của bạn)
const labActivitiesUrl = "https://example.com/api/lab-activities";
const labDutyRosterUrl = "https://example.com/api/lab-duty-roster";
export default function CalendarList() {
  const [activeTab, setActiveTab] = useState('roster');

  return (
    <>  
        {/* Các nút chuyển đổi */}
        <div className="flex justify-center space-x-4 mt-10 mb-6">
        
            <button
            onClick={() => setActiveTab('roster')}
            className={`cursor-pointer px-6 py-3 font-bold rounded-lg transition-colors ${
                activeTab === 'roster' ? 'bg-primary text-txt-primary' : 'bg-gray-200 text-gray-800'
            }`}
            >
            Lab Duty Roster
            </button>
            <button
            onClick={() => setActiveTab('activities')}
            className={`cursor-pointer px-6 py-3 font-bold rounded-lg transition-colors ${
                activeTab === 'activities' ? 'bg-primary text-txt-primary' : 'bg-gray-200 text-gray-800'
            }`}
            >
            Lab Activities
            </button>
        </div>

        
        {/* Container with a fixed height and responsive padding */}
        <div className="p-4 sm:p-6 mx-auto  overflow-hidden min-h-[500px] max-h-[750px] max-w-7xl">
            {activeTab === 'activities' && (
            <>
                <h2 className="text-3xl font-bold mb-4 text-primary my-10">Lab Activities</h2>
                <div className="flex-grow">
                <CustomCalendar url={labActivitiesUrl} />
                </div>
            </>
            )}

            {activeTab === 'roster' && (
            <>
                <h2 className="text-3xl font-bold mb-4 text-primary my-10">Lab Duty Roster</h2>
                <div className="flex-grow">
                <LabDutyCalendar url={labDutyRosterUrl} />
                </div>
            </>
            )}
        </div>
    </>
  )
}