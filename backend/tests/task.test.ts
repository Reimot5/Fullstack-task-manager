import { taskSchema } from "../src/validators/task.validator";
import { Status } from "../src/entities/Task";

test("taskSchema validates correct task", () => {
  expect(() =>
    taskSchema.parse({
      title: "My Task",
      status: Status.PENDING,
    })
  ).not.toThrow();
});
test("taskSchema rejects empty task", () => {
  expect(() => taskSchema.parse({})).toThrow();
});
test("taskSchema rejects missing title", () => {
  expect(() => taskSchema.parse({ status: Status.PENDING })).toThrow();
});
test("taskSchema rejects empty title", () => {
  expect(() =>
    taskSchema.parse({ title: "", status: Status.PENDING })
  ).toThrow();
});
test("taskSchema rejects invalid status", () => {
  expect(() =>
    taskSchema.parse({ title: "My Task", status: "invalid" })
  ).toThrow();
});
