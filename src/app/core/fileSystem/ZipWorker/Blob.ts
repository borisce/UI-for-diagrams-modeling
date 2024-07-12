/**
 * New Interface for Blob variable for possibility of getting text out of Blob
 */
interface Blob {
  text: () => Promise<string>;
}
