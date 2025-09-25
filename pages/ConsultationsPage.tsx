import React, { useState } from 'react';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

const availableTimeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

const ConsultationsPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isAvailable = (day: number) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = checkDate.getDay();
    // Available Mon-Fri, and not in the past (allowing today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dayOfWeek > 0 && dayOfWeek < 6 && checkDate >= today;
  };
  
  const handleDateClick = (day: number) => {
    if (isAvailable(day)) {
        const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newSelectedDate);
        setSelectedTime(null);
    }
  }

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="p-2"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const isToday = today.getTime() === dayDate.getTime();
    const isSelected = selectedDate?.toDateString() === dayDate.toDateString();
    
    calendarDays.push(
      <div
        key={day}
        onClick={() => handleDateClick(day)}
        className={
            'p-2 text-center rounded-lg transition-colors duration-200 ' +
            (isSelected 
              ? 'bg-blue-600 text-white ring-2 ring-blue-300' 
              : !isAvailable(day) 
                ? 'text-gray-400 dark:text-gray-500' 
                : `cursor-pointer hover:bg-blue-500 hover:text-white ${isToday ? 'bg-blue-100 dark:bg-blue-800 font-bold text-blue-700 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`)
        }
      >
        {day}
      </div>
    );
  }

  return (
    <div>
      <BackButton />
      <Header title="Exaado Consultations" />
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0 text-center">
            <img src="https://picsum.photos/seed/drmohammed/150/150" alt="Dr. Mohammed" className="rounded-full mx-auto border-4 border-blue-500"/>
            <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">Dr. Mohammed</h3>
            <p className="text-blue-500 dark:text-blue-300">Chief Market Analyst</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Live Meeting Consultation</h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Book a personalized 1-on-1 consultation session with Dr. Mohammed. Get expert insights on your trading strategy, portfolio analysis, and market outlook. Each session is 60 minutes long and conducted via a private video call.
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-4">$250 / session</p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-4">Select a Date & Time</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">&lt;</button>
                        <h5 className="font-bold text-lg text-gray-800 dark:text-gray-100">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h5>
                        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">&gt;</button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-sm text-center text-gray-500 dark:text-gray-400 mb-2">
                        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-sm">
                        {calendarDays}
                    </div>
                </div>

                {/* Time Slots */}
                <div>
                    {selectedDate ? (
                        <div>
                            <p className="font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">Available Slots for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}:</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {availableTimeSlots.map(time => (
                                    <button 
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`p-3 rounded-lg border-2 text-center transition-colors duration-200 ${selectedTime === time ? 'bg-blue-600 text-white border-blue-500 dark:border-blue-400' : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-blue-500'}`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4">
                            <p className="text-gray-500 dark:text-gray-400">Please select an available date.</p>
                        </div>
                    )}
                </div>
            </div>
            {selectedDate && selectedTime && (
                <div className="mt-8 text-center">
                    <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-500 transition-colors duration-200 w-full md:w-auto">
                        Book Now for {selectedDate.toLocaleDateString()} at {selectedTime}
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationsPage;