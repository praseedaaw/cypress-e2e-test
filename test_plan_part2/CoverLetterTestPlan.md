
---

# 🧠 **Holistic Test Plan (Continuous Testing Perspective)**

### Feature: *Cover Letter Upload (File & Free Text)* – Striive Platform

---

## 🎯 **1. Test Objectives**

* Ensure functional and non-functional quality of the **Cover Letter Upload Feature** (file + free text).
* Strengthen *early defect prevention* through static testing and *end-user confidence* through E2E and exploratory testing.
* Guarantee seamless experience across all transitions — file ↔ text, cancel, and save actions.
* Maintain regression stability for related profile modules (Resume, Job Function).
* Enable continuous testing within the CI/CD pipeline for fast feedback and risk-based releases.
* Monitor production
* Observe Customer Feedback using sueveys

---

## 🧱 **2. Test Strategy (Continuous testing with Testing Trophy model distribution)**

| Test Level                         | Purpose                                                                                                                      | Tools / Techniques                                                                                         | Responsible       | Automation % Target |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------- | ------------------- |
| **Static Testing (Shift-Left)**    | Validate requirements, acceptance criteria, and UI/UX design before development begins. Identify gaps and ambiguities early. | Reviews, Checklists, Heuristic analysis (Fagan review), 3 Amigos workshops, Pairing sessions with PO & Dev | **QA + PO + Dev** | 20% by the use of ChatGPT         |
| **Unit Tests**                     | Validate core business logic and field-level validation (file type, size, limits).                                           | Jest / Mocha                                                                                               | Developer         | 40%                 |
| **Contract Tests**                 | Verify consistency of API endpoints and schema validation.                                                                   | Pact / Postman                                                                                             | QA + Dev          | 80%                 |
| **Component Integration Tests**    | Validate data flow between front-end and backend services, ensuring smooth transitions.                                      | Cypress (component mode), React Testing Library                                                            | Developer                | 80%                 |
| **E2E Tests (QA Focus)**           | Validate critical user journeys (upload, switch, cancel, apply). Focus on functional correctness and UX flow.                | **Cypress / Playwright**                                                                                   | **QA Owner**      | 10%(100% P0 flows)                |
| **Exploratory Testing (QA Focus)** | Validate real-world scenarios, UI responsiveness, error resilience, and system behavior under edge cases.                    | **Chartered Exploratory Sessions, Mind Maps, Heuristic Tours (Data, Stress, Interrupt, Usability)**        | **QA Owner**      | N/A                 |
| **Shift-Right / Observability**    | Monitor user behavior and defect trends post-release. Validate error logs and metrics.                                       | Sentry / Datadog / Hotjar                                                                                  | QA + DevOps       | 5%                  |

---

## 🔁 **3. Shift-Left & Shift-Right Integration**

| Phase                      | Shift-Left Practice                                                                                                                 | Shift-Right Practice                                             |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Discovery & Refinement** | Static review of requirements & acceptance criteria (checklists, heuristics). QA leads 3 Amigos sessions for testability alignment. | N/A                                                              |
| **Development**            | API contracts validated early using Pact. Component mocks shared for parallel E2E automation.                                       | Monitor telemetry of upload performance and API retries.         |
| **CI/CD Pipeline**         | Unit, Contract, Component & Smoke tests executed per PR; E2E nightly/on-demand; regression on staging.                                        | Alert-based monitoring for upload failure anomalies.             |
| **Post-Deployment**        | Exploratory regression + feedback analysis.                                                                                         | Collect production insights for future regression suite updates. |

---

## 🧩 **4. QA Ownership Areas**

| QA Responsibility             | Focus                                                                  | Expected Outcome                                        |
| ----------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| **Requirement Testing Leadership** | Conduct static requirement reviews (clarity, completeness, ambiguity). | 20% fewer change requests during sprint.                |
| **E2E Test Automation**       | Maintain robust Playwright/Cypress framework integrated into CI/CD.    | Critical path fully automated (upload, switch, save).   |
| **Exploratory Testing**       | Plan and execute chartered exploratory sessions each sprint.           | Discover hidden UX, error-handling, or data edge cases. |
| **Regression Coordination**   | Identify impacted features and coordinate automation priorities.       | Regression failures reduced sprint-over-sprint.         |
| **Continuous Improvement**    | Measure MTTR/MTTD and integrate learnings into future test design.     | Faster defect detection & triage.                       |
| Quality advocacy | Coach team on how to test their code better | Quality mindset in team as a culture |

