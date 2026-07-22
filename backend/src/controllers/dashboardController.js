const Course = require('../models/Course.model');
const User = require('../models/User.model');
const Enrollment = require('../models/Enrollment.model');

const getDashboard = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();

    const totalStudents = await User.countDocuments({ role: 'student' });

    const totalTeachers = await User.countDocuments({ role: 'teacher' });

    const totalEnrollments = await Enrollment.countDocuments();

    const topCourses = await Enrollment.aggregate([
      {
        $group: {
          _id: '$courseId',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 4 },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'course',
        },
      },
      { $unwind: { path: '$course', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: '$course._id',
          name: '$course.name',
          count: 1,
        },
      },
    ]);

    const maxCount = topCourses.length > 0 ? topCourses[0].count : 1;

    const topCoursesWithPercent = topCourses.map((c) => ({
      _id: c._id,
      name: c.name || 'Curso sin nombre',
      count: c.count,
      percent: Math.round((c.count / maxCount) * 100),
    }));

    const recentEnrollments = await Enrollment.find()
      .populate({
        path: 'studentId',
        select: 'name email',
      })
      .populate({
        path: 'courseId',
        select: 'name price',
      })
      .sort({ enrolledAt: -1 })
      .limit(5);

    const recentEnrollmentsData = recentEnrollments.map((e) => ({
      _id: e._id,
      student: e.studentId
        ? { name: e.studentId.name, email: e.studentId.email }
        : null,
      course: e.courseId
        ? { name: e.courseId.name, price: e.courseId.price }
        : null,
      date: e.enrolledAt || e.createdAt,
    }));

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const coursesThisMonth = await Course.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });
    const studentsThisMonth = await User.countDocuments({
      role: 'student',
      createdAt: { $gte: thirtyDaysAgo },
    });
    const teachersThisMonth = await User.countDocuments({
      role: 'teacher',
      createdAt: { $gte: thirtyDaysAgo },
    });
    const enrollmentsThisMonth = await Enrollment.countDocuments({
      enrolledAt: { $gte: thirtyDaysAgo },
    });

    res.status(200).json({
      status: 'success',
      data: {
        totalCourses,
        totalStudents,
        totalTeachers,
        totalEnrollments,
        topCourses: topCoursesWithPercent,
        recentEnrollments: recentEnrollmentsData,
        thisMonth: {
          courses: coursesThisMonth,
          students: studentsThisMonth,
          teachers: teachersThisMonth,
          enrollments: enrollmentsThisMonth,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard };