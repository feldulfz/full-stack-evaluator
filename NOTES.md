# Technical Exam – Development Notes

## Overview
This project implements a secure, role-aware task management system with a focus on clean architecture, security, and maintainability.

---

## Authentication & Authorization
- Implemented **JWT-based authentication** for stateless user sessions.
- JWT token is stored in **localStorage** for user persistence and removed on logout.
- Created an `ITokenService` abstraction with a concrete `TokenService` implementation to:
  - Generate signed JWT tokens
  - Embed user claims
  - Keep authentication logic isolated and reusable

---

## Role-Based Permissions
Authorization rules enforced at the API level:

- Any authenticated user can **create** a task
- Only the **task creator or assigned user** can **edit** a task
- Only the **task creator** can **delete** a task

---

## Task Management (CRUD)
- Full Create, Read, Update, and Delete support for tasks
- Tasks can be assigned to registered users
- Implemented a **User Listing endpoint** to populate the assignee dropdown
- Server-side validation ensures unauthorized actions are blocked

---

## API Structure & Controllers
Implemented three focused controllers following the Single Responsibility Principle:

- **AccountController**
  - User registration
  - User login
- **TaskController**
  - Task CRUD operations
  - Assignment logic
  - Authorization enforcement
- **UserController**
  - Fetch registered users for task assignment

---

## Data Layer (EF Core)
- Used **Entity Framework Core** with a custom `DbContext`
- Configured relationships using **Fluent API**:
  - One-to-many relationships (User → Tasks)
  - Restricted deletes to prevent unintended cascade deletions

---

## DTOs & API Contracts
Separated EF entities from API contracts using DTOs:

- `RegisterDto`
- `LoginDto`
- `CreateTaskDto`
- `UpdateTaskDto`
- `TaskResponseDto`
- `UserDto`

Benefits:
- Prevents over-posting and sensitive data exposure
- Provides clear request/response boundaries
- Improves maintainability and versioning

---

## Clean Code & Reusability
- Used **extension methods** to:
  - Map `User` → `UserDto`
  - Generate JWT tokens
- Keeps controllers thin and readable
- Encourages reuse and consistent behavior across the application

---

## Backend Summary
- Secure, stateless authentication with JWT
- Clear authorization rules and ownership-based permissions
- Clean separation of concerns across controllers, services, and DTOs
- Production-ready structure aligned with real-world backend standards

---

## Frontend Implementation

### Tech Stack
- **React** for UI and component-based architecture
- **Tailwind CSS** for responsive and utility-first styling
- **Axios** for HTTP requests
- **SweetAlert2** for user feedback and confirmation dialogs

---

### Project Structure
The frontend is organized for scalability and maintainability:

- **`pages/`**
  - `Login` – User authentication
  - `Register` – User registration
  - `Tasks (Dashboard)` – Task management interface
- **`components/`**
  - `Navbar` – Shared navigation component
  - `TaskModal` – Reusable modal for creating and updating tasks
- **`api/`**
  - `axios.js` – Pre-configured Axios instance with base URL and JWT handling
  - `api.js` – Reusable API request functions
- **`utils/`**
  - SweetAlert helper functions for standardized alerts

---

### Routing & Authentication Flow
- The initial page displays the **Login screen**, with a shared **Navbar** containing navigation links for Login and Register.
- Upon successful login:
  - The JWT token is stored in **localStorage**
  - The user is redirected to the **Dashboard**
- Authentication state is used to control navigation and UI visibility.

---

### Dashboard & Task Management
- The Dashboard displays tasks in a **card-based layout**.
- Each task card allows users to:
  - Edit task details
  - Reassign the task to another user
  - Update task title and status
  - Delete the task (with confirmation)
- The **TaskModal** component is reusable and used for:
  - Creating new tasks
  - Updating existing tasks

---

### Navigation & Session Handling
- The **Navbar dynamically updates** based on authentication state:
  - Displays the logged-in user’s **email** on the left
  - Shows a **Logout** button on the right
