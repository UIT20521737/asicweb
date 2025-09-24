// src/data/services.js

// Dữ liệu giả lập đầy đủ
const mockData = {
  shortCourses: [
    {
      id: 'intro-ic',
      title: 'Introduction to IC Design',
      description: 'A foundational course covering the principles and methodologies of integrated circuit design.',
      details: 'This course provides hands-on experience with industry-standard tools for digital IC design, including RTL, synthesis, and physical design. The curriculum includes practical projects and case studies.',
      registrationLink: 'https://docs.google.com/forms/d/...',
    },
    {
      id: 'aiot-application',
      title: 'AIoT Applications Workshop',
      description: 'Learn to develop intelligent IoT devices by integrating AI and machine learning at the edge.',
      details: 'Participants will work on a capstone project to build a smart device from scratch, covering everything from sensor integration to model deployment on a micro-controller. Prior experience in programming is recommended.',
      registrationLink: 'https://docs.google.com/forms/d/...',
    },
  ],
  labEquipment: [
    { 
      id: 1, 
      name: 'Oscilloscope', 
      brand: 'Keysight', 
      model: 'DSOX1204G', 
      image: '/images/equipment/oscilloscope.jpg' 
    },
    { 
      id: 2, 
      name: 'Logic Analyzer', 
      brand: 'Tektronix', 
      model: 'TLA704', 
      image: '/images/equipment/logic-analyzer.jpg' 
    },
    { 
      id: 3, 
      name: 'FPGA Development Kit', 
      brand: 'Xilinx', 
      model: 'ZCU102', 
      image: '/images/equipment/fpga-kit.jpg' 
    },
  ],
  internshipLink: 'https://docs.google.com/forms/d/...',
};

// Hàm fetch chuyên biệt cho Short Courses
export const fetchShortCourses = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockData.shortCourses;
};

// Hàm fetch chuyên biệt cho Lab Equipment
export const fetchLabEquipment = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockData.labEquipment;
};

// Hàm fetch chuyên biệt cho Internship Link
export const fetchInternshipLink = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockData.internshipLink;
};

// Hàm fetch chi tiết một khóa học
export const fetchCourseDetails = async (courseId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockData.shortCourses.find(course => course.id === courseId) || null;
};