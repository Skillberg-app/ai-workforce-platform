import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

const MATCH_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;

async function main() {
  // Clean existing data
  await prisma.svalbardSkillMatch.deleteMany();
  await prisma.svalbardJobMatch.deleteMany();
  await prisma.task.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.job.deleteMany();
  await prisma.project.deleteMany();

  // Create a sample project
  const project = await prisma.project.create({
    data: {
      name: "Digital Transformation Assessment",
      clientName: "Acme Corp",
      description:
        "Assessing AI workforce impact across engineering and marketing departments.",
    },
  });

  // Create jobs with related data
  const softwareEngineer = await prisma.job.create({
    data: {
      projectId: project.id,
      externalId: "ENG-101",
      title: "Software Engineer",
      description: "Develops and maintains web applications and APIs.",
    },
  });

  const marketingAnalyst = await prisma.job.create({
    data: {
      projectId: project.id,
      externalId: "MKT-201",
      title: "Marketing Analyst",
      description: "Analyzes campaign performance and market trends.",
    },
  });

  // Tasks for Software Engineer
  const codingTask = await prisma.task.create({
    data: {
      jobId: softwareEngineer.id,
      name: "Writing Code",
      description: "Implement features and fix bugs in production codebase.",
      timeAllocationPct: 40,
    },
  });

  const codeReviewTask = await prisma.task.create({
    data: {
      jobId: softwareEngineer.id,
      name: "Code Review",
      description: "Review pull requests and provide feedback.",
      timeAllocationPct: 20,
    },
  });

  await prisma.task.create({
    data: {
      jobId: softwareEngineer.id,
      name: "System Design",
      description: "Design architecture for new features and services.",
      timeAllocationPct: 25,
    },
  });

  await prisma.task.create({
    data: {
      jobId: softwareEngineer.id,
      name: "Documentation",
      description: "Write and maintain technical documentation.",
      timeAllocationPct: 15,
    },
  });

  // Tasks for Marketing Analyst
  const dataAnalysisTask = await prisma.task.create({
    data: {
      jobId: marketingAnalyst.id,
      name: "Data Analysis",
      description: "Analyze campaign metrics and generate insights.",
      timeAllocationPct: 35,
    },
  });

  await prisma.task.create({
    data: {
      jobId: marketingAnalyst.id,
      name: "Report Generation",
      description: "Create weekly and monthly performance reports.",
      timeAllocationPct: 25,
    },
  });

  await prisma.task.create({
    data: {
      jobId: marketingAnalyst.id,
      name: "Market Research",
      description: "Research competitor strategies and market trends.",
      timeAllocationPct: 25,
    },
  });

  await prisma.task.create({
    data: {
      jobId: marketingAnalyst.id,
      name: "Stakeholder Presentations",
      description: "Present findings to marketing leadership.",
      timeAllocationPct: 15,
    },
  });

  // Skills for Software Engineer
  const typescriptSkill = await prisma.skill.create({
    data: {
      jobId: softwareEngineer.id,
      name: "TypeScript",
      level: "expert",
    },
  });

  await prisma.skill.create({
    data: {
      jobId: softwareEngineer.id,
      name: "React",
      level: "advanced",
    },
  });

  await prisma.skill.create({
    data: {
      jobId: softwareEngineer.id,
      name: "SQL",
      level: "intermediate",
    },
  });

  // Skills for Marketing Analyst
  const analyticsSkill = await prisma.skill.create({
    data: {
      jobId: marketingAnalyst.id,
      name: "Data Analytics",
      level: "expert",
    },
  });

  await prisma.skill.create({
    data: {
      jobId: marketingAnalyst.id,
      name: "Google Analytics",
      level: "advanced",
    },
  });

  await prisma.skill.create({
    data: {
      jobId: marketingAnalyst.id,
      name: "Statistical Analysis",
      level: "intermediate",
    },
  });

  // Svalbard Job Matches
  await prisma.svalbardJobMatch.create({
    data: {
      jobId: softwareEngineer.id,
      svalbardId: "SVB-JOB-1001",
      svalbardName: "Full-Stack Developer",
      confidence: 0.92,
      status: MATCH_STATUS.ACCEPTED,
    },
  });

  await prisma.svalbardJobMatch.create({
    data: {
      jobId: marketingAnalyst.id,
      svalbardId: "SVB-JOB-2001",
      svalbardName: "Marketing Data Analyst",
      confidence: 0.87,
      status: MATCH_STATUS.PENDING,
    },
  });

  // Svalbard Skill Matches
  await prisma.svalbardSkillMatch.create({
    data: {
      skillId: typescriptSkill.id,
      taskId: codingTask.id,
      svalbardSkillId: "SVB-SKILL-3001",
      svalbardSkillName: "JavaScript/TypeScript Development",
      confidence: 0.95,
      status: MATCH_STATUS.ACCEPTED,
    },
  });

  await prisma.svalbardSkillMatch.create({
    data: {
      skillId: typescriptSkill.id,
      taskId: codeReviewTask.id,
      svalbardSkillId: "SVB-SKILL-3002",
      svalbardSkillName: "Code Quality Assurance",
      confidence: 0.78,
      status: MATCH_STATUS.PENDING,
    },
  });

  await prisma.svalbardSkillMatch.create({
    data: {
      skillId: analyticsSkill.id,
      taskId: dataAnalysisTask.id,
      svalbardSkillId: "SVB-SKILL-4001",
      svalbardSkillName: "Business Intelligence Analysis",
      confidence: 0.89,
      status: MATCH_STATUS.ACCEPTED,
    },
  });

  console.log("Seed data created successfully.");
  console.log(`  Project: ${project.name} (${project.id})`);
  console.log(`  Jobs: ${softwareEngineer.title}, ${marketingAnalyst.title}`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
