/**
 * ZIP mask
 */

export default (value: string) => {
  return value.replace(/(\d{5})(\d{3})/g, "\$1\-\$2")
}
