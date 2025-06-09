## ✅ Feasibility Study

**1. Technical Feasibility:**

* Backend: Python (Django or FastAPI)
* Frontend: JavaScript (React.js or plain HTML/JS)
* PDF Generation: `reportlab` or `WeasyPrint`
* QR Code: `qrcode` Python lib
* Database: PostgreSQL or MySQL
* Hosting: Render/Vercel

**2. Operational Feasibility:**

* Target users: Students, Organizers, Club Admins
* Goal: Streamline event handling, automate attendance and certificates
* Outcome: Higher efficiency, fewer manual errors

**3. Economic Feasibility:**

* Fully open-source stack
* No paid services
* Fits academic time and resource constraints

**4. Schedule Feasibility:**

* 8-week plan:

  * 2 weeks design
  * 4 weeks development
  * 2 weeks testing and polishing

---

## 📄 Software Requirements Specification (SRS)

### 1. Introduction

* **Purpose:** A web-based system for automated event registration, attendance verification, and certificate generation
* **Scope:** User registration, event creation, participant form, QR and link-based attendance verification, certificate generation, dashboards
* **Users:** Organizer, Participant, Admin
* **Tech:** Python, JavaScript, PostgreSQL, Email

### 2. Functional Requirements

* **FR1:** Role-based user auth
* **FR2:** Organizer creates events and custom registration forms
* **FR3:** Participant registration
* **FR4:** Attendance tracking via:

  * Online Check-in Form Link (with verification question)
  * QR Code scan (for physical entry)
* **FR5:** Certificate auto-generation based on attendance
* **FR6:** Email reminders and certificate dispatch
* **FR7:** Admin dashboard with analytics

### 3. Non-Functional Requirements

* Responsive UI
* Handle 100+ concurrent users
* Reliable email and PDF generation
* Log all major actions

### 4. Constraints

* Browser-based only
* Must use open-source tools
* Completed within 2 months

---

## 📦 Module Breakdown (Team of 3)

| Team Member | Modules                                                             |
| ----------- | ------------------------------------------------------------------- |
| Dev A       | User Auth, Role System, Admin Dashboard                             |
| Dev B       | Event Creation, Form Builder, Registration & Attendance (QR & Link) |
| Dev C       | Certificate Generator, Email System, Testing Suite                  |

### ➕ Updated Modules

#### **Attendance Verification Module**

* Method 1 (Online):

  * System generates a secure link to an **attendance quiz**
  * Link valid during event time only
  * Answers confirm actual participation

* Method 2 (Offline):

  * Unique QR code generated per participant
  * Scanned at event gate to log attendance
  * Time-stamped and verified

#### **Certificate Eligibility Logic**

* Certificates only for users with `Attendance.status = "attended"`
* Automation script finalizes attendance after event ends

---

## 🔄 DFDs

### **Context Level (Level 0)**

```
[User] ---> (EventFlow System) <--- [Email Server]
                                 ↕
                            [QR Scanner]
```

---

### **Level 1 DFD**

```
[User]
  ├──> (1.0 User Management) ──> [User DB]
  ├──> (2.0 Event Management) ──> [Event DB]
  ├──> (3.0 Participant Registration) ──> [Participant DB]
  ├──> (4.0 Attendance Verification) ──> [Attendance DB]
  ├──> (5.0 Certificate Generator) ──> [PDF Cert Generator] ──> [Email Server]
  └──> (6.0 Admin Dashboard) ──> [Logs/Analytics]
```

---

### **Level 2 DFD for 4.0 Attendance Verification**

```
(4.0 Attendance Verification)
  ├──> (4.1 Check-in Link Generator)
        └──> Sends email with secure attendance link
        └──> User submits answers via form
        └──> System validates and marks attendance

  ├──> (4.2 QR Code Generator & Scanner)
        └──> QR code generated at registration
        └──> Scanned at physical event
        └──> Check-in time logged

  └──> Finalize attendance post-event
```

---

## 🔗 **ER Diagram**

```
[User]
  - _id (PK)
  - name
  - email
  - password_hash

[Organization]
  - _id (PK)
  - name

[Membership]
  - _id
  - organization_id (FK)
  - user_id (FK)

[Event]
  - _id (PK)
  - title
  - description
  - date
  - organization_id (FK)

[Registration_Form]
  - _id
  - title
  - subtitle
  - description


[Registration]
  - _id (PK)
  - event_id (FK)
  - participant_id (FK)
  - registration_form (json)
  - timestamp

[Attendance]
  - attendance_id (PK)
  - registration_id (FK)
  - method (qr / link)
  - status (attended / not_attended)
  - check_in_time

[CheckInToken]  ← used for secure link form
  - token_id (PK)
  - registration_id (FK)
  - token (UUID)
  - valid_until
  - used (boolean)

[Certificate]
  - cert_id (PK)
  - registration_id (FK)
  - file_path
  - issued_at
  - status (sent / not_sent)

[EmailLog]
  - email_id (PK)
  - user_id (FK)
  - subject
  - content
  - sent_at
```

---

## 🎯 Use Case Diagram

### Actors:

* Organizer
* Participant
* Admin

### Use Cases:

```
Actor: Organizer
  - Create Event
  - Add Form Fields
  - Generate QR Codes
  - Send Attendance Link to Participants
  - Finalize Attendance
  - Generate & Send Certificates

Actor: Participant
  - Register for Event
  - Submit Attendance Quiz via Check-in Link
  - Scan QR Code at Entry
  - Download Certificate

Actor: Admin
  - View All Events
  - Monitor Attendance Logs
  - Manage Users
```
