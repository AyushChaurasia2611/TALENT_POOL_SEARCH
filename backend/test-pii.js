const { extractPii, scrubPii } = require('./src/services/piiScrubber');

const testText = `Sophia Chen
sophia.chen@gmail.com | +1-415-882-3341 | linkedin.com/in/sophiachen-dev | github.com/sophiachen
San Francisco, CA

Senior Software Engineer with 9 years of experience.
`;

const pii = extractPii(testText);
const scrubbed = scrubPii(testText);

console.log('=== Extracted PII ===');
console.log(JSON.stringify(pii, null, 2));
console.log('');
console.log('=== Scrubbed Text ===');
console.log(scrubbed);
console.log('');
console.log('=== Verification ===');
console.log('Email present in scrubbed:', scrubbed.includes('@'));
console.log('Phone present in scrubbed:', scrubbed.includes('415'));
console.log('LinkedIn present in scrubbed:', scrubbed.includes('linkedin.com'));
console.log('GitHub present in scrubbed:', scrubbed.includes('github.com'));
console.log('All PII removed:', !scrubbed.includes('@') && !scrubbed.includes('415') && !scrubbed.includes('linkedin.com') && !scrubbed.includes('github.com'));
