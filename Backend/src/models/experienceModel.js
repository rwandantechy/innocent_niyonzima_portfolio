/**
 * Experience collection shape (native MongoDB driver — validated in service layer).
 *
 * {
 *   id: string,
 *   role: string,
 *   company: string,
 *   location: string,
 *   startDate: string,          // display-friendly, e.g. "Jan 2024"
 *   endDate: string | null,     // null => "Present"
 *   concurrent: boolean,        // overlapping with another role
 *   bullets: string[],
 *   logo?: string,
 *   order: number,
 *   published: boolean,         // default false
 *   createdAt: Date,
 *   updatedAt: Date
 * }
 */

module.exports = {
  collectionName: 'experience',
  defaults: {
    concurrent: false,
    published: false,
    bullets: [],
    endDate: null,
    order: 0,
  },
};
