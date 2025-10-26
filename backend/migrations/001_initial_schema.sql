-- SciHub Database Schema
-- PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (students and teachers)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    google_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
    grade_level VARCHAR(10),
    profile_picture_url TEXT,
    interests TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(50),
    grade_levels VARCHAR(10)[],
    dci_codes VARCHAR(50)[],
    ccc_codes VARCHAR(50)[],
    sep_codes VARCHAR(50)[],
    driving_question TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_template_id ON projects(template_id);

-- Student projects (enrollment)
CREATE TABLE student_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'paused')),
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(student_id, project_id)
);

CREATE INDEX idx_student_projects_student ON student_projects(student_id);
CREATE INDEX idx_student_projects_status ON student_projects(status);

-- Notecards table
CREATE TABLE notecards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,

    -- Card content
    front_side_type VARCHAR(20) DEFAULT 'text' CHECK (front_side_type IN ('text', 'image', 'both')),
    front_side_content TEXT,
    front_side_image_url TEXT,
    back_side_type VARCHAR(20) DEFAULT 'text' CHECK (back_side_type IN ('text', 'image', 'both')),
    back_side_content TEXT,
    back_side_image_url TEXT,

    -- NGSS alignment
    dci_codes VARCHAR(50)[],
    ccc_codes VARCHAR(50)[],
    sep_codes VARCHAR(50)[],

    -- Metadata
    prompt TEXT,
    self_assessment TEXT,
    teacher_feedback TEXT,
    tags TEXT[],
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewed', 'starred')),

    -- Spaced repetition
    next_review_date TIMESTAMP WITH TIME ZONE,
    review_count INTEGER DEFAULT 0,
    mastery_level INTEGER DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 5),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP WITH TIME ZONE,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notecards_student ON notecards(student_id);
CREATE INDEX idx_notecards_project ON notecards(project_id);
CREATE INDEX idx_notecards_status ON notecards(status);
CREATE INDEX idx_notecards_created_date ON notecards(created_at);
CREATE INDEX idx_notecards_review_date ON notecards(next_review_date);
CREATE INDEX idx_notecards_submitted_date ON notecards(submitted_at);

-- Standards mastery tracking
CREATE TABLE student_standards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    standard_code VARCHAR(50) NOT NULL,
    standard_type VARCHAR(10) NOT NULL CHECK (standard_type IN ('DCI', 'CCC', 'SEP')),
    mastery_level INTEGER DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 5),
    evidence_count INTEGER DEFAULT 0,
    last_practiced_at TIMESTAMP WITH TIME ZONE,
    mastered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, standard_code, standard_type)
);

CREATE INDEX idx_student_standards_student ON student_standards(student_id);
CREATE INDEX idx_student_standards_type ON student_standards(standard_type);
CREATE INDEX idx_student_standards_mastery ON student_standards(mastery_level);

-- Learning paths (personalized goals)
CREATE TABLE learning_paths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    current_unit VARCHAR(255),
    completed_units TEXT[],
    personalized_goals TEXT[],
    next_standards VARCHAR(50)[],
    recommended_projects UUID[],
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_learning_paths_student ON learning_paths(student_id);

-- Classes (for teachers to organize students)
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    grade_level VARCHAR(10),
    class_code VARCHAR(20) UNIQUE NOT NULL,
    school_year VARCHAR(20),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_classes_teacher ON classes(teacher_id);
CREATE INDEX idx_classes_code ON classes(class_code);
CREATE INDEX idx_classes_active ON classes(active);

-- Class enrollments
CREATE TABLE class_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(class_id, student_id)
);

CREATE INDEX idx_class_enrollments_class ON class_enrollments(class_id);
CREATE INDEX idx_class_enrollments_student ON class_enrollments(student_id);

-- Notecard prompts (teacher-created or system)
CREATE TABLE notecard_prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_by_teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    prompt_text TEXT NOT NULL,
    prompt_type VARCHAR(50) CHECK (prompt_type IN ('observation', 'explanation', 'question', 'connection', 'reflection', 'design')),
    dci_codes VARCHAR(50)[],
    ccc_codes VARCHAR(50)[],
    sep_codes VARCHAR(50)[],
    sentence_starters TEXT[],
    thinking_prompts TEXT[],
    visual_suggestions TEXT[],
    grade_level VARCHAR(10),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notecard_prompts_project ON notecard_prompts(project_id);
CREATE INDEX idx_notecard_prompts_type ON notecard_prompts(prompt_type);
CREATE INDEX idx_notecard_prompts_public ON notecard_prompts(is_public);

-- Achievements/badges
CREATE TABLE student_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id VARCHAR(100) NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, achievement_id)
);

CREATE INDEX idx_student_achievements_student ON student_achievements(student_id);
CREATE INDEX idx_student_achievements_earned ON student_achievements(earned_at);

-- Activity log (for analytics)
CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action_type VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_log_user ON activity_log(user_id);
CREATE INDEX idx_activity_log_action ON activity_log(action_type);
CREATE INDEX idx_activity_log_created ON activity_log(created_at);
CREATE INDEX idx_activity_log_metadata ON activity_log USING gin(metadata);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notecards_updated_at BEFORE UPDATE ON notecards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_standards_updated_at BEFORE UPDATE ON student_standards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at BEFORE UPDATE ON learning_paths
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Views for common queries

-- Student dashboard view
CREATE VIEW v_student_dashboard AS
SELECT
    u.id as student_id,
    u.name,
    u.grade_level,
    COUNT(DISTINCT n.id) FILTER (WHERE n.status = 'submitted') as total_notecards,
    COUNT(DISTINCT n.id) FILTER (WHERE n.created_at >= CURRENT_DATE - INTERVAL '7 days') as notecards_this_week,
    COUNT(DISTINCT ss.id) FILTER (WHERE ss.mastery_level >= 4) as mastered_standards_count,
    COUNT(DISTINCT n.id) FILTER (WHERE n.next_review_date <= CURRENT_TIMESTAMP) as cards_need_review,
    sp.project_id as current_project_id,
    p.title as current_project_title
FROM users u
LEFT JOIN notecards n ON u.id = n.student_id
LEFT JOIN student_standards ss ON u.id = ss.student_id
LEFT JOIN student_projects sp ON u.id = sp.student_id AND sp.status = 'in_progress'
LEFT JOIN projects p ON sp.project_id = p.id
WHERE u.role = 'student'
GROUP BY u.id, u.name, u.grade_level, sp.project_id, p.title;

-- Teacher class overview
CREATE VIEW v_teacher_class_overview AS
SELECT
    c.id as class_id,
    c.name as class_name,
    c.teacher_id,
    COUNT(DISTINCT ce.student_id) as student_count,
    COUNT(DISTINCT n.id) FILTER (WHERE n.submitted_at >= CURRENT_DATE) as notecards_today,
    COUNT(DISTINCT n.id) FILTER (WHERE n.status = 'submitted' AND n.teacher_feedback IS NULL) as pending_review
FROM classes c
LEFT JOIN class_enrollments ce ON c.id = ce.class_id
LEFT JOIN notecards n ON ce.student_id = n.student_id
WHERE c.active = true
GROUP BY c.id, c.name, c.teacher_id;

-- Grant permissions (adjust for your user)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO scihub_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO scihub_user;
-- GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO scihub_user;
