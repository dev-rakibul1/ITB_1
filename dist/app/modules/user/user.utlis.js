"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFacultyId = void 0;
const user_model_1 = __importDefault(require("./user.model"));
// find student id
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.default.findOne({ role: 'student' }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    const uniqueId = lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id;
    return uniqueId ? uniqueId.substring(uniqueId.length - 4) : null;
});
// generate student id
const generateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield findLastStudentId()) || (0).toString().padStart(5, '0');
    const fullIncrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    let incrementId = `${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.year}`;
    incrementId = incrementId.substring(incrementId.length - 2); // last 2 desigit
    const newIncrementId = incrementId + (academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.code) + fullIncrementId;
    return newIncrementId;
});
// find faculty id
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.default.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) ? lastFaculty.id.substring(2) : null;
});
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield findLastFacultyId()) || (0).toString().padStart(5, '0');
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementId = `F-${incrementId}`;
    return incrementId;
});
exports.generateFacultyId = generateFacultyId;
exports.default = generateStudentId;
