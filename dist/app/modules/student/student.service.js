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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const student_constant_1 = require("./student.constant");
const student_model_1 = require("./student.model");
const getStudentService = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, searchTermData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: student_constant_1.studentSearchKeys.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(searchTermData).length) {
        andConditions.push({
            $and: Object.entries(searchTermData).map(([fields, value]) => ({
                [fields]: value,
            })),
        });
    }
    // pagination sort
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelper.paginationCalculation(paginationOption);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length ? { $and: andConditions } : {};
    const result = yield student_model_1.Student.find(whereConditions)
        .populate('academicFaculty')
        .populate('academicDepartment')
        .populate('academicSemester')
        .sort(sortConditions)
        .limit(limit)
        .skip(skip);
    const total = yield student_model_1.Student.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const SingleStudentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id)
        .populate('academicFaculty')
        .populate('academicDepartment')
        .populate('academicSemester');
    return result;
});
const updateSingleStudentService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield student_model_1.Student.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Data not found');
    }
    const { guardian, localGuardian, name } = payload, studentData = __rest(payload, ["guardian", "localGuardian", "name"]);
    const updateStudentData = Object.assign({}, studentData);
    // user name updated
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            updateStudentData[nameKey] = name[key];
        });
    }
    // user guardian updated
    if (guardian && Object.keys(guardian).length > 0) {
        Object.keys(guardian).forEach(key => {
            const nameKey = `guardian.${key}`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            updateStudentData[nameKey] =
                guardian[key];
        });
    }
    // user localGuardian updated
    if (localGuardian && Object.keys(localGuardian).length > 0) {
        Object.keys(localGuardian).forEach(key => {
            const nameKey = `localGuardian.${key}`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            updateStudentData[nameKey] =
                localGuardian[key];
        });
    }
    const result = yield student_model_1.Student.findByIdAndUpdate(id, updateStudentData, {
        new: true,
    });
    return result;
});
const deleteSingleStudentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findByIdAndDelete(id)
        .populate('academicFaculty')
        .populate('academicDepartment')
        .populate('academicSemester');
    return result;
});
exports.studentService = {
    getStudentService,
    SingleStudentService,
    deleteSingleStudentService,
    updateSingleStudentService,
};
