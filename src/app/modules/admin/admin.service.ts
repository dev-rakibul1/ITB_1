import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getSingleAdminService = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id);
  return result;
};

export const adminService = {
  getSingleAdminService,
};
