# Async Race

Car racing stimulation

# UI Hosting

url - https://async-race-application.netlify.app/ (Note that only client side is deployed as the task demands. If you want to watch the project you will need to run it locally by the instruction below.)

# Points Estimation

<h2>Overall 322.5 points</h2>

1. UI deployment +
2. Requirements to Commits and Repository + 
3. Basic Structure
 * View Configuration
      > Two Views (10 points) +10
      > Garage View (5 points) +5
      > Winners View (5 points) +5
      > Persistant State (10 points) - 

 * Garage View Functionality
      > CRUD Operations (20 points) +15 
      > Color Selection (10 points) +10
      > Management Buttons (5 points) +5
      > Pagination (10 points) +10

 * Car Generation
      > Random Cars Generation (10 points) +10

 4. Car Animation 
      > Engine Control Buttons (10 points) +10
      > Start Engine Animation  (20 points) +15
      > Stop Engine Animation (10 points) +10
      > Button States (5 points) +5
      > Responsive Animation (5 points) +5

 5. Race Animation
      > Start Race Button (15 points) +15
      > Reset Race Button (10 points) +10
      > Winner Announcement (10 points) +10

 6. Winners View
      > Display Winners (15 points) +15
      > Pagination for Winners (10 points) +10
      > Winners Table (10 points) +10
      > Sorting Functionality (10 points) +10

 7. Application Architecture 
      > Modular Design (40 points) +30

 8. Dynamic Content Generation
      > JavaScript-Generated HTML Content (30 points) +15

 9. Single Page Application
      > SPA Implementation (25 points) +20
 
 10. Bundling and Tooling
      > Use of Webpack or Similar (20 points) +5

 11. Code Quality and Standards 
      > Eslint with Airbnb Style Guide (15 points) +5

 12. Code Organization and Efficiency
      > Function Modularization (10 points) +5
      > Code Duplication and Magic Numbers (5 points) +5

 13. Prettier and ESLint Configuration
      > Prettier Setup (5 points) -
      > ESLint Configuration (5 points) +2.5

 14.  Overall Code Quality
      > (Up to 35 points) +25

# Checklist

## 🚀 UI Deployment

- [ ] **Deployment Platform:** Successfully deploy the UI on one of the following platforms: GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a similar service.

## ✅ Requirements to Commits and Repository

- [ ] **Commit guidelines compliance:** Ensure that all commits follow the specified commit guidelines, thereby promoting a clear and consistent commit history. This includes using meaningful commit messages that accurately describe the changes made.

- [ ] **Checklist included in README.md:** Include the project's checklist in the README.md file. Mark all implemented features to provide a clear overview of the project's completion status.

- [ ] **Score calculation:** Use this checklist to calculate your score. Check all implemented features, then calculate your score and put it at the top of the `README.md`.

- [ ] **UI Deployment link in README.md**: Place the link to the deployed UI at the top of the README.md file, alongside the calculated score.

## 🏁 Basic Structure (85 points)

### 1. View Configuration (30 points)

- [ ] **Two Views (10 points):** Implement two primary views: "Garage" and "Winners".
- [ ] **Garage View Content (5 points):** The "Garage" view must display its name, the current page number, and the total number of cars in the database (how many car user has in his garage).
- [ ] **Winners View Content (5 points):** The "Winners" view should similarly display its name, the current page number, and the total count of records in the database (how many records the winners table contains).
- [ ] **Persistent State (10 points):** Ensure the view state remains consistent when navigating between views. This includes preserving page numbers and input states. For example, page number shouldn't be reset, input controls should contain that they contained before switching, etc.

### 2. Garage View Functionality (55 points)

#### Car Management (45 points)

