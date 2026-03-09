/**
 * @jest-environment node
 */

import { Prisma } from "@/generated/prisma/client";

describe("Data model schema", () => {
  it("defines Project model with expected fields", () => {
    const fields = Prisma.ProjectScalarFieldEnum;
    expect(fields).toEqual(
      expect.objectContaining({
        id: "id",
        name: "name",
        clientName: "clientName",
        description: "description",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      })
    );
  });

  it("defines Job model with expected fields", () => {
    const fields = Prisma.JobScalarFieldEnum;
    expect(fields).toEqual(
      expect.objectContaining({
        id: "id",
        projectId: "projectId",
        externalId: "externalId",
        title: "title",
        description: "description",
        createdAt: "createdAt",
      })
    );
  });

  it("defines Task model with expected fields", () => {
    const fields = Prisma.TaskScalarFieldEnum;
    expect(fields).toEqual(
      expect.objectContaining({
        id: "id",
        jobId: "jobId",
        name: "name",
        description: "description",
        timeAllocationPct: "timeAllocationPct",
      })
    );
  });

  it("defines Skill model with expected fields", () => {
    const fields = Prisma.SkillScalarFieldEnum;
    expect(fields).toEqual(
      expect.objectContaining({
        id: "id",
        jobId: "jobId",
        name: "name",
        level: "level",
      })
    );
  });

  it("defines SvalbardJobMatch model with expected fields", () => {
    const fields = Prisma.SvalbardJobMatchScalarFieldEnum;
    expect(fields).toEqual(
      expect.objectContaining({
        id: "id",
        jobId: "jobId",
        svalbardId: "svalbardId",
        svalbardName: "svalbardName",
        confidence: "confidence",
        status: "status",
      })
    );
  });

  it("defines SvalbardSkillMatch model with expected fields", () => {
    const fields = Prisma.SvalbardSkillMatchScalarFieldEnum;
    expect(fields).toEqual(
      expect.objectContaining({
        id: "id",
        skillId: "skillId",
        taskId: "taskId",
        svalbardSkillId: "svalbardSkillId",
        svalbardSkillName: "svalbardSkillName",
        confidence: "confidence",
        status: "status",
      })
    );
  });

  it("exposes all expected model names", () => {
    const modelNames = Prisma.ModelName;
    expect(modelNames).toEqual(
      expect.objectContaining({
        Project: "Project",
        Job: "Job",
        Task: "Task",
        Skill: "Skill",
        SvalbardJobMatch: "SvalbardJobMatch",
        SvalbardSkillMatch: "SvalbardSkillMatch",
      })
    );
  });
});
