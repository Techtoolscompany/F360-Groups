-- Create enum types
CREATE TYPE user_role AS ENUM ('member', 'moderator', 'pastor', 'admin', 'master_admin');

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'member'::user_role NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  assigned_by UUID REFERENCES profiles(id),
  assigned_at TIMESTAMP WITH TIME ZONE
);

-- Create role_permissions table
CREATE TABLE role_permissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role user_role NOT NULL,
  resource TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(role, resource, action)
);

-- Create admin_logs table
CREATE TABLE admin_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES profiles(id) NOT NULL,
  action TEXT NOT NULL,
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_permissions view
CREATE VIEW user_permissions AS
SELECT 
  p.id as user_id,
  p.role,
  jsonb_agg(
    jsonb_build_object(
      'resource', rp.resource,
      'action', rp.action
    )
  ) as permissions
FROM profiles p
JOIN role_permissions rp ON p.role::text = rp.role::text
GROUP BY p.id, p.role;

-- Create functions
CREATE OR REPLACE FUNCTION check_permission(
  user_id UUID,
  resource TEXT,
  action TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  user_role user_role;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = user_id;
  
  RETURN EXISTS (
    SELECT 1 
    FROM role_permissions 
    WHERE role = user_role 
    AND resource = check_permission.resource 
    AND action = check_permission.action
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION assign_role(
  user_id UUID,
  new_role user_role,
  assigner_id UUID
) RETURNS BOOLEAN AS $$
DECLARE
  assigner_role user_role;
BEGIN
  -- Get assigner's role
  SELECT role INTO assigner_role FROM profiles WHERE id = assigner_id;
  
  -- Only master_admin can assign admin roles
  IF new_role = 'admin' AND assigner_role != 'master_admin' THEN
    RETURN false;
  END IF;
  
  -- Update user's role
  UPDATE profiles 
  SET 
    role = new_role,
    assigned_by = assigner_id,
    assigned_at = NOW()
  WHERE id = user_id;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert initial master admin
INSERT INTO auth.users (id, email) VALUES 
  ('00000000-0000-0000-0000-000000000000', 'master@church.com');

INSERT INTO profiles (id, username, full_name, role) VALUES 
  ('00000000-0000-0000-0000-000000000000', 'master_admin', 'Master Admin', 'master_admin');

-- Insert initial permissions
INSERT INTO role_permissions (role, resource, action) VALUES
  ('master_admin', '*', '*'),
  ('admin', 'sermons', '*'),
  ('admin', 'users', 'read'),
  ('admin', 'users', 'update'),
  ('pastor', 'sermons', 'create'),
  ('pastor', 'sermons', 'read'),
  ('pastor', 'sermons', 'update'),
  ('moderator', 'sermons', 'read'),
  ('moderator', 'users', 'read'),
  ('member', 'sermons', 'read');