// Assuming the API response includes an id and other fields for Post
export interface Post {
  id?: string;
  title: string;
  body: string;
}

export type ResultRecordType = Post & { id: string }; // Ensure id is required here
