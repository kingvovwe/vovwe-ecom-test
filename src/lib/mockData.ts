// This file contains mock data for UI components where API endpoints are not available,
// such as the detailed "Product Reviews" section.
// This allows us to build the UI to Figma-spec, demonstrating UI skills
// even when the backend data is missing.

export interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number;
  title: string;
  date: string;
  likes: number;
  withPhoto: boolean;
  withDescription: boolean;
  reviewTopics: string[];
}

export const mockReviews: Review[] = [
  {
    id: "1",
    author: "Darrell Steward",
    avatarUrl: "https://placehold.co/40x40/E0E0E0/333?text=DS",
    rating: 5,
    title: "This is amazing product I have.",
    date: "July 2, 2020 03:29 PM",
    likes: 128,
    withPhoto: true,
    withDescription: true,
    reviewTopics: ["Product Quality", "Seller Services"],
  },
  {
    id: "2",
    author: "Darlene Robertson",
    avatarUrl: "https://placehold.co/40x40/E0E0E0/333?text=DR",
    rating: 5,
    title: "This is amazing product I have.",
    date: "July 2, 2020 10:04 PM",
    likes: 82,
    withPhoto: false,
    withDescription: true,
    reviewTopics: ["Product Quality"],
  },
  {
    id: "3",
    author: "Kathryn Murphy",
    avatarUrl: "https://placehold.co/40x40/E0E0E0/333?text=KM",
    rating: 4,
    title: "This is amazing product I have.",
    date: "June 26, 2020 10:03 PM",
    likes: 9,
    withPhoto: true,
    withDescription: true,
    reviewTopics: ["Product Price", "Shipment"],
  },
  {
    id: "4",
    author: "Ronald Richards",
    avatarUrl: "https://placehold.co/40x40/E0E0E0/333?text=RR",
    rating: 5,
    title: "This is amazing product I have.",
    date: "July 7, 2020 10:14 AM",
    likes: 124,
    withPhoto: false,
    withDescription: true,
    reviewTopics: ["Match with Description"],
  },
  {
    id: "5",
    author: "Jane Cooper",
    avatarUrl: "https://placehold.co/40x40/E0E0E0/333?text=JC",
    rating: 5,
    title: "Incredible quality and fast shipping!",
    date: "July 1, 2020 08:15 AM",
    likes: 45,
    withPhoto: true,
    withDescription: true,
    reviewTopics: ["Product Quality", "Shipment"],
  },
  {
    id: "6",
    author: "Robert Fox",
    avatarUrl: "https://placehold.co/40x40/E0E0E0/333?text=RF",
    rating: 3,
    title: "It's okay, but smaller than expected.",
    date: "June 30, 2020 05:00 PM",
    likes: 7,
    withPhoto: false,
    withDescription: true,
    reviewTopics: ["Match with Description"],
  },
  {
    id: "7",
    author: "Esther Howard",
    avatarUrl: "https://placehold.co/40x40/E0E0E0/333?text=EH",
    rating: 5,
    title: "Exactly what I was looking for.",
    date: "June 29, 2020 11:23 AM",
    likes: 31,
    withPhoto: false,
    withDescription: true,
    reviewTopics: ["Product Quality"],
  },
];

export const reviewTopics = [
  "Product Quality",
  "Seller Services",
  "Product Price",
  "Shipment",
  "Match with Description",
];

export const reviewSummary = {
  average: 4.5,
  totalReviews: 125,
  ratingDistribution: [
    { stars: 5, count: 2823, percentage: 80 },
    { stars: 4, count: 38, percentage: 10 },
    { stars: 3, count: 4, percentage: 5 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ],
};
