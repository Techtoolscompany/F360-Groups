export type UserRole = 'admin' | 'pastor' | 'moderator' | 'member';

export interface Permission {
  action: 'create' | 'read' | 'update' | 'delete';
  resource: 'sermons' | 'announcements' | 'events' | 'users' | 'groups' | 'posts';
}

export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    { action: 'create', resource: 'sermons' },
    { action: 'read', resource: 'sermons' },
    { action: 'update', resource: 'sermons' },
    { action: 'delete', resource: 'sermons' },
    // Add all other admin permissions
  ],
  pastor: [
    { action: 'create', resource: 'sermons' },
    { action: 'read', resource: 'sermons' },
    { action: 'update', resource: 'sermons' },
    // Limited permissions for pastors
  ],
  moderator: [
    { action: 'read', resource: 'sermons' },
    // Moderator specific permissions
  ],
  member: [
    { action: 'read', resource: 'sermons' },
    // Basic member permissions
  ]
};