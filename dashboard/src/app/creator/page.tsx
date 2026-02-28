"use client";

import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  IconMail,
  IconBrandWhatsapp,
  IconBrandGithub,
  IconPhoneCall,
  IconBrandLinkedin,
  IconDownload,
  IconArrowRight,
  IconBriefcase,
  IconCode,
  IconDatabase,
  IconServer,
  IconPalette,
  IconCloud,
  IconRobot,
} from "@tabler/icons-react";

const SkillCategory = ({
  icon: Icon,
  title,
  color,
  skills,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color: string;
  skills: string[];
}) => (
  <div className="group">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2.5 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
        {title}
      </h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Badge
          key={skill}
          variant="secondary"
          className={`${color} text-white border-0 hover:shadow-md transition-all duration-200`}
        >
          {skill}
        </Badge>
      ))}
    </div>
  </div>
);

const ExperienceCard = ({
  company,
  role,
  period,
  description,
  isLatest,
}: {
  company: string;
  role: string;
  period: string;
  description: string;
  isLatest?: boolean;
}) => (
  <div className="relative pb-8 last:pb-0">
    <div className="absolute left-0 top-0 w-1 h-full bg-linear-to-b from-blue-500 to-transparent" />
    <div className="ml-6">
      {isLatest && (
        <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900" />
      )}
      <div className="mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              {company}
            </h4>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {role}
            </p>
          </div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {period}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const ContactLink = ({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <a href={href} className="group">
    <Card className="overflow-hidden hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 border-gray-200 dark:border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {label}
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {value}
            </p>
          </div>
          <IconArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </CardContent>
    </Card>
  </a>
);

export default function Creator() {
  const skillCategories = useMemo(
    () => [
      {
        icon: IconCode,
        title: "Backend Tools",
        color: "bg-emerald-600",
        skills: ["Python", "TypeScript", "Go", "FastAPI", "Nginx", "Traefik"],
      },
      {
        icon: IconDatabase,
        title: "Databases",
        color: "bg-rose-600",
        skills: ["PostgreSQL", "MySQL", "DynamoDB", "MongoDB", "AWS RDS"],
      },
      {
        icon: IconServer,
        title: "Deployment",
        color: "bg-cyan-600",
        skills: ["Docker", "Kubernetes", "AWS ECS Fargate", "GitHub Actions"],
      },
      {
        icon: IconPalette,
        title: "Frontend",
        color: "bg-indigo-600",
        skills: ["React", "Next.js", "Shadcn", "Tailwind CSS", "ChartJS"],
      },
      {
        icon: IconCloud,
        title: "Infrastructure",
        color: "bg-sky-600",
        skills: ["AWS CDK", "Terraform CDK", "AWS ELB"],
      },
      {
        icon: IconRobot,
        title: "AI Tools",
        color: "bg-fuchsia-600",
        skills: ["GitHub Copilot", "Ollama"],
      },
    ],
    [],
  );

  const experiences = [
    {
      company: "Ernst And Young (GDS)",
      role: "Senior Technical Lead",
      period: "Aug 2022 - Present",
      description:
        "Architected a 3-tier full-stack application on AWS using ECS Fargate and CDK, enabling business users to autonomously manage data structure through a JSON Schema-driven Apicurio schema repository. Integrated a React-based control dashboard with FastAPI and Pydantic to automate data contract generation.",
      isLatest: true,
    },
    {
      company: "Ernst And Young (GDS)",
      role: "Staff Consultant",
      period: "Mar 2022 - Jul 2022",
      description:
        "Architected high-performance Python CLI tools and CI/CD pipelines to automate workflows across Jira and GitHub. Streamlined engineering environments through Docker and modern package management, utilizing concurrent processing to reduce testing time.",
    },
    {
      company: "Tata Consultancy Services",
      role: "System Engineer",
      period: "Mar 2021 - Feb 2022",
      description:
        "Integrated Authelia for SSO and multi-factor authentication. Expanded backend architecture with five new REST API endpoints and reduced response time by leveraging database materialized views.",
    },
    {
      company: "Tata Consultancy Services",
      role: "Assistant System Engineer",
      period: "Jul 2019 - Feb 2021",
      description:
        "Contributed the integration of 160+ upstream sources into 20 critical downstream systems. Designed a custom Correlation Matrix tool that slashed integration testing time by 60%.",
    },
  ];

  return (
    <main className="bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 min-h-screen py-8 md:py-12">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-3xl" />
            <div className="relative">
              {/* Profile Header */}
              <div className="mb-8">
                <div className="flex items-end justify-center gap-4 mb-6">
                  <div>
                    <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 mb-2">
                      Tamal Das
                    </h1>
                    <p className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300">
                      Senior Technical Lead @ EY
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 border-0 px-3 py-1.5">
                    <span className="font-semibold">6.5+</span> Years
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 border-0 px-3 py-1.5">
                    Full-Stack Engineering
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 border-0 px-3 py-1.5">
                    AI-Driven Development
                  </Badge>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    Results-driven engineer focused on building high-performance
                    web systems that balance complex internal logic with
                    intuitive user interfaces. Leading the transition toward
                    AI-driven development, architecting scalable, resilient
                    digital products that prioritize both developer velocity and
                    seamless end-user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-700">
          <Accordion
            type="single"
            collapsible
            defaultValue="experience"
            className="w-full"
          >
            {/* Experience Section */}
            <AccordionItem value="experience" className="border-0">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-4">
                <div className="flex items-center gap-3">
                  <IconBriefcase className="w-5 h-5" />
                  Work Experience
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="border-0 bg-transparent dark:bg-transparent shadow-none">
                  <CardContent className="pt-6">
                    <div className="space-y-0">
                      {experiences.map((exp, idx) => (
                        <ExperienceCard key={idx} {...exp} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Skills Section */}
            <AccordionItem value="skills" className="border-0">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-4">
                <div className="flex items-center gap-3">
                  <IconCode className="w-5 h-5" />
                  Technical Skills
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="border-0 bg-transparent dark:bg-transparent shadow-none">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {skillCategories.map((category) => (
                        <SkillCategory key={category.title} {...category} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Contact Section */}
            <AccordionItem value="contact" className="border-0">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-4">
                <div className="flex items-center gap-3">
                  <IconMail className="w-5 h-5" />
                  Connect With Me
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Card className="border-0 bg-transparent dark:bg-transparent shadow-none">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ContactLink
                        href="mailto:tamaldas177@gmail.com"
                        icon={IconMail}
                        label="Email"
                        value="tamaldas177@gmail.com"
                      />
                      <ContactLink
                        href="https://github.com/tdas-kolkata"
                        icon={IconBrandGithub}
                        label="GitHub"
                        value="tdas-kolkata"
                      />
                      <ContactLink
                        href="https://wa.me/9062407115"
                        icon={IconBrandWhatsapp}
                        label="WhatsApp"
                        value="+91 9062407115"
                      />
                      <ContactLink
                        href="tel:+919062407115"
                        icon={IconPhoneCall}
                        label="Phone"
                        value="+91 9062407115"
                      />
                      <ContactLink
                        href="https://www.linkedin.com/in/tamaldas177"
                        icon={IconBrandLinkedin}
                        label="LinkedIn"
                        value="tamaldas177"
                      />
                      <a
                        href="https://drive.google.com/file/d/1XvyeDD_zJAHPUbVDnzzSq_7C6-gQl3tz/view?usp=sharing"
                        className="group"
                      >
                        <Card className="overflow-hidden hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 border-gray-200 dark:border-gray-700 h-full">
                          <CardContent className="p-4 flex items-center gap-3 h-full">
                            <div className="p-2.5 rounded-lg bg-linear-to-br from-orange-500 to-red-600 group-hover:from-orange-600 group-hover:to-red-700 transition-all duration-300">
                              <IconDownload className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Resume
                              </p>
                              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Download PDF
                              </p>
                            </div>
                            <IconArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                          </CardContent>
                        </Card>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
