const copyText = (text: string) => {
  if (typeof navigator !== "undefined") {
    navigator.clipboard.writeText(text);
  }
};

export default copyText;
