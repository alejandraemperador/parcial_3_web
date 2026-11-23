import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, Min } from "class-validator";

export class ListLoanRequestsDto {
  // TODO BACK-A: agregar las validaciones del filtro opcional indicado en el enunciado.
  // La conversión de la consulta a número ya está preparada.
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  toolId?: number;
}

