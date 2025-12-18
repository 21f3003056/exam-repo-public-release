/**
 * Question 9: Implement llms.txt for a Student Portfolio API
 * Topic: AI Coding Context Engineering - llms.txt
 * Marks: 1.0
 * GA: GA3 (AI Coding)
 */

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.0 }) {
  const id = "q-llms-txt-portfolio-api";
  const title = "Implement llms.txt for a Student Portfolio API";
  const email = `${user.studentId}@ds.study.iitm.ac.in`;
  const studentId = user.studentId;

  const question = html`
    <div class="mb-3">
      <p>
        <strong>Case Study:</strong> StudentHub is building a platform where students can create portfolio APIs. 
        Each API needs an llms.txt file that helps AI assistants understand and use the API effectively.
      </p>
      <p>
        Create a complete llms.txt file for your student portfolio API with the following endpoints:
      </p>
      <ul>
        <li><code>GET /api/profile</code> - Returns student profile information</li>
        <li><code>GET /api/projects</code> - Returns list of projects</li>
        <li><code>POST /api/contact</code> - Submit contact form</li>
      </ul>
      <p>
        <strong>Sample response format:</strong>
      </p>
      <pre><code>{
  "name": "Student Name",
  "email": "${email}",
  "roll": "${studentId}",
  "bio": "Data Science student at IIT Madras"
}</code></pre>
      <p>
        Your llms.txt must include:
      </p>
      <ol>
        <li>Title: <code># Student Portfolio API - ${studentId}</code></li>
        <li>Overview section explaining the API purpose</li>
        <li>Endpoints section with all three endpoints documented</li>
        <li>Authentication section (if any)</li>
        <li>Response formats with examples</li>
        <li>Rate limits and usage policies</li>
        <li>Contact information with your email</li>
        <li>Last updated date</li>
      </ol>
      <label for="${id}" class="form-label">Paste your complete llms.txt content:</label>
      <textarea 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        rows="15"
        placeholder="# Student Portfolio API - ${studentId}&#10;&#10;## Overview&#10;..."
        required
      ></textarea>
    </div>
  `;

  // Validation function to check if the llms.txt content has all required sections
  const validate = async (submittedText) => {
    const required = {
      title: `# Student Portfolio API - ${studentId}`,
      overview: ['## Overview', 'overview'],
      endpoints: ['## Endpoints', '/api/profile', '/api/projects', '/api/contact'],
      authentication: ['## Authentication', 'authentication'],
      responseFormats: ['## Response', 'response format', 'response formats', email, studentId],
      rateLimits: ['## Rate', 'limit', 'usage', 'policy', 'policies'],
      contact: ['## Contact', email],
      lastUpdated: ['last updated', 'date']
    };

    const errors = [];

    // Check title
    if (!submittedText.includes(required.title)) {
      errors.push(`Missing or incorrect title. Expected: "${required.title}"`);
    }

    // Check overview section
    if (!required.overview.some(keyword => submittedText.toLowerCase().includes(keyword.toLowerCase()))) {
      errors.push('Missing Overview section');
    }

    // Check endpoints section
    const missingEndpoints = required.endpoints.filter(ep => !submittedText.includes(ep));
    if (missingEndpoints.length > 0) {
      errors.push(`Missing endpoints documentation: ${missingEndpoints.join(', ')}`);
    }

    // Check authentication section
    if (!required.authentication.some(keyword => submittedText.toLowerCase().includes(keyword.toLowerCase()))) {
      errors.push('Missing Authentication section');
    }

    // Check response formats
    const missingResponseElements = required.responseFormats.filter(elem => !submittedText.includes(elem));
    if (missingResponseElements.length > 0) {
      errors.push(`Missing response format elements: ${missingResponseElements.join(', ')}`);
    }

    // Check rate limits
    if (!required.rateLimits.some(keyword => submittedText.toLowerCase().includes(keyword.toLowerCase()))) {
      errors.push('Missing Rate Limits/Usage Policies section');
    }

    // Check contact information
    if (!required.contact.every(elem => submittedText.includes(elem))) {
      errors.push(`Missing Contact section with email: ${email}`);
    }

    // Check last updated date - look for "last updated" or "date" keywords and common date patterns
    const hasDateKeyword = required.lastUpdated.some(keyword => submittedText.toLowerCase().includes(keyword.toLowerCase()));
    // Check for common date formats: YYYY-MM-DD, YYYY/MM/DD, Month DD, YYYY, DD Month YYYY
    // Year range check ensures we're looking at reasonable dates (20xx-21xx)
    const datePatterns = [
      /\b(20\d{2}|21\d{2})[-/]\d{1,2}[-/]\d{1,2}\b/,  // YYYY-MM-DD or YYYY/MM/DD (2000-2199)
      /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? (20\d{2}|21\d{2})\b/i,  // Month DD, YYYY
      /\b\d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* (20\d{2}|21\d{2})\b/i  // DD Month YYYY
    ];
    const hasDateFormat = datePatterns.some(pattern => pattern.test(submittedText));
    
    if (!hasDateKeyword || !hasDateFormat) {
      errors.push('Missing Last Updated date with a valid date format');
    }

    if (errors.length > 0) {
      return { valid: false, message: `Validation failed:\n${errors.join('\n')}` };
    }

    return { valid: true, message: "llms.txt content verified successfully" };
  };

  const answer = `${studentId},${email}`;

  return { id, title, weight, question, answer, validate };
}
