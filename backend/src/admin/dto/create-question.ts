export class CreateQuestionDto {
  readonly text: string;
  readonly options: [string, string, string, string];
  readonly correctAnswer: string;
}
