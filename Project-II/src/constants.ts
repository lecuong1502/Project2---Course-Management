import { type Course, CourseType, type Question, type ClassGroup } from './type';

export const MOCK_COURSES: Course[] = [
    {
        id: 'eng-basic-online',
        title: 'English for Beginners (Online)',
        description: 'Start your journey with basic grammar and vocabulary from home via Zoom.',
        type: CourseType.ONLINE,
        price: 150,
        schedule: 'Mon-Wed 19:00-20:30',
        image: 'https://picsum.photos/400/250?random=1',
        level: 'A1'
    },
    {
        id: 'eng-inter-offline',
        title: 'Intermediate English (Offline)',
        description: 'Interactive classroom sessions focusing on conversation and business skills.',
        type: CourseType.OFFLINE,
        price: 200,
        schedule: 'Tue-Thu 18:00-19:30',
        image: 'https://picsum.photos/400/250?random=2',
        level: 'B1'
    },
    {
        id: 'ielts-prep-offline',
        title: 'IELTS Preparation (Offline)',
        description: 'Intensive training for IELTS exam. Focus on all 4 skills.',
        type: CourseType.OFFLINE,
        price: 300,
        schedule: 'Sat-Sun 09:00-11:00',
        image: 'https://picsum.photos/400/250?random=3',
        level: 'B2+'
    },
    {
        id: 'jpn-n5-online',
        title: 'Japanese N5 (Online)',
        description: 'Learn Japanese alphabet, basic greetings and culture.',
        type: CourseType.ONLINE,
        price: 180,
        schedule: 'Mon-Fri 20:00-21:00',
        image: 'https://picsum.photos/400/250?random=4',
        level: 'N5'
    }
];

export const PLACEMENT_TEST: Question[] = [
    {
        id: 1,
        text: "Select the correct verb form: She _____ to the market yesterday.",
        options: ["go", "gone", "went", "goes"],
        correctAnswer: 2
    },
    {
        id: 2,
        text: "Which sentence is correct?",
        options: ["I have seen him last week.", "I saw him last week.", "I seed him last week.", "I see him last week."],
        correctAnswer: 1
    },
    {
        id: 3,
        text: "Complete the sentence: If I _____ you, I would study harder.",
        options: ["was", "am", "were", "be"],
        correctAnswer: 2
    },
    {
        id: 4,
        text: "Choose the synonym for 'Happy':",
        options: ["Sad", "Joyful", "Angry", "Bored"],
        correctAnswer: 1
    },
    {
        id: 5,
        text: "Select the correct preposition: We arrived _____ the airport at 6 PM.",
        options: ["in", "on", "at", "to"],
        correctAnswer: 2
    }
];

// Initial mock classes to demonstrate dashboard logic
export const MOCK_CLASSES: ClassGroup[] = [
    {
        id: 'class-offline-001',
        courseId: 'eng-inter-offline',
        name: 'English Inter A',
        type: CourseType.OFFLINE,
        students: Array.from({ length: 15 }, (_, i) => `st-${i}`), // 15 students
        schedule: 'Tue-Thu 18:00',
        room: 'Room 101',
        status: 'Pending' // Needs 20
    },
    {
        id: 'class-offline-002',
        courseId: 'ielts-prep-offline',
        name: 'IELTS Prep Batch 1',
        type: CourseType.OFFLINE,
        students: Array.from({ length: 32 }, (_, i) => `st-${i+100}`), // 32 students
        schedule: 'Sat-Sun 09:00',
        room: 'Room 202',
        status: 'SplitRequired' // > 30
    },
    {
        id: 'class-online-001',
        courseId: 'eng-basic-online',
        name: 'English Online Group 1',
        type: CourseType.ONLINE,
        students: Array.from({ length: 12 }, (_, i) => `st-${i+200}`), // 12 students
        schedule: 'Mon-Wed 19:00',
        status: 'Active' // >= 10
    }
];