const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Enum for roles
const USER_ROLES = {
    ADMIN: 'admin',
    STAFF: 'staff',
    TEACHER: 'teacher',
    STUDENT: 'student',
    LEADER: 'leader'
}

// Users
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Save hash password
    fullName: { type: String, required: true },
    phone: { type: String },
    age: { type: Number },
    avatarUrl: { type: String },

    role: {
        type: String,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.STUDENT
    },

    studentProfile: {
        studentId: { type: String },
        level: { type: String },
        certifications: [String],
        status: { type: String, default: 'active' }
    },

    staffProfile: {
        staffId: { type: String },
        salary: { type: Number },
        degree: { type: String }, 
        subjects: [String], 
        authenticationLevel: { type: Number } // Quyền hạn chi tiết
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Courses
const courseSchema = new Schema({
    courseCode: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    description: {type: String},
    baseFee: { type: Number },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

// Classes
const classSchema = new Schema({
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    
    name: { type: String },
    
    // Giảng viên (Tham chiếu đến User có role Teacher)
    teacher: { type: Schema.Types.ObjectId, ref: 'User' },
    
    // Danh sách sinh viên (Array of References)
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    
    // Lịch học (Nhúng trực tiếp vào Class - Embed)
    schedule: [{
        dayOfWeek: { type: String }, // Monday, Tuesday...
        startTime: { type: String }, // "07:00"
        endTime: { type: String },   // "09:00"
        room: { type: String }       // Phòng học/online
    }],

    // Tài liệu & Bài kiểm tra (Có thể tham chiếu hoặc nhúng ID)
    videoLectures: [{ type: Schema.Types.ObjectId, ref: 'VideoLecture' }],
    tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }],

    status: { 
        type: String, 
        enum: ['pending', 'ongoing', 'finished'], 
        default: 'pending' 
    }
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);

//Contents
const videoLectureSchema = new Schema({
    class: { type: Schema.Types.ObjectId, ref: 'Class' }, // Thuộc về lớp nào
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    uploadDate: { type: Date, default: Date.now }
});

const testSchema = new Schema({
    class: {type: Schema.Types.ObjectId, ref: 'Class'},
    title: { type: String, required: true },
    startTime: { type: Number },
    durationMinutes: { type: Number },
    content: { type: String },
    url: { type: String }    // Link bài test nếu làm bên thứ 3
});

const VideoLecture = mongoose.model('VideoLecture', videoLectureSchema);
const Test = mongoose.model('Test', testSchema);

// Requests
const requestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Người gửi
    type: { type: String, required: true }, // Loại yêu cầu
    description: { type: String },
    
    // Trạng thái xử lý
    status: { type: String, enum: ['open', 'processing', 'resolved'], default: 'open' },
    
    // Ai là người xử lý (Staff)
    handledBy: { type: Schema.Types.ObjectId, ref: 'User' },
    responseMessage: { type: String }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

// TRUY VẤN, CẬP NHẬT, THỐNG KÊ từ DATABASE.

// // Giả sử bạn đã có userId của sinh viên (từ session đăng nhập)
// const studentId = "64b1f2..."; 

// async function getStudentClasses(studentId) {
//   try {
//     const classes = await Class.find({ students: studentId })
//       // .populate giúp lấy thông tin chi tiết từ ID tham chiếu
//       .populate('course', 'name courseCode baseFee') // Chỉ lấy tên, mã, học phí từ Course
//       .populate('teacher', 'fullName email')         // Chỉ lấy tên và email giảng viên
//       .select('name schedule status');               // Chỉ lấy tên lớp, lịch học, trạng thái

//     console.log("Danh sách lớp học:", classes);
//     return classes;
//   } catch (error) {
//     console.error("Lỗi:", error);
//   }
// }

// async function getClassDetail(classId) {
//   try {
//     const classDetail = await Class.findById(classId)
//       .populate('teacher', 'fullName phone') // Lấy thông tin giảng viên
//       .populate('students', 'fullName email studentProfile.studentId'); // Lấy danh sách SV

//     console.log("Giảng viên:", classDetail.teacher.fullName);
//     console.log("Lịch học:", classDetail.schedule); // Mảng schedule đã có sẵn, không cần query thêm
//     console.log("Số lượng SV:", classDetail.students.length);
    
//     return classDetail;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function enrollStudent(classId, studentId) {
//   try {
//     // $push: Thêm phần tử vào mảng
//     // $addToSet: Giống $push nhưng sẽ không thêm nếu ID đó đã tồn tại (tránh trùng lặp)
//     const updatedClass = await Class.findByIdAndUpdate(
//       classId,
//       { $addToSet: { students: studentId } }, 
//       { new: true } // Trả về dữ liệu mới sau khi update
//     );

//     console.log("Đã thêm sinh viên vào lớp:", updatedClass.name);
//   } catch (error) {
//     console.error("Lỗi đăng ký:", error);
//   }
// }

// async function updateSchedule(classId, newRoom) {
//     // Cập nhật tất cả các buổi học trong lớp này sang phòng mới
//     // Hoặc dùng logic phức tạp hơn để sửa 1 buổi cụ thể
//     await Class.findByIdAndUpdate(classId, {
//         $set: { "schedule.$[].room": newRoom } 
//     });
// }

// async function calculateRevenue() {
//   const stats = await Class.aggregate([
//     { $match: { status: 'ongoing' } }, // 1. Chỉ lấy lớp đang học
//     {
//       $lookup: { // 2. Join với bảng Course để lấy giá tiền
//         from: 'courses',
//         localField: 'course',
//         foreignField: '_id',
//         as: 'courseInfo'
//       }
//     },
//     { $unwind: '$courseInfo' }, // 3. Trải phẳng mảng courseInfo
//     {
//       $project: { // 4. Tính toán tạm thời doanh thu từng lớp
//         className: '$name',
//         studentCount: { $size: '$students' },
//         fee: '$courseInfo.baseFee',
//         totalClassRevenue: { $multiply: [{ $size: '$students' }, '$courseInfo.baseFee'] }
//       }
//     }
//   ]);
  
//   console.log(stats);
// }