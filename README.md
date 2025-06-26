# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

---

## Local Development (Editing in Cursor, VS Code, etc.)

You can edit this project on your local computer using any code editor. Follow these steps to get set up:

### 1. Exporting Your Code from Firebase Studio

This project needs to be linked to a version control system like Git and hosted on a platform like GitHub.

1.  **Initialize Git and Push to GitHub:** If you haven't already, you'll need to initialize a Git repository here and push your code to a new repository on [GitHub](https://github.com).
    ```bash
    # (Inside the Firebase Studio terminal)
    git init -b main
    git add .
    git commit -m "Initial commit from Firebase Studio"
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    git push -u origin main
    ```
    *(Replace `YOUR_USERNAME/YOUR_REPOSITORY` with your actual GitHub repository details.)*

### 2. Setting Up Your Local Environment

1.  **Clone the Repository:** Open a terminal on your local machine and clone the code from your GitHub repository.
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY
    ```

2.  **Install Dependencies:** Once you are inside the project directory, install all the necessary packages using npm.
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:** The app may require environment variables for connecting to services like Firebase.
    *   Create a new file named `.env.local` in the root of your project.
    *   Copy the contents of the `.env` file into `.env.local`.
    *   If you need to connect to your own Firebase project locally, you will need to create a service account key and add its path to this file. For example: `GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"`

4.  **Run the Development Server:** Start the Next.js development server.
    ```bash
    npm run dev
    ```

The application should now be running on [http://localhost:9002](http://localhost:9002). You can now open the project folder in Cursor AI, VS Code, or your preferred editor and start making changes!