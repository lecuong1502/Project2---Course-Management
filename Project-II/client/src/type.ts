export enum CourseType {
    ONLINE = 'Online',
    OFFLINE = 'Offline'
}

export enum UserRole {
    GUEST = 'Guest',
    STUDENT = 'Student',
    STAFF = 'Staff',
    MANAGER = 'Manager'
}

export interface Course {
    id: string;
    title: string;
    description: string;
    type: CourseType;
    price: number;
    schedule: string;
    image: string;
    level: string;
}

export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
}

export interface Student {
    id: string;
    name: string;
    email: string;
    phone: string;
    registeredCourseId: string;
    paymentStatus: 'Pending' | 'Paid';
    placementScore?: number;
    assignedLevel?: string;
}

export interface ClassGroup {
    id: string;
    courseId: string;
    name: string;
    type: CourseType;
    students: string[]; // Student IDs
    schedule: string;
    room?: string; // Only for online
    status: 'Pending' | 'Active' | 'Full' | 'SplitRequired';
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    timestamp: number;
}