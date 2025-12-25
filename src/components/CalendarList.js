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
       

        
        {/* Container with a fixed height and responsive padding */}
        <div className="p-4 sm:p-6 mx-auto  overflow-hidden min-h-[500px] max-h-[750px] max-w-7xl">
            

            {activeTab === 'roster' && (
            <>
                <div className="flex-grow">
                <LabDutyCalendar url={labDutyRosterUrl} />
                </div>
            </>
            )}
        </div>
    </>
  )
}