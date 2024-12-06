import { useAuth } from '../context/AuthContext';
import { Permission, rolePermissions } from '../types/permissions';

export function usePermissions() {
  const { currentUser } = useAuth();

  const hasPermission = (permission: Permission): boolean => {
    if (!currentUser) return false;
    
    const userPermissions = rolePermissions[currentUser.role];
    return userPermissions.some(
      p => p.action === permission.action && p.resource === permission.resource
    );
  };

  const canCreateSermon = () => hasPermission({ action: 'create', resource: 'sermons' });
  const canEditSermon = () => hasPermission({ action: 'update', resource: 'sermons' });
  const canDeleteSermon = () => hasPermission({ action: 'delete', resource: 'sermons' });

  return {
    hasPermission,
    canCreateSermon,
    canEditSermon,
    canDeleteSermon
  };
}