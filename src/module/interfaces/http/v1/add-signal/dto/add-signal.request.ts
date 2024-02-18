import {
  validateNonNullNonEmptyString,
  isNumeric,
} from '../../../../../shared/utils';
export class AddSignalRequestDTO {
  pair: string;
  value: number;
  signal: string;
  raw: string;

  constructor(raw: string) {
    this.raw = raw;
  }

  validate(): any {
    let isErr = false;
    const message: string[] = [];
    try {
      const rawArr = this.raw.split(',');
      this.signal = rawArr[0];
      this.pair = rawArr[1];
      this.value = parseFloat(rawArr[2]);

      if (!validateNonNullNonEmptyString(this.signal)) {
        isErr = true;
        message.push('Signal must be a non-null, non-empty string.');
      }
      if (!validateNonNullNonEmptyString(this.pair)) {
        isErr = true;
        message.push('Pair must be a non-null, non-empty string.');
      }
      //if (!isNumeric(rawArr[2])) {
      //  isErr = true;
      //  message.push('Value must be a number.');
      //}
    } catch {
      isErr = true;
      message.push('Signal must be valid.');
    }
    return {
      isErr,
      value: null,
      message: {
        status_code: isErr ? 400 : 200,
        message,
        error: isErr ? 'Bad Request.' : null,
        error_code: isErr ? 'BAD_REQUEST' : null,
      },
    };
  }
}
