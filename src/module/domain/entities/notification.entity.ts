export class NotificationEntity {
  id: string;
  datetime: string;
  country: string;
  userGroup: string;
  app: string;
  title: string;
  subtitle: string;
  message: string;
  exp: number;
  duration: number;
  extraParams: string;

  constructor(
    id: string,
    datetime: string,
    country: string,
    userGroup: string,
    app: string,
    title: string,
    subtitle: string,
    message: string,
    exp: number,
    duration: number,
    extraParams: string,
  ) {
    this.id = id || '';
    this.datetime = datetime || '';
    this.country = country || '';
    this.userGroup = userGroup || '';
    this.app = app || '';
    this.title = title || '';
    this.subtitle = subtitle || '';
    this.message = message || '';
    this.exp = exp || 0;
    this.duration = duration || 0;
    this.extraParams = extraParams || '';
  }
}
