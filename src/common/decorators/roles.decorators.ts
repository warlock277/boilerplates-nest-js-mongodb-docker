import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (action: string, module: string, ...group: string[]) => {
  return SetMetadata(ROLES_KEY, {
    action: action,
    module: module,
    group: group,
  });
};