- On logout:
  - The JWT token is removed from `localStorage`
  - The user is redirected back to the **initial login page**
- This ensures proper session cleanup and prevents unauthorized access.

---

### Alerts & User Feedback
- **SweetAlert2** is used for all success, error, and confirmation messages.
- A reusable alert utility was created to:
  - Standardize alert behavior
  - Reduce duplicated code across components
- Confirmation dialogs are used before destructive actions such as task deletion.
- All successful transactions (create, update, delete) provide immediate visual feedback.

---

### API Communication
- API calls are centralized using Axios:
  - A shared Axios instance includes the base API URL
  - Automatically attaches the JWT token from `localStorage` when available
- This approach:
  - Keeps API logic consistent
  - Improves maintainability
  - Simplifies future changes to authentication or endpoints

---

### Frontend Summary
- Modular and scalable frontend architecture
- Clear separation of concerns between pages, components, utilities, and API logic
- Secure session handling with JWT
- Consistent UX with confirmations and feedback
- Clean integration with the backend API

---

## Visuals

### HomePage

![TODOFLASK_1](NOTESImages/TODOFLASK_1.png 'TODOFLASK_1')

### Register User Page

![TODOFLASK_2](NOTESImages/TODOFLASK_2.png 'TODOFLASK_2')

![TODOFLASK_3](NOTESImages/TODOFLASK_3.png 'TODOFLASK_3')

![TODOFLASK_4](NOTESImages/TODOFLASK_4.png 'TODOFLASK_4')

### Dashboard (Tasklist Page)

![TODOFLASK_5](NOTESImages/TODOFLASK_5.png 'TODOFLASK_5')

### Create Task (Add Title, Select Assignee, Select Status)

![TODOFLASK_6](NOTESImages/TODOFLASK_6.png 'TODOFLASK_6')

![TODOFLASK_7](NOTESImages/TODOFLASK_7.png 'TODOFLASK_7')

![TODOFLASK_8](NOTESImages/TODOFLASK_8.png 'TODOFLASK_8')

### Update task (Update Title, Update Assignee, or Update Status)

![TODOFLASK_9](NOTESImages/TODOFLASK_9.png 'TODOFLASK_9')

![TODOFLASK_10](NOTESImages/TODOFLASK_10.png 'TODOFLASK_10')

### Login to other user & create task (Only authenticated user can create a task)

![TODOFLASK_11](NOTESImages/TODOFLASK_11.png 'TODOFLASK_11')

![TODOFLASK_12](NOTESImages/TODOFLASK_12.png 'TODOFLASK_12')

![TODOFLASK_13](NOTESImages/TODOFLASK_13.png 'TODOFLASK_13')

### Only the creator of task can delete his/her created task (I tried to delete juan@gmail.com task from maria@gmail.com account)

![TODOFLASK_14](NOTESImages/TODOFLASK_14.png 'TODOFLASK_14')

![TODOFLASK_15](NOTESImages/TODOFLASK_15.png 'TODOFLASK_15')

### Only the assigned user or the creator can edit a task (I tried to update juan@gmail.com task from maria@gmail.com account)

![TODOFLASK_16](NOTESImages/TODOFLASK_16.png 'TODOFLASK_16')

![TODOFLASK_17](NOTESImages/TODOFLASK_17.png 'TODOFLASK_17')

## Update task assignned to juan@gmail.com created by maria@gmail.com

![TODOFLASK_18](NOTESImages/TODOFLASK_18.png 'TODOFLASK_18')

![TODOFLASK_19](NOTESImages/TODOFLASK_19.png 'TODOFLASK_19')

![TODOFLASK_20](NOTESImages/TODOFLASK_20.png 'TODOFLASK_20')

## Tried to delete maria@gmail.com created task from juan@gmail.com account

![TODOFLASK_21](NOTESImages/TODOFLASK_21.png 'TODOFLASK_21')

![TODOFLASK_22](NOTESImages/TODOFLASK_22.png 'TODOFLASK_22')



