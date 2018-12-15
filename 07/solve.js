const solve = input => {
  let steps = new Map();

  for (const step of input) {
    const condition = step.slice(5, 6);
    const which = step.slice(36, 37);
    if (steps.has(which)) {
      steps.get(which).push(condition);
    } else {
      steps.set(which, [condition]);
    }
  }

  for (const step of input) {
    const condition = step.slice(5, 6);
    if (!steps.has(condition)) {
      steps.set(condition, []);
    }
  }

  steps.forEach(value => value.sort());

  steps.forEach((value, key) => console.log(key, "=", value));

  const results = [];
  let i = 0;
  let workers = [
    {
      when: -1,
      which: null
    },
    {
      when: -1,
      which: null
    },
    {
      when: -1,
      which: null
    },
    {
      when: -1,
      which: null
    },
    {
      when: -1,
      which: null
    }
  ];
  while (steps.size > 0) {
    const keys = Array.from(steps.keys()).filter(k => {
      if (steps.get(k).length === 0) {
        for (let worker of workers) {
          if (worker.which === k) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    });

    // console.log(keys);
    const key = keys.sort();
    console.log(key);

    // workers
    //   .filter(w => w >= i)
    //   .map((worker, index) => {
    for (let j = 0; j < workers.length; j++) {
      if (workers[j].when === i) {
        if (workers[j].which) {
          doStep(workers[j].which, steps.get(workers[j].which), steps, results);
          workers[j].which = null;
        }
      }
      if (workers[j].when === -1) {
        const keys = Array.from(steps.keys()).filter(k => {
          if (steps.get(k).length === 0) {
            for (let worker of workers) {
              if (worker.which === k) {
                return false;
              }
            }
            return true;
          } else {
            return false;
          }
        });

        // console.log(keys);
        const key = keys.sort();
        console.log(key);
        if (key.length > 0) {
          let k = key.shift();
          workers[j].when = i + k.charCodeAt() - 4;
          workers[j].which = k;
        }
      }
    }
    for (let j = 0; j < workers.length; j++) {
      const keys = Array.from(steps.keys()).filter(k => {
        if (steps.get(k).length === 0) {
          for (let worker of workers) {
            if (worker.which === k) {
              return false;
            }
          }
          return true;
        } else {
          return false;
        }
      });

      // console.log(keys);
      const key = keys.sort();
      console.log(key);
      if (key.length > 0) {
        let k = key.shift();
        workers[j].when = i + k.charCodeAt() - 4;
        workers[j].which = k;
      }
    }
    console.log(i, workers);
    i++;
  }
  steps.forEach((value, key) => console.log(key, "=", value));

  console.log("time", i - 1);
  return results.join("");
};

const doStep = (which, conditions, steps, results) => {
  console.log(which, conditions);
  if (conditions.length === 0) {
    results.push(which);
    steps.forEach(value => {
      const index = value.indexOf(which);
      if (index > -1) {
        value.splice(index, 1);
      }
    });
    steps.delete(which);
  } /*else {
    for (const condition of conditions) {
      doStep(condition, steps.get(condition), steps, results);
    }
  }*/
};

module.exports = { solve };