- [ ] **CRUD Operations (20 points):** Enable users to create, update, and delete cars, and display the list of cars. A car has two attributes: "name" and "color". For "delete"-operation car should be deleted from "garage" table as well as from "winners".
- [ ] **Color Selection (10 points):** Allow color selection from an RGB palette ([like here](https://colorspire.com/rgb-color-wheel/)), displaying the selected color on the car's image along with its name.
- [ ] **Management Buttons (5 points):** Provide buttons near each car's image for updating its attributes or deleting it.
- [ ] **Pagination (10 points):** Implement pagination for the "Garage" view, displaying 7 cars per page.

#### Car Generation (10 points)

- [ ] **Random Car Creation (10 points):** There should be a button to create random cars (100 cars per click). Name should be assembled from two random parts, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part). Color should be also generated randomly.

## 🚗 Car Animation (50 points)

- [ ] **Engine Control Buttons (10 points):** Place start/stop engine buttons near each car's image.
- [ ] **Start Engine Animation (20 points):** User clicks to the engine start button -> UI is waiting for car's velocity answer -> animate the car and makes another request to drive. In case api returned 500 error car animation should be stopped.
- [ ] **Stop Engine Animation (10 points):** User clicks to the engine stop button -> UI is waiting for answer for stopping engine -> car returned to it's initial place.
- [ ] **Button States (5 points):** Start engine button should be disabled in case car is already in driving mode. As well as stop engine button should be disabled when car is on it's initial place.
- [ ] **Responsive Animation (5 points):** Ensure car animations are fluid and responsive on screens as small as 500px.

## 🏎️ Race Animation (35 points)

- [ ] **Start Race Button (15 points):** Implement a button to start the race for all cars on the current page.
- [ ] **Reset Race Button (10 points):** Create a button to reset the race, returning all cars to their starting positions.
- [ ] **Winner Announcement (10 points):** After some car finishes first user should see the message contains car's name that shows which one has won.

## 🏆 Winners View (45 points)

- [ ] **Display Winners (15 points):** After some car wins it should be displayed at the "Winners view" table.
- [ ] **Pagination for Winners (10 points):** Implement pagination for the "Winners" view, with 10 winners per page.
- [ ] **Winners Table (10 points):** The table should include columns for the car's №, image, name, number of wins, and best time in seconds. If the same car wins more than once the number of wins should be incremented while best time should be saved only if it's better than the stored one.
- [ ] **Sorting Functionality (10 points):** Allow users to sort the table by the number of wins and best time, in ascending or descending order.

## 🏗️ Application Architecture (40 points)

- [ ] **Modular Design (40 points):** The application should be clearly divided into logical modules or layers, such as API interaction, UI rendering, and state management. Consultation with a mentor on the architecture before implementation is advised.

## 📜 Dynamic Content Generation (30 points)

- [ ] **JavaScript-Generated HTML Content (30 points):** All HTML content must be dynamically generated using JavaScript, with the `<body>` tag containing only a single `<script>` tag.

## 🌐 Single Page Application (25 points)

- [ ] **SPA Implementation (25 points):** The application must be a Single Page Application (SPA) using either React v18+ or Angular v17+. All content must be generated using TypeScript with `strict` and `noImplicitAny` settings enabled in `tsconfig.json`, ensuring seamless user experience without page reloads during navigation.

## 📦 Bundling and Tooling (20 points)

- [ ] **Use of Webpack or Similar (20 points):** Implement Webpack or another bundling tool to compile the project into a minimal set of files, ideally one HTML file, one JS file, and one CSS file. Ensure that the configuration enforces TypeScript strict type checking.

## ✅ Code Quality and Standards (15 points)

- [ ] **Eslint with Airbnb Style Guide (15 points):** Code must adhere to the Airbnb ESLint configuration to maintain code quality, as outlined in the [Airbnb style guide](https://www.npmjs.com/package/eslint-config-airbnb). Specific rules may be adjusted only with mentor approval, and there should be no ESLint errors or warnings.

## 📏 Code Organization and Efficiency (15 points)

- [ ] **Function Modularization (10 points):** Code should be organized into small, clearly named functions with specific purposes. Each function should not exceed 40 lines, reflecting strong typing and avoiding the use of magic numbers or strings.
- [ ] **Code Duplication and Magic Numbers (5 points):** Minimize code duplication and maintain readability by avoiding the use of magic numbers or strings throughout the codebase.

## 🎨 Prettier and ESLint Configuration (10 points)

- [ ] **Prettier Setup (5 points):** Prettier is correctly set up with two scripts in `package.json`: `format` for auto-formatting and `ci:format` for checking issues.
- [ ] **ESLint Configuration (5 points):** ESLint is configured with the [Airbnb style guide](https://www.npmjs.com/package/eslint-config-airbnb). A `lint` script in `package.json` runs ESLint checks. Configuration files should reflect strict TypeScript settings as per `tsconfig.json`.

## 🌟 Overall Code Quality (35 points)

- [ ] **(Up to 35 points)** Discretionary points awarded by the reviewer based on overall code quality, readability

## 🔄 Evaluation Rules

- **[@Candidate]** The UI should be deployed to gh-pages, Netlify, or a similar service, and the link should be included in the `README.md`.
- **[@Reviewer]** You should clone the [server repository](https://github.com/mikhama/async-race-api.git) and keep the server running during the functionality review.
- **[@Reviewer]** Test task should be evaluated based on both functional and non-functional requirements.
- **[@Candidate]** Pay close attention to details in the implementation, as bugs and deviations from the requirements can impact your score.
- **[@Reviewer]** If bugs are found, the following deductions can be applied:
  - (**-30**) Major bug (implemented functionality works but breaks down after certain manipulations, with unexpected errors in the browser's console).
  - (**-10**) Minor bug (implemented functionality works but behaves inconsistently after certain manipulations, such as a button not becoming enabled after changing some state, with no errors in the browser's console).
  - **Note:** If you repeatedly press the "start engine button" then the "stop engine button" or the "start race button" then the "reset race button" and see a "404" or "429" error, this is not considered a bug.

# Getting Started

1. Clone the Repository:

Open your terminal and navigate to the directory where you want to clone the repository. Then, run the following command:

```bash
git clone https://github.com/<username>/<repository-name>.git
```

2. Install Dependencies:

Navigate to the cloned project directory:

```bash
cd 
```
Then, install the project's dependencies by running:

```bash
npm install 
```

3. Set Up Environment Variables:

The project likely uses environment variables to store sensitive information like API URLs. Create a file named .env.local in the project's root directory.In the .env.local file, add the following line, replacing <your-server-url> with the actual URL of your server:

NEXT_PUBLIC_SERVER_URL=<your-server-url>

4. Start the Development Server:

Run the following command in your terminal to start the development server:

```bash
npm run dev
```

This will start the development server, typically at http://localhost:3000 (the port might vary depending on the project). You can then access your application in your web browser.