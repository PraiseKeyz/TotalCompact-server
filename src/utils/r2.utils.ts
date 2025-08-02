import { s3Client } from "../config/r2.config";
import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Get the public URL for a file stored in R2
 * @param fileName - The name of the file in R2
 * @returns The public URL of the file
 */
export const getR2FileUrl = (fileName: string): string => {
  // const bucketName = process.env.R2_BUCKET_NAME;
  const customDomain = process.env.CUSTOM_DOMAIN;

  return `https://${customDomain}/${fileName}`;
};

/**
 * Delete a file from R2
 * @param fileName - The name of the file to delete
 * @returns Promise that resolves when file is deleted
 */
export const deleteR2File = async (fileName: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
  });

  try {
    await s3Client.send(command);
  } catch (error) {
    console.error("Error deleting file from R2:", error);
    throw error;
  }
};

/**
 * Get a presigned URL for temporary access to a private file
 * @param fileName - The name of the file
 * @param expiresIn - Expiration time in seconds (default: 3600)
 * @returns Promise that resolves to the presigned URL
 */
export const getPresignedUrl = async (
  fileName: string,
  expiresIn: number = 3600,
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw error;
  }
};

/**
 * Extract file name from a full file path or URL
 * @param filePath - The file path or URL
 * @returns The file name
 */
export const extractFileName = (filePath: string): string => {
  // If it's a URL, extract the file name from the URL
  if (filePath.startsWith("http")) {
    const url = new URL(filePath);
    return url.pathname.split("/").pop() || "";
  }

  // If it's a local path, extract the file name
  return filePath.split("/").pop() || "";
};
