# V-1-Tutor-Dashboard-SAT-Theme-protyped-tested-in-gemini-canvas
# SAT Performance Hub - Tutor Dashboard

This is a static HTML, CSS, and JavaScript prototype for a tutor-facing dashboard to monitor class and individual student SAT performance. It is designed to be hosted on GitHub Pages.

## Features

* **Class Overview:** Displays aggregated class performance KPIs, score distributions, skill area performance, weakest EOC Quizzes by subject, and class-wide CB skill strengths/weaknesses. Includes a class activity report.
* **Student Performance Tiers:** Categorizes students into "Sprinters & High Achievers" and "Strugglers & Needs Focus" based on performance and activity metrics.
* **Student Deep Dive:** Allows the tutor to select an individual student and view a detailed dashboard for that student (replicating the student-facing view) along with a special comparative analysis section.
* **Interactive Charts:** Uses Chart.js for data visualization.
* **Themed Interface:** Styled with "The SAT Hub" branding.

## Files

* `index.html`: The main HTML structure for the dashboard.
* `style.css`: Contains all custom CSS rules and theming.
* `script.js`: Handles dummy data generation for 10 students, class average calculations, dynamic content population, chart rendering, and all tab/modal interactivity.
* `assets/` (Directory): Suggested for storing images like the site logo.

## Setup and Viewing

1.  Clone or download this repository.
2.  Open `index.html` in a web browser to view the dashboard.

## Customization

### Logo
To add your logo:
1.  Place your logo image file (e.g., `The SAT Hub Logo.png`) into an `assets` directory.
2.  In `index.html`, find the `<img>` tag with `alt="The SAT Hub Logo"`.
3.  Change the `src` attribute from `YOUR_HOSTED_LOGO_URL_HERE` to the path of your logo (e.g., `assets/The SAT Hub Logo.png`).

### Data Source
Currently, the dashboard uses extensive dummy data for 10 students, defined within `script.js`. For a production version, this data would need to be sourced dynamically:
1.  **Class Data:** The data used to populate the "Class Overview" and "Student Performance Tiers" would come from an aggregation of all student data.
2.  **Individual Student Data:** The "Student Deep Dive" section would fetch data for the selected student.
3.  The JavaScript in `script.js` would need to be modified to fetch from your backend or data files (e.g., JSON, CSVs via PapaParse) instead of using the inline dummy student generation.

## Libraries Used
* Tailwind CSS (via CDN)
* Chart.js (via CDN)
