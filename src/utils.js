const getNukes = (data) => {
  const allNukes = [];
  for (const key in data) {
    allNukes.push(data[key]);
  }
  allNukes.sort((a, b) => {
    const aDamage = a.data.damage;
    const bDamage = b.data.damage;
    if (parseInt(aDamage) < parseInt(bDamage)) {
      return 1;
    } else if (parseInt(aDamage) > parseInt(bDamage)) {
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
  for (let i = 0; i < allRuns.length; i++) {
    allRuns[i].rank = counter;
    if (allRuns[i + 1] && allRuns[i].data.time != allRuns[i + 1].data.time) {
      counter++;
    }
  }
  return allRuns;
};

export { getRuns, getNukes };
