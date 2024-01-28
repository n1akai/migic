const getNukes = (data) => {
  const allNukes = [];
  for (const key in data) {
    allNukes.push(data[key]);
  }
  allNukes.sort((a, b) => {
    if (parseInt(a.rank) > parseInt(b.rank)) {
      return 1;
    } else if (parseInt(a.rank) < parseInt(b.rank)) {
      return -1;
    } else {
      return 0;
    }
  });
  return allNukes;
};

const getRuns = (data) => {
  const allRuns = [];
  for (const key in data) {
    allRuns.push(data[key]);
  }
  allRuns.sort((a, b) => {
    if (parseInt(a.data.time) > parseInt(b.data.time)) {
      return 1;
    } else if (parseInt(a.data.time) < parseInt(b.data.time)) {
      return -1;
    } else {
      return 0;
    }
  });
  let counter = 1;
  for (let i = 0; i < allRuns.length - 1; i++) {
    allRuns[i].rank = counter;
    if (allRuns[i].data.time != allRuns[i + 1].data.time) {
      counter++;
    }
  }
  return allRuns;
};

export { getRuns, getNukes };
