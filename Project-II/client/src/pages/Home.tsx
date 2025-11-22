import React from 'react';
import { MOCK_COURSES } from '../constants';
import { CourseType } from '../type';
import { ArrowRight, Monitor, Users, Globe } from 'lucide-react';

interface HomeProps {
    onNavigate: (view: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    const featuredCourses = MOCK_COURSES.slice(0, 3);

    return (
        <div className="flex flex-col">
            <div className="relative bg-blue-800 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-blue-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Master a new language</span>{' '}
                                    <span className="block text-amber-400 xl:inline">Online or Offline</span>
                                </h1>

                                <p className="mt-3 text-base text-blue-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Join EduCenter today. Flexible online schedules for busy learners and immersive offline classes for deep engagement.
                                </p>

                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <button onClick={() => onNavigate('register')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg">
                                            Register Now
                                        </button>
                                    </div>

                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <button onClick={() => onNavigate('consultation')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg">
                                            Chat with Consultant
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>

                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Students learning"
                    />
                </div>
            </div>

            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            A better way to learn
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                    <Monitor className="h-6 w-6" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Online Classes</p>
                                <p className="mt-2 ml-16 text-base text-slate-500">
                                    Flexible learning via Zoom/Meet with small class sizes (min 10 students).
                                </p>
                            </div>
                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                    <Users className="h-6 w-6" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Offline Interaction</p>
                                <p className="mt-2 ml-16 text-base text-slate-500">
                                    Immersive environment. Classes formed with 20-30 students for optimal interaction.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                    <Globe className="h-6 w-6" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Global Standards</p>
                                <p className="mt-2 ml-16 text-base text-slate-500">
                                    Curriculum based on international standards (CEFR, JLPT).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Popular Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredCourses.map(course => (
                            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${course.type === CourseType.ONLINE ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                                            {course.type}
                                        </span>
                                        <span className="text-slate-500 text-sm font-medium">${course.price}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                                    <p className="text-slate-600 text-sm mb-4">{course.description}</p>
                                    <button onClick={() => onNavigate('courses')} className="w-full flex items-center justify-center text-blue-600 font-semibold hover:text-blue-800">
                                        Learn More <ArrowRight className="ml-1 w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;