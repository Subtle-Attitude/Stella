-- PostgreSQL 16 Migration - Constitutional Foundation
-- Phase 1 Sprint 1
-- File: database/migrations/001_constitutional_foundation.sql

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Minimal users table (required by foreign keys).
-- Remove or adjust if you already have a users table.
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS constitutional_core (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version TEXT NOT NULL,
  principles JSONB NOT NULL,
  last_authorized_at TIMESTAMPTZ NOT NULL,
  authorized_by_user_id UUID NOT NULL,
  signature TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT fk_core_authorized_by FOREIGN KEY (authorized_by_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS adaptive_identity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  communication_preferences JSONB NOT NULL DEFAULT '{}',
  reasoning_preferences JSONB NOT NULL DEFAULT '{}',
  learned_corrections JSONB NOT NULL DEFAULT '[]',
  last_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_adaptive_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS memory_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('working','episodic','semantic','relational','stella_canon','user_canon')),
  provenance TEXT NOT NULL CHECK (provenance IN ('user_stated','user_confirmed_pattern','observed_pattern','ai_interpretation','unverified_assumption')),
  content TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  provenance_chain TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_modified_at TIMESTAMPTZ DEFAULT NOW(),
  author TEXT NOT NULL CHECK (author IN ('user','stella')),
  is_soft_deleted BOOLEAN DEFAULT FALSE,
  hard_deleted_at TIMESTAMPTZ,
  CONSTRAINT no_interpretations_in_user_canon CHECK (
    NOT (type = 'user_canon' AND provenance IN ('ai_interpretation', 'unverified_assumption'))
  ),
  CONSTRAINT fk_memory_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  before_state JSONB,
  after_state JSONB,
  performed_by TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  signature TEXT NOT NULL,
  CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_memory_user_type ON memory_records(user_id, type) WHERE is_soft_deleted = false;
CREATE INDEX IF NOT EXISTS idx_memory_provenance ON memory_records(provenance) WHERE is_soft_deleted = false;
CREATE INDEX IF NOT EXISTS idx_audit_user_timestamp ON audit_log(user_id, timestamp);

-- Row Level Security
ALTER TABLE memory_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE adaptive_identity ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS sovereignty_memory_policy ON memory_records;
DROP POLICY IF EXISTS sovereignty_memory_insert_policy ON memory_records;
DROP POLICY IF EXISTS sovereignty_adaptive_policy ON adaptive_identity;
DROP POLICY IF EXISTS sovereignty_adaptive_insert_policy ON adaptive_identity;
DROP POLICY IF EXISTS sovereignty_audit_policy ON audit_log;
DROP POLICY IF EXISTS sovereignty_audit_insert_policy ON audit_log;

-- Memory policies
CREATE POLICY sovereignty_memory_policy ON memory_records
  USING (user_id = current_setting('app.current_user_id', true)::UUID);

CREATE POLICY sovereignty_memory_insert_policy ON memory_records
  FOR INSERT
  WITH CHECK (user_id = current_setting('app.current_user_id', true)::UUID);

-- Adaptive identity policies
CREATE POLICY sovereignty_adaptive_policy ON adaptive_identity
  USING (user_id = current_setting('app.current_user_id', true)::UUID);

CREATE POLICY sovereignty_adaptive_insert_policy ON adaptive_identity
  FOR INSERT
  WITH CHECK (user_id = current_setting('app.current_user_id', true)::UUID);

-- Audit policies
CREATE POLICY sovereignty_audit_policy ON audit_log
  USING (user_id = current_setting('app.current_user_id', true)::UUID);

CREATE POLICY sovereignty_audit_insert_policy ON audit_log
  FOR INSERT
  WITH CHECK (user_id = current_setting('app.current_user_id', true)::UUID);