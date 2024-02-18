import {
  BadRequestException,
  BadGatewayException,
  ConflictException,
  ForbiddenException,
  GatewayTimeoutException,
  HttpException,
  NotFoundException,
  PayloadTooLargeException,
  RequestTimeoutException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';

export const COUNTRY_LIST = ['PE', 'MX', 'CO'];

export const RESPONSE = {
  ERROR_SERVER: 'Error server',
  ERROR_INPUTS: 'Error inputs',
};

export const HANDLED_EXCEPTION_TYPES = [
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  HttpException,
  PayloadTooLargeException,
  BadGatewayException,
  GatewayTimeoutException,
  ServiceUnavailableException,
  RequestTimeoutException,
];

export enum ReschedulingReasonIds {
  DoctorRequest = 22,
  PatientRequest = 5,
  Vacation = 19,
  TrainingConference = 1,
  DaysOff = 7,
  OtherUnspecified = 8,
  Permissions = 4,
}
