export class BasePipe {
  protected toValidate(metatype: unknown): boolean {
    const types: Array<StringConstructor|BooleanConstructor|NumberConstructor|ArrayConstructor|ObjectConstructor>
      = [String, Boolean, Number, Array, Object];
    return !types.find((type: ObjectConstructor|StringConstructor|BooleanConstructor|NumberConstructor|ArrayConstructor): boolean => metatype === type);
  }
}
