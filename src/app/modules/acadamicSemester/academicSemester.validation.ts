import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academicSemester.constant';

// ZOD use
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string, ...string[]]),
    year: z.number({
      required_error: 'Year is require!',
    }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start month is require!',
    }),

    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is require!',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
