const run = () => {
  const { population, ageGroup, genderGroup, destination } = require('./config/settings.json');

  const Chance = require('chance');
  const chance = new Chance();
  const users = [];
  while (users.length < population) {
    users.push({
      name: chance.name(),
      nationality: chance.country({ full: true }),
      avatar: chance.avatar({ fileExtension: 'jpg' }),
      age: chance.natural(ageGroup),
      gender: chance.pickone(genderGroup),
      address: chance.address({ short_suffix: true }),
      profession: chance.profession(),
      city: chance.city(),
      about: chance.paragraph(),
      guid: chance.guid(),
      email: chance.email()
    });
  }
  const { Write } = require('./utils/file-io');
  Write(destination, users, () => {
    console.log('Starting', users);
  });
}

run();