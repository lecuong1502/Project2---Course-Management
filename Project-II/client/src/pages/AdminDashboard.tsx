import React from 'react';
import { MOCK_CLASSES } from '../constants';
import { type ClassGroup, CourseType } from '../type';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, Users, CheckCircle2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const getClassStatusDetails = (cls: ClassGroup) => {
        const count = cls.students.length;

        if (cls.type === CourseType.OFFLINE) {
            if (count < 20) return { color: 'text-amber-600', bg: 'bg-amber-50', text: `Needs ${20 - count} more (Min 20)` };
            if (count > 30) return { color: 'text-red-600', bg: 'bg-red-50', text: `Overloaded (+${count - 30}). Split required.` };
            return { color: 'text-green-600', bg: 'bg-green-50', text: 'Active (Healthy)' };
        } else {
            // Online
            if (count < 10) return { color: 'text-amber-600', bg: 'bg-amber-50', text: `Needs ${10 - count} more (Min 10)` };
            return { color: 'text-green-600', bg: 'bg-green-50', text: 'Active' };
        }
    };

    // Mock stats for Charts
    const statsData = [
        { name: 'Online Students', value: 150 },
        { name: 'Offline Students', value: 320 },
    ];
    const COLORS = ['#3b82f6', '#f59e0b'];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Administration Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <p className="text-slate-500 text-sm font-medium">Total Students</p>
                    <h3 className="text-3xl font-bold text-slate-800">470</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <p className="text-slate-500 text-sm font-medium">Active Classes</p>
                    <h3 className="text-3xl font-bold text-slate-800">{MOCK_CLASSES.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                    <p className="text-slate-500 text-sm font-medium">Pending Actions</p>
                    <h3 className="text-3xl font-bold text-slate-800">2</h3>
                    <p className="text-xs text-red-500 mt-1">1 Split Required, 1 Low Enrollment</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Class List Table */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-800">Class Management</h2>
                        <button className="text-sm text-blue-600 hover:underline">Generate Schedule</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Class Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Schedule</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Students</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {MOCK_CLASSES.map((cls) => {
                                    const status = getClassStatusDetails(cls);
                                    return (
                                        <tr key={cls.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-slate-900">{cls.name}</div>
                                                <div className="text-xs text-slate-500">{cls.courseId}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cls.type === CourseType.ONLINE ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}>
                                                    {cls.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                {cls.schedule}
                                                {cls.room && <div className="text-xs text-gray-400">Loc: {cls.room}</div>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-bold">
                                                {cls.students.length}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`flex items-center text-xs font-semibold ${status.color} ${status.bg} px-2 py-1 rounded-md`}>
                                                    {status.text.includes('Split') ? <AlertCircle className="w-3 h-3 mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
                                                    {status.text}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Charts & Quick Actions */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Student Distribution</h2>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statsData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {statsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center space-x-4 text-sm">
                            <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>Online</div>
                            <div className="flex items-center"><div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>Offline</div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Management Tools</h2>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 mb-3">
                            <Users className="w-4 h-4 mr-2" /> Manage Waiting Lists
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                            Download Reports
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;