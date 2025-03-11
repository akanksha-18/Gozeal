# Certification App

## Overview
The **Certification App** allows users to manage certifications by adding, viewing, and listing certifications. Users can enter certification details and upload certificate files with validation and preview functionality.

## Features
- Users can enter a **Certification Name** and **Issuer Name**.
- Upload a certificate file (**PDF, JPG** formats supported).
- Real-time validation of inputs.
- Preview uploaded files before submission.
- Stores certification details in global state using `useCertification`.
- Displays a success message and **redirects to `/view` page** after successful submission.
- `CertificationList.tsx` displays a list of all stored certifications.
- `CertificationView.tsx` provides a detailed view of an individual certification.
- `Navbar.tsx` is a navigation component for easy routing.

## Technologies Used
- **React** (Functional Components & Hooks)
- **React Router** (`useNavigate` for redirection)
- **Bootstrap** (for styling)
- **Redux**

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/certification-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd certification-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Usage
1. Navigate using `Navbar.tsx`.
2. Enter the certification name and issuer name in `CertificationForm.tsx`.
3. Upload a valid **PDF or JPG** file.
4. Click the **"Save Certification"** button.
5. The certification is stored, and the user is redirected to the **/view** page.
6. View all certifications in `CertificationList.tsx`.
7. Click on a certification to see details in `CertificationView.tsx`.

## File Structure
```
/src
  ├── components
  │   ├── CertificationForm.tsx  # Main form component
  │   ├── CertificationList.tsx  # Displays stored certifications
  │   ├── CertificationView.tsx  # Shows detailed certification view
  │   ├── Navbar.tsx  # Navigation bar
  ├── store
  │   ├── certificationStore.ts  # Global state management
  ├── App.tsx  # Main app component with routing
  ├── index.tsx  # Entry point
```

## Validation Rules
- **Certification Name**: Required.
- **Issuer**: Required.
- **File Upload**: Only accepts **PDF, JPG** formats.

## License
This project is licensed under the MIT License.


