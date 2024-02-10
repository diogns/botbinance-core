export class UserEntity {
  userName: string;
  idNotification: string;
  status: string;
  idMatrix: string;
  idXhis: string;

  constructor(
    userName: string,
    idNotification: string,
    status: string,
    idMatrix: string,
    idXhis: string,
  ) {
    this.userName = userName || '';
    this.idNotification = idNotification || '';
    this.status = status || '';
    this.idMatrix = idMatrix || '';
    this.idXhis = idXhis || '';
  }
}
