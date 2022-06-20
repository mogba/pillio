export const generatePassword = (length = 6) => {
  const options = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var p = ""; p.length < length; p += options.charAt(Math.random() * 62 | 0));
  return p;
}
