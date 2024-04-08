// Home
export default [
  // Start 

  Scene.Object.text('LmanTW', 0, -0.75, { size: 2 }),
  Scene.Object.text('A student who enjoys programming and making music.', 0, 0.75, { size: 1 }),
  Scene.Object.teleporter(-15, 5, -100, 5),
  Scene.Object.teleporter(15, 5, 100, 5),
  Scene.Object.text('About Me', -13.5, 5, { size: 1, align: 'left' }),
  Scene.Object.text('Projects', 13.5, 5, { size: 1, align: 'right' }),
  Scene.Object.button(0, 10, () => console.log(true)),

  // About Me
  Scene.Object.text('Home', -101.5, 5, { size: 1, align: 'right' }),

  Scene.Object.text('About Me', -130, -0.75, { size: 1.5, align: 'left' }),
  Scene.Object.text("Hello there, I'm a home-school student from Taiwan.\nI'm currently learning programming and music composing,\n(although music composing is not my focus, I just\ntreat it as my hobby).", -130, 0.75, { size: 0.75, align: 'left' }),
  Scene.Object.text('Programming', -130, 6, { size: 1, align: 'left' }),
  Scene.Object.text('I started my programming journey at 3th grade,\nwhen I start to play with Scratch. I was using Scratch to\nlearn different programming concepts, like variable,\narray, string encoding etc. And it was really fun\nand educational.', -130, 7.5, { size: 0.75, align: 'left' }),
  Scene.Object.text('And I then I started learning JavaScript at 7th grade,\nand began to build all kind of cool stuff, like in 2020\nI built a mining game using Discord bot and got around\n5000 users, and it was truly a fun experience, To build a\nservice, maintain it, and interact with your users.', -130, 12.25, { size: 0.75, align: 'left' }),
  Scene.Object.text("Now, I'm still building cool stuff, but just not really\nas a service, tho I'm currently planning a project that\nwill hopefully have some amount of users.", -130, 17, { size: 0.75, align: 'left' }),
  Scene.Object.text("(I use Nvim btw, because I watched too many primeagen's video lol)", -130, 20, { size: 0.75, align: 'left' }),
  Scene.Object.teleporter(-131.5, 20, -150, -10),
  Scene.Object.text('About Me', -151.5, -10, { size: 1, align: 'right' }),
  Scene.Object.text('I Use Nvim Btw', -180, -11.5, { size: 1.5, align: 'left' }),
  Scene.Object.text("It just feels really nice, the fact that\nyou don't use your mouse at all and you\ncan fully customize it is just amazing to me.", -180, -10, { size: 0.75, align: 'left' }),
  Scene.Object.text('Music', -130, 23, { size: 1, align: 'left' }),
  Scene.Object.text('I know how to play piano, and happens to be lucky enough to know\nhow to write music. For me, music is a really good way to express\nemotions, so you can basically know my mental state through my music.', -130, 24.5, { size: 0.75, align: 'left' }),
]

import Scene from '../Scripts/Scene.js'