---

## 📊 **5. Quality Metrics & Reporting**

| Metric                       | Target                            | Description                                                 |
| ---------------------------- | --------------------------------- | ----------------------------------------------------------- |
| Requirement quality issue rate       | Less than 5% of total issues   | Every story has reviewed and signed-off acceptance criteria |
| New Critical E2E Automation Pass Rate     | 100%                              | Execution in CI/CD                                  |
| Exploratory Session Findings | ≥2 actionable insights per feature release | Documented improvement opportunities                        |
| Regression Stability         | ≥95%                              | Across staging and pre-prod                                 |
| Defect Leakage (Prod)        | 0 critical bug leakage                               | Post-release quality KPI                                    |

---

## ⚙️ **6. Quality Tooling & Environments**

| Category          | Tool                          | Purpose                        |
| ----------------- | ----------------------------- | ------------------------------ |
| E2E Automation    | Cypress / Playwright          | Critical E2E business flow automation  |
| Component Integration Tetsing| Cypress / Playwright | High level UI logics, edge cases and snapshot testing |
| Contract Testing       |  Pact                | Contract & schema testing      |
| Unit testing | Jest | Testing lowest components |
| Static Review     | Confluence + Review Checklist | Requirements validation        |
| CI/CD Integration | GitHub Actions / Jenkins      | Continuous testing pipeline    |
| Monitoring        | Sentry / Datadog / AB testing             | Observability & anomaly alerts |

---

## 💡 **7. Risk-Based Testing Focus**

| Risk Area                               | Probability | Impact | Mitigation Strategy                |
| --------------------------------------- | ----------- | ------ | ---------------------------------- |
| File upload logic (type, size, network) | High        | High   | Unit + Integration + E2E           |
| Mode switching (file ↔ text)            | Medium      | High   | E2E + Component Tests              |
| Resume/Profile Regression               | Medium      | Medium | Partial regression automation      |
| Ambiguous “apply job rules”             | High        | High   | Clarify during static review       |
| Data retention compliance               | Medium      | High   | Raise as requirement clarification |

---

## ▶️ Automation Pending **8. Exit Criteria**

* All P0 & P1 scenarios automated at E2E or component level.
* 100% of requirements reviewed via static testing checklists.
* No open high/critical defects.
* All regression-critical paths passing in CI/CD.
* QA sign-off backed by test reports and metrics dashboard.

---

## 🧩 **Requirement Traceability & Test Coverage Matrix**

