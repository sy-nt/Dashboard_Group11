import { Expose } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class DateRangeDto{
    @Expose()
    dateStart: Date;
    @Expose()
    dateEnd: Date;
}