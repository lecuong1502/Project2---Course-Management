import React, { useState } from 'react';
import { MOCK_COURSES } from '../constants';
import { CourseType } from '../type';
import { Calendar, DollarSign, Signal, Users } from 'lucide-react';

interface CoursesProps {
    onRegisterClick: (courseId: string) => void;
}

const Courses: React.FC<CoursesProps> = ({ onRegisterClick }) => {
    const [filter, setFilter] = useState<'All' | CourseType>('All');

    const filteredCourses = MOCK_COURSES.filter(c => filter === 'All' || c.type === filter);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Available Courses</h1>
                    <p className="text-slate-600 mt-2">Explore our wide range of language programs.</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-2">
                    {(['All', CourseType.ONLINE, CourseType.OFFLINE] as const).map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === type
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredCourses.map(course => (
                    <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                            <img src={course.image} alt={course.title} className="h-48 w-full object-cover md:h-full" />
                        </div>
                        <div className="p-6 md:w-2/3 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-semibold">
                                        {course.level}
                                    </span>
                                </div>
                                <p className="mt-2 text-slate-600 text-sm">{course.description}</p>

                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="flex items-center text-sm text-slate-500">
                                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                        {course.schedule}
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500">
                                        <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                                        ${course.price}
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500">
                                        {course.type === CourseType.ONLINE ? (
                                            <Signal className="w-4 h-4 mr-2 text-purple-500" />
                                        ) : (
                                            <Users className="w-4 h-4 mr-2 text-orange-500" />
                                        )}
                                        {course.type}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => onRegisterClick(course.id)}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Register for Class
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;