| Feature ID | User Story ID | Acceptance Criteria ID | Test Case ID | Test Case Description | Criticality / Priority | Automated Test Coverage | Test Automation Level | Test Run Result |
| ---------- | ------------- | -------------------- | ------------ | -------------------- | -------------------- | ---------------------- | ------------------- | --------------- |
| F-001: Add Cover letter to profile page | US-001: Add Cover letter - Edit mode | AC-001: Cover Letter Upload (File) | TC-001 | Upload valid file (.pdf/.docx/.html ≤5MB) | P0 | ▶️ Automation Pending | E2E | ▶️ To Do |
|  |  |  | TC-002 | Upload invalid file type (.jpg, .exe) → validation error | P1 | ▶️ Automation Pending | Component Integration | ▶️ To Do |
|  |  |  | TC-003 | Upload file >5MB → error message | P1 | ▶️ Automation Pending | Component Integration | ▶️ To Do |
|  |  |  | TC-004 | Upload file during network failure → retry message | P2 | ▶️ Automation Pending | Integration | ▶️ To Do |
|  |  |  | TC-005 | Verify previous file is replaced with new upload | P1 | ▶️ Automation Pending | Component Integration | ▶️ To Do |
|  |  |  | TC-006 | Cancel upload midway → old file retained | P2 | ▶️ Automation Pending | Integration | ▶️ To Do |
| F-001: Add Cover letter to profile page | US-001: Add Cover letter - Edit mode | AC-002: Cover Letter as Free Text | TC-007 | Enter and save free-text cover letter | P0 | ▶️ Automation Pending | E2E | ▶️ To Do |
|  |  |  | TC-008 | Enter text exceeding allowed character limit (e.g., >5000 chars) → validation error | P1 | ▶️ Automation Pending | Unit | ▶️ To Do |
|  |  |  | TC-009 | Enter text with formatting (bold, italics) → formatting retained in display | P2 | ▶️ Automation Pending | Component Integration | ▶️ To Do |
|  |  |  | TC-010 | Save empty text field → warning displayed | P2 | ▶️ Automation Pending | Unit | ▶️ To Do |
|  |  |  | TC-011 | Cancel edit after writing new free text → previous text retained | P1 | ▶️ Automation Pending | E2E | ▶️ To Do |
| F-001: Add Cover letter to profile page | US-001: Add Cover letter - Edit mode | AC-003: Switching Between File & Text Modes | TC-012 | Switch from file → text; file deleted, text editable | P0 | ▶️ Automation Pending | E2E | ▶️ To Do |
|  |  |  | TC-013 | Switch from text → file; text cleared, file replaces | P0 | ▶️ Automation Pending | E2E | ▶️ To Do |
|  |  |  | TC-014 | Switch mode but cancel before save → revert to last saved state | P1 | ▶️ Automation Pending | Component Integration | ▶️ To Do |
| F-001: Add Cover letter to profile page | US-002: View Cover letter - View mode | AC-004: Display Mode & Read-only View | TC-015 | Saved file displayed as downloadable file link | P0 | ▶️ Automation Pending | E2E | ▶️ To Do |
|  |  |  | TC-016 | Saved text displayed as non-editable read-only text | P0 | ▶️ Automation Pending | E2E | ▶️ To Do |
|  |  |  | TC-017 | Validate view rendering in mobile/responsive layout | P2 | ▶️ Automation Pending | Component Integration | ▶️ To Do |
| F-001: Add Cover letter to profile page | US-001 & US-002 | AC-005: Application Integration Rules | TC-018 | Attach cover letter automatically when applying for a job (if enabled) | P0 | ▶️ Automation Pending | E2E | ▶️ To Do |
|  |  |  | TC-019 | Skip cover letter attachment when toggle disabled | P1 | ▶️ Automation Pending | Component Integration | ▶️ To Do |
|  |  |  | TC-020 | Validate API integration between Profile → Job Application modules | P0 | ▶️ Automation Pending | Contract / Integration | ▶️ To Do |
| F-001: Add Cover letter to profile page | US-001 | AC-006: Error Handling & Edge Cases | TC-021 | Display server-side error message gracefully | P2 | ▶️ Automation Pending | Integration | ▶️ To Do |
|  |  |  | TC-022 | Handle concurrent edits (multiple tabs) gracefully | P2 | ▶️ Automation Pending | Integration | ▶️ To Do |
|  |  |  | TC-023 | Log and monitor file upload failures (Sentry/Datadog) | P2 | ▶️ Automation Pending | Shift-Right Monitoring | ▶️ To Do |
| F-001: Add Cover letter to profile page | US-001 & US-002 | AC-007: Regression - Impacted Features | TC-024 | Verify that Job Function, Dutch Resume, and English Resume pages remain functional | P0 | ▶️ Automation Pending | E2E Partial (<100%) | ▶️ To Do |
|  |  |  | TC-025 | Validate no overlap in file storage paths between Resume and Cover Letter | P1 | ▶️ Automation Pending | Component Integration | ▶️ To Do |
|  |  |  | TC-026 | Validate consistent behavior of upload progress UI across Resume and Cover Letter | P2 | ▶️ Automation Pending | Integration | ▶️ To Do |
| NFR | US-NFR | AC-008: Non-Functional Requirements | TC-027 | Performance testing | P0 | ▶️ Automation Pending | E2E | ▶️ To Do |
| | | AC-009: Security testing | P0 | Penetration testing | P1 | ▶️ Automation Pending | E2E | ▶️ To Do |

## Release Plan & Test Builds
To be added by the team


## Bug Triage plan and list
Daily triage during feature testing and UAT phase

Ad-hoc triage for critical (P0/P1) issues reported post-deployment


## Slack communication channel
    #cover-letter-release
