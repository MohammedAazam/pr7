
import { PrismaClient } from "@prisma/client";
import faker from "@fakerjs/faker";

const prisma = new PrismaClient();

const NUM_USERS = 10;
const NUM_POSTS_PER_USER = 3;
const NUM_COMMENTS_PER_POST = 5;

const generateUsers = async () => {
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    users.push({
    });
  }
  await prisma.user.createMany({ data: users });
};

const generatePosts = async () => {
  const users = await prisma.user.findMany();
  const posts = [];
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    for (let j = 0; j < NUM_POSTS_PER_USER; j++) {
      posts.push({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        authorId: user.id,
      });
    }
  }
  await prisma.post.createMany({ data: posts });
};

const generateComments = async () => {
  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany();
  const comments = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    for (let j = 0; j < NUM_COMMENTS_PER_POST; j++) {
      const user = users[Math.floor(Math.random() * users.length)];
      comments.push({
        content: faker.lorem.sentences(),
        authorId: user.id,
        postId: post.id,
      });
    }
  }
  await prisma.comment.createMany({ data: comments });
};

(async () => {
  await generateUsers();
  await generatePosts();
  await generateComments();
  console.log("Seed data generated!");
  await prisma.$disconnect();
})();
