import React, { useState } from 'react';
import { MOCK_COURSES, PLACEMENT_TEST } from '../constants';
// import { Question } from '../type';
import { CheckCircle, CreditCard, FileText, UserCheck } from 'lucide-react';

interface RegistrationProps {
    selectedCourseId?: string;
    onComplete: () => void;
}

type Step = 'info' | 'payment' | 'test' | 'result';

const Registration: React.FC<RegistrationProps> = ({ selectedCourseId, onComplete }) => {
    const [step, setStep] = useState<Step>('info');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        courseId: selectedCourseId || MOCK_COURSES[0].id
    });
    const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
    const [score, setScore] = useState(0);

    // --- Step Handlers ---

    const handleInfoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('payment');
    };

    const handlePayment = () => {
        // Simulate Payment API call
        setTimeout(() => {
            setStep('test');
        }, 1500);
    };

    const handleTestSubmit = () => {
        let correctCount = 0;
        PLACEMENT_TEST.forEach(q => {
            if (testAnswers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setStep('result');
    };

    // --- Renders ---

    const renderProgressBar = () => {
        const steps: Step[] = ['info', 'payment', 'test', 'result'];
        const currentIndex = steps.indexOf(step);

        return (
            <div className="w-full py-6">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
                    {steps.map((s, idx) => (
                        <div key={s} className={`flex flex-col items-center bg-white px-2`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${idx <= currentIndex ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 text-slate-400'
                                }`}>
                                {idx + 1}
                            </div>
                            <span className="text-xs font-medium mt-1 uppercase text-slate-500">{s}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderInfoForm = () => (
        <form onSubmit={handleInfoSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <input
                    required
                    type="text"
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                    required
                    type="email"
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Phone</label>
                <input
                    required
                    type="tel"
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Select Course</label>
                <select
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.courseId}
                    onChange={e => setFormData({ ...formData, courseId: e.target.value })}
                >
                    {MOCK_COURSES.map(c => (
                        <option key={c.id} value={c.id}>{c.title} - ${c.price}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium">
                Proceed to Payment
            </button>
        </form>
    );

    const renderPayment = () => {
        const course = MOCK_COURSES.find(c => c.id === formData.courseId);
        return (
            <div className="text-center space-y-6">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Tuition Summary</h3>
                    <p className="text-slate-600">Course: <span className="font-medium">{course?.title}</span></p>
                    <p className="text-2xl font-bold text-blue-700 mt-4">${course?.price}</p>
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 font-medium shadow-lg transition-transform active:scale-95"
                >
                    <CreditCard className="w-5 h-5" /> Pay & Continue
                </button>
                <p className="text-xs text-slate-400">Safe payment simulation. No real money is charged.</p>
            </div>
        );
    };

    const renderTest = () => (
        <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md text-blue-800 text-sm mb-4">
                <FileText className="w-4 h-4 inline mr-2" />
                Please answer the following questions to determine your entry level.
            </div>
            {PLACEMENT_TEST.map((q, index) => (
                <div key={q.id} className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
                    <p className="font-medium text-slate-800 mb-3">{index + 1}. {q.text}</p>
                    <div className="space-y-2">
                        {q.options.map((opt, optIdx) => (
                            <label key={optIdx} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name={`question-${q.id}`}
                                    className="form-radio h-4 w-4 text-blue-600"
                                    onChange={() => setTestAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                                    checked={testAnswers[q.id] === optIdx}
                                />
                                <span className="text-slate-700">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button
                onClick={handleTestSubmit}
                disabled={Object.keys(testAnswers).length < PLACEMENT_TEST.length}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
                Submit Test
            </button>
        </div>
    );

    const renderResult = () => {
        const percentage = (score / PLACEMENT_TEST.length) * 100;
        let level = 'Beginner';
        if (percentage > 80) level = 'Advanced';
        else if (percentage > 50) level = 'Intermediate';

        return (
            <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Complete!</h2>
                <p className="text-slate-600 mb-6">
                    Thank you, <span className="font-semibold">{formData.fullName}</span>.
                </p>

                <div className="bg-white border border-slate-200 rounded-lg p-6 max-w-sm mx-auto shadow-sm text-left">
                    <h4 className="font-bold text-slate-700 border-b pb-2 mb-2">Placement Result</h4>
                    <div className="flex justify-between mb-1">
                        <span className="text-slate-500">Score:</span>
                        <span className="font-medium">{score}/{PLACEMENT_TEST.length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Assigned Level:</span>
                        <span className="font-bold text-blue-600">{level}</span>
                    </div>
                </div>

                <p className="text-sm text-slate-500 mt-8 mb-6">
                    Your results have been sent to the administration office for class placement. We will contact you shortly.
                </p>

                <button
                    onClick={onComplete}
                    className="px-6 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 transition-colors"
                >
                    Return Home
                </button>
            </div>
        );
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="bg-blue-700 px-6 py-4">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <UserCheck className="w-5 h-5 mr-2" /> Student Registration
                    </h2>
                </div>

                <div className="px-6">
                    {renderProgressBar()}
                </div>

                <div className="p-6">
                    {step === 'info' && renderInfoForm()}
                    {step === 'payment' && renderPayment()}
                    {step === 'test' && renderTest()}
                    {step === 'result' && renderResult()}
                </div>
            </div>
        </div>
    );
};

export default Registration;