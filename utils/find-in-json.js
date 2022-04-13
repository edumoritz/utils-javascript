function getValueKeyInJson(json, key) {
  let objects = [];
  for (var i in json) {
    if (!json.hasOwnProperty(i)) continue;

    if (typeof json[i] === 'object') {
      objects = objects.concat(getValueKeyInJson(json[i], key));
    } else if (i === key) {
      objects.push(json[i]);
    }
  }

  return objects;
}

const json = {
  tiranossauro: {
    name: 'rex',
    tataravo: {
      name: 'jhon',
      avo: {
        name: 'doe',
        pai: {
          name: 'father',
        },
      },
    },
  },
};

console.log(getValueKeyInJson(json, 'name'));
