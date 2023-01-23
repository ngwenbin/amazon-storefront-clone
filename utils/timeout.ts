const delay = (delayInms) =>
  new Promise((resolve) => {
    setTimeout(resolve, delayInms);
  });

export default delay;
