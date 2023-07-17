import { facultyBloodGroupTypes } from './faculty.interface';

export const facultyFilterableFields = [
  'searchTerm',
  'id',
  'gender',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
  'designation',
];

export const facultySearchableFields = [
  'email',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];

export const facultyBloodGroup: facultyBloodGroupTypes[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];
