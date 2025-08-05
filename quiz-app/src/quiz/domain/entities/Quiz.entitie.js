export class Quiz {
  constructor({ title, categoryIds = [], userId, status = true, questions = [] }) {
    if (!title) throw new Error("Title is required");
    if (!userId) throw new Error("User ID is required");

    this.title = title;
    this.categoryIds = categoryIds;
    this.userId = userId;
    this.status = status;
    this.questions = questions;
  }
}
