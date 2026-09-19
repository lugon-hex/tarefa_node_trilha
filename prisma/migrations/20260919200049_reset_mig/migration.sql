/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AuthenticationStatus" AS ENUM ('SUCCESS', 'USER_NOT_EXISTS', 'INCORRECT_PASSWORD', 'RECOVER_PASSWORD', 'INVALID_TOKEN', 'BLOCKED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "last_login" TIMESTAMP(3),
ADD COLUMN     "login_attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "password_changed_at" TIMESTAMP(3),
ADD COLUMN     "token" TEXT,
ADD COLUMN     "token_expires_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "authentication_audit" (
    "id" TEXT NOT NULL,
    "ip_address" TEXT,
    "remote_port" TEXT,
    "user_agent" TEXT,
    "origin" TEXT,
    "status" "AuthenticationStatus" NOT NULL,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authentication_audit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_auth_audit_user_date" ON "authentication_audit"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_token_key" ON "users"("token");

-- CreateIndex
CREATE INDEX "idx_user_name" ON "users"("name");

-- CreateIndex
CREATE INDEX "idx_user_token" ON "users"("token");

-- AddForeignKey
ALTER TABLE "authentication_audit" ADD CONSTRAINT "authentication_audit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
