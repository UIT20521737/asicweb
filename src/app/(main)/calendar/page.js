// src/app/(main)/calendar/page.js

import CalendarList from "@/components/CalendarList"

const googleFormsUrl = "https://docs.google.com/forms/d/1tHJP080CAnUF8eJTidZjkRaEsWYwX0DCvtiGsRtj9aY/viewform?usp=sf_link";
const googleSheetUrl = "https://docs.google.com/spreadsheets/d/1dTiUyMNdo0_0YCKJt2g6DVAgYDdHHgnGDCa27TYdyVI/edit?gid=246387230#gid=246387230";

export const metadata = {
  title: 'Calendar',
  description: 'View the lab\'s activity schedule and member duty roster.',
}
export default function Calendar() {

  return (
    <div className="mx-10 text-center">
      
      <CalendarList/>

      {/* Các nút liên kết Google Forms/Sheets */}
      <div className="flex justify-center space-x-4 mt-6 mb-10 mx-4">
        <a
          href={googleSheetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-btn-url hover:bg-btn-url-hover text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          View Lab Schedule
        </a>
        <a
          href={googleFormsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-btn-url hover:bg-btn-url-hover text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          Register for Lab Time
        </a>
      </div>
    </div>
  );
}