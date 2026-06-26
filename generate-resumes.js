// Script to generate test resume text files for the talent pool
// Run: node generate-resumes.js
const fs = require('fs');
const path = require('path');

const resumes = [
  // ── Software Engineers ───────────────────────────────────────────────────────
  {
    filename: '01_sophia_chen_senior_swe.txt',
    content: `Sophia Chen
sophia.chen@gmail.com | +1-415-882-3341 | linkedin.com/in/sophiachen-dev | github.com/sophiachen
San Francisco, CA

SUMMARY
Senior Software Engineer with 9 years of experience building scalable backend systems and APIs. Passionate about distributed systems and cloud-native architectures.

EXPERIENCE

Senior Software Engineer — Stripe, San Francisco, CA (2020–Present)
• Led migration of payment processing pipeline to microservices architecture, reducing latency by 40%
• Built real-time fraud detection service handling 50,000 events/second using Kafka and Flink
• Mentored 4 junior engineers; established team's code review and on-call practices

Software Engineer — Airbnb, San Francisco, CA (2017–2020)
• Developed search ranking algorithm improving booking conversion rate by 12%
• Built A/B testing framework used across 20+ product teams
• Contributed to open-source projects: React Native Maps (1.2k GitHub stars)

Junior Software Engineer — Twilio, San Francisco, CA (2015–2017)
• Built SMS delivery status webhook system processing 1M messages/day
• Improved API documentation resulting in 30% reduction in developer support tickets

EDUCATION
B.S. Computer Science — Stanford University (2011–2015)

SKILLS
Python, Go, Java, Distributed Systems, Kafka, Apache Flink, PostgreSQL, Redis, AWS, Kubernetes, Docker, Microservices, REST APIs, GraphQL, React, System Design
`
  },
  {
    filename: '02_marcus_rodriguez_mid_swe.txt',
    content: `Marcus Rodriguez
marcus.r.dev@outlook.com | 555-291-4872 | linkedin.com/in/marcusrodriguez-eng
Austin, TX

ABOUT ME
Full-stack developer with 4 years of experience building web applications. Comfortable across the stack — from React frontends to Node.js APIs to PostgreSQL databases. Strong believer in clean code and thorough testing.

WORK HISTORY

Software Engineer — HubSpot, Austin, TX (2022–Present)
• Rebuilt customer dashboard using React and TypeScript, improving page load time by 55%
• Designed and implemented REST API for CRM integration used by 200+ enterprise customers
• Reduced test coverage gaps from 48% to 91% by introducing Jest testing standards

Junior Software Engineer — Bazaarvoice, Austin, TX (2021–2022)
• Developed review syndication pipeline using Node.js and RabbitMQ
• Fixed 50+ production bugs in legacy PHP codebase, improving reliability

Software Engineering Intern — HomeAway/Vrbo (2020)
• Built property availability calendar component in React

EDUCATION
B.S. Software Engineering — University of Texas at Austin (2017–2021)

SKILLS
JavaScript, TypeScript, React, Node.js, Express, PostgreSQL, MySQL, Redis, Jest, Docker, AWS, REST APIs, HTML/CSS, Git
`
  },
  {
    filename: '03_priya_nair_junior_swe.txt',
    content: `Priya Nair
priya.nair.codes@gmail.com | +44 7700 900321 | linkedin.com/in/priya-nair-dev | github.com/priyanair
London, UK

PROFILE
Recent Computer Science graduate with 1.5 years of professional experience as a software developer. Strong foundation in Python and machine learning. Looking to grow in a product-focused engineering team.

EXPERIENCE

Junior Software Developer — Monzo, London (2024–Present)
• Developed internal tooling for customer support team using Python and Flask
• Contributed to ML model for transaction categorisation (scikit-learn, pandas)
• Deployed 3 microservices to GCP using Cloud Run

Software Developer Intern — Deliveroo, London (2023)
• Built address validation service using Google Maps API
• Wrote unit tests achieving 85% coverage for order management module

EDUCATION
M.Sc. Computer Science — University of Edinburgh (2022–2023)
B.Tech. Information Technology — BITS Pilani (2018–2022)

PROJECTS
• Sentiment analysis tool for product reviews (Python, BERT, Streamlit)
• Personal finance tracker web app (React, Firebase)

SKILLS
Python, JavaScript, Flask, FastAPI, React, Machine Learning, scikit-learn, pandas, NumPy, PostgreSQL, GCP, Docker, Git, SQL
`
  },
  {
    filename: '04_david_kim_staff_swe.txt',
    content: `David Kim
d.kim.engineer@protonmail.com | +1 206-445-9912 | linkedin.com/in/davidkim-staff | github.com/dkim-eng
Seattle, WA (Remote)

SUMMARY
Staff Software Engineer with 14 years building large-scale distributed systems. Former tech lead at Amazon and Uber. Deep expertise in database internals, distributed consensus, and infrastructure engineering.

CAREER GAPS
Career break (Jan 2023 – Sep 2023): Family sabbatical and OSS contributions.

EXPERIENCE

Staff Engineer — Temporal Technologies, Remote (2023–Present)
• Leading design of workflow orchestration engine handling 10M+ workflow executions/day
• Architected cross-region replication protocol reducing RPO to <5 seconds

Principal Engineer — Uber, Seattle, WA (2019–2022)
• Designed Uber's global rate limiting system (400k req/sec at peak)
• Led rewrite of geospatial matching service from monolith to distributed system

Senior Software Engineer — Amazon Web Services, Seattle, WA (2014–2019)
• Core contributor to DynamoDB partition management and auto-scaling
• Implemented global secondary index feature shipped to all DynamoDB customers

Software Engineer — Microsoft, Redmond, WA (2010–2014)
• Built SQL Server high availability features (Always On Availability Groups)

EDUCATION
B.S. Computer Science — Carnegie Mellon University (2006–2010)

SKILLS
Go, Java, C++, Rust, Distributed Systems, Database Internals, Consensus Protocols (Raft/Paxos), Kubernetes, AWS, System Architecture, Performance Engineering, Mentoring
`
  },
  // ── Designers ───────────────────────────────────────────────────────────────
  {
    filename: '05_anya_brooks_senior_designer.txt',
    content: `Anya Brooks
anya.brooks.design@gmail.com | 020 7946 0022 | linkedin.com/in/anyabrooks-ux
London, UK

PROFILE
Senior Product Designer with 7 years of experience crafting user-centered products across fintech and e-commerce. Expert in leading design systems and end-to-end product design from discovery to delivery.

EXPERIENCE

Senior Product Designer — Revolut, London (2021–Present)
• Own design for Revolut's Business banking product (2M+ business customers)
• Built and maintained Revolut's mobile design system (200+ components, used by 40 designers)
• Ran 30+ usability studies, resulting in 28% improvement in onboarding completion rate

Product Designer — ASOS, London (2019–2021)
• Redesigned product discovery experience, contributing to 15% increase in conversion
• Led design for size inclusivity features across 10,000+ product listings

UX Designer — Barclays, London (2017–2019)
• Designed mobile banking app features for 5M+ app users
• Introduced design critique sessions adopted by the 15-person design team

EDUCATION
B.A. Graphic Design — Central Saint Martins, UAL (2013–2017)

SKILLS
Figma, Sketch, Prototyping, User Research, Usability Testing, Design Systems, Information Architecture, Wireframing, Adobe Creative Suite, Design Thinking, Accessibility (WCAG), Zeroheight
`
  },
  {
    filename: '06_leo_santos_mid_designer.txt',
    content: `Leonardo Santos
leo.santos.ux@gmail.com | +55 11 98765-4321 | linkedin.com/in/leosantos-design
São Paulo, Brazil (Remote available)

ABOUT
Product designer with 5 years of experience specialising in B2B SaaS products. Strong background in interaction design and data visualisation. Fluent in English and Portuguese.

EXPERIENCE

Product Designer — Conta Azul, Remote (2022–Present)
• Designed invoicing and tax compliance workflows for 80,000 SMB users
• Created interactive data dashboard with 12 chart types (D3.js collaboration)
• Reduced task completion time for invoice creation by 45% through redesign

UX/UI Designer — TOTVS, São Paulo (2020–2022)
• Designed ERP modules for manufacturing and retail verticals
• Conducted 20+ contextual inquiry sessions with finance and ops teams

Junior Designer — Freelance (2019–2020)
• Delivered brand identity and web design for 8 startup clients

EDUCATION
B.A. Industrial Design — FAUUSP (2015–2019)

SKILLS
Figma, Adobe XD, Illustrator, User Research, Wireframing, Prototyping, Design Systems, Data Visualisation, Responsive Design, B2B SaaS, Accessibility
`
  },
  // ── Project Managers ─────────────────────────────────────────────────────────
  {
    filename: '07_rachel_thompson_senior_pm.txt',
    content: `Rachel Thompson
rachel.thompson.pm@gmail.com | +1 646-554-8821 | linkedin.com/in/rachelthompson-pm
New York, NY

SUMMARY
Senior Product Manager with 8 years of experience leading B2C and B2B products at scale. Track record of growing user bases by 2-10x and launching products used by millions. MBA from Wharton.

EXPERIENCE

Senior Product Manager — Duolingo, New York, NY (2021–Present)
• PM for Duolingo English Test: grew test-taker volume from 200k to 1.4M annually
• Led 0-to-1 launch of streak recovery feature (adopted by 60% of active users in 3 months)
• Managed cross-functional team of 12 (engineering, design, data science, marketing)

Product Manager — Etsy, New York, NY (2018–2021)
• Owned seller onboarding: reduced time to first sale from 21 days to 9 days
• Launched Etsy Payments in 6 new markets
• Collaborated with data science team to build personalised email recommendation engine

Associate Product Manager — Google, New York, NY (2016–2018)
• Rotational APM program: shipped features for Google Maps and Google Pay

EDUCATION
MBA — Wharton School, University of Pennsylvania (2014–2016)
B.A. Economics — Duke University (2010–2014)

SKILLS
Product Strategy, Roadmapping, Agile/Scrum, A/B Testing, SQL, Mixpanel, Amplitude, User Research, Go-to-Market Strategy, Stakeholder Management, Jira, Figma
`
  },
  {
    filename: '08_james_okafor_mid_pm.txt',
    content: `James Okafor
james.okafor@outlook.com | +234 803 456 7890 | linkedin.com/in/jamesokafor-pm
Lagos, Nigeria (Open to Remote)

PROFILE
Product Manager with 4 years of experience in fintech and health tech sectors across Africa and Europe. Comfortable with data-driven decision making and user research in emerging markets.

EXPERIENCE

Product Manager — Flutterwave, Lagos (2022–Present)
• PM for payment checkout product serving 1M+ merchants across 34 countries
• Launched Buy Now Pay Later feature partnership with 3 major Nigerian banks
• Drove 35% reduction in payment failure rate through fraud ML model improvements

Associate Product Manager — Helium Health, Lagos (2021–2022)
• Managed hospital management system features for 200+ healthcare facilities
• Ran discovery interviews with 50 hospital administrators across Nigeria and Kenya

Product Analyst — Interswitch, Lagos (2020–2021)
• Built dashboards tracking payment volume and merchant performance using Tableau and SQL

EDUCATION
B.Eng. Electrical Engineering — University of Lagos (2015–2020)
Google Project Management Certificate (2021)

SKILLS
Product Strategy, Roadmapping, SQL, Tableau, A/B Testing, Agile, User Research, Jira, Figma, Data Analysis, Stakeholder Management, OKRs, Fintech
`
  },
  // ── Sales ────────────────────────────────────────────────────────────────────
  {
    filename: '09_emily_foster_senior_ae.txt',
    content: `Emily Foster
emily.foster.sales@gmail.com | 0161 496 3388 | linkedin.com/in/emilyfoster-sales
Manchester, UK

PROFILE
Senior Account Executive with 9 years of enterprise SaaS sales experience. Consistent top performer — 140%+ quota attainment for 5 consecutive years. Specialist in HR tech and workforce management solutions.

EXPERIENCE

Senior Account Executive — Workday, Manchester (2020–Present)
• Consistently ranks in top 5% of EMEA sales team
• Closed £4.2M deal with NHS Foundation Trust — largest UK healthcare Workday deployment
• Average deal size: £380k ARR; average sales cycle: 7 months
• Manages territory of 80 enterprise accounts (5,000+ employees)

Account Executive — BambooHR, London (2017–2020)
• Exceeded quota every quarter (118%–158% attainment)
• Promoted from SMB to Enterprise AE after 18 months
• Developed outbound sales playbook adopted by 6-person team

Sales Development Representative — Sage, Manchester (2015–2017)
• Generated £1.8M in qualified pipeline in first year
• Promoted to AE after 18 months

EDUCATION
B.A. Business Management — University of Manchester (2011–2015)

SKILLS
Enterprise SaaS Sales, Account Management, Salesforce, Outbound Prospecting, Contract Negotiation, Pipeline Management, Stakeholder Management, MEDDIC, Challenger Sale, HR Tech
`
  },
  {
    filename: '10_tom_nguyen_junior_sdr.txt',
    content: `Tom Nguyen
tom.nguyen.sdr@gmail.com | +1 617-334-5512 | linkedin.com/in/tomnguyen-sales
Boston, MA

ABOUT ME
Energetic and driven Sales Development Representative with 1.5 years of experience in B2B SaaS. Passionate about building genuine relationships with prospects and solving real business problems.

EXPERIENCE

Sales Development Representative — Klaviyo, Boston, MA (2024–Present)
• Averages 85 outreach touchpoints/day via email, LinkedIn, and cold calling
• Booked 28 qualified demos per month (team average: 18)
• Top SDR for Q1 2025 — 162% of meetings booked quota

Marketing Intern — HubSpot, Cambridge, MA (2023)
• Supported demand generation campaigns using HubSpot CMS and Salesforce
• Assisted in running 4 webinars with 300+ registrants each

EDUCATION
B.S. Communication — Northeastern University (2020–2024)

SKILLS
Cold Calling, Email Outreach, LinkedIn Sales Navigator, Salesforce, HubSpot, Outreach.io, Lead Qualification, B2B SaaS, Objection Handling, Pipeline Building
`
  },
  // ── Operations ───────────────────────────────────────────────────────────────
  {
    filename: '11_sarah_okonkwo_ops_manager.txt',
    content: `Sarah Okonkwo
sarah.okonkwo@gmail.com | +44 7911 123456 | linkedin.com/in/sarahokonkwo-ops
London, UK

SUMMARY
Operations Manager with 10 years of experience in logistics, supply chain, and process improvement. Led teams of 30+ and managed budgets up to £5M. Six Sigma Black Belt certified.

EXPERIENCE

Operations Manager — Amazon Logistics UK, London (2019–Present)
• Manages day-to-day operations of last-mile delivery hub (800+ daily parcels)
• Reduced delivery failure rate from 8.2% to 2.1% through process redesign
• Leads team of 35 delivery associates and 4 team leads
• Implemented new route optimisation software saving £420k annually

Senior Operations Analyst — DHL, London (2016–2019)
• Analysed supply chain data to identify £1.2M in efficiency improvements
• Led Lean Six Sigma project cutting warehouse processing time by 32%

Operations Coordinator — Sainsbury's, London (2014–2016)
• Managed inventory replenishment for 3 supermarket locations

EDUCATION
B.Sc. Logistics and Supply Chain Management — Aston University (2010–2014)
Lean Six Sigma Black Belt — BSI Group (2018)

SKILLS
Operations Management, Supply Chain, Process Improvement, Lean Six Sigma, Logistics, Team Leadership, Budget Management, Data Analysis, Excel, Power BI, Project Management
`
  },
  {
    filename: '12_carlos_mendez_biz_analyst.txt',
    content: `Carlos Mendez
carlos.mendez.ba@gmail.com | +1 312-667-4492 | linkedin.com/in/carlosmendez-ba
Chicago, IL

PROFILE
Business Analyst with 6 years of experience translating business requirements into technical solutions. Background in financial services. Strong SQL and data skills; comfortable presenting to C-suite stakeholders.

EXPERIENCE

Senior Business Analyst — JPMorgan Chase, Chicago, IL (2022–Present)
• Lead BA on retail banking digital transformation program ($50M initiative)
• Wrote 200+ user stories and acceptance criteria across 6 delivery squads
• Facilitated workshops with 15+ stakeholders to align on requirements

Business Analyst — Accenture, Chicago, IL (2018–2022)
• Delivered business analysis on 8 client engagements across banking and insurance
• Developed process maps and gap analyses for core banking modernisation projects
• Mentored 3 junior analysts

EDUCATION
B.S. Information Systems — University of Illinois Chicago (2014–2018)
CBAP Certification — IIBA (2021)

SKILLS
Business Analysis, Requirements Gathering, User Stories, Process Mapping, SQL, Tableau, JIRA, Agile, Stakeholder Management, Gap Analysis, Financial Services, UAT
`
  },
  // ── More diverse roles ───────────────────────────────────────────────────────
  {
    filename: '13_nina_walker_data_scientist.txt',
    content: `Nina Walker
nina.walker.ds@gmail.com | +1 206-881-4453 | linkedin.com/in/ninawalker-ds | github.com/ninawalker-ml
Seattle, WA

SUMMARY
Data Scientist with 5 years of experience building predictive models and analytical pipelines for consumer tech products. PhD in Statistics from UW. Strong communicator — comfortable presenting to both technical and non-technical audiences.

EXPERIENCE

Senior Data Scientist — Expedia Group, Seattle, WA (2022–Present)
• Built price elasticity model that optimised hotel pricing, generating $12M incremental revenue
• Developed ML pipeline for personalised travel recommendations (8M+ weekly active users)
• Led A/B testing framework design used across 4 product verticals

Data Scientist — Zillow, Seattle, WA (2020–2022)
• Improved Zestimate accuracy by 18% using gradient boosting models and satellite image features
• Built automated anomaly detection system for listing fraud

EDUCATION
PhD, Statistics — University of Washington (2015–2020)
B.Sc. Mathematics — UC Berkeley (2011–2015)

SKILLS
Python, R, SQL, Machine Learning, Deep Learning, PyTorch, scikit-learn, pandas, A/B Testing, Statistical Modeling, Data Visualization, Databricks, Spark, AWS SageMaker
`
  },
  {
    filename: '14_alex_johnson_devops.txt',
    content: `Alex Johnson
alex.j.devops@gmail.com | 0121 496 2231 | linkedin.com/in/alexjohnson-devops | github.com/ajohnson-ops
Birmingham, UK (Remote)

PROFILE
DevOps/Platform Engineer with 7 years of experience building and operating cloud infrastructure at scale. Deep AWS expertise. Passionate about developer experience and reliability engineering.

CAREER GAP
April 2022 – November 2022: Took time off to travel and pursue personal projects (built open-source Kubernetes operator, 600 GitHub stars).

EXPERIENCE

Senior DevOps Engineer — Funding Circle, London/Remote (2022–Present)
• Built self-service developer platform reducing deployment lead time from 3 days to 2 hours
• Reduced cloud spend by 35% through rightsizing and Reserved Instance strategy
• Implemented SRE practices: error budgets, SLOs, blameless post-mortems

DevOps Engineer — Jaguar Land Rover, Coventry (2019–2022)
• Migrated 120 microservices from on-premise to AWS EKS
• Built CI/CD pipelines for 400+ developers using Jenkins and GitLab CI

Systems Engineer — BT Group, Birmingham (2017–2019)
• Managed Linux infrastructure supporting 200+ internal applications

EDUCATION
B.Sc. Computer Networks — Birmingham City University (2013–2017)
AWS Solutions Architect Professional (2020), CKA (2021)

SKILLS
AWS, Kubernetes, Terraform, Helm, Docker, CI/CD, GitLab CI, GitHub Actions, Jenkins, Prometheus, Grafana, Python, Bash, Linux, SRE, Infrastructure as Code, Ansible
`
  },
  {
    filename: '15_mia_chen_marketing_manager.txt',
    content: `Mia Chen
mia.chen.mkt@gmail.com | +1 323-445-6712 | linkedin.com/in/miachen-marketing
Los Angeles, CA

SUMMARY
Performance Marketing Manager with 6 years of experience running paid acquisition and growth campaigns for DTC and SaaS companies. Managed £2M+ annual ad spend. Strong on data — comfortable in SQL and Python for analysis.

EXPERIENCE

Senior Performance Marketing Manager — Gymshark, Los Angeles, CA (2022–Present)
• Manages $3.2M annual budget across Meta, Google, TikTok, and YouTube
• Grew ROAS from 2.1x to 4.3x through creative testing and audience segmentation strategy
• Launched TikTok creator partnership program (8M+ views in first 3 months)

Performance Marketing Manager — Ritual, Los Angeles, CA (2020–2022)
• Built subscription acquisition engine from scratch, scaling to 40k monthly subscribers
• Reduced CAC by 38% through LTV/cohort analysis and channel reallocation

Digital Marketing Coordinator — Hims & Hers, San Francisco, CA (2018–2020)
• Managed Google Ads campaigns with $600k monthly budget
• Built automated reporting dashboards using Google Data Studio and Python

EDUCATION
B.A. Marketing — USC Marshall School of Business (2014–2018)

SKILLS
Performance Marketing, Meta Ads, Google Ads, TikTok Ads, Growth Marketing, SQL, Python, Attribution Modeling, A/B Testing, Google Analytics 4, Looker Studio, Klaviyo
`
  },
  {
    filename: '16_omar_hassan_cybersecurity.txt',
    content: `Omar Hassan
omar.hassan.sec@protonmail.com | +971 50 234 5678 | linkedin.com/in/omarhassan-security
Dubai, UAE (Open to remote / relocation)

PROFILE
Cybersecurity Engineer with 8 years of experience in penetration testing, red teaming, and security architecture. OSCP and CISSP certified. Trilingual: Arabic, English, French.

EXPERIENCE

Senior Security Engineer — Emirates NBD, Dubai (2021–Present)
• Leads red team exercises across 200+ banking applications
• Implemented SIEM solution (Splunk SOAR) reducing mean time to detect from 14 days to 4 hours
• Conducted security architecture review for $80M core banking modernisation

Security Consultant — Ernst & Young, Dubai (2018–2021)
• Delivered 40+ penetration tests for financial institutions and government clients
• Developed security testing methodology adopted by EY MENA cybersecurity practice

Junior Security Analyst — du Telecom, Abu Dhabi (2016–2018)
• Monitored SOC alerts and investigated security incidents

EDUCATION
M.Sc. Information Security — Royal Holloway, University of London (2014–2016)
B.Sc. Computer Science — American University of Sharjah (2010–2014)
OSCP (2019), CISSP (2021)

SKILLS
Penetration Testing, Red Teaming, OSCP, CISSP, Splunk, SIEM, SOAR, Network Security, Web Application Security, Cloud Security (AWS/Azure), Python, Bash, Burp Suite
`
  },
  {
    filename: '17_jessica_park_hr_manager.txt',
    content: `Jessica Park
jessica.park.hr@gmail.com | +1 312-557-8821 | linkedin.com/in/jessicapark-hr
Chicago, IL

SUMMARY
HR Manager with 7 years of experience in talent acquisition, employee relations, and HR operations for tech companies. Built recruiting functions from 0 to 60+ hires/year. SHRM-CP certified.

EXPERIENCE

HR Manager — Relativity, Chicago, IL (2021–Present)
• Manages full-cycle recruiting for 50+ engineering and go-to-market roles annually
• Reduced average time-to-hire from 62 days to 34 days through process redesign
• Designed and launched company-wide mentorship program (85% employee participation)
• Partners with legal on employee relations cases and performance management

HR Business Partner — Sprout Social, Chicago, IL (2019–2021)
• HRBP for 120-person product and engineering organisation
• Led rollout of OKR framework across 4 business units
• Implemented Greenhouse ATS, improving recruiter efficiency by 40%

Talent Coordinator — Groupon, Chicago, IL (2017–2019)
• Coordinated 300+ candidate interviews per quarter
• Managed onboarding for 80+ new hires annually

EDUCATION
B.S. Psychology — University of Illinois Urbana-Champaign (2013–2017)
SHRM-CP (2020)

SKILLS
Talent Acquisition, Employee Relations, HR Operations, Greenhouse, Workday, Performance Management, Onboarding, DEI Programs, Compensation & Benefits, Coaching, SHRM-CP
`
  },
  {
    filename: '18_ryan_patel_frontend.txt',
    content: `Ryan Patel
ryan.patel.fe@gmail.com | +44 7890 112233 | linkedin.com/in/ryanpatel-frontend | github.com/ryanpatel-ui
London, UK

ABOUT
Front-end Engineer with 3 years of experience building fast, accessible, and visually polished web products. Obsessed with animation, design systems, and Core Web Vitals. Formerly a graphic designer — I bridge the gap between design and code.

EXPERIENCE

Front-end Engineer — Farfetch, London (2023–Present)
• Migrated product listing page from legacy jQuery to React/TypeScript; Core Web Vitals improved by 35%
• Built shared component library (Storybook) adopted by 8 product teams
• Implemented server-side rendering with Next.js, reducing TTFB by 60%

Junior Front-end Developer — Photobox, London (2022–2023)
• Developed photo book creation wizard with complex drag-and-drop editor
• Wrote E2E tests using Playwright, reducing QA cycle time by 50%

Web Design Freelancer (2020–2022)
• Designed and built 12 websites for SMB clients using Webflow, React, and Shopify

EDUCATION
B.A. Graphic Design — Leeds Arts University (2016–2020)
Self-taught React/TypeScript (2020–2021)

SKILLS
React, TypeScript, Next.js, CSS, Sass, Framer Motion, Storybook, Figma, Playwright, Jest, Web Performance, Accessibility, GraphQL, Node.js
`
  },
  {
    filename: '19_diana_moreau_content_strategist.txt',
    content: `Diana Moreau
diana.moreau.content@gmail.com | +33 6 12 34 56 78 | linkedin.com/in/dianamoreau-content
Paris, France (Remote available)

PROFILE
Content Strategist and Writer with 8 years of experience in tech and SaaS. Built content programs from scratch, growing organic traffic by 4-10x. Native French, fluent English, working knowledge of Spanish.

EXPERIENCE

Head of Content — Pennylane, Paris (2022–Present)
• Built content team of 5 writers and an SEO specialist from scratch
• Grew organic search traffic from 10k to 120k monthly visitors in 18 months
• Established content operations playbook (editorial calendar, briefing templates, SEO workflows)

Senior Content Strategist — Contentsquare, Paris (2019–2022)
• Led global content localisation across 6 languages
• Launched resource hub with 200+ articles and guides, generating 30% of marketing-qualified pipeline

Content Writer — Deezer, Paris (2016–2019)
• Wrote blog posts, help documentation, and social media content
• Managed editorial calendar for 5 international markets

EDUCATION
M.A. Journalism — Sciences Po Paris (2014–2016)
B.A. English Literature — Sorbonne University (2010–2014)

SKILLS
Content Strategy, SEO, Copywriting, Editorial Planning, Ahrefs, SEMrush, HubSpot, WordPress, B2B SaaS Content, Thought Leadership, French, English, Content Operations
`
  },
  {
    filename: '20_ben_harris_finance_analyst.txt',
    content: `Benjamin Harris
ben.harris.finance@gmail.com | +1 646-778-4429 | linkedin.com/in/benharris-finance
New York, NY

SUMMARY
Finance Analyst with 3 years of experience in FP&A and corporate finance at tech companies. Strong financial modelling and Excel skills. CFA Level 2 candidate.

EXPERIENCE

Financial Analyst — Peloton, New York, NY (2023–Present)
• Builds monthly P&L variance analysis for CFO presentation
• Developed 3-statement financial model for $200M capex planning decision
• Automated financial reporting using Python (pandas), saving 15 hours/week

Junior Financial Analyst — WeWork, New York, NY (2021–2023)
• Supported 20+ city-level P&L reviews and real estate investment analyses
• Built occupancy forecasting model with 94% accuracy

Finance Intern — Goldman Sachs, New York, NY (Summer 2020)
• Supported IBD team on 3 M&A transactions (aggregate deal value $2.1B)

EDUCATION
B.S. Finance — NYU Stern School of Business (2017–2021)
CFA Level 2 Candidate

SKILLS
Financial Modelling, Excel, Python (pandas, numpy), SQL, Power BI, Budgeting, FP&A, Scenario Analysis, Variance Analysis, Bloomberg Terminal, Corporate Finance
`
  },
  {
    filename: '21_grace_liu_ml_engineer.txt',
    content: `Grace Liu
grace.liu.ml@gmail.com | +1 415-334-9921 | linkedin.com/in/graceliu-ml | github.com/graceliu-ai
San Francisco, CA

SUMMARY
Machine Learning Engineer with 6 years of experience productionising ML models at top-tier AI and consumer tech companies. Specialises in recommendation systems and LLM applications.

EXPERIENCE

Staff ML Engineer — Cohere, San Francisco, CA (2023–Present)
• Leads fine-tuning infrastructure for enterprise LLM deployments
• Built evaluation harness for instruction-following quality (used by 20 enterprise customers)
• Optimised model serving latency by 3x using speculative decoding and quantisation

Senior ML Engineer — Pinterest, San Francisco, CA (2020–2023)
• Built home feed recommendation system serving 450M monthly active users
• Reduced homepage CTR loss during COVID from -18% to -6% through model retraining pipeline
• Shipped real-time visual search feature used by 12M users daily

ML Engineer — Snap, Los Angeles, CA (2018–2020)
• Built AR lens recommendation model (XGBoost → deep learning migration)

EDUCATION
M.S. Computer Science (ML) — Stanford University (2016–2018)
B.S. Applied Mathematics — MIT (2012–2016)

SKILLS
Python, PyTorch, TensorFlow, LLMs, Fine-tuning, MLflow, Kubeflow, Spark, Recommendation Systems, Feature Engineering, A/B Testing, AWS SageMaker, Ray
`
  },
  {
    filename: '22_liam_OBrien_customer_success.txt',
    content: `Liam O'Brien
liam.obrien.cs@gmail.com | +353 87 654 3210 | linkedin.com/in/liamobrien-cs
Dublin, Ireland (Remote)

PROFILE
Customer Success Manager with 5 years of experience in B2B SaaS. Manages enterprise accounts with £5M+ in ARR. Track record of 120%+ NRR and <5% churn rate. Strong technical aptitude — former software support engineer.

EXPERIENCE

Senior Customer Success Manager — Intercom, Dublin (2022–Present)
• Manages portfolio of 28 enterprise accounts (avg. ARR: £180k)
• Achieved 127% Net Revenue Retention in 2024
• Ran quarterly business reviews and executive briefings for FTSE 100 clients
• Reduced churn from 12% to 4% through proactive health score monitoring

Customer Success Manager — Zendesk, Dublin (2020–2022)
• Managed 45 mid-market accounts across EMEA
• Led cross-sell motions resulting in £320k additional ARR in 12 months

Technical Support Engineer — HubSpot, Dublin (2019–2020)
• Resolved 40+ customer technical issues per week with 96% CSAT score

EDUCATION
B.Sc. Information Systems — University College Dublin (2015–2019)

SKILLS
Customer Success, Account Management, QBRs, Churn Reduction, NRR, Salesforce, Gainsight, Intercom, Zendesk, Stakeholder Management, Onboarding, SaaS, Executive Communication
`
  },
  {
    filename: '23_aisha_kamara_junior_designer.txt',
    content: `Aisha Kamara
aisha.kamara.design@gmail.com | +1 404-332-5541 | linkedin.com/in/aishakamara-design
Atlanta, GA

ABOUT ME
Junior UX Designer, 1.5 years into my career after transitioning from psychology research. Passionate about accessible, inclusive design. Bootcamp graduate with strong portfolio including 3 end-to-end case studies.

EXPERIENCE

Junior UX Designer — NCR Corporation, Atlanta, GA (2024–Present)
• Designs point-of-sale interface features used in 100+ retail chains
• Runs guerrilla usability tests with in-store associates
• Contributes to NCR's accessibility audit initiative

UX Design Intern — Mailchimp, Atlanta, GA (2023)
• Designed onboarding improvements reducing time to first campaign by 28%
• Created low and high-fidelity prototypes tested with 15 users

EDUCATION
M.S. Human-Computer Interaction — Georgia Tech (2022–2024)
B.Sc. Psychology — Spelman College (2018–2022)

SKILLS
Figma, User Research, Usability Testing, Wireframing, Prototyping, Accessibility (WCAG 2.1), Journey Mapping, Design Thinking, Miro, UserZoom
`
  },
  {
    filename: '24_ethan_ross_senior_ops.txt',
    content: `Ethan Ross
ethan.ross.ops@outlook.com | +1 503-449-2278 | linkedin.com/in/ethanross-ops
Portland, OR

SUMMARY
Director of Operations with 12 years of experience scaling operational teams at high-growth startups and scaleups. Deep expertise in vendor management, process automation, and building ops functions from scratch.

CAREER GAP
Note: August 2021 – June 2022 — Left previous role to co-found a food delivery startup. Startup was wound down after 10 months. Valuable entrepreneurial experience.

EXPERIENCE

Director of Operations — Vacasa, Portland, OR (2022–Present)
• Leads 65-person operations team managing 8,000+ vacation rental properties
• Drove 20% reduction in guest complaint rate through quality control programme redesign
• Implemented dynamic pricing tool saving $2.3M annually in revenue leakage

Head of Operations — Convoy, Seattle, WA (2019–2021)
• Built and scaled 30-person load operations team from 0
• Reduced broker operational cost per load by 42% through automation
• Managed $15M annual vendor spend

Operations Manager — Rover.com, Seattle, WA (2016–2019)
• Scaled dog-walking operations to 40 cities in 18 months
• Built trust & safety team from 3 to 22 people

EDUCATION
B.A. Business Administration — University of Oregon (2008–2012)

SKILLS
Operations Management, Process Design, Vendor Management, Team Leadership, P&L Management, Automation, Lean, SQL, Tableau, Stakeholder Management, Hiring
`
  },
  {
    filename: '25_mei_tanaka_ux_researcher.txt',
    content: `Mei Tanaka
mei.tanaka.ux@gmail.com | +81 90-1234-5678 | linkedin.com/in/meitanaka-research
Tokyo, Japan (Open to relocation)

PROFILE
UX Researcher with 6 years of experience running mixed-methods research programmes for consumer and enterprise products in Japan, US, and Europe. Fluent in Japanese, English, and conversational Mandarin.

EXPERIENCE

Senior UX Researcher — Rakuten, Tokyo (2021–Present)
• Leads research for Rakuten Ichiba (Japan's largest e-commerce platform, 100M+ users)
• Runs monthly diary studies, usability tests, and large-scale surveys (n=5,000+)
• Established research ops function: participant recruitment, consent management, repository

UX Researcher — Line Corporation, Tokyo (2019–2021)
• Conducted ethnographic research in Indonesia and Thailand to inform LINE's Southeast Asia expansion
• Delivered insights that shaped LINE Pay onboarding redesign (28% improvement in completion)

Junior Researcher — NTT Data, Tokyo (2018–2019)
• Supported usability testing for enterprise government system redesigns

EDUCATION
M.A. Human-Computer Interaction — Carnegie Mellon University (2016–2018)
B.A. Cognitive Science — Keio University (2012–2016)

SKILLS
User Research, Usability Testing, Diary Studies, Surveys, Ethnographic Research, Mixed Methods, Dovetail, UserZoom, Qualtrics, SPSS, R, Figma, Research Ops, Japanese, English
`
  },
  {
    filename: '26_felix_muller_backend_mid.txt',
    content: `Felix Müller
felix.mueller.dev@gmail.com | +49 151 2345 6789 | linkedin.com/in/felixmuller-backend | github.com/fmuller
Berlin, Germany (Remote)

ABOUT
Backend engineer with 4 years of experience building APIs and data pipelines for European fintech and health tech startups. Strong Python and PostgreSQL background. Open-source contributor.

EXPERIENCE

Backend Engineer — N26, Berlin (2022–Present)
• Builds core banking API endpoints serving 8M+ customers across 25 countries
• Improved database query performance by 60% through indexing strategy overhaul
• Contributed to N26's open-source Python SDK (2.1k GitHub stars)

Backend Developer — Ada Health, Berlin (2021–2022)
• Built FHIR-compliant health data ingestion pipeline processing 500k records/day
• Integrated with 8 electronic health record systems across Germany and Austria

Junior Backend Developer — Zalando, Berlin (2020–2021)
• Developed product catalogue API features in Python/Django

EDUCATION
M.Sc. Computer Science — TU Berlin (2018–2020)
B.Sc. Computer Science — LMU Munich (2014–2018)

SKILLS
Python, Django, FastAPI, PostgreSQL, Redis, Kafka, Docker, Kubernetes, AWS, REST APIs, FHIR, GraphQL, SQLAlchemy, pytest, Git, Agile
`
  },
  {
    filename: '27_claire_wu_product_analyst.txt',
    content: `Claire Wu
claire.wu.analytics@gmail.com | +1 408-221-5543 | linkedin.com/in/clairewu-analytics
San Jose, CA

SUMMARY
Product Analyst with 3 years of experience translating complex data into clear product insights for mobile app teams. Strong SQL and Python skills. Recently completed Meta's Data Analyst certification.

EXPERIENCE

Product Analyst — Robinhood, Menlo Park, CA (2023–Present)
• Owns analytics for Robinhood Gold subscription product (2.1M subscribers)
• Built cohort retention and LTV models that informed pricing decision worth $15M ARR
• Automated 8 weekly executive reports using Python (saving 12 analyst-hours/week)

Junior Product Analyst — Twitch, San Francisco, CA (2022–2023)
• Analysed creator monetisation funnel; identified drop-offs reducing revenue by $2M
• Built Tableau dashboards for trust & safety team tracking hate speech reports

Data Analyst Intern — LinkedIn, Sunnyvale, CA (Summer 2021)
• Built A/B testing analysis pipeline for LinkedIn Learning recommendation features

EDUCATION
B.S. Statistics — UC Davis (2018–2022)
Meta Data Analyst Professional Certificate (2023)

SKILLS
SQL, Python (pandas, matplotlib), Tableau, A/B Testing, Product Analytics, Cohort Analysis, Amplitude, Mixpanel, Excel, Statistics, Data Storytelling
`
  },
  {
    filename: '28_tyrone_bell_sales_manager.txt',
    content: `Tyrone Bell
tyrone.bell.sales@gmail.com | +1 404-678-2210 | linkedin.com/in/tyronebell-sales
Atlanta, GA

PROFILE
Sales Manager with 10 years of B2B technology sales experience, including 4 years in sales leadership. Consistent team quota attainment of 110%+. Specialises in building and coaching high-performing SDR and AE teams.

EXPERIENCE

Regional Sales Manager — Salesforce, Atlanta, GA (2022–Present)
• Leads team of 8 Account Executives covering Southeast US mid-market
• Team achieved 114% of quota in FY2024 — #2 region in North America
• Reduced average ramp time from 6 months to 3.5 months through coaching programme

Senior Account Executive — Salesforce, Atlanta, GA (2019–2022)
• Closed $4.8M in new ARR over 3 years; President's Club 2020 and 2021
• Landed 3 landmark deals >$500k ARR in healthcare and government verticals

Account Executive — Dun & Bradstreet, Atlanta, GA (2016–2019)
• Grew territory revenue from $1.2M to $2.8M in 3 years

SDR — Dun & Bradstreet, Atlanta, GA (2014–2016)
• Top SDR Q2 2015: 187% of meetings booked quota

EDUCATION
B.B.A. Marketing — Morehouse College (2010–2014)

SKILLS
Sales Leadership, Coaching, B2B SaaS, Salesforce CRM, Pipeline Management, Account Management, Forecasting, MEDDPICC, Negotiation, Team Building, Revenue Operations
`
  },
  {
    filename: '29_fatima_al_zahra_scrum_master.txt',
    content: `Fatima Al-Zahra
fatima.alzahra@gmail.com | +971 55 987 6543 | linkedin.com/in/fatimaalzahra-agile
Abu Dhabi, UAE

SUMMARY
Certified Scrum Master (CSM, SAFe) with 5 years of experience facilitating agile delivery for government and enterprise digital transformation projects across the GCC. Arabic and English fluent.

EXPERIENCE

Senior Scrum Master — Abu Dhabi Digital Authority, Abu Dhabi (2022–Present)
• Facilitates 4 scrum teams (32 people) delivering Abu Dhabi government digital services
• Introduced SAFe framework reducing inter-team dependency blockers by 65%
• Coaches product owners on backlog refinement and acceptance criteria writing
• Runs monthly agile maturity assessments across programme

Scrum Master — Etisalat (e&), Abu Dhabi (2020–2022)
• Facilitated agile delivery for telecom billing platform modernisation
• Introduced team health check model; improved sprint velocity by 30%

Business Analyst — PwC Middle East, Dubai (2019–2020)
• Supported process improvement engagements for 4 government clients

EDUCATION
B.Sc. Industrial Engineering — American University of Sharjah (2015–2019)
CSM — Scrum Alliance (2020), SAFe 5 Agilist (2022)

SKILLS
Scrum, SAFe, Agile Coaching, Facilitation, JIRA, Confluence, Sprint Planning, Retrospectives, Backlog Management, Kanban, Change Management, Arabic, English
`
  },
  {
    filename: '30_yusuf_osei_growth_engineer.txt',
    content: `Yusuf Osei
yusuf.osei@gmail.com | +44 7823 456 789 | linkedin.com/in/yusufosei-growth | github.com/yusufosei
London, UK (Remote available)

PROFILE
Growth Engineer with 4 years of experience at the intersection of product, data, and engineering. Shipped 200+ A/B tests. Combines software engineering skills with deep understanding of growth loops and funnel optimisation.

EXPERIENCE

Growth Engineer — Wise, London (2022–Present)
• Runs end-to-end A/B tests for acquisition and activation funnels (2M+ monthly visitors)
• Shipped personalised referral programme increasing referral-driven signups by 55%
• Reduced onboarding drop-off by 22% through checkout flow experimentation
• Builds growth tooling used by cross-functional squads in React and Python

Growth Analyst — Moneybox, London (2021–2022)
• Built automated cohort retention dashboard (SQL + Looker) used by whole product team
• Identified underperforming acquisition channels saving £80k/month in wasted spend

Junior Developer — Barclays Accelerator, London (2020–2021)
• Built prototypes for fintech startup partners using React and Node.js

EDUCATION
B.Sc. Computer Science with Business — University of Bristol (2016–2020)

SKILLS
A/B Testing, Growth Engineering, React, Python, SQL, Looker, Amplitude, Segment, JavaScript, Node.js, Funnel Optimisation, Experimentation, Product Analytics
`
  },
];

// Output directory
const OUTPUT_DIR = path.join(__dirname, 'test-resumes');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

resumes.forEach(({ filename, content }) => {
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), content.trim(), 'utf-8');
  console.log(`✅ Written: ${filename}`);
});

console.log(`\n🎉 Generated ${resumes.length} test resumes in ${OUTPUT_DIR}`);
