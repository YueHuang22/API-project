'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id from "Users" ORDER BY id;'
    );
    const userRows = users[0]
    await queryInterface.bulkInsert('Groups', [
      {
        name: 'Doggo Meetup group',
        organizerId: userRows[0].id,
        about: 'We will be holding events so dog owners and dog lovers can get together, and socialize our dogs with other dogs and humans.',
        type: 'In Person',
        private: false,
        city: 'Long Island City',
        state: 'NY',
        previewImage: 'https://www.tripswithpets.com/sites/default/files/IMCE/Images-blog/coffee-dogs.jpg',
      },
      {
        name: 'Evening Tennis on the Water',
        organizerId: userRows[1].id,
        about: 'Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.',
        type: 'In Person',
        private: true,
        city: 'New York',
        state: 'NY',
        previewImage: 'https://pbs.twimg.com/media/D88pqXbXUAA-gnH.jpg',
      },
      {
        name: 'NYC Photographers',
        organizerId: userRows[2].id,
        about: ' A group for beginners, professionals and everyone else. We can all learn from one another on how to take better photos, see different places, meet new people and have a lot of fun.',
        type: 'In Person',
        private: false,
        city: 'New York City',
        state: 'NY',
        previewImage: 'https://lirp.cdn-website.com/8e44ae45/dms3rep/multi/opt/button-classes-meetup-640w.png',
      },
      {
        name: 'Ethnic Dining',
        organizerId: userRows[3].id,
        about: 'Time to eat all the ethnic cuisines that Queens and other boroughs have to offer. Members will eat in a family style setting and share the total food costs.',
        type: 'In Person',
        private: false,
        city: 'Flsuhing',
        state: 'NY',
        previewImage: 'http://sethlui.com/wp-content/uploads/2018/01/Chinese-Dining-Etiquette-800x450.jpg',
      },
      {
        name: 'Shorewalkers',
        organizerId: userRows[4].id,
        about: 'This group is open to active members of Shorewalkers, a non-profit group leading walks throughout the NYC area.',
        type: 'In Person',
        private: false,
        city: 'New York',
        state: 'NY',
        previewImage: 'https://d1hirb55zrpywb.cloudfront.net/media/images/38783/blog-gallery-image/1500-ss-brittany-coast-walking-blog-gallery-image.jpg',
      },
      {
        name: 'World Virtual Travelers',
        organizerId: userRows[5].id,
        about: 'We are a group of professionals who have decided to help people making travel experiences whenever they want and wherever they are, by offering our virtual tours.',
        type: 'Online',
        private: true,
        city: 'New York',
        state: 'NY',
        previewImage: 'https://i.ytimg.com/vi/WFRvCjAj2us/maxresdefault.jpg',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Groups', null, {});
  },
};
