/**
 * Phone Mask
 */
export default (value: string) => {
  return value.replace(/\D/g,"")
      .substr(0, 11)
      .replace(/^(\d{2})(\d)/g,"($1) $2")
      .replace(/(\d)(\d{4})$/,"$1-$2");
}




