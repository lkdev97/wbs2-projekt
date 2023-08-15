export class UpdateQuestionDto {
  readonly text?: string;
  readonly options?: [string, string, string, string];
  readonly correctAnswer?: string;
}
