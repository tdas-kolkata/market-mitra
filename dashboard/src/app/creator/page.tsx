import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
} from "@/components/ui/timeline";

import { Button } from "@/components/ui/button";

import {
  IconMail,
  IconBrandWhatsapp,
  IconBrandGithub,
  IconPhoneCall,
  IconBrandLinkedin,
  IconDownload,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";

export default function Creator() {
  return (
    <main className="bg-zinc-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 min-h-screen h-auto flex-1 md:py-5">
      <Card className="bg-zinc-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full md:w-10/12 mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl">Tamal Das</CardTitle>
          <CardDescription className="text-2xl">
            Senior Technical Lead @ EY
          </CardDescription>
          <CardDescription className="text-1xl">
            <Badge variant="outline">6.5+ Years of building apps</Badge>
            <div className="pt-2 dark:text-gray-100 text-gray-700">
              I am a results-driven engineer focused on building
              high-performance web systems that balance complex internal logic
              with intuitive user interfaces. Currently, I am leading the
              transition toward a AI-driven development model, moving away from
              manual optimizations to embrace modern, automated performance
              patterns. My goal is to architect scalable, resilient data driven
              digital products that prioritize both developer velocity and a
              seamless end-user experience.
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion
            type="single"
            collapsible
            defaultValue="intro"
            className="w-full"
          >
            <AccordionItem value="workexp">
              <AccordionTrigger className="text-xl">
                Work Experience
              </AccordionTrigger>
              <AccordionContent>
                <Timeline className="py-5">
                  <TimelineItem>
                    <TimelineSeparator />
                    <TimelineContent>
                      <time className="text-sm font-medium text-muted-foreground">
                        Today
                      </time>
                      <h3 className="text-lg font-semibold">
                        <div>Ernst And Young (GDS)</div>
                        <Badge variant="outline">Senior Technical Lead</Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Architected a 3-tier full-stack application on AWS using
                        ECS Fargate and CDK, enabling business users to
                        autonomously manage data structure through a JSON
                        Schema-driven Apicurio schema repository to maintain
                        100% backward compatibility and schema evolution.
                        Integrated a React Based control dashboard with FastAPI
                        and Pydantic to automate data contract generation and
                        generate automated pull request against GitHub
                        repository for fast and consistant data pipeline
                        development.
                      </p>
                      <time className="text-sm font-medium text-muted-foreground pt-2">
                        Aug 2022
                      </time>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator />
                    <TimelineContent>
                      <time className="text-sm font-medium text-muted-foreground">
                        Jul 2022
                      </time>
                      <h3 className="text-lg font-semibold">
                        <div>Ernst And Young (GDS)</div>
                        <Badge variant="outline">Staff Consultant</Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Architected high-performance Python CLI tools and CI/CD
                        pipelines to automate workflows across Jira and GitHub,
                        significantly boosting developer velocity and code
                        quality. Streamlined engineering environments through
                        Dockerization and modern package management, utilizing
                        concurrent processing to reduce integration testing and
                        analysis time.
                      </p>
                      <time className="text-sm font-medium text-muted-foreground pt-2">
                        Mar 2022
                      </time>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator />
                    <TimelineContent>
                      <time className="text-sm font-medium text-muted-foreground">
                        Feb 2022
                      </time>
                      <h3 className="text-lg font-semibold">
                        <div>Tata Consultancy Services</div>
                        <Badge variant="outline">System Engineer</Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Integrated Authelia for Single Sign On (SSO) and multi
                        factor authentication while enhancing user session
                        persistence. Expanded backend architecture with five new
                        REST API endpoints and reduced the response time by
                        leveraging database materialized views while
                        collaborating with frontend teams to deliver a complex
                        portfolio visualization module over three agile
                        releases.
                      </p>
                      <time className="text-sm font-medium text-muted-foreground pt-2">
                        Mar 2021
                      </time>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator />
                    <TimelineContent>
                      <time className="text-sm font-medium text-muted-foreground">
                        Feb 2021
                      </time>
                      <h3 className="text-lg font-semibold">
                        <div>Tata Consultancy Services</div>
                        <Badge variant="outline">
                          Assistant System Engineer
                        </Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Contributed the integration of 160+ upstream sources
                        into 20 critical downstream systems, ensuring strict
                        data quality for RWA and EAD risk reporting. By
                        designing a custom Correlation Matrix tool, I slashed
                        integration testing time by 60% while supporting an
                        agile team of 7 to deliver high-stakes technical
                        solutions.
                      </p>
                      <time className="text-sm font-medium text-muted-foreground pt-2">
                        Jul 2019
                      </time>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skills">
              <AccordionTrigger className="text-xl">
                About My Skills
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  <div className="font-bold p-2">Backend Tools</div>
                  <div>
                    <Badge className="bg-green-800 text-green-50 m-2">
                      Python
                    </Badge>
                    <Badge className="bg-green-800 text-green-50 m-2">
                      Type Script
                    </Badge>
                    <Badge className="bg-green-800 text-green-50 m-2">GO</Badge>
                    <Badge className="bg-green-800 text-green-50 m-2">
                      FastAPI
                    </Badge>
                    <Badge className="bg-green-800 text-green-50 m-2">
                      Nginx
                    </Badge>
                    <Badge className="bg-green-800 text-green-50 m-2">
                      Traefik
                    </Badge>
                    <Badge className="bg-green-800 text-green-50 m-2">
                      AWS ELB
                    </Badge>
                    <Badge className="bg-green-800 text-green-50 m-2">
                      Prefect
                    </Badge>
                  </div>
                  <div className="font-bold p-2">Databases</div>
                  <div>
                    <Badge className="bg-red-900 text-red-200 m-2">
                      Postgres
                    </Badge>
                    <Badge className="bg-red-900 text-red-200  m-2">
                      MySQL
                    </Badge>
                    <Badge className="bg-red-900 text-red-200  m-2">
                      DynamoDB
                    </Badge>
                    <Badge className="bg-red-900 text-red-200  m-2">
                      MongoDB
                    </Badge>
                    <Badge className="bg-red-900 text-red-200  m-2">
                      AWS RDS
                    </Badge>
                  </div>
                  <div className="font-bold p-2">Deployment Tools</div>
                  <div>
                    <Badge className="bg-blue-800 text-blue-50 m-2">
                      Docker
                    </Badge>
                    <Badge className="bg-blue-800 text-blue-50 m-2">
                      Kubernates
                    </Badge>
                    <Badge className="bg-blue-800 text-blue-50 m-2">
                      AWS ECS Fargate
                    </Badge>
                    <Badge className="bg-blue-800 text-blue-50 m-2">
                      AWS ECS EC2
                    </Badge>
                    <Badge className="bg-blue-800 text-blue-50 m-2">
                      Github Actions
                    </Badge>
                  </div>
                  <div className="font-bold p-2">Frontend Tools</div>
                  <div>
                    <Badge className="bg-purple-800 text-purple-50 m-2">
                      React
                    </Badge>
                    <Badge className="bg-purple-800 text-purple-50 m-2">
                      NextJS
                    </Badge>
                    <Badge className="bg-purple-800 text-purple-50 m-2">
                      Shadcn
                    </Badge>
                    <Badge className="bg-purple-800 text-purple-50 m-2">
                      Tailwind CSS
                    </Badge>
                    <Badge className="bg-purple-800 text-purple-50 m-2">
                      ChartJS
                    </Badge>
                  </div>
                  <div className="font-bold p-2">
                    Infrastructure Management Tools
                  </div>
                  <div>
                    <Badge className="bg-sky-800 text-sky-50 m-2">
                      AWS CDK
                    </Badge>
                    <Badge className="bg-sky-800 text-sky-50 m-2">
                      Terraform CDK
                    </Badge>
                  </div>
                  <div className="font-bold p-2">AI Tools</div>
                  <div>
                    <Badge className="bg-red-800 text-red-50 m-2">
                      GitHub Copilot
                    </Badge>
                    <Badge className="bg-red-800 text-red-50 m-2">Ollama</Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="contact">
              <AccordionTrigger className="text-xl">
                Connect With Me
              </AccordionTrigger>
              <AccordionContent>
                <div className="w-full flex flex-col justify-center items-center">
                  <a
                    href="mailto:tamaldas177@gmail.com"
                    className="text-blue-600 hover:underline flex items-center p-1"
                  >
                    <Button className="rounded-full w-60">
                      <IconMail className="m-2" />
                      <div>tamaldas177@gmail.com</div>
                    </Button>
                  </a>
                  <a
                    href="https://github.com/tdas-kolkata"
                    className="text-blue-600 hover:underline flex items-center p-1"
                  >
                    <Button className="rounded-full w-60">
                      <IconBrandGithub className="m-2" />
                      <div>tdas-kolkata</div>
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/9062407115"
                    className="text-blue-600 hover:underline flex items-center p-1"
                  >
                    <Button className="rounded-full w-60">
                      <IconBrandWhatsapp className="m-2" />
                      <div>+91 9062407115</div>
                    </Button>
                  </a>
                  <a
                    href="tel:+919062407115"
                    className="text-blue-600 hover:underline flex items-center p-1"
                  >
                    <Button className="rounded-full w-60">
                      <IconPhoneCall className="m-2" />
                      <div>+91 9062407115</div>
                    </Button>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tamaldas177"
                    className="text-blue-600 hover:underline flex items-center p-1"
                  >
                    <Button className="rounded-full w-60">
                      <IconBrandLinkedin className="m-2" />
                      <div>tamaldas177</div>
                    </Button>
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="resume">
              <AccordionTrigger className="text-xl">Resume</AccordionTrigger>
              <AccordionContent>
                <div className="w-full flex flex-row justify-center">
                  <a href="https://drive.google.com/file/d/1XvyeDD_zJAHPUbVDnzzSq_7C6-gQl3tz/view?usp=sharing">
                    <Button>
                      <IconDownload />
                      Download
                    </Button>
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </main>
  );
}
