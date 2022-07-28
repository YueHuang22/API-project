'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const groups = await queryInterface.sequelize.query(
      'SELECT id from "Groups" ORDER BY id;'
    );
    const groupRows = groups[0]
    const venues = await queryInterface.sequelize.query(
      'SELECT id from "Venues" ORDER BY id;'
    );
    const venueRows = venues[0]
    await queryInterface.bulkInsert('Events', [

      {
        groupId: groupRows[0].id,
        venueId: null,
        name: 'Paint a Pet Portrait',
        type: 'In Person',
        capacity: 20,
        price: 10,
        description: 'Paint a Pet Portrait at the Barking Dog. Dogs Welcome! No Artistic Background Necessary! One of NYC BEST DOG FRIENDLY ACTIVITIES! Trace and paint watercolor portraits of your pet. It will be pre sketched and ready for you to trace and watercolor your own masterpiece.',
        startDate: new Date('2022-08-05 10:00:00'),
        endDate: new Date('2022-08-05 14:00:00'),
        previewImage: 'https://www.paintingwithatwist.com/images/landing/paint-pet-title.jpg',
      },
      {
        groupId: groupRows[0].id,
        venueId: null,
        name: 'Eskie Gathering 2022',
        type: 'In Person',
        capacity: 50,
        price: 0,
        description: 'Come join Eskies of New York City for a special meetup at the Tennis Center in Central Park for a bring your own picnic and 1.6 mi walk around the reservoir with your leashed Eskies, other pups from a Spitz family as part of the international Great Global Eskie Walk 2022!',
        startDate: new Date('2022-08-03 11:00:00'),
        endDate: new Date('2022-08-03 17:00:00'),
        previewImage: 'https://nationalpurebreddogday.com/wp-content/uploads/2018/04/Lynn-McBride-McClure-Am.-Esk-1024x768.jpg',
      },
      {
        groupId: groupRows[0].id,
        venueId: null,
        name: 'Gantry park dog walk',
        type: 'In Person',
        capacity: 20,
        price: 0,
        description: 'Take a leisurely walk around Gantry Park with our pups. Meet in Hunter Points, walk the pooches and find a place to grab a drink if we want. I will be contacting RVSPs individually the day prior to event to confirm you will be coming!',
        startDate: new Date('2022-08-19 12:00:00'),
        endDate: new Date('2022-08-19 19:00:00'),
        previewImage: 'https://www.sibelife.com/wp-content/uploads/2022/04/Hunters-Point-South-Dog-Park-1024x683.jpg',
      },
      {
        groupId: groupRows[1].id,
        venueId: null,
        name: 'Tennis Group First Meet and Greet',
        type: 'Online',
        capacity: 45,
        price: 0,
        description: 'First meet and greet event for the evening tennis on the water group! Join us online for happy times! Come say hello and meet everyone!',
        startDate: new Date('2022-08-18 19:00:00'),
        endDate: new Date('2022-08-18 20:00:00'),
        previewImage: 'https://www.gltf.org/resources/Site/Home%20page%20slider/gltf-group.jpg',
      },
      {
        groupId: groupRows[1].id,
        venueId: venueRows[0].id,
        name: 'Tennis Meetup and Play',
        type: 'In Person',
        capacity: 15,
        price: 5,
        description: 'The double can be played if there are four players, the Canadian if there are three, and the single if there are just two. Welcome to anyone who can hold a rally and play a competitive set. We can play at Washington park,lincoln park, pershin field, upto decision of players',
        startDate: new Date('2022-08-17 17:00:00'),
        endDate: new Date('2022-08-17 20:00:00'),
        previewImage: 'https://img.grouponcdn.com/deal/s7Z78vFtuSmkf6UX6f3XpNaC77r/s7-2048x1229/v1/c870x524.jpg',
      },
      {
        groupId: groupRows[2].id,
        venueId: null,
        name: 'Introduction To Lenses',
        type: 'Online',
        capacity: 35,
        price: 0,
        description: 'LIVE Photography Meetups & Lessons - Hosted EVERY DAY. This Meetup: An Introduction To Lenses & Focal Lengths In Photography. We are a community of photographers looking to master our skills together! Daily LIVE Photography Meetups!',
        startDate: new Date('2022-08-12 17:00:00'),
        endDate: new Date('2022-08-12 18:00:00'),
        previewImage: 'http://locable-assets-production.s3.amazonaws.com/uploads/resource/file/488227/1-17.jpg',
      },
      {
        groupId: groupRows[2].id,
        venueId: null,
        name: 'August online photo review and chat',
        type: 'Online',
        capacity: 20,
        price: 0,
        description: 'Since there is no in-person meeting in August, we can try an online photo review and photo chat class. In July we learned about focus stacking, give it a try and bring some of your photos, even if there were issues with them we can figure out what happened.',
        startDate: new Date('2022-08-15 19:00:00'),
        endDate: new Date('2022-08-15 21:00:00'),
        previewImage: 'https://www.opencity.com.au/images/adorable-beautiful-child-573285_5.jpg',
      },
      {
        groupId: groupRows[3].id,
        venueId: null,
        name: 'Girls Dine Out! Indian Dinner!',
        type: 'In Person',
        capacity: 8,
        price: 0,
        description: 'Our monthly Girls Dine Out! This time it will be Indian food! Let us catch up with old friends and get to know new friends!!! RSVP will close THE DAY BEFORE the event. Please make sure you update your RSVP as soon as your plan changes.',
        startDate: new Date('2022-08-28 18:30:00'),
        endDate: new Date('2022-08-28 20:30:00'),
        previewImage: 'https://www.tasneemskingskitchen.com/wp-content/uploads/2017/01/Indian-food.jpg',
      },
      {
        groupId: groupRows[4].id,
        venueId: null,
        name: 'Liberty State Park Walk',
        type: 'In Person',
        capacity: 20,
        price: 0,
        description: 'This is a 7-mile walk through Liberty State Park with great view of the New York skyline, the Statue of Liberty, and birds in tidal flats. This is one of the monthly Everwalk walks occurring across the country and around the world.',
        startDate: new Date('2022-08-07 08:00:00'),
        endDate: new Date('2022-08-07 11:00:00'),
        previewImage: 'https://media.timeout.com/images/103404892/750/422/image.jpg',
      },
      {
        groupId: groupRows[5].id,
        venueId: null,
        name: 'The Genius of Gaudi in Barcelona',
        type: 'Online',
        capacity: 60,
        price: 5,
        description: 'Antoni Gaudí was a Catalan architect from Spain known as the greatest exponent of Catalan Modernism. His masterpiece, the still- incomplete Sagrada Família, is the most - visited monument in Spain. During this tour, you will learn and enjoy the architecture, tourism, art and Cultural interactions.',
        startDate: new Date('2022-08-03 14:00:00'),
        endDate: new Date('2022-08-03 15:00:00'),
        previewImage: 'https://www.archpaper.com/wp-content/uploads/2020/09/iam_os-mF7PJgSMyyU-unsplash-1280x853.jpg',
      },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Events', null, {});
  },
};
