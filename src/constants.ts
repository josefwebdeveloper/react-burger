// TODO change name
export const BACKEND_BASE_URL = "https://norma.nomoreparties.space/api";
// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
//     POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
//     POST https://norma. nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
//     POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.

export type ErrorResponse = {
  message: string;
};



export enum MessageType {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
}

export enum ButtonColor {
  Primary = "primary",
  Secondary = "secondary",
  Inherit = "inherit",
}

export enum Status {
  ToDo = "TODO",
  InProgress = "IN PROGRESS",
  InQA = "IN QA",
  Done = "DONE",
}

export enum Priority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
  Highest = "HIGHEST",
}

export enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

export const TASK_STATUS_LIST = [
  Status.ToDo,
  Status.InProgress,
  Status.InQA,
  Status.Done,
];

export const PRIORITY_LIST = [
  Priority.Low,
  Priority.Medium,
  Priority.High,
  Priority.Highest,
];

export const STATUS_LIST = [Status.Active, Status.Inactive];
