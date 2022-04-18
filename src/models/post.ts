export interface Post {
  id: string;
  title: string;
  content: string;
  keyphrases?: string[];
  locations?: string[];
  organizations?: string[];
  people?: string[];
}
