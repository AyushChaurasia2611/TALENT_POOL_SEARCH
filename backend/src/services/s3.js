const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

/**
 * Upload a file buffer to S3
 * @param {Buffer} buffer - File contents
 * @param {string} originalName - Original filename
 * @param {string} mimeType - MIME type
 * @returns {Promise<{key: string, url: string}>}
 */
async function uploadToS3(buffer, originalName, mimeType) {
  const ext = path.extname(originalName);
  const key = `resumes/${uuidv4()}${ext}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
    Metadata: {
      originalName: encodeURIComponent(originalName),
    },
  });

  await s3Client.send(command);

  return { key };
}

/**
 * Generate a presigned download URL for an S3 object
 * @param {string} key - S3 object key
 * @param {number} expiresIn - Seconds until expiry (default 1 hour)
 * @returns {Promise<string>} Presigned URL
 */
async function getPresignedUrl(key, expiresIn = 3600) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

module.exports = { uploadToS3, getPresignedUrl };